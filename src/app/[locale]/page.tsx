import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getFeaturedSchools } from "@/lib/queries/schools";
import { getSiteContent } from "@/lib/queries/site-content";
import { getIcon } from "@/lib/icon-map";
import {
  CONTENT_KEYS,
  DEFAULT_FEATURE_TAGS,
  DEFAULT_STATS,
  DEFAULT_STEPS,
  DEFAULT_BONUSES,
  DEFAULT_CITIES,
  DEFAULT_FLOATING_BENEFITS,
  type FeatureTag,
  type StatItem,
  type StepItem,
  type BonusItem,
  type CityItem,
  type FloatingBenefit,
} from "@/lib/site-defaults";
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
  ArrowRight,
} from "lucide-react";

export default async function HomePage() {
  const t = await getTranslations("home");

  const [featuredSchools, featureTags, stats, steps, bonuses, cities, floatingBenefits] =
    await Promise.all([
      getFeaturedSchools(),
      getSiteContent<FeatureTag[]>(CONTENT_KEYS.FEATURE_TAGS, DEFAULT_FEATURE_TAGS),
      getSiteContent<StatItem[]>(CONTENT_KEYS.STATS, DEFAULT_STATS),
      getSiteContent<StepItem[]>(CONTENT_KEYS.STEPS, DEFAULT_STEPS),
      getSiteContent<BonusItem[]>(CONTENT_KEYS.BONUSES, DEFAULT_BONUSES),
      getSiteContent<CityItem[]>(CONTENT_KEYS.CITIES, DEFAULT_CITIES),
      getSiteContent<FloatingBenefit[]>(CONTENT_KEYS.FLOATING_BENEFITS, DEFAULT_FLOATING_BENEFITS),
    ]);

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

  return (
    <div className="relative overflow-hidden">
      {/* Floating side actions (partylabel style) */}
      <FloatingActions benefits={floatingBenefits} />

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
            {featureTags.map((tag) => {
              const TagIcon = getIcon(tag.icon);
              return (
                <StaggerItem key={tag.label}>
                  <Link
                    href={tag.href}
                    className={`group relative flex h-36 flex-col items-center justify-center overflow-hidden rounded-2xl ${tag.bg} p-4 text-center text-white shadow-lg ${tag.shadow} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:h-40`}
                  >
                    {/* Shimmer overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <TagIcon className="relative mb-3 h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative text-base font-bold tracking-wide">
                      {tag.label}
                    </span>
                    <span className="relative mt-1 text-[11px] leading-tight text-white/75">
                      {tag.desc}
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
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
            {steps.map((item, i) => {
              const StepIcon = getIcon(item.icon);
              return (
                <StaggerItem key={item.step}>
                  <Link
                    href="/zh-CN/process"
                    className="group relative flex h-full flex-col rounded-2xl border bg-card p-5 text-left card-premium"
                  >
                    {i < steps.length - 1 && (
                      <div className="absolute -right-2 top-8 hidden h-px w-4 bg-gradient-to-r from-primary/30 to-transparent sm:block" />
                    )}
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25">
                      <StepIcon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
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
              );
            })}
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
              {bonuses.map((bonus) => {
                const BonusIcon = getIcon(bonus.icon);
                return (
                  <StaggerItem key={bonus.href}>
                    <Link href={bonus.href} className="group block h-full">
                      <Card className="h-full border bg-card card-premium overflow-hidden">
                        <CardContent className="relative p-5">
                          <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-muted transition-all duration-300 group-hover:scale-110">
                            <BonusIcon className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary" />
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
                );
              })}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* ═══════════ Stats strip ═══════════ */}
      <section className="border-t px-4 py-12">
        <FadeIn>
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 sm:gap-16">
            {stats.map((stat) => (
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
      <CityShowcase cities={cities} />

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
