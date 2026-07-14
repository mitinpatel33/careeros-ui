import type { ResumeThemeColor } from "../../types/candidate/resume.types";

export const getThemeColor = (color: ResumeThemeColor) => {
  const map: any = {
    blue: "#1976d2",
    black: "#111827",
    green: "#16a34a",
    purple: "#7c3aed",
  };

  return map[color];
};
