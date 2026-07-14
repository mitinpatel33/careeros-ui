export type CompanyUserStatus = "Active" | "Pending" | "Inactive";

export type CompanyUserRole =
  | "HR Admin"
  | "Recruiter"
  | "Hiring Manager"
  | "Interviewer";

export type CompanyUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  role: CompanyUserRole;
  department: string;
  status: CompanyUserStatus;
  joinedDate: string;
  lastLogin: string;
  jobsManaged: number;
  candidatesReviewed: number;
  interviews: number;
  hires: number;
};

export type PermissionAction = {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
};

export type UserPermissions = {
  jobs: PermissionAction;
  candidates: PermissionAction;
  interviews: PermissionAction;
  emails: PermissionAction;
  analytics: PermissionAction;
};