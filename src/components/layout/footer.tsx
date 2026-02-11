import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  return (
    <footer className="border-t bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-primary">日本留学透明平台</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold">{t("quickLinks")}</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link
                  href="/zh-CN/schools"
                  className="text-muted-foreground hover:text-primary"
                >
                  {nav("schools")}
                </Link>
              </li>
              <li>
                <Link
                  href="/zh-CN/schools/compare"
                  className="text-muted-foreground hover:text-primary"
                >
                  {nav("compare")}
                </Link>
              </li>
              <li>
                <Link
                  href="/zh-CN/calculator"
                  className="text-muted-foreground hover:text-primary"
                >
                  {nav("calculator")}
                </Link>
              </li>
              <li>
                <Link
                  href="/zh-CN/consultation"
                  className="text-muted-foreground hover:text-primary"
                >
                  {nav("consultation")}
                </Link>
              </li>
              <li>
                <Link
                  href="/zh-CN/process"
                  className="text-muted-foreground hover:text-primary"
                >
                  {nav("process")}
                </Link>
              </li>
              <li>
                <Link
                  href="/zh-CN/about"
                  className="text-muted-foreground hover:text-primary"
                >
                  {nav("about")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold">{t("contact")}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>日本: +81 070-4788-5935</li>
              <li>中国: +86 158-0069-0408</li>
              <li>地址: 〒111-0052 東京都台東区柳橋１丁目２３−４ 浅草橋杉浦ビル ４階</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          {t("copyright", { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  );
}
