export const dynamic = "force-dynamic";

import Link from "next/link";
import { db } from "@/lib/db";
import { schools } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SCHOOL_TYPE_LABELS, formatJPY } from "@/lib/utils";

export default async function AdminSchoolsPage() {
  const schoolList = await db
    .select()
    .from(schools)
    .orderBy(desc(schools.createdAt));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">学校管理</h1>
        <Link href="/admin/schools/new">
          <Button>添加学校</Button>
        </Link>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>学校名称</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>地区</TableHead>
              <TableHead>佣金</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schoolList.map((school) => (
              <TableRow key={school.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{school.nameZh}</p>
                    <p className="text-xs text-muted-foreground">
                      {school.nameJa}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {SCHOOL_TYPE_LABELS[school.schoolType]}
                  </Badge>
                </TableCell>
                <TableCell>{school.prefecture}</TableCell>
                <TableCell>
                  {school.commissionAmount
                    ? formatJPY(school.commissionAmount)
                    : "—"}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={school.isPublished ? "default" : "outline"}
                  >
                    {school.isPublished ? "已发布" : "草稿"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/admin/schools/${school.id}`}
                    className="text-sm text-primary hover:underline"
                  >
                    编辑
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
