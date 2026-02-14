#!/usr/bin/env tsx
/**
 * 调试脚本：分析网站HTML结构
 */

import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";

async function debugNihongLiuxue() {
  console.log("🔍 分析 nihongliuxue.com 的HTML结构...\n");

  try {
    const response = await axios.get("http://www.nihongliuxue.com/index.php?catid=23", {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      timeout: 30000,
    });

    const $ = cheerio.load(response.data);

    // 保存完整HTML用于分析
    fs.writeFileSync("debug-nihongliuxue.html", response.data);
    console.log("✅ 完整HTML已保存到 debug-nihongliuxue.html\n");

    // 查找所有包含"所在地区"的元素
    console.log("查找包含'所在地区'的元素：");
    $("*:contains('所在地区')").each((i, elem) => {
      const $elem = $(elem);
      const text = $elem.text().substring(0, 200);
      const html = $elem.html()?.substring(0, 300);
      console.log(`\n元素 ${i + 1}:`);
      console.log(`  标签: ${(elem as any).tagName ?? (elem as any).type}`);
      console.log(`  类名: ${$elem.attr("class") || "无"}`);
      console.log(`  ID: ${$elem.attr("id") || "无"}`);
      console.log(`  文本预览: ${text}`);
      console.log(`  HTML预览: ${html}`);
      if (i >= 4) return false; // 只显示前5个
    });

    // 查找所有链接到学校详情页的链接
    console.log("\n\n查找学校详情页链接：");
    $('a[href*="index.php?id="]').each((i, link) => {
      const $link = $(link);
      const href = $link.attr("href");
      const text = $link.text().trim();
      const $parent = $link.parent();
      const parentText = $parent.text().substring(0, 150);

      console.log(`\n链接 ${i + 1}:`);
      console.log(`  href: ${href}`);
      console.log(`  链接文本: ${text}`);
      console.log(`  父元素文本: ${parentText}`);
      if (i >= 4) return false; // 只显示前5个
    });

    // 查找所有可能的学校名称
    console.log("\n\n查找可能的学校名称：");
    $("h1, h2, h3, h4, h5, h6, .title, .name, strong, b").each((i, elem) => {
      const $elem = $(elem);
      const text = $elem.text().trim();
      if (text.length > 2 && text.length < 50 && /[学校|学院|教育|日本語|日本语]/.test(text)) {
        console.log(`\n可能的学校名称 ${i + 1}:`);
        console.log(`  文本: ${text}`);
        console.log(`  标签: ${(elem as any).tagName ?? (elem as any).type}`);
        console.log(`  类名: ${$elem.attr("class") || "无"}`);
        if (i >= 9) return false; // 只显示前10个
      }
    });

  } catch (error: any) {
    console.error("错误:", error.message);
  }
}

debugNihongLiuxue().catch(console.error);
