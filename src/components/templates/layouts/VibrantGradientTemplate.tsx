// VibrantGradientTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

// Helper to format date ranges like "Jan 2020 – Present" or "2020 – 2022"
const formatDateRange = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
): string => {
  if (!start && !end) return "";
  const fmt = (d?: Date | string) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        })
      : "";
  const startStr = fmt(start);
  if (isCurrent || !end) return `${startStr} – Present`;
  const endStr = fmt(end);
  return `${startStr} – ${endStr}`;
};

const VibrantGradientTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Pick a website from social links
  const website =
    data.social?.portfolioUrl ||
    data.social?.websiteUrl ||
    data.social?.linkedInUrl ||
    "";

  // Summary string: prefer professional summary, fallback to career objective
  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        borderRadius: "20px",
        overflow: "hidden",
        fontFamily: settings?.fontFamily ?? "Poppins, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #ff6b6b, #feca57)",
          color: "#fff",
          p: 5,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          {fullName}
        </Typography>
        <Typography sx={{ opacity: 0.9 }}>
          {data.personal?.jobTitle}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mt: 2 }}>
          <span>📧 {data.contact?.email}</span>
          <span>📞 {data.contact?.mobile}</span>
          {website && <span>🌐 {website}</span>}
        </Box>
      </Box>

      {/* Two-column body */}
      <Box sx={{ p: 4, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        <Box>
          {summaryText && <Section title="About Me">{summaryText}</Section>}

          {data.skills && data.skills.length > 0 && (
            <Section title="Skills">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.skills.map((skill, i) => (
                  <Box
                    key={i}
                    sx={{
                      bgcolor: "#fff5f5",
                      color: "#ff6b6b",
                      border: "1px solid #ff6b6b",
                      borderRadius: "15px",
                      px: 1.5,
                      py: 0.5,
                      fontSize: "0.85em",
                      display: "flex",
                      alignItems: "center",
                      gap: 0.5,
                    }}
                  >
                    {skill.skillName}
                    {skill.proficiency && skill.proficiency !== "Intermediate" && (
                      <Typography
                        component="span"
                        sx={{ fontSize: "0.7em", opacity: 0.7 }}
                      >
                        ({skill.proficiency})
                      </Typography>
                    )}
                  </Box>
                ))}
              </Box>
            </Section>
          )}

          {data.projects && data.projects.length > 0 && (
            <Section title="Projects">
              {data.projects.map((proj, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {proj.projectName}
                  </Typography>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <Typography
                      sx={{ color: "#888", fontSize: "0.85em" }}
                    >
                      {proj.technologies.join(", ")}
                    </Typography>
                  )}
                  <Typography>{proj.description}</Typography>
                </Box>
              ))}
            </Section>
          )}
        </Box>

        <Box>
          {data.experience && data.experience.length > 0 && (
            <Section title="Experience">
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {exp.designation} – {exp.companyName}
                  </Typography>
                  <Typography sx={{ color: "#888", fontSize: "0.85em" }}>
                    {formatDateRange(
                      exp.startDate,
                      exp.endDate,
                      exp.isCurrentCompany
                    )}
                  </Typography>
                  <Typography>{exp.description}</Typography>
                </Box>
              ))}
            </Section>
          )}

          {data.education && data.education.length > 0 && (
            <Section title="Education">
              {data.education.map((edu, i) => (
                <Typography key={i}>
                  <strong>{edu.degree}</strong> – {edu.instituteName},{" "}
                  {formatDateRange(edu.startDate, edu.endDate)}
                </Typography>
              ))}
            </Section>
          )}

          {data.certifications && data.certifications.length > 0 && (
            <Section title="Certifications">
              {data.certifications.map((cert, i) => (
                <Typography key={i}>
                  <strong>{cert.certificateName}</strong> – {cert.issuedBy}
                  {cert.issuedDate
                    ? ` (${new Date(cert.issuedDate).getFullYear()})`
                    : ""}
                </Typography>
              ))}
            </Section>
          )}

          {data.languages && data.languages.length > 0 && (
            <Section title="Languages">
              {data.languages.map((lang, i) => (
                <Typography key={i}>
                  {lang.languageName} – {lang.proficiencyLevel}
                </Typography>
              ))}
            </Section>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

// Reusable Section component
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="subtitle1"
      sx={{ color: "#ff6b6b", fontWeight: 600, mb: 1 }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default VibrantGradientTemplate;