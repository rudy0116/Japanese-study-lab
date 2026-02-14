import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { schools } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

/**
 * POST /api/admin/schools/[id]/publish
 * 将学校设为已公开
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) {
    return NextResponse.json({ error: "无效的 ID" }, { status: 400 });
  }

  await db
    .update(schools)
    .set({ isPublished: true, updatedAt: new Date() })
    .where(eq(schools.id, numId));

  return NextResponse.json({ ok: true, message: "已公开" });
}
