import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJPY(amount: number): string {
  return `¥${amount.toLocaleString("ja-JP")}`;
}

export function formatCNY(amount: number): string {
  return `¥${amount.toLocaleString("zh-CN")}`;
}

export function jpyToCny(jpyAmount: number, rate: number = 0.048): number {
  return Math.round(jpyAmount * rate);
}

export function formatPercentage(value: number | null | undefined): string {
  if (value == null) return "—";
  return `${(value * 100).toFixed(1)}%`;
}

export const JPY_CNY_RATE = 0.048;

export const PREFECTURES = [
  "东京都",
  "大阪府",
  "京都府",
  "福冈县",
  "北海道",
  "爱知县",
  "兵库县",
  "宫城县",
  "神奈川县",
  "埼玉县",
  "千叶县",
  "冲绳县",
] as const;

export const CITIES = [
  "东京",
  "大阪",
  "京都",
  "福冈",
  "札幌",
  "名古屋",
  "冲绳",
] as const;

export const FEE_TYPE_LABELS: Record<string, string> = {
  admission: "入学金",
  tuition: "授业料",
  textbook: "教材费",
  facility: "设施费",
  insurance: "保险费",
  exam: "考试费",
  other: "其他",
};

export const FEE_PERIOD_LABELS: Record<string, string> = {
  one_time: "一次性",
  annual: "年额",
  semi_annual: "半年",
  monthly: "月额",
};

export const SCHOOL_TYPE_LABELS: Record<string, string> = {
  language_school: "语言学校",
  prep_school: "预备校",
};

export const SCHOOL_TAGS = [
  "升学强校",
  "美术升学",
  "就职辅导",
  "大龄OK",
  "零基础OK",
  "奖学金制度",
] as const;
