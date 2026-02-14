import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getSchoolBySlug, getAllPublishedSchools } from "@/lib/queries/schools";
import { FeeBreakdownTable } from "@/components/school/fee-breakdown-table";
import { CommissionBadge } from "@/components/school/commission-badge";
import { SchoolStats } from "@/components/school/school-stats";
import { FadeIn, StaggerChildren, StaggerItem, SchoolGallery } from "@/components/motion";
import { FloatingActions } from "@/components/floating-actions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, ArrowRight } from "lucide-react";
import { formatJPY, SCHOOL_TYPE_LABELS } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  if (!school) return { title: "学校未找到" };

  return {
    title: `${school.nameZh} - 学费明细与佣金公开`,
    description: school.descriptionZh || `${school.nameZh}的详细学费信息和佣金透明数据`,
  };
}

export default async function SchoolDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);

  if (!school) {
    notFound();
  }

  const firstYearTotal = school.fees.reduce((sum, fee) => {
    if (fee.period === "one_time" || fee.period === "annual") return sum + fee.amount;
    if (fee.period === "semi_annual") return sum + fee.amount * 2;
    if (fee.period === "monthly") return sum + fee.amount * 12;
    return sum;
  }, 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: school.nameJa,
    alternateName: school.nameZh,
    address: {
      "@type": "PostalAddress",
      addressLocality: school.city,
      addressRegion: school.prefecture,
      addressCountry: "JP",
    },
    ...(school.latitude && school.longitude
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: school.latitude,
            longitude: school.longitude,
          },
        }
      : {}),
  };

  const consultationUrl = `/zh-CN/consultation?school=${school.slug}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <FadeIn duration={0.4}>
          <nav className="mb-6 text-sm text-muted-foreground">
            <Link href="/zh-CN/schools" className="transition-colors hover:text-primary">
              学校列表
            </Link>
            <span className="mx-2">/</span>
            <span>{school.nameZh}</span>
          </nav>
        </FadeIn>

        {/* School Gallery */}
        <FadeIn duration={0.6} direction="none">
          <SchoolGallery
            coverImage={school.coverImage}
            city={school.city}
            schoolName={school.nameZh}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm">
                {SCHOOL_TYPE_LABELS[school.schoolType]}
              </Badge>
              {school.isFeatured && (
                <Badge className="bg-primary shadow-sm">精选</Badge>
              )}
            </div>
            <h1 className="mt-2 text-2xl font-bold text-white drop-shadow-sm sm:text-3xl lg:text-4xl">
              {school.nameZh}
            </h1>
            <p className="mt-1 text-sm text-white/80 sm:text-base">{school.nameJa}</p>
          </SchoolGallery>
        </FadeIn>

        {/* Location + Quick stats */}
        <FadeIn delay={0.1}>
          <div className="mb-8">
            {school.prefecture && (
              <p className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {school.prefecture} {school.city}
                {school.nearestStation && (
                  <span className="ml-2">
                    {school.nearestStation} 步行{school.walkingMinutes}分钟
                  </span>
                )}
              </p>
            )}

            {firstYearTotal > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                <div className="rounded-xl bg-primary/5 px-5 py-3 transition-all duration-300 hover:bg-primary/8">
                  <span className="text-sm text-muted-foreground">第一年费用</span>
                  <p className="text-2xl font-bold text-primary">
                    {formatJPY(firstYearTotal)}
                  </p>
                </div>
                {school.commissionAmount && (
                  <div className="rounded-xl bg-transparent-red-muted px-5 py-3 transition-all duration-300 hover:bg-transparent-red-muted/80">
                    <span className="text-sm text-muted-foreground">平台佣金</span>
                    <p className="text-2xl font-bold text-transparent-red">
                      {formatJPY(school.commissionAmount)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </FadeIn>

        {/* Tabs content */}
        <FadeIn delay={0.2}>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="overview">概览</TabsTrigger>
              <TabsTrigger value="fees">学费明细</TabsTrigger>
              <TabsTrigger value="courses">课程</TabsTrigger>
              <TabsTrigger value="location">位置</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {school.descriptionZh && (
                <div className="prose max-w-none">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {school.descriptionZh}
                  </p>
                </div>
              )}
              <SchoolStats school={school} />
              {school.enrollmentPeriods && school.enrollmentPeriods.length > 0 && (
                <div>
                  <h3 className="mb-2 font-semibold">入学时间</h3>
                  <div className="flex gap-2">
                    {school.enrollmentPeriods.map((period) => (
                      <Badge key={period} variant="outline">
                        {period}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* 通过平台报名的礼遇 */}
              <div className="gradient-border rounded-2xl border-0 bg-primary/5 p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  通过本平台报名可享礼遇
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  为了让"信息透明"变成真正的优势，我们会把学校支付的佣金一部分，换成对你有实际帮助的服务。
                </p>
                {school.scholarshipAmount && (
                  <div className="mt-4 flex items-center gap-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 px-5 py-4">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 shadow-md shadow-orange-500/25">
                      <span className="text-lg text-white">🏆</span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 dark:text-amber-400">
                        奖学金计划
                      </p>
                      <p className="mt-0.5">
                        <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-2xl font-extrabold tracking-tight text-transparent">
                          ¥{school.scholarshipAmount.toLocaleString("ja-JP")}
                        </span>
                        <span className="ml-1.5 text-sm text-muted-foreground">学费减免</span>
                      </p>
                    </div>
                  </div>
                )}
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {[
                    "行前线上说明会 1 次，详细讲解该校课程安排、生活成本和注意事项。",
                    "日语课或专项辅导体验课若干次（具体课时数在咨询时确认）。",
                    "在留资格/签证材料预检查服务，减少因小问题导致的补件和延误。",
                    "抵达日本后的 7 日落地支持清单（开户、手机卡、住民登记等）及线上答疑。",
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                      {text}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground/70">
                  以上礼遇为平台层面的通用服务，具体内容与适用条件以最终签约和咨询确认结果为准，不构成学校官方承诺。
                </p>
              </div>
            </TabsContent>

            <TabsContent value="fees" className="space-y-6">
              <FeeBreakdownTable fees={school.fees} />
              <CommissionBadge
                commissionAmount={school.commissionAmount}
                commissionRate={school.commissionRate}
                commissionNotes={school.commissionNotes}
              />
            </TabsContent>

            <TabsContent value="courses">
              {school.courses.length > 0 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  {school.courses.map((course) => (
                    <div
                      key={course.id}
                      className="rounded-xl border p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-sm"
                    >
                      <h3 className="font-semibold">{course.nameZh}</h3>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {course.durationMonths && (
                          <p>学制: {course.durationMonths}个月</p>
                        )}
                        {course.hoursPerWeek && (
                          <p>每周课时: {course.hoursPerWeek}小时</p>
                        )}
                        {course.scheduleType && (
                          <p>
                            上课时间:{" "}
                            {course.scheduleType === "morning"
                              ? "上午班"
                              : course.scheduleType === "afternoon"
                              ? "下午班"
                              : "全日制"}
                          </p>
                        )}
                        {course.targetLevel && (
                          <p>目标水平: {course.targetLevel}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="py-8 text-center text-muted-foreground">
                  暂无课程信息
                </p>
              )}
            </TabsContent>

            <TabsContent value="location">
              <div className="space-y-4">
                {school.addressJa && (
                  <p className="text-muted-foreground">
                    地址: {school.addressJa}
                  </p>
                )}
                {school.nearestStation && (
                  <p className="text-muted-foreground">
                    最近车站: {school.nearestStation}
                    {school.walkingMinutes && ` (步行${school.walkingMinutes}分钟)`}
                  </p>
                )}
                {school.latitude && school.longitude && (
                  <div className="overflow-hidden rounded-xl border bg-muted/50 p-12 text-center text-muted-foreground">
                    <p>地图功能开发中</p>
                    <p className="mt-1 text-sm">
                      坐标: {school.latitude}, {school.longitude}
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </FadeIn>

        {/* Bottom mini-flow + CTA */}
        <FadeIn delay={0.1}>
          <div className="mt-12 space-y-6">
            {/* 流程条 */}
            <div className="rounded-2xl border bg-card px-4 py-5 sm:px-6">
              <div className="mb-4 text-sm font-medium text-muted-foreground">
                报名这所学校，一共只需要 4 步：
              </div>
              <StaggerChildren className="grid gap-4 sm:grid-cols-4" staggerDelay={0.08}>
                {[
                  {
                    num: "1",
                    title: "选择学校",
                    desc: "确认这所学校适合你的城市、预算和课程。",
                  },
                  {
                    num: "2",
                    title: "提交透明咨询",
                    desc: "填写简单表单，我们帮你和学校对接细节。",
                  },
                  {
                    num: "3",
                    title: "确认方案 & 办理入学",
                    desc: "收到包含总费用明细的方案后再做决定。",
                  },
                  {
                    num: "4",
                    title: "解锁平台礼遇",
                    desc: "行前说明会、材料预检查、落地清单等服务。",
                  },
                ].map((step) => (
                  <StaggerItem key={step.num}>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                        {step.num}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-foreground">
                          {step.title}
                        </div>
                        <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </div>

            {/* CTA */}
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
              <h2 className="text-2xl font-bold">对这所学校感兴趣？</h2>
              <p className="mt-2 text-muted-foreground">
                免费咨询，我们的顾问将在 24 小时内联系你，并一起确认礼遇内容与适用条件。
              </p>
              <Link href={consultationUrl}>
                <Button size="lg" className="mt-4 shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30">
                  免费咨询该校
                </Button>
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>

      {/* 右侧浮动操作栏 (与主页一致的样式) */}
      <FloatingActions consultationUrl={consultationUrl} scholarshipAmount={school.scholarshipAmount} />
    </>
  );
}
