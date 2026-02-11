import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatJPY, formatCNY } from "@/lib/utils";

interface CostResultCardProps {
  tuitionTotal: number;
  livingTotal: number;
  grandTotal: number;
  grandTotalCNY: number;
  months: number;
}

export function CostResultCard({
  tuitionTotal,
  livingTotal,
  grandTotal,
  grandTotalCNY,
  months,
}: CostResultCardProps) {
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-primary">
          预估总费用 ({months}个月)
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">学费总计</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatJPY(tuitionTotal)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">生活费总计</span>
          <span className="text-lg font-semibold tabular-nums">
            {formatJPY(livingTotal)}
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold">总费用</span>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary tabular-nums">
              {formatJPY(grandTotal)}
            </p>
            <p className="text-sm text-muted-foreground">
              约合人民币 {formatCNY(grandTotalCNY)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
