// MauveSidebarTemplate.tsx
import { Box, Typography, Paper, Avatar } from "@mui/material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const MAUVE = "#8f5468";
const DARK = "#1a1a1a";
const MUTED = "#555";
const TOTAL_SEGMENTS = 8;

const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).getFullYear().toString();
};
const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} - Present`;
  return `${s} - ${formatDate(end)}`;
};

const proficiencyToSegments = (p?: string | number) => {
  if (typeof p === "number") return Math.max(0, Math.min(TOTAL_SEGMENTS, Math.round(p)));
  switch ((p ?? "").toLowerCase()) {
    case "beginner": return 3;
    case "intermediate": return 5;
    case "advanced": return 7;
    case "expert": return 8;
    default: return 6;
  }
};

const MauveSidebarTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();
  const photoUrl = data.personal?.photoUrl ?? data.personal?.profileImage;
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
        gridTemplateColumns: "230px 1fr",
        overflow: "hidden",
      }}
    >
      {/* ===== SIDEBAR ===== */}
      <Box sx={{ bgcolor: MAUVE, color: "#fff", px: 3, py: 4 }}>
        <Avatar src={photoUrl} sx={{ width: 90, height: 90, mb: 2, border: "3px solid #fff" }} />
        <Typography sx={{ fontSize: 22, fontWeight: 800, lineHeight: 1.2, mb: 0.5 }}>
          {fullName.toUpperCase()}
        </Typography>
        {data.personal?.jobTitle && (
          <Typography sx={{ fontSize: 12, color: "#f0dfe4", mb: 3 }}>{data.personal.jobTitle}</Typography>
        )}

        {summaryText && (
          <>
            <SideHeading title="About Me" />
            <Typography sx={{ fontSize: 11, color: "#f0dfe4", mb: 3 }}>{summaryText}</Typography>
          </>
        )}

        {data.education && data.education.length > 0 && (
          <>
            <SideHeading title="Education" />
            <Box sx={{ mb: 3 }}>
              {data.education.map((edu, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{formatDate(edu.endDate)}</Typography>
                  <Typography sx={{ fontSize: 11.5 }}>
                    {edu.degree}{edu.fieldOfStudy ? `: ${edu.fieldOfStudy}` : ""}
                  </Typography>
                  <Typography sx={{ fontSize: 10.5, color: "#f0dfe4" }}>{edu.instituteName}</Typography>
                </Box>
              ))}
            </Box>
          </>
        )}

        <SideHeading title="Contact" />
        {data.contact?.mobile && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
            <WhatsAppIcon sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: 11 }}>{data.contact.mobile}</Typography>
          </Box>
        )}
        {data.contact?.email && (
          <Typography sx={{ fontSize: 11, color: "#f0dfe4" }}>{data.contact.email}</Typography>
        )}
      </Box>

      {/* ===== MAIN ===== */}
      <Box sx={{ px: 4, py: 4 }}>
        {data.experience && data.experience.length > 0 && (
          <>
            <MainHeading title="Experience Detail" />
            <Box sx={{ position: "relative", pl: 3 }}>
              <Box sx={{ position: "absolute", left: 4, top: 6, bottom: 6, width: "1px", bgcolor: "#ccc" }} />
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ position: "relative", mb: 3 }}>
                  <Box
                    sx={{
                      position: "absolute",
                      left: -23,
                      top: 4,
                      width: 9,
                      height: 9,
                      borderRadius: "50%",
                      border: `2px solid ${MAUVE}`,
                      bgcolor: "#fff",
                    }}
                  />
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: DARK }}>{exp.companyName}</Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#888", mb: 0.5 }}>
                    {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                  {exp.description && (
                    <Typography sx={{ fontSize: 11.5, color: MUTED }}>{exp.description}</Typography>
                  )}
                </Box>
              ))}
            </Box>
          </>
        )}

        {data.skills && data.skills.length > 0 && (
          <>
            <MainHeading title="Skills Program" />
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", columnGap: 4, rowGap: 1 }}>
              {data.skills.map((s, i) => (
                <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Typography sx={{ fontSize: 11.5, color: DARK, width: 90, flexShrink: 0 }}>{s.skillName}</Typography>
                  <Box sx={{ display: "flex", gap: "2px" }}>
                    {Array.from({ length: TOTAL_SEGMENTS }).map((_, d) => (
                      <Box
                        key={d}
                        sx={{
                          width: 10,
                          height: 4,
                          bgcolor: d < proficiencyToSegments(s.proficiency) ? MAUVE : "#e0e0e0",
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </>
        )}

        {data.achievements && data.achievements.length > 0 && (
          <>
            <MainHeading title="Reference" />
            <Box sx={{ display: "flex", gap: 4 }}>
              {data.achievements.slice(0, 2).map((a, i) => (
                <Box key={i}>
                  <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{a.title}</Typography>
                  <Typography sx={{ fontSize: 11, color: "#777" }}>{a.description}</Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

const SideHeading = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: 14, fontWeight: 800, letterSpacing: "0.5px", mb: 1.5, mt: 1 }}>
    {title.toUpperCase()}
  </Typography>
);

const MainHeading = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: 15, fontWeight: 800, color: MAUVE, mb: 2, mt: 1, letterSpacing: "0.5px" }}>
    {title.toUpperCase()}
  </Typography>
);

export default MauveSidebarTemplate;
