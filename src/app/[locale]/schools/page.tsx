export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { getSchools } from "@/lib/queries/schools";
import { SchoolListClient } from "./school-list-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "学校列表",
  description: "浏览日本语言学校和预备校，所有学费信息完全透明",
};

export default async function SchoolsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const t = await getTranslations("schools");

  const result = await getSchools({
    schoolType: params.type,
    prefecture: params.prefecture,
    search: params.search,
    tag: params.tag,
    sort: params.sort || "newest",
    page: params.page ? parseInt(params.page) : 1,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>

        {/* 进学塾说明与示例 */}
        {params.type === "prep_school" && (
          <div className="mt-4 rounded-xl border border-primary/25 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">
              正在浏览：进学塾（大学/专门学校升学预备学校）
            </p>
            <p className="mt-1 text-xs">
              进学塾主要面向已经具备一定日语水平、准备考大学或专门学校的学生，课程更偏向考试与升学辅导。
              样式和筛选方式与语言学校一致，只是评估重点会更看重升学成绩、模拟考试和指导老师背景。
            </p>
            <p className="mt-1.5 text-xs">
              示例（供理解类型，不代表当前一定收录）：
              「东京大学进学预备塾」「早稻田·庆应冲刺班」「关西地区美术设计进学课程」等。
            </p>
          </div>
        )}
      </div>

      <Suspense fallback={<div className="py-12 text-center">加载中...</div>}>
        <SchoolListClient
          schools={result.schools}
          total={result.total}
          page={result.page}
          totalPages={result.totalPages}
        />
      </Suspense>
    </div>
  );
}
