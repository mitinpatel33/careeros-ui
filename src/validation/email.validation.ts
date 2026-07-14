import { z } from "zod";

export const sendEmailSchema = z.object({
  to: z.string().trim().email("Valid candidate email is required"),
  candidateName: z.string().trim().min(2, "Candidate name is required"),
  subject: z.string().trim().min(3, "Subject is required"),
  body: z.string().trim().min(10, "Email body is required"),
});

export type SendEmailFormType = z.infer<typeof sendEmailSchema>;

export const editTemplateSchema = z.object({
  subject: z.string().trim().min(3, "Subject is required"),
  body: z.string().trim().min(10, "Template body is required"),
});

export type EditTemplateFormType = z.infer<typeof editTemplateSchema>;