// GreenExecutiveTemplate.tsx
import { Box, Typography, Paper, Avatar } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const GREEN = "#6e8f3e";
const DARK = "#1a1a1a";
const MUTED = "#444";

const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
};
const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} - Present`;
  return `${s} - ${formatDate(end)}`;
};

const GreenExecutiveTemplate = ({ data, settings }: TemplateRenderProps) => {
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
        gridTemplateColumns: "1fr 220px",
      }}
    >
      {/* ===== MAIN COLUMN ===== */}
      <Box sx={{ pl: 5, pr: 3, py: 4 }}>
        <Typography sx={{ fontSize: 22, fontWeight: 800, color: DARK }}>
          {fullName}
          {data.personal?.credentials && `, ${data.personal.credentials}`}
        </Typography>
        {data.personal?.jobTitle && (
          <Typography sx={{ fontSize: 13, color: GREEN, fontWeight: 700, mb: 2 }}>
            {data.personal.jobTitle}
          </Typography>
        )}
        {summaryText && (
          <Typography sx={{ fontSize: 11.5, color: MUTED, mb: 3, textAlign: "justify" }}>{summaryText}</Typography>
        )}

        {data.experience && data.experience.length > 0 && (
          <>
            <MainHeading title="Professional Experience" />
            {data.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 2.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: DARK }}>
                    {exp.companyName}{data.contact?.city ? `, ${data.contact.city}` : ""}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#777" }}>
                    {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 12.5, fontStyle: "italic", color: "#555", mb: 0.5 }}>
                  {exp.designation}
                </Typography>
                {exp.description && (
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    {exp.description.split(/\n+/).filter(Boolean).map((line, j) => (
                      <Typography component="li" key={j} sx={{ fontSize: 12, color: MUTED }}>{line}</Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </>
        )}

        {data.education && data.education.length > 0 && (
          <>
            <MainHeading title="Education" />
            {data.education.map((edu, i) => (
              <Box key={i} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Box>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {edu.degree}{edu.fieldOfStudy ? ` (${edu.fieldOfStudy})` : ""}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#666" }}>{edu.instituteName}</Typography>
                </Box>
                <Typography sx={{ fontSize: 11.5, color: "#777" }}>
                  {formatRange(edu.startDate, edu.endDate)}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Box>

      {/* ===== RIGHT PANEL ===== */}
      <Box sx={{ bgcolor: GREEN, color: "#fff", px: 3, py: 4 }}>
        <Avatar src={photoUrl} sx={{ width: 90, height: 90, mb: 2 }} />
        {(data.contact?.address || data.contact?.city) && (
          <Typography sx={{ fontSize: 11, mb: 0.5 }}>
            {[data.contact?.address, data.contact?.city].filter(Boolean).join(", ")}
          </Typography>
        )}
        {data.contact?.mobile && <Typography sx={{ fontSize: 11, mb: 0.5 }}>{data.contact.mobile}</Typography>}
        {data.contact?.email && <Typography sx={{ fontSize: 11, mb: 3 }}>{data.contact.email}</Typography>}

        {data.skills && data.skills.length > 0 && (
          <>
            <Typography sx={{ fontSize: 15, fontWeight: 800, mb: 1.5 }}>Key Skills</Typography>
            {data.skills.map((s, i) => (
              <Typography key={i} sx={{ fontSize: 11, mb: 0.75, lineHeight: 1.3 }}>{s.skillName}</Typography>
            ))}
          </>
        )}
      </Box>
    </Paper>
  );
};

const MainHeading = ({ title }: { title: string }) => (
  <Box sx={{ mb: 1.5, mt: 1 }}>
    <Typography sx={{ fontSize: 14, fontWeight: 800, color: "#fff", bgcolor: GREEN, px: 1.5, py: 0.5, display: "inline-block" }}>
      {title}
    </Typography>
  </Box>
);

export default GreenExecutiveTemplate;
