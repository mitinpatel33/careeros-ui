// GreenDiamondTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const GREEN = "#5a8f3c";
const GREEN_DARK = "#3f6b2a";
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

/** Map proficiency to a percentage for the bar chart */
const proficiencyToPercent = (p?: string | number) => {
  if (typeof p === "number") return Math.max(0, Math.min(100, p));
  switch ((p ?? "").toLowerCase()) {
    case "beginner": return 30;
    case "intermediate": return 60;
    case "advanced": return 85;
    case "expert": return 100;
    default: return 70;
  }
};

const GreenDiamondTemplate = ({ data, settings }: TemplateRenderProps) => {
  const photoUrl = data.personal?.photoUrl ?? data.personal?.photoUrl;
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        fontFamily: settings?.fontFamily ?? "'Segoe UI', Arial, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        bgcolor: "#fff",
        color: DARK,
        display: "grid",
        gridTemplateColumns: "260px 1fr",
      }}
    >
      {/* ===== LEFT COLUMN ===== */}
      <Box sx={{ px: 3, pt: 5, pb: 4 }}>
        {/* diamond photo */}
        <Box
          sx={{
            width: 160,
            height: 160,
            mx: "auto",
            mb: 3,
            border: `3px solid ${GREEN}`,
            transform: "rotate(45deg)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Box
            component="img"
            src={photoUrl}
            sx={{
              position: "absolute",
              width: "142%",
              height: "142%",
              top: "-21%",
              left: "-21%",
              transform: "rotate(-45deg)",
              objectFit: "cover",
            }}
          />
        </Box>

        <Typography sx={{ fontSize: 22, fontWeight: 800, color: DARK, lineHeight: 1.2 }}>
          {data.personal?.firstName}
          <br />
          {data.personal?.lastName}
        </Typography>
        {data.personal?.jobTitle && (
          <Typography sx={{ fontSize: 13, color: GREEN_DARK, fontWeight: 600, mb: 3 }}>
            {data.personal.jobTitle}
          </Typography>
        )}

        {summaryText && (
          <>
            <SideHeading title="Profile" />
            <Typography sx={{ fontSize: 11.5, color: MUTED, mb: 3, textAlign: "justify" }}>
              {summaryText}
            </Typography>
          </>
        )}

        <SideHeading title="Contact" />
        <Box sx={{ mb: 1 }}>
          {data.contact?.mobile && <Typography sx={{ fontSize: 11.5, color: MUTED }}>Phone: {data.contact.mobile}</Typography>}
          {data.social?.websiteUrl && <Typography sx={{ fontSize: 11.5, color: MUTED }}>Website: {data.social?.websiteUrl}</Typography>}
          {data.contact?.email && <Typography sx={{ fontSize: 11.5, color: MUTED }}>Email: {data.contact.email}</Typography>}
        </Box>
      </Box>

      {/* ===== RIGHT COLUMN ===== */}
      <Box sx={{ pr: 4, pt: 3 }}>
        {data.education && data.education.length > 0 && (
          <>
            <MainHeading title="Education" />
            {data.education.map((edu, i) => (
              <Box key={i} sx={{ mb: 2, px: 3 }}>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>{edu.instituteName}</Typography>
                <Typography sx={{ fontSize: 11, color: "#888", mb: 0.5 }}>
                  {formatRange(edu.startDate, edu.endDate)}
                </Typography>
                <Typography sx={{ fontSize: 11.5, color: MUTED }}>
                  {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  {edu.grade ? `, GPA: ${edu.grade}` : ""}
                </Typography>
              </Box>
            ))}
          </>
        )}

        {data.experience && data.experience.length > 0 && (
          <>
            <MainHeading title="Work Experience" />
            {data.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 2, px: 3 }}>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                  {exp.companyName} {exp.designation ? `– ${exp.designation}` : ""}
                </Typography>
                <Typography sx={{ fontSize: 11, color: "#888", mb: 0.5 }}>
                  {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                </Typography>
                {exp.description && (
                  <Typography sx={{ fontSize: 11.5, color: MUTED }}>{exp.description}</Typography>
                )}
              </Box>
            ))}
          </>
        )}

        {data.skills && data.skills.length > 0 && (
          <>
            <MainHeading title="Skills" />
            <Box sx={{ px: 3 }}>
              {data.skills.map((s, i) => {
                const pct = proficiencyToPercent(s.proficiency);
                return (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1.25 }}>
                    <Typography sx={{ fontSize: 11.5, color: MUTED, width: 110, flexShrink: 0 }}>
                      Skill #{i + 1}: {s.skillName}
                    </Typography>
                    <Box sx={{ flex: 1, height: 8, bgcolor: "#e6e6e6", borderRadius: "4px", position: "relative" }}>
                      <Box sx={{ width: `${pct}%`, height: "100%", bgcolor: GREEN, borderRadius: "4px" }} />
                    </Box>
                    <Typography sx={{ fontSize: 10.5, color: "#888", width: 32 }}>{pct}%</Typography>
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

const SideHeading = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: 14, fontWeight: 800, color: DARK, mb: 1, borderBottom: `2px solid ${GREEN}`, pb: 0.5 }}>
    {title.toUpperCase()}
  </Typography>
);

const MainHeading = ({ title }: { title: string }) => (
  <Box sx={{ bgcolor: GREEN_DARK, py: 1, px: 3, mb: 2 }}>
    <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#fff", letterSpacing: "0.5px" }}>
      {title.toUpperCase()}
    </Typography>
  </Box>
);

export default GreenDiamondTemplate;
