export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { schools } from "@/lib/db/schema";
import { and, eq, ilike, or } from "drizzle-orm";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const q = searchParams.get("q");

  if (!q || q.length < 1) {
    return NextResponse.json({ results: [] });
  }

  const results = await db
    .select({
      id: schools.id,
      slug: schools.slug,
      nameZh: schools.nameZh,
      nameJa: schools.nameJa,
      prefecture: schools.prefecture,
      schoolType: schools.schoolType,
    })
    .from(schools)
    .where(
      and(
        eq(schools.isPublished, true),
        or(
          ilike(schools.nameZh, `%${q}%`),
          ilike(schools.nameJa, `%${q}%`),
          ilike(schools.descriptionZh, `%${q}%`),
          ilike(schools.prefecture, `%${q}%`),
          ilike(schools.city, `%${q}%`)
        )
      )
    )
    .limit(10);

  return NextResponse.json({ results });
}
