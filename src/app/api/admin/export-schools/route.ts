import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { db } from "@/lib/db";
import { schools, schoolCourses, schoolFeeItems } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import {
  FEE_TYPE_LABELS,
  FEE_PERIOD_LABELS,
  SCHEDULE_TYPE_LABELS,
} from "@/lib/utils";

export const runtime = "nodejs";

/**
 * GET /api/admin/export-schools
 * 一键导出全部学校为 Excel（含课程、费用及后台管理信息）
 */
export async function GET() {
  try {
    const [schoolList, courseList, feeList] = await Promise.all([
      db.select().from(schools).orderBy(asc(schools.id)),
      db.select().from(schoolCourses),
      db.select().from(schoolFeeItems),
    ]);

    const schoolLookup = new Map(
      schoolList.map((s) => [s.id, { slug: s.slug, nameZh: s.nameZh }])
    );

    const workbook = new ExcelJS.Workbook();

    /* ── Sheet 1: 学校数据 ─────────────────────────────── */
    const worksheet = workbook.addWorksheet("学校数据", {
      headerFooter: { firstHeader: "学校列表 - 导出数据" },
    });

    const columns: { header: string; key: string; width: number }[] = [
      { header: "ID", key: "id", width: 10 },
      { header: "slug", key: "slug", width: 30 },
      { header: "状态", key: "isPublished", width: 10 },
      { header: "创建时间", key: "createdAt", width: 22 },
      { header: "更新时间", key: "updatedAt", width: 22 },
      { header: "中文名称", key: "nameZh", width: 30 },
      { header: "日文名称", key: "nameJa", width: 40 },
      { header: "学校类型", key: "schoolType", width: 14 },
      { header: "都道府县", key: "prefecture", width: 15 },
      { header: "城市", key: "city", width: 15 },
      { header: "地址（日文）", key: "addressJa", width: 50 },
      { header: "最近车站", key: "nearestStation", width: 20 },
      { header: "步行分钟", key: "walkingMinutes", width: 12 },
      { header: "官网", key: "website", width: 40 },
      { header: "电话", key: "phone", width: 20 },
      { header: "邮箱", key: "email", width: 30 },
      { header: "学校简介", key: "descriptionZh", width: 60 },
      { header: "创办年份", key: "establishedYear", width: 12 },
      { header: "招生规模", key: "totalCapacity", width: 12 },
      { header: "平均班级人数", key: "classSizeAvg", width: 15 },
      { header: "中国学生比例", key: "chineseRatio", width: 15 },
      { header: "JLPT N1通过率", key: "jlptN1PassRate", width: 15 },
      { header: "JLPT N2通过率", key: "jlptN2PassRate", width: 15 },
      { header: "大学升学率", key: "universityAcceptanceRate", width: 15 },
      { header: "有宿舍", key: "hasDormitory", width: 10 },
      { header: "签证支持", key: "hasVisaSupport", width: 12 },
      { header: "打工支持", key: "hasPartTimeSupport", width: 12 },
      { header: "入学时间", key: "enrollmentPeriods", width: 30 },
      { header: "课程时长", key: "courseDurations", width: 30 },
      { header: "标签", key: "tags", width: 30 },
      { header: "奖学金金额", key: "scholarshipAmount", width: 14 },
      { header: "佣金比例", key: "commissionRate", width: 12 },
      { header: "佣金金额", key: "commissionAmount", width: 14 },
      { header: "佣金说明", key: "commissionNotes", width: 30 },
      { header: "精选", key: "isFeatured", width: 8 },
      { header: "封面图片URL", key: "coverImage", width: 50 },
    ];
    worksheet.columns = columns;

    const headerStyle: Partial<ExcelJS.Fill> = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE0E0E0" },
    };

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = headerStyle as ExcelJS.Fill;

    const fmtDate = (d: Date | null) =>
      d ? new Date(d).toISOString().replace("T", " ").slice(0, 19) : "";
    const fmtRate = (v: number | null) =>
      v != null ? `${(v * 100).toFixed(1)}%` : "";
    const fmtArr = (arr: string[] | null) =>
      Array.isArray(arr) ? arr.join(", ") : "";

    for (const s of schoolList) {
      worksheet.addRow({
        id: s.id,
        slug: s.slug,
        isPublished: s.isPublished ? "已发布" : "草稿",
        createdAt: fmtDate(s.createdAt),
        updatedAt: fmtDate(s.updatedAt),
        nameZh: s.nameZh,
        nameJa: s.nameJa,
        schoolType: s.schoolType === "language_school" ? "语言学校" : "进学塾",
        prefecture: s.prefecture ?? "",
        city: s.city ?? "",
        addressJa: s.addressJa ?? "",
        nearestStation: s.nearestStation ?? "",
        walkingMinutes: s.walkingMinutes ?? "",
        website: s.website ?? "",
        phone: s.phone ?? "",
        email: s.email ?? "",
        descriptionZh: s.descriptionZh ?? "",
        establishedYear: s.establishedYear ?? "",
        totalCapacity: s.totalCapacity ?? "",
        classSizeAvg: s.classSizeAvg ?? "",
        chineseRatio: fmtRate(s.chineseRatio),
        jlptN1PassRate: fmtRate(s.jlptN1PassRate),
        jlptN2PassRate: fmtRate(s.jlptN2PassRate),
        universityAcceptanceRate: fmtRate(s.universityAcceptanceRate),
        hasDormitory: s.hasDormitory ? "是" : "否",
        hasVisaSupport: s.hasVisaSupport ? "是" : "否",
        hasPartTimeSupport: s.hasPartTimeSupport ? "是" : "否",
        enrollmentPeriods: fmtArr(s.enrollmentPeriods),
        courseDurations: fmtArr(s.courseDurations),
        tags: fmtArr(s.tags),
        scholarshipAmount: s.scholarshipAmount ?? "",
        commissionRate: s.commissionRate != null ? String(s.commissionRate) : "",
        commissionAmount: s.commissionAmount ?? "",
        commissionNotes: s.commissionNotes ?? "",
        isFeatured: s.isFeatured ? "是" : "否",
        coverImage: s.coverImage ?? "",
      });
    }

    /* ── Sheet 2: 课程数据 ─────────────────────────────── */
    const courseSheet = workbook.addWorksheet("课程数据");
    courseSheet.columns = [
      { header: "学校slug", key: "slug", width: 30 },
      { header: "学校名称", key: "schoolName", width: 30 },
      { header: "课程名称", key: "nameZh", width: 30 },
      { header: "时长(月)", key: "durationMonths", width: 12 },
      { header: "每周课时", key: "hoursPerWeek", width: 12 },
      { header: "上课时段", key: "scheduleType", width: 12 },
      { header: "目标等级", key: "targetLevel", width: 15 },
    ];
    courseSheet.getRow(1).font = { bold: true };
    courseSheet.getRow(1).fill = headerStyle as ExcelJS.Fill;

    for (const c of courseList) {
      const school = schoolLookup.get(c.schoolId);
      courseSheet.addRow({
        slug: school?.slug ?? "",
        schoolName: school?.nameZh ?? "",
        nameZh: c.nameZh,
        durationMonths: c.durationMonths ?? "",
        hoursPerWeek: c.hoursPerWeek ?? "",
        scheduleType: c.scheduleType
          ? (SCHEDULE_TYPE_LABELS[c.scheduleType] ?? c.scheduleType)
          : "",
        targetLevel: c.targetLevel ?? "",
      });
    }

    /* ── Sheet 3: 费用数据 ─────────────────────────────── */
    const feeSheet = workbook.addWorksheet("费用数据");
    feeSheet.columns = [
      { header: "学校slug", key: "slug", width: 30 },
      { header: "学校名称", key: "schoolName", width: 30 },
      { header: "费用类型", key: "feeType", width: 15 },
      { header: "中文名称", key: "nameZh", width: 20 },
      { header: "日文名称", key: "nameJa", width: 20 },
      { header: "金额", key: "amount", width: 12 },
      { header: "缴纳周期", key: "period", width: 12 },
      { header: "是否必需", key: "isRequired", width: 10 },
      { header: "显示顺序", key: "displayOrder", width: 10 },
    ];
    feeSheet.getRow(1).font = { bold: true };
    feeSheet.getRow(1).fill = headerStyle as ExcelJS.Fill;

    for (const f of feeList) {
      const school = schoolLookup.get(f.schoolId);
      feeSheet.addRow({
        slug: school?.slug ?? "",
        schoolName: school?.nameZh ?? "",
        feeType: FEE_TYPE_LABELS[f.feeType] ?? f.feeType,
        nameZh: f.nameZh,
        nameJa: f.nameJa ?? "",
        amount: f.amount,
        period: FEE_PERIOD_LABELS[f.period] ?? f.period,
        isRequired: f.isRequired ? "是" : "否",
        displayOrder: f.displayOrder ?? 0,
      });
    }

    /* ── 输出 ──────────────────────────────────────────── */
    const buffer = await workbook.xlsx.writeBuffer();
    const filename = `schools-export-${new Date().toISOString().slice(0, 10)}.xlsx`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
      },
    });
  } catch (err: unknown) {
    console.error("export-schools error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "导出失败" },
      { status: 500 }
    );
  }
}
