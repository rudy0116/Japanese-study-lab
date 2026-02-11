import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Eye, Shield, BarChart3, Heart } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "关于我们 - 透明宣言",
  description: "了解我们为什么选择完全透明，以及我们的运营模式",
};

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold">{t("title")}</h1>
      </div>

      {/* Manifesto */}
      <section className="mb-16">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8 sm:p-12">
            <h2 className="mb-6 text-center text-2xl font-bold text-primary">
              {t("manifestoTitle")}
            </h2>
            <div className="space-y-4 text-base leading-relaxed">
              <p>{t("manifesto1")}</p>
              <p>{t("manifesto2")}</p>
              <p className="font-semibold">{t("manifesto3")}</p>
              <ul className="space-y-3 pl-4">
                <li className="flex gap-3">
                  <Eye className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>{t("point1")}</span>
                </li>
                <li className="flex gap-3">
                  <Shield className="mt-1 h-5 w-5 shrink-0 text-transparent-red" />
                  <span>{t("point2")}</span>
                </li>
                <li className="flex gap-3">
                  <BarChart3 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>{t("point3")}</span>
                </li>
                <li className="flex gap-3">
                  <Heart className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>{t("point4")}</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* How we work */}
      <section className="mb-16">
        <h2 className="mb-4 text-2xl font-bold">{t("howWeWork")}</h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          {t("howWeWorkDesc")}
        </p>
      </section>

      {/* Contact */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">{t("contactTitle")}</h2>
        <p className="text-muted-foreground">{t("contactDesc")}</p>
        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <p>日本 (东京办公室): +81 070-4788-5935 / +81 070-8399-1992</p>
          <p>中国咨询窗口: +86 158-0069-0408</p>
          <p>地址: 〒111-0052 東京都台東区柳橋１丁目２３−４ 浅草橋杉浦ビル ４階</p>
          <p>工作时间: 周一至周五 10:00-18:00 (日本时间)</p>
        </div>
      </section>
    </div>
  );
}
