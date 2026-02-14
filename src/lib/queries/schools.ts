import { db } from "@/lib/db";
import {
  schools,
  schoolFeeItems,
  schoolCourses,
  schoolMedia,
} from "@/lib/db/schema";
import { eq, and, gte, lte, ilike, inArray, sql, desc, asc, or } from "drizzle-orm";

export type SchoolFilters = {
  schoolType?: string;
  prefecture?: string;
  minFee?: number;
  maxFee?: number;
  search?: string;
  tag?: string;
  sort?: string;
  page?: number;
  pageSize?: number;
};

export async function getSchools(filters: SchoolFilters = {}) {
  const { schoolType, prefecture, search, tag, sort, page = 1, pageSize = 12 } = filters;
  const offset = (page - 1) * pageSize;

  const conditions = [eq(schools.isPublished, true)];

  if (schoolType && schoolType !== "all") {
    conditions.push(eq(schools.schoolType, schoolType as "language_school" | "prep_school"));
  }

  if (prefecture && prefecture !== "all") {
    conditions.push(eq(schools.prefecture, prefecture));
  }

  if (search) {
    conditions.push(
      or(
        ilike(schools.nameZh, `%${search}%`),
        ilike(schools.nameJa, `%${search}%`),
        ilike(schools.descriptionZh, `%${search}%`)
      )!
    );
  }

  if (tag) {
    conditions.push(sql`${schools.tags} @> ARRAY[${tag}]::text[]`);
  }

  let orderBy;
  switch (sort) {
    case "fee_low":
      orderBy = asc(schools.id);
      break;
    case "fee_high":
      orderBy = desc(schools.id);
      break;
    case "rating":
      orderBy = desc(schools.universityAcceptanceRate);
      break;
    default:
      orderBy = desc(schools.createdAt);
  }

  const whereClause = conditions.length > 1 ? and(...conditions) : conditions[0];

  const [schoolList, countResult] = await Promise.all([
    db
      .select()
      .from(schools)
      .where(whereClause)
      .orderBy(orderBy)
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(schools)
      .where(whereClause),
  ]);

  return {
    schools: schoolList,
    total: Number(countResult[0]?.count ?? 0),
    page,
    pageSize,
    totalPages: Math.ceil(Number(countResult[0]?.count ?? 0) / pageSize),
  };
}

export async function getSchoolBySlug(slug: string) {
  const [school] = await db
    .select()
    .from(schools)
    .where(and(eq(schools.slug, slug), eq(schools.isPublished, true)));

  if (!school) return null;

  const [fees, courses, media] = await Promise.all([
    db
      .select()
      .from(schoolFeeItems)
      .where(eq(schoolFeeItems.schoolId, school.id))
      .orderBy(asc(schoolFeeItems.displayOrder)),
    db
      .select()
      .from(schoolCourses)
      .where(eq(schoolCourses.schoolId, school.id)),
    db
      .select()
      .from(schoolMedia)
      .where(eq(schoolMedia.schoolId, school.id))
      .orderBy(asc(schoolMedia.displayOrder)),
  ]);

  return { ...school, fees, courses, media };
}

export async function getSchoolsByIds(ids: number[]) {
  if (ids.length === 0) return [];

  const schoolList = await db
    .select()
    .from(schools)
    .where(
      and(
        eq(schools.isPublished, true),
        inArray(schools.id, ids)
      )
    );

  const schoolsWithFees = await Promise.all(
    schoolList.map(async (school) => {
      const fees = await db
        .select()
        .from(schoolFeeItems)
        .where(eq(schoolFeeItems.schoolId, school.id))
        .orderBy(asc(schoolFeeItems.displayOrder));
      return { ...school, fees };
    })
  );

  return schoolsWithFees;
}

export async function getSchoolsBySlugs(slugs: string[]) {
  if (slugs.length === 0) return [];

  const schoolList = await db
    .select()
    .from(schools)
    .where(
      and(
        eq(schools.isPublished, true),
        inArray(schools.slug, slugs)
      )
    );

  const schoolsWithFees = await Promise.all(
    schoolList.map(async (school) => {
      const fees = await db
        .select()
        .from(schoolFeeItems)
        .where(eq(schoolFeeItems.schoolId, school.id))
        .orderBy(asc(schoolFeeItems.displayOrder));
      return { ...school, fees };
    })
  );

  return schoolsWithFees;
}

export async function getFeaturedSchools() {
  return db
    .select()
    .from(schools)
    .where(and(eq(schools.isPublished, true), eq(schools.isFeatured, true)))
    .limit(6);
}

export async function getAllPublishedSchools() {
  return db
    .select({ id: schools.id, slug: schools.slug, nameZh: schools.nameZh })
    .from(schools)
    .where(eq(schools.isPublished, true));
}
