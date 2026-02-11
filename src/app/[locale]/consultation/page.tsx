export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";
import { getAllPublishedSchools } from "@/lib/queries/schools";
import { ConsultationForm } from "@/components/consultation/consultation-form";
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
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <ConsultationForm
        schools={schools}
        preselectedSchool={params.school}
      />
    </div>
  );
}
