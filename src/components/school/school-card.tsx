"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, GraduationCap } from "lucide-react";
import { formatJPY, SCHOOL_TYPE_LABELS } from "@/lib/utils";
import type { School } from "@/lib/db/schema";

interface SchoolCardProps {
  school: School;
  onCompareToggle?: (school: School) => void;
  isInComparison?: boolean;
}

export function SchoolCard({
  school,
  onCompareToggle,
  isInComparison,
}: SchoolCardProps) {
  const t = useTranslations("schools");

  return (
    <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
      <CardContent className="p-0">
        {/* Image placeholder */}
        <div className="relative h-48 bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary/20">
            {school.nameJa?.charAt(0)}
          </div>
          {school.isFeatured && (
            <Badge className="absolute left-3 top-3 bg-primary">
              {t("featured")}
            </Badge>
          )}
          {school.commissionAmount && (
            <Badge
              variant="outline"
              className="absolute right-3 top-3 border-transparent-red bg-transparent-red-muted text-transparent-red"
            >
              {t("commission")}: {formatJPY(school.commissionAmount)}
            </Badge>
          )}
        </div>

        <div className="p-5">
          <div className="mb-2 flex items-center gap-2">
            <Badge variant="secondary">
              {SCHOOL_TYPE_LABELS[school.schoolType] || school.schoolType}
            </Badge>
          </div>

          <h3 className="text-lg font-semibold leading-tight">
            <Link
              href={`/zh-CN/schools/${school.slug}`}
              className="hover:text-primary"
            >
              {school.nameZh}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{school.nameJa}</p>

          <div className="mt-3 flex flex-wrap gap-3 text-sm text-muted-foreground">
            {school.prefecture && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {school.prefecture}
              </span>
            )}
            {school.totalCapacity && (
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {school.totalCapacity}人
              </span>
            )}
            {school.universityAcceptanceRate != null && (
              <span className="flex items-center gap-1">
                <GraduationCap className="h-3.5 w-3.5" />
                升学率 {(school.universityAcceptanceRate * 100).toFixed(0)}%
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Link href={`/zh-CN/schools/${school.slug}`}>
              <Button variant="outline" size="sm">
                {t("viewDetails")}
              </Button>
            </Link>
            {onCompareToggle && (
              <Button
                variant={isInComparison ? "default" : "ghost"}
                size="sm"
                onClick={() => onCompareToggle(school)}
              >
                {isInComparison
                  ? t("removeFromCompare")
                  : t("addToCompare")}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
