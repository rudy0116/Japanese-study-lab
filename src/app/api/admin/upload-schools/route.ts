import { NextRequest, NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { db } from "@/lib/db";
import { schools, schoolFeeItems } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * POST /api/admin/upload-schools
 * 上传 Excel 文件并导入学校数据
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    // 是否立即公开：传 "1" 或 "true" 为公开，不传或 "0"/"false" 为草稿（待手动公开）
    const publishParam = formData.get("publish")?.toString()?.toLowerCase();
    const isPublished = publishParam === "1" || publishParam === "true";

    if (!file) {
      return NextResponse.json({ error: "未找到文件" }, { status: 400 });
    }

    // 验证文件类型
    if (
      !file.name.endsWith(".xlsx") &&
      !file.name.endsWith(".xls") &&
      file.type !==
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      return NextResponse.json({ error: "仅支持 Excel 文件 (.xlsx)" }, { status: 400 });
    }

    // 读取文件
    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = new ExcelJS.Workbook();
    // @ts-expect-error Buffer type mismatch between Node versions
    await workbook.xlsx.load(buffer);

    const worksheet = workbook.getWorksheet(1); // 第一个工作表
    if (!worksheet) {
      return NextResponse.json({ error: "Excel 文件格式错误" }, { status: 400 });
    }

    // 解析数据
    const rows: any[] = [];
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return; // 跳过标题行

      const rowData: any = {};
      row.eachCell((cell, colNumber) => {
        const header = worksheet.getRow(1).getCell(colNumber).value?.toString() || "";
        rowData[header] = cell.value?.toString() || "";
      });
      rows.push(rowData);
    });

    // 转换并导入数据
    const results = {
      success: 0,
      updated: 0,
      failed: 0,
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
        const slug = generateSlug(nameZh);

        // 检查是否已存在
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
          // 更新现有学校
          await db
            .update(schools)
            .set({ ...schoolData, updatedAt: new Date() })
            .where(eq(schools.id, existing[0].id));
          results.updated++;
        } else {
          // 创建新学校
          await db.insert(schools).values(schoolData);
          results.success++;
        }
      } catch (error: any) {
        results.failed++;
        results.errors.push(
          `第 ${rows.indexOf(row) + 2} 行: ${error.message || "未知错误"}`
        );
      }
    }

    return NextResponse.json({
      message: "导入完成",
      results,
    });
  } catch (error: any) {
    console.error("导入错误:", error);
    return NextResponse.json(
      { error: error.message || "导入失败" },
      { status: 500 }
    );
  }
}

/**
 * 生成 slug
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}
