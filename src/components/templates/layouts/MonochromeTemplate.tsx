// MonochromeTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

// Helper to format a date range like "Jan 2020 – Present" or "2018 – 2022"
const formatDateRange = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
): string => {
  const fmt = (d: Date | string | undefined) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })
      : "";
  const startStr = fmt(start);
  if (isCurrent || !end) return `${startStr} – Present`;
  return `${startStr} – ${fmt(end)}`;
};

// Helper to extract just the year from a date
const getYear = (d?: Date | string) =>
  d ? new Date(d).getFullYear().toString() : "";

const MonochromeTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName =
    `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Determine which summary text to show
  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 5,
        border: "2px solid #000",
        color: "#000",
        bgcolor: "#fff",
        fontFamily: "Arial, sans-serif",
        fontSize: settings?.fontSize ?? 12,
      }}
    >
      {/* Name */}
      <Typography
        variant="h3"
        sx={{
          textTransform: "uppercase",
          letterSpacing: 2,
          borderBottom: "4px solid #000",
          display: "inline-block",
          pb: 0.5,
        }}
      >
        {fullName}
      </Typography>

      {/* Job Title */}
      <Typography sx={{ mt: 1, mb: 3 }}>
        {data.personal?.jobTitle}
      </Typography>

      {/* Contact line */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3 }}>
        {data.contact?.email && <span>✉ {data.contact.email}</span>}
        {data.contact?.mobile && <span>📞 {data.contact.mobile}</span>}
        {data.contact?.city && <span>📍 {data.contact.city}</span>}
      </Box>

      {/* Professional Summary */}
      {summaryText && <Section title="Profile">{summaryText}</Section>}

      {/* Experience */}
      {data.experience?.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp, i) => {
            const duration = formatDateRange(
              exp.startDate,
              exp.endDate,
              exp.isCurrentCompany
            );
            return (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {exp.designation} – {exp.companyName}
                </Typography>
                <Typography sx={{ fontSize: "0.9em" }}>{duration}</Typography>
                {exp.description && <Typography>{exp.description}</Typography>}
              </Box>
            );
          })}
        </Section>
      )}

      {/* Education */}
      {data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => {
            const yearRange = `${getYear(edu.startDate)} – ${getYear(edu.endDate) || "Present"}`;
            return (
              <Typography key={i}>
                <strong>{edu.degree}</strong> – {edu.instituteName}
                {yearRange !== " – " && `, ${yearRange}`}
              </Typography>
            );
          })}
        </Section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <Section title="Skills">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {data.skills.map((skill, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#edf2f7",
                  px: 2,
                  py: 0.5,
                  borderRadius: "20px",
                  display: "inline-block",
                }}
              >
                {skill.skillName}
                {skill.proficiency && skill.proficiency !== "Intermediate"
                  ? ` (${skill.proficiency})`
                  : ""}
              </Box>
            ))}
          </Box>
        </Section>
      )}
    </Paper>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="h6"
      sx={{
        textTransform: "uppercase",
        borderBottom: "1px solid #000",
        pb: 0.5,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default MonochromeTemplate;