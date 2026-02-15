"use client";

import { FadeIn } from "@/components/motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <FadeIn>
      <div className={`mb-8 ${centered ? "text-center" : ""} ${className}`}>
        <h2 className="text-2xl font-bold tracking-cjk-tight sm:text-3xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </FadeIn>
  );
}
