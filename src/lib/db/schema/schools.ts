import {
  pgTable,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
  real,
  varchar,
} from "drizzle-orm/pg-core";

export const schoolTypeEnum = pgEnum("school_type", [
  "language_school",
  "prep_school",
]);

export const schools = pgTable("schools", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  slug: varchar({ length: 255 }).notNull().unique(),
  nameJa: text("name_ja").notNull(),
  nameZh: text("name_zh").notNull(),
  schoolType: schoolTypeEnum("school_type").notNull(),
  descriptionZh: text("description_zh"),

  establishedYear: integer("established_year"),
  prefecture: varchar({ length: 50 }),
  city: varchar({ length: 50 }),
  addressJa: text("address_ja"),
  nearestStation: text("nearest_station"),
  walkingMinutes: integer("walking_minutes"),
  latitude: real(),
  longitude: real(),

  totalCapacity: integer("total_capacity"),
  chineseRatio: real("chinese_ratio"),
  classSizeAvg: integer("class_size_avg"),

  jlptN1PassRate: real("jlpt_n1_pass_rate"),
  jlptN2PassRate: real("jlpt_n2_pass_rate"),
  universityAcceptanceRate: real("university_acceptance_rate"),

  hasDormitory: boolean("has_dormitory").default(false),
  hasVisaSupport: boolean("has_visa_support").default(true),
  hasPartTimeSupport: boolean("has_part_time_support").default(false),

  enrollmentPeriods: text("enrollment_periods").array(),
  courseDurations: text("course_durations").array(),

  commissionRate: real("commission_rate"),
  commissionAmount: integer("commission_amount"),
  commissionNotes: text("commission_notes"),

  isPublished: boolean("is_published").default(false),
  isFeatured: boolean("is_featured").default(false),

  coverImage: text("cover_image"),

  website: text(),
  phone: text(),
  email: text(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type School = typeof schools.$inferSelect;
export type NewSchool = typeof schools.$inferInsert;
