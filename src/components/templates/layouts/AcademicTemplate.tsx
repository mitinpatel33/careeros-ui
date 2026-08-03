// AcademicTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/** Format a Date or string into "Mon YYYY" */
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

const AcademicTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Summary – pick the most relevant string
  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  // Build contact line
  const contactParts = [
    data.contact?.email,
    data.contact?.mobile,
    data.contact?.city,
  ].filter(Boolean);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 5,
        fontFamily: settings?.fontFamily ?? "Times New Roman",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        {fullName}
      </Typography>
      <Typography sx={{ textAlign: "center", color: "#555" }}>
        {data.personal?.jobTitle}
      </Typography>
      <Box
        sx={{ textAlign: "center", my: 2, color: "#666", fontSize: "0.9em" }}
      >
        {contactParts.join(" • ")}
      </Box>

      {summaryText && (
        <Section title="Research Interests">{summaryText}</Section>
      )}

      {/* Education */}
      {data.education && data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => (
            <Typography key={i}>
              <strong>{edu.degree}</strong>
              {edu.instituteName ? ` – ${edu.instituteName}` : ""}
              {edu.startDate || edu.endDate
                ? `, ${formatRange(edu.startDate, edu.endDate)}`
                : ""}
              {edu.grade ? ` | Grade: ${edu.grade}` : ""}
              {edu.fieldOfStudy ? ` | Field: ${edu.fieldOfStudy}` : ""}
            </Typography>
          ))}
        </Section>
      )}

      {/* Experience */}
      {data.experience && data.experience?.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {exp.designation}
                {exp.companyName ? ` – ${exp.companyName}` : ""}
              </Typography>
              <Typography sx={{ color: "#666" }}>
                {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                {exp.employmentType ? ` (${exp.employmentType})` : ""}
              </Typography>
              {exp.description && <Typography>{exp.description}</Typography>}
            </Box>
          ))}
        </Section>
      )}

      {/* Projects → Publications */}
      {data.projects && data.projects?.length > 0 && (
        <Section title="Selected Publications">
          {data.projects.map((pub, i) => (
            <Typography key={i} sx={{ pl: 2, textIndent: -2, mb: 1 }}>
              <em>{pub.projectName}</em>
              {pub.technologies?.length
                ? `. ${pub.technologies.join(", ")}`
                : ""}
              {pub.description ? `. ${pub.description}` : ""}
              {pub.projectUrl ? ` [${pub.projectUrl}]` : ""}
            </Typography>
          ))}
        </Section>
      )}

      {/* Optional: Certifications */}
      {data.certifications && data.certifications?.length > 0 && (
        <Section title="Certifications">
          {data.certifications.map((cert, i) => (
            <Typography key={i}>
              <strong>{cert.certificateName}</strong>
              {cert.issuedBy ? ` – ${cert.issuedBy}` : ""}
              {cert.issuedDate ? ` (${formatDate(cert.issuedDate)})` : ""}
            </Typography>
          ))}
        </Section>
      )}

      {/* Optional: Achievements */}
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

      {/* Optional: Skills (if you want to display them) */}
      {data.skills && data.skills?.length > 0 && (
        <Section title="Skills">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5 }}>
            {data.skills.map((skill, i) => (
              <Typography key={i}>
                {skill.skillName}
                {skill.proficiency ? ` (${skill.proficiency})` : ""}
              </Typography>
            ))}
          </Box>
        </Section>
      )}

      {/* Optional: Languages */}
      {data.languages && data.languages?.length > 0 && (
        <Section title="Languages">
          {data.languages.map((lang, i) => (
            <Typography key={i}>
              {lang.languageName}
              {lang.proficiencyLevel ? ` – ${lang.proficiencyLevel}` : ""}
            </Typography>
          ))}
        </Section>
      )}
    </Paper>
  );
};

/** Reusable Section component */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="h6"
      sx={{
        fontVariant: "small-caps",
        borderBottom: "1px solid #999",
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default AcademicTemplate;