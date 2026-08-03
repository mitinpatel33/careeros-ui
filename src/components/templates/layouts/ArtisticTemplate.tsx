// ArtisticTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/**
 * Helper: returns a formatted date string "Mon YYYY" from a Date or ISO string.
 */
const formatDate = (date?: Date | string): string => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

/**
 * Helper: builds a duration string like "Jan 2020 – Present".
 */
const formatDuration = (
  startDate?: Date | string,
  endDate?: Date | string,
  isCurrent?: boolean
): string => {
  const start = formatDate(startDate);
  if (isCurrent || !endDate) return `${start} – Present`;
  const end = formatDate(endDate);
  return `${start} – ${end}`;
};

const ArtisticTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Choose a displayable website (portfolio > website > LinkedIn)
  const website = data.social?.portfolioUrl || data.social?.websiteUrl || data.social?.linkedInUrl || "";

  // Summary: prefer professionalSummary, fallback to careerObjective
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 5,
        bgcolor: "#fff9f2",
        border: "2px solid #e6cba0",
        borderRadius: "8px",
        boxShadow: "10px 10px 0 #f0dbc0",
        fontFamily: settings?.fontFamily ?? "Georgia, serif",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "'Brush Script MT', cursive",
          color: "#b5651d",
          textAlign: "center",
        }}
      >
        {fullName}
      </Typography>

      <Typography
        sx={{
          textAlign: "center",
          fontStyle: "italic",
          color: "#8b5a2b",
          mb: 3,
        }}
      >
        {data.personal?.jobTitle}
      </Typography>

      {/* Contact row: uses 'mobile' instead of 'phone' and social link */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          flexWrap: "wrap",
          mb: 3,
          color: "#6b4f3c",
        }}
      >
        {data.contact?.email && <span>📧 {data.contact.email}</span>}
        {data.contact?.mobile && <span>📞 {data.contact.mobile}</span>}
        {website && <span>🎨 {website}</span>}
      </Box>

      {/* About / Summary */}
      {summaryText && <Section title="About">{summaryText}</Section>}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <Section title="Exhibitions / Experience">
          {data.experience.map((exp, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold", color: "#8b5a2b" }}>
                {exp.designation || ""}
              </Typography>
              <Typography sx={{ color: "#b0987a" }}>
                {exp.companyName || ""}
                {exp.startDate
                  ? ` – ${formatDuration(exp.startDate, exp.endDate, exp.isCurrentCompany)}`
                  : ""}
              </Typography>
              {exp.description && <Typography>{exp.description}</Typography>}
            </Box>
          ))}
        </Section>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <Typography key={i}>
              {edu.degree || ""}
              {edu.instituteName ? `, ${edu.instituteName}` : ""}
              {edu.startDate
                ? `, ${formatDuration(edu.startDate, edu.endDate)}`
                : ""}
              {edu.grade ? ` (Grade: ${edu.grade})` : ""}
            </Typography>
          ))}
        </Section>
      )}

      {/* Skills as "Techniques" */}
      {data.skills && data.skills.length > 0 && (
        <Section title="Techniques">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {data.skills.map((skill, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#f7e8d0",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "10px",
                }}
              >
                {skill.skillName}
                {skill.proficiency ? ` (${skill.proficiency})` : ""}
              </Box>
            ))}
          </Box>
        </Section>
      )}
    </Paper>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="h6"
      sx={{
        fontFamily: "'Brush Script MT', cursive",
        fontSize: "1.8em",
        color: "#b5651d",
        borderBottom: "1px dotted #d9b382",
        pb: 0.5,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default ArtisticTemplate;