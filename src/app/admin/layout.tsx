import Link from "next/link";
import "@/app/globals.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 border-r bg-secondary/30 p-6">
            <Link href="/admin" className="text-lg font-bold text-primary">
              管理后台
            </Link>
            <nav className="mt-8 space-y-2">
              <Link
                href="/admin/schools"
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                学校管理
              </Link>
              <Link
                href="/admin/consultations"
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                咨询管理
              </Link>
              <Link
                href="/admin/living-costs"
                className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
              >
                生活费数据
              </Link>
              <div className="border-t pt-2 mt-2">
                <p className="px-3 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  内容管理
                </p>
                <Link
                  href="/admin/content"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  内容总览
                </Link>
                <Link
                  href="/admin/content/homepage"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  首页内容
                </Link>
                <Link
                  href="/admin/content/cities"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  城市展示
                </Link>
                <Link
                  href="/admin/content/settings"
                  className="block rounded-md px-3 py-2 text-sm hover:bg-accent"
                >
                  站点设置
                </Link>
              </div>
              <div className="border-t pt-2 mt-2">
                <Link
                  href="/zh-CN"
                  className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent"
                >
                  返回前台
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
