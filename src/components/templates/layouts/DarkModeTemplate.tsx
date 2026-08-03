// DarkModeTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/** Format a Date or ISO string to "Mon YYYY" */
const fmtDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

/** Build a "Start – End" / "Start – Present" string */
const rangeStr = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
) => {
  const s = fmtDate(start);
  if (isCurrent || !end) return `${s} – Present`;
  return `${s} – ${fmtDate(end)}`;
};

const DarkModeTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Extract display summary from the summary object
  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        bgcolor: "#1e1e1e",
        color: "#e0e0e0",
        p: 5,
        borderRadius: "16px",
        fontFamily: settings?.fontFamily ?? "Inter, system-ui",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #333",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "1px solid #333",
          pb: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ color: "#00e5ff" }}>
            {fullName}
          </Typography>
          <Typography sx={{ color: "#b0bec5" }}>
            {data.personal?.jobTitle}
          </Typography>
        </Box>
        <Box sx={{ color: "#9e9e9e" }}>
          <div>📧 {data.contact?.email}</div>
          {/* Use mobile instead of phone */}
          <div>📞 {data.contact?.mobile}</div>
          <div>📍 {data.contact?.city}</div>
        </Box>
      </Box>

      {/* Grid content */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {/* Left Column */}
        <Box>
          {summaryText && <Section title="Profile">{summaryText}</Section>}

          {/* Skills – array of objects */}
          {data.skills && data.skills?.length > 0 && (
            <Section title="Skills">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.skills.map((skill, i) => (
                  <Box
                    key={i}
                    sx={{
                      bgcolor: "#333",
                      color: "#00e5ff",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "12px",
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

          {/* Optional: Languages */}
          {data.languages && data.languages?.length > 0 && (
            <Section title="Languages">
              {data.languages.map((lang, i) => (
                <Typography key={i} sx={{ color: "#e0e0e0" }}>
                  {lang.languageName}
                  {lang.proficiencyLevel ? ` – ${lang.proficiencyLevel}` : ""}
                </Typography>
              ))}
            </Section>
          )}
        </Box>

        {/* Right Column */}
        <Box>
          {/* Experience */}
          {data.experience && data.experience?.length > 0 && (
            <Section title="Experience">
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600, color: "#fff" }}>
                    {exp.designation}
                    {exp.companyName ? ` – ${exp.companyName}` : ""}
                  </Typography>
                  <Typography sx={{ color: "#888", fontSize: "0.85em" }}>
                    {rangeStr(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                    {exp.employmentType ? ` · ${exp.employmentType}` : ""}
                    {exp.location ? ` · ${exp.location}` : ""}
                  </Typography>
                  {exp.description && (
                    <Typography sx={{ color: "#bdbdbd" }}>
                      {exp.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Section>
          )}

          {/* Education */}
          {data.education && data.education?.length > 0 && (
            <Section title="Education">
              {data.education.map((edu, i) => (
                <Typography key={i} sx={{ color: "#e0e0e0", mb: 0.5 }}>
                  <strong>{edu.degree}</strong>
                  {edu.instituteName ? ` – ${edu.instituteName}` : ""}
                  {edu.startDate || edu.endDate
                    ? `, ${rangeStr(edu.startDate, edu.endDate)}`
                    : ""}
                  {edu.grade ? ` | Grade: ${edu.grade}` : ""}
                  {edu.fieldOfStudy ? ` | Field: ${edu.fieldOfStudy}` : ""}
                </Typography>
              ))}
            </Section>
          )}

          {/* Optional: Certifications */}
          {data.certifications && data.certifications?.length > 0 && (
            <Section title="Certifications">
              {data.certifications.map((cert, i) => (
                <Typography key={i} sx={{ color: "#e0e0e0" }}>
                  <strong>{cert.certificateName}</strong>
                  {cert.issuedBy ? ` – ${cert.issuedBy}` : ""}
                  {cert.issuedDate ? ` (${fmtDate(cert.issuedDate)})` : ""}
                </Typography>
              ))}
            </Section>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

/** Reusable Section component (unchanged) */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="subtitle1"
      sx={{
        color: "#00e5ff",
        letterSpacing: 1,
        borderBottom: "1px solid #333",
        pb: 0.5,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default DarkModeTemplate;