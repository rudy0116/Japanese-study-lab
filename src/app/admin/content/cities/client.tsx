"use client";

import { ContentForm, type FieldDef } from "../components/content-form";
import { CONTENT_KEYS } from "@/lib/site-defaults";
import type { CityItem } from "@/lib/site-defaults";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const cityFields: FieldDef[] = [
  { name: "name", label: "城市名（中文）", type: "text" },
  { name: "nameJa", label: "城市名（日文）", type: "text" },
  { name: "prefecture", label: "都道府县", type: "text" },
  { name: "schools", label: "学校数量", type: "number" },
  { name: "image", label: "图片 URL", type: "text" },
];

interface Props {
  cities: CityItem[];
}

export function CitiesContentClient({ cities }: Props) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Link
          href="/admin/content"
          className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold">城市展示管理</h1>
          <p className="text-sm text-muted-foreground">
            管理首页城市轮播展示的城市列表
          </p>
        </div>
      </div>

      <ContentForm
        contentKey={CONTENT_KEYS.CITIES}
        title="城市列表"
        description="首页「热门城市」区域展示的城市"
        fields={cityFields}
        initialData={cities as unknown as Record<string, unknown>[]}
      />
    </div>
  );
}
