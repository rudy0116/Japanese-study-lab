import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type DbType = ReturnType<typeof drizzle<typeof schema>>;

let cachedDb: DbType | undefined;

function getDb(): DbType {
  if (!cachedDb) {
    // Use bracket notation to prevent Next.js from inlining at build time
    const url = process.env["DATABASE_URL"];
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Available env keys: " +
          Object.keys(process.env).filter((k) => k.includes("DATABASE")).join(", ")
      );
    }
    const sql = neon(url);
    cachedDb = drizzle(sql, { schema });
  }
  return cachedDb;
}

export const db: DbType = new Proxy({} as DbType, {
  get(_target, prop) {
    const instance = getDb();
    const value = Reflect.get(instance, prop, instance);
    if (typeof value === "function") {
      return value.bind(instance);
    }
    return value;
  },
});
