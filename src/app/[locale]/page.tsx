import Link from "next/link";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Eye,
  BarChart3,
  Shield,
  Search,
  GitCompareArrows,
  MessageSquareText,
  FileCheck2,
  PlaneTakeoff,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  const t = useTranslations("home");

  const values = [
    {
      icon: Eye,
      title: t("value1Title"),
      description: t("value1Desc"),
    },
    {
      icon: Shield,
      title: t("value2Title"),
      description: t("value2Desc"),
    },
    {
      icon: BarChart3,
      title: t("value3Title"),
      description: t("value3Desc"),
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-28">
        {/* 背景：柔和渐变光晕 */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/15 blur-[120px]" />
          <div className="absolute -right-32 top-20 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-medium tracking-widest text-primary">
            日本留学 · 极致透明 · 实时报价
          </span>

          <h1 className="mt-8 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t("heroTitle")}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/zh-CN/schools">
              <Button size="lg" className="text-base transition-transform duration-200 hover:-translate-y-0.5">
                {t("heroCta")}
              </Button>
            </Link>
            <Link href="/zh-CN/calculator">
              <Button
                size="lg"
                variant="outline"
                className="text-base transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5"
              >
                {t("heroSecondaryCta")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="px-4 pb-16 pt-4">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
            {t("whyTransparent")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
            用可视化的数据和完全公开的费用结构，让"我要去哪所学校"这件事第一次变得像选一款产品一样清晰。
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {values.map((value) => (
              <Card
                key={value.title}
                className="group border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="pt-6">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative border-t border-primary/10 px-4 py-20 sm:py-24">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute left-1/2 top-20 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              申请流程
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              像选会场一样选学校
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">
              用「区域 + 预算 + 条件」方式筛选学校，每一步都透明可见，不需要和任何人"试探性聊天"。
            </p>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-5">
            {[
              {
                step: "01",
                icon: Search,
                title: "选学校",
                desc: "按地区、预算和特色筛选出 3–5 所候选学校。",
              },
              {
                step: "02",
                icon: GitCompareArrows,
                title: "加对比",
                desc: "用对比工具并排查看学费、通过率、生活成本。",
              },
              {
                step: "03",
                icon: MessageSquareText,
                title: "提交咨询",
                desc: "一次填写表单，平台帮你和学校沟通细节。",
              },
              {
                step: "04",
                icon: FileCheck2,
                title: "确认方案",
                desc: "收到包含总费用明细的留学方案，再做决定。",
              },
              {
                step: "05",
                icon: PlaneTakeoff,
                title: "办理入学",
                desc: "办签证和住宿，锁定赠送课程与行前服务。",
              },
            ].map((item) => (
              <Link
                key={item.step}
                href="/zh-CN/process"
                className="group relative flex flex-col rounded-2xl border bg-card p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 transition-colors duration-300 group-hover:bg-primary/25">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-[10px] font-mono font-bold tracking-wider text-primary/70">
                  STEP {item.step}
                </span>
                <h3 className="mt-1.5 text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-primary/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  查看详情 <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/zh-CN/process">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                查看完整申请流程 <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Bonus / gifts */}
      <section className="border-t bg-secondary/30 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                通过平台报名的礼遇
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                不只是"中介"，而是一整套留学服务
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                我们的收入来自学校佣金，并且金额公开。为了让这件事对你更有价值，
                通过平台完成入学的同学，可以解锁以下额外服务。
              </p>
            </div>
            <div className="grid w-full max-w-xl gap-4 sm:grid-cols-2">
              <Link href="/zh-CN/services/japanese-lessons" className="group">
                <Card className="h-full border-primary/20 bg-primary/5 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-primary">
                      行前日语体验课
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      提供数次线上日语小班或 1v1 体验课，帮助你在出发前熟悉真实课堂节奏。
                    </p>
                    <span className="mt-3 inline-flex items-center text-xs font-medium text-primary/70 transition-colors group-hover:text-primary">
                      了解详情 →
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/zh-CN/services/visa-support" className="group">
                <Card className="h-full border bg-card transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-foreground">
                      签证与材料预检查
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      顾问协助检查在留资格材料，减少因细节错误被补件或延误的风险。
                    </p>
                    <span className="mt-3 inline-flex items-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                      了解详情 →
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/zh-CN/services/life-guide" className="group">
                <Card className="h-full border bg-card transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-foreground">
                      日本生活落地指南
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      提供开银行卡、手机卡、住民登记等一步步操作清单，让第一周不踩坑。
                    </p>
                    <span className="mt-3 inline-flex items-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                      了解详情 →
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/zh-CN/services/city-benefits" className="group">
                <Card className="h-full border border-dashed border-primary/25 bg-card transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
                  <CardContent className="p-5">
                    <h3 className="text-sm font-semibold text-foreground">
                      城市专属福利
                    </h3>
                    <p className="mt-2 text-xs text-muted-foreground">
                      不同城市可能还会有额外福利（如交通卡充值、机票优惠等），详情可在咨询时确认。
                    </p>
                    <span className="mt-3 inline-flex items-center text-xs font-medium text-muted-foreground transition-colors group-hover:text-primary">
                      了解详情 →
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t px-4 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            {t("ctaTitle")}
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            {t("ctaDesc")}
          </p>
          <Link href="/zh-CN/consultation" className="mt-8 inline-block">
            <Button size="lg" className="text-base transition-transform duration-200 hover:-translate-y-0.5">
              {t("ctaButton")}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
