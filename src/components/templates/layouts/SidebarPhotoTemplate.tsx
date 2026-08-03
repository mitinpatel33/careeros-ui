// SidebarPhotoTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

/** Format a date to "Mon YYYY" */
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

const SidebarPhotoTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();

  // Summary – use professionalSummary, fallback to careerObjective
  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        display: "flex",
        fontFamily: settings?.fontFamily ?? "Segoe UI, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: "35%",
          bgcolor: "#2c3e50",
          color: "#ecf0f1",
          p: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Photo */}
        <Box
          sx={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            bgcolor: "#bdc3c7",
            mx: "auto",
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.5em",
            overflow: "hidden",
          }}
        >
          {data.personal?.photoUrl ? (
            <img
              src={data.personal.photoUrl}
              alt="profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            "👤"
          )}
        </Box>

        <Typography
          variant="subtitle1"
          sx={{ borderBottom: "1px solid #7f8c8d", mb: 2, pb: 0.5 }}
        >
          Contact
        </Typography>
        {data.contact?.email && <Typography>📧 {data.contact.email}</Typography>}
        {data.contact?.mobile && <Typography>📞 {data.contact.mobile}</Typography>}
        {data.contact?.city && <Typography>📍 {data.contact.city}</Typography>}
        {data.contact?.address && (
          <Typography>🏠 {data.contact.address}</Typography>
        )}

        {/* Social Links (optional) */}
        {data.social && (
          <>
            <Typography
              variant="subtitle1"
              sx={{ borderBottom: "1px solid #7f8c8d", mt: 3, mb: 1 }}
            >
              Links
            </Typography>
            {data.social.linkedInUrl && (
              <Typography sx={{ wordBreak: "break-all" }}>
                🔗 {data.social.linkedInUrl}
              </Typography>
            )}
            {data.social.gitHubUrl && (
              <Typography sx={{ wordBreak: "break-all" }}>
                💻 {data.social.gitHubUrl}
              </Typography>
            )}
            {data.social.portfolioUrl && (
              <Typography sx={{ wordBreak: "break-all" }}>
                🎨 {data.social.portfolioUrl}
              </Typography>
            )}
          </>
        )}

        {/* Skills */}
        {data.skills && data.skills?.length > 0 && (
          <>
            <Typography
              variant="subtitle1"
              sx={{ borderBottom: "1px solid #7f8c8d", mt: 3, mb: 1 }}
            >
              Skills
            </Typography>
            <ul style={{ paddingLeft: 16, margin: 0 }}>
              {data.skills.map((skill, i) => (
                <li key={i}>
                  {skill.skillName}
                  {skill.proficiency ? ` (${skill.proficiency})` : ""}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Languages (optional) */}
        {data.languages && data.languages?.length > 0 && (
          <>
            <Typography
              variant="subtitle1"
              sx={{ borderBottom: "1px solid #7f8c8d", mt: 3, mb: 1 }}
            >
              Languages
            </Typography>
            <ul style={{ paddingLeft: 16, margin: 0 }}>
              {data.languages.map((lang, i) => (
                <li key={i}>
                  {lang.languageName}
                  {lang.proficiencyLevel ? ` – ${lang.proficiencyLevel}` : ""}
                </li>
              ))}
            </ul>
          </>
        )}
      </Box>

      {/* Main Content */}
      <Box sx={{ width: "65%", p: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          {fullName}
        </Typography>
        <Typography sx={{ color: "#7f8c8d", mb: 2 }}>
          {data.personal?.jobTitle}
        </Typography>

        {summaryText && <Section title="Profile">{summaryText}</Section>}

        {/* Experience */}
        {data.experience && data.experience?.length > 0 && (
          <Section title="Experience">
            {data.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 600 }}>
                  {exp.designation}
                  {exp.companyName ? ` – ${exp.companyName}` : ""}
                </Typography>
                <Typography sx={{ fontStyle: "italic", color: "#555" }}>
                  {formatRange(
                    exp.startDate,
                    exp.endDate,
                    exp.isCurrentCompany
                  )}
                  {exp.employmentType ? ` (${exp.employmentType})` : ""}
                </Typography>
                {exp.description && <Typography>{exp.description}</Typography>}
              </Box>
            ))}
          </Section>
        )}

        {/* Education */}
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
                {edu.fieldOfStudy ? ` | Field: ${edu.fieldOfStudy}` : ""}
              </Typography>
            ))}
          </Section>
        )}

        {/* Certifications (optional) */}
        {data.certifications && data.certifications?.length > 0 && (
          <Section title="Certifications">
            {data.certifications.map((cert, i) => (
              <Typography key={i}>
                <strong>{cert.certificateName}</strong>
                {cert.issuedBy ? ` – ${cert.issuedBy}` : ""}
                {cert.issuedDate ? ` (${formatDate(cert.issuedDate)})` : ""}
              </Typography>
            ))}
          </Section>
        )}

        {/* Achievements (optional) */}
        {data.achievements && data.achievements?.length > 0 && (
          <Section title="Achievements">
            {data.achievements.map((ach, i) => (
              <Typography key={i}>
                • {ach.title}
                {ach.description ? ` – ${ach.description}` : ""}
              </Typography>
            ))}
          </Section>
        )}
      </Box>
    </Paper>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      variant="subtitle1"
      sx={{
        fontWeight: 600,
        borderBottom: `2px solid #3498db`,
        pb: 0.5,
        mb: 1,
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

export default SidebarPhotoTemplate;