import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { schools } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "nodejs";

/**
 * GET /api/admin/schools/[id]
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) {
    return NextResponse.json({ error: "无效的 ID" }, { status: 400 });
  }

  const [school] = await db
    .select()
    .from(schools)
    .where(eq(schools.id, numId))
    .limit(1);

  if (!school) {
    return NextResponse.json({ error: "学校不存在" }, { status: 404 });
  }

  return NextResponse.json(school);
}

/**
 * PUT /api/admin/schools/[id]
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) {
    return NextResponse.json({ error: "无效的 ID" }, { status: 400 });
  }

  const body = await request.json();

  // Remove fields that should not be updated directly
  delete body.id;
  delete body.createdAt;

  await db
    .update(schools)
    .set({ ...body, updatedAt: new Date() })
    .where(eq(schools.id, numId));

  return NextResponse.json({ ok: true, message: "已更新" });
}
