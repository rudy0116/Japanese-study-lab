"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className,
  delay = 0,
  as = "span",
}: TextRevealProps) {
  const Component = motion.create(as);

  return (
    <span className="inline-block overflow-hidden">
      <Component
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.6,
          delay,
          ease: [0.33, 1, 0.68, 1],
        }}
        className={className}
      >
        {children}
      </Component>
    </span>
  );
}
