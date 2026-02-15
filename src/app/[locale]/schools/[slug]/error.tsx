"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SchoolDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // 可在此上报到监控
    console.error("School detail error:", error.message);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      <h1 className="text-xl font-semibold text-foreground">页面加载失败</h1>
      <p className="mt-2 text-muted-foreground">
        暂时无法加载该学校详情，请检查网络或稍后再试。
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Button onClick={reset} variant="default">
          重试
        </Button>
        <Button asChild variant="outline">
          <Link href="/zh-CN/schools">返回学校列表</Link>
        </Button>
      </div>
    </div>
  );
}
