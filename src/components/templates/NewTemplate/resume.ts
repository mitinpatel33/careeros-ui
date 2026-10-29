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

/**
 * Normalises the raw profile API data (the same shape ClassicBlueTemplate reads:
 * data.personal / contact / social / summary / skills / education / experience ...)
 * into one flat model, so every themed template renders from the same clean fields.
 */

export type ContactKind =
  | "phone"
  | "email"
  | "location"
  | "linkedin"
  | "github"
  | "web";

export interface NContact {
  kind: ContactKind;
  label: string;
  href?: string;
}
export interface NSkill {
  name: string;
  /** 0-100, used by skill-bar layouts */
  level: number;
}
export interface NExperience {
  company: string;
  role: string;
  location?: string;
  period: string;
  bullets: string[];
}
export interface NEducation {
  school: string;
  degree: string;
  period: string;
  score?: string;
  note?: string;
}
export interface NProject {
  name: string;
  role?: string;
  description?: string;
  tech: string[];
  url?: string;
}
export interface NCert {
  name: string;
  issuer?: string;
  date?: string;
}
export interface NAchievement {
  title: string;
  description?: string;
}
export interface NLanguage {
  name: string;
  level?: string;
}

export interface NResume {
  name: string;
  initials: string;
  role: string;
  photo?: string;
  contact: NContact[];
  summary: string;
  objective: string;
  skills: NSkill[];
  experience: NExperience[];
  education: NEducation[];
  projects: NProject[];
  certs: NCert[];
  achievements: NAchievement[];
  languages: NLanguage[];
}

/* ------------------------------ helpers ------------------------------ */

const fmt = (value?: string): string => {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const period = (start?: string, end?: string, current?: boolean): string => {
  const s = fmt(start);
  const e = current ? "Present" : fmt(end);
  return s && e ? `${s} - ${e}` : s || e;
};

/** Free text -> bullet points (new lines first, otherwise sentences). */
export const toBullets = (text?: string): string[] => {
  if (!text) return [];
  const lines = text
    .split(/\r?\n+/)
    .map((l) => l.replace(/^[\s•\-*–]+/, "").trim())
    .filter((l) => l.length > 1);
  if (lines.length > 1) return lines;
  return (text.match(/[^.!?]+[.!?]*/g) ?? [])
    .map((s) => s.trim())
    .filter((s) => s.length > 1);
};

const cleanUrl = (url: string): string =>
  url
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "");

const LEVELS: Record<string, number> = {
  beginner: 40,
  intermediate: 65,
  advanced: 85,
  expert: 95,
};

/* ----------------------------- normaliser ----------------------------- */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const normalizeResume = (data: any = {}): NResume => {
  const p = data?.personal ?? {};
  const c = data?.contact ?? {};
  const s = data?.social ?? {};

  const name = `${p.firstName ?? ""} ${p.lastName ?? ""}`.trim() || "Your Name";
  const initials =
    name
      .split(/\s+/)
      .map((w: string) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ME";

  const location =
    [c.city, c.state, c.country].filter(Boolean).join(", ") || c.address || "";

  const contact: NContact[] = (
    [
      c.mobile && { kind: "phone", label: c.mobile },
      c.email && { kind: "email", label: c.email, href: `mailto:${c.email}` },
      location && { kind: "location", label: location },
      s.linkedInUrl && {
        kind: "linkedin",
        label: cleanUrl(s.linkedInUrl),
        href: s.linkedInUrl,
      },
      s.gitHubUrl && {
        kind: "github",
        label: cleanUrl(s.gitHubUrl),
        href: s.gitHubUrl,
      },
      (s.portfolioUrl || s.websiteUrl) && {
        kind: "web",
        label: cleanUrl(s.portfolioUrl || s.websiteUrl),
        href: s.portfolioUrl || s.websiteUrl,
      },
    ] as (NContact | false | "" | undefined)[]
  ).filter(Boolean) as NContact[];

  return {
    name,
    initials,
    role: p.jobTitle ?? "",
    photo: p.photoUrl || undefined,
    contact,
    summary: data?.summary?.professionalSummary ?? "",
    objective: data?.summary?.careerObjective ?? "",

    skills: (data?.skills ?? [])
      .filter((x: any) => x?.skillName)
      .map((x: any) => ({
        name: x.skillName,
        level: LEVELS[String(x.proficiency ?? "").toLowerCase()] ?? 75,
      })),

    experience: (data?.experience ?? []).map((e: any) => ({
      company: e.companyName ?? "",
      role: e.designation ?? "",
      location: e.location || undefined,
      period: period(e.startDate, e.endDate, e.isCurrentCompany),
      bullets: toBullets(e.description),
    })),

    education: (data?.education ?? []).map((e: any) => ({
      school: e.instituteName ?? "",
      degree: [e.degree, e.fieldOfStudy].filter(Boolean).join(" - "),
      period: period(e.startDate, e.endDate || "", false) || "",
      score: e.percentage ? `${e.percentage}%` : e.grade || undefined,
      note: e.description || undefined,
    })),

    projects: (data?.projects ?? []).map((x: any) => ({
      name: x.projectName ?? "",
      role: x.role || undefined,
      description: x.description || undefined,
      tech: Array.isArray(x.technologies) ? x.technologies : [],
      url: x.projectUrl || undefined,
    })),

    certs: (data?.certifications ?? data?.certificates ?? []).map((x: any) => ({
      name: x.certificateName ?? "",
      issuer: x.issuedBy || undefined,
      date: fmt(x.issuedDate) || undefined,
    })),

    achievements: (data?.achievements ?? []).map((x: any) => ({
      title: x.title ?? "",
      description: x.description || undefined,
    })),

    languages: (data?.languages ?? []).map((x: any) => ({
      name: x.languageName ?? "",
      level: x.proficiencyLevel || undefined,
    })),
  };
};
