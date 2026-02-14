#!/usr/bin/env tsx
/**
 * 将默认站点内容写入数据库（upsert，不覆盖已修改的内容）
 * 用法: npx tsx scripts/seed-site-content.ts
 */

import * as path from "path";
import * as dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { siteContent } from "../src/lib/db/schema";
import {
  CONTENT_KEYS,
  DEFAULT_FEATURE_TAGS,
  DEFAULT_STATS,
  DEFAULT_STEPS,
  DEFAULT_BONUSES,
  DEFAULT_CITIES,
  DEFAULT_FLOATING_BENEFITS,
  DEFAULT_SITE_SETTINGS,
} from "../src/lib/site-defaults";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("DATABASE_URL is not set in .env.local");
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

const SEED_DATA: { key: string; content: unknown }[] = [
  { key: CONTENT_KEYS.FEATURE_TAGS, content: DEFAULT_FEATURE_TAGS },
  { key: CONTENT_KEYS.STATS, content: DEFAULT_STATS },
  { key: CONTENT_KEYS.STEPS, content: DEFAULT_STEPS },
  { key: CONTENT_KEYS.BONUSES, content: DEFAULT_BONUSES },
  { key: CONTENT_KEYS.CITIES, content: DEFAULT_CITIES },
  { key: CONTENT_KEYS.FLOATING_BENEFITS, content: DEFAULT_FLOATING_BENEFITS },
  { key: CONTENT_KEYS.SITE_SETTINGS, content: DEFAULT_SITE_SETTINGS },
];

async function main() {
  console.log("Seeding site_content table...");

  for (const { key, content } of SEED_DATA) {
    await db
      .insert(siteContent)
      .values({ key, content, updatedAt: new Date() })
      .onConflictDoUpdate({
        target: siteContent.key,
        set: { content, updatedAt: new Date() },
      });

    console.log(`  ✓ ${key}`);
  }

  console.log("\nDone! Seeded", SEED_DATA.length, "content keys.");
  console.log("Note: Existing entries were overwritten with latest defaults.");
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
