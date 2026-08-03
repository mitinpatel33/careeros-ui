// TwoColumnTemplate.tsx
import { Box, Paper, Typography } from "@mui/material";
import ResumeSection from "../components/ResumeSection";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/** Format a Date or string to "Mon YYYY" */
const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
};

/** Format a date range (start – end) */
const formatRange = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
) => {
  const startStr = formatDate(start);
  if (isCurrent || !end) return `${startStr} – Present`;
  return `${startStr} – ${formatDate(end)}`;
};

const TwoColumnTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const { personal, contact } = data;

  const fullName = personal
    ? `${personal?.firstName || ""} ${personal?.lastName || ""}`.trim()
    : "";

  // Location string from contact
  const location = contact
    ? [contact.address, contact.city, contact.state, contact.pincode]
        .filter(Boolean)
        .join(", ")
    : "";

  // Summary text – professional summary first, else career objective
  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        bgcolor: "#fff",
        color: config.textColor,
        border: "1px solid #e5e7eb",
        borderRadius: `${config.borderRadius}px`,
        overflow: "hidden",
        fontFamily: settings?.fontFamily ?? config.fontFamily,
        fontSize: settings?.fontSize ?? 12,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 4,
          bgcolor: config.primaryColor,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {fullName}
        </Typography>
        <Typography>{data.personal?.jobTitle}</Typography>
        <Typography sx={{ fontSize: settings?.fontSize ?? 13 }}>
          {data.contact?.email}
          {data.contact?.mobile ? ` | ${data.contact.mobile}` : ""}
        </Typography>
      </Box>

      {/* Two‑column body */}
      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, p: 4 }}>
        {/* Left Column */}
        <Box>
          {summaryText && (
            <ResumeSection
              title="Summary"
              config={config}
              settings={settings}
              sectionKey="summary"
            >
              <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
                {summaryText}
              </Typography>
            </ResumeSection>
          )}

          {data.experience?.length ? (
            <ResumeSection
              title="Experience"
              config={config}
              settings={settings}
              sectionKey="experience"
            >
              {data.experience.map((item, idx) => (
                <Box key={idx} sx={{ mb: 1.8 }}>
                  <Typography sx={{ fontWeight: 900 }}>
                    {item.designation}
                  </Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 12 }}>
                    {item.companyName}
                  </Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 12 }}>
                    {formatRange(
                      item.startDate,
                      item.endDate,
                      item.isCurrentCompany
                    )}
                  </Typography>
                  {item.description && (
                    <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
                      {item.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </ResumeSection>
          ) : null}

          {data.projects?.length ? (
            <ResumeSection
              title="Projects"
              config={config}
              settings={settings}
              sectionKey="projects"
            >
              {data.projects.map((item, idx) => (
                <Box key={idx} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 900 }}>
                    {item.projectName}
                  </Typography>
                  {item.technologies?.length ? (
                    <Typography sx={{ fontSize: settings?.fontSize ?? 12 }}>
                      {item.technologies.join(", ")}
                    </Typography>
                  ) : null}
                  {item.description && (
                    <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
                      {item.description}
                    </Typography>
                  )}
                </Box>
              ))}
            </ResumeSection>
          ) : null}
        </Box>

        {/* Right Column */}
        <Box>
          {data.skills?.length ? (
            <ResumeSection
              title="Skills"
              config={config}
              settings={settings}
              sectionKey="skills"
            >
              {data.skills.map((skill, idx) => (
                <Typography key={idx} sx={{ fontSize: settings?.fontSize ?? 14 }}>
                  • {skill.skillName}
                  {skill.proficiency ? ` (${skill.proficiency})` : ""}
                </Typography>
              ))}
            </ResumeSection>
          ) : null}

          {data.education?.length ? (
            <ResumeSection
              title="Education"
              config={config}
              settings={settings}
              sectionKey="education"
            >
              {data.education.map((item, idx) => (
                <Box key={idx} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 900 }}>
                    {item.degree}
                  </Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
                    {item.instituteName}
                  </Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 12 }}>
                    {formatRange(item.startDate, item.endDate)}
                    {item.grade ? ` | Grade: ${item.grade}` : ""}
                  </Typography>
                </Box>
              ))}
            </ResumeSection>
          ) : null}

          {data.certifications?.length ? (
            <ResumeSection
              title="Certifications"
              config={config}
              settings={settings}
              sectionKey="certifications"
            >
              {data.certifications.map((item, idx) => (
                <Typography key={idx} sx={{ fontSize: settings?.fontSize ?? 14 }}>
                  • {item.certificateName}
                  {item.issuedBy ? ` – ${item.issuedBy}` : ""}
                  {item.issuedDate
                    ? ` (${formatDate(item.issuedDate)})`
                    : ""}
                </Typography>
              ))}
            </ResumeSection>
          ) : null}

          {data.achievements?.length ? (
            <ResumeSection
              title="Achievements"
              config={config}
              settings={settings}
              sectionKey="achievements"
            >
              {data.achievements.map((item, idx) => (
                <Typography key={idx} sx={{ fontSize: settings?.fontSize ?? 14 }}>
                  • {item.title}
                  {item.description ? ` – ${item.description}` : ""}
                </Typography>
              ))}
            </ResumeSection>
          ) : null}

          {/* Optional: Languages (if you want to add them) */}
          {data.languages?.length ? (
            <ResumeSection
              title="Languages"
              config={config}
              settings={settings}
              sectionKey="languages"
            >
              {data.languages.map((lang, idx) => (
                <Typography key={idx} sx={{ fontSize: settings?.fontSize ?? 14 }}>
                  • {lang.languageName}
                  {lang.proficiencyLevel
                    ? ` (${lang.proficiencyLevel})`
                    : ""}
                </Typography>
              ))}
            </ResumeSection>
          ) : null}
        </Box>
      </Box>
    </Paper>
  );
};

export default TwoColumnTemplate;