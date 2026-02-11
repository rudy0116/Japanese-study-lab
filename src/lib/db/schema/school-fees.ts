import {
  pgTable,
  text,
  integer,
  boolean,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import { schools } from "./schools";

export const feeTypeEnum = pgEnum("fee_type", [
  "admission",
  "tuition",
  "textbook",
  "facility",
  "insurance",
  "exam",
  "other",
]);

export const feePeriodEnum = pgEnum("fee_period", [
  "one_time",
  "annual",
  "semi_annual",
  "monthly",
]);

export const schoolFeeItems = pgTable("school_fee_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  schoolId: integer("school_id")
    .references(() => schools.id, { onDelete: "cascade" })
    .notNull(),
  feeType: feeTypeEnum("fee_type").notNull(),
  nameZh: varchar("name_zh", { length: 100 }).notNull(),
  nameJa: varchar("name_ja", { length: 100 }),
  amount: integer().notNull(),
  period: feePeriodEnum().notNull(),
  isRequired: boolean("is_required").default(true),
  displayOrder: integer("display_order").default(0),
});

export type SchoolFeeItem = typeof schoolFeeItems.$inferSelect;
export type NewSchoolFeeItem = typeof schoolFeeItems.$inferInsert;
