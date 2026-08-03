// MaroonMinimalTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const MAROON = "#7a1f3d";
const DARK = "#1a1a1a";
const MUTED = "#555";
const DOT_FILLED = MAROON;
const DOT_EMPTY = "#e2d5da";
const TOTAL_DOTS = 5;

const formatDate = (d?: Date | string) => {
  if (!d) return "";
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} - Current`;
  return `${s} - ${formatDate(end)}`;
};

// Optional: keep dot mapping for skills if you want to map proficiency to dots
// but skills have "Beginner", "Advanced", etc., which don't match the original mapping.
// We'll just display the text.

const MaroonMinimalTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 6,
        fontFamily: settings?.fontFamily ?? "'Segoe UI', Arial, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        bgcolor: "#fff",
        color: DARK,
      }}
    >
      {/* ===== HEADER ===== */}
      <Typography sx={{ fontSize: 28, fontWeight: 800, color: MAROON, mb: 1 }}>{fullName}</Typography>
      {summaryText && (
        <Typography sx={{ fontSize: 12, color: MUTED, mb: 3 }}>{summaryText}</Typography>
      )}

      <Box sx={{ display: "grid", gridTemplateColumns: "220px 1fr", columnGap: 5 }}>
        {/* left column */}
        <Box>
          <SectionHeading title="Contact" />
          <Box sx={{ mb: 3 }}>
            {data.contact?.address && (
              <Typography sx={{ fontSize: 11.5, color: MUTED, mb: 0.25 }}>
                Address: {data.contact.address}
              </Typography>
            )}
            {data.contact?.pincode && (
              <Typography sx={{ fontSize: 11.5, color: MUTED, mb: 0.25 }}>
                {data.contact.pincode}
              </Typography>
            )}
            {data.contact?.mobile && (
              <Typography sx={{ fontSize: 11.5, color: MUTED, mb: 0.25 }}>
                Phone: {data.contact.mobile}
              </Typography>
            )}
            {data.contact?.email && (
              <Typography sx={{ fontSize: 11.5, color: MUTED }}>
                E-mail: {data.contact.email}
              </Typography>
            )}
          </Box>

          {/* === Skills section (replaces Languages) === */}
          {data.skills && data.skills.length > 0 && (
            <>
              <SectionHeading title="Skills" />
              {data.skills.map((skill, i) => (
                <Box key={i} sx={{ mb: 1 }}>
                  <Typography sx={{ fontSize: 11.5, color: DARK }}>
                    {skill.skillName}
                    {skill.proficiency && ` (${skill.proficiency})`}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </Box>

        {/* right column */}
        <Box>
          {/* === Work History === */}
          {data.experiences && data.experiences.length > 0 && (
            <>
              <SectionHeading title="Work History" />
              {data.experiences.map((exp: any, i: any) => (
                <Box key={i} sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {exp.designation}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#777", mb: 0.5 }}>
                    {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: MUTED, mb: 0.5 }}>
                    {exp.companyName}
                  </Typography>
                  {exp.description && (
                    <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                      {exp.description.split(/\n+/).filter(Boolean).map((line, j) => (
                        <Typography component="li" key={j} sx={{ fontSize: 11.5, color: MUTED }}>
                          {line}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </>
          )}

          {/* === Projects section (replaces Certifications) === */}
          {data.projects && data.projects.length > 0 && (
            <>
              <SectionHeading title="Projects" />
              {data.projects.map((project, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {project.projectName}
                  </Typography>
                  {project.role && (
                    <Typography sx={{ fontSize: 11.5, color: "#777", mb: 0.5 }}>
                      {project.role}
                    </Typography>
                  )}
                  {project.description && (
                    <Typography sx={{ fontSize: 11.5, color: MUTED, mb: 0.5 }}>
                      {project.description}
                    </Typography>
                  )}
                  {project.technologies && project.technologies.length > 0 && (
                    <Typography sx={{ fontSize: 11.5, color: "#888", fontStyle: "italic" }}>
                      Tech: {project.technologies.join(", ")}
                    </Typography>
                  )}
                </Box>
              ))}
            </>
          )}

          {/* === Education === */}
          {data.educations && data.educations.length > 0 && (
            <>
              <SectionHeading title="Education" />
              {data.educations.map((edu, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {edu.degree}
                    {edu.fieldOfStudy ? `: ${edu.fieldOfStudy}` : ""}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, fontStyle: "italic", color: "#777" }}>
                    {edu.instituteName}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

const SectionHeading = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: 15, fontWeight: 800, color: MAROON, mb: 1.5, mt: 1 }}>
    {title}
  </Typography>
);

export default MaroonMinimalTemplate;