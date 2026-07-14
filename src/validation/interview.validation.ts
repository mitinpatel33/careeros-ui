import { z } from "zod";

export const scheduleInterviewSchema = z.object({
  candidateName: z.string().trim().min(2, "Candidate name is required"),
  candidateRole: z.string().trim().min(2, "Candidate role is required"),

  candidateEmail: z
    .string()
    .trim()
    .email("Valid candidate email is required"),

  interviewerName: z.string().trim().min(2, "Interviewer name is required"),

  interviewerEmail: z
    .string()
    .trim()
    .email("Valid interviewer email is required"),

  interviewDate: z.string().min(1, "Interview date is required"),
  interviewTime: z.string().min(1, "Interview time is required"),
  interviewType: z.string().min(1, "Interview type is required"),

  meetingLink: z
    .string()
    .trim()
    .url("Valid meeting link is required")
    .optional()
    .or(z.literal("")),

  notes: z.string().optional(),
});

export type ScheduleInterviewFormType = z.infer<
  typeof scheduleInterviewSchema
>;