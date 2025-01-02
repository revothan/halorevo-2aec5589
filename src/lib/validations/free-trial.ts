import * as z from "zod";

export const freeTrialSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  currentWebsite: z.string().url("Please enter a valid URL").optional(),
  currentLikes: z.string().optional(),
  improvements: z.string().optional(),
  businessName: z.string().min(2, "Business name must be at least 2 characters"),
  industry: z.string().min(2, "Please specify your industry"),
  goals: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type FreeTrialFormData = z.infer<typeof freeTrialSchema>;