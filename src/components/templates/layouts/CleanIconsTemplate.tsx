// CleanIconsTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/**
 * Helper to format date ranges from the DB fields.
 * Returns something like "Jan 2020 – Present" or "2018 – 2022".
 */
const formatDuration = (
  startDate?: Date | string,
  endDate?: Date | string,
  isCurrent?: boolean
): string => {
  const fmt = (d?: Date | string) => {
    if (!d) return "";
    const date = new Date(d);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const start = fmt(startDate);
  if (isCurrent || !endDate) return `${start} – Present`;
  const end = fmt(endDate);
  return `${start} – ${end}`;
};

const CleanIconsTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Determine website URL from social links
  const websiteUrl =
    data.social?.portfolioUrl ??
    data.social?.linkedInUrl ??
    data.social?.websiteUrl ??
    data.social?.gitHubUrl;

  // Build a human‑readable location from city + state or country
  const location = [data.contact?.city, data.contact?.state, data.contact?.country]
    .filter(Boolean)
    .join(", ");

  // Summary text – take professional summary first, fallback to career objective
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective;

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 5,
        bgcolor: "#fff",
        borderRadius: "12px",
        fontFamily: settings?.fontFamily ?? "Segoe UI",
        fontSize: settings?.fontSize ?? 12,
        boxShadow: "0 5px 20px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {/* Header with photo placeholder */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#e0e7ff",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5em",
          }}
        >
          {data.personal?.photoUrl ? (
            <img
              src={data.personal.photoUrl}
              alt="profile"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            "👩‍💻"
          )}
        </Box>
        <Box>
          <Typography variant="h4">{fullName}</Typography>
          <Typography sx={{ color: "#4a5568" }}>{data.personal?.jobTitle}</Typography>
        </Box>
      </Box>

      {/* Contact grid */}
      <Box sx={{ display: "grid", gridTemplateColumns: "auto auto", gap: 1, color: "#4a5568" }}>
        {data.contact?.email && <span>✉ {data.contact.email}</span>}
        {data.contact?.mobile && <span>📞 {data.contact.mobile}</span>}
        {websiteUrl && <span>🌐 {websiteUrl}</span>}
        {location && <span>📍 {location}</span>}
      </Box>

      {/* Summary */}
      {summaryText && <Section title="Summary">{summaryText}</Section>}

      {/* Experience */}
      {data.experience && data.experience?.length > 0 && (
        <Section title="Experience">
          {data.experience.map((exp, i) => {
            const duration = formatDuration(exp.startDate, exp.endDate, exp.isCurrentCompany);
            return (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {exp.designation} – {exp.companyName}
                </Typography>
                <Typography sx={{ color: "#a0aec0", fontSize: "0.85em" }}>
                  {duration}
                </Typography>
                {exp.description && <Typography>{exp.description}</Typography>}
              </Box>
            );
          })}
        </Section>
      )}

      {/* Education */}
      {data.education && data.education?.length > 0 && (
        <Section title="Education">
          {data.education.map((edu, i) => {
            const yearRange = formatDuration(edu.startDate, edu.endDate);
            return (
              <Typography key={i}>
                <strong>{edu.degree}</strong>
                {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                {edu.instituteName ? ` – ${edu.instituteName}` : ""}
                {yearRange ? `, ${yearRange}` : ""}
                {edu.grade ? ` (Grade: ${edu.grade})` : ""}
              </Typography>
            );
          })}
        </Section>
      )}

      {/* Skills (with proficiency if available) */}
      {data.skills && data.skills?.length > 0 && (
        <Section title="Skills">
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            {data.skills.map((skill, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#edf2f7",
                  px: 2,
                  py: 0.5,
                  borderRadius: "20px",
                  fontSize: "0.9em",
                }}
                title={`${skill.proficiency ? `Proficiency: ${skill.proficiency}` : ""}${
                  skill.experienceInYears ? ` | ${skill.experienceInYears} yrs` : ""
                }`}
              >
                {skill.skillName}
                {skill.proficiency && ` (${skill.proficiency})`}
              </Box>
            ))}
          </Box>
        </Section>
      )}

      {/* Projects */}
      {data.projects && data.projects?.length > 0 && (
        <Section title="Projects">
          {data.projects.map((proj, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {proj.projectName}
                {proj.role ? ` – ${proj.role}` : ""}
              </Typography>
              {proj.technologies?.length ? (
                <Typography sx={{ color: "#a0aec0", fontSize: "0.85em" }}>
                  {proj.technologies.join(", ")}
                </Typography>
              ) : null}
              {proj.description && <Typography>{proj.description}</Typography>}
              {proj.projectUrl && (
                <Typography sx={{ fontSize: "0.85em", wordBreak: "break-all" }}>
                  🔗 {proj.projectUrl}
                </Typography>
              )}
            </Box>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {data?.certifications && data?.certifications?.length > 0 && (
        <Section title="Certifications">
          {data?.certifications.map((cert, i) => {
            const dateStr = cert?.issuedDate
              ? new Date(cert?.issuedDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })
              : null;
            return (
              <Typography key={i}>
                <strong>{cert?.certificateName}</strong>
                {cert?.issuedBy ? ` – ${cert?.issuedBy}` : ""}
                {dateStr ? ` (${dateStr})` : ""}
              </Typography>
            );
          })}
        </Section>
      )}

      {/* Achievements */}
      {data?.achievements && data?.achievements?.length > 0 && (
        <Section title="Achievements">
          {data?.achievements?.map((ach, i) => (
            <Typography key={i} sx={{ mb: 0.5 }}>
              • {ach?.title}
              {ach?.description && ` – ${ach?.description}`}
            </Typography>
          ))}
        </Section>
      )}

      {/* Languages (new section based on schema) */}
      {data?.languages && data?.languages?.length > 0 && (
        <Section title="Languages">
          {data?.languages?.map((lang, i) => (
            <Typography key={i}>
              {lang?.languageName}
              {lang?.proficiencyLevel ? ` – ${lang?.proficiencyLevel}` : ""}
            </Typography>
          ))}
        </Section>
      )}
    </Paper>
  );
};

// Reusable Section component (unchanged)
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box>
    <Typography
      variant="subtitle1"
      sx={{
        color: "#4c51bf",
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

export default CleanIconsTemplate;