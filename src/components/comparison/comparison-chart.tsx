"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import type { School, SchoolFeeItem } from "@/lib/db/schema";

type SchoolWithFees = School & { fees: SchoolFeeItem[] };

interface ComparisonChartProps {
  schools: SchoolWithFees[];
}

const COLORS = ["#2E3A59", "#C0392B", "#27AE60", "#F39C12"];

export function ComparisonChart({ schools }: ComparisonChartProps) {
  // Fee comparison bar chart data
  const feeData = schools.map((s) => {
    const total = s.fees.reduce((sum, fee) => {
      if (fee.period === "one_time" || fee.period === "annual")
        return sum + fee.amount;
      if (fee.period === "semi_annual") return sum + fee.amount * 2;
      if (fee.period === "monthly") return sum + fee.amount * 12;
      return sum;
    }, 0);
    return {
      name: s.nameZh.length > 6 ? s.nameZh.slice(0, 6) + "..." : s.nameZh,
      第一年学费: total,
      平台佣金: s.commissionAmount || 0,
    };
  });

  // Radar chart data for comparison dimensions
  const radarData = [
    {
      dimension: "JLPT N2通过率",
      ...Object.fromEntries(
        schools.map((s, i) => [`school${i}`, (s.jlptN2PassRate || 0) * 100])
      ),
    },
    {
      dimension: "升学率",
      ...Object.fromEntries(
        schools.map((s, i) => [
          `school${i}`,
          (s.universityAcceptanceRate || 0) * 100,
        ])
      ),
    },
    {
      dimension: "招生规模",
      ...Object.fromEntries(
        schools.map((s, i) => [
          `school${i}`,
          Math.min(((s.totalCapacity || 0) / 10), 100),
        ])
      ),
    },
    {
      dimension: "国际化",
      ...Object.fromEntries(
        schools.map((s, i) => [
          `school${i}`,
          (1 - (s.chineseRatio || 0)) * 100,
        ])
      ),
    },
    {
      dimension: "便利性",
      ...Object.fromEntries(
        schools.map((s, i) => [
          `school${i}`,
          Math.max(0, 100 - (s.walkingMinutes || 10) * 8),
        ])
      ),
    },
  ];

  return (
    <div className="space-y-8">
      {/* Fee comparison */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">学费对比</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={feeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(v) => `¥${(v / 10000).toFixed(0)}万`} />
            <Tooltip formatter={(v) => `¥${Number(v).toLocaleString()}`} />
            <Legend />
            <Bar dataKey="第一年学费" fill="#2E3A59" />
            <Bar dataKey="平台佣金" fill="#C0392B" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Radar comparison */}
      <div>
        <h3 className="mb-4 text-lg font-semibold">综合数据对比</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="dimension" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} />
            {schools.map((s, i) => (
              <Radar
                key={s.id}
                name={s.nameZh}
                dataKey={`school${i}`}
                stroke={COLORS[i]}
                fill={COLORS[i]}
                fillOpacity={0.15}
              />
            ))}
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
