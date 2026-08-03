// VintageTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/* ---------- helpers ---------- */
const formatDate = (date?: Date | string): string => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const formatDuration = (
  startDate?: Date | string,
  endDate?: Date | string,
  isCurrent?: boolean
): string => {
  const start = formatDate(startDate);
  if (isCurrent || !endDate) return `${start} – Present`;
  return `${start} – ${formatDate(endDate)}`;
};

/* ---------- component ---------- */
const VintageTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Combine summary fields into a single string for display
  const summaryText =
    data.summary?.professionalSummary ||
    data.summary?.careerObjective ||
    "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 5,
        bgcolor: "#fffef7",
        border: "1px solid #b3a68f",
        boxShadow: "5px 5px 0 #c2b59b",
        fontFamily: "'Courier New', monospace",
        fontSize: settings?.fontSize ?? 13,
      }}
    >
      {/* Name */}
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          letterSpacing: 3,
          borderBottom: "2px dashed #8b7d6b",
          pb: 1,
        }}
      >
        {fullName}
      </Typography>

      {/* Job title */}
      <Typography sx={{ textAlign: "center", color: "#5e503a", mt: 1 }}>
        {data.personal?.jobTitle}
      </Typography>

      {/* Contact line – uses 'mobile' instead of 'phone' */}
      <Box sx={{ textAlign: "center", my: 2, color: "#5e503a" }}>
        {data.contact?.email}
        {data.contact?.mobile ? ` | ${data.contact.mobile}` : ""}
        {data.contact?.city ? ` | ${data.contact.city}` : ""}
        {data.contact?.address ? ` | ${data.contact.address}` : ""}
      </Box>

      {/* Summary (now from summary object) */}
      {summaryText && <Section title="Summary">{summaryText}</Section>}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <Box key={i} sx={{ ml: 2, mb: 2 }}>
              <Typography
                sx={{ fontWeight: "bold", display: "block" }}
              >
                {exp.designation || ""}
                {exp.companyName ? ` – ${exp.companyName}` : ""}
              </Typography>
              <Typography
                sx={{ fontStyle: "italic", color: "#8b7d6b" }}
              >
                {formatDuration(
                  exp.startDate,
                  exp.endDate,
                  exp.isCurrentCompany
                )}
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
              <strong>{edu.degree || ""}</strong>
              {edu.instituteName ? ` – ${edu.instituteName}` : ""}
              {(edu.startDate || edu.endDate) &&
                `, ${formatDuration(edu.startDate, edu.endDate)}`}
              {edu.grade ? ` | Grade: ${edu.grade}` : ""}
            </Typography>
          ))}
        </Section>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <Section title="Skills">
          <Typography>
            {data.skills
              .map(
                (s) =>
                  `${s.skillName}${
                    s.proficiency ? ` (${s.proficiency})` : ""
                  }`
              )
              .join(" • ")}
          </Typography>
        </Section>
      )}

      {/* Projects (optional, added for completeness) */}
      {data.projects && data.projects.length > 0 && (
        <Section title="Projects">
          {data.projects.map((proj, i) => (
            <Box key={i} sx={{ ml: 2, mb: 1.5 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {proj.projectName || "Untitled"}
              </Typography>
              {proj.technologies && proj.technologies.length > 0 && (
                <Typography sx={{ fontStyle: "italic", color: "#8b7d6b" }}>
                  {proj.technologies.join(", ")}
                </Typography>
              )}
              {proj.description && <Typography>{proj.description}</Typography>}
            </Box>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <Section title="Certifications">
          {data.certifications.map((cert, i) => (
            <Typography key={i}>
              <strong>{cert.certificateName}</strong>
              {cert.issuedBy ? ` – ${cert.issuedBy}` : ""}
              {cert.issuedDate
                ? ` (${new Date(cert.issuedDate).toLocaleDateString()})`
                : ""}
            </Typography>
          ))}
        </Section>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.length > 0 && (
        <Section title="Achievements">
          {data.achievements.map((ach, i) => (
            <Typography key={i}>
              • {ach.title}
              {ach.description ? ` – ${ach.description}` : ""}
            </Typography>
          ))}
        </Section>
      )}

      {/* Languages */}
      {data.languages && data.languages.length > 0 && (
        <Section title="Languages">
          <Typography>
            {data.languages
              .map(
                (l) =>
                  `${l.languageName}${
                    l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ""
                  }`
              )
              .join(" • ")}
          </Typography>
        </Section>
      )}
    </Paper>
  );
};

/* ---------- reusable section wrapper ---------- */
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
        borderBottom: "1px dotted #8b7d6b",
        pb: 0.5,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default VintageTemplate;