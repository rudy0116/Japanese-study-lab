#!/usr/bin/env tsx
/**
 * 从多个网站抓取日本语语言学校信息
 * 数据来源：
 * - https://studyinjpn.com/ja/search
 * - http://www.nihongliuxue.com/index.php?catid=23
 * - http://www.liuxuewind.com/LanguageSchoolv2
 */

import axios from "axios";
import * as cheerio from "cheerio";
import ExcelJS from "exceljs";
import * as fs from "fs";
import * as path from "path";

interface SchoolData {
  nameZh: string;
  nameJa: string;
  prefecture?: string;
  city?: string;
  addressJa?: string;
  nearestStation?: string;
  walkingMinutes?: number;
  website?: string;
  phone?: string;
  email?: string;
  descriptionZh?: string;
  establishedYear?: number;
  totalCapacity?: number;
  classSizeAvg?: number;
  chineseRatio?: number;
  jlptN1PassRate?: number;
  jlptN2PassRate?: number;
  universityAcceptanceRate?: number;
  hasDormitory?: boolean;
  hasVisaSupport?: boolean;
  hasPartTimeSupport?: boolean;
  enrollmentPeriods?: string;
  courseDurations?: string;
  coverImage?: string;
  source: string; // 来源网站
  sourceUrl?: string; // 来源链接
}

// 延迟函数，避免请求过快
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 从 studyinjpn.com 抓取数据
 */
async function scrapeStudyInJpn(): Promise<SchoolData[]> {
  const schools: SchoolData[] = [];
  console.log("开始抓取 studyinjpn.com...");

  try {
    // 这里需要根据实际网站结构调整
    // 由于网站可能有反爬虫，这里提供一个基础框架
    const response = await axios.get("https://studyinjpn.com/ja/search", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      timeout: 30000,
    });

    const $ = cheerio.load(response.data);
    // 根据实际HTML结构调整选择器
    $(".school-item, .school-card, .school-list-item").each((i, elem) => {
      const $elem = $(elem);
      const nameJa = $elem.find(".school-name-ja, h2, h3").first().text().trim();
      const nameZh = $elem.find(".school-name-zh, .name-zh").first().text().trim() || nameJa;
      const prefecture = $elem.find(".prefecture, .region").first().text().trim();
      const city = $elem.find(".city").first().text().trim();
      const addressJa = $elem.find(".address").first().text().trim();
      const website = $elem.find("a[href*='http']").first().attr("href");

      if (nameJa || nameZh) {
        schools.push({
          nameZh,
          nameJa: nameJa || nameZh,
          prefecture,
          city,
          addressJa,
          website,
          source: "studyinjpn.com",
          sourceUrl: website,
        });
      }
    });

    console.log(`从 studyinjpn.com 抓取到 ${schools.length} 所学校`);
  } catch (error) {
    console.error("抓取 studyinjpn.com 失败:", error);
  }

  return schools;
}

/**
 * 从 nihongliuxue.com 抓取数据
 */
async function scrapeNihongLiuxue(): Promise<SchoolData[]> {
  const schools: SchoolData[] = [];
  console.log("开始抓取 nihongliuxue.com...");

  try {
    // 先获取第一页，然后检查是否有分页
    let page = 1;
    let hasMore = true;
    const maxPages = 25; // 限制最多抓取25页

    while (hasMore && page <= maxPages) {
      const url =
        page === 1
          ? "http://www.nihongliuxue.com/index.php?catid=23"
          : `http://www.nihongliuxue.com/index.php?c=index&catid=23&page=${page}`;

      console.log(`  抓取第 ${page} 页...`);

      const response = await axios.get(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
        },
        timeout: 30000,
      });

      const $ = cheerio.load(response.data);

      // 根据实际HTML结构：学校信息在包含 class="f_y" (学校名称) 的容器中
      let foundOnPage = 0;

      // 查找所有学校名称容器
      $(".f_y").each((i, nameElem) => {
        const $nameElem = $(nameElem);
        const nameZh = $nameElem.text().trim();

        if (!nameZh || nameZh.length < 2) return;

        // 查找同一父容器或兄弟容器中的其他信息
        const $container = $nameElem.closest("div").parent();
        if ($container.length === 0) return;

        // 提取所在地区
        const $regionElem = $container.find(".g_n");
        let prefecture = "";
        let city = "";
        if ($regionElem.length > 0) {
          const regionText = $regionElem.find("span").text().trim() || $regionElem.text().replace("所在地区：", "").trim();
          if (regionText) {
            // 解析地区：格式可能是"关东地区，东京都"或"关东，东京都"
            const parts = regionText.split(/[，,]/);
            if (parts.length > 1) {
              prefecture = parts[parts.length - 1].trim(); // 最后一个通常是都道府县
              city = parts[parts.length - 1].trim();
            } else {
              prefecture = regionText;
            }
          }
        }

        // 提取学校介绍
        const $descElem = $container.find(".g_p");
        const descriptionZh = $descElem.length > 0 ? $descElem.text().trim() : "";

        // 查找"查看学校"链接
        const $link = $container.find('a.g_s[href*="index.php?id="]').first();
        const href = $link.attr("href");
        const sourceUrl = href ? `http://www.nihongliuxue.com${href}` : undefined;

        // 避免重复
        if (!schools.find((s) => s.nameZh === nameZh)) {
          schools.push({
            nameZh,
            nameJa: nameZh, // 这个网站主要显示中文名
            prefecture,
            city,
            descriptionZh,
            source: "nihongliuxue.com",
            sourceUrl,
          });
          foundOnPage++;
        }
      });

      console.log(`  第 ${page} 页找到 ${foundOnPage} 所学校`);

      // 检查是否有下一页
      const nextPageLink = $('a:contains("下一页"), a:contains("下页")').first();
      hasMore = nextPageLink.length > 0 && foundOnPage > 0;

      page++;
      await delay(1000); // 延迟1秒避免请求过快
    }

    console.log(`从 nihongliuxue.com 抓取到 ${schools.length} 所学校`);
  } catch (error: any) {
    console.error("抓取 nihongliuxue.com 失败:", error.message);
  }

  return schools;
}

/**
 * 从 liuxuewind.com 抓取数据
 */
async function scrapeLiuxuewind(): Promise<SchoolData[]> {
  const schools: SchoolData[] = [];
  console.log("开始抓取 liuxuewind.com...");

  try {
    // 尝试多个可能的URL
    const urls = [
      "http://www.liuxuewind.com/LanguageSchoolv2",
      "http://www.liuxuewind.com/LanguageSchool",
      "http://www.liuxuewind.com/index.php/LanguageSchool",
    ];

    for (const url of urls) {
      try {
        console.log(`  尝试访问: ${url}`);
        const response = await axios.get(url, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
          },
          timeout: 20000,
        });

        const $ = cheerio.load(response.data);

        // 尝试多种选择器模式
        const selectors = [
          ".school-item",
          ".school-list-item",
          ".item",
          ".school-card",
          "article",
          "div[class*='school']",
          "div[class*='item']",
          "li",
          "tr",
        ];

        for (const selector of selectors) {
          $(selector).each((i, elem) => {
            const $elem = $(elem);
            const text = $elem.text();

            // 跳过太短或明显不是学校信息的元素
            if (text.length < 10) return;

            // 查找学校名称（通常是链接文本或标题）
            const $link = $elem.find("a").first();
            let nameZh = $link.text().trim();
            if (!nameZh || nameZh.length < 2) {
              nameZh = $elem.find("h2, h3, h4, .title, .name").first().text().trim();
            }
            if (!nameZh || nameZh.length < 2) {
              // 尝试从文本开头提取
              const lines = text.split("\n").map((l) => l.trim()).filter((l) => l.length > 0);
              nameZh = lines[0] || "";
            }

            if (!nameZh || nameZh.length < 2) return;

            // 提取其他信息
            const nameJa = $elem.find(".name-ja, .japanese-name").first().text().trim() || nameZh;
            const prefecture = $elem.find(".prefecture, .region, .area").first().text().trim();
            const city = $elem.find(".city").first().text().trim();
            const addressJa = $elem.find(".address, .addr").first().text().trim();
            const phone = $elem.find(".phone, .tel").first().text().trim();
            const website = $link.attr("href");
            const descriptionZh = $elem.find(".description, .intro, p").first().text().trim();

            // 避免重复
            if (!schools.find((s) => s.nameZh === nameZh)) {
              schools.push({
                nameZh,
                nameJa,
                prefecture,
                city,
                addressJa,
                phone,
                website: website?.startsWith("http") ? website : undefined,
                descriptionZh,
                source: "liuxuewind.com",
                sourceUrl: website?.startsWith("http")
                  ? website
                  : website
                  ? `http://www.liuxuewind.com${website}`
                  : undefined,
              });
            }
          });

          if (schools.length > 0) break; // 如果找到数据就停止尝试其他选择器
        }

        if (schools.length > 0) break; // 如果找到数据就停止尝试其他URL
      } catch (err: any) {
        console.log(`  访问 ${url} 失败: ${err.message}`);
        continue;
      }
    }

    console.log(`从 liuxuewind.com 抓取到 ${schools.length} 所学校`);
  } catch (error: any) {
    console.error("抓取 liuxuewind.com 失败:", error.message);
  }

  return schools;
}

/**
 * 合并去重学校数据
 */
function mergeSchools(allSchools: SchoolData[]): SchoolData[] {
  const merged = new Map<string, SchoolData>();

  for (const school of allSchools) {
    const key = school.nameZh || school.nameJa;
    if (!key) continue;

    const existing = merged.get(key);
    if (existing) {
      // 合并数据，优先保留更完整的信息
      merged.set(key, {
        ...existing,
        ...school,
        nameZh: school.nameZh || existing.nameZh,
        nameJa: school.nameJa || existing.nameJa,
        prefecture: school.prefecture || existing.prefecture,
        city: school.city || existing.city,
        addressJa: school.addressJa || existing.addressJa,
        website: school.website || existing.website,
        phone: school.phone || existing.phone,
        email: school.email || existing.email,
        descriptionZh: school.descriptionZh || existing.descriptionZh,
        source: `${existing.source}, ${school.source}`,
      });
    } else {
      merged.set(key, school);
    }
  }

  return Array.from(merged.values());
}

/**
 * 导出到 Excel
 */
async function exportToExcel(schools: SchoolData[], outputPath: string) {
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
    { header: "数据来源", key: "source", width: 30 },
    { header: "来源链接", key: "sourceUrl", width: 50 },
  ];

  // 设置标题行样式
  worksheet.getRow(1).font = { bold: true };
  worksheet.getRow(1).fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FFE0E0E0" },
  };

  // 添加数据
  schools.forEach((school) => {
    worksheet.addRow({
      nameZh: school.nameZh,
      nameJa: school.nameJa,
      prefecture: school.prefecture || "",
      city: school.city || "",
      addressJa: school.addressJa || "",
      nearestStation: school.nearestStation || "",
      walkingMinutes: school.walkingMinutes || "",
      website: school.website || "",
      phone: school.phone || "",
      email: school.email || "",
      descriptionZh: school.descriptionZh || "",
      establishedYear: school.establishedYear || "",
      totalCapacity: school.totalCapacity || "",
      classSizeAvg: school.classSizeAvg || "",
      chineseRatio: school.chineseRatio ? (school.chineseRatio * 100).toFixed(1) + "%" : "",
      jlptN1PassRate: school.jlptN1PassRate ? (school.jlptN1PassRate * 100).toFixed(1) + "%" : "",
      jlptN2PassRate: school.jlptN2PassRate ? (school.jlptN2PassRate * 100).toFixed(1) + "%" : "",
      universityAcceptanceRate: school.universityAcceptanceRate
        ? (school.universityAcceptanceRate * 100).toFixed(1) + "%"
        : "",
      hasDormitory: school.hasDormitory ? "是" : "否",
      hasVisaSupport: school.hasVisaSupport !== false ? "是" : "否",
      hasPartTimeSupport: school.hasPartTimeSupport ? "是" : "否",
      enrollmentPeriods: school.enrollmentPeriods || "",
      courseDurations: school.courseDurations || "",
      coverImage: school.coverImage || "",
      source: school.source,
      sourceUrl: school.sourceUrl || "",
    });
  });

  // 保存文件
  await workbook.xlsx.writeFile(outputPath);
  console.log(`\n✅ Excel 文件已保存到: ${outputPath}`);
  console.log(`共 ${schools.length} 所学校`);
}

/**
 * 主函数
 */
async function main() {
  console.log("🚀 开始抓取日本语语言学校数据...\n");

  const allSchools: SchoolData[] = [];

  // 优先抓取指定的两个网站
  console.log("优先抓取 nihongliuxue.com 和 liuxuewind.com...\n");
  const [schools2, schools3] = await Promise.all([
    scrapeNihongLiuxue(),
    scrapeLiuxuewind(),
  ]);

  allSchools.push(...schools2, ...schools3);

  // 可选：如果需要也可以抓取 studyinjpn.com
  // const schools1 = await scrapeStudyInJpn();
  // allSchools.push(...schools1);

  // 合并去重
  const mergedSchools = mergeSchools(allSchools);
  console.log(`\n📊 合并后共 ${mergedSchools.length} 所不重复的学校`);

  // 导出到 Excel
  const outputDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `schools_${new Date().toISOString().split("T")[0]}.xlsx`);
  await exportToExcel(mergedSchools, outputPath);

  console.log("\n✨ 完成！");
}

// 运行
main().catch(console.error);
