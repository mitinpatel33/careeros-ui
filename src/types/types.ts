import type { ResumeFormType } from "../validation/resume.validation";

export type ResumeThemeId =
  | "modern-ats"
  | "simple-ats"
  | "professional-ats"
  | "executive-ats"
  | "blue-corporate"
  | "black-executive"
  | "finance-professional"
  | "legal-professional"
  | "designer"
  | "marketing"
  | "ui-ux"
  | "creative-portfolio"
  | "developer-pro"
  | "engineer-pro"
  | "full-stack"
  | "devops"
  | "luxury-black"
  | "gold-executive"
  | "minimal-premium";

export type ThemeLayoutType =
  | "ats"
  | "corporate"
  | "creative"
  | "technical"
  | "premium";

export type ThemeConfig = {
  id: ResumeThemeId;
  name: string;
  layout: ThemeLayoutType;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
};

export type ThemeLayoutProps = {
  data: ResumeFormType;
  config: ThemeConfig;
};