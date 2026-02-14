export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { schools } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { SchoolEditClient } from "./client";

export default async function AdminSchoolEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) notFound();

  const [school] = await db
    .select()
    .from(schools)
    .where(eq(schools.id, numId))
    .limit(1);

  if (!school) notFound();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">编辑学校: {school.nameZh}</h1>
      <SchoolEditClient school={school} />
    </div>
  );
}
