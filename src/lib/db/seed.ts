import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as dotenv from "dotenv";
import {
  schools,
  schoolFeeItems,
  schoolCourses,
  livingCostData,
} from "./schema";

dotenv.config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(schoolFeeItems);
  await db.delete(schoolCourses);
  await db.delete(livingCostData);
  await db.delete(schools);

  // Real school data from studylab-jp.com
  const schoolsData = [
    {
      slug: "isi-language-school-osaka",
      nameJa: "ISIランゲージスクール大阪校",
      nameZh: "ISI语言学校大阪校",
      schoolType: "language_school" as const,
      descriptionZh:
        "ISI日本语学校是日本最大规模的语言教育集团之一，大阪校位于大阪市中心，交通便利。学校提供丰富的课程选择，从初级到高级日语，以及大学升学指导和商务日语课程。拥有完善的学生支持体系和丰富的课外活动。",
      establishedYear: 2002,
      prefecture: "大阪府",
      city: "大阪",
      addressJa: "大阪市浪速区日本橋西1-2-6",
      nearestStation: "なんば駅",
      walkingMinutes: 7,
      latitude: 34.6595,
      longitude: 135.5055,
      totalCapacity: 600,
      chineseRatio: 0.3,
      classSizeAvg: 16,
      jlptN1PassRate: 0.38,
      jlptN2PassRate: 0.72,
      universityAcceptanceRate: 0.85,
      hasDormitory: true,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["1月", "4月", "7月", "10月"],
      courseDurations: ["1年", "1.5年", "2年"],
      commissionRate: 0.12,
      commissionAmount: 202920,
      commissionNotes: "学费的12%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1590437786948-6a288d9c5a06?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: true,
      website: "https://www.isi-education.com/",
    },
    {
      slug: "aoyama-international-education",
      nameJa: "青山国際教育学院",
      nameZh: "青山国际教育学院",
      schoolType: "language_school" as const,
      descriptionZh:
        "位于东京青山地区的老牌语言学校，地处时尚与文化的中心区域。学校以严谨的教学态度和优质的升学指导闻名，升学率常年保持在较高水平。周边生活便利，适合希望体验东京都市生活的学生。",
      establishedYear: 1988,
      prefecture: "东京都",
      city: "东京",
      addressJa: "東京都港区南青山3-8-40",
      nearestStation: "表参道駅",
      walkingMinutes: 5,
      latitude: 35.6655,
      longitude: 139.7143,
      totalCapacity: 500,
      chineseRatio: 0.35,
      classSizeAvg: 18,
      jlptN1PassRate: 0.4,
      jlptN2PassRate: 0.75,
      universityAcceptanceRate: 0.88,
      hasDormitory: true,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["1月", "4月", "7月", "10月"],
      courseDurations: ["1年", "1.5年", "2年"],
      commissionRate: 0.15,
      commissionAmount: 249000,
      commissionNotes: "学费的15%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1764418659027-b1da026826ec?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: true,
    },
    {
      slug: "aoyama-school-of-japanese",
      nameJa: "青山スクールオブジャパニーズ",
      nameZh: "青山日本语学校",
      schoolType: "language_school" as const,
      descriptionZh:
        "坐落于东京表参道附近的语言学校，以小班精英教学为特色。学校注重日语实际应用能力的培养，课程设置灵活多样，满足不同目标学生的需求。",
      establishedYear: 1995,
      prefecture: "东京都",
      city: "东京",
      addressJa: "東京都渋谷区神宮前3-3-13",
      nearestStation: "外苑前駅",
      walkingMinutes: 6,
      latitude: 35.6703,
      longitude: 139.7177,
      totalCapacity: 350,
      chineseRatio: 0.25,
      classSizeAvg: 15,
      jlptN1PassRate: 0.42,
      jlptN2PassRate: 0.78,
      universityAcceptanceRate: 0.82,
      hasDormitory: false,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["4月", "10月"],
      courseDurations: ["1年", "2年"],
      commissionRate: 0.13,
      commissionAmount: 197392,
      commissionNotes: "学费的13%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1583405963363-588941225fc2?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "asia-tomo-gogaku",
      nameJa: "亜細亜友之会外語学院",
      nameZh: "亚细亚友之会外语学院",
      schoolType: "language_school" as const,
      descriptionZh:
        "历史悠久的语言学校，致力于促进亚洲各国学生之间的交流与友谊。学校提供综合日语课程和大学升学准备课程，拥有经验丰富的教师团队，注重学生的全面发展。",
      establishedYear: 1980,
      prefecture: "东京都",
      city: "东京",
      addressJa: "東京都文京区本郷3-19-7",
      nearestStation: "本郷三丁目駅",
      walkingMinutes: 4,
      latitude: 35.7076,
      longitude: 139.7591,
      totalCapacity: 400,
      chineseRatio: 0.4,
      classSizeAvg: 18,
      jlptN1PassRate: 0.35,
      jlptN2PassRate: 0.7,
      universityAcceptanceRate: 0.8,
      hasDormitory: true,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["1月", "4月", "7月", "10月"],
      courseDurations: ["1年", "1.5年", "2年"],
      commissionRate: 0.14,
      commissionAmount: 214760,
      commissionNotes: "学费的14%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1722591758457-6afb002bb172?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "asia-house-umikaze",
      nameJa: "アジアハウス附属海風日本語学舎",
      nameZh: "亚洲屋附属海风日本语学舍",
      schoolType: "language_school" as const,
      descriptionZh:
        "独具特色的语言学校，以海洋文化和自然环境为教学背景。学校提供沉浸式日语学习体验，课程融入当地文化活动，适合追求独特留学体验的学生。学费相对亲民。",
      establishedYear: 2003,
      prefecture: "冲绳县",
      city: "冲绳",
      addressJa: "沖縄県那覇市前島2-21-13",
      nearestStation: "美栄橋駅",
      walkingMinutes: 8,
      latitude: 26.2158,
      longitude: 127.6809,
      totalCapacity: 200,
      chineseRatio: 0.2,
      classSizeAvg: 14,
      jlptN1PassRate: 0.25,
      jlptN2PassRate: 0.6,
      universityAcceptanceRate: 0.65,
      hasDormitory: true,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["4月", "10月"],
      courseDurations: ["1年", "2年"],
      commissionRate: 0.1,
      commissionAmount: 149000,
      commissionNotes: "学费的10%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1754228811035-d220f70b86d9?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "asuka-academy",
      nameJa: "飛鳥学院",
      nameZh: "飞鸟学院",
      schoolType: "language_school" as const,
      descriptionZh:
        "位于关西地区的老牌语言学校，教学质量稳定。学校以升学指导为强项，与关西地区多所大学建立了良好的合作关系，为学生提供丰富的升学选择。",
      establishedYear: 1990,
      prefecture: "大阪府",
      city: "大阪",
      addressJa: "大阪市天王寺区上本町6-9-17",
      nearestStation: "大阪上本町駅",
      walkingMinutes: 3,
      latitude: 34.6674,
      longitude: 135.5204,
      totalCapacity: 450,
      chineseRatio: 0.45,
      classSizeAvg: 17,
      jlptN1PassRate: 0.32,
      jlptN2PassRate: 0.68,
      universityAcceptanceRate: 0.78,
      hasDormitory: true,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["1月", "4月", "7月", "10月"],
      courseDurations: ["1年", "1.5年", "2年"],
      commissionRate: 0.12,
      commissionAmount: 173040,
      commissionNotes: "学费的12%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1690210684306-521cdb9990a9?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "arms-japanese-language",
      nameJa: "ＡＲＭＳ日本語学校",
      nameZh: "ARMS日本语学校",
      schoolType: "language_school" as const,
      descriptionZh:
        "注重实践能力培养的语言学校，课程设置以就职和升学双轨并行。学校提供丰富的实习机会和就职指导，帮助学生在日本找到理想的工作或升入理想的大学。",
      establishedYear: 2005,
      prefecture: "东京都",
      city: "东京",
      addressJa: "東京都新宿区高田馬場1-16-16",
      nearestStation: "高田馬場駅",
      walkingMinutes: 5,
      latitude: 35.7128,
      longitude: 139.7037,
      totalCapacity: 300,
      chineseRatio: 0.38,
      classSizeAvg: 16,
      jlptN1PassRate: 0.35,
      jlptN2PassRate: 0.72,
      universityAcceptanceRate: 0.8,
      hasDormitory: false,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["4月", "10月"],
      courseDurations: ["1年", "2年"],
      commissionRate: 0.13,
      commissionAmount: 183040,
      commissionNotes: "学费的13%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1420745628365-ba93c07cb5ca?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "intercultural-communication-center",
      nameJa: "異文化間コミュニケーションセンター附属日本語学校",
      nameZh: "异文化交流中心附属日本语学校",
      schoolType: "language_school" as const,
      descriptionZh:
        "位于冲绳的独特语言学校，以跨文化交流为核心理念。在温暖的亚热带气候中学习日语，生活成本低于东京大阪等大城市。适合希望在轻松环境中学习的学生。",
      establishedYear: 1998,
      prefecture: "冲绳县",
      city: "冲绳",
      addressJa: "沖縄県中頭郡北谷町字桑江432",
      nearestStation: "北谷バス停",
      walkingMinutes: 10,
      latitude: 26.3313,
      longitude: 127.7689,
      totalCapacity: 180,
      chineseRatio: 0.15,
      classSizeAvg: 12,
      jlptN1PassRate: 0.22,
      jlptN2PassRate: 0.55,
      universityAcceptanceRate: 0.6,
      hasDormitory: true,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["4月", "10月"],
      courseDurations: ["1年", "2年"],
      commissionRate: 0.1,
      commissionAmount: 138600,
      commissionNotes: "学费的10%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1578809606407-567084e461a6?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "ecc-japanese-nagoya",
      nameJa: "ECC日本語学院名古屋校",
      nameZh: "ECC日本语学院名古屋校",
      schoolType: "language_school" as const,
      descriptionZh:
        "ECC是日本知名的教育品牌，名古屋校提供高质量的日语教育服务。学校位于名古屋市中心，交通便利。ECC独特的教学方法注重听说读写全面发展，帮助学生快速提高日语综合能力。",
      establishedYear: 1975,
      prefecture: "爱知县",
      city: "名古屋",
      addressJa: "名古屋市中区金山1-16-16",
      nearestStation: "金山駅",
      walkingMinutes: 3,
      latitude: 35.1498,
      longitude: 136.9008,
      totalCapacity: 400,
      chineseRatio: 0.3,
      classSizeAvg: 15,
      jlptN1PassRate: 0.4,
      jlptN2PassRate: 0.76,
      universityAcceptanceRate: 0.85,
      hasDormitory: true,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["1月", "4月", "7月", "10月"],
      courseDurations: ["1年", "1.5年", "2年"],
      commissionRate: 0.12,
      commissionAmount: 188880,
      commissionNotes: "学费的12%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1661055426945-fde2d7988cb9?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: true,
    },
    {
      slug: "westcoast-language-institute",
      nameJa: "ウエストコースト語学院",
      nameZh: "西海岸语学院",
      schoolType: "language_school" as const,
      descriptionZh:
        "学校以国际化办学理念著称，注重培养学生的跨文化交际能力。除了日语教学，还提供英语辅助课程。学校的国际化氛围有助于学生开阔视野。",
      establishedYear: 2000,
      prefecture: "福冈县",
      city: "福冈",
      addressJa: "福岡市博多区博多駅南1-14-10",
      nearestStation: "博多駅",
      walkingMinutes: 6,
      latitude: 33.5879,
      longitude: 130.4204,
      totalCapacity: 350,
      chineseRatio: 0.35,
      classSizeAvg: 16,
      jlptN1PassRate: 0.3,
      jlptN2PassRate: 0.68,
      universityAcceptanceRate: 0.75,
      hasDormitory: true,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["1月", "4月", "7月", "10月"],
      courseDurations: ["1年", "1.5年", "2年"],
      commissionRate: 0.12,
      commissionAmount: 184680,
      commissionNotes: "学费的12%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1664080709208-37af64635911?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: false,
    },
    {
      slug: "elite-japanese-language",
      nameJa: "エリート日本語学校",
      nameZh: "精英日本语学校",
      schoolType: "language_school" as const,
      descriptionZh:
        "以升学为导向的精英语言学校，提供针对名校的专项辅导。学校拥有经验丰富的升学指导老师，为学生制定个性化的升学计划，历年升学成绩优异。",
      establishedYear: 1993,
      prefecture: "东京都",
      city: "东京",
      addressJa: "東京都新宿区百人町1-8-10",
      nearestStation: "新大久保駅",
      walkingMinutes: 3,
      latitude: 35.7009,
      longitude: 139.7003,
      totalCapacity: 500,
      chineseRatio: 0.5,
      classSizeAvg: 18,
      jlptN1PassRate: 0.45,
      jlptN2PassRate: 0.8,
      universityAcceptanceRate: 0.9,
      hasDormitory: true,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["1月", "4月", "7月", "10月"],
      courseDurations: ["1年", "1.5年", "2年"],
      commissionRate: 0.15,
      commissionAmount: 226050,
      commissionNotes: "学费的15%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1760016147596-b17d731bb1c6?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: true,
    },
    {
      slug: "osaka-ymca-international",
      nameJa: "大阪YMCA国際専門学校",
      nameZh: "大阪YMCA国际专门学校",
      schoolType: "language_school" as const,
      descriptionZh:
        "历史悠久的教育机构，强调实用日语能力的培养，就业成果优异。YMCA品牌在全球享有盛誉，学校提供奖学金制度和就业支持服务，帮助学生在日本顺利就职。",
      establishedYear: 1985,
      prefecture: "大阪府",
      city: "大阪",
      addressJa: "大阪市西区土佐堀1-5-6",
      nearestStation: "肥後橋駅",
      walkingMinutes: 5,
      latitude: 34.6892,
      longitude: 135.4936,
      totalCapacity: 400,
      chineseRatio: 0.25,
      classSizeAvg: 16,
      jlptN1PassRate: 0.36,
      jlptN2PassRate: 0.72,
      universityAcceptanceRate: 0.82,
      hasDormitory: false,
      hasVisaSupport: true,
      hasPartTimeSupport: true,
      enrollmentPeriods: ["4月", "10月"],
      courseDurations: ["1年", "2年"],
      commissionRate: 0.1,
      commissionAmount: 72000,
      commissionNotes: "学费的10%，入学后支付",
      coverImage: "https://images.unsplash.com/photo-1690210684306-521cdb9990a9?auto=format&fit=crop&w=800&q=80",
      isPublished: true,
      isFeatured: true,
    },
  ];

  const insertedSchools = await db
    .insert(schools)
    .values(schoolsData)
    .returning({ id: schools.id, slug: schools.slug });

  console.log(`Inserted ${insertedSchools.length} schools`);

  const slugToId: Record<string, number> = {};
  for (const s of insertedSchools) {
    slugToId[s.slug] = s.id;
  }

  // Fee items based on real tuition data from studylab-jp.com
  const feeTemplates: Record<
    string,
    Array<{
      feeType: "admission" | "tuition" | "textbook" | "facility" | "insurance" | "exam" | "other";
      nameZh: string;
      nameJa: string;
      amount: number;
      period: "one_time" | "annual" | "semi_annual" | "monthly";
      isRequired: boolean;
      displayOrder: number;
    }>
  > = {
    "isi-language-school-osaka": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 55000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1350000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 66000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 132000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 18000, period: "annual", isRequired: true, displayOrder: 5 },
      { feeType: "other", nameZh: "活动费", nameJa: "活動費", amount: 70000, period: "annual", isRequired: false, displayOrder: 6 },
    ],
    "aoyama-international-education": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 60000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1320000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 50000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 140000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 20000, period: "annual", isRequired: true, displayOrder: 5 },
      { feeType: "other", nameZh: "课外活动费", nameJa: "課外活動費", amount: 70000, period: "annual", isRequired: false, displayOrder: 6 },
    ],
    "aoyama-school-of-japanese": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 50000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1200000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 48400, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 120000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 15000, period: "annual", isRequired: true, displayOrder: 5 },
    ],
    "asia-tomo-gogaku": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 55000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1210000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 44000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 132000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 18000, period: "annual", isRequired: true, displayOrder: 5 },
    ],
    "asia-house-umikaze": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 50000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1180000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 40000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 120000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 15000, period: "annual", isRequired: true, displayOrder: 5 },
    ],
    "asuka-academy": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 50000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1140000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 42000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 120000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 15000, period: "annual", isRequired: true, displayOrder: 5 },
    ],
    "arms-japanese-language": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 50000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1100000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 44000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 110000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 15000, period: "annual", isRequired: true, displayOrder: 5 },
    ],
    "intercultural-communication-center": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 45000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1100000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 40000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 100000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 12000, period: "annual", isRequired: true, displayOrder: 5 },
    ],
    "ecc-japanese-nagoya": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 55000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1250000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 44000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 132000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 18000, period: "annual", isRequired: true, displayOrder: 5 },
    ],
    "westcoast-language-institute": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 50000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1220000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 44000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 125000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 15000, period: "annual", isRequired: true, displayOrder: 5 },
    ],
    "elite-japanese-language": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 55000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 1200000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 42000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 132000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 18000, period: "annual", isRequired: true, displayOrder: 5 },
      { feeType: "exam", nameZh: "模拟考试费", nameJa: "模試費", amount: 60000, period: "annual", isRequired: false, displayOrder: 6 },
    ],
    "osaka-ymca-international": [
      { feeType: "admission", nameZh: "入学金", nameJa: "入学金", amount: 50000, period: "one_time", isRequired: true, displayOrder: 1 },
      { feeType: "tuition", nameZh: "授业料", nameJa: "授業料", amount: 580000, period: "annual", isRequired: true, displayOrder: 2 },
      { feeType: "textbook", nameZh: "教材费", nameJa: "教材費", amount: 30000, period: "annual", isRequired: true, displayOrder: 3 },
      { feeType: "facility", nameZh: "设施费", nameJa: "施設費", amount: 50000, period: "annual", isRequired: true, displayOrder: 4 },
      { feeType: "insurance", nameZh: "保险费", nameJa: "保険料", amount: 10000, period: "annual", isRequired: true, displayOrder: 5 },
    ],
  };

  for (const [slug, fees] of Object.entries(feeTemplates)) {
    const schoolId = slugToId[slug];
    if (!schoolId) continue;
    await db.insert(schoolFeeItems).values(fees.map((f) => ({ ...f, schoolId })));
  }
  console.log("Inserted fee items");

  // Seed courses
  const courseTemplates: Record<string, Array<{
    nameZh: string;
    durationMonths: number;
    hoursPerWeek: number;
    scheduleType: "morning" | "afternoon" | "full_day";
    targetLevel: string;
  }>> = {
    "isi-language-school-osaka": [
      { nameZh: "综合日语课程", durationMonths: 24, hoursPerWeek: 20, scheduleType: "morning", targetLevel: "N5-N1" },
      { nameZh: "升学准备课程", durationMonths: 12, hoursPerWeek: 20, scheduleType: "morning", targetLevel: "N3-N1" },
      { nameZh: "商务日语课程", durationMonths: 12, hoursPerWeek: 20, scheduleType: "afternoon", targetLevel: "N2以上" },
    ],
    "aoyama-international-education": [
      { nameZh: "综合日语课程", durationMonths: 24, hoursPerWeek: 20, scheduleType: "morning", targetLevel: "N5-N1" },
      { nameZh: "大学升学课程", durationMonths: 12, hoursPerWeek: 25, scheduleType: "morning", targetLevel: "N3-N1" },
    ],
    "ecc-japanese-nagoya": [
      { nameZh: "综合日语课程", durationMonths: 24, hoursPerWeek: 20, scheduleType: "morning", targetLevel: "N5-N1" },
      { nameZh: "JLPT对策课程", durationMonths: 12, hoursPerWeek: 20, scheduleType: "afternoon", targetLevel: "N3-N1" },
      { nameZh: "商务日语课程", durationMonths: 12, hoursPerWeek: 20, scheduleType: "morning", targetLevel: "N2以上" },
    ],
    "elite-japanese-language": [
      { nameZh: "名校升学课程", durationMonths: 12, hoursPerWeek: 30, scheduleType: "full_day", targetLevel: "N2以上" },
      { nameZh: "综合日语课程", durationMonths: 24, hoursPerWeek: 20, scheduleType: "morning", targetLevel: "N5-N1" },
    ],
    "osaka-ymca-international": [
      { nameZh: "综合日语课程", durationMonths: 24, hoursPerWeek: 20, scheduleType: "morning", targetLevel: "N5-N1" },
      { nameZh: "JLPT对策课程", durationMonths: 12, hoursPerWeek: 20, scheduleType: "afternoon", targetLevel: "N3-N1" },
    ],
  };

  for (const [slug, courses] of Object.entries(courseTemplates)) {
    const schoolId = slugToId[slug];
    if (!schoolId) continue;
    await db.insert(schoolCourses).values(courses.map((c) => ({ ...c, schoolId })));
  }
  console.log("Inserted courses");

  // Living cost data (aligned with calculator page data from studylab-jp.com)
  const livingCosts = [
    // 东京 - higher cost based on site data (6-12万/月 range)
    { city: "东京", category: "housing_dormitory" as const, monthlyLow: 35000, monthlyMid: 50000, monthlyHigh: 65000, notesZh: "学校宿舍，含水电" },
    { city: "东京", category: "housing_apartment" as const, monthlyLow: 55000, monthlyMid: 75000, monthlyHigh: 100000, notesZh: "1K公寓，23区内" },
    { city: "东京", category: "food" as const, monthlyLow: 25000, monthlyMid: 40000, monthlyHigh: 60000, notesZh: "自炊为主/外食混合/外食为主" },
    { city: "东京", category: "transportation" as const, monthlyLow: 5000, monthlyMid: 10000, monthlyHigh: 15000, notesZh: "学生月票" },
    { city: "东京", category: "phone_internet" as const, monthlyLow: 3000, monthlyMid: 5000, monthlyHigh: 8000, notesZh: "格安SIM/普通套餐" },
    { city: "东京", category: "daily_necessities" as const, monthlyLow: 5000, monthlyMid: 10000, monthlyHigh: 15000, notesZh: "日用品、洗护等" },
    { city: "东京", category: "entertainment" as const, monthlyLow: 5000, monthlyMid: 15000, monthlyHigh: 30000, notesZh: "娱乐社交" },
    // 大阪 - 比东京低20-30%
    { city: "大阪", category: "housing_dormitory" as const, monthlyLow: 28000, monthlyMid: 40000, monthlyHigh: 55000, notesZh: "学校宿舍，含水电" },
    { city: "大阪", category: "housing_apartment" as const, monthlyLow: 40000, monthlyMid: 58000, monthlyHigh: 80000, notesZh: "1K公寓" },
    { city: "大阪", category: "food" as const, monthlyLow: 22000, monthlyMid: 35000, monthlyHigh: 50000, notesZh: "自炊/外食混合/外食为主" },
    { city: "大阪", category: "transportation" as const, monthlyLow: 5000, monthlyMid: 8000, monthlyHigh: 12000, notesZh: "学生月票" },
    { city: "大阪", category: "phone_internet" as const, monthlyLow: 3000, monthlyMid: 5000, monthlyHigh: 8000, notesZh: "格安SIM/普通套餐" },
    { city: "大阪", category: "daily_necessities" as const, monthlyLow: 5000, monthlyMid: 8000, monthlyHigh: 12000, notesZh: "日用品" },
    { city: "大阪", category: "entertainment" as const, monthlyLow: 5000, monthlyMid: 12000, monthlyHigh: 25000, notesZh: "娱乐社交" },
    // 京都
    { city: "京都", category: "housing_dormitory" as const, monthlyLow: 25000, monthlyMid: 38000, monthlyHigh: 50000, notesZh: "学校宿舍" },
    { city: "京都", category: "housing_apartment" as const, monthlyLow: 38000, monthlyMid: 52000, monthlyHigh: 75000, notesZh: "1K公寓" },
    { city: "京都", category: "food" as const, monthlyLow: 22000, monthlyMid: 35000, monthlyHigh: 50000, notesZh: "自炊/混合/外食" },
    { city: "京都", category: "transportation" as const, monthlyLow: 4000, monthlyMid: 7000, monthlyHigh: 10000, notesZh: "公交/地铁" },
    { city: "京都", category: "phone_internet" as const, monthlyLow: 3000, monthlyMid: 5000, monthlyHigh: 8000, notesZh: "格安SIM/普通套餐" },
    { city: "京都", category: "daily_necessities" as const, monthlyLow: 5000, monthlyMid: 7000, monthlyHigh: 10000, notesZh: "日用品" },
    { city: "京都", category: "entertainment" as const, monthlyLow: 5000, monthlyMid: 10000, monthlyHigh: 20000, notesZh: "娱乐社交" },
    // 福冈
    { city: "福冈", category: "housing_dormitory" as const, monthlyLow: 22000, monthlyMid: 32000, monthlyHigh: 42000, notesZh: "学校宿舍" },
    { city: "福冈", category: "housing_apartment" as const, monthlyLow: 32000, monthlyMid: 48000, monthlyHigh: 65000, notesZh: "1K公寓" },
    { city: "福冈", category: "food" as const, monthlyLow: 20000, monthlyMid: 30000, monthlyHigh: 45000, notesZh: "自炊/混合/外食" },
    { city: "福冈", category: "transportation" as const, monthlyLow: 4000, monthlyMid: 6000, monthlyHigh: 10000, notesZh: "公交/地铁" },
    { city: "福冈", category: "phone_internet" as const, monthlyLow: 3000, monthlyMid: 5000, monthlyHigh: 8000, notesZh: "格安SIM" },
    { city: "福冈", category: "daily_necessities" as const, monthlyLow: 4000, monthlyMid: 6000, monthlyHigh: 9000, notesZh: "日用品" },
    { city: "福冈", category: "entertainment" as const, monthlyLow: 4000, monthlyMid: 10000, monthlyHigh: 20000, notesZh: "娱乐社交" },
    // 札幌
    { city: "札幌", category: "housing_dormitory" as const, monthlyLow: 20000, monthlyMid: 30000, monthlyHigh: 40000, notesZh: "学校宿舍" },
    { city: "札幌", category: "housing_apartment" as const, monthlyLow: 28000, monthlyMid: 42000, monthlyHigh: 60000, notesZh: "1K公寓" },
    { city: "札幌", category: "food" as const, monthlyLow: 20000, monthlyMid: 30000, monthlyHigh: 45000, notesZh: "自炊/混合/外食" },
    { city: "札幌", category: "transportation" as const, monthlyLow: 5000, monthlyMid: 8000, monthlyHigh: 12000, notesZh: "地铁" },
    { city: "札幌", category: "phone_internet" as const, monthlyLow: 3000, monthlyMid: 5000, monthlyHigh: 8000, notesZh: "格安SIM" },
    { city: "札幌", category: "daily_necessities" as const, monthlyLow: 4000, monthlyMid: 6000, monthlyHigh: 9000, notesZh: "日用品" },
    { city: "札幌", category: "entertainment" as const, monthlyLow: 4000, monthlyMid: 10000, monthlyHigh: 18000, notesZh: "娱乐社交" },
    // 名古屋
    { city: "名古屋", category: "housing_dormitory" as const, monthlyLow: 25000, monthlyMid: 35000, monthlyHigh: 48000, notesZh: "学校宿舍" },
    { city: "名古屋", category: "housing_apartment" as const, monthlyLow: 38000, monthlyMid: 55000, monthlyHigh: 72000, notesZh: "1K公寓" },
    { city: "名古屋", category: "food" as const, monthlyLow: 22000, monthlyMid: 33000, monthlyHigh: 48000, notesZh: "自炊/混合/外食" },
    { city: "名古屋", category: "transportation" as const, monthlyLow: 5000, monthlyMid: 8000, monthlyHigh: 12000, notesZh: "地铁" },
    { city: "名古屋", category: "phone_internet" as const, monthlyLow: 3000, monthlyMid: 5000, monthlyHigh: 8000, notesZh: "格安SIM" },
    { city: "名古屋", category: "daily_necessities" as const, monthlyLow: 5000, monthlyMid: 7000, monthlyHigh: 10000, notesZh: "日用品" },
    { city: "名古屋", category: "entertainment" as const, monthlyLow: 5000, monthlyMid: 12000, monthlyHigh: 22000, notesZh: "娱乐社交" },
    // 冲绳
    { city: "冲绳", category: "housing_dormitory" as const, monthlyLow: 18000, monthlyMid: 28000, monthlyHigh: 38000, notesZh: "学校宿舍" },
    { city: "冲绳", category: "housing_apartment" as const, monthlyLow: 28000, monthlyMid: 40000, monthlyHigh: 55000, notesZh: "1K公寓" },
    { city: "冲绳", category: "food" as const, monthlyLow: 18000, monthlyMid: 28000, monthlyHigh: 40000, notesZh: "自炊/混合/外食" },
    { city: "冲绳", category: "transportation" as const, monthlyLow: 3000, monthlyMid: 5000, monthlyHigh: 8000, notesZh: "公交/单轨" },
    { city: "冲绳", category: "phone_internet" as const, monthlyLow: 3000, monthlyMid: 5000, monthlyHigh: 8000, notesZh: "格安SIM" },
    { city: "冲绳", category: "daily_necessities" as const, monthlyLow: 4000, monthlyMid: 6000, monthlyHigh: 8000, notesZh: "日用品" },
    { city: "冲绳", category: "entertainment" as const, monthlyLow: 3000, monthlyMid: 8000, monthlyHigh: 15000, notesZh: "娱乐社交" },
  ];

  await db.insert(livingCostData).values(livingCosts);
  console.log("Inserted living cost data");

  console.log("Seed completed!");
}

seed().catch(console.error);
