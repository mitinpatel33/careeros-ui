export type JobStatus = "Draft" | "Active" | "Closed" | "Archived";
export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship" | "Remote" | "Freelance";
export type WorkplaceType = "On-site" | "Hybrid" | "Remote";
export type SalaryPeriod = "Yearly" | "Monthly" | "Hourly";

export type VerificationStatus = "Pending" | "Verified" | "Rejected";

export type CompanyProfile = {
  _id?: string;
  userId?: string;
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  companyEmail: string;
  location: string;
  aboutCompany: string;
  logoUrl?: string;
  verificationStatus?: VerificationStatus;
  createdAt?: string;
  updatedAt?: string;
};

export type JobItem = {
  _id: string;
  userId?: string;
  jobTitle: string;
  department?: string;
  jobDescription: string;
  jobType: JobType;
  workplaceType: WorkplaceType;
  experience?: string;
  location?: string;
  minimumSalary?: number;
  maximumSalary?: number;
  salaryCurrency?: string;
  salaryPeriod?: SalaryPeriod;
  skills: string[];
  status: JobStatus;
  requirements: string[];
  responsibilities: string[];
  applicationDeadline?: string;
  viewsCount?: number;
  applicationsCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type JobStats = {
  totalJobs: number;
  activeJobs: number;
  closedJobs: number;
  draftJobs: number;
  archivedJobs: number;
  totalApplications: number;
  totalViews: number;
};