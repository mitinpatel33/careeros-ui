import type { SvgIconComponent } from "@mui/icons-material";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import GavelRoundedIcon from "@mui/icons-material/GavelRounded";
import AccountBalanceRoundedIcon from "@mui/icons-material/AccountBalanceRounded";
import CalculateRoundedIcon from "@mui/icons-material/CalculateRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";

/** "other" was removed – only real, supported professions are offered. */
export type ProfessionId =
  | "doctor"
  | "engineering"
  | "law"
  | "ca"
  | "cma"
  | "it"
  | "teacher"
  | "business";

export interface ProfessionStep {
  key: string;
  title: string;
  type: "form" | "list";
}

export interface ProfessionDef {
  id: ProfessionId;
  title: string;
  description: string;
  /** Rounded MUI icon – rendered inside a tinted tile (no emoji) */
  icon: SvgIconComponent;
  /** Accent colour used for the icon tile, glow and selected state */
  accent: string;
  /** Kept for backwards compatibility with any other consumer */
  gradient: string;
  /** Steps shown only for this profession */
  extraSteps: ProfessionStep[];
}

export const PROFESSION_STORAGE_KEY = "candidate_profession";

/** Steps shared by every profession */
export const COMMON_STEPS_BEFORE: ProfessionStep[] = [
  { key: "personal", title: "Personal", type: "form" },
  { key: "summary", title: "Summary", type: "form" },
  { key: "contact", title: "Contact", type: "form" },
  { key: "social", title: "Social", type: "form" },
  { key: "educations", title: "Education", type: "list" },
  { key: "experiences", title: "Experience", type: "list" },
];

export const COMMON_STEPS_AFTER: ProfessionStep[] = [
  { key: "certificates", title: "Certificates", type: "list" },
  { key: "achievements", title: "Awards", type: "list" },
  { key: "languages", title: "Languages", type: "list" },
];

/** Template + settings are always last (type "gallery" handled in ProfilePage) */
export const FINAL_STEPS = [
  { key: "template", title: "Choose Template", type: "gallery" },
  { key: "settings", title: "Settings", type: "form" },
] as const;

export const PROFESSIONS: ProfessionDef[] = [
  {
    id: "doctor",
    title: "Doctor / Medical",
    description: "MBBS, MD, dentists, nurses and healthcare professionals.",
    icon: MedicalServicesRoundedIcon,
    accent: "#0891b2",
    gradient: "linear-gradient(135deg,#06b6d4 0%,#2563eb 100%)",
    extraSteps: [
      {
        key: "medicalRegistration",
        title: "Registration & License",
        type: "form",
      },
      { key: "specializations", title: "Specializations", type: "list" },
      { key: "clinicalExperience", title: "Clinical Training", type: "list" },
      { key: "research", title: "Research & Publications", type: "list" },
    ],
  },
  {
    id: "engineering",
    title: "Engineering",
    description: "Students and engineers across all branches.",
    icon: EngineeringRoundedIcon,
    accent: "#4f46e5",
    gradient: "linear-gradient(135deg,#3b82f6 0%,#6366f1 100%)",
    extraSteps: [
      { key: "skills", title: "Technical Skills", type: "list" },
      { key: "projects", title: "Projects", type: "list" },
      { key: "internships", title: "Internships", type: "list" },
    ],
  },
  {
    id: "law",
    title: "Law / Legal",
    description: "Law students, advocates and legal consultants.",
    icon: GavelRoundedIcon,
    accent: "#7c3aed",
    gradient: "linear-gradient(135deg,#8b5cf6 0%,#2563eb 100%)",
    extraSteps: [
      { key: "barCouncil", title: "Bar Council Details", type: "form" },
      { key: "practiceAreas", title: "Practice Areas", type: "list" },
      { key: "moots", title: "Moot Courts & Internships", type: "list" },
      { key: "legalPublications", title: "Publications", type: "list" },
    ],
  },
  {
    id: "ca",
    title: "Chartered Accountant",
    description: "CA, CA Inter / Final students and article assistants.",
    icon: AccountBalanceRoundedIcon,
    accent: "#059669",
    gradient: "linear-gradient(135deg,#10b981 0%,#2563eb 100%)",
    extraSteps: [
      { key: "caMembership", title: "ICAI Membership", type: "form" },
      { key: "articleship", title: "Articleship", type: "list" },
      { key: "skills", title: "Tools & Skills", type: "list" },
      { key: "domainExpertise", title: "Domain Expertise", type: "list" },
    ],
  },
  {
    id: "cma",
    title: "CMA (Cost Accountant)",
    description: "CMA students and qualified cost & management accountants.",
    icon: CalculateRoundedIcon,
    accent: "#d97706",
    gradient: "linear-gradient(135deg,#f59e0b 0%,#2563eb 100%)",
    extraSteps: [
      { key: "cmaMembership", title: "ICMAI Membership", type: "form" },
      { key: "training", title: "Practical Training", type: "list" },
      { key: "skills", title: "Tools & Skills", type: "list" },
    ],
  },
  {
    id: "it",
    title: "IT / Software",
    description: "Developers, designers, data and cloud professionals.",
    icon: TerminalRoundedIcon,
    accent: "#2563eb",
    gradient: "linear-gradient(135deg,#0ea5e9 0%,#7c3aed 100%)",
    extraSteps: [
      { key: "skills", title: "Skills", type: "list" },
      { key: "projects", title: "Projects", type: "list" },
    ],
  },
  {
    id: "teacher",
    title: "Teaching / Academia",
    description: "Teachers, professors and researchers.",
    icon: SchoolRoundedIcon,
    accent: "#db2777",
    gradient: "linear-gradient(135deg,#ec4899 0%,#3b82f6 100%)",
    extraSteps: [
      { key: "subjects", title: "Subjects Taught", type: "list" },
      { key: "research", title: "Research & Publications", type: "list" },
    ],
  },
  {
    id: "business",
    title: "Business / Management",
    description: "MBA, sales, marketing, HR and operations.",
    icon: BusinessCenterRoundedIcon,
    accent: "#0d9488",
    gradient: "linear-gradient(135deg,#14b8a6 0%,#1d4ed8 100%)",
    extraSteps: [
      { key: "skills", title: "Skills", type: "list" },
      { key: "projects", title: "Key Projects", type: "list" },
    ],
  },
];

/** Returns undefined for unknown / legacy ids (e.g. a previously stored "other"). */
export const getProfession = (id?: string | null) =>
  PROFESSIONS.find((p) => p.id === id);

/** Full ordered step list for a profession (common + specific) */
export const getStepsForProfession = (id?: string | null) => {
  const extra = getProfession(id)?.extraSteps ?? [];
  return [
    ...COMMON_STEPS_BEFORE,
    ...extra,
    ...COMMON_STEPS_AFTER,
    ...FINAL_STEPS,
  ];
};
