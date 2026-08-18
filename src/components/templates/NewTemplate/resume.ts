export interface PersonalInfo {
  fullName: string;
  jobTitle?: string;
  phone?: string;
  email?: string;
  location?: string;
  linkedin?: string;
  website?: string;
  photoUrl?: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate: string; // "Present" allowed
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  institution: string;
  degree: string;
  location?: string;
  date: string;
  gpa?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  skills: string[];
  experience: ExperienceEntry[];
  education: EducationEntry[];
  languages?: string[];
  awards?: string[];
  certifications?: string[];
}

/** A4 paper size at 96dpi CSS pixels — every template renders inside this box
 * so on-screen preview and PDF export always agree, and multi-page export
 * never has to squash or crop content. */
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;
