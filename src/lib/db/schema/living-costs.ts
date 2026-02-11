import {
  pgTable,
  text,
  integer,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";

export const livingCostCategoryEnum = pgEnum("living_cost_category", [
  "housing_dormitory",
  "housing_apartment",
  "food",
  "transportation",
  "phone_internet",
  "daily_necessities",
  "entertainment",
]);

export const livingCostData = pgTable("living_cost_data", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  city: varchar({ length: 50 }).notNull(),
  category: livingCostCategoryEnum().notNull(),
  monthlyLow: integer("monthly_low").notNull(),
  monthlyMid: integer("monthly_mid").notNull(),
  monthlyHigh: integer("monthly_high").notNull(),
  notesZh: text("notes_zh"),
});

export type LivingCostData = typeof livingCostData.$inferSelect;
export type NewLivingCostData = typeof livingCostData.$inferInsert;
