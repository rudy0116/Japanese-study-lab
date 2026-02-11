import type { Metadata } from "next";
import { Noto_Sans_SC, Noto_Sans_JP, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "@/app/globals.css";

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "日本留学透明平台 - 学费透明，佣金公开",
    template: "%s | 日本留学透明平台",
  },
  description:
    "极致透明的日本留学信息平台，公开学费明细、平台佣金，帮助中国学生做出知情决策。",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "zh-CN")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${notoSansSC.variable} ${notoSansJP.variable} ${inter.variable}`}>
      <body className="min-h-screen font-[family-name:var(--font-noto-sc),var(--font-inter),sans-serif] antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
