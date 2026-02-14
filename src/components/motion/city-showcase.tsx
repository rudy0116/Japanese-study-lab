"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { FadeIn } from "./fade-in";
import type { CityItem } from "@/lib/site-defaults";

interface CityShowcaseProps {
  cities: CityItem[];
}

export function CityShowcase({ cities }: CityShowcaseProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="overflow-hidden px-4 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              热门城市
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              选择你想去的城市
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              从繁华都市到海滨小城，找到最适合你的留学目的地。
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div ref={constraintsRef} className="overflow-hidden">
            <motion.div
              className="flex cursor-grab gap-5 active:cursor-grabbing"
              drag="x"
              dragConstraints={constraintsRef}
              dragElastic={0.1}
            >
              {cities.map((city) => (
                <Link
                  key={city.name}
                  href={`/zh-CN/schools?prefecture=${encodeURIComponent(city.prefecture)}`}
                  className="group relative h-72 w-64 flex-shrink-0 overflow-hidden rounded-2xl sm:h-80 sm:w-72"
                  draggable={false}
                >
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 256px, 288px"
                    loading="lazy"
                    draggable={false}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* City info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-sm text-white/70">{city.nameJa}</p>
                    <h3 className="text-xl font-bold text-white">
                      {city.name}
                    </h3>
                    <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {city.schools} 所学校
                    </span>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground sm:hidden">
            ← 左右滑动查看更多城市 →
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
