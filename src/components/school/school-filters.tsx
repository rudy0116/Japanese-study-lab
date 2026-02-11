"use client";

import { useTranslations } from "next-intl";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PREFECTURES } from "@/lib/utils";

export function SchoolFilters() {
  const t = useTranslations("schools");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`);
    },
    [router, pathname, searchParams]
  );

  const currentPrefecture = searchParams.get("prefecture") || "all";
  const currentType = searchParams.get("type") || "all";

  const areaShortcuts: { label: string; value: string }[] = [
    { label: "全部", value: "all" },
    { label: "东京", value: "东京都" },
    { label: "大阪", value: "大阪府" },
    { label: "京都", value: "京都府" },
    { label: "福冈", value: "福冈县" },
    { label: "札幌", value: "北海道" },
    { label: "名古屋", value: "爱知县" },
    { label: "神户", value: "兵库县" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* 学校类型快速菜单：日本语语言学校 / 进学塾 */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-muted-foreground">类型：</span>
        <Button
          type="button"
          size="sm"
          variant={currentType === "all" ? "default" : "outline"}
          className="text-xs"
          onClick={() => updateFilter("type", "all")}
        >
          全部
        </Button>
        <Button
          type="button"
          size="sm"
          variant={currentType === "language_school" ? "default" : "outline"}
          className="text-xs"
          onClick={() => updateFilter("type", "language_school")}
        >
          日本语语言学校
        </Button>
        <Button
          type="button"
          size="sm"
          variant={currentType === "prep_school" ? "default" : "outline"}
          className="text-xs"
          onClick={() => updateFilter("type", "prep_school")}
        >
          进学塾
        </Button>
      </div>

      {/* 地区快速筛选：模仿会场平台的区域 tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {areaShortcuts.map((area) => (
          <Button
            key={area.value}
            type="button"
            variant={currentPrefecture === area.value ? "default" : "outline"}
            size="sm"
            className="whitespace-nowrap border-primary/40 bg-background/80 text-xs"
            onClick={() => updateFilter("prefecture", area.value)}
          >
            {area.label}
          </Button>
        ))}
      </div>

      {/* 详细筛选下拉 */}
      <div className="flex flex-wrap gap-3">
        <Select
          value={searchParams.get("type") || "all"}
          onValueChange={(v) => updateFilter("type", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={t("schoolType")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t("schoolType")}: {t("filters")}
            </SelectItem>
            <SelectItem value="language_school">{t("languageSchool")}</SelectItem>
            <SelectItem value="prep_school">{t("prepSchool")}</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={currentPrefecture}
          onValueChange={(v) => updateFilter("prefecture", v)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder={t("region")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("region")}: 全部</SelectItem>
            {PREFECTURES.map((p) => (
              <SelectItem key={p} value={p}>
                {p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={searchParams.get("sort") || "newest"}
          onValueChange={(v) => updateFilter("sort", v)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={t("sortBy")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">{t("sortNewest")}</SelectItem>
            <SelectItem value="fee_low">{t("sortFeeLow")}</SelectItem>
            <SelectItem value="fee_high">{t("sortFeeHigh")}</SelectItem>
            <SelectItem value="rating">{t("sortRating")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
