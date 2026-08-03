// FuturisticGradientTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

// ----- Helper functions for date/duration formatting -----
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

// ----------------------------------------------------------------------
const FuturisticGradientTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Determine a website/social URL to display (pick one)
  const website = data.social?.portfolioUrl || data.social?.linkedInUrl || data.social?.websiteUrl || "";

  // Summary: use professionalSummary; fallback to careerObjective
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        color: "#fff",
        p: 5,
        borderRadius: "20px",
        border: "1px solid rgba(255,255,255,0.2)",
        fontFamily: settings?.fontFamily ?? "Orbitron, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        backdropFilter: "blur(15px)",
      }}
    >
      {/* Name with gradient text */}
      <Typography
        variant="h2"
        sx={{
          background: "linear-gradient(to right, #00f2fe, #4facfe)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {fullName}
      </Typography>
      <Typography sx={{ color: "#b3e5fc", mb: 3 }}>
        {data.personal?.jobTitle}
      </Typography>

      {/* Contact info – uses mobile instead of phone, and social website */}
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mb: 3, color: "#cfd8dc" }}>
        {data.contact?.email && <span>📧 {data.contact.email}</span>}
        {data.contact?.mobile && <span>📞 {data.contact.mobile}</span>}
        {website && <span>🌐 {website}</span>}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {/* Left column */}
        <Box>
          {summaryText && <Section title="Profile">{summaryText}</Section>}

          {/* Skills – map array of objects to skill names */}
          {data.skills && data.skills.length > 0 && (
            <Section title="Core Tech">
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.skills.map((skill, i) => (
                  <Box
                    key={i}
                    sx={{
                      border: "1px solid #00e5ff",
                      bgcolor: "rgba(0,229,255,0.1)",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: "15px",
                    }}
                  >
                    {skill.skillName}
                    {skill.proficiency ? ` (${skill.proficiency})` : ""}
                  </Box>
                ))}
              </Box>
            </Section>
          )}
        </Box>

        {/* Right column */}
        <Box>
          {/* Experience – compute duration dynamically */}
          {data.experience && data.experience.length > 0 && (
            <Section title="Experience">
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600, color: "#fff" }}>
                    {exp.designation || ""}
                    {exp.companyName ? ` – ${exp.companyName}` : ""}
                  </Typography>
                  <Typography sx={{ color: "#90a4ae", fontSize: "0.85em" }}>
                    {formatDuration(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                  {exp.description && (
                    <Typography sx={{ color: "#b0bec5" }}>
                      {exp.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </Section>
          )}

          {/* Education – use instituteName instead of university */}
          {data.education && data.education.length > 0 && (
            <Section title="Education">
              {data.education.map((edu, i) => (
                <Typography key={i} sx={{ color: "#e0e0e0" }}>
                  <strong>{edu.degree || ""}</strong>
                  {edu.instituteName ? ` – ${edu.instituteName}` : ""}
                  {edu.startDate || edu.endDate
                    ? `, ${formatDuration(edu.startDate, edu.endDate)}`
                    : ""}
                  {edu.grade ? ` | Grade: ${edu.grade}` : ""}
                </Typography>
              ))}
            </Section>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

// Reusable section title component
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="subtitle1"
      sx={{
        color: "#00e5ff",
        textTransform: "uppercase",
        letterSpacing: 2,
        borderBottom: "1px solid rgba(79,172,254,0.2)",
        pb: 0.5,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default FuturisticGradientTemplate;