export type InterviewStatus =
  | "Scheduled"
  | "Pending Feedback"
  | "Completed"
  | "Cancelled";

export type InterviewType =
  | "HR"
  | "Technical"
  | "Final";

export type InterviewItem = {
  id: string;
  candidateName: string;
  candidateRole: string;
  candidateEmail: string;
  interviewerName: string;
  interviewerEmail: string;
  interviewDate: string;
  interviewTime: string;
  interviewType: InterviewType;
  meetingLink: string;
  status: InterviewStatus;
  rating?: number;
  feedback?: string;
  notes?: string;
};