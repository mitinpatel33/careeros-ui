// NewspaperTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/** Formats a Date | string into "Jan 2020" style */
const formatDate = (date?: Date | string): string => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

/** Returns a duration string like "Jan 2020 – Present" */
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

const NewspaperTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 4,
        columnCount: 2,
        columnGap: 4,
        columnRule: "1px solid #ccc",
        fontFamily: "'Times New Roman', serif",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #333",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          columnSpan: "all",
          textAlign: "center",
          borderBottom: "3px double #333",
          pb: 1,
          mb: 2,
        }}
      >
        {fullName}
      </Typography>
      <Typography
        sx={{ columnSpan: "all", textAlign: "center", color: "#555", mb: 2 }}
      >
        {data.personal?.jobTitle}
      </Typography>

      {/* Contact – uses mobile instead of phone */}
      <Typography
        sx={{ columnSpan: "all", textAlign: "center", mb: 3 }}
      >
        {data.contact?.email}
        {data.contact?.mobile ? ` | ${data.contact.mobile}` : ""}
        {data.contact?.city ? ` | ${data.contact.city}` : ""}
      </Typography>

      {/* Summary – now an object, display professionalSummary or fallback */}
      {(data.summary?.professionalSummary ||
        data.summary?.careerObjective) && (
        <Box sx={{ breakInside: "avoid" }}>
          <Typography
            variant="h6"
            sx={{ borderBottom: "1px solid #999", mb: 1 }}
          >
            Profile
          </Typography>
          <Typography sx={{textAlign: "justify"}}>
            {data.summary?.professionalSummary ||
              data.summary?.careerObjective}
          </Typography>
        </Box>
      )}

      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <Box sx={{ breakInside: "avoid", mt: 2 }}>
          <Typography
            variant="h6"
            sx={{ borderBottom: "1px solid #999", mb: 1 }}
          >
            Experience
          </Typography>
          {data.experience.map((exp, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                {exp.designation || ""}
                {exp.companyName ? ` – ${exp.companyName}` : ""}
              </Typography>
              {/* Dynamic duration */}
              <Typography
                sx={{ fontStyle: "italic", color: "#666" }}
              >
                {formatDuration(
                  exp.startDate,
                  exp.endDate,
                  exp.isCurrentCompany
                )}
              </Typography>
              {exp.description && (
                <Typography sx={{textAlign: "justify"}}>
                  {exp.description}
                </Typography>
              )}
            </Box>
          ))}
        </Box>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <Box sx={{ breakInside: "avoid", mt: 2 }}>
          <Typography
            variant="h6"
            sx={{ borderBottom: "1px solid #999", mb: 1 }}
          >
            Education
          </Typography>
          {data.education.map((edu, i) => (
            <Typography key={i}>
              <strong>{edu.degree || ""}</strong>
              {edu.instituteName ? ` – ${edu.instituteName}` : ""}
              {edu.startDate || edu.endDate
                ? `, ${formatDuration(edu.startDate, edu.endDate)}`
                : ""}
              {edu.grade ? ` | Grade: ${edu.grade}` : ""}
            </Typography>
          ))}
        </Box>
      )}

      {/* Skills – map objects to names */}
      {data.skills && data.skills.length > 0 && (
        <Box sx={{ breakInside: "avoid", mt: 2 }}>
          <Typography
            variant="h6"
            sx={{ borderBottom: "1px solid #999", mb: 1 }}
          >
            Skills
          </Typography>
          <Typography>
            {data.skills
              .map((skill) => skill.skillName)
              .join(" • ")}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default NewspaperTemplate;