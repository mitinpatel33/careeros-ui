// NavySidebarReferenceTemplate.tsx
import { Box, Typography, Paper, Divider } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

// Colours
const SIDEBAR_BG = "#1a2b4c";    // deep blue
const SIDEBAR_TEXT = "#ffffff";
const MAIN_TEXT = "#1a1a1a";
const MUTED = "#555";
const LIGHT_MUTED = "#888";

// Date helpers
const formatDate = (d?: Date | string) => {
  if (!d) return "";
  const date = new Date(d);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${date.getFullYear()}-${month}`;
};

const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} - Present`;
  return `${s} - ${formatDate(end)}`;
};

const NavySidebarReferenceTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";

  // Contact lines (for sidebar)
  const contactLines: string[] = [];
  if (data.contact?.address || data.contact?.city || data.contact?.state || data.contact?.pincode) {
    const parts = [data.contact.address, data.contact.city, data.contact.state, data.contact.pincode].filter(Boolean);
    contactLines.push(parts.join(", "));
  }
  if (data.contact?.mobile) contactLines.push(data.contact.mobile);
  if (data.contact?.email) contactLines.push(data.contact.email);
  if (data.social?.websiteUrl) contactLines.push(data.social?.websiteUrl);

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        display: "flex",
        fontFamily: settings?.fontFamily ?? "'Segoe UI', Arial, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        bgcolor: "#fff",
        color: MAIN_TEXT,
        overflow: "hidden",
      }}
    >
      {/* ===== LEFT SIDEBAR ===== */}
      <Box
        sx={{
          width: "220px",
          minHeight: "100%",
          bgcolor: SIDEBAR_BG,
          color: SIDEBAR_TEXT,
          p: 3,
          flexShrink: 0,
        }}
      >
        {/* Contact Section */}
        {contactLines.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, letterSpacing: 1 }}>
              CONTACT
            </Typography>
            {contactLines.map((line, idx) => (
              <Typography key={idx} sx={{ fontSize: 11, lineHeight: 1.5, mb: 0.5 }}>
                {line}
              </Typography>
            ))}
          </Box>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, letterSpacing: 1 }}>
              SKILLS
            </Typography>
            {data.skills.map((skill, i) => (
              <Typography key={i} sx={{ fontSize: 11, lineHeight: 1.5, mb: 0.5 }}>
                {skill.skillName}
                {skill.proficiency && ` (${skill.proficiency})`}
              </Typography>
            ))}
          </Box>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, letterSpacing: 1 }}>
              LANGUAGES
            </Typography>
            {data.languages.map((lang, i) => (
              <Typography key={i} sx={{ fontSize: 11, lineHeight: 1.5, mb: 0.5 }}>
                {lang.languageName}
                {lang.proficiencyLevel && ` (${lang.proficiencyLevel})`}
              </Typography>
            ))}
          </Box>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 1, letterSpacing: 1 }}>
              CERTIFICATIONS
            </Typography>
            {data.certifications.map((cert, i) => (
              <Typography key={i} sx={{ fontSize: 11, lineHeight: 1.5, mb: 0.5 }}>
                {cert.certificateName}
                {cert.issuedBy && ` - ${cert.issuedBy}`}
              </Typography>
            ))}
          </Box>
        )}
      </Box>

      {/* ===== RIGHT MAIN CONTENT ===== */}
      <Box sx={{ flex: 1, p: 4, bgcolor: "#fff" }}>
        {/* Name */}
        {fullName && (
          <Typography sx={{ fontSize: 26, fontWeight: 800, color: MAIN_TEXT, mb: 1 }}>
            {fullName}
          </Typography>
        )}

        {/* Summary */}
        {summaryText && (
          <Typography sx={{ fontSize: 13, color: MUTED, lineHeight: 1.6, mb: 2 }}>
            {summaryText}
          </Typography>
        )}

        <Divider sx={{ my: 2 }} />

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: MAIN_TEXT, mb: 1.5 }}>
              Education
            </Typography>
            {data.education.map((edu, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: MAIN_TEXT }}>
                  {edu.degree}
                  {edu.fieldOfStudy ? `: ${edu.fieldOfStudy}` : ""}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Typography sx={{ fontSize: 12, color: MUTED }}>
                    {edu.instituteName}
                    {/* {edu.location ? `, ${edu.location}` : ""} */}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: LIGHT_MUTED }}>
                    {edu.startDate && formatDate(edu.startDate)}
                    {edu.endDate && ` - ${formatDate(edu.endDate)}`}
                  </Typography>
                </Box>
                {edu.percentage && (
                  <Typography sx={{ fontSize: 11, color: LIGHT_MUTED }}>
                    {edu.percentage}% {edu.grade && `- ${edu.grade}`}
                  </Typography>
                )}
              </Box>
            ))}
            <Divider sx={{ my: 2 }} />
          </>
        )}

        {/* Work History */}
        {data.experience && data.experience.length > 0 && (
          <>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: MAIN_TEXT, mb: 1.5 }}>
              Work History
            </Typography>
            {data.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 2.5 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: MAIN_TEXT }}>
                    {exp.designation}
                  </Typography>
                  <Typography sx={{ fontSize: 12, color: LIGHT_MUTED }}>
                    {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>
                  {exp.companyName}
                  {exp.location && `, ${exp.location}`}
                </Typography>
                {exp.description && (
                  <Box component="ul" sx={{ m: 0, pl: 2, listStyleType: "disc" }}>
                    {exp.description.split(/\n+/).filter(Boolean).map((line: any, j: any) => (
                      <Typography component="li" key={j} sx={{ fontSize: 12, color: MUTED }}>
                        {line}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Paper>
  );
};

export default NavySidebarReferenceTemplate;