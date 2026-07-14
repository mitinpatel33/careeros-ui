export type PipelineStage =
  | "Applied"
  | "Reviewed"
  | "Shortlisted"
  | "Interview"
  | "Selected"
  | "Rejected";

export type PipelineCandidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  jobId: string;
  jobTitle: string;
  location: string;
  experience: string;
  matchScore: number;
  atsScore: number;
  appliedDate: string;
  currentStage: PipelineStage;
  skills: string[];
  summary: string;
  notes: string[];
  avatarUrl?: string;
};

export type PipelineColumnData = {
  stage: PipelineStage;
  label: string;
  candidates: PipelineCandidate[];
};