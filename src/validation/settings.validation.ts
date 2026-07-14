import { z } from "zod";

export const companyPreferencesSchema = z.object({
  companyName: z.string().trim().min(2, "Company name is required"),
  website: z.string().trim().url("Valid website URL is required").or(z.literal("")),
  industry: z.string().trim().min(2, "Industry is required"),
  companySize: z.string().trim().min(1, "Company size is required"),
  timezone: z.string().trim().min(1, "Timezone is required"),
  defaultCurrency: z.string().trim().min(1, "Currency is required"),
});

export type CompanyPreferencesType = z.infer<typeof companyPreferencesSchema>;

export const notificationSettingsSchema = z.object({
  applicationEmail: z.boolean(),
  interviewEmail: z.boolean(),
  candidateStatusEmail: z.boolean(),
  weeklyReportEmail: z.boolean(),
  emailSenderName: z.string().trim().min(2, "Sender name is required"),
  replyToEmail: z.string().trim().email("Valid reply email is required"),
});

export type NotificationSettingsType = z.infer<
  typeof notificationSettingsSchema
>;

export const securitySettingsSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password is required"),
    twoFactorEnabled: z.boolean(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
  });

export type SecuritySettingsType = z.infer<typeof securitySettingsSchema>;

export const accountSettingsSchema = z.object({
  adminName: z.string().trim().min(2, "Admin name is required"),
  adminEmail: z.string().trim().email("Valid admin email is required"),
  phone: z.string().trim().min(10, "Phone number is required"),
  designation: z.string().trim().min(2, "Designation is required"),
});

export type AccountSettingsType = z.infer<typeof accountSettingsSchema>;