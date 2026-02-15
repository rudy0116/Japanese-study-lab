export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";
import { getAllPublishedSchools } from "@/lib/queries/schools";
import { ConsultationForm } from "@/components/consultation/consultation-form";
import { PageContainer } from "@/components/layout/page-container";
import { PageHeader } from "@/components/layout/page-header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "免费咨询",
  description: "免费咨询日本留学，我们的顾问将在24小时内联系你",
};

export default async function ConsultationPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const t = await getTranslations("consultation");
  const schools = await getAllPublishedSchools();

  return (
    <PageContainer size="sm">
      <PageHeader centered title={t("title")} subtitle={t("subtitle")} />

      <ConsultationForm
        schools={schools}
        preselectedSchool={params.school}
      />
    </PageContainer>
  );
}
