export type ResumeFontFamily =
  | "Inter"
  | "Roboto"
  | "Poppins"
  | "Arial"
  | "Montserrat"
  | "Lato";

export type ResumeSpacing = "compact" | "normal" | "comfortable";
export type SectionTitleStyle = "simple" | "line" | "pill" | "uppercase" | "filled";
export type HeaderAlign = "left" | "center" | "right";

export type BulletStyle = "dot" | "square" | "dash" | "arrow" | "check" | "none";
export type TextAlignStyle = "left" | "center" | "right" | "justify";

export type ResumeDesignSettings = {
  themeColor: string;
  accentColor: string;
  backgroundColor: string;
  paperColor: string;

  fontFamily: ResumeFontFamily;
  fontSize: number;
  headingSize: number;
  lineHeight: number;
  letterSpacing: number;

  spacing: ResumeSpacing;
  sectionGap: number;
  pagePadding: number;
  borderRadius: number;

  sectionTitleStyle: SectionTitleStyle;
  headerAlign: HeaderAlign;
  showIcons: boolean;

  header: {
    nameBold: boolean;
    nameItalic: boolean;
    nameUnderline: boolean;
    jobTitleBold: boolean;
    showDivider: boolean;
    showContactIcons: boolean;
    uppercaseName: boolean;
  };

  content: {
    bulletStyle: BulletStyle;
    bulletColor: string;
    textAlign: TextAlignStyle;
    descriptionBold: boolean;
    descriptionItalic: boolean;
    descriptionUnderline: boolean;
    showTimeline: boolean;
    chipStyle: "filled" | "outlined" | "soft";
  };

  sectionColors: Record<
    | "summary"
    | "skills"
    | "experience"
    | "education"
    | "projects"
    | "certifications"
    | "achievements"
    | "languages"
    | "references",
    string
  >;
};

export const defaultResumeSettings: ResumeDesignSettings = {
  themeColor: "#1976d2",
  accentColor: "#0f172a",
  backgroundColor: "#ffffff",
  paperColor: "#ffffff",

  fontFamily: "Inter",
  fontSize: 12,
  headingSize: 28,
  lineHeight: 1.45,
  letterSpacing: 0,

  spacing: "normal",
  sectionGap: 2.2,
  pagePadding: 4,
  borderRadius: 0,

  sectionTitleStyle: "line",
  headerAlign: "left",
  showIcons: true,

  header: {
    nameBold: true,
    nameItalic: false,
    nameUnderline: false,
    jobTitleBold: true,
    showDivider: true,
    showContactIcons: true,
    uppercaseName: false,
  },

  content: {
    bulletStyle: "dot",
    bulletColor: "#1976d2",
    textAlign: "left",
    descriptionBold: false,
    descriptionItalic: false,
    descriptionUnderline: false,
    showTimeline: true,
    chipStyle: "soft",
  },

  sectionColors: {
    summary: "#1976d2",
    skills: "#1976d2",
    experience: "#1976d2",
    education: "#1976d2",
    projects: "#1976d2",
    certifications: "#1976d2",
    achievements: "#1976d2",
    languages: "#1976d2",
    references: "#1976d2",
  },
};

export type ResumeTemplateId =
  | "atsClassic"
  | "atsModern"
  | "atsCompact"
  | "blueProfessional"
  | "blackExecutive"
  | "corporate"
  | "business"
  | "modernBlue"
  | "modernPurple"
  | "modernGradient"
  | "elegant"
  | "creativeOne"
  | "designer"
  | "marketing"
  | "minimal"
  | "minimalDark"
  | "clean"
  | "sidebarBlue"
  | "sidebarBlack"
  | "sidebarPurple"
  | "twoColumnOne"
  | "splitResume";

  export type ResumeThemeColor =
  | "blue"
  | "black"
  | "green"
  | "purple"
  | "orange";

  export type ResumeSectionKey =
  | "personal"
  | "contact"
  | "summary"
  | "skills"
  | "experience"
  | "education"
  | "projects"
  | "certifications"
  | "achievements"
  | "languages"
  | "references";

  export type ResumeData = {
  personal?: {
    fullName: string;
    jobTitle: string;
    location?: string;
  };

  contact?: {
    email?: string;
    phone?: string;
    linkedIn?: string;
    github?: string;
    portfolio?: string;
  };

  summary?: string;

  skills?: string[];

  experience?: {
    companyName: string;
    designation: string;
    duration: string;
    description: string;
  }[];

  education?: {
    degree: string;
    university: string;
    year: string;
    grade?: string;
  }[];

  projects?: {
    title: string;
    techStack: string;
    description: string;
  }[];

  certifications?: string[];

  achievements?: string[];

  languages?: string[];

  references?: {
    name: string;
    company: string;
    email?: string;
    phone?: string;
  }[];
};


export type ResumeSectionRequest = {
  userId?: string;
  sections: ResumeSectionKey[];
};