"use server";

import { db } from "@/lib/db";
import { consultationRequests } from "@/lib/db/schema";
import { consultationFormSchema } from "@/lib/validators/consultation";

export async function submitConsultation(formData: unknown) {
  const parsed = consultationFormSchema.safeParse(formData);

  if (!parsed.success) {
    return { success: false, error: "表单数据无效" };
  }

  try {
    await db.insert(consultationRequests).values({
      name: parsed.data.name,
      email: parsed.data.email || null,
      phone: parsed.data.phone || null,
      wechatId: parsed.data.wechatId || null,
      schoolId: parsed.data.schoolId || null,
      message: parsed.data.message || null,
    });

    return { success: true };
  } catch {
    return { success: false, error: "提交失败，请稍后重试" };
  }
}
