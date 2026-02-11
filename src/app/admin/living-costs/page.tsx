export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { livingCostData } from "@/lib/db/schema";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatJPY } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  housing_dormitory: "住宿(宿舍)",
  housing_apartment: "住宿(租房)",
  food: "饮食",
  transportation: "交通",
  phone_internet: "通讯",
  daily_necessities: "日用品",
  entertainment: "娱乐",
};

export default async function AdminLivingCostsPage() {
  const costs = await db.select().from(livingCostData);

  // Group by city
  const byCityMap = new Map<string, typeof costs>();
  for (const cost of costs) {
    const existing = byCityMap.get(cost.city) || [];
    existing.push(cost);
    byCityMap.set(cost.city, existing);
  }
  const byCity = Array.from(byCityMap.entries());

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">生活费数据管理</h1>

      {byCity.map(([city, cityCosts]) => (
        <div key={city} className="mb-8">
          <h2 className="mb-3 text-lg font-semibold">{city}</h2>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>类别</TableHead>
                  <TableHead className="text-right">低</TableHead>
                  <TableHead className="text-right">中</TableHead>
                  <TableHead className="text-right">高</TableHead>
                  <TableHead>备注</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cityCosts.map((cost) => (
                  <TableRow key={cost.id}>
                    <TableCell>
                      <Badge variant="outline">
                        {CATEGORY_LABELS[cost.category] || cost.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatJPY(cost.monthlyLow)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatJPY(cost.monthlyMid)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatJPY(cost.monthlyHigh)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {cost.notesZh || "—"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      ))}
    </div>
  );
}
