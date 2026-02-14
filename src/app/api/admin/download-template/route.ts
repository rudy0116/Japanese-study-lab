import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export const runtime = "nodejs";

/**
 * GET /api/admin/download-template
 * 下载 Excel 模板文件
 */
export async function GET() {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("日本语语言学校");

    // 设置列标题
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

    // 设置标题行样式
    worksheet.getRow(1).font = { bold: true };
    worksheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE0E0E0" },
    };

    // 添加示例数据
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

    // 生成 buffer
    const buffer = await workbook.xlsx.writeBuffer();

    return new NextResponse(buffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="schools-template.xlsx"`,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "生成模板失败" },
      { status: 500 }
    );
  }
}
