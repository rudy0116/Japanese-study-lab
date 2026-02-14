import { NextRequest, NextResponse } from "next/server";
import { getSiteContent, setSiteContent } from "@/lib/queries/site-content";
import {
  CONTENT_KEYS,
  DEFAULT_FEATURE_TAGS,
  DEFAULT_STATS,
  DEFAULT_STEPS,
  DEFAULT_BONUSES,
  DEFAULT_CITIES,
  DEFAULT_FLOATING_BENEFITS,
  DEFAULT_SITE_SETTINGS,
} from "@/lib/site-defaults";

export const runtime = "nodejs";

const DEFAULTS: Record<string, unknown> = {
  [CONTENT_KEYS.FEATURE_TAGS]: DEFAULT_FEATURE_TAGS,
  [CONTENT_KEYS.STATS]: DEFAULT_STATS,
  [CONTENT_KEYS.STEPS]: DEFAULT_STEPS,
  [CONTENT_KEYS.BONUSES]: DEFAULT_BONUSES,
  [CONTENT_KEYS.CITIES]: DEFAULT_CITIES,
  [CONTENT_KEYS.FLOATING_BENEFITS]: DEFAULT_FLOATING_BENEFITS,
  [CONTENT_KEYS.SITE_SETTINGS]: DEFAULT_SITE_SETTINGS,
};

const VALID_KEYS = new Set<string>(Object.values(CONTENT_KEYS));

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  if (!VALID_KEYS.has(key)) {
    return NextResponse.json({ error: "无效的 key" }, { status: 400 });
  }

  const fallback = DEFAULTS[key] ?? null;
  const content = await getSiteContent(key, fallback);
  return NextResponse.json({ key, content });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;

  if (!VALID_KEYS.has(key)) {
    return NextResponse.json({ error: "无效的 key" }, { status: 400 });
  }

  try {
    const body = await request.json();
    await setSiteContent(key, body.content);
    return NextResponse.json({ ok: true, message: "已更新" });
  } catch {
    return NextResponse.json({ error: "请求格式错误" }, { status: 400 });
  }
}
