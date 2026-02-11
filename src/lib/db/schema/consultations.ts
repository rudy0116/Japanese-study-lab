import {
  pgTable,
  text,
  integer,
  timestamp,
  pgEnum,
  varchar,
} from "drizzle-orm/pg-core";
import { schools } from "./schools";

export const consultationStatusEnum = pgEnum("consultation_status", [
  "pending",
  "contacted",
  "completed",
]);

export const consultationRequests = pgTable("consultation_requests", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  schoolId: integer("school_id").references(() => schools.id),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }),
  phone: varchar({ length: 30 }),
  wechatId: varchar("wechat_id", { length: 100 }),
  message: text(),
  status: consultationStatusEnum().default("pending"),
  adminNotes: text("admin_notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ConsultationRequest = typeof consultationRequests.$inferSelect;
export type NewConsultationRequest = typeof consultationRequests.$inferInsert;
