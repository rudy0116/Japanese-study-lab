import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Users,
  Monitor,
  Clock,
  MessageCircle,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "行前日语体验课 - 出发前就进入学习状态",
  description:
    "通过平台报名的同学，可免费获得数次线上日语体验课，提前适应日本语言学校的真实课堂节奏",
};

const features = [
  {
    icon: Monitor,
    title: "线上小班 / 1v1",
    description:
      "根据你的日语水平匹配合适的班型——零基础可选入门班，有基础的同学可直接参加会话练习课。全部线上进行，随时随地参加。",
  },
  {
    icon: Users,
    title: "真实教师授课",
    description:
      "授课教师均为日本语言学校的现职或有丰富教学经验的日语老师，教学风格与你到日本后的课堂一致，帮助你提前适应。",
  },
  {
    icon: Clock,
    title: "灵活安排时间",
    description:
      "体验课安排在出发前 1–3 个月内，每次 45–60 分钟。不需要集中时间，按你的日程灵活预约即可。",
  },
  {
    icon: MessageCircle,
    title: "课后反馈报告",
    description:
      "每次课后老师会提供简要的学习反馈，包括你的强项和需要加强的部分，帮你在出发前有针对性地准备。",
  },
];

const levels = [
  {
    level: "零基础",
    content: "五十音入门 + 基本问候 + 自我介绍",
    sessions: "3–4 次",
  },
  {
    level: "N5–N4",
    content: "日常会话 + 课堂用语 + 生活场景练习",
    sessions: "2–3 次",
  },
  {
    level: "N3 以上",
    content: "敬语练习 + 学术讨论入门 + 面试模拟",
    sessions: "2–3 次",
  },
];

export default function JapaneseLessonsPage() {
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
        <h1 className="text-3xl font-bold sm:text-4xl">行前日语体验课</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          出发前就进入学习状态。通过平台报名的同学，可免费获得数次线上日语体验课，
          提前适应日本语言学校的真实课堂节奏，到了日本不再手忙脚乱。
        </p>
      </div>

      {/* Features */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">课程特色</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Levels */}
      <section className="mb-16">
        <h2 className="mb-8 text-2xl font-bold">按水平匹配课程</h2>
        <div className="space-y-4">
          {levels.map((item) => (
            <Card key={item.level} className="border bg-card">
              <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {item.level}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {item.content}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold text-primary">
                    {item.sessions}
                  </p>
                  <p className="text-xs text-muted-foreground">体验课次数</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How to get */}
      <section className="mb-16">
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-8">
            <h2 className="mb-6 text-xl font-bold text-primary">
              如何获得体验课？
            </h2>
            <ol className="space-y-4">
              {[
                "通过平台提交咨询并确认入学意向",
                "顾问会根据你的日语水平和出发时间安排体验课",
                "通过 Zoom 或腾讯会议参加线上课程",
                "课后收到学习反馈，做好出发准备",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm">{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">想提前体验日语课堂？</h2>
        <p className="mt-2 text-muted-foreground">
          提交咨询后即可安排免费体验课
        </p>
        <Link href="/zh-CN/consultation" className="mt-6 inline-block">
          <Button size="lg">免费咨询</Button>
        </Link>
      </div>
    </div>
  );
}
