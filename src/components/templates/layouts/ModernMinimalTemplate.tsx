// ModernMinimalTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/** Format a date or ISO string to "Mon YYYY" */
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

const ModernMinimalTemplate = ({ data, config, settings }: TemplateRenderProps) => {
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
        p: 5,
        bgcolor: "#fff",
        fontFamily: settings?.fontFamily ?? "Segoe UI, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `3px solid ${config.primaryColor}`,
          pb: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            {fullName}
          </Typography>
          <Typography sx={{ color: config.primaryColor }}>
            {data.personal?.jobTitle}
          </Typography>
        </Box>
        <Box sx={{ color: "#555", textAlign: "right" }}>
          {data.contact?.email && <div>📧 {data.contact.email}</div>}
          {data.contact?.mobile && <div>📱 {data.contact.mobile}</div>}
          {data.contact?.city && <div>📍 {data.contact.city}</div>}
        </Box>
      </Box>

      {/* Two‑column content */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {/* Left column */}
        <Box>
          {summaryText && <Section title="Profile">{summaryText}</Section>}

          {data.experience && data.experience?.length > 0 && (
            <Section title="Experience">
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {exp.designation}
                    {exp.companyName ? ` – ${exp.companyName}` : ""}
                  </Typography>
                  <Typography sx={{ color: "#666", fontSize: "0.9em" }}>
                    {formatRange(
                      exp.startDate,
                      exp.endDate,
                      exp.isCurrentCompany
                    )}
                    {exp.employmentType
                      ? ` (${exp.employmentType})`
                      : ""}
                  </Typography>
                  {exp.description && (
                    <Typography>{exp.description}</Typography>
                  )}
                </Box>
              ))}
            </Section>
          )}

          {data.projects && data.projects?.length > 0 && (
            <Section title="Projects">
              {data.projects.map((proj, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {proj.projectName}
                  </Typography>
                  {proj.technologies && proj.technologies?.length > 0 && (
                    <Typography
                      sx={{ color: "#666", fontSize: "0.9em" }}
                    >
                      {proj.technologies.join(", ")}
                    </Typography>
                  )}
                  {proj.description && (
                    <Typography>{proj.description}</Typography>
                  )}
                </Box>
              ))}
            </Section>
          )}
        </Box>

        {/* Right column */}
        <Box>
          {data.education && data.education?.length > 0 && (
            <Section title="Education">
              {data.education.map((edu, i) => (
                <Typography key={i}>
                  <strong>{edu.degree}</strong>
                  <br />
                  {edu.instituteName}
                  {(edu.startDate || edu.endDate) &&
                    `, ${formatRange(edu.startDate, edu.endDate)}`}
                  {edu.grade ? ` | Grade: ${edu.grade}` : ""}
                </Typography>
              ))}
            </Section>
          )}

          {data.skills && data.skills?.length > 0 && (
            <Section title="Skills">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.skills.map((skill, i) => (
                  <Box
                    key={i}
                    sx={{
                      bgcolor: `${config.primaryColor}15`,
                      color: config.primaryColor,
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "20px",
                      fontSize: "0.85em",
                    }}
                  >
                    {skill.skillName}
                    {skill.proficiency ? ` (${skill.proficiency})` : ""}
                  </Box>
                ))}
              </Box>
            </Section>
          )}

          {data.certifications && data.certifications?.length > 0 && (
            <Section title="Certifications">
              {data.certifications.map((cert, i) => (
                <Typography key={i}>
                  <strong>{cert.certificateName}</strong>
                  {cert.issuedBy ? ` – ${cert.issuedBy}` : ""}
                  {cert.issuedDate
                    ? ` (${formatDate(cert.issuedDate)})`
                    : ""}
                </Typography>
              ))}
            </Section>
          )}

          {data.achievements && data.achievements?.length > 0 && (
            <Section title="Achievements">
              {data.achievements.map((ach, i) => (
                <Typography key={i}>
                  • {ach.title}
                  {ach.description ? ` – ${ach.description}` : ""}
                </Typography>
              ))}
            </Section>
          )}

          {data.languages && data.languages?.length > 0 && (
            <Section title="Languages">
              {data.languages.map((lang, i) => (
                <Typography key={i}>
                  {lang.languageName}
                  {lang.proficiencyLevel
                    ? ` – ${lang.proficiencyLevel}`
                    : ""}
                </Typography>
              ))}
            </Section>
          )}

          {data.social && (
            <Section title="Links">
              {data.social.linkedInUrl && (
                <Typography>🔗 {data.social.linkedInUrl}</Typography>
              )}
              {data.social.gitHubUrl && (
                <Typography>💻 {data.social.gitHubUrl}</Typography>
              )}
              {data.social.portfolioUrl && (
                <Typography>🎨 {data.social.portfolioUrl}</Typography>
              )}
            </Section>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

/** Reusable Section component */
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: 0.5,
        color: "inherit",
        borderBottom: "1px solid #e2e8f0",
        pb: 0.5,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default ModernMinimalTemplate;