import { z } from "zod";

export const personalSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  maritalStatus: z.string().optional(),
  nationality: z.string().optional(),
  photoUrl: z.string().optional(),
});

export const summarySchema = z.object({
  professionalSummary: z.string().min(20, "Summary must be at least 20 characters"),
  careerObjective: z.string().optional(),
});

export const contactSchema = z.object({
  email: z.string().email("Invalid email"),
  mobile: z.string().min(10, "Mobile must be at least 10 digits"),
  alternateMobile: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  pincode: z.string().min(4, "Pincode is required"),
});

export const socialSchema = z.object({
  linkedInUrl: z.string().optional(),
  gitHubUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
});

export type PersonalFormType = z.infer<typeof personalSchema>;
export type SummaryFormType = z.infer<typeof summarySchema>;
export type ContactFormType = z.infer<typeof contactSchema>;
export type SocialFormType = z.infer<typeof socialSchema>;