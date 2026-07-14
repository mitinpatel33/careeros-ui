import { z } from "zod";

export const jobSchema = z.object({
  title: z.string().trim().min(2, "Job title is required"),
  department: z.string().trim().min(2, "Department is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  experience: z.string().trim().min(1, "Experience is required"),
  location: z.string().trim().min(2, "Location is required"),
  workMode: z.string().min(1, "Work mode is required"),
  salaryMin: z.string().trim().min(1, "Minimum salary is required"),
  salaryMax: z.string().trim().min(1, "Maximum salary is required"),
  positions: z.string().trim().min(1, "Open positions is required"),
  skills: z.string().trim().min(2, "Required skills are required"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters"),

  responsibilities: z.string().trim().min(10, "Responsibilities are required"),
  requirements: z.string().trim().min(10, "Requirements are required"),
  benefits: z.string().optional(),
});

export type JobFormType = z.infer<typeof jobSchema>;
