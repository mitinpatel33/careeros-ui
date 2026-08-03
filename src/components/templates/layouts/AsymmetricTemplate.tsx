// AsymmetricTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

// Helper: format start/end date into a readable duration
function formatDuration(start?: Date | string, end?: Date | string, isCurrent?: boolean): string {
  const s = start ? new Date(start) : null;
  const e = end ? new Date(end) : null;
  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { year: "numeric", month: "short" });

  if (!s) return "";
  if (isCurrent || !e) return `${fmt(s)} – Present`;
  return `${fmt(s)} – ${fmt(e)}`;
}

// Helper: format education start/end into a year string
function formatEducationYear(start?: Date | string, end?: Date | string): string {
  const s = start ? new Date(start).getFullYear() : "";
  const e = end ? new Date(end).getFullYear() : "Present";
  if (!s) return e.toString();
  return `${s} – ${e}`;
}

const AsymmetricTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gridTemplateRows: "auto auto",
        boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
        fontFamily: settings?.fontFamily ?? "Trebuchet MS",
        fontSize: settings?.fontSize ?? 12,
      }}
    >
      {/* Left column - main content */}
      <Box sx={{ p: 4, gridColumn: 1 }}>
        <Typography variant="h3" sx={{ lineHeight: 1 }}>
          <Box
            component="span"
            sx={{
              transform: "rotate(-2deg)",
              bgcolor: "#ff6f61",
              color: "#fff",
              px: 1,
              display: "inline-block",
            }}
          >
            {fullName}
          </Box>
        </Typography>
        <Typography sx={{ fontSize: "1.1em", mb: 2 }}>
          {data.personal?.jobTitle}
        </Typography>
        <Box sx={{ mb: 3 }}>
          📧 {data.contact?.email}
          {data.contact?.mobile && <> | 📞 {data.contact.mobile}</>}
          {data.contact?.city && <> | 📍 {data.contact.city}</>}
        </Box>

        {/* Summary (if present) */}
        {data.summary?.professionalSummary && (
          <Section title="Summary">{data.summary.professionalSummary}</Section>
        )}

        {/* Experience – now using schema fields */}
        {data.experience?.length > 0 && (
          <Section title="Experience">
            {data.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {exp.designation} – {exp.companyName}
                </Typography>
                <Typography sx={{ color: "#666", fontSize: "0.85em" }}>
                  {formatDuration(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                </Typography>
                <Typography>{exp.description}</Typography>
              </Box>
            ))}
          </Section>
        )}

        {/* Education – using instituteName and date range */}
        {data.education?.length > 0 && (
          <Section title="Education">
            {data.education.map((edu, i) => (
              <Typography key={i}>
                <strong>{edu.degree}</strong> – {edu.instituteName}
                {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                {" — "}
                {formatEducationYear(edu.startDate, edu.endDate)}
              </Typography>
            ))}
          </Section>
        )}

        {/* Optional: Achievements */}
        {data.achievements?.length > 0 && (
          <Section title="Achievements">
            {data.achievements.map((ach, i) => (
              <Typography key={i} sx={{ fontSize: "0.9em" }}>
                • {ach.title}{ach.description ? ` – ${ach.description}` : ""}
              </Typography>
            ))}
          </Section>
        )}
      </Box>

      {/* Right column - sidebar */}
      <Box
        sx={{
          bgcolor: "#ffecd2",
          p: 4,
          gridColumn: 2,
          gridRow: "1 / 3",
        }}
      >
        {/* Skills – display skillName (and optionally proficiency) */}
        {data.skills?.length > 0 && (
          <>
            <Typography
              variant="h6"
              sx={{ borderBottom: "2px solid #333", pb: 0.5, mb: 1 }}
            >
              Skills
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 3 }}>
              {data.skills.map((skill, i) => (
                <Box
                  key={i}
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: "4px",
                    px: 1,
                    py: 0.3,
                    fontSize: "0.85em",
                  }}
                >
                  {skill.skillName}
                  {skill.proficiency && (
                    <Typography
                      component="span"
                      sx={{ fontSize: "0.7em", color: "#666", ml: 0.5 }}
                    >
                      ({skill.proficiency})
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </>
        )}

        {/* Certifications – now objects */}
        {data.certifications?.length > 0 && (
          <>
            <Typography
              variant="h6"
              sx={{ borderBottom: "2px solid #333", pb: 0.5, mt: 3, mb: 1 }}
            >
              Certifications
            </Typography>
            {data.certifications.map((cert, i) => (
              <Typography key={i} sx={{ fontSize: "0.9em", mb: 0.5 }}>
                <strong>{cert.certificateName}</strong>
                {cert.issuedBy && ` – ${cert.issuedBy}`}
              </Typography>
            ))}
          </>
        )}

        {/* Languages (new) */}
        {data.languages?.length > 0 && (
          <>
            <Typography
              variant="h6"
              sx={{ borderBottom: "2px solid #333", pb: 0.5, mt: 3, mb: 1 }}
            >
              Languages
            </Typography>
            {data.languages.map((lang, i) => (
              <Typography key={i} sx={{ fontSize: "0.9em" }}>
                {lang.languageName}{" "}
                {lang.proficiencyLevel && `(${lang.proficiencyLevel})`}
              </Typography>
            ))}
          </>
        )}

        {/* Social links */}
        {data.social && (
          <>
            <Typography
              variant="h6"
              sx={{ borderBottom: "2px solid #333", pb: 0.5, mt: 3, mb: 1 }}
            >
              Links
            </Typography>
            {data.social.linkedInUrl && (
              <Typography sx={{ fontSize: "0.9em" }}>
                🔗 LinkedIn
              </Typography>
            )}
            {data.social.gitHubUrl && (
              <Typography sx={{ fontSize: "0.9em" }}>
                💻 GitHub
              </Typography>
            )}
            {data.social.portfolioUrl && (
              <Typography sx={{ fontSize: "0.9em" }}>
                🌐 Portfolio
              </Typography>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
};

// Reusable Section component (unchanged)
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" sx={{ borderBottom: "2px solid #ff6f61", pb: 0.5, mb: 1 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default AsymmetricTemplate;