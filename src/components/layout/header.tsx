"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { VisuallyHidden } from "radix-ui";

export function Header() {
  const t = useTranslations("nav");
  const [open, setOpen] = useState(false);

  const navItems = [
    { href: "/zh-CN/schools", label: t("languageSchools") },
    { href: "/zh-CN/schools?type=prep_school", label: t("prepSchools") },
    { href: "/zh-CN/calculator", label: t("calculator") },
    { href: "/zh-CN/process", label: t("process") },
    { href: "/zh-CN/about", label: t("about") },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/zh-CN" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">
            日本留学透明平台
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/zh-CN/consultation">
            <Button size="sm">{t("consultation")}</Button>
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
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/zh-CN/consultation" onClick={() => setOpen(false)}>
                <Button className="w-full">{t("consultation")}</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
