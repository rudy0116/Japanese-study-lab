export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";
import { getSchoolsBySlugs, getAllPublishedSchools } from "@/lib/queries/schools";
import { ComparisonTable } from "@/components/comparison/comparison-table";
import { ComparisonChart } from "@/components/comparison/comparison-chart";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学校对比",
  description: "并排对比日本语言学校信息，做出更好的留学选择",
};

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const t = await getTranslations("comparison");

  const slugs = params.ids?.split(",").filter(Boolean) || [];
  const schools = slugs.length >= 2 ? await getSchoolsBySlugs(slugs) : [];

  return (
    <PageContainer>
      <PageHeader title={t("title")} subtitle={t("subtitle")} />

      {schools.length < 2 ? (
        <div className="py-20 text-center">
          <p className="text-lg text-muted-foreground">{t("noSchools")}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            请在学校列表中选择至少2所学校，然后点击"立即对比"
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <ComparisonTable schools={schools} />
          <ComparisonChart schools={schools} />
        </div>
      )}
    </PageContainer>
  );
}
