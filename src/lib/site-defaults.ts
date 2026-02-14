export type FeatureTag = {
  icon: string;
  label: string;
  desc: string;
  bg: string;
  shadow: string;
  href: string;
};

export type StatItem = {
  label: string;
  value: string;
  suffix: string;
};

export type StepItem = {
  step: string;
  icon: string;
  title: string;
  desc: string;
};

export type BonusItem = {
  icon: string;
  title: string;
  desc: string;
  href: string;
};

export type CityItem = {
  name: string;
  nameJa: string;
  prefecture: string;
  schools: number;
  image: string;
};

export type FloatingBenefit = {
  icon: string;
  title: string;
  desc: string;
};

export type SiteSettings = {
  siteName: string;
  phoneJapan: string;
  phoneChina: string;
  address: string;
  businessHours: string;
};

// ── Homepage Feature Tags ──
export const DEFAULT_FEATURE_TAGS: FeatureTag[] = [
  {
    icon: "GraduationCap",
    label: "升学强校",
    desc: "高升学率，名校直通",
    bg: "bg-gradient-to-br from-indigo-500 to-blue-700",
    shadow: "shadow-indigo-500/30",
    href: "/zh-CN/schools?tag=升学强校",
  },
  {
    icon: "Palette",
    label: "美术升学",
    desc: "美大 · 专门学校对策",
    bg: "bg-gradient-to-br from-pink-500 to-rose-700",
    shadow: "shadow-pink-500/30",
    href: "/zh-CN/schools?tag=美术升学",
  },
  {
    icon: "Briefcase",
    label: "就职辅导",
    desc: "就职签证变更支持",
    bg: "bg-gradient-to-br from-emerald-500 to-teal-700",
    shadow: "shadow-emerald-500/30",
    href: "/zh-CN/schools?tag=就职辅导",
  },
  {
    icon: "UserCheck",
    label: "大龄OK",
    desc: "30岁以上也可入学",
    bg: "bg-gradient-to-br from-amber-500 to-orange-700",
    shadow: "shadow-amber-500/30",
    href: "/zh-CN/schools?tag=大龄OK",
  },
  {
    icon: "Globe",
    label: "零基础OK",
    desc: "日语零基础可入学",
    bg: "bg-gradient-to-br from-sky-500 to-cyan-700",
    shadow: "shadow-sky-500/30",
    href: "/zh-CN/schools?tag=零基础OK",
  },
  {
    icon: "Award",
    label: "奖学金制度",
    desc: "学费减免 · 奖学金可申请",
    bg: "bg-gradient-to-br from-violet-500 to-purple-700",
    shadow: "shadow-violet-500/30",
    href: "/zh-CN/schools?tag=奖学金制度",
  },
];

// ── Homepage Stats ──
export const DEFAULT_STATS: StatItem[] = [
  { label: "合作学校", value: "12+", suffix: "所" },
  { label: "覆盖城市", value: "6", suffix: "座" },
  { label: "佣金透明度", value: "100", suffix: "%" },
  { label: "咨询费用", value: "0", suffix: "元" },
];

// ── Homepage Steps ──
export const DEFAULT_STEPS: StepItem[] = [
  {
    step: "01",
    icon: "Search",
    title: "选学校",
    desc: "按地区、预算和特色筛选出 3–5 所候选学校。",
  },
  {
    step: "02",
    icon: "GitCompareArrows",
    title: "加对比",
    desc: "用对比工具并排查看学费、通过率、生活成本。",
  },
  {
    step: "03",
    icon: "MessageSquareText",
    title: "提交咨询",
    desc: "一次填写表单，平台帮你和学校沟通细节。",
  },
  {
    step: "04",
    icon: "FileCheck2",
    title: "确认方案",
    desc: "收到包含总费用明细的留学方案，再做决定。",
  },
  {
    step: "05",
    icon: "PlaneTakeoff",
    title: "办理入学",
    desc: "办签证和住宿，锁定赠送课程与行前服务。",
  },
];

// ── Homepage Bonuses ──
export const DEFAULT_BONUSES: BonusItem[] = [
  {
    href: "/zh-CN/services/japanese-lessons",
    icon: "BookOpen",
    title: "行前日语体验课",
    desc: "提供数次线上日语小班或 1v1 体验课，帮助你在出发前熟悉真实课堂节奏。",
  },
  {
    href: "/zh-CN/services/visa-support",
    icon: "FileSearch",
    title: "签证与材料预检查",
    desc: "顾问协助检查在留资格材料，减少因细节错误被补件或延误的风险。",
  },
  {
    href: "/zh-CN/services/life-guide",
    icon: "MapPinned",
    title: "日本生活落地指南",
    desc: "提供开银行卡、手机卡、住民登记等一步步操作清单，让第一周不踩坑。",
  },
  {
    href: "/zh-CN/services/city-benefits",
    icon: "Gift",
    title: "城市专属福利",
    desc: "不同城市可能还会有额外福利（如交通卡充值、机票优惠等），详情可在咨询时确认。",
  },
];

// ── City Showcase ──
export const DEFAULT_CITIES: CityItem[] = [
  {
    name: "东京",
    nameJa: "東京",
    prefecture: "东京都",
    schools: 5,
    image:
      "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80&fit=crop",
  },
  {
    name: "大阪",
    nameJa: "大阪",
    prefecture: "大阪府",
    schools: 3,
    image:
      "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=800&q=80&fit=crop",
  },
  {
    name: "冲绳",
    nameJa: "沖縄",
    prefecture: "冲绳县",
    schools: 1,
    image:
      "https://images.unsplash.com/photo-1568402102990-bc541580b59f?w=800&q=80&fit=crop",
  },
  {
    name: "名古屋",
    nameJa: "名古屋",
    prefecture: "爱知县",
    schools: 2,
    image:
      "https://images.unsplash.com/photo-1577862112796-a330e6f48a12?w=800&q=80&fit=crop",
  },
  {
    name: "福冈",
    nameJa: "福岡",
    prefecture: "福冈县",
    schools: 1,
    image:
      "https://images.unsplash.com/photo-1571167530149-c1105da4c2c7?w=800&q=80&fit=crop",
  },
];

// ── Floating Benefits ──
export const DEFAULT_FLOATING_BENEFITS: FloatingBenefit[] = [
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

// ── Site Settings ──
export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: "日本留学Lab",
  phoneJapan: "03-XXXX-XXXX",
  phoneChina: "400-XXX-XXXX",
  address: "東京都新宿区...",
  businessHours: "周一至周五 9:00-18:00 (日本时间)",
};

// ── All content keys ──
export const CONTENT_KEYS = {
  FEATURE_TAGS: "homepage_feature_tags",
  STATS: "homepage_stats",
  STEPS: "homepage_steps",
  BONUSES: "homepage_bonuses",
  CITIES: "city_showcase",
  FLOATING_BENEFITS: "floating_benefits",
  SITE_SETTINGS: "site_settings",
} as const;
