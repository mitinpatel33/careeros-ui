export type JobStatus = "Open" | "Closed" | "Draft";

export type JobItem = {
  id: string;
  title: string;
  department: string;
  employmentType: string;
  experience: string;
  location: string;
  workMode: string;
  salaryMin: string;
  salaryMax: string;
  positions: string;
  skills: string[];
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  status: JobStatus;
  applications: number;
  createdAt: string;
};