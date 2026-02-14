"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

interface MarqueeSchool {
  slug: string;
  nameZh: string;
  coverImage: string;
}

const FALLBACK_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=75&fit=crop",
    alt: "东京天际线",
  },
  {
    src: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=75&fit=crop",
    alt: "日本神社鸟居",
  },
  {
    src: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&q=75&fit=crop",
    alt: "大阪街道",
  },
  {
    src: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=75&fit=crop",
    alt: "东京塔",
  },
  {
    src: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=75&fit=crop",
    alt: "樱花盛开",
  },
  {
    src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=75&fit=crop",
    alt: "日本小巷",
  },
  {
    src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=75&fit=crop",
    alt: "涩谷十字路口",
  },
];

interface ImageMarqueeProps {
  schools?: MarqueeSchool[];
}

export function ImageMarquee({ schools }: ImageMarqueeProps) {
  const [paused, setPaused] = useState(false);
  const hasSchools = schools && schools.length > 0;

  const items = hasSchools
    ? schools.map((s) => ({ src: s.coverImage, alt: s.nameZh, slug: s.slug }))
    : FALLBACK_IMAGES.map((img) => ({ ...img, slug: "" }));

  // Duplicate for seamless loop
  const duplicated = [...items, ...items];

  return (
    <motion.section
      className="relative overflow-hidden py-12"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Inline keyframes — guaranteed to work */}
      <style>{`
        @keyframes _marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      {hasSchools && (
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            精选推荐
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            推荐学校
          </h2>
        </div>
      )}

      {/* Gradient masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <div
        className="flex w-max gap-4"
        style={{
          animation: "_marquee 30s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {duplicated.map((item, i) => {
          const card = (
            <div
              className={`group relative h-40 w-64 flex-shrink-0 overflow-hidden rounded-xl sm:h-48 sm:w-72${item.slug ? " cursor-pointer" : ""}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={`object-cover${item.slug ? " transition-transform duration-500 ease-out group-hover:scale-110" : ""}`}
                sizes="288px"
                loading="lazy"
              />
              {item.slug && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-sm font-bold text-white drop-shadow-sm sm:text-base">
                      {item.alt}
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1 text-[11px] text-white/70 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                      查看详情 →
                    </span>
                  </div>
                </>
              )}
            </div>
          );

          return item.slug ? (
            <Link key={i} href={`/zh-CN/schools/${item.slug}`} draggable={false}>
              {card}
            </Link>
          ) : (
            <div key={i}>{card}</div>
          );
        })}
      </div>
    </motion.section>
  );
}
