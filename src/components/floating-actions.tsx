"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  Heart,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getIcon } from "@/lib/icon-map";
import type { FloatingBenefit } from "@/lib/site-defaults";

interface FloatingActionsProps {
  consultationUrl?: string;
  benefits?: FloatingBenefit[];
}

const DEFAULT_BENEFITS: FloatingBenefit[] = [
  {
    icon: "BookOpen",
    title: "行前日语体验课",
    desc: "线上小班或1v1体验课，出发前熟悉课堂节奏",
  },
  {
    icon: "FileSearch",
    title: "签证材料预检查",
    desc: "顾问协助检查在留资格材料，减少补件风险",
  },
  {
    icon: "MapPinned",
    title: "日本生活落地指南",
    desc: "银行卡、手机卡、住民登记一步步操作清单",
  },
  {
    icon: "Sparkles",
    title: "城市专属福利",
    desc: "交通卡充值、机票优惠等额外福利",
  },
];

export function FloatingActions({
  consultationUrl = "/zh-CN/consultation",
  benefits = DEFAULT_BENEFITS,
}: FloatingActionsProps) {
  const [showGift, setShowGift] = useState(false);

  return (
    <>
      {/* ── Desktop: vertical side tabs ── */}
      <div className="fixed right-0 top-1/3 z-50 hidden flex-col gap-1 lg:flex">
        {/* 報名礼遇 tab */}
        <motion.button
          onClick={() => setShowGift(true)}
          className="group relative flex items-center gap-1.5 rounded-l-2xl bg-gradient-to-b from-primary via-primary to-primary/80 px-2.5 py-5 text-primary-foreground shadow-xl transition-shadow hover:shadow-2xl hover:shadow-primary/30 [writing-mode:vertical-rl]"
          whileHover={{ x: -6, transition: { type: "spring", stiffness: 300 } }}
          whileTap={{ scale: 0.97 }}
        >
          <Gift className="h-4 w-4 rotate-90 transition-transform duration-300 group-hover:scale-110" />
          <span className="text-xs font-bold tracking-[0.2em]">报名礼遇</span>
          {/* Pulse dot */}
          <span className="absolute -left-0.5 top-3 h-2.5 w-2.5 rounded-full bg-red-500 shadow-lg shadow-red-500/50 animate-pulse" />
        </motion.button>

        {/* 收藏学校 tab */}
        <motion.div
          whileHover={{ x: -6, transition: { type: "spring", stiffness: 300 } }}
        >
          <Link
            href="/zh-CN/schools"
            className="flex items-center gap-1.5 rounded-l-2xl bg-gradient-to-b from-rose-500 via-rose-500 to-rose-600 px-2.5 py-5 text-white shadow-xl transition-shadow hover:shadow-2xl hover:shadow-rose-500/30 [writing-mode:vertical-rl]"
          >
            <Heart className="h-4 w-4 rotate-90" />
            <span className="text-xs font-bold tracking-[0.2em]">收藏学校</span>
          </Link>
        </motion.div>
      </div>

      {/* ── Mobile: bottom floating bar ── */}
      <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 lg:hidden">
        <motion.button
          onClick={() => setShowGift(true)}
          className="flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/30"
          whileTap={{ scale: 0.95 }}
        >
          <Gift className="h-4 w-4" />
          报名礼遇
        </motion.button>
        <motion.div whileTap={{ scale: 0.95 }}>
          <Link
            href="/zh-CN/schools"
            className="flex items-center gap-2 rounded-full bg-rose-500 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-rose-500/30"
          >
            <Heart className="h-4 w-4" />
            浏览学校
          </Link>
        </motion.div>
      </div>

      {/* ── Gift slide-out panel ── */}
      <AnimatePresence>
        {showGift && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
              onClick={() => setShowGift(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-background shadow-2xl"
            >
              {/* Header */}
              <div className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-primary/5 to-transparent px-6 pb-6 pt-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-[50px]" />
                <button
                  onClick={() => setShowGift(false)}
                  className="absolute right-4 top-4 rounded-full p-2 transition-colors hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="relative flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-primary/25">
                    <Gift className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">
                      报名礼遇
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      通过平台完成入学即可解锁
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <div className="space-y-3">
                  {benefits.map((item, i) => {
                    const ItemIcon = getIcon(item.icon);
                    return (
                      <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 + i * 0.07 }}
                        className="group flex items-start gap-4 rounded-xl border p-4 transition-all duration-300 hover:border-primary/30 hover:shadow-sm"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:shadow-lg group-hover:shadow-primary/25">
                          <ItemIcon className="h-5 w-5 text-primary transition-colors duration-300 group-hover:text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                <p className="mt-6 rounded-lg bg-muted/50 p-3 text-[11px] leading-relaxed text-muted-foreground">
                  以上礼遇为平台层面的通用服务，具体内容与适用条件以最终签约和咨询确认结果为准，不构成学校官方承诺。
                </p>
              </div>

              {/* Footer CTA */}
              <div className="border-t bg-muted/30 px-6 py-5">
                <Link href={consultationUrl}>
                  <Button
                    size="lg"
                    className="w-full text-base shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30"
                  >
                    免费咨询，了解更多
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
