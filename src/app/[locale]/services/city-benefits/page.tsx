import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Gift, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "城市专属福利 - 不同城市，不同惊喜",
  description:
    "根据入学城市的不同，通过平台报名的同学可以获得交通卡充值、机票优惠等额外福利",
};

const cities = [
  {
    name: "东京",
    benefits: [
      "Suica 交通卡充值 ¥3,000",
      "东京生活地图（中文标注版）",
      "合作药妆店 5% 折扣券",
    ],
    note: "东京物价较高，但打工机会最多、时薪也最高（约 ¥1,150–1,400/小时）。",
  },
  {
    name: "大阪",
    benefits: [
      "ICOCA 交通卡充值 ¥3,000",
      "大阪生活地图（中文标注版）",
      "合作料理店体验券",
    ],
    note: "大阪生活成本比东京低约 15–20%，美食文化丰富，关西口音有特色。",
  },
  {
    name: "京都",
    benefits: [
      "巴士一日券 × 2",
      "京都文化体验活动优先名额",
    ],
    note: "京都是传统文化中心，适合喜欢日本历史和文化的同学。房租相对较低。",
  },
  {
    name: "福冈",
    benefits: [
      "nimoca 交通卡充值 ¥2,000",
      "博多拉面体验券",
    ],
    note: "福冈连续多年被评为日本最宜居城市之一，物价低、离中国近，飞上海仅 1.5 小时。",
  },
  {
    name: "名古屋",
    benefits: [
      "manaca 交通卡充值 ¥2,000",
      "名古屋生活指南",
    ],
    note: "名古屋是日本制造业中心（丰田总部），打工和就职机会丰富。",
  },
  {
    name: "冲绳",
    benefits: [
      "冲绳生活入门礼包",
      "当地交流活动优先名额",
    ],
    note: "冲绳气候温暖、节奏轻松，学费和生活费在日本各地区中较低。",
  },
];

export default function CityBenefitsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/zh-CN"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" />
        返回首页
      </Link>

      {/* Header */}
      <div className="mb-12">
        <Badge className="mb-4">额外福利</Badge>
        <h1 className="text-3xl font-bold sm:text-4xl">城市专属福利</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          不同城市有不同的生活节奏和特色。通过平台完成入学的同学，
          我们会根据你所去的城市提供一些实用的落地福利，帮你更快融入当地生活。
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          以下福利视合作情况可能有所调整，具体内容以咨询时确认为准。
        </p>
      </div>

      {/* City cards */}
      <section className="mb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {cities.map((city) => (
            <Card key={city.name} className="border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-bold">{city.name}</h3>
                </div>
                <ul className="mb-4 space-y-2">
                  {city.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Gift className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {city.note}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* General benefits */}
      <section className="mb-16">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <h2 className="mb-6 text-xl font-bold text-primary">
              所有城市通用福利
            </h2>
            <div className="space-y-3">
              {[
                "行前日语体验课（线上，按水平匹配）",
                "签证与材料预检查服务",
                "日本生活落地指南（按目标城市定制）",
                "入学后 1 个月内的微信/LINE 答疑支持",
                "同城留学生交流群（认识同期同学）",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">想了解你目标城市的福利？</h2>
        <p className="mt-2 text-muted-foreground">
          告诉我们你想去哪个城市，我们会提供详细的福利清单
        </p>
        <Link href="/zh-CN/consultation" className="mt-6 inline-block">
          <Button size="lg">免费咨询</Button>
        </Link>
      </div>
    </div>
  );
}
