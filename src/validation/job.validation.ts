import { z } from "zod";

export const jobSchema = z.object({
  jobTitle: z.string().trim().min(2, "Job title is required"),
  department: z.string().trim().optional(),
  jobDescription: z.string().trim().min(10, "Job description must be at least 10 characters"),
  jobType: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Remote", "Freelance"]),
  workplaceType: z.enum(["On-site", "Hybrid", "Remote"]),
  experience: z.string().trim().min(1, "Experience is required"),
  location: z.string().trim().min(1, "Location is required"),
  minimumSalary: z.coerce.number().min(0, "Minimum salary must be at least 0"),
  maximumSalary: z.coerce.number().min(0, "Maximum salary must be at least 0"),
  salaryCurrency: z.string().trim().min(1, "Salary currency is required"),
  salaryPeriod: z.enum(["Yearly", "Monthly", "Hourly"]),
  skills: z.string().trim().min(1, "At least one skill is required"),
  requirements: z.string().trim().optional(),
  responsibilities: z.string().trim().optional(),
  status: z.enum(["Draft", "Active", "Closed", "Archived"]).default("Active"),
  applicationDeadline: z.string().trim().min(1, "Application deadline is required"),
});

export type JobFormType = z.infer<typeof jobSchema>;
