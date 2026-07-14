import {
  Person,
  ContactMail,
  Notes,
  Code,
  Work,
  School,
  Folder,
  WorkspacePremium,
  EmojiEvents,
  Language,
  Groups,
} from "@mui/icons-material";
import type { SvgIconComponent } from "@mui/icons-material";
import type { ResumeSectionKey } from "../types/candidate/resume.types";

export const resumeSections: {
  key: ResumeSectionKey;
  label: string;
  description: string;
  icon: SvgIconComponent;
  required?: boolean;
}[] = [
  {
    key: "personal",
    label: "Personal Details",
    description: "Name, job title and location",
    icon: Person,
    required: true,
  },
  {
    key: "contact",
    label: "Contact Info",
    description: "Email, phone and links",
    icon: ContactMail,
    required: true,
  },
  {
    key: "summary",
    label: "Summary",
    description: "Professional introduction",
    icon: Notes,
  },
  {
    key: "skills",
    label: "Skills",
    description: "Technical and soft skills",
    icon: Code,
  },
  {
    key: "experience",
    label: "Experience",
    description: "Work experience",
    icon: Work,
  },
  {
    key: "education",
    label: "Education",
    description: "Degree and university",
    icon: School,
  },
  {
    key: "projects",
    label: "Projects",
    description: "Project and tech stack",
    icon: Folder,
  },
  {
    key: "certifications",
    label: "Certifications",
    description: "Certificates",
    icon: WorkspacePremium,
  },
  {
    key: "achievements",
    label: "Achievements",
    description: "Awards and achievements",
    icon: EmojiEvents,
  },
  {
    key: "languages",
    label: "Languages",
    description: "Known languages",
    icon: Language,
  },
  {
    key: "references",
    label: "References",
    description: "Reference contacts",
    icon: Groups,
  },
];
