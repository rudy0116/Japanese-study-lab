import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { db } from "@/lib/db";
import { schools, schoolFeeItems, schoolCourses } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import {
  FEE_TYPE_LABELS,
  FEE_PERIOD_LABELS,
  SCHEDULE_TYPE_LABELS,
} from "@/lib/utils";

export const runtime = "nodejs";
export const maxDuration = 60;

/* ── 反向查找表（中文标签 → 枚举值） ──────────────── */
const reverseFeeType = Object.fromEntries(
  Object.entries(FEE_TYPE_LABELS).map(([k, v]) => [v, k])
);
const reverseFeePeriod = Object.fromEntries(
  Object.entries(FEE_PERIOD_LABELS).map(([k, v]) => [v, k])
);
const reverseScheduleType = Object.fromEntries(
  Object.entries(SCHEDULE_TYPE_LABELS).map(([k, v]) => [v, k])
);

/**
 * POST /api/admin/upload-schools
 * 上传 Excel 文件并导入学校数据（支持多工作表：学校、课程、费用）
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const publishParam = formData.get("publish")?.toString()?.toLowerCase();
    const isPublished = publishParam === "1" || publishParam === "true";

    if (!file) {
      return NextResponse.json({ error: "未找到文件" }, { status: 400 });
    }

    if (
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls") &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return NextResponse.json({ error: "仅支持 Excel 文件 (.xlsx)" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = new ExcelJS.Workbook();
    // @ts-expect-error Buffer type mismatch between Node versions
    await workbook.xlsx.load(buffer);

    /* ── 解析 Sheet 1: 学校数据 ────────────────────────── */
    const worksheet = workbook.getWorksheet("学校数据") ?? workbook.getWorksheet(1);
    if (!worksheet) {
      return NextResponse.json({ error: "Excel 文件格式错误" }, { status: 400 });
    }

    const rows: Record<string, string>[] = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;
      const rowData: Record<string, string> = {};
      row.eachCell((cell, colNumber) => {
        const header = worksheet.getRow(1).getCell(colNumber).value?.toString() || "";
        rowData[header] = cell.value?.toString() || "";
      });
      rows.push(rowData);
    });

    /* ── 解析 Sheet 2: 课程数据（可选） ───────────────── */
    const courseSheet = workbook.getWorksheet("课程数据") ?? workbook.getWorksheet(2);
    const courseRows: Record<string, string>[] = [];
    if (courseSheet && courseSheet !== worksheet) {
      courseSheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const rowData: Record<string, string> = {};
        row.eachCell((cell, colNumber) => {
          const header = courseSheet.getRow(1).getCell(colNumber).value?.toString() || "";
          rowData[header] = cell.value?.toString() || "";
        });
        courseRows.push(rowData);
      });
    }

    /* ── 解析 Sheet 3: 费用数据（可选） ───────────────── */
    const feeSheet = workbook.getWorksheet("费用数据") ?? workbook.getWorksheet(3);
    const feeRows: Record<string, string>[] = [];
    if (feeSheet && feeSheet !== worksheet && feeSheet !== courseSheet) {
      feeSheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return;
        const rowData: Record<string, string> = {};
        row.eachCell((cell, colNumber) => {
          const header = feeSheet.getRow(1).getCell(colNumber).value?.toString() || "";
          rowData[header] = cell.value?.toString() || "";
        });
        feeRows.push(rowData);
      });
    }

    /* ── 导入学校 ──────────────────────────────────────── */
    const results = {
      success: 0,
      updated: 0,
      failed: 0,
      coursesImported: 0,
      feesImported: 0,
      errors: [] as string[],
    };

    for (const row of rows) {
      try {
        if (!row["中文名称"] && !row["日文名称"]) {
          results.failed++;
          results.errors.push(`第 ${rows.indexOf(row) + 2} 行: 缺少学校名称`);
          continue;
        }

        const nameZh = row["中文名称"] || row["日文名称"];
        const nameJa = row["日文名称"] || row["中文名称"];
        const slug = row["slug"] || generateSlug(nameZh);

        const existing = await db
          .select()
          .from(schools)
          .where(eq(schools.slug, slug))
          .limit(1);

        const schoolData = {
          slug,
          nameZh,
          nameJa,
          schoolType: "language_school" as const,
          prefecture: row["都道府县"] || null,
          city: row["城市"] || null,
          addressJa: row["地址（日文）"] || null,
          nearestStation: row["最近车站"] || null,
          walkingMinutes: row["步行分钟"] ? parseInt(row["步行分钟"]) : null,
          website: row["官网"] || null,
          phone: row["电话"] || null,
          email: row["邮箱"] || null,
          descriptionZh: row["学校简介"] || null,
          establishedYear: row["创办年份"] ? parseInt(row["创办年份"]) : null,
          totalCapacity: row["招生规模"] ? parseInt(row["招生规模"]) : null,
          classSizeAvg: row["平均班级人数"] ? parseInt(row["平均班级人数"]) : null,
          chineseRatio: row["中国学生比例"]
            ? parseFloat(row["中国学生比例"].replace("%", "")) / 100
            : null,
          jlptN1PassRate: row["JLPT N1通过率"]
            ? parseFloat(row["JLPT N1通过率"].replace("%", "")) / 100
            : null,
          jlptN2PassRate: row["JLPT N2通过率"]
            ? parseFloat(row["JLPT N2通过率"].replace("%", "")) / 100
            : null,
          universityAcceptanceRate: row["大学升学率"]
            ? parseFloat(row["大学升学率"].replace("%", "")) / 100
            : null,
          hasDormitory: row["有宿舍"] === "是" || row["有宿舍"] === "true",
          hasVisaSupport: row["签证支持"] !== "否" && row["签证支持"] !== "false",
          hasPartTimeSupport: row["打工支持"] === "是" || row["打工支持"] === "true",
          enrollmentPeriods: row["入学时间"]
            ? row["入学时间"].split(/[,，、]/).map((s: string) => s.trim())
            : null,
          courseDurations: row["课程时长"]
            ? row["课程时长"].split(/[,，、]/).map((s: string) => s.trim())
            : null,
          coverImage: row["封面图片URL"] || null,
          isPublished,
          isFeatured: false,
        };

        if (existing.length > 0) {
          await db
            .update(schools)
            .set({ ...schoolData, updatedAt: new Date() })
            .where(eq(schools.id, existing[0].id));
          results.updated++;
        } else {
          await db.insert(schools).values(schoolData);
          results.success++;
        }
      } catch (error: unknown) {
        results.failed++;
        results.errors.push(
          `第 ${rows.indexOf(row) + 2} 行: ${error instanceof Error ? error.message : "未知错误"}`
        );
      }
    }

    /* ── 构建 slug → id 映射 ───────────────────────────── */
    const allSchools = await db
      .select({ id: schools.id, slug: schools.slug })
      .from(schools);
    const slugToId = new Map(allSchools.map((s) => [s.slug, s.id]));

    /* ── 导入课程 ──────────────────────────────────────── */
    if (courseRows.length > 0) {
      const coursesBySlug = new Map<string, Record<string, string>[]>();
      for (const row of courseRows) {
        const slug = row["学校slug"];
        if (!slug) continue;
        if (!coursesBySlug.has(slug)) coursesBySlug.set(slug, []);
        coursesBySlug.get(slug)!.push(row);
      }

      for (const [slug, groupedRows] of coursesBySlug) {
        const schoolId = slugToId.get(slug);
        if (!schoolId) {
          results.errors.push(`课程数据: 未找到学校 slug="${slug}"`);
          continue;
        }
        try {
          await db.delete(schoolCourses).where(eq(schoolCourses.schoolId, schoolId));
          const coursesData = groupedRows.map((row) => ({
            schoolId,
            nameZh: row["课程名称"] || "未命名课程",
            durationMonths: row["时长(月)"] ? parseInt(row["时长(月)"]) : null,
            hoursPerWeek: row["每周课时"] ? parseInt(row["每周课时"]) : null,
            scheduleType: (reverseScheduleType[row["上课时段"]] ||
              row["上课时段"] ||
              null) as "morning" | "afternoon" | "full_day" | null,
            targetLevel: row["目标等级"] || null,
          }));
          if (coursesData.length > 0) {
            await db.insert(schoolCourses).values(coursesData);
            results.coursesImported += coursesData.length;
          }
        } catch (error: unknown) {
          results.errors.push(
            `课程数据 (${slug}): ${error instanceof Error ? error.message : "导入失败"}`
          );
        }
      }
    }

    /* ── 导入费用 ──────────────────────────────────────── */
    if (feeRows.length > 0) {
      const feesBySlug = new Map<string, Record<string, string>[]>();
      for (const row of feeRows) {
        const slug = row["学校slug"];
        if (!slug) continue;
        if (!feesBySlug.has(slug)) feesBySlug.set(slug, []);
        feesBySlug.get(slug)!.push(row);
      }

      for (const [slug, groupedRows] of feesBySlug) {
        const schoolId = slugToId.get(slug);
        if (!schoolId) {
          results.errors.push(`费用数据: 未找到学校 slug="${slug}"`);
          continue;
        }
        try {
          await db.delete(schoolFeeItems).where(eq(schoolFeeItems.schoolId, schoolId));
          const feesData = groupedRows.map((row) => ({
            schoolId,
            feeType: (reverseFeeType[row["费用类型"]] ||
              row["费用类型"] ||
              "other") as
              | "admission"
              | "tuition"
              | "textbook"
              | "facility"
              | "insurance"
              | "exam"
              | "other",
            nameZh: row["中文名称"] || "未命名费用",
            nameJa: row["日文名称"] || null,
            amount: parseInt(row["金额"]) || 0,
            period: (reverseFeePeriod[row["缴纳周期"]] ||
              row["缴纳周期"] ||
              "one_time") as "one_time" | "annual" | "semi_annual" | "monthly",
            isRequired: row["是否必需"] !== "否",
            displayOrder: parseInt(row["显示顺序"]) || 0,
          }));
          if (feesData.length > 0) {
            await db.insert(schoolFeeItems).values(feesData);
            results.feesImported += feesData.length;
          }
        } catch (error: unknown) {
          results.errors.push(
            `费用数据 (${slug}): ${error instanceof Error ? error.message : "导入失败"}`
          );
        }
      }
    }

    return NextResponse.json({
      message: "导入完成",
      results,
    });
  } catch (error: unknown) {
    console.error("导入错误:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "导入失败" },
      { status: 500 }
    );
  }
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
