"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CostBreakdownChartProps {
  items: { name: string; amount: number }[];
}

const COLORS = [
  "#2E3A59",
  "#3D5A80",
  "#98C1D9",
  "#E0FBFC",
  "#EE6C4D",
  "#F4A261",
  "#E76F51",
];

export function CostBreakdownChart({ items }: CostBreakdownChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">每月生活费构成</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={items} layout="vertical">
            <XAxis
              type="number"
              tickFormatter={(v) => `¥${(v / 1000).toFixed(0)}k`}
            />
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip formatter={(v) => `¥${Number(v).toLocaleString()}`} />
            <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
              {items.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
