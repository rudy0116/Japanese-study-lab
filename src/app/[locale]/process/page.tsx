import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ClipboardList,
  School,
  FileText,
  Send,
  Plane,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "申请流程",
  description:
    "用5个清晰步骤，解释从选校、对比到签证出发的完整流程，并结合平台的透明优势。",
};

const steps = [
  {
    icon: ClipboardList,
    step: "Step 1",
    title: "在线选校 & 初筛预算",
    subtitle: "像选婚礼会场一样先看“条件”和“预算”",
    items: [
      "在学校列表中按地区、预算和特色筛选出 3–5 所候选学校。",
      "使用学校对比工具，并排查看学费、生活费用估算、升学率等关键数据。",
      "对不符合预算或地区偏好的学校，直接排除。",
    ],
    ctaLabel: "去选学校",
    ctaHref: "/zh-CN/schools",
  },
  {
    icon: School,
    step: "Step 2",
    title: "锁定候选学校 & 深度了解",
    subtitle: "从“看个大概”走向“认真考虑”",
    items: [
      "打开候选学校详情页，查看完整学费明细和平台佣金公开信息。",
      "结合课程设置、班级规模、中国学生比例，判断是否适合自己的规划。",
      "若仍有疑问，可记下 2–3 所最心动的学校名称，进入下一步咨询。",
    ],
    ctaLabel: "查看学校详情",
    ctaHref: "/zh-CN/schools",
  },
  {
    icon: FileText,
    step: "Step 3",
    title: "提交透明咨询表单",
    subtitle: "一次提交，平台帮你和学校沟通细节",
    items: [
      "在“免费咨询”页面填写你的基本情况、预算和意向学校。",
      "顾问会基于平台的真实数据，给出 1–3 套可行方案和风险提示。",
      "你可以看到每一套方案的总费用拆分，而不是一个模糊的“打包价”。",
    ],
    ctaLabel: "填写咨询表单",
    ctaHref: "/zh-CN/consultation",
  },
  {
    icon: Send,
    step: "Step 4",
    title: "确定学校 & 准备材料",
    subtitle: "从“方案”变成“决定”",
    items: [
      "从顾问提供的方案中，选择 1 所最合适的学校和入学期。",
      "在顾问指导下准备在留资格申请材料，并进行预检查。",
      "确认学费支付计划、住宿安排和预计到达时间表。",
    ],
    ctaLabel: "了解材料要求",
    ctaHref: "/zh-CN/process",
  },
  {
    icon: Plane,
    step: "Step 5",
    title: "签证办理 & 抵达日本",
    subtitle: "真正踏上日本之前，避免“落地即踩坑”",
    items: [
      "拿到在留资格认定书后，办理签证并预订机票。",
      "使用平台提供的落地清单完成开户、手机卡、住民登记等手续。",
      "根据平台赠送的课程和服务安排，参加行前说明会和日语体验课。",
    ],
    ctaLabel: "开始免费咨询",
    ctaHref: "/zh-CN/consultation",
  },
];

export default function ProcessPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/80">
          申请流程
        </p>
        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          日本留学，从 5 个清晰步骤开始
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          参考日本本地会场预订网站的逻辑，用简单的 5 步流程，把“选校、对比、咨询、签证、出发”
          串成一条清晰的路径。
        </p>
      </div>

      {/* Horizontal / responsive steps */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {steps.map((step) => (
          <Card
            key={step.step}
            className="flex flex-col border border-white/10 bg-gradient-to-b from-white/10 via-white/[0.02] to-transparent backdrop-blur-xl"
          >
            <CardContent className="flex flex-1 flex-col p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <Badge
                  variant="outline"
                  className="border-primary/40 bg-primary/10 text-[11px] font-mono tracking-[0.16em] uppercase"
                >
                  {step.step}
                </Badge>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <step.icon className="h-4 w-4" />
                </div>
              </div>
              <h2 className="text-sm font-semibold text-foreground">
                {step.title}
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                {step.subtitle}
              </p>
              <ul className="mt-3 space-y-1.5">
                {step.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary/70" />
                    {item}
                  </li>
                ))}
              </ul>
              {step.ctaHref && (
                <Link href={step.ctaHref} className="mt-4 inline-flex">
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-primary/40 bg-background/80 text-xs"
                  >
                    {step.ctaLabel}
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <Card className="mt-12 border-primary/25 bg-primary/5">
        <CardContent className="flex flex-col items-center justify-between gap-4 p-6 text-center sm:flex-row sm:text-left">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              想让顾问帮你一起走完这 5 步？
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              咨询本身完全免费，我们的收入来自向学校公开的佣金。你可以先选好学校，再决定要不要用我们的服务。
            </p>
          </div>
          <Link href="/zh-CN/consultation">
            <Button size="lg" className="text-sm">
              立即免费咨询
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
