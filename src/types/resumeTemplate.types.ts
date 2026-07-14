import type { ResumeData, ResumeDesignSettings, ResumeTemplateId, ResumeThemeColor } from "./candidate/resume.types";


export type TemplateCategory =
  | "ATS"
  | "Professional"
  | "Modern"
  | "Creative"
  | "Minimal"
  | "Sidebar"
  | "Two Column";

export type TemplateLayout = "oneColumn" | "twoColumn" | "sidebar";

export type ResumeTemplateConfig = {
  id: ResumeTemplateId;
  name: string;
  category: TemplateCategory;
  description: string;
  layout: TemplateLayout;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  headerStyle: "center" | "left" | "boxed" | "solid";
  sectionTitleStyle: "simple" | "line" | "pill" | "uppercase";
  fontFamily: string;
  borderRadius: number;
  showSidebar: boolean;
};

export type TemplateRenderProps = {
  data: ResumeData;
  config: ResumeTemplateConfig;
  themeColor?: ResumeThemeColor;
  settings?: ResumeDesignSettings;
};