"use client";

import { ContentForm, SettingsForm, type FieldDef } from "../components/content-form";
import { CONTENT_KEYS } from "@/lib/site-defaults";
import type { SiteSettings, FloatingBenefit } from "@/lib/site-defaults";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const siteSettingsFields: FieldDef[] = [
  { name: "siteName", label: "站点名称", type: "text" },
  { name: "phoneJapan", label: "日本电话", type: "text" },
  { name: "phoneChina", label: "中国电话", type: "text" },
  { name: "address", label: "地址", type: "text" },
  { name: "businessHours", label: "营业时间", type: "text" },
];

const floatingBenefitFields: FieldDef[] = [
  { name: "icon", label: "图标", type: "icon" },
  { name: "title", label: "标题", type: "text" },
  { name: "desc", label: "描述", type: "text" },
];

interface Props {
  siteSettings: SiteSettings;
  floatingBenefits: FloatingBenefit[];
}

export function SettingsContentClient({ siteSettings, floatingBenefits }: Props) {
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
          <h1 className="text-2xl font-bold">站点设置</h1>
          <p className="text-sm text-muted-foreground">
            管理站点名称、联系方式和浮动礼遇面板
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <SettingsForm
          contentKey={CONTENT_KEYS.SITE_SETTINGS}
          title="基本信息"
          description="站点名称、联系方式等基础设置"
          fields={siteSettingsFields}
          initialData={siteSettings as unknown as Record<string, unknown>}
        />

        <ContentForm
          contentKey={CONTENT_KEYS.FLOATING_BENEFITS}
          title="浮动礼遇面板"
          description="右侧/底部浮动按钮展开的礼遇列表"
          fields={floatingBenefitFields}
          initialData={floatingBenefits as unknown as Record<string, unknown>[]}
        />
      </div>
    </div>
  );
}
