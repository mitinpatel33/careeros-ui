// CompactBlueTemplate.tsx
import { Box, Typography, Paper, Avatar } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const BLUE = "#a9c4d8";
const DARK = "#1a1a1a";
const MUTED = "#555";

const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} - Present`;
  return `${s} - ${formatDate(end)}`;
};

const CompactBlueTemplate = ({ data, settings }: TemplateRenderProps) => {
  const firstName = data.personal?.firstName ?? "";
  const lastName = data.personal?.lastName ?? "";
  const photoUrl = data.personal?.photoUrl ?? data.personal?.photoUrl;
  const jobTitle = data.personal?.jobTitle ?? "";
  const summary = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        fontFamily: settings?.fontFamily ?? "'Segoe UI', Arial, sans-serif",
        fontSize: settings?.fontSize ?? 9,
        bgcolor: "#fff",
        color: DARK,
        display: "grid",
        gridTemplateColumns: "200px 1fr",
        overflow: "hidden",
      }}
    >
      {/* ===== LEFT SIDEBAR ===== */}
      <Box sx={{ bgcolor: BLUE, px: 3, py: 3 }}>
        <Avatar src={photoUrl} sx={{ width: 150, height: 150, mb: 2, borderRadius: 0 }} />

        {/* Contact - from data */}
        {data.contact && (
          <>
            <SideHeading title="CONTACT" />
            {data.contact.address && (
              <Typography sx={{ fontSize: 7.5, color: "#fff", mb: 0.3, lineHeight: 1.2 }}>
                {data.contact.address}
              </Typography>
            )}
            {data.contact.mobile && (
              <Typography sx={{ fontSize: 7.5, color: "#fff", mb: 0.3 }}>
                {data.contact.mobile}
              </Typography>
            )}
            {data.contact.email && (
              <Typography sx={{ fontSize: 7.5, color: "#fff", mb: 1.5, wordBreak: "break-word" }}>
                {data.contact.email}
              </Typography>
            )}
          </>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <>
            <SideHeading title="SKILLS" />
            {data.skills.map((skill, i) => (
              <Typography key={i} sx={{ fontSize: 7.5, color: "#fff", mb: 0.2 }}>
                {skill.skillName}
                {skill.proficiency && ` (${skill.proficiency})`}
              </Typography>
            ))}
            <Box sx={{ mb: 1.5 }} />
          </>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <>
            <SideHeading title="LANGUAGES" />
            {data.languages.map((lang, i) => (
              <Typography key={i} sx={{ fontSize: 7.5, color: "#fff", mb: 0.2 }}>
                {lang.languageName}
                {lang.proficiencyLevel && ` (${lang.proficiencyLevel})`}
              </Typography>
            ))}
            <Box sx={{ mb: 1.5 }} />
          </>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <>
            <SideHeading title="CERTIFICATIONS" />
            {data.certifications.map((cert, i) => (
              <Typography key={i} sx={{ fontSize: 7.5, color: "#fff", mb: 0.2 }}>
                {cert.certificateName}
                {cert.issuedBy && ` - ${cert.issuedBy}`}
              </Typography>
            ))}
          </>
        )}
      </Box>

      {/* ===== RIGHT MAIN ===== */}
      <Box sx={{ px: 2, py: 2 }}>
        {/* Name: Two lines, uppercase */}
        <Box sx={{ mb: 0.5 }}>
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: DARK, letterSpacing: 1 }}>
            {firstName.toUpperCase()}
          </Typography>
          <Typography sx={{ fontSize: 16, fontWeight: 800, color: DARK, letterSpacing: 1, mt: -0.5 }}>
            {lastName.toUpperCase()}
          </Typography>
        </Box>

        {/* Job Title */}
        {jobTitle && (
          <Typography sx={{ fontSize: 9.5, color: "#666", mb: 1.5, fontWeight: 600 }}>
            {jobTitle.toUpperCase()}
          </Typography>
        )}

        {/* Summary (optional) */}
        {summary && (
          <Typography sx={{ fontSize: 7.5, color: MUTED, mb: 1.5, lineHeight: 1.4 }}>
            {summary}
          </Typography>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <>
            <MainHeading title="EDUCATION" />
            {data.education.map((edu, i) => (
              <Box key={i} sx={{ mb: 0.8 }}>
                <Typography sx={{ fontSize: 8, fontWeight: 700, color: DARK }}>
                  {edu.degree}: {edu.fieldOfStudy}
                </Typography>
                <Typography sx={{ fontSize: 7.5, color: MUTED }}>
                  {edu.instituteName} • {formatRange(edu.startDate, edu.endDate)}
                </Typography>
                {edu.percentage && (
                  <Typography sx={{ fontSize: 7, color: "#888" }}>
                    {edu.percentage}% {edu.grade && `- ${edu.grade}`}
                  </Typography>
                )}
              </Box>
            ))}
          </>
        )}

        {/* EXPERIENCE - as shown in image */}
        {data.experience && data.experience.length > 0 && (
          <>
            <MainHeading title="EXPERIENCE" />
            {data.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 0.8 }}>
                <Typography sx={{ fontSize: 8, fontWeight: 700, color: DARK }}>
                  {exp.designation}
                </Typography>
                <Typography sx={{ fontSize: 7.5, color: MUTED }}>
                  {exp.companyName} • {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                </Typography>
                {exp.location && (
                  <Typography sx={{ fontSize: 7, color: "#888" }}>{exp.location}</Typography>
                )}
                {exp.description && (
                  <Typography sx={{ fontSize: 7, color: MUTED, mt: 0.3, pl: 1 }}>
                    • {exp.description}
                  </Typography>
                )}
              </Box>
            ))}
          </>
        )}

        {/* Projects (optional) */}
        {data.projects && data.projects.length > 0 && (
          <>
            <MainHeading title="PROJECTS" />
            {data.projects.slice(0, 2).map((proj, i) => (
              <Box key={i} sx={{ mb: 0.6 }}>
                <Typography sx={{ fontSize: 8, fontWeight: 700, color: DARK }}>
                  {proj.projectName}
                </Typography>
                <Typography sx={{ fontSize: 7, color: MUTED }}>
                  {proj.role}
                  {proj.technologies && proj.technologies.length > 0 && (
                    <> • {proj.technologies.join(", ")}</>
                  )}
                </Typography>
                {proj.description && (
                  <Typography sx={{ fontSize: 7, color: "#888", fontStyle: "italic" }}>
                    {proj.description}
                  </Typography>
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Paper>
  );
};

// Helper components
const SideHeading = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: 8.5, fontWeight: 800, color: "#fff", mb: 0.5, mt: 1 }}>
    {title}
  </Typography>
);

const MainHeading = ({ title }: { title: string }) => (
  <Typography
    sx={{
      fontSize: 9,
      fontWeight: 800,
      color: DARK,
      mb: 0.5,
      mt: 1,
      borderBottom: "1px solid #ccc",
      pb: 0.2,
    }}
  >
    {title}
  </Typography>
);

export default CompactBlueTemplate;