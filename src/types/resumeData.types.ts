export type ParsedResumeData = {
  personalInformation: ParsedPersonalInformation;
  professionalSummary: string;
  skills: ParsedSkills;
  experiences: ParsedExperience[];
  educations: ParsedEducation[];
  projects: ParsedProject[];
  certifications?: ParsedCertification[];
  achievements?: ParsedAchievement[];
  languages?: ParsedLanguage[];
  references?: ParsedReference[];
  rawText?: string;
};

export type ParsedPersonalInformation = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  website?: string;
};

export type ParsedSkills = {
  technical: string[];
  soft?: string[];
  tools?: string[];
};

export type ParsedExperience = {
  companyName: string;
  designation: string;
  startDate: string;
  endDate?: string;
  duration?: string;
  description: string;
  responsibilities?: string[];
};

export type ParsedEducation = {
  degree: string;
  university: string;
  passingYear: string;
  year?: string;
  grade?: string;
};

export type ParsedProject = {
  title: string;
  techStack: string[];
  description: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type ParsedCertification = {
  name: string;
  organization: string;
  issueDate?: string;
  credentialUrl?: string;
};

export type ParsedAchievement = {
  title: string;
  description: string;
};

export type ParsedLanguage = {
  name: string;
  proficiency: string;
};

export type ParsedReference = {
  name: string;
  company?: string;
  email?: string;
  phone?: string;
};