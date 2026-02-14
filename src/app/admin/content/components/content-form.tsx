"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ICON_NAMES } from "@/lib/icon-map";
import { Plus, Trash2, Save, GripVertical, ArrowUp, ArrowDown } from "lucide-react";

// ── Background presets for feature tags ──
const BG_PRESETS = [
  { label: "靛蓝→蓝", value: "bg-gradient-to-br from-indigo-500 to-blue-700", shadow: "shadow-indigo-500/30" },
  { label: "粉→玫红", value: "bg-gradient-to-br from-pink-500 to-rose-700", shadow: "shadow-pink-500/30" },
  { label: "翠绿→青", value: "bg-gradient-to-br from-emerald-500 to-teal-700", shadow: "shadow-emerald-500/30" },
  { label: "琥珀→橙", value: "bg-gradient-to-br from-amber-500 to-orange-700", shadow: "shadow-amber-500/30" },
  { label: "天蓝→青", value: "bg-gradient-to-br from-sky-500 to-cyan-700", shadow: "shadow-sky-500/30" },
  { label: "紫→深紫", value: "bg-gradient-to-br from-violet-500 to-purple-700", shadow: "shadow-violet-500/30" },
  { label: "红→玫红", value: "bg-gradient-to-br from-red-500 to-rose-700", shadow: "shadow-red-500/30" },
  { label: "绿→翠绿", value: "bg-gradient-to-br from-green-500 to-emerald-700", shadow: "shadow-green-500/30" },
];

export type FieldDef = {
  name: string;
  label: string;
  type: "text" | "number" | "icon" | "bg-preset" | "textarea";
};

interface ContentFormProps {
  contentKey: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  initialData: Record<string, unknown>[];
  isList?: boolean;
}

export function ContentForm({
  contentKey,
  title,
  description,
  fields,
  initialData,
  isList = true,
}: ContentFormProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>(
    initialData.length > 0 ? initialData : [createEmptyItem(fields)]
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function createEmptyItem(flds: FieldDef[]): Record<string, unknown> {
    const item: Record<string, unknown> = {};
    for (const f of flds) {
      item[f.name] = f.type === "number" ? 0 : "";
    }
    return item;
  }

  function updateField(index: number, field: string, value: unknown) {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  }

  function addItem() {
    setItems((prev) => [...prev, createEmptyItem(fields)]);
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function moveItem(index: number, direction: "up" | "down") {
    setItems((prev) => {
      const next = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= next.length) return prev;
      [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
      return next;
    });
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const payload = isList ? items : items[0];
      const res = await fetch(`/api/admin/site-content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: payload }),
      });
      if (!res.ok) throw new Error("保存失败");
      setMessage({ type: "success", text: "保存成功！" });
    } catch {
      setMessage({ type: "error", text: "保存失败，请重试" });
    } finally {
      setSaving(false);
    }
  }

  // Handle bg preset change - also set shadow
  function handleBgPresetChange(index: number, bgValue: string) {
    const preset = BG_PRESETS.find((p) => p.value === bgValue);
    if (preset) {
      setItems((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], bg: preset.value, shadow: preset.shadow };
        return next;
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "保存中..." : "保存"}
          </Button>
        </div>
        {message && (
          <p
            className={`mt-2 text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="relative rounded-lg border bg-secondary/20 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                <GripVertical className="h-4 w-4" />
                <span>#{index + 1}</span>
              </div>
              <div className="flex items-center gap-1">
                {isList && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveItem(index, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => moveItem(index, "down")}
                      disabled={index === items.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </>
                )}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <Label className="text-xs">{field.label}</Label>
                  {field.type === "icon" ? (
                    <Select
                      value={(item[field.name] as string) || ""}
                      onValueChange={(v) => updateField(index, field.name, v)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="选择图标" />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_NAMES.map((name) => (
                          <SelectItem key={name} value={name}>
                            {name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : field.type === "bg-preset" ? (
                    <Select
                      value={(item[field.name] as string) || ""}
                      onValueChange={(v) => handleBgPresetChange(index, v)}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="选择颜色" />
                      </SelectTrigger>
                      <SelectContent>
                        {BG_PRESETS.map((preset) => (
                          <SelectItem key={preset.value} value={preset.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-3 w-3 rounded-full ${preset.value}`}
                              />
                              {preset.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : (
                    <Input
                      className="mt-1"
                      type={field.type === "number" ? "number" : "text"}
                      value={(item[field.name] as string | number) ?? ""}
                      onChange={(e) =>
                        updateField(
                          index,
                          field.name,
                          field.type === "number"
                            ? Number(e.target.value)
                            : e.target.value
                        )
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {isList && (
          <Button variant="outline" onClick={addItem} className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            添加项目
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

// ── Single-object form (for site settings) ──
interface SettingsFormProps {
  contentKey: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  initialData: Record<string, unknown>;
}

export function SettingsForm({
  contentKey,
  title,
  description,
  fields,
  initialData,
}: SettingsFormProps) {
  const [data, setData] = useState<Record<string, unknown>>(initialData);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  function updateField(field: string, value: unknown) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/site-content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data }),
      });
      if (!res.ok) throw new Error("保存失败");
      setMessage({ type: "success", text: "保存成功！" });
    } catch {
      setMessage({ type: "error", text: "保存失败，请重试" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            )}
          </div>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="mr-2 h-4 w-4" />
            {saving ? "保存中..." : "保存"}
          </Button>
        </div>
        {message && (
          <p
            className={`mt-2 text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.name}>
              <Label>{field.label}</Label>
              <Input
                className="mt-1"
                type={field.type === "number" ? "number" : "text"}
                value={(data[field.name] as string | number) ?? ""}
                onChange={(e) =>
                  updateField(
                    field.name,
                    field.type === "number"
                      ? Number(e.target.value)
                      : e.target.value
                  )
                }
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
