"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { School } from "@/lib/db/schema/schools";
import { PREFECTURES, SCHOOL_TYPE_LABELS, SCHOOL_TAGS } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export function SchoolEditClient({ school }: { school: School }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Form state
  const [form, setForm] = useState({
    nameZh: school.nameZh,
    nameJa: school.nameJa,
    slug: school.slug,
    schoolType: school.schoolType,
    descriptionZh: school.descriptionZh ?? "",

    prefecture: school.prefecture ?? "",
    city: school.city ?? "",
    addressJa: school.addressJa ?? "",
    nearestStation: school.nearestStation ?? "",
    walkingMinutes: school.walkingMinutes ?? "",

    totalCapacity: school.totalCapacity ?? "",
    chineseRatio: school.chineseRatio ?? "",
    classSizeAvg: school.classSizeAvg ?? "",
    jlptN1PassRate: school.jlptN1PassRate ?? "",
    jlptN2PassRate: school.jlptN2PassRate ?? "",
    universityAcceptanceRate: school.universityAcceptanceRate ?? "",

    hasDormitory: school.hasDormitory ?? false,
    hasVisaSupport: school.hasVisaSupport ?? true,
    hasPartTimeSupport: school.hasPartTimeSupport ?? false,
    tags: school.tags ?? [] as string[],

    enrollmentPeriods: (school.enrollmentPeriods ?? []).join(", "),
    courseDurations: (school.courseDurations ?? []).join(", "),

    commissionRate: school.commissionRate ?? "",
    commissionAmount: school.commissionAmount ?? "",
    commissionNotes: school.commissionNotes ?? "",

    coverImage: school.coverImage ?? "",
    website: school.website ?? "",
    phone: school.phone ?? "",
    email: school.email ?? "",

    isPublished: school.isPublished ?? false,
    isFeatured: school.isFeatured ?? false,
  });

  const updateField = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setSaving(true);
    setMessage("");
    try {
      const payload: Record<string, unknown> = {
        nameZh: form.nameZh,
        nameJa: form.nameJa,
        slug: form.slug,
        schoolType: form.schoolType,
        descriptionZh: form.descriptionZh || null,

        prefecture: form.prefecture || null,
        city: form.city || null,
        addressJa: form.addressJa || null,
        nearestStation: form.nearestStation || null,
        walkingMinutes: form.walkingMinutes === "" ? null : Number(form.walkingMinutes),

        totalCapacity: form.totalCapacity === "" ? null : Number(form.totalCapacity),
        chineseRatio: form.chineseRatio === "" ? null : Number(form.chineseRatio),
        classSizeAvg: form.classSizeAvg === "" ? null : Number(form.classSizeAvg),
        jlptN1PassRate: form.jlptN1PassRate === "" ? null : Number(form.jlptN1PassRate),
        jlptN2PassRate: form.jlptN2PassRate === "" ? null : Number(form.jlptN2PassRate),
        universityAcceptanceRate:
          form.universityAcceptanceRate === "" ? null : Number(form.universityAcceptanceRate),

        hasDormitory: form.hasDormitory,
        hasVisaSupport: form.hasVisaSupport,
        hasPartTimeSupport: form.hasPartTimeSupport,
        tags: form.tags.length > 0 ? form.tags : null,

        enrollmentPeriods: form.enrollmentPeriods
          ? form.enrollmentPeriods.split(",").map((s) => s.trim()).filter(Boolean)
          : null,
        courseDurations: form.courseDurations
          ? form.courseDurations.split(",").map((s) => s.trim()).filter(Boolean)
          : null,

        commissionRate: form.commissionRate === "" ? null : Number(form.commissionRate),
        commissionAmount: form.commissionAmount === "" ? null : Number(form.commissionAmount),
        commissionNotes: form.commissionNotes || null,

        coverImage: form.coverImage || null,
        website: form.website || null,
        phone: form.phone || null,
        email: form.email || null,

        isPublished: form.isPublished,
        isFeatured: form.isFeatured,
      };

      const res = await fetch(`/api/admin/schools/${school.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("保存成功");
        router.refresh();
      } else {
        const data = await res.json();
        setMessage(data.error ?? "保存失败");
      }
    } catch {
      setMessage("保存失败");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      {message && (
        <div
          className={`rounded-md px-4 py-2 text-sm ${
            message === "保存成功"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <Tabs defaultValue="basic">
        <TabsList className="flex-wrap">
          <TabsTrigger value="basic">基本信息</TabsTrigger>
          <TabsTrigger value="location">位置信息</TabsTrigger>
          <TabsTrigger value="stats">学校数据</TabsTrigger>
          <TabsTrigger value="features">特色功能</TabsTrigger>
          <TabsTrigger value="enrollment">入学信息</TabsTrigger>
          <TabsTrigger value="commission">佣金信息</TabsTrigger>
          <TabsTrigger value="media">媒体/联系</TabsTrigger>
          <TabsTrigger value="publish">发布状态</TabsTrigger>
        </TabsList>

        {/* 基本信息 */}
        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nameZh">中文名称</Label>
                  <Input
                    id="nameZh"
                    value={form.nameZh}
                    onChange={(e) => updateField("nameZh", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameJa">日文名称</Label>
                  <Input
                    id="nameJa"
                    value={form.nameJa}
                    onChange={(e) => updateField("nameJa", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={form.slug}
                    onChange={(e) => updateField("slug", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>学校类型</Label>
                  <Select
                    value={form.schoolType}
                    onValueChange={(v) => updateField("schoolType", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(SCHOOL_TYPE_LABELS).map(([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="descriptionZh">中文描述</Label>
                <Textarea
                  id="descriptionZh"
                  rows={5}
                  value={form.descriptionZh}
                  onChange={(e) => updateField("descriptionZh", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 位置信息 */}
        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>位置信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>都道府县</Label>
                  <Select
                    value={form.prefecture}
                    onValueChange={(v) => updateField("prefecture", v)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="选择地区" />
                    </SelectTrigger>
                    <SelectContent>
                      {PREFECTURES.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">城市</Label>
                  <Input
                    id="city"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="addressJa">详细地址 (日文)</Label>
                <Input
                  id="addressJa"
                  value={form.addressJa}
                  onChange={(e) => updateField("addressJa", e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nearestStation">最近车站</Label>
                  <Input
                    id="nearestStation"
                    value={form.nearestStation}
                    onChange={(e) => updateField("nearestStation", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="walkingMinutes">步行时间 (分钟)</Label>
                  <Input
                    id="walkingMinutes"
                    type="number"
                    value={form.walkingMinutes}
                    onChange={(e) => updateField("walkingMinutes", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 学校数据 */}
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>学校数据</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="totalCapacity">总定员</Label>
                  <Input
                    id="totalCapacity"
                    type="number"
                    value={form.totalCapacity}
                    onChange={(e) => updateField("totalCapacity", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chineseRatio">中国学生比例</Label>
                  <Input
                    id="chineseRatio"
                    type="number"
                    step="0.01"
                    placeholder="0.0 ~ 1.0"
                    value={form.chineseRatio}
                    onChange={(e) => updateField("chineseRatio", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="classSizeAvg">平均班级人数</Label>
                  <Input
                    id="classSizeAvg"
                    type="number"
                    value={form.classSizeAvg}
                    onChange={(e) => updateField("classSizeAvg", e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="jlptN1PassRate">JLPT N1 合格率</Label>
                  <Input
                    id="jlptN1PassRate"
                    type="number"
                    step="0.01"
                    placeholder="0.0 ~ 1.0"
                    value={form.jlptN1PassRate}
                    onChange={(e) => updateField("jlptN1PassRate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jlptN2PassRate">JLPT N2 合格率</Label>
                  <Input
                    id="jlptN2PassRate"
                    type="number"
                    step="0.01"
                    placeholder="0.0 ~ 1.0"
                    value={form.jlptN2PassRate}
                    onChange={(e) => updateField("jlptN2PassRate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="universityAcceptanceRate">大学升学率</Label>
                  <Input
                    id="universityAcceptanceRate"
                    type="number"
                    step="0.01"
                    placeholder="0.0 ~ 1.0"
                    value={form.universityAcceptanceRate}
                    onChange={(e) => updateField("universityAcceptanceRate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 特色功能 */}
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>特色功能</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="hasDormitory"
                  checked={form.hasDormitory}
                  onCheckedChange={(v) => updateField("hasDormitory", !!v)}
                />
                <Label htmlFor="hasDormitory">提供宿舍</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="hasVisaSupport"
                  checked={form.hasVisaSupport}
                  onCheckedChange={(v) => updateField("hasVisaSupport", !!v)}
                />
                <Label htmlFor="hasVisaSupport">签证支持</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="hasPartTimeSupport"
                  checked={form.hasPartTimeSupport}
                  onCheckedChange={(v) => updateField("hasPartTimeSupport", !!v)}
                />
                <Label htmlFor="hasPartTimeSupport">打工支持</Label>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label>学校标签</Label>
                <div className="grid gap-2 sm:grid-cols-3">
                  {SCHOOL_TAGS.map((tag) => (
                    <div key={tag} className="flex items-center gap-2">
                      <Checkbox
                        id={`tag-${tag}`}
                        checked={form.tags.includes(tag)}
                        onCheckedChange={(checked) => {
                          setForm((prev) => ({
                            ...prev,
                            tags: checked
                              ? [...prev.tags, tag]
                              : prev.tags.filter((t) => t !== tag),
                          }));
                        }}
                      />
                      <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 入学信息 */}
        <TabsContent value="enrollment">
          <Card>
            <CardHeader>
              <CardTitle>入学信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="enrollmentPeriods">入学时间 (逗号分隔)</Label>
                <Input
                  id="enrollmentPeriods"
                  placeholder="例: 1月, 4月, 7月, 10月"
                  value={form.enrollmentPeriods}
                  onChange={(e) => updateField("enrollmentPeriods", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="courseDurations">课程时长 (逗号分隔)</Label>
                <Input
                  id="courseDurations"
                  placeholder="例: 1年, 1.5年, 2年"
                  value={form.courseDurations}
                  onChange={(e) => updateField("courseDurations", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 佣金信息 */}
        <TabsContent value="commission">
          <Card>
            <CardHeader>
              <CardTitle>佣金信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">佣金比例</Label>
                  <Input
                    id="commissionRate"
                    type="number"
                    step="0.01"
                    value={form.commissionRate}
                    onChange={(e) => updateField("commissionRate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commissionAmount">佣金金额 (日元)</Label>
                  <Input
                    id="commissionAmount"
                    type="number"
                    value={form.commissionAmount}
                    onChange={(e) => updateField("commissionAmount", e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="commissionNotes">佣金备注</Label>
                <Textarea
                  id="commissionNotes"
                  rows={3}
                  value={form.commissionNotes}
                  onChange={(e) => updateField("commissionNotes", e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 媒体/联系 */}
        <TabsContent value="media">
          <Card>
            <CardHeader>
              <CardTitle>媒体与联系方式</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="coverImage">封面图片 URL</Label>
                <Input
                  id="coverImage"
                  value={form.coverImage}
                  onChange={(e) => updateField("coverImage", e.target.value)}
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="website">网站</Label>
                  <Input
                    id="website"
                    value={form.website}
                    onChange={(e) => updateField("website", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">电话</Label>
                  <Input
                    id="phone"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">邮箱</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 发布状态 */}
        <TabsContent value="publish">
          <Card>
            <CardHeader>
              <CardTitle>发布状态</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isPublished"
                  checked={form.isPublished}
                  onCheckedChange={(v) => updateField("isPublished", !!v)}
                />
                <Label htmlFor="isPublished">已发布</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isFeatured"
                  checked={form.isFeatured}
                  onCheckedChange={(v) => updateField("isFeatured", !!v)}
                />
                <Label htmlFor="isFeatured">推荐学校</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex items-center gap-4">
        <Button onClick={handleSubmit} disabled={saving}>
          {saving ? "保存中..." : "保存"}
        </Button>
        <Button variant="outline" onClick={() => router.push("/admin/schools")}>
          返回列表
        </Button>
      </div>
    </div>
  );
}
