import * as z from "zod";

export const freeTrialSchema = z
  .object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    currentWebsite: z
      .string()
      .refine(
        (val) => {
          if (!val) return true;
          try {
            new URL(val);
            return true;
          } catch {
            return false;
          }
        },
        {
          message: "Please enter a valid URL or leave it empty",
        },
      )
      .optional(),
    currentLikes: z.string().optional(),
    improvements: z.string().optional(),
    selectedPlan: z.enum(["starter", "professional"], {
      required_error: "Please select a plan",
    }),
    meetingType: z.enum(["online", "onsite"], {
      required_error: "Please select a meeting type",
    }),
    meetingDate: z
      .date({
        required_error: "Please select a meeting date",
      })
      .refine(
        (date) => {
          const twoDaysFromNow = new Date();
          twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
          twoDaysFromNow.setHours(0, 0, 0, 0);
          return date >= twoDaysFromNow;
        },
        {
          message: "Meeting must be scheduled at least 2 days from today",
        },
      ),
    meetingTime: z.string({
      required_error: "Please select a meeting time",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Export the type inferred from the schema
export type FreeTrialFormData = z.infer<typeof freeTrialSchema>;