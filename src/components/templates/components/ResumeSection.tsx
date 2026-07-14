import { Box, Typography } from "@mui/material";
import type { ResumeDesignSettings } from "../../../types/candidate/resume.types";
import type { ResumeTemplateConfig } from "../../../types/resumeTemplate.types";

type Props = {
  title: string;
  sectionKey:
    | "summary"
    | "skills"
    | "experience"
    | "education"
    | "projects"
    | "certifications"
    | "achievements"
    | "languages"
    | "references";
  config: ResumeTemplateConfig;
  settings?: ResumeDesignSettings;
  children: React.ReactNode;
};

const ResumeSection = ({
  title,
  sectionKey,
  config,
  settings,
  children,
}: Props) => {
  const style = settings?.sectionTitleStyle ?? config.sectionTitleStyle;
  const sectionColor =
    settings?.sectionColors?.[sectionKey] ?? config.primaryColor;

  const spacing =
    settings?.spacing === "compact"
      ? 1.4
      : settings?.spacing === "comfortable"
        ? 3.2
        : 2.2;

  const titleFontSize = (settings?.fontSize ?? 12) + 1;

  return (
    <Box sx={{ mb: spacing }}>
      <Typography
        sx={{
          fontWeight: 900,
          color: sectionColor,
          mb: 0.8,
          fontSize: titleFontSize,
          pb: style === "line" ? 0.6 : 0,
          borderBottom: style === "line" ? `2px solid ${sectionColor}` : "none",
          textTransform: style === "uppercase" ? "uppercase" : "none",
          letterSpacing: style === "uppercase" ? 1 : 0,
          display: style === "pill" ? "inline-block" : "block",
          px: style === "pill" ? 1.4 : 0,
          py: style === "pill" ? 0.45 : 0,
          borderRadius: style === "pill" ? 99 : 0,
          bgcolor: style === "pill" ? `${sectionColor}18` : "transparent",
        }}
      >
        {settings?.showIcons ? "▪ " : ""}
        {title}
      </Typography>

      <Box sx={{ fontSize: settings?.fontSize ?? 12 }}>{children}</Box>
    </Box>
  );
};

export default ResumeSection;