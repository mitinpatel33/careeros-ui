// MinimalDotsTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/**
 * Helper: formats a date range into a readable string
 * e.g. "Jan 2020 – Present" or "Mar 2018 – Dec 2021"
 */
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
  const end = formatDate(endDate);
  return `${start} – ${end}`;
};

const MinimalDotsTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 5,
        fontFamily: settings?.fontFamily ?? "Helvetica Neue",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 300, letterSpacing: 2 }}>
        {fullName}
      </Typography>
      <Typography sx={{ color: "#888", mb: 3 }}>
        {data.personal?.jobTitle}
      </Typography>

      {/* Contact info – now uses 'mobile' instead of 'phone' */}
      <Box sx={{ color: "#666", mb: 4 }}>
        {data.contact?.email}
        {data.contact?.mobile ? ` • ${data.contact.mobile}` : ""}
        {data.contact?.city ? ` • ${data.contact.city}` : ""}
      </Box>

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h6"
            sx={{ borderBottom: "1px solid #e0e0e0", pb: 0.5, mb: 2 }}
          >
            Experience
          </Typography>
          {data.experience.map((exp, i) => (
            <Box key={i} sx={{ display: "flex", mb: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mr: 2,
                }}
              >
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    bgcolor: "#333",
                    borderRadius: "50%",
                  }}
                />
                {i < data.experience!.length - 1 && (
                  <Box
                    sx={{
                      width: 1,
                      flexGrow: 1,
                      bgcolor: "#ccc",
                      mt: 0.5,
                    }}
                  />
                )}
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 600 }}>
                  {exp.designation || ""}
                  {exp.companyName ? ` – ${exp.companyName}` : ""}
                </Typography>
                {/* Compute duration dynamically */}
                <Typography sx={{ color: "#999", fontSize: "0.85em" }}>
                  {formatDuration(
                    exp.startDate,
                    exp.endDate,
                    exp.isCurrentCompany
                  )}
                </Typography>
                {exp.description && <Typography>{exp.description}</Typography>}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h6"
            sx={{ borderBottom: "1px solid #e0e0e0", pb: 0.5, mb: 1 }}
          >
            Education
          </Typography>
          {data.education.map((edu, i) => (
            <Box key={i} sx={{ display: "flex", mb: 1 }}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  bgcolor: "#333",
                  borderRadius: "50%",
                  mr: 1.5,
                  mt: 0.5,
                }}
              />
              <Typography>
                <strong>{edu.degree || ""}</strong>
                {edu.instituteName ? ` – ${edu.instituteName}` : ""}
                {/* Compute year range */}
                {edu.startDate || edu.endDate
                  ? `, ${formatDuration(edu.startDate, edu.endDate)}`
                  : ""}
                {edu.grade ? ` | Grade: ${edu.grade}` : ""}
              </Typography>
            </Box>
          ))}
        </Box>
      )}

      {/* Skills – map array of objects to just skill names */}
      {data.skills && data.skills.length > 0 && (
        <Box>
          <Typography
            variant="h6"
            sx={{ borderBottom: "1px solid #e0e0e0", pb: 0.5, mb: 1 }}
          >
            Skills
          </Typography>
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {data.skills.map((skill, i) => (
              <Typography key={i}>
                {skill.skillName}
                {/* Optionally show proficiency */}
                {skill.proficiency ? ` (${skill.proficiency})` : ""}
              </Typography>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default MinimalDotsTemplate;