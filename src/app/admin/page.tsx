export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/lib/db";
import { schools, consultationRequests } from "@/lib/db/schema";
import { eq, sql } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AdminDashboard() {
  const [schoolCount, consultationCount, pendingCount] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(schools),
    db.select({ count: sql<number>`count(*)` }).from(consultationRequests),
    db
      .select({ count: sql<number>`count(*)` })
      .from(consultationRequests)
      .where(eq(consultationRequests.status, "pending")),
  ]);

  const stats = [
    {
      title: "学校总数",
      value: Number(schoolCount[0]?.count ?? 0),
      href: "/admin/schools",
    },
    {
      title: "咨询总数",
      value: Number(consultationCount[0]?.count ?? 0),
      href: "/admin/consultations",
    },
    {
      title: "待处理咨询",
      value: Number(pendingCount[0]?.count ?? 0),
      href: "/admin/consultations",
    },
  ];

  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">管理后台</h1>
      <div className="grid gap-6 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
