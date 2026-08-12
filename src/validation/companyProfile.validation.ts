import { z } from "zod";

export const companyProfileSchema = z.object({
    companyName: z.string().trim().min(1, "Company name is required"),
    website: z.string().trim().url("Enter a valid website URL").min(1, "Website is required"),
    industry: z.string().trim().min(1, "Industry is required"),
    companySize: z
        .string()
        .trim()
        .regex(/^\d+(-\d+|\+)?$/, "Use a format like 1-10, 50-200, or 500+")
        .min(1, "Company size is required"),
    companyEmail: z.string().trim().email("Enter a valid email address").min(1, "Company email is required"),
    location: z.string().trim().min(1, "Location is required"),
    aboutCompany: z
        .string()
        .trim()
        .min(20, "About company must be at least 20 characters")
        .max(3000, "About company must be under 3000 characters"),
});

export type CompanyProfileFormType = z.infer<typeof companyProfileSchema>;