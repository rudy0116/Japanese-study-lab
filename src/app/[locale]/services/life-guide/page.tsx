import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Landmark,
  Smartphone,
  Home,
  CreditCard,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "日本生活落地指南 - 第一周不踩坑",
  description:
    "开银行卡、办手机卡、住民登记……到日本后要做的事情很多，我们提供一步步操作清单",
};

const timeline = [
  {
    day: "到达当天",
    icon: MapPin,
    tasks: [
      {
        title: "从机场到住所",
        detail:
          "我们会提前告知最优交通路线（电车/巴士），标注换乘站和预计费用。成田到东京市区约 ¥1,000–3,500。",
      },
      {
        title: "入住确认",
        detail:
          "如果是学校宿舍，带好入学许可书和护照办理入住。如果是自租公寓，提前确认钥匙领取方式。",
      },
      {
        title: "购买生活必需品",
        detail:
          "附近便利店和百元店的位置标注。推荐第一天先买：洗漱用品、毛巾、拖鞋、垃圾袋。",
      },
    ],
  },
  {
    day: "第 2–3 天",
    icon: Landmark,
    tasks: [
      {
        title: "区役所办理住民登记（転入届）",
        detail:
          "到达后 14 天内必须去居住地的区/市役所办理。需要带护照和在留卡。办理后会在在留卡背面打印地址。",
      },
      {
        title: "申请国民健康保险",
        detail:
          "在区役所同时办理。留学签证持有者可享受 70% 医疗费减免。月保费约 ¥1,500–2,000。",
      },
      {
        title: "领取 My Number 通知",
        detail:
          "住民登记后会收到 My Number（个人编号）通知卡，办银行卡和打工时都需要用到。",
      },
    ],
  },
  {
    day: "第 3–5 天",
    icon: Smartphone,
    tasks: [
      {
        title: "办理手机卡 / SIM 卡",
        detail:
          "推荐方案：到达前在国内买好日本 SIM 卡（如 IIJmio、Mobal），或到达后去格安 SIM 店铺办理。月费约 ¥1,000–3,000。",
      },
      {
        title: "下载常用 APP",
        detail:
          "Google Maps（导航）、Yahoo!乗換案内（电车换乘）、PayPay（移动支付）、LINE（通讯）。",
      },
    ],
  },
  {
    day: "第 5–7 天",
    icon: CreditCard,
    tasks: [
      {
        title: "开设银行账户",
        detail:
          "推荐邮储银行（ゆうちょ）或三菱 UFJ。需要带护照、在留卡、印章（或签名）。部分银行要求在日本居住满 6 个月才能开户，邮储银行通常可以立即办理。",
      },
      {
        title: "办理交通卡",
        detail:
          "Suica 或 PASMO 交通卡，可在车站售票机购买。既可乘车也可在便利店消费，非常方便。",
      },
    ],
  },
  {
    day: "第一周内",
    icon: ShieldCheck,
    tasks: [
      {
        title: "熟悉学校周边",
        detail:
          "找到最近的超市、便利店、药妆店、百元店。记住从住所到学校的通学路线和所需时间。",
      },
      {
        title: "了解垃圾分类规则",
        detail:
          "日本垃圾分类非常严格。每个区有不同的回收日历，入住时务必确认可燃垃圾、不可燃垃圾、资源垃圾的投放日。",
      },
      {
        title: "紧急联系信息",
        detail:
          "警察 110、急救/火灾 119、中国驻日大使馆领事保护 03-3403-3065。保存在手机中以备不时之需。",
      },
    ],
  },
];

export default function LifeGuidePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/zh-CN"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>

      {/* Header */}
      <div className="mb-12">
        <Badge className="mb-4">免费服务</Badge>
        <h1 className="text-3xl font-bold sm:text-4xl">日本生活落地指南</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          到日本的第一周要办的事情特别多：住民登记、银行开户、手机卡、交通卡……
          我们整理了一份按时间顺序排列的操作清单，让你到了之后一步步跟着做，不遗漏、不踩坑。
        </p>
      </div>

      {/* Timeline */}
      <section className="mb-16">
        <div className="relative space-y-8">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 hidden h-full w-0.5 bg-border md:block" />

          {timeline.map((phase, index) => (
            <div key={index} className="relative flex gap-6">
              {/* Icon */}
              <div className="relative z-10 hidden shrink-0 md:block">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <phase.icon className="h-5 w-5" />
                </div>
              </div>

              {/* Content */}
              <Card className="flex-1 border bg-card">
                <CardContent className="p-6">
                  <Badge variant="default" className="mb-4">
                    {phase.day}
                  </Badge>
                  <div className="space-y-5">
                    {phase.tasks.map((task, i) => (
                      <div key={i}>
                        <h3 className="text-base font-semibold">
                          {task.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {task.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Packing essentials */}
      <section className="mb-16">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <h2 className="mb-6 text-xl font-bold text-primary">
              出发前建议准备
            </h2>
            <div className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {[
                "护照 + 在留资格认定书（原件）",
                "入学许可书（原件）",
                "现金（建议 5–10 万日元）",
                "国际信用卡 / Visa 借记卡",
                "日本 SIM 卡或随身 Wi-Fi",
                "证件照（4cm×3cm）数张",
                "印章（如有，可在日本刻制）",
                "常用药品（日本买药需处方）",
                "转换插头（日本为两孔扁插）",
                "重要文件的电子备份",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">想获取完整落地指南？</h2>
        <p className="mt-2 text-muted-foreground">
          提交咨询后，顾问会根据你的目标城市提供定制版指南
        </p>
        <Link href="/zh-CN/consultation" className="mt-6 inline-block">
          <Button size="lg">免费咨询</Button>
        </Link>
      </div>
    </div>
  );
}
