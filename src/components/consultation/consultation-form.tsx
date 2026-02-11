"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  consultationFormSchema,
  type ConsultationFormData,
} from "@/lib/validators/consultation";
import { submitConsultation } from "@/lib/actions/consultation";
import { CheckCircle } from "lucide-react";

interface ConsultationFormProps {
  schools: { id: number; nameZh: string; slug: string }[];
  preselectedSchool?: string;
}

export function ConsultationForm({
  schools,
  preselectedSchool,
}: ConsultationFormProps) {
  const t = useTranslations("consultation");
  const [submitState, setSubmitState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ConsultationFormData>({
    resolver: zodResolver(consultationFormSchema),
    defaultValues: {
      schoolId: preselectedSchool
        ? schools.find((s) => s.slug === preselectedSchool)?.id
        : undefined,
    },
  });

  async function onSubmit(data: ConsultationFormData) {
    setSubmitState("loading");
    const result = await submitConsultation(data);
    setSubmitState(result.success ? "success" : "error");
  }

  if (submitState === "success") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="flex flex-col items-center py-12 text-center">
          <CheckCircle className="h-12 w-12 text-green-600" />
          <h3 className="mt-4 text-xl font-semibold text-green-800">
            {t("submitSuccess")}
          </h3>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("name")} *</Label>
          <Input
            id="name"
            placeholder={t("namePlaceholder")}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">{t("phone")}</Label>
          <Input
            id="phone"
            placeholder={t("phonePlaceholder")}
            {...register("phone")}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="wechat">{t("wechat")}</Label>
          <Input
            id="wechat"
            placeholder={t("wechatPlaceholder")}
            {...register("wechatId")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t("interestedSchool")}</Label>
        <Select
          defaultValue={
            preselectedSchool
              ? schools.find((s) => s.slug === preselectedSchool)?.id?.toString()
              : undefined
          }
          onValueChange={(v) => setValue("schoolId", parseInt(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="选择学校..." />
          </SelectTrigger>
          <SelectContent>
            {schools.map((s) => (
              <SelectItem key={s.id} value={s.id.toString()}>
                {s.nameZh}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">{t("message")}</Label>
        <Textarea
          id="message"
          placeholder={t("messagePlaceholder")}
          rows={4}
          {...register("message")}
        />
      </div>

      <p className="text-xs text-muted-foreground">{t("privacyNote")}</p>

      {submitState === "error" && (
        <p className="text-sm text-destructive">{t("submitError")}</p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={submitState === "loading"}
      >
        {submitState === "loading" ? "提交中..." : t("submit")}
      </Button>
    </form>
  );
}
