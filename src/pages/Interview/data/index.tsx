import {
  Psychology,
  Quiz,
  Code,
  CheckCircle,
  TipsAndUpdates,
  DataObject,
  Gavel,
  School,
  MenuBook,
  LocalHospital,
  BusinessCenter,
  Work,
} from "@mui/icons-material";
import type { ReactNode } from "react";

export interface StatCard {
  key: "totalJobTitles" | "totalQuestions" | "totalMockTests" | "successRate";
  label: string;
  caption: string;
  icon: ReactNode;
  color: string;
}
export interface FeatureItem {
  icon: ReactNode;
  title: string;
  sub: string;
}

/** Category `icon` key (stored in DB) -> MUI icon. Add keys as you add categories. */
const categoryIcons: Record<string, ReactNode> = {
  code: <Code />,
  law: <Gavel />,
  school: <School />,
  college: <MenuBook />,
  medical: <LocalHospital />,
  business: <BusinessCenter />,
};

export const getJobVisual = (category?: { icon?: string; color?: string }) => ({
  icon: categoryIcons[category?.icon ?? ""] ?? <Work />,
  color: category?.color ?? "#315eff",
});

const skillPalette = [
  "#d4a900", "#18bde8", "#20a64a", "#65748b", "#269c54", "#6536cf",
  "#2875df", "#1386d7", "#f04b3a", "#e59b13", "#8b4de8",
];

/** Skills/subjects are dynamic, so derive the badge from the name. */
export const getSkillVisual = (name: string) => {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return {
    symbol: name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase() || "•",
    color: skillPalette[hash % skillPalette.length],
  };
};

export const statCards: StatCard[] = [
  { key: "totalJobTitles", label: "Roles & Courses", caption: "Jobs, courses & study levels", icon: <Psychology />, color: "#8b4de8" },
  { key: "totalQuestions", label: "Total Questions", caption: "Practice-ready questions", icon: <Quiz />, color: "#3475f6" },
  { key: "totalMockTests", label: "Mock Tests", caption: "Role & topic-wise tests", icon: <CheckCircle />, color: "#7955e9" },
  { key: "successRate", label: "Success Rate", caption: "Better preparation", icon: <TipsAndUpdates />, color: "#f59e0b" },
];

export const heroFeatures: FeatureItem[] = [
  { icon: <Quiz />, title: "Role Based", sub: "Questions & Answers" },
  { icon: <Psychology />, title: "Mock Test", sub: "Real Scenarios" },
  { icon: <DataObject />, title: "Topic Wise", sub: "Practice" },
  { icon: <TipsAndUpdates />, title: "Instant AI Feedback", sub: "& Improvement Tips" },
];

export const mockLevels = [
  { name: "Basic", color: "#12b981", bg: "#ecfdf6" },
  { name: "Intermediate", color: "#3475f6", bg: "#eef5ff" },
  { name: "Advanced", color: "#8b4de8", bg: "#f7f0ff" },
];