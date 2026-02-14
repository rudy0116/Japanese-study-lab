#!/usr/bin/env tsx
/**
 * 从本地 Excel 文件导入学校到数据库，默认不公开（isPublished: false）
 * 用法: npx tsx scripts/import-schools-local.ts [文件路径]
 */

import * as path from "path";
import * as fs from "fs";
import * as crypto from "crypto";
import ExcelJS from "exceljs";
import * as dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { schools } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("错误: 未找到 DATABASE_URL，请确保 .env.local 已配置");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

/** 根据名称生成唯一且稳定的 slug */
function slugFromName(name: string): string {
  const trimmed = name.trim();
  const safeAscii = trimmed
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fa5-]/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();
  if (safeAscii.length >= 2 && /^[a-z0-9-]+$/.test(safeAscii)) return safeAscii;
  const hash = crypto.createHash("md5").update(trimmed).digest("hex").slice(0, 10);
  return `school-${hash}`;
}

async function main() {
  const filePath =
    process.argv[2] || path.join(process.cwd(), "data", "schools_2026-02-13.xlsx");

  if (!fs.existsSync(filePath)) {
    console.error("错误: 文件不存在:", filePath);
    process.exit(1);
  }

  console.log("读取文件:", filePath);
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);

  const worksheet = workbook.getWorksheet(1);
  if (!worksheet) {
    console.error("错误: 未找到工作表");
    process.exit(1);
  }

  const rows: Record<string, string>[] = [];
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const rowData: Record<string, string> = {};
    row.eachCell((cell, colNumber) => {
      const header = worksheet.getRow(1).getCell(colNumber).value?.toString() || "";
      rowData[header] = cell.value?.toString() ?? "";
    });
    rows.push(rowData);
  });

  console.log(`共 ${rows.length} 行数据，开始导入（状态：不公开，待您手动公开）...\n`);

  let success = 0;
  let updated = 0;
  let failed = 0;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const rowNum = i + 2;

    try {
      if (!row["中文名称"] && !row["日文名称"]) {
        console.log(`跳过第 ${rowNum} 行: 缺少学校名称`);
        failed++;
        continue;
      }

      const nameZh = (row["中文名称"] || row["日文名称"]).trim();
      const nameJa = (row["日文名称"] || row["中文名称"]).trim();
      const slug = slugFromName(nameZh);

      const existing = await db.select().from(schools).where(eq(schools.slug, slug)).limit(1);

      const schoolData = {
        slug,
        nameZh,
        nameJa,
        schoolType: "language_school" as const,
        prefecture: row["都道府县"] || null,
        city: row["城市"] || null,
        addressJa: row["地址（日文）"] || null,
        nearestStation: row["最近车站"] || null,
        walkingMinutes: row["步行分钟"] ? parseInt(row["步行分钟"], 10) : null,
        website: row["官网"] || null,
        phone: row["电话"] || null,
        email: row["邮箱"] || null,
        descriptionZh: row["学校简介"] || null,
        establishedYear: row["创办年份"] ? parseInt(row["创办年份"], 10) : null,
        totalCapacity: row["招生规模"] ? parseInt(row["招生规模"], 10) : null,
        classSizeAvg: row["平均班级人数"] ? parseInt(row["平均班级人数"], 10) : null,
        chineseRatio: row["中国学生比例"]
          ? parseFloat(String(row["中国学生比例"]).replace("%", "")) / 100
          : null,
        jlptN1PassRate: row["JLPT N1通过率"]
          ? parseFloat(String(row["JLPT N1通过率"]).replace("%", "")) / 100
          : null,
        jlptN2PassRate: row["JLPT N2通过率"]
          ? parseFloat(String(row["JLPT N2通过率"]).replace("%", "")) / 100
          : null,
        universityAcceptanceRate: row["大学升学率"]
          ? parseFloat(String(row["大学升学率"]).replace("%", "")) / 100
          : null,
        hasDormitory: row["有宿舍"] === "是" || row["有宿舍"] === "true",
        hasVisaSupport: row["签证支持"] !== "否" && row["签证支持"] !== "false",
        hasPartTimeSupport: row["打工支持"] === "是" || row["打工支持"] === "true",
        enrollmentPeriods: row["入学时间"]
          ? row["入学时间"].split(/[,，、]/).map((s) => s.trim())
          : null,
        courseDurations: row["课程时长"]
          ? row["课程时长"].split(/[,，、]/).map((s) => s.trim())
          : null,
        coverImage: row["封面图片URL"] || null,
        isPublished: false, // 不公开，待后台手动公开
        isFeatured: false,
      };

      if (existing.length > 0) {
        await db
          .update(schools)
          .set({ ...schoolData, updatedAt: new Date() })
          .where(eq(schools.id, existing[0].id));
        updated++;
        if (updated <= 3) console.log(`更新: ${nameZh}`);
      } else {
        await db.insert(schools).values(schoolData);
        success++;
        if (success <= 3) console.log(`新增: ${nameZh}`);
      }
    } catch (err: any) {
      failed++;
      console.error(`第 ${rowNum} 行失败:`, err.message);
    }
  }

  console.log("\n导入完成:");
  console.log("  新增:", success);
  console.log("  更新:", updated);
  console.log("  失败:", failed);
  console.log("\n所有学校均为「未公开」状态，请在管理后台预览后手动公开。");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
