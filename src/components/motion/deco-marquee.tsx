"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

const IMAGES = [
  { src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=75&fit=crop", alt: "东京天际线" },
  { src: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=600&q=75&fit=crop", alt: "日本神社鸟居" },
  { src: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&q=75&fit=crop", alt: "大阪街道" },
  { src: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=75&fit=crop", alt: "东京塔" },
  { src: "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=600&q=75&fit=crop", alt: "樱花盛开" },
  { src: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=75&fit=crop", alt: "日本小巷" },
  { src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=75&fit=crop", alt: "涩谷十字路口" },
];

export function DecoMarquee() {
  const [paused, setPaused] = useState(false);
  const duplicated = [...IMAGES, ...IMAGES];

  return (
    <motion.div
      className="relative overflow-hidden py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
    >
      <style>{`
        @keyframes _deco_marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <div
        className="flex w-max gap-4"
        style={{
          animation: "_deco_marquee 30s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {duplicated.map((img, i) => (
          <div
            key={i}
            className="group relative h-36 w-56 flex-shrink-0 overflow-hidden rounded-xl sm:h-44 sm:w-64"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              sizes="256px"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <p className="absolute bottom-2 left-3 text-xs font-medium text-white/80 drop-shadow-sm">
              {img.alt}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
