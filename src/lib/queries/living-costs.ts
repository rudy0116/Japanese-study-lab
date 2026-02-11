import { db } from "@/lib/db";
import { livingCostData } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getLivingCostsByCity(city: string) {
  return db
    .select()
    .from(livingCostData)
    .where(eq(livingCostData.city, city));
}

export async function getAllLivingCosts() {
  return db.select().from(livingCostData);
}
