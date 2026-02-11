"use client";

import { Badge } from "@/components/ui/badge";
import { formatJPY, formatPercentage, SCHOOL_TYPE_LABELS } from "@/lib/utils";
import type { School, SchoolFeeItem } from "@/lib/db/schema";

type SchoolWithFees = School & { fees: SchoolFeeItem[] };

interface ComparisonTableProps {
  schools: SchoolWithFees[];
}

function getFirstYearTotal(fees: SchoolFeeItem[]) {
  return fees.reduce((sum, fee) => {
    if (fee.period === "one_time" || fee.period === "annual") return sum + fee.amount;
    if (fee.period === "semi_annual") return sum + fee.amount * 2;
    if (fee.period === "monthly") return sum + fee.amount * 12;
    return sum;
  }, 0);
}

export function ComparisonTable({ schools }: ComparisonTableProps) {
  const rows: {
    label: string;
    values: (string | React.ReactNode)[];
    highlight?: boolean;
  }[] = [
    {
      label: "学校类型",
      values: schools.map((s) => SCHOOL_TYPE_LABELS[s.schoolType]),
    },
    {
      label: "地区",
      values: schools.map((s) => `${s.prefecture || ""} ${s.city || ""}`),
    },
    {
      label: "创办年份",
      values: schools.map((s) => (s.establishedYear ? `${s.establishedYear}年` : "—")),
    },
    {
      label: "招生规模",
      values: schools.map((s) => (s.totalCapacity ? `${s.totalCapacity}人` : "—")),
    },
    {
      label: "平均班级人数",
      values: schools.map((s) => (s.classSizeAvg ? `${s.classSizeAvg}人` : "—")),
    },
    {
      label: "中国学生比例",
      values: schools.map((s) => formatPercentage(s.chineseRatio)),
    },
    {
      label: "JLPT N1 通过率",
      values: schools.map((s) => formatPercentage(s.jlptN1PassRate)),
    },
    {
      label: "JLPT N2 通过率",
      values: schools.map((s) => formatPercentage(s.jlptN2PassRate)),
    },
    {
      label: "大学升学率",
      values: schools.map((s) => formatPercentage(s.universityAcceptanceRate)),
      highlight: true,
    },
    {
      label: "第一年学费",
      values: schools.map((s) => {
        const total = getFirstYearTotal(s.fees);
        return total > 0 ? (
          <span className="font-bold text-primary">{formatJPY(total)}</span>
        ) : (
          "—"
        );
      }),
      highlight: true,
    },
    {
      label: "平台佣金",
      values: schools.map((s) =>
        s.commissionAmount ? (
          <span className="font-bold text-transparent-red">
            {formatJPY(s.commissionAmount)}
          </span>
        ) : (
          "—"
        )
      ),
    },
    {
      label: "提供宿舍",
      values: schools.map((s) => (s.hasDormitory ? "有" : "无")),
    },
    {
      label: "签证支持",
      values: schools.map((s) => (s.hasVisaSupport ? "有" : "无")),
    },
    {
      label: "打工支持",
      values: schools.map((s) => (s.hasPartTimeSupport ? "有" : "无")),
    },
    {
      label: "入学时间",
      values: schools.map((s) =>
        s.enrollmentPeriods && s.enrollmentPeriods.length > 0 ? (
          <div className="flex flex-wrap gap-1">
            {s.enrollmentPeriods.map((p) => (
              <Badge key={p} variant="outline" className="text-xs">
                {p}
              </Badge>
            ))}
          </div>
        ) : (
          "—"
        )
      ),
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="p-3 text-left font-semibold">对比项目</th>
            {schools.map((s) => (
              <th key={s.id} className="min-w-[180px] p-3 text-center font-semibold">
                <div>{s.nameZh}</div>
                <div className="mt-1 text-xs font-normal text-muted-foreground">
                  {s.nameJa}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.label}
              className={`border-b ${row.highlight ? "bg-primary/5" : ""}`}
            >
              <td className="p-3 font-medium">{row.label}</td>
              {row.values.map((value, i) => (
                <td key={i} className="p-3 text-center">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
