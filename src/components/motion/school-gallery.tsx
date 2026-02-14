"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CITY_FALLBACK_IMAGES: Record<string, string[]> = {
  东京: [
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80&fit=crop",
  ],
  大阪: [
    "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1589452271712-64b8a66c3929?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=800&q=80&fit=crop",
  ],
  京都: [
    "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80&fit=crop",
  ],
  福冈: [
    "https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80&fit=crop",
  ],
  名古屋: [
    "https://images.unsplash.com/photo-1577862112796-a330e6f48a12?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&fit=crop",
    "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=800&q=80&fit=crop",
  ],
};

const DEFAULT_FALLBACK = [
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80&fit=crop",
  "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80&fit=crop",
  "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&q=80&fit=crop",
];

interface SchoolGalleryProps {
  coverImage?: string | null;
  city?: string | null;
  schoolName: string;
  children?: ReactNode;
}

export function SchoolGallery({
  coverImage,
  city,
  schoolName,
  children,
}: SchoolGalleryProps) {
  const fallbackImages = city
    ? CITY_FALLBACK_IMAGES[city] ?? DEFAULT_FALLBACK
    : DEFAULT_FALLBACK;

  const images: string[] = [];
  if (coverImage) images.push(coverImage);
  // Add fallback images that aren't the same as the cover
  for (const fb of fallbackImages) {
    if (fb !== coverImage) images.push(fb);
  }

  const [[activeIndex, direction], setActive] = useState<[number, number]>([
    0, 0,
  ]);

  const goTo = (index: number) => {
    setActive([index, index > activeIndex ? 1 : -1]);
  };

  const goPrev = () => {
    const prev = activeIndex === 0 ? images.length - 1 : activeIndex - 1;
    setActive([prev, -1]);
  };

  const goNext = () => {
    const next = activeIndex === images.length - 1 ? 0 : activeIndex + 1;
    setActive([next, 1]);
  };

  if (images.length === 0) return null;

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <div className="mb-8">
      {/* Main image */}
      <div className="group relative h-48 overflow-hidden rounded-2xl sm:h-64 lg:h-80">
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="absolute inset-0"
          >
            <Image
              src={images[activeIndex]}
              alt={`${schoolName} - ${activeIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1280px"
              priority={activeIndex === 0}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

        {/* Overlay content (school info etc.) */}
        {children && (
          <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8">
            {children}
          </div>
        )}

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              aria-label="上一张"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
              aria-label="下一张"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Image counter */}
        {images.length > 1 && (
          <div className="absolute right-3 top-3 z-10 rounded-full bg-black/40 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-200 sm:h-16 sm:w-24 ${
                i === activeIndex
                  ? "ring-2 ring-primary ring-offset-2"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${schoolName} 缩略图 ${i + 1}`}
                fill
                className="object-cover"
                sizes="96px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
