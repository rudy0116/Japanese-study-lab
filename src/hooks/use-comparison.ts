"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

export function useComparison() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const slugs = searchParams.get("ids")?.split(",").filter(Boolean) || [];

  const addSchool = useCallback(
    (slug: string) => {
      if (slugs.length >= 4 || slugs.includes(slug)) return;
      const next = [...slugs, slug];
      const params = new URLSearchParams(searchParams.toString());
      params.set("ids", next.join(","));
      router.push(`${pathname}?${params.toString()}`);
    },
    [slugs, searchParams, router, pathname]
  );

  const removeSchool = useCallback(
    (slug: string) => {
      const next = slugs.filter((s) => s !== slug);
      const params = new URLSearchParams(searchParams.toString());
      if (next.length > 0) {
        params.set("ids", next.join(","));
      } else {
        params.delete("ids");
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [slugs, searchParams, router, pathname]
  );

  return { slugs, addSchool, removeSchool };
}
