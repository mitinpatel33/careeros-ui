import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),

    lastName: z.string().min(1, "Last Name is required"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),

    password: z.string().min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export const companyRegisterSchema = z
  .object({
    companyName: z.string().min(2, "Company name is required"),
    website: z
      .string()
      // .url("Enter valid website URL")
      .optional()
      .or(z.literal("")),
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Valid email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and confirm password must match",
    path: ["confirmPassword"],
  });

export type CompanyRegisterSchemaType = z.infer<typeof companyRegisterSchema>;
