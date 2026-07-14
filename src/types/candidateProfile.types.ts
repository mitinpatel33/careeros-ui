export type CandidateStatus =
  | "Available"
  | "Shortlisted"
  | "Reviewed"
  | "Interview Scheduled"
  | "Rejected";

export type ProfilePersonalInfo = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus?: string;
  nationality?: string;
  photoUrl?: string;
};

export type ProfileSummary = {
  professionalSummary: string;
  careerObjective?: string;
};

export type ProfileContactInfo = {
  email: string;
  mobile: string;
  alternateMobile?: string;
  address: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

export type ProfileSocialInfo = {
  linkedInUrl?: string;
  gitHubUrl?: string;
  portfolioUrl?: string;
  websiteUrl?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    timestamp: string;
  };
};