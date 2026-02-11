import {
  pgTable,
  text,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { schools } from "./schools";

export const mediaTypeEnum = pgEnum("media_type", [
  "photo",
  "video",
]);

export const schoolMedia = pgTable("school_media", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  schoolId: integer("school_id")
    .references(() => schools.id, { onDelete: "cascade" })
    .notNull(),
  url: text().notNull(),
  mediaType: mediaTypeEnum("media_type").default("photo"),
  captionZh: text("caption_zh"),
  isCover: boolean("is_cover").default(false),
  displayOrder: integer("display_order").default(0),
});

export type SchoolMedia = typeof schoolMedia.$inferSelect;
export type NewSchoolMedia = typeof schoolMedia.$inferInsert;
