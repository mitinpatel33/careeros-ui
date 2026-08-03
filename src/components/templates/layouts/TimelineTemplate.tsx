// TimelineTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/* ---------- helpers ---------- */
const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

const formatDuration = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
) => {
  const startStr = formatDate(start);
  if (isCurrent || !end) return `${startStr} – Present`;
  return `${startStr} – ${formatDate(end)}`;
};
/* ------------------------------ */

const TimelineTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Summary – use whichever is available
  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  // Contact line
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
        bgcolor: "#fff",
        fontFamily: settings?.fontFamily ?? "Gill Sans",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
      }}
    >
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" sx={{ color: "#1e3c72" }}>
          {fullName}
        </Typography>
        <Typography sx={{ color: "#2a9d8f", fontSize: "1.1em" }}>
          {data.personal?.jobTitle}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
            mt: 1,
            color: "#555",
          }}
        >
          {contactParts.map((part, idx) => (
            <span key={idx}>{part}</span>
          ))}
        </Box>
      </Box>

      {/* Optional Summary */}
      {summaryText && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ borderLeft: "5px solid #2a9d8f", pl: 2, mb: 1 }}
          >
            Profile
          </Typography>
          <Typography>{summaryText}</Typography>
        </Box>
      )}

      {/* Experience Timeline */}
      {data.experience && data.experience.length > 0 && (
        <Box sx={{ position: "relative", pl: 4, mb: 4 }}>
          <Box
            sx={{
              position: "absolute",
              left: 10,
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: "#ccc",
            }}
          />
          {data.experience.map((exp, i) => (
            <Box key={i} sx={{ position: "relative", mb: 3 }}>
              <Box
                sx={{
                  position: "absolute",
                  left: -30,
                  top: 5,
                  width: 12,
                  height: 12,
                  bgcolor: "#2a9d8f",
                  borderRadius: "50%",
                  border: "2px solid #fff",
                  boxShadow: "0 0 0 2px #2a9d8f",
                }}
              />
              <Typography sx={{ fontWeight: "bold" }}>
                {exp.designation}
                {exp.companyName ? ` – ${exp.companyName}` : ""}
              </Typography>
              <Typography sx={{ color: "#2a9d8f", fontSize: "0.85em" }}>
                {formatDuration(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                {exp.employmentType ? ` (${exp.employmentType})` : ""}
              </Typography>
              {exp.description && (
                <Typography sx={{ mt: 0.5 }}>{exp.description}</Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ borderLeft: "5px solid #2a9d8f", pl: 2, mb: 1 }}
          >
            Education
          </Typography>
          {data.education.map((edu, i) => (
            <Typography key={i}>
              <strong>{edu.degree}</strong>
              {edu.instituteName ? ` – ${edu.instituteName}` : ""}
              {edu.startDate || edu.endDate
                ? `, ${formatDuration(edu.startDate, edu.endDate)}`
                : ""}
              {edu.grade ? ` | Grade: ${edu.grade}` : ""}
            </Typography>
          ))}
        </Box>
      )}

      {/* Skills */}
      {data.skills && data.skills.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ borderLeft: "5px solid #2a9d8f", pl: 2, mb: 1 }}
          >
            Skills
          </Typography>
          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {data.skills.map((skill, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#e0f2f1",
                  px: 2,
                  py: 0.5,
                  borderRadius: "15px",
                }}
              >
                {skill.skillName}
                {skill.proficiency ? ` (${skill.proficiency})` : ""}
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Optional: Projects */}
      {data.projects && data.projects.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ borderLeft: "5px solid #2a9d8f", pl: 2, mb: 1 }}
          >
            Projects
          </Typography>
          {data.projects.map((proj, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Typography sx={{ fontWeight: 600 }}>
                {proj.projectName}
                {proj.role ? ` – ${proj.role}` : ""}
              </Typography>
              {proj.technologies?.length ? (
                <Typography sx={{ color: "#888", fontSize: "0.9em" }}>
                  {proj.technologies.join(", ")}
                </Typography>
              ) : null}
              {proj.description && <Typography>{proj.description}</Typography>}
            </Box>
          ))}
        </Box>
      )}

      {/* Optional: Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ borderLeft: "5px solid #2a9d8f", pl: 2, mb: 1 }}
          >
            Certifications
          </Typography>
          {data.certifications.map((cert, i) => (
            <Typography key={i}>
              <strong>{cert.certificateName}</strong>
              {cert.issuedBy ? ` – ${cert.issuedBy}` : ""}
              {cert.issuedDate ? ` (${formatDate(cert.issuedDate)})` : ""}
            </Typography>
          ))}
        </Box>
      )}

      {/* Optional: Achievements */}
      {data.achievements && data.achievements.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ borderLeft: "5px solid #2a9d8f", pl: 2, mb: 1 }}
          >
            Achievements
          </Typography>
          {data.achievements.map((ach, i) => (
            <Typography key={i}>
              • {ach.title}
              {ach.description ? ` – ${ach.description}` : ""}
            </Typography>
          ))}
        </Box>
      )}

      {/* Optional: Languages */}
      {data.languages && data.languages.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ borderLeft: "5px solid #2a9d8f", pl: 2, mb: 1 }}
          >
            Languages
          </Typography>
          {data.languages.map((lang, i) => (
            <Typography key={i}>
              {lang.languageName}
              {lang.proficiencyLevel ? ` – ${lang.proficiencyLevel}` : ""}
            </Typography>
          ))}
        </Box>
      )}
    </Paper>
  );
};

export default TimelineTemplate;