import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatJPY, FEE_PERIOD_LABELS } from "@/lib/utils";
import type { SchoolFeeItem } from "@/lib/db/schema";

interface FeeBreakdownTableProps {
  fees: SchoolFeeItem[];
}

export function FeeBreakdownTable({ fees }: FeeBreakdownTableProps) {
  if (fees.length === 0) {
    return (
      <p className="py-8 text-center text-muted-foreground">暂无学费数据</p>
    );
  }

  const firstYearTotal = fees.reduce((sum, fee) => {
    if (fee.period === "one_time" || fee.period === "annual") {
      return sum + fee.amount;
    }
    if (fee.period === "semi_annual") {
      return sum + fee.amount * 2;
    }
    if (fee.period === "monthly") {
      return sum + fee.amount * 12;
    }
    return sum;
  }, 0);

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">费用项目</TableHead>
            <TableHead className="text-right font-semibold">金额 (JPY)</TableHead>
            <TableHead className="text-center font-semibold">周期</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fees.map((fee) => (
            <TableRow key={fee.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{fee.nameZh}</span>
                  {fee.nameJa && (
                    <span className="text-xs text-muted-foreground">
                      ({fee.nameJa})
                    </span>
                  )}
                  {!fee.isRequired && (
                    <Badge variant="outline" className="text-xs">
                      可选
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                {formatJPY(fee.amount)}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary" className="text-xs">
                  {FEE_PERIOD_LABELS[fee.period] || fee.period}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-primary/5 font-bold">
            <TableCell>第一年总费用</TableCell>
            <TableCell className="text-right tabular-nums text-primary">
              {formatJPY(firstYearTotal)}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
