import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Home, MapPinned, Settings } from "lucide-react";

const sections = [
  {
    title: "首页内容",
    description: "管理特色标签、统计数据、申请步骤、报名礼遇",
    href: "/admin/content/homepage",
    icon: Home,
  },
  {
    title: "城市展示",
    description: "管理首页城市轮播的城市列表",
    href: "/admin/content/cities",
    icon: MapPinned,
  },
  {
    title: "站点设置",
    description: "站点名称、联系方式、营业时间等",
    href: "/admin/content/settings",
    icon: Settings,
  },
];

export default function ContentManagementPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">内容管理</h1>
      <p className="mt-2 text-muted-foreground">
        编辑前台展示的各个模块内容，修改后即时生效。
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full transition-all hover:border-primary/50 hover:shadow-md">
              <CardContent className="pt-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold">{section.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {section.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
