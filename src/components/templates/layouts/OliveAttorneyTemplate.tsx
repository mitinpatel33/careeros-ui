// OliveAttorneyTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const OLIVE = "#7a7d3f";
const SAGE_BG = "#d9d9c8";
const DARK = "#1a1a1a";
const MUTED = "#444";

const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" }).toUpperCase();
};
const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} — PRESENT`;
  return `${s} — ${formatDate(end)}`;
};

const OliveAttorneyTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        fontFamily: settings?.fontFamily ?? "Georgia, serif",
        fontSize: settings?.fontSize ?? 12,
        bgcolor: "#fff",
        color: DARK,
      }}
    >
      {/* ===== HEADER BAND ===== */}
      <Box sx={{ bgcolor: SAGE_BG, px: 5, py: 4 }}>
        <Typography sx={{ fontSize: 34, fontWeight: 800, color: DARK, letterSpacing: "1px" }}>
          {fullName.toUpperCase()}
        </Typography>
        {data.personal?.jobTitle && (
          <Typography sx={{ fontSize: 15, color: OLIVE, fontWeight: 700, mt: 0.5 }}>
            {data.personal.jobTitle.toUpperCase()}
          </Typography>
        )}
      </Box>

      {/* ===== BODY ===== */}
      <Box sx={{ display: "grid", gridTemplateColumns: "230px 1fr", px: 5, py: 4, columnGap: 4 }}>
        {/* left column */}
        <Box>
          <SectionLabel title="Contact" />
          <Box sx={{ mb: 3 }}>
            {data.contact?.address && <Typography sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>{data.contact.address}</Typography>}
            {data.contact?.city && <Typography sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>{data.contact.city}</Typography>}
            {data.contact?.mobile && <Typography sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>{data.contact.mobile}</Typography>}
            {data.contact?.email && <Typography sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>{data.contact.email}</Typography>}
            {data.social?.websiteUrl && <Typography sx={{ fontSize: 12, color: MUTED }}>{data.social?.websiteUrl}</Typography>}
          </Box>

          {data.education && data.education.length > 0 && (
            <>
              <SectionLabel title="Education" />
              <Box sx={{ mb: 3 }}>
                {data.education.map((edu, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: DARK }}>
                      {edu.degree?.toUpperCase()} • {formatDate(edu.endDate)}
                    </Typography>
                    <Typography sx={{ fontSize: 11.5, color: MUTED }}>{edu.instituteName}</Typography>
                  </Box>
                ))}
              </Box>
            </>
          )}

          {data.skills && data.skills.length > 0 && (
            <>
              <SectionLabel title="Key Skills" />
              <Box sx={{ mb: 3 }}>
                {data.skills.map((s, i) => (
                  <Typography key={i} sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>{s.skillName}</Typography>
                ))}
              </Box>
            </>
          )}

          {data.achievements && data.achievements.length > 0 && (
            <>
              <SectionLabel title="Interests" />
              <Box>
                {data.achievements.map((a, i) => (
                  <Typography key={i} sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>{a.title}</Typography>
                ))}
              </Box>
            </>
          )}
        </Box>

        {/* right column */}
        <Box>
          {summaryText && (
            <>
              <SectionLabel title="Summary" />
              <Typography sx={{ fontSize: 12, color: MUTED, mb: 3, textAlign: "justify" }}>{summaryText}</Typography>
            </>
          )}

          {data.experience && data.experience.length > 0 && (
            <>
              <SectionLabel title="Work Experience" />
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: OLIVE }}>
                    {exp.designation?.toUpperCase()} • {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#777", mb: 0.5 }}>
                    {exp.companyName}{data.contact?.city ? `, ${data.contact.city}` : ""}
                  </Typography>
                  {exp.description && (
                    <Typography sx={{ fontSize: 12, color: MUTED, textAlign: "justify" }}>{exp.description}</Typography>
                  )}
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

const SectionLabel = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: 13, fontWeight: 800, color: OLIVE, letterSpacing: "1px", mb: 1.25 }}>
    {title.toUpperCase()}
  </Typography>
);

export default OliveAttorneyTemplate;
