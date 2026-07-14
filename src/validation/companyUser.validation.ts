import { z } from "zod";

export const inviteCompanyUserSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  mobile: z.string().min(10, "Mobile number is required"),
  department: z.string().min(2, "Department is required"),
  role: z.string().min(1, "Role is required"),
});

export type InviteCompanyUserFormType = z.infer<
  typeof inviteCompanyUserSchema
>;