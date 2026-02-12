import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Use a placeholder during build (neon() only stores the URL, no actual connection).
// At runtime in Vercel serverless functions, the real DATABASE_URL is used.
const sql = neon(process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost/placeholder");
export const db = drizzle(sql, { schema });
