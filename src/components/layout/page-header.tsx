"use client";

import { FadeIn } from "@/components/motion";
import type { ReactNode } from "react";

interface PageHeaderProps {
  label?: string;
  title: string;
  subtitle?: ReactNode;
  centered?: boolean;
  children?: ReactNode;
}

export function PageHeader({
  label,
  title,
  subtitle,
  centered = false,
  children,
}: PageHeaderProps) {
  return (
    <FadeIn>
      <div className={`mb-10 ${centered ? "text-center" : ""}`}>
        {label && <p className="section-label mb-3">{label}</p>}
        <h1 className="text-3xl font-bold tracking-cjk-tight sm:text-4xl">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        )}
        {children}
      </div>
    </FadeIn>
  );
}
