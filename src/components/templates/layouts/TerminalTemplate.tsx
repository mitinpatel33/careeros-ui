// TerminalTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/* ---------- helpers ---------- */
const formatDate = (date?: Date | string): string => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const formatDuration = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
): string => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} – Present`;
  return `${s} – ${formatDate(end)}`;
};

/* ---------- component ---------- */
const TerminalTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Choose the most relevant summary text
  const summaryText =
    data.summary?.professionalSummary ||
    data.summary?.careerObjective ||
    "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        bgcolor: "#1a1a1a",
        color: "#00ff00",
        p: 4,
        fontFamily: "'Courier New', monospace",
        fontSize: settings?.fontSize ?? 14,
        border: "1px solid #00ff0033",
        borderRadius: "8px",
      }}
    >
      {/* Name */}
      <Typography
        sx={{
          borderBottom: "1px dashed #00ff00",
          pb: 1,
          fontSize: "1.5em",
        }}
      >
        &gt; whoami{" "}
        <span style={{ color: "#00ccff", fontWeight: "bold" }}>
          {fullName}
        </span>
      </Typography>

      {/* Title */}
      <Box sx={{ my: 1 }}>
        <span style={{ color: "#ffaa00" }}>$ title</span>{" "}
        <span style={{ color: "#cccccc" }}>
          {data.personal?.jobTitle}
        </span>
      </Box>

      {/* Contact – using 'mobile' instead of 'phone' */}
      <Box>
        <span style={{ color: "#ffaa00" }}>$ contact</span>{" "}
        <span style={{ color: "#cccccc" }}>
          {[
            data.contact?.email,
            data.contact?.mobile,
            data.contact?.city,
          ]
            .filter(Boolean)
            .join(" | ")}
        </span>
      </Box>

      {/* Summary */}
      <Box sx={{ mt: 2 }}>
        <span style={{ color: "#ffaa00" }}>$ cat summary</span>
      </Box>
      <Box sx={{ ml: 3, color: "#cccccc" }}>{summaryText}</Box>

      {/* Experience – computed duration */}
      <Box sx={{ mt: 2 }}>
        <span style={{ color: "#ffaa00" }}>$ ls experience/</span>
      </Box>
      <Box sx={{ ml: 3, color: "#cccccc" }}>
        {data.experience?.map((exp, i) => {
          const duration = formatDuration(
            exp.startDate,
            exp.endDate,
            exp.isCurrentCompany
          );
          return (
            <div key={i}>
              {duration} {exp.designation} @ {exp.companyName}
              {/* Optional: show a one‑line snippet if description exists */}
              {exp.description ? ` — ${exp.description}` : ""}
            </div>
          );
        })}
      </Box>

      {/* Skills – from array of objects to comma‑separated list */}
      <Box sx={{ mt: 2 }}>
        <span style={{ color: "#ffaa00" }}>$ skills</span>
      </Box>
      <Box sx={{ ml: 3, color: "#cccccc" }}>
        {data.skills
          ?.map(
            (s) =>
              `${s.skillName}${
                s.proficiency ? ` (${s.proficiency})` : ""
              }`
          )
          .join(", ") || ""}
      </Box>

      {/* Education – using instituteName, computed year range */}
      <Box sx={{ mt: 2 }}>
        <span style={{ color: "#ffaa00" }}>$ education</span>
      </Box>
      <Box sx={{ ml: 3, color: "#cccccc" }}>
        {data.education?.map((edu, i) => {
          const yearRange = formatDuration(
            edu.startDate,
            edu.endDate
          );
          return (
            <div key={i}>
              {edu.degree} - {edu.instituteName}
              {yearRange ? ` (${yearRange})` : ""}
              {edu.grade ? ` [${edu.grade}]` : ""}
            </div>
          );
        })}
      </Box>

      {/* Optional: add Projects, Certifications, Achievements if you want */}
      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <>
          <Box sx={{ mt: 2 }}>
            <span style={{ color: "#ffaa00" }}>$ projects</span>
          </Box>
          <Box sx={{ ml: 3, color: "#cccccc" }}>
            {data.projects.map((p, i) => (
              <div key={i}>
                {p.projectName} [{p.technologies?.join(", ")}]{" "}
                {p.projectUrl ? `(${p.projectUrl})` : ""}
              </div>
            ))}
          </Box>
        </>
      )}

      {/* Certifications */}
      {data.certifications && data.certifications.length > 0 && (
        <>
          <Box sx={{ mt: 2 }}>
            <span style={{ color: "#ffaa00" }}>$ certs</span>
          </Box>
          <Box sx={{ ml: 3, color: "#cccccc" }}>
            {data.certifications.map((c, i) => (
              <div key={i}>
                {c.certificateName} – {c.issuedBy}
                {c.issuedDate ? ` (${formatDate(c.issuedDate)})` : ""}
              </div>
            ))}
          </Box>
        </>
      )}

      {/* Achievements */}
      {data.achievements && data.achievements.length > 0 && (
        <>
          <Box sx={{ mt: 2 }}>
            <span style={{ color: "#ffaa00" }}>$ achievements</span>
          </Box>
          <Box sx={{ ml: 3, color: "#cccccc" }}>
            {data.achievements.map((a, i) => (
              <div key={i}>
                ★ {a.title}
                {a.description ? `: ${a.description}` : ""}
              </div>
            ))}
          </Box>
        </>
      )}
    </Paper>
  );
};

export default TerminalTemplate;