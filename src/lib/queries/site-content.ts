import { db } from "@/lib/db";
import { siteContent } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getSiteContent<T>(key: string, fallback: T): Promise<T> {
  try {
    const row = await db
      .select()
      .from(siteContent)
      .where(eq(siteContent.key, key))
      .limit(1);

    if (row.length === 0) return fallback;
    return row[0].content as T;
  } catch {
    return fallback;
  }
}

export async function setSiteContent(
  key: string,
  content: unknown
): Promise<void> {
  await db
    .insert(siteContent)
    .values({ key, content, updatedAt: new Date() })
    .onConflictDoUpdate({
      target: siteContent.key,
      set: { content, updatedAt: new Date() },
    });
}

export async function getAllSiteContent(): Promise<Record<string, unknown>> {
  const rows = await db.select().from(siteContent);
  const result: Record<string, unknown> = {};
  for (const row of rows) {
    result[row.key] = row.content;
  }
  return result;
}
