export const dynamic = "force-dynamic";

import { db } from "@/lib/db";
import { consultationRequests, schools } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const STATUS_LABELS: Record<string, { label: string; variant: "default" | "secondary" | "outline" }> = {
  pending: { label: "待处理", variant: "outline" },
  contacted: { label: "已联系", variant: "secondary" },
  completed: { label: "已完成", variant: "default" },
};

export default async function AdminConsultationsPage() {
  const consultations = await db
    .select({
      consultation: consultationRequests,
      schoolName: schools.nameZh,
    })
    .from(consultationRequests)
    .leftJoin(schools, eq(consultationRequests.schoolId, schools.id))
    .orderBy(desc(consultationRequests.createdAt));

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">咨询管理</h1>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>姓名</TableHead>
              <TableHead>联系方式</TableHead>
              <TableHead>感兴趣的学校</TableHead>
              <TableHead>留言</TableHead>
              <TableHead>状态</TableHead>
              <TableHead>提交时间</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.map(({ consultation, schoolName }) => {
              const statusInfo = STATUS_LABELS[consultation.status || "pending"];
              return (
                <TableRow key={consultation.id}>
                  <TableCell className="font-medium">
                    {consultation.name}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      {consultation.email && <p>{consultation.email}</p>}
                      {consultation.phone && <p>{consultation.phone}</p>}
                      {consultation.wechatId && (
                        <p>微信: {consultation.wechatId}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{schoolName || "—"}</TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {consultation.message || "—"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={statusInfo.variant}>
                      {statusInfo.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {consultation.createdAt.toLocaleDateString("zh-CN")}
                  </TableCell>
                </TableRow>
              );
            })}
            {consultations.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                  暂无咨询记录
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
