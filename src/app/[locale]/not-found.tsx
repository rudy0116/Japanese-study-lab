import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <p className="mt-4 text-xl text-muted-foreground">页面未找到</p>
      <p className="mt-2 text-sm text-muted-foreground">
        你要找的页面不存在或已被移除
      </p>
      <Link href="/zh-CN" className="mt-8">
        <Button>返回首页</Button>
      </Link>
    </div>
  );
}
