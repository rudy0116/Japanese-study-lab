import { z } from "zod";

export const consultationFormSchema = z.object({
  name: z.string().min(1, "请输入姓名"),
  email: z.string().email("请输入有效的邮箱地址").optional().or(z.literal("")),
  phone: z.string().optional(),
  wechatId: z.string().optional(),
  schoolId: z.number().optional(),
  message: z.string().optional(),
});

export type ConsultationFormData = z.infer<typeof consultationFormSchema>;
