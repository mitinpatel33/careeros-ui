import { z } from "zod";

export const resumeSchema = z.object({
  fullName: z.string().min(2, "Full name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Phone required"),
  location: z.string().min(2, "Location required"),
  jobTitle: z.string().min(2, "Job title required"),
  linkedIn: z.string().optional(),
  github: z.string().optional(),
  portfolio: z.string().optional(),

  summary: z.string().min(20, "Summary must be at least 20 characters"),

  skills: z.string().min(2, "Skills required"),

  experiences: z.array(
    z.object({
      companyName: z.string().min(2, "Company required"),
      designation: z.string().min(2, "Designation required"),
      startDate: z.string().min(1, "Start date required"),
      endDate: z.string().optional(),
      description: z.string().min(10, "Description required"),
    })
  ),

  educations: z.array(
    z.object({
      degree: z.string().min(2, "Degree required"),
      university: z.string().min(2, "University required"),
      passingYear: z.string().min(4, "Year required"),
      grade: z.string().optional(),
    })
  ),

  projects: z.array(
    z.object({
      title: z.string().min(2, "Project title required"),
      techStack: z.string().min(2, "Tech stack required"),
      description: z.string().min(10, "Description required"),
      liveUrl: z.string().optional(),
      githubUrl: z.string().optional(),
    })
  ),

  certifications: z.array(
    z.object({
      name: z.string().min(2, "Certification required"),
      organization: z.string().min(2, "Organization required"),
      issueDate: z.string().optional(),
      credentialUrl: z.string().optional(),
    })
  ),

  achievements: z.array(
    z.object({
      title: z.string().min(2, "Achievement title required"),
      description: z.string().min(5, "Description required"),
    })
  ),

  languages: z.array(
    z.object({
      name: z.string().min(2, "Language required"),
      proficiency: z.string().min(2, "Proficiency required"),
    })
  ),

  references: z.array(
    z.object({
      name: z.string().min(2, "Name required"),
      company: z.string().optional(),
      email: z.string().email("Valid email required").optional().or(z.literal("")),
      phone: z.string().optional(),
    })
  ),
});

export type ResumeFormType = z.infer<typeof resumeSchema>;