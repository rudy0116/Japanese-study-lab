import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { formatJPY, formatPercentage } from "@/lib/utils";
import { Lightbulb } from "lucide-react";

interface CommissionBadgeProps {
  commissionAmount?: number | null;
  commissionRate?: number | null;
  commissionNotes?: string | null;
}

export function CommissionBadge({
  commissionAmount,
  commissionRate,
  commissionNotes,
}: CommissionBadgeProps) {
  if (!commissionAmount && !commissionRate) return null;

  return (
    <Card className="border-transparent-red/30 bg-transparent-red-muted/30">
      <CardContent className="p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-transparent-red/10">
            <Lightbulb className="h-5 w-5 text-transparent-red" />
          </div>
          <div>
            <h4 className="font-semibold text-transparent-red">透明声明</h4>
            <div className="mt-2 space-y-1">
              {commissionAmount && (
                <p className="text-lg font-bold">
                  我们从该校获得的佣金:{" "}
                  <span className="text-transparent-red">
                    {formatJPY(commissionAmount)}
                  </span>
                  {commissionRate && (
                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                      (学费的{formatPercentage(commissionRate)})
                    </span>
                  )}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                这是我们免费为你服务的方式。
              </p>
              {commissionNotes && (
                <p className="text-xs text-muted-foreground">
                  {commissionNotes}
                </p>
              )}
            </div>
            <Link
              href="/zh-CN/about"
              className="mt-2 inline-block text-sm font-medium text-transparent-red hover:underline"
            >
              了解我们的透明承诺 →
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
