import { z } from "zod";

export const signupSchema = z
  .object({
    email: z.string().email("ایمیل معتبر وارد کنید."),
    password: z.string().min(6, "رمز عبور حداقل باید ۶ کاراکتر باشد."),
    confirmPassword: z.string().min(6, "تأیید رمز عبور الزامی است."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند.",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;
