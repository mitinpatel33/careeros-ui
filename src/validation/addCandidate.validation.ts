import { z } from "zod";

export const addCandidateSchema = z.object({
  name: z.string().trim().min(2, "Candidate name is required"),
  email: z.string().trim().email("Valid email is required"),
  phone: z
    .string()
    .trim()
    .min(10, "Phone number must be at least 10 digits"),
  role: z.string().trim().min(2, "Current role is required"),
  location: z.string().trim().min(2, "Location is required"),
  experience: z.string().trim().min(1, "Experience is required"),
  skills: z.string().trim().min(2, "Skills are required"),
  jobId: z.string().min(1, "Job is required"),
  currentStage: z.string().min(1, "Pipeline stage is required"),
  summary: z.string().trim().min(10, "Summary must be at least 10 characters"),
});

export type AddCandidateFormType = z.infer<typeof addCandidateSchema>;