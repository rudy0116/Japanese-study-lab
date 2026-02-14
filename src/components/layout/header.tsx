"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "radix-ui";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 10);
    });
  }, [scrollY]);

  const navItems = [
    { href: "/zh-CN/schools", label: t("languageSchools") },
    { href: "/zh-CN/schools?type=prep_school", label: t("prepSchools") },
    { href: "/zh-CN/calculator", label: t("calculator") },
    { href: "/zh-CN/process", label: t("process") },
    { href: "/zh-CN/about", label: t("about") },
  ];

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b bg-background/95 shadow-sm backdrop-blur-xl"
          : "bg-background/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/zh-CN" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary transition-transform duration-200 hover:scale-[1.02]">
            日本留学透明平台
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/zh-CN/consultation">
            <Button size="sm" className="shadow-sm transition-all duration-200 hover:shadow-md">
              {t("consultation")}
            </Button>
          </Link>
        </nav>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">菜单</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <VisuallyHidden.Root>
              <SheetTitle>导航菜单</SheetTitle>
            </VisuallyHidden.Root>
            <nav className="mt-8 flex flex-col gap-4">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05, duration: 0.3 }}
              >
                <Link href="/zh-CN/consultation" onClick={() => setOpen(false)}>
                  <Button className="w-full">{t("consultation")}</Button>
                </Link>
              </motion.div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
