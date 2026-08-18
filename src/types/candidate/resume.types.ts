export type ResumeFontFamily =
  | "Inter"
  | "Roboto"
  | "Poppins"
  | "Arial"
  | "Montserrat"
  | "Lato";

export type ResumeSpacing = "compact" | "normal" | "comfortable";
export type SectionTitleStyle =
  | "simple"
  | "line"
  | "pill"
  | "uppercase"
  | "filled";
export type HeaderAlign = "left" | "center" | "right";

export type BulletStyle =
  | "dot"
  | "square"
  | "dash"
  | "arrow"
  | "check"
  | "none";
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
  | "classicBlueTemplate"
  | "elegantClassicTemplate"
  | "financialProfileTemplate"
  | "classicElegant"
  | "modernMinimal"
  | "sidebarPhoto"
  | "skillBars"
  | "timeline"
  | "creativeSplash"
  | "darkMode"
  | "infographic"
  | "academic"
  | "artistic"
  | "futuristicGradient"
  | "vintage"
  | "minimalDots"
  | "corporate"
  | "vibrantGradient"
  | "monochrome"
  | "asymmetric"
  | "cleanIcons"
  | "navySidebarReferenceTemplate"
  | "darkPatternSidebarTemplate"
  | "maroonMinimalTemplate"
  | "compactBlueTemplate"
  | "creamCoralTemplate"
  | "greenExecutiveTemplate"
  | "oliveAttorneyTemplate"
  | "mauveSidebarTemplate"
  | "blackBlueBannerTemplate"
  | "navyTimelineTemplate"
  | "greenDiamondTemplate"
  | "yellowNavyTimelineTemplate"
  | "tealGoldRibbonTemplate";

export type ResumeThemeColor = "blue" | "black" | "green" | "purple" | "orange";

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
  // From candidatePersonalInfo schema
  personal?: {
    firstName?: string;
    lastName?: string;
    jobTitle?: string;
    dateOfBirth?: Date | string; // can be Date object or ISO string
    gender?: string;
    maritalStatus?: string;
    nationality?: string;
    photoUrl?: string;
  };

  // From candidateContactInfo schema
  contact?: {
    email?: string;
    mobile?: string;
    alternateMobile?: string;
    address?: string;
    city?: string;
    state?: string;
    country?: string;
    pincode?: string;
  };

  // From candidateSocialInfo schema
  social?: {
    linkedInUrl?: string;
    gitHubUrl?: string;
    portfolioUrl?: string;
    websiteUrl?: string;
  };

  // From candidateSummary schema (can be merged into a string later)
  summary: {
    professionalSummary?: string;
    careerObjective?: string;
  };

  // From candidateSkill schema (array of objects, not just strings)
  skills?: {
    skillName: string;
    proficiency?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
    experienceInYears?: number;
  }[];

  // From candidateExperience schema
  experience?: {
    companyName?: string;
    designation?: string;
    employmentType?: string;
    location?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    isCurrentCompany?: boolean;
    description?: string;
  }[];

  // From candidateEducation schema
  education?: {
    instituteName?: string;
    degree?: string;
    fieldOfStudy?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    percentage?: number;
    grade?: string;
    description?: string;
  }[];

  // From candidateProject schema
  projects?: {
    projectName?: string;
    role?: string;
    description?: string;
    technologies?: string[];
    projectUrl?: string;
  }[];

  // From candidateCertificate schema
  certifications?: {
    certificateName?: string;
    issuedBy?: string;
    issuedDate?: Date | string;
    credentialId?: string;
    credentialUrl?: string;
  }[];

  // From candidateAchievement schema
  achievements?: {
    title?: string;
    description?: string;
    achievementDate?: Date | string;
  }[];

  // From candidateLanguage schema
  languages?: {
    languageName?: string;
    proficiencyLevel?: "Basic" | "Intermediate" | "Professional" | "Native";
  }[];
};

export type ResumeSectionRequest = {
  userId?: string;
  sections: ResumeSectionKey[];
};
