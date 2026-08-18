// CorporateTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";
/**
 * Helper to format date range from start/end date and isCurrent flag.
 */
const formatDuration = (
  startDate?: Date | string,
  endDate?: Date | string,
  isCurrent?: boolean
): string => {
  const format = (d: Date | string | undefined) => {
    if (!d) return "";
    const date = typeof d === "string" ? new Date(d) : d;
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const start = format(startDate);
  if (isCurrent || !endDate) return `${start} – Present`;
  const end = format(endDate);
  return `${start} – ${end}`;
};

const CorporateTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Determine which summary text to use
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 5,
        bgcolor: "#fff",
        borderTop: "5px solid #003366",
        fontFamily: "Arial, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header: Name, Job Title, and Contact */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ color: "#003366" }}>
            {fullName}
          </Typography>
          <Typography sx={{ color: "#cc9900", fontWeight: "bold" }}>
            {data.personal?.jobTitle}
          </Typography>
        </Box>
        <Box sx={{ color: "#555", textAlign: "right" }}>
          <div>📧 {data.contact?.email}</div>
          <div>📞 {data.contact?.mobile}</div> {/* using 'mobile' as phone */}
          <div>
            📍{" "}
            {[data.contact?.city, data.contact?.state, data.contact?.country]
              .filter(Boolean)
              .join(", ") || data.contact?.address}
          </div>
        </Box>
      </Box>

      {summaryText && <Section title="Professional Summary">{summaryText}</Section>}

      {/* Experience */}
      {data.experience && data.experience?.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold", color: "#003366" }}>
                {exp.designation} – {exp.companyName}
              </Typography>
              <Typography sx={{ fontStyle: "italic", color: "#777" }}>
                {formatDuration(exp.startDate, exp.endDate, exp.isCurrentCompany)}
              </Typography>
              <Typography>{exp.description}</Typography>
            </Box>
          ))}
        </Section>
      )}

      {/* Education */}
      {data.education && data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <Typography key={i}>
              <strong>
                {edu.degree}
                {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
              </strong>{" "}
              – {edu.instituteName},{" "}
              {formatDuration(edu.startDate, edu.endDate)}
              {edu.grade && ` | Grade: ${edu.grade}`}
              {edu.percentage != null && ` | Percentage: ${edu.percentage}%`}
            </Typography>
          ))}
        </Section>
      )}

      {/* Skills */}
      {data.skills && data.skills?.length > 0 && (
        <Section title="Skills">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {data.skills.map((skill, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#f0f4f8",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "4px",
                }}
              >
                {skill.skillName}
                {skill.proficiency && ` (${skill.proficiency})`}
              </Box>
            ))}
          </Box>
        </Section>
      )}

      {/* Projects (optional) */}
      {data.projects && data.projects?.length > 0 && (
        <Section title="Projects">
          {data.projects.map((proj, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: "bold", color: "#003366" }}>
                {proj.projectName}
                {proj.role ? ` (${proj.role})` : ""}
              </Typography>
              {proj.technologies && proj.technologies?.length > 0 && (
                <Typography sx={{ color: "#777", fontSize: "0.9em" }}>
                  Technologies: {proj.technologies.join(", ")}
                </Typography>
              )}
              <Typography>{proj.description}</Typography>
            </Box>
          ))}
        </Section>
      )}

      {/* Certifications (optional) */}
      {data.certifications && data.certifications?.length > 0 && (
        <Section title="Certifications">
          {data.certifications.map((cert, i) => (
            <Typography key={i}>
              <strong>{cert.certificateName}</strong> – {cert.issuedBy}
              {cert.issuedDate && ` (${new Date(cert.issuedDate).getFullYear()})`}
            </Typography>
          ))}
        </Section>
      )}

      {/* Achievements (optional) */}
      {data.achievements && data.achievements?.length > 0 && (
        <Section title="Achievements">
          {data.achievements.map((ach, i) => (
            <Typography key={i}>
              • <strong>{ach.title}</strong>
              {ach.description && ` – ${ach.description}`}
              {ach.achievementDate && ` (${new Date(ach.achievementDate).toLocaleDateString()})`}
            </Typography>
          ))}
        </Section>
      )}

      {/* Languages (optional) */}
      {data.languages && data.languages?.length > 0 && (
        <Section title="Languages">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {data.languages.map((lang, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#f0f4f8",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "4px",
                }}
              >
                {lang.languageName}
                {lang.proficiencyLevel && ` (${lang.proficiencyLevel})`}
              </Box>
            ))}
          </Box>
        </Section>
      )}
    </Paper>
  );
};

/* Reusable Section component */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="h6"
      sx={{
        color: "#003366",
        borderBottom: "1px solid #cc9900",
        pb: 0.5,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default CorporateTemplate;