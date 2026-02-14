"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContentForm, type FieldDef } from "../components/content-form";
import { CONTENT_KEYS } from "@/lib/site-defaults";
import type { FeatureTag, StatItem, StepItem, BonusItem } from "@/lib/site-defaults";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const featureTagFields: FieldDef[] = [
  { name: "label", label: "标签名称", type: "text" },
  { name: "desc", label: "描述", type: "text" },
  { name: "icon", label: "图标", type: "icon" },
  { name: "bg", label: "背景颜色", type: "bg-preset" },
  { name: "href", label: "链接", type: "text" },
];

const statFields: FieldDef[] = [
  { name: "label", label: "标签", type: "text" },
  { name: "value", label: "数值", type: "text" },
  { name: "suffix", label: "后缀", type: "text" },
];

const stepFields: FieldDef[] = [
  { name: "step", label: "步骤编号", type: "text" },
  { name: "icon", label: "图标", type: "icon" },
  { name: "title", label: "标题", type: "text" },
  { name: "desc", label: "描述", type: "text" },
];

const bonusFields: FieldDef[] = [
  { name: "icon", label: "图标", type: "icon" },
  { name: "title", label: "标题", type: "text" },
  { name: "desc", label: "描述", type: "text" },
  { name: "href", label: "链接", type: "text" },
];

interface Props {
  featureTags: FeatureTag[];
  stats: StatItem[];
  steps: StepItem[];
  bonuses: BonusItem[];
}

export function HomepageContentClient({ featureTags, stats, steps, bonuses }: Props) {
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
          <h1 className="text-2xl font-bold">首页内容管理</h1>
          <p className="text-sm text-muted-foreground">
            编辑首页展示的特色标签、统计数据、申请步骤和报名礼遇
          </p>
        </div>
      </div>

      <Tabs defaultValue="feature-tags">
        <TabsList className="mb-6">
          <TabsTrigger value="feature-tags">特色标签</TabsTrigger>
          <TabsTrigger value="stats">统计数据</TabsTrigger>
          <TabsTrigger value="steps">申请步骤</TabsTrigger>
          <TabsTrigger value="bonuses">报名礼遇</TabsTrigger>
        </TabsList>

        <TabsContent value="feature-tags">
          <ContentForm
            contentKey={CONTENT_KEYS.FEATURE_TAGS}
            title="特色标签"
            description="首页「按特色找学校」区域的 6 个标签卡片"
            fields={featureTagFields}
            initialData={featureTags as unknown as Record<string, unknown>[]}
          />
        </TabsContent>

        <TabsContent value="stats">
          <ContentForm
            contentKey={CONTENT_KEYS.STATS}
            title="统计数据"
            description="首页底部的数据条（合作学校数、覆盖城市等）"
            fields={statFields}
            initialData={stats as unknown as Record<string, unknown>[]}
          />
        </TabsContent>

        <TabsContent value="steps">
          <ContentForm
            contentKey={CONTENT_KEYS.STEPS}
            title="申请步骤"
            description="首页「申请流程」区域的 5 个步骤"
            fields={stepFields}
            initialData={steps as unknown as Record<string, unknown>[]}
          />
        </TabsContent>

        <TabsContent value="bonuses">
          <ContentForm
            contentKey={CONTENT_KEYS.BONUSES}
            title="报名礼遇"
            description="首页「通过平台报名的礼遇」区域的 4 项服务"
            fields={bonusFields}
            initialData={bonuses as unknown as Record<string, unknown>[]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
