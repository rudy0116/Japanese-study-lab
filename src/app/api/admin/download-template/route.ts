import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export const runtime = "nodejs";

/**
 * GET /api/admin/download-template
 * 下载 Excel 模板文件（含学校、课程、费用三个工作表）
 */
export async function GET() {
  try {
    const workbook = new ExcelJS.Workbook();

    const headerStyle: Partial<ExcelJS.Fill> = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE0E0E0" },
    };

    /* ── Sheet 1: 学校数据 ─────────────────────────────── */
    const worksheet = workbook.addWorksheet("学校数据");

    worksheet.columns = [
      { header: "中文名称", key: "nameZh", width: 30 },
      { header: "日文名称", key: "nameJa", width: 40 },
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
      { header: "封面图片URL", key: "coverImage", width: 50 },
    ];

    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = headerStyle as ExcelJS.Fill;

    worksheet.addRow({
      nameZh: "示例语言学校",
      nameJa: "サンプル日本語学校",
      prefecture: "东京都",
      city: "东京",
      addressJa: "東京都渋谷区...",
      nearestStation: "渋谷駅",
      walkingMinutes: "5",
      website: "https://example.com",
      phone: "03-1234-5678",
      email: "info@example.com",
      descriptionZh: "这是一所示例语言学校...",
      establishedYear: "2000",
      totalCapacity: "300",
      classSizeAvg: "15",
      chineseRatio: "30%",
      jlptN1PassRate: "40%",
      jlptN2PassRate: "75%",
      universityAcceptanceRate: "85%",
      hasDormitory: "是",
      hasVisaSupport: "是",
      hasPartTimeSupport: "是",
      enrollmentPeriods: "1月,4月,7月,10月",
      courseDurations: "1年,1.5年,2年",
      coverImage: "https://example.com/image.jpg",
    });

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

    courseSheet.addRow({
      slug: "shi-li-yu-yan-xue-xiao",
      schoolName: "示例语言学校",
      nameZh: "综合日语课程",
      durationMonths: "24",
      hoursPerWeek: "20",
      scheduleType: "上午班",
      targetLevel: "N5-N1",
    });
    courseSheet.addRow({
      slug: "shi-li-yu-yan-xue-xiao",
      schoolName: "示例语言学校",
      nameZh: "升学准备课程",
      durationMonths: "12",
      hoursPerWeek: "25",
      scheduleType: "全日制",
      targetLevel: "N3-N1",
    });

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

    feeSheet.addRow({
      slug: "shi-li-yu-yan-xue-xiao",
      schoolName: "示例语言学校",
      feeType: "入学金",
      nameZh: "入学金",
      nameJa: "入学金",
      amount: "55000",
      period: "一次性",
      isRequired: "是",
      displayOrder: "1",
    });
    feeSheet.addRow({
      slug: "shi-li-yu-yan-xue-xiao",
      schoolName: "示例语言学校",
      feeType: "授业料",
      nameZh: "授业料",
      nameJa: "授業料",
      amount: "1350000",
      period: "年额",
      isRequired: "是",
      displayOrder: "2",
    });

    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="schools-template.xlsx"`,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "生成模板失败" },
      { status: 500 }
    );
  }
}
