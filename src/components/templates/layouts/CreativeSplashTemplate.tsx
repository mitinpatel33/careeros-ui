// CreativeSplashTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

// Helper: format a Date or string to "Mon YYYY"
const fmtDate = (d?: Date | string) =>
  d ? new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" }) : "";

// Helper: build date range string
const dateRange = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
) => {
  const s = fmtDate(start);
  if (isCurrent || !end) return `${s} – Present`;
  return `${s} – ${fmtDate(end)}`;
};

const CreativeSplashTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Extract website from social info
  const website = data.social?.portfolioUrl || data.social?.websiteUrl || "";

  // Build contact line
  const contactParts = [
    data.contact?.email,
    data.contact?.mobile,
    website,
  ].filter(Boolean);

  // Summary: prefer professionalSummary, fallback to careerObjective
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        borderRadius: "20px",
        overflow: "hidden",
        fontFamily: settings?.fontFamily ?? "Segoe UI",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Splash Header */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
          color: "#fff",
          p: 5,
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: 800 }}>
          {fullName}
        </Typography>
        <Typography sx={{ fontSize: "1.3em", opacity: 0.9 }}>
          {data.personal?.jobTitle}
        </Typography>
        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 2 }}>
          {contactParts.map((part, i) => (
            <span key={i}>
              {i === 0 ? "📧 " : i === 1 ? "📞 " : "🌐 "}
              {part}
            </span>
          ))}
        </Box>
      </Box>

      {/* Main Content Grid */}
      <Box
        sx={{
          p: 4,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 4,
        }}
      >
        {/* Left Column */}
        <Box>
          {summaryText && <Section title="About">{summaryText}</Section>}

          {data.skills && data.skills?.length > 0 && (
            <Section title="Skills">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.skills.map((skill, i) => (
                  <Box
                    key={i}
                    sx={{
                      bgcolor: "#6c5ce7",
                      color: "#fff",
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
        </Box>

        {/* Right Column */}
        <Box>
          {data.experience && data.experience?.length > 0 && (
            <Section title="Experience">
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {exp.designation}
                    {exp.companyName ? ` – ${exp.companyName}` : ""}
                  </Typography>
                  <Typography sx={{ color: "#888", fontSize: "0.85em" }}>
                    {dateRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                  {exp.description && <Typography>{exp.description}</Typography>}
                </Box>
              ))}
            </Section>
          )}

          {data.education && data.education?.length > 0 && (
            <Section title="Education">
              {data.education.map((edu, i) => (
                <Typography key={i}>
                  <strong>{edu.degree}</strong>
                  {edu.instituteName ? `, ${edu.instituteName}` : ""}
                  {edu.startDate || edu.endDate
                    ? `, ${dateRange(edu.startDate, edu.endDate)}`
                    : ""}
                </Typography>
              ))}
            </Section>
          )}
        </Box>
      </Box>

      {/* Additional Sections (optional, at the bottom) */}
      <Box sx={{ px: 4, pb: 4 }}>
        {data.projects && data.projects?.length > 0 && (
          <Section title="Projects">
            {data.projects.map((proj, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {proj.projectName}
                  {proj.role ? ` – ${proj.role}` : ""}
                </Typography>
                {proj.technologies?.length ? (
                  <Typography sx={{ color: "#888", fontSize: "0.85em" }}>
                    {proj.technologies.join(", ")}
                  </Typography>
                ) : null}
                {proj.description && <Typography>{proj.description}</Typography>}
              </Box>
            ))}
          </Section>
        )}

        {data.certifications && data.certifications?.length > 0 && (
          <Section title="Certifications">
            {data.certifications.map((cert, i) => (
              <Typography key={i}>
                <strong>{cert.certificateName}</strong>
                {cert.issuedBy ? ` – ${cert.issuedBy}` : ""}
                {cert.issuedDate ? ` (${fmtDate(cert.issuedDate)})` : ""}
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
                {lang.proficiencyLevel ? ` (${lang.proficiencyLevel})` : ""}
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
      sx={{
        color: "#6c5ce7",
        borderBottom: "2px solid #dfe6e9",
        pb: 0.5,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default CreativeSplashTemplate;