import { formatPercentage } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import type { School } from "@/lib/db/schema";
import {
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Home,
  FileCheck,
  Briefcase,
  Train,
} from "lucide-react";

interface SchoolStatsProps {
  school: School;
}

export function SchoolStats({ school }: SchoolStatsProps) {
  const stats = [
    {
      icon: Building2,
      label: "创办年份",
      value: school.establishedYear ? `${school.establishedYear}年` : "—",
    },
    {
      icon: Users,
      label: "招生规模",
      value: school.totalCapacity ? `${school.totalCapacity}人` : "—",
    },
    {
      icon: Users,
      label: "中国学生比例",
      value: formatPercentage(school.chineseRatio),
    },
    {
      icon: BookOpen,
      label: "平均班级人数",
      value: school.classSizeAvg ? `${school.classSizeAvg}人` : "—",
    },
    {
      icon: GraduationCap,
      label: "JLPT N1 通过率",
      value: formatPercentage(school.jlptN1PassRate),
    },
    {
      icon: GraduationCap,
      label: "JLPT N2 通过率",
      value: formatPercentage(school.jlptN2PassRate),
    },
    {
      icon: GraduationCap,
      label: "大学升学率",
      value: formatPercentage(school.universityAcceptanceRate),
    },
    {
      icon: Train,
      label: "最近车站",
      value: school.nearestStation
        ? `${school.nearestStation} (步行${school.walkingMinutes}分钟)`
        : "—",
    },
  ];

  const facilities = [
    { icon: Home, label: "提供宿舍", value: school.hasDormitory },
    { icon: FileCheck, label: "签证支持", value: school.hasVisaSupport },
    { icon: Briefcase, label: "打工支持", value: school.hasPartTimeSupport },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-sm">
            <CardContent className="flex items-center gap-3 p-4">
              <stat.icon className="h-5 w-5 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        {facilities.map((f) => (
          <div
            key={f.label}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm ${
              f.value
                ? "bg-green-50 text-green-700"
                : "bg-muted text-muted-foreground"
            }`}
          >
            <f.icon className="h-4 w-4" />
            {f.label}: {f.value ? "有" : "无"}
          </div>
        ))}
      </div>
    </div>
  );
}
