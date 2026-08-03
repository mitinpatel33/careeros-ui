// InfographicTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";
import type { ResumeData } from "../../../types/candidate/resume.types";

// ---------- helpers ----------
const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} – Present`;
  return `${s} – ${formatDate(end)}`;
};

/** Calculate total years of experience (approximate) */
const calcTotalYears = (exps: ResumeData['experience']) => {
  if (!exps || exps.length === 0) return 0;
  let totalMonths = 0;
  exps.forEach(exp => {
    const start = exp.startDate ? new Date(exp.startDate) : null;
    const end = exp.isCurrentCompany || !exp.endDate ? new Date() : new Date(exp.endDate);
    if (start && end && start < end) {
      const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
      totalMonths += Math.max(0, months);
    }
  });
  return Math.floor(totalMonths / 12);
};
// -------------------------------

const InfographicTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Derived stats
  const yearsExp = calcTotalYears(data.experience);
  const projectsCount = data.projects?.length ?? 0;
  const skillsCount = data.skills?.length ?? 0;
  const certsCount = data.certifications?.length ?? 0;

  // Contact line – pick website from social if available
  const website = data.social?.portfolioUrl || data.social?.websiteUrl || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 4,
        bgcolor: "#fff",
        border: "2px dashed #ffb6c1",
        borderRadius: "20px",
        fontFamily: settings?.fontFamily ?? "Comic Sans MS",
        fontSize: settings?.fontSize ?? 12,
      }}
    >
      <Typography variant="h3" sx={{ textAlign: "center", color: "#d63384" }}>
        {fullName}
      </Typography>
      <Typography sx={{ textAlign: "center", color: "#888" }}>
        {data.personal?.jobTitle}
      </Typography>

      {/* Contact row – uses mobile and website */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", my: 2 }}>
        {data.contact?.email && <span>📧 {data.contact.email}</span>}
        {data.contact?.mobile && <span>📞 {data.contact.mobile}</span>}
        {website && <span>🌐 {website}</span>}
      </Box>

      {/* Stat boxes */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, my: 3 }}>
        <StatBox label="Years Exp." value={yearsExp > 0 ? `${yearsExp}+` : "N/A"} />
        <StatBox label="Projects" value={projectsCount} />
        <StatBox label="Skills" value={skillsCount} />
        <StatBox label="Certifications" value={certsCount} />
      </Box>

      {/* Two‑column content */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4 }}>
        {/* Left column: Experience */}
        <Box>
          {data.experience && data.experience?.length > 0 && (
            <Section title="Experience">
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 2 }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {exp.designation || ""}
                    {exp.companyName ? ` – ${exp.companyName}` : ""}
                  </Typography>
                  <Typography sx={{ color: "#999" }}>
                    {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                    {exp.employmentType ? ` (${exp.employmentType})` : ""}
                  </Typography>
                  {exp.description && <Typography>{exp.description}</Typography>}
                </Box>
              ))}
            </Section>
          )}
        </Box>

        {/* Right column: Education + Skills */}
        <Box>
          {data.education && data.education?.length > 0 && (
            <Section title="Education">
              {data.education.map((edu, i) => (
                <Typography key={i}>
                  <strong>{edu.degree}</strong>
                  {edu.instituteName ? ` – ${edu.instituteName}` : ""}
                  {edu.startDate || edu.endDate
                    ? `, ${formatRange(edu.startDate, edu.endDate)}`
                    : ""}
                  {edu.grade ? ` | Grade: ${edu.grade}` : ""}
                </Typography>
              ))}
            </Section>
          )}

          {data.skills && data.skills?.length > 0 && (
            <Section title="Skills">
              <Typography>
                {data.skills.map(s => s.skillName).join(" • ")}
              </Typography>
            </Section>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

// ---------- sub-components ----------
const StatBox = ({ label, value }: { label: string; value: string | number }) => (
  <Box sx={{ bgcolor: "#fff0f5", borderRadius: "12px", p: 2, textAlign: "center" }}>
    <Typography sx={{ fontSize: "2em", color: "#d63384", fontWeight: "bold" }}>
      {value}
    </Typography>
    <Typography sx={{ fontSize: "0.85em", color: "#555" }}>{label}</Typography>
  </Box>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="h6"
      sx={{ color: "#d63384", borderBottom: "1px dotted #ffb6c1", pb: 0.5, mb: 1 }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default InfographicTemplate;