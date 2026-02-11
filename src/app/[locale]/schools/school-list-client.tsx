"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { SchoolCard } from "@/components/school/school-card";
import { SchoolFilters } from "@/components/school/school-filters";
import { Button } from "@/components/ui/button";
import type { School } from "@/lib/db/schema";

interface SchoolListClientProps {
  schools: School[];
  total: number;
  page: number;
  totalPages: number;
}

export function SchoolListClient({
  schools,
  total,
  page,
  totalPages,
}: SchoolListClientProps) {
  const t = useTranslations("schools");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [comparedSlugs, setComparedSlugs] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("compare-slugs");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const toggleCompare = useCallback(
    (school: School) => {
      setComparedSlugs((prev) => {
        const next = prev.includes(school.slug)
          ? prev.filter((s) => s !== school.slug)
          : prev.length < 4
          ? [...prev, school.slug]
          : prev;
        sessionStorage.setItem("compare-slugs", JSON.stringify(next));
        return next;
      });
    },
    []
  );

  const goToPage = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", String(newPage));
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SchoolFilters />
        <p className="text-sm text-muted-foreground">
          {t("results", { count: total })}
        </p>
      </div>

      {schools.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          暂无符合条件的学校
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schools.map((school) => (
            <SchoolCard
              key={school.id}
              school={school}
              onCompareToggle={toggleCompare}
              isInComparison={comparedSlugs.includes(school.slug)}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
          >
            上一页
          </Button>
          <span className="px-4 text-sm text-muted-foreground">
            {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages}
            onClick={() => goToPage(page + 1)}
          >
            下一页
          </Button>
        </div>
      )}

      {/* Comparison bar */}
      {comparedSlugs.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-4 shadow-lg backdrop-blur">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <span className="text-sm font-medium">
              {t("compare", { count: comparedSlugs.length })} (最多4所)
            </span>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setComparedSlugs([]);
                  sessionStorage.removeItem("compare-slugs");
                }}
              >
                {t("clearCompare")}
              </Button>
              <Button
                size="sm"
                disabled={comparedSlugs.length < 2}
                onClick={() =>
                  router.push(
                    `/zh-CN/schools/compare?ids=${comparedSlugs.join(",")}`
                  )
                }
              >
                {t("compareNow")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
