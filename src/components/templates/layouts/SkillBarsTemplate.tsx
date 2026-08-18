// SkillBarsTemplate.tsx
import { Box, Typography, Paper, LinearProgress } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/**
 * Converts a proficiency string into a percentage for the progress bar.
 * If proficiency is missing but experienceInYears is available, we can
 * use a fallback calculation (optional).
 */
const proficiencyToPercent = (
  proficiency?: string,
  experienceInYears?: number
): number => {
  if (proficiency) {
    switch (proficiency) {
      case "Beginner":
        return 25;
      case "Intermediate":
        return 50;
      case "Advanced":
        return 75;
      case "Expert":
        return 100;
      default:
        return 50;
    }
  }
  // Fallback: use years, capped at 10 years = 100%
  if (experienceInYears !== undefined) {
    return Math.min(Math.round((experienceInYears / 10) * 100), 100);
  }
  return 50;
};

/** Format a Date or string into "Mon YYYY" */
const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

/** Format date range */
const formatDuration = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
) => {
  const startStr = formatDate(start);
  if (isCurrent || !end) return `${startStr} – Present`;
  return `${startStr} – ${formatDate(end)}`;
};

const SkillBarsTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Map skills to bar data
  const skillBars = (data.skills ?? []).map((skill) => ({
    name: skill.skillName,
    level: proficiencyToPercent(skill.proficiency, skill.experienceInYears),
  }));

  // Summary text
  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: 4,
        p: 4,
        bgcolor: "#fafafa",
        fontFamily: settings?.fontFamily ?? "Trebuchet MS",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Left column: personal info + skill bars */}
      <Box>
        <Typography variant="h5">{fullName}</Typography>
        <Typography sx={{ color: "#e17055", fontWeight: "bold", mb: 3 }}>
          {data.personal?.jobTitle}
        </Typography>

        {data.contact?.email && (
          <Typography>📧 {data.contact.email}</Typography>
        )}
        {data.contact?.mobile && (
          <Typography>📞 {data.contact.mobile}</Typography>
        )}
        {data.contact?.city && (
          <Typography>📍 {data.contact.city}</Typography>
        )}

        {skillBars.length > 0 && (
          <>
            <Typography
              variant="subtitle2"
              sx={{ bgcolor: "#dfe6e9", px: 1, py: 0.5, mt: 3, mb: 1 }}
            >
              Technical Skills
            </Typography>
            {skillBars.map((skill, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.9em",
                  }}
                >
                  <span>{skill.name}</span>
                  <span>{Math.round(skill.level)}%</span>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={skill.level}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#dfe6e9",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#e17055",
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>
            ))}
          </>
        )}
      </Box>

      {/* Right column: summary, experience, education */}
      <Box>
        {summaryText && <Section title="Summary">{summaryText}</Section>}

        {data.experience && data.experience?.length > 0 && (
          <Section title="Experience">
            {data.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {exp.designation}
                  {exp.companyName ? ` – ${exp.companyName}` : ""}
                </Typography>
                <Typography sx={{ color: "#e17055", fontSize: "0.9em" }}>
                  {formatDuration(
                    exp.startDate,
                    exp.endDate,
                    exp.isCurrentCompany
                  )}
                </Typography>
                {exp.description && (
                  <Typography>{exp.description}</Typography>
                )}
              </Box>
            ))}
          </Section>
        )}

        {data.education && data.education?.length > 0 && (
          <Section title="Education">
            {data.education.map((edu, i) => (
              <Typography key={i}>
                <strong>{edu.degree}</strong>
                {edu.instituteName ? ` – ${edu.instituteName}` : ""}
                {edu.startDate || edu.endDate
                  ? `, ${formatDuration(edu.startDate, edu.endDate)}`
                  : ""}
                {edu.grade ? ` | Grade: ${edu.grade}` : ""}
              </Typography>
            ))}
          </Section>
        )}
      </Box>
    </Paper>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="h6"
      sx={{ borderBottom: `2px solid #e17055`, pb: 0.5, mb: 1 }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default SkillBarsTemplate;