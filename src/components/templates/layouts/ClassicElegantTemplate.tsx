// ClassicElegantTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/** Format a date to "Mon YYYY" */
const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

/** Format a date range (start – end) */
const formatRange = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
) => {
  const startStr = formatDate(start);
  if (isCurrent || !end) return `${startStr} – Present`;
  return `${startStr} – ${formatDate(end)}`;
};

const ClassicElegantTemplate = ({
  data,
  settings,
}: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Summary – use professionalSummary, fallback to careerObjective
  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 6,
        bgcolor: "#fff",
        fontFamily: settings?.fontFamily ?? "Georgia, serif",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
      }}
    >
      <Typography
        variant="h3"
        sx={{ letterSpacing: 2, borderBottom: "2px solid #b8860b", pb: 1 }}
      >
        {fullName}
      </Typography>
      <Typography sx={{ color: "#b8860b", fontStyle: "italic", mb: 3 }}>
        {data.personal?.jobTitle}
      </Typography>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 4, color: "#555" }}>
        {data.contact?.email && <span>✉ {data.contact.email}</span>}
        {data.contact?.mobile && <span>📞 {data.contact.mobile}</span>}
        {data.contact?.city && <span>📍 {data.contact.city}</span>}
      </Box>

      {summaryText && <Section title="Summary">{summaryText}</Section>}

      {data.experience && data.experience?.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {exp.designation}
                {exp.companyName ? ` – ${exp.companyName}` : ""}
              </Typography>
              <Typography sx={{ fontStyle: "italic", color: "#666" }}>
                {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                {exp.employmentType ? ` (${exp.employmentType})` : ""}
              </Typography>
              {exp.description && <Typography>{exp.description}</Typography>}
            </Box>
          ))}
        </Section>
      )}

      {data.education && data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <Box key={i} sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {edu.degree}
              </Typography>
              <Typography>
                {edu.instituteName}
                {(edu.startDate || edu.endDate) &&
                  `, ${formatRange(edu.startDate, edu.endDate)}`}
                {edu.grade ? ` | Grade: ${edu.grade}` : ""}
              </Typography>
            </Box>
          ))}
        </Section>
      )}

      {data.skills && data.skills?.length > 0 && (
        <Section title="Skills">
          <Typography>
            {data.skills
              .map((skill) =>
                skill.skillName +
                (skill.proficiency ? ` (${skill.proficiency})` : "")
              )
              .join(" • ")}
          </Typography>
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
        borderBottom: "1px solid #ddd",
        pb: 0.5,
        color: "#b8860b",
        textTransform: "uppercase",
        letterSpacing: 1,
      }}
    >
      {title}
    </Typography>
    <Box sx={{ mt: 1 }}>{children}</Box>
  </Box>
);

export default ClassicElegantTemplate;