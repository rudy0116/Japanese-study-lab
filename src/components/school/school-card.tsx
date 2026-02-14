"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Users, GraduationCap, ArrowRight } from "lucide-react";
import { formatJPY, SCHOOL_TYPE_LABELS } from "@/lib/utils";
import type { School } from "@/lib/db/schema";

interface SchoolCardProps {
  school: School;
  onCompareToggle?: (school: School) => void;
  isInComparison?: boolean;
  index?: number;
}

export function SchoolCard({
  school,
  onCompareToggle,
  isInComparison,
  index = 0,
}: SchoolCardProps) {
  const t = useTranslations("schools");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <Card className="group relative overflow-hidden card-premium">
        <CardContent className="p-0">
          {/* Image container with overlay on hover */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
            {school.coverImage ? (
              <Image
                src={school.coverImage}
                alt={school.nameZh}
                fill
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-primary/20">
                {school.nameJa?.charAt(0)}
              </div>
            )}
            {/* Dark overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            {/* Badges */}
            {school.isFeatured && (
              <Badge className="absolute left-3 top-3 bg-primary shadow-sm">
                {t("featured")}
              </Badge>
            )}
            {school.commissionAmount && (
              <Badge
                variant="outline"
                className="absolute right-3 top-3 border-transparent-red bg-transparent-red-muted text-transparent-red shadow-sm backdrop-blur-sm"
              >
                {t("commission")}: {formatJPY(school.commissionAmount)}
              </Badge>
            )}
            {/* View hint on hover */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 transition-all duration-300 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur-sm">
                查看详情 <ArrowRight className="h-3 w-3" />
              </span>
            </div>
          </div>

          <div className="p-5">
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              <Badge variant="secondary">
                {SCHOOL_TYPE_LABELS[school.schoolType] || school.schoolType}
              </Badge>
              {school.tags?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h3 className="text-lg font-semibold leading-tight">
              <Link
                href={`/zh-CN/schools/${school.slug}`}
                className="transition-colors hover:text-primary"
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
                <Button variant="outline" size="sm" className="transition-all duration-200 hover:border-primary hover:bg-primary/5">
                  {t("viewDetails")}
                </Button>
              </Link>
              {onCompareToggle && (
                <Button
                  variant={isInComparison ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onCompareToggle(school)}
                  className="transition-all duration-200"
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
    </motion.div>
  );
}
