import {
  pgTable,
  text,
  integer,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import { schools } from "./schools";

export const scheduleTypeEnum = pgEnum("schedule_type", [
  "morning",
  "afternoon",
  "full_day",
]);

export const schoolCourses = pgTable("school_courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  schoolId: integer("school_id")
    .references(() => schools.id, { onDelete: "cascade" })
    .notNull(),
  nameZh: varchar("name_zh", { length: 200 }).notNull(),
  durationMonths: integer("duration_months"),
  hoursPerWeek: integer("hours_per_week"),
  scheduleType: scheduleTypeEnum("schedule_type"),
  targetLevel: text("target_level"),
});

export type SchoolCourse = typeof schoolCourses.$inferSelect;
export type NewSchoolCourse = typeof schoolCourses.$inferInsert;
