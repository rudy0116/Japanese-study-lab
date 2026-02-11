"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { CostResultCard } from "./cost-result-card";
import { CostBreakdownChart } from "./cost-breakdown-chart";
import { formatJPY, CITIES, JPY_CNY_RATE } from "@/lib/utils";
import type { School, SchoolFeeItem, LivingCostData } from "@/lib/db/schema";

type SchoolOption = Pick<School, "id" | "slug" | "nameZh">;
type SchoolWithFees = SchoolOption & { fees: SchoolFeeItem[] };

interface CostCalculatorFormProps {
  schools: SchoolWithFees[];
  livingCosts: LivingCostData[];
}

type HousingType = "dormitory" | "apartment";
type Lifestyle = "low" | "mid" | "high";

export function CostCalculatorForm({
  schools,
  livingCosts,
}: CostCalculatorFormProps) {
  const t = useTranslations("calculator");

  const [selectedSchoolId, setSelectedSchoolId] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [housingType, setHousingType] = useState<HousingType>("dormitory");
  const [lifestyle, setLifestyle] = useState<Lifestyle>("mid");
  const [durationMonths, setDurationMonths] = useState([12]);
  const [showResult, setShowResult] = useState(false);

  const selectedSchool = schools.find(
    (s) => s.id.toString() === selectedSchoolId
  );

  function calculate() {
    if (!selectedSchool || !selectedCity) return null;

    const fees = selectedSchool.fees;
    const months = durationMonths[0];
    const years = months / 12;

    // Tuition calculation
    let tuitionTotal = 0;
    for (const fee of fees) {
      if (fee.period === "one_time") {
        tuitionTotal += fee.amount;
      } else if (fee.period === "annual") {
        tuitionTotal += fee.amount * years;
      } else if (fee.period === "semi_annual") {
        tuitionTotal += fee.amount * years * 2;
      } else if (fee.period === "monthly") {
        tuitionTotal += fee.amount * months;
      }
    }

    // Living costs
    const cityCosts = livingCosts.filter((c) => c.city === selectedCity);
    const housingCategory =
      housingType === "dormitory" ? "housing_dormitory" : "housing_apartment";
    const categories = [
      housingCategory,
      "food",
      "transportation",
      "phone_internet",
      "daily_necessities",
      "entertainment",
    ];

    let monthlyLiving = 0;
    const breakdownItems: { name: string; amount: number }[] = [];

    for (const cat of categories) {
      const costData = cityCosts.find((c) => c.category === cat);
      if (!costData) continue;
      const amount =
        lifestyle === "low"
          ? costData.monthlyLow
          : lifestyle === "high"
          ? costData.monthlyHigh
          : costData.monthlyMid;
      monthlyLiving += amount;

      const labelMap: Record<string, string> = {
        housing_dormitory: "住宿(宿舍)",
        housing_apartment: "住宿(租房)",
        food: "饮食",
        transportation: "交通",
        phone_internet: "通讯",
        daily_necessities: "日用品",
        entertainment: "娱乐",
      };
      breakdownItems.push({ name: labelMap[cat] || cat, amount });
    }

    const livingTotal = monthlyLiving * months;
    const grandTotal = tuitionTotal + livingTotal;

    return {
      tuitionTotal,
      livingTotal,
      grandTotal,
      grandTotalCNY: Math.round(grandTotal * JPY_CNY_RATE),
      monthlyLiving,
      breakdownItems,
      months,
    };
  }

  const result = showResult ? calculate() : null;

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>{t("title")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: School */}
          <div className="space-y-2">
            <Label className="font-semibold">{t("step1")}</Label>
            <Select value={selectedSchoolId} onValueChange={setSelectedSchoolId}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectSchool")} />
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

          {/* Step 2: City */}
          <div className="space-y-2">
            <Label className="font-semibold">{t("step2")}</Label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder={t("selectCity")} />
              </SelectTrigger>
              <SelectContent>
                {CITIES.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Step 3: Housing */}
          <div className="space-y-2">
            <Label className="font-semibold">{t("step3")}</Label>
            <div className="flex gap-3">
              <Button
                variant={housingType === "dormitory" ? "default" : "outline"}
                onClick={() => setHousingType("dormitory")}
                className="flex-1"
              >
                {t("housingDormitory")}
              </Button>
              <Button
                variant={housingType === "apartment" ? "default" : "outline"}
                onClick={() => setHousingType("apartment")}
                className="flex-1"
              >
                {t("housingApartment")}
              </Button>
            </div>
          </div>

          {/* Step 4: Lifestyle */}
          <div className="space-y-2">
            <Label className="font-semibold">{t("step4")}</Label>
            <div className="flex gap-3">
              {(["low", "mid", "high"] as const).map((level) => (
                <Button
                  key={level}
                  variant={lifestyle === level ? "default" : "outline"}
                  onClick={() => setLifestyle(level)}
                  className="flex-1"
                >
                  {t(
                    level === "low"
                      ? "lifestyleLow"
                      : level === "mid"
                      ? "lifestyleMid"
                      : "lifestyleHigh"
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Step 5: Duration */}
          <div className="space-y-2">
            <Label className="font-semibold">
              {t("step5")}: {durationMonths[0]}个月
            </Label>
            <Slider
              value={durationMonths}
              onValueChange={setDurationMonths}
              min={6}
              max={24}
              step={6}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>6个月</span>
              <span>12个月</span>
              <span>18个月</span>
              <span>24个月</span>
            </div>
          </div>

          <Button
            className="w-full"
            size="lg"
            disabled={!selectedSchoolId || !selectedCity}
            onClick={() => setShowResult(true)}
          >
            {t("calculate")}
          </Button>
        </CardContent>
      </Card>

      {/* Result */}
      <div className="space-y-6">
        {result ? (
          <>
            <CostResultCard
              tuitionTotal={result.tuitionTotal}
              livingTotal={result.livingTotal}
              grandTotal={result.grandTotal}
              grandTotalCNY={result.grandTotalCNY}
              months={result.months}
            />
            <CostBreakdownChart items={result.breakdownItems} />
            <p className="text-xs text-muted-foreground">{t("disclaimer")}</p>
            <p className="text-xs text-muted-foreground">
              {t("jpyPerCny", { rate: Math.round(1 / JPY_CNY_RATE) })}
            </p>
          </>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border bg-muted/30 p-12">
            <p className="text-center text-muted-foreground">
              选择学校和城市后点击"计算费用"查看预估结果
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
