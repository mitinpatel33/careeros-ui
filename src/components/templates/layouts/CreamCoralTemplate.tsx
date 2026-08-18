// CreamCoralTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const CREAM = "#f2ede1";
const CORAL = "#e8a598";
const NAVY_TEXT = "#3d3a52";
const DARK = "#2a2a2a";
const MUTED = "#555";
const BAR_EMPTY = "#ded6c4";

const formatYear = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).getFullYear().toString();
};
const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatYear(start);
  if (isCurrent || !end) return `${s} - Present`;
  return `${s} - ${formatYear(end)}`;
};

const proficiencyToPercent = (p?: string | number) => {
  if (typeof p === "number") return Math.max(0, Math.min(100, p));
  switch ((p ?? "").toLowerCase()) {
    case "beginner": return 30;
    case "intermediate": return 55;
    case "advanced": return 80;
    case "expert": return 100;
    default: return 65;
  }
};

const CreamCoralTemplate = ({ data, settings }: TemplateRenderProps) => {
  const firstName = data.personal?.firstName ?? "";
  const lastName = data.personal?.lastName ?? "";
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 6,
        fontFamily: settings?.fontFamily ?? "'Poppins', Arial, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        bgcolor: CREAM,
        color: DARK,
      }}
    >
      {/* ===== HEADER ===== */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ width: 44, height: 4, bgcolor: NAVY_TEXT, mb: 1.5 }} />
        <Typography sx={{ fontSize: 30, fontWeight: 800, color: NAVY_TEXT, letterSpacing: "1px", lineHeight: 1.15 }}>
          {firstName.toUpperCase()}
          <br />
          {lastName.toUpperCase()}
        </Typography>
        {data.personal?.jobTitle && (
          <Typography sx={{ fontSize: 13, color: "#6a7a8a", letterSpacing: "2px", mt: 1 }}>
            {data.personal.jobTitle.toUpperCase()}
          </Typography>
        )}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "220px 1fr", columnGap: 5 }}>
        {/* left column */}
        <Box>
          {summaryText && (
            <>
              <Bar />
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: NAVY_TEXT, mb: 1 }}>PROFILE</Typography>
              <Typography sx={{ fontSize: 11, color: MUTED, mb: 3 }}>{summaryText}</Typography>
            </>
          )}

          <Bar />
          <Typography sx={{ fontSize: 13, fontWeight: 800, color: NAVY_TEXT, mb: 1 }}>CONTACT</Typography>
          <Box sx={{ mb: 3 }}>
            {data.contact?.mobile && <Typography sx={{ fontSize: 11, color: MUTED, mb: 0.5 }}>{data.contact.mobile}</Typography>}
            {data.contact?.email && <Typography sx={{ fontSize: 11, color: MUTED, mb: 0.5 }}>{data.contact.email}</Typography>}
            {[data.contact?.address, data.contact?.city].filter(Boolean).length > 0 && (
              <Typography sx={{ fontSize: 11, color: MUTED, mb: 0.5 }}>
                {[data.contact?.address, data.contact?.city].filter(Boolean).join(", ")}
              </Typography>
            )}
            {data.social?.websiteUrl && <Typography sx={{ fontSize: 11, color: MUTED }}>{data.social?.websiteUrl}</Typography>}
          </Box>

          {data.skills && data.skills.length > 0 && (
            <>
              <Bar />
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: NAVY_TEXT, mb: 1.5 }}>SKILLS</Typography>
              <Box sx={{ mb: 3 }}>
                {data.skills.map((s, i) => (
                  <Typography key={i} sx={{ fontSize: 11, color: MUTED, mb: 1 }}>{s.skillName}</Typography>
                ))}
              </Box>
            </>
          )}

          {data.languages && data.languages.length > 0 && (
            <>
              <Bar />
              <Typography sx={{ fontSize: 13, fontWeight: 800, color: NAVY_TEXT, mb: 1.5 }}>LANGUAGES</Typography>
              {data.languages.map((l, i) => {
                const pct = proficiencyToPercent(l.proficiencyLevel);
                return (
                  <Box key={i} sx={{ mb: 1.25 }}>
                    <Typography sx={{ fontSize: 11, color: MUTED, mb: 0.4 }}>{l.languageName}</Typography>
                    <Box sx={{ width: "100%", height: 5, bgcolor: BAR_EMPTY, borderRadius: "3px" }}>
                      <Box sx={{ width: `${pct}%`, height: "100%", bgcolor: NAVY_TEXT, borderRadius: "3px" }} />
                    </Box>
                  </Box>
                );
              })}
            </>
          )}
        </Box>

        {/* right column */}
        <Box>
          {data.experience && data.experience.length > 0 && (
            <>
              <Bar />
              <Typography sx={{ fontSize: 14, fontWeight: 800, color: NAVY_TEXT, mb: 2 }}>WORK EXPERIENCE</Typography>
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>{exp.designation}</Typography>
                  <Typography sx={{ fontSize: 11, color: "#888", mb: 0.5 }}>
                    {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: MUTED, mb: 0.25 }}>{exp.companyName}</Typography>
                  {exp.description && (
                    <Typography sx={{ fontSize: 11, color: MUTED }}>{exp.description}</Typography>
                  )}
                </Box>
              ))}
            </>
          )}

          {data.education && data.education.length > 0 && (
            <>
              <Bar />
              <Typography sx={{ fontSize: 14, fontWeight: 800, color: NAVY_TEXT, mb: 2 }}>EDUCATION</Typography>
              {data.education.map((edu, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>{edu.instituteName}</Typography>
                  <Typography sx={{ fontSize: 11, color: "#888", mb: 0.25 }}>
                    {formatRange(edu.startDate, edu.endDate)}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: MUTED }}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
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

const Bar = () => <Box sx={{ width: "100%", height: 4, bgcolor: CORAL, mb: 1 }} />;

export default CreamCoralTemplate;
