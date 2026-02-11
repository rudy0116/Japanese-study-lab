import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileCheck,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft,
  FileText,
  Search,
  ShieldCheck,
  Clock,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "签证与材料预检查 - 减少补件风险",
  description:
    "专业顾问协助检查在留资格申请材料，减少因细节错误导致被补件或延误的风险",
};

const checkItems = [
  {
    category: "入学申请书",
    items: [
      "填写是否完整、有无遗漏项",
      "日期格式是否统一（西历/和历）",
      "字迹是否工整清晰",
      "签名和印章是否齐全",
    ],
  },
  {
    category: "学历证明",
    items: [
      "毕业证书原件 + 翻译件是否齐备",
      "翻译件是否有翻译公司盖章",
      "成绩单是否为密封件",
      "学历认证（如需）是否已办理",
    ],
  },
  {
    category: "经费支付证明",
    items: [
      "银行存款证明金额是否达标（通常 20 万人民币以上）",
      "存款时间是否满足要求",
      "经费支付人的收入证明和在职证明",
      "亲属关系公证（如经费支付人非本人）",
    ],
  },
  {
    category: "其他材料",
    items: [
      "护照有效期是否充足（6 个月以上）",
      "证件照规格是否符合要求",
      "健康证明项目是否齐全",
      "日语能力证明（JLPT/NAT 等）",
    ],
  },
];

const commonMistakes = [
  {
    icon: AlertTriangle,
    title: "日期格式不统一",
    description:
      "有的写 2025年，有的写令和7年，入管局会要求统一后重新提交。",
  },
  {
    icon: AlertTriangle,
    title: "存款证明开具时间过早",
    description:
      "存款证明有效期通常为 3 个月，如果开得太早，提交时可能已经过期。",
  },
  {
    icon: AlertTriangle,
    title: "翻译件缺少翻译公司盖章",
    description:
      "自行翻译的材料如果没有正规翻译公司的盖章，入管局可能不予认可。",
  },
  {
    icon: AlertTriangle,
    title: "照片不符合规格",
    description:
      "日本签证照片要求 4cm×3cm、白底、近 3 个月内拍摄，很多同学用了错误尺寸。",
  },
];

export default function VisaSupportPage() {
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
        <Badge className="mb-4">免费服务</Badge>
        <h1 className="text-3xl font-bold sm:text-4xl">签证与材料预检查</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          在留资格申请材料的准备是留学中最容易出错的环节。一个日期格式不对、一份证明过期，
          都可能导致补件甚至延误入学。我们的顾问会在你提交前逐项检查，帮你把风险降到最低。
        </p>
      </div>

      {/* Service highlights */}
      <section className="mb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {[
            {
              icon: Search,
              title: "逐项核对",
              desc: "按照入管局要求清单，逐一检查每份材料的完整性和规范性。",
            },
            {
              icon: FileText,
              title: "翻译质量审核",
              desc: "检查翻译件的准确性、格式规范和翻译资质证明。",
            },
            {
              icon: ShieldCheck,
              title: "常见问题预警",
              desc: "根据过往经验，提前指出容易被入管局退回的细节问题。",
            },
            {
              icon: Clock,
              title: "时间节点提醒",
              desc: "提醒存款证明有效期、照片拍摄时间等有时效要求的材料。",
            },
          ].map((item) => (
            <Card key={item.title} className="border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Checklist */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">检查清单</h2>
        <div className="space-y-6">
          {checkItems.map((group) => (
            <Card key={group.category} className="border bg-card">
              <CardContent className="p-6">
                <h3 className="mb-4 text-base font-semibold">
                  {group.category}
                </h3>
                <ul className="space-y-2.5">
                  {group.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Common mistakes */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">常见被退回的原因</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {commonMistakes.map((item) => (
            <Card
              key={item.title}
              className="border-amber-200 bg-amber-50/50"
            >
              <CardContent className="p-5">
                <div className="mb-3 flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-amber-600" />
                  <h3 className="text-sm font-semibold text-amber-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-amber-800/70">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">担心材料有问题？</h2>
        <p className="mt-2 text-muted-foreground">
          提交咨询后，顾问会帮你逐项检查所有申请材料
        </p>
        <Link href="/zh-CN/consultation" className="mt-6 inline-block">
          <Button size="lg">免费咨询</Button>
        </Link>
      </div>
    </div>
  );
}
