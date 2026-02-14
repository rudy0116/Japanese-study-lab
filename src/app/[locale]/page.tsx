import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedSchools } from "@/lib/queries/schools";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  FadeIn,
  StaggerChildren,
  StaggerItem,
  MagneticButton,
  ImageMarquee,
  CityShowcase,
} from "@/components/motion";
import { FloatingActions } from "@/components/floating-actions";
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
  BookOpen,
  FileSearch,
  MapPinned,
  Gift,
  GraduationCap,
  Palette,
  Briefcase,
  UserCheck,
  Globe,
  Award,
} from "lucide-react";

const FEATURE_TAGS = [
  {
    icon: GraduationCap,
    label: "升学强校",
    desc: "高升学率，名校直通",
    bg: "bg-gradient-to-br from-indigo-500 to-blue-700",
    shadow: "shadow-indigo-500/30",
    href: "/zh-CN/schools?search=升学",
  },
  {
    icon: Palette,
    label: "美术升学",
    desc: "美大 · 专门学校对策",
    bg: "bg-gradient-to-br from-pink-500 to-rose-700",
    shadow: "shadow-pink-500/30",
    href: "/zh-CN/schools?search=美术",
  },
  {
    icon: Briefcase,
    label: "就职辅导",
    desc: "就职签证变更支持",
    bg: "bg-gradient-to-br from-emerald-500 to-teal-700",
    shadow: "shadow-emerald-500/30",
    href: "/zh-CN/schools?search=就职",
  },
  {
    icon: UserCheck,
    label: "大龄OK",
    desc: "30岁以上也可入学",
    bg: "bg-gradient-to-br from-amber-500 to-orange-700",
    shadow: "shadow-amber-500/30",
    href: "/zh-CN/schools?search=大龄",
  },
  {
    icon: Globe,
    label: "零基础OK",
    desc: "日语零基础可入学",
    bg: "bg-gradient-to-br from-sky-500 to-cyan-700",
    shadow: "shadow-sky-500/30",
    href: "/zh-CN/schools?search=零基础",
  },
  {
    icon: Award,
    label: "奖学金制度",
    desc: "学费减免 · 奖学金可申请",
    bg: "bg-gradient-to-br from-violet-500 to-purple-700",
    shadow: "shadow-violet-500/30",
    href: "/zh-CN/schools?search=奖学金",
  },
];

export default async function HomePage() {
  const t = await getTranslations("home");

  const featuredSchools = await getFeaturedSchools();
  const marqueeSchools = featuredSchools
    .filter((s) => s.coverImage)
    .map((s) => ({
      slug: s.slug,
      nameZh: s.nameZh,
      coverImage: s.coverImage!,
    }));

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

  const steps = [
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
  ];

  const bonuses = [
    {
      href: "/zh-CN/services/japanese-lessons",
      icon: BookOpen,
      title: "行前日语体验课",
      desc: "提供数次线上日语小班或 1v1 体验课，帮助你在出发前熟悉真实课堂节奏。",
    },
    {
      href: "/zh-CN/services/visa-support",
      icon: FileSearch,
      title: "签证与材料预检查",
      desc: "顾问协助检查在留资格材料，减少因细节错误被补件或延误的风险。",
    },
    {
      href: "/zh-CN/services/life-guide",
      icon: MapPinned,
      title: "日本生活落地指南",
      desc: "提供开银行卡、手机卡、住民登记等一步步操作清单，让第一周不踩坑。",
    },
    {
      href: "/zh-CN/services/city-benefits",
      icon: Gift,
      title: "城市专属福利",
      desc: "不同城市可能还会有额外福利（如交通卡充值、机票优惠等），详情可在咨询时确认。",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      {/* Floating side actions (partylabel style) */}
      <FloatingActions />

      {/* ═══════════ Hero Section ═══════════ */}
      <section className="relative px-4 py-24 sm:py-32">
        {/* Background glows — enlarged & more dramatic */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[140px] animate-pulse-glow" />
          <div className="absolute -right-40 top-10 h-[400px] w-[400px] rounded-full bg-indigo-400/15 blur-[120px] animate-pulse-glow [animation-delay:1.5s]" />
          <div className="absolute bottom-0 left-1/2 h-72 w-[700px] -translate-x-1/2 rounded-full bg-violet-400/10 blur-[120px] animate-pulse-glow [animation-delay:3s]" />
        </div>

        <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
          <FadeIn delay={0} duration={0.6}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-medium tracking-widest text-primary">
              日本留学 · 极致透明 · 实时报价
            </span>
          </FadeIn>

          <FadeIn delay={0.15} duration={0.7}>
            <h1 className="mt-8 text-balance text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {t("heroTitle")}
            </h1>
          </FadeIn>

          <FadeIn delay={0.3} duration={0.7}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
              {t("heroSubtitle")}
            </p>
          </FadeIn>

          <FadeIn delay={0.45} duration={0.6}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <MagneticButton>
                <Link href="/zh-CN/schools">
                  <Button size="lg" className="text-base shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30">
                    {t("heroCta")}
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/zh-CN/calculator">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-base transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/5"
                  >
                    {t("heroSecondaryCta")}
                  </Button>
                </Link>
              </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ Feature Tags — bold category cards ═══════════ */}
      <section className="px-4 pb-8 pt-0">
        <div className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                按特色找学校
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                你想要什么样的学校？
              </h2>
            </div>
          </FadeIn>

          <StaggerChildren className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6" staggerDelay={0.06}>
            {FEATURE_TAGS.map((tag) => (
              <StaggerItem key={tag.label}>
                <Link
                  href={tag.href}
                  className={`group relative flex h-36 flex-col items-center justify-center overflow-hidden rounded-2xl ${tag.bg} p-4 text-center text-white shadow-lg ${tag.shadow} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-40`}
                >
                  {/* Shimmer overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <tag.icon className="relative mb-3 h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                  <span className="relative text-base font-bold tracking-wide">
                    {tag.label}
                  </span>
                  <span className="relative mt-1 text-[11px] leading-tight text-white/75">
                    {tag.desc}
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════════ Image Marquee — featured schools ═══════════ */}
      <ImageMarquee schools={marqueeSchools} />

      {/* ═══════════ Value Props ═══════════ */}
      <section className="px-4 pb-16 pt-4">
        <div className="mx-auto max-w-7xl">
          <FadeIn>
            <h2 className="text-center text-3xl font-semibold tracking-tight text-foreground">
              {t("whyTransparent")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted-foreground">
              用可视化的数据和完全公开的费用结构，让"我要去哪所学校"这件事第一次变得像选一款产品一样清晰。
            </p>
          </FadeIn>

          <StaggerChildren className="mt-12 grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <Card className="group relative overflow-hidden border bg-card card-premium">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <CardContent className="relative pt-6">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
                      <value.icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════════ How it works ═══════════ */}
      <section className="relative border-t border-primary/10 px-4 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          <div className="absolute left-1/2 top-20 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/8 blur-[100px]" />
        </div>

        <div className="mx-auto max-w-6xl">
          <FadeIn>
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
          </FadeIn>

          <StaggerChildren className="mt-14 grid gap-4 sm:grid-cols-5" staggerDelay={0.08}>
            {steps.map((item, i) => (
              <StaggerItem key={item.step}>
                <Link
                  href="/zh-CN/process"
                  className="group relative flex h-full flex-col rounded-2xl border bg-card p-5 text-left card-premium"
                >
                  {i < steps.length - 1 && (
                    <div className="absolute -right-2 top-8 hidden h-px w-4 bg-gradient-to-r from-primary/30 to-transparent sm:block" />
                  )}
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25">
                    <item.icon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
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
                  <span className="mt-auto flex items-center gap-1 pt-3 text-[11px] font-medium text-primary/60 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    查看详情 <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <FadeIn delay={0.4}>
            <div className="mt-10 text-center">
              <Link href="/zh-CN/process">
                <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10">
                  查看完整申请流程 <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══════════ Bonus / gifts ═══════════ */}
      <section className="relative border-t bg-secondary/30 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <FadeIn direction="right" className="max-w-md">
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
            </FadeIn>

            <StaggerChildren className="grid w-full max-w-xl gap-4 sm:grid-cols-2" staggerDelay={0.1}>
              {bonuses.map((bonus) => (
                <StaggerItem key={bonus.href}>
                  <Link href={bonus.href} className="group block h-full">
                    <Card className="h-full border bg-card card-premium overflow-hidden">
                      <CardContent className="relative p-5">
                        <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted transition-all duration-300 group-hover:scale-110">
                          <bonus.icon className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {bonus.title}
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground">
                          {bonus.desc}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-primary">
                          了解详情 <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ═══════════ Stats strip ═══════════ */}
      <section className="border-t px-4 py-12">
        <FadeIn>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 sm:gap-16">
            {[
              { label: "合作学校", value: "12+", suffix: "所" },
              { label: "覆盖城市", value: "6", suffix: "座" },
              { label: "佣金透明度", value: "100", suffix: "%" },
              { label: "咨询费用", value: "0", suffix: "元" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary sm:text-4xl">
                  {stat.value}
                  <span className="text-lg">{stat.suffix}</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ═══════════ City Showcase ═══════════ */}
      <CityShowcase />

      {/* ═══════════ CTA Section ═══════════ */}
      <section className="relative border-t px-4 py-20 sm:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent" />
          <div className="absolute left-1/2 top-1/2 h-64 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-[100px] animate-pulse-glow" />
        </div>

        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              {t("ctaDesc")}
            </p>
            <MagneticButton className="mt-8 inline-block">
              <Link href="/zh-CN/consultation">
                <Button size="lg" className="text-base shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30">
                  {t("ctaButton")}
                </Button>
              </Link>
            </MagneticButton>
          </div>
        </FadeIn>
      </section>

      {/* Bottom spacer for mobile floating bar */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}
