export const dynamic = "force-dynamic";

import { getTranslations } from "next-intl/server";
import { getAllPublishedSchools } from "@/lib/queries/schools";
import { getAllLivingCosts } from "@/lib/queries/living-costs";
import { CostCalculatorForm } from "@/components/calculator/cost-calculator-form";
import { db } from "@/lib/db";
import { schools, schoolFeeItems } from "@/lib/db/schema";
import { eq, asc } from "drizzle-orm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "留学费用计算器",
  description: "选择学校、城市和生活方式，估算你的日本留学总费用",
};

export default async function CalculatorPage() {
  const t = await getTranslations("calculator");

  const [schoolList, livingCosts] = await Promise.all([
    getAllPublishedSchools(),
    getAllLivingCosts(),
  ]);

  // Get fees for each school
  const schoolsWithFees = await Promise.all(
    schoolList.map(async (school) => {
      const fees = await db
        .select()
        .from(schoolFeeItems)
        .where(eq(schoolFeeItems.schoolId, school.id))
        .orderBy(asc(schoolFeeItems.displayOrder));
      return { ...school, fees };
    })
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
      </div>

      <CostCalculatorForm
        schools={schoolsWithFees}
        livingCosts={livingCosts}
      />
    </div>
  );
}
