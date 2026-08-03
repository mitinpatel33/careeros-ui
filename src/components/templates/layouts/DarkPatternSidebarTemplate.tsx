// DarkPatternSidebarTemplate.tsx
import { Box, Typography, Paper, Avatar } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const DARK_BG = "#2a2a2a";        // dark sidebar (you can change to blue: #1a2b4c)
const DARK = "#1a1a1a";
const MUTED = "#444";

// Date helpers: format as YYYY-MM
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

const DarkPatternSidebarTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();
  const photoUrl = data.personal?.photoUrl ?? data.personal?.profileImage;
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";
  const jobTitle = data.personal?.jobTitle || "";

  // Build location string from contact
  const locationParts = [
    data.contact?.address,
    data.contact?.city,
    data.contact?.state,
    data.contact?.pincode,
  ].filter(Boolean);
  const location = locationParts.join(", ");

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
        gridTemplateColumns: "190px 1fr",
        overflow: "hidden",
      }}
    >
      {/* ===== SIDEBAR ===== */}
      <Box
        sx={{
          bgcolor: DARK_BG,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 10px)",
          color: "#fff",
          px: 2.5,
          py: 3,
        }}
      >
        {/* Avatar */}
        <Avatar src={photoUrl} variant="rounded" sx={{ width: "100%", height: 170, mb: 3, borderRadius: "6px" }} />

        {/* Contact */}
        <SideRow icon={<PlaceIcon sx={{ fontSize: 14 }} />} text={location} />
        <SideRow icon={<PhoneIcon sx={{ fontSize: 14 }} />} text={data.contact?.mobile} />
        <SideRow icon={<EmailIcon sx={{ fontSize: 14 }} />} text={data.contact?.email} />

        {/* Education (correct key: educations) */}
        {data.educations && data.educations.length > 0 && (
          <>
            <SideHeading title="EDUCATION" />
            {data.educations.map((edu, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: "#eee" }}>
                  {edu.degree}{edu.fieldOfStudy ? ` | ${edu.fieldOfStudy}` : ""}
                </Typography>
                <Typography sx={{ fontSize: 10, color: "#aaa" }}>{edu.instituteName}</Typography>
                <Typography sx={{ fontSize: 9, color: "#999" }}>
                  {formatRange(edu.startDate, edu.endDate)}
                </Typography>
                {edu.percentage && (
                  <Typography sx={{ fontSize: 9, color: "#999" }}>
                    {edu.percentage}% {edu.grade && `- ${edu.grade}`}
                  </Typography>
                )}
              </Box>
            ))}
          </>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <>
            <SideHeading title="CERTIFICATIONS" />
            {data.certifications.map((c, i) => (
              <Typography key={i} sx={{ fontSize: 10.5, color: "#ddd", mb: 0.75 }}>
                {c.certificateName}{c.issuedBy ? ` - ${c.issuedBy}` : ""}
              </Typography>
            ))}
          </>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && (
          <>
            <SideHeading title="SKILLS" />
            {data.skills.map((s, i) => (
              <Typography key={i} sx={{ fontSize: 10.5, color: "#ddd", mb: 0.5 }}>
                {s.skillName}{s.proficiency ? ` (${s.proficiency})` : ""}
              </Typography>
            ))}
          </>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <>
            <SideHeading title="LANGUAGES" />
            {data.languages.map((l, i) => (
              <Typography key={i} sx={{ fontSize: 10.5, color: "#ddd", mb: 0.5 }}>
                {l.languageName}{l.proficiencyLevel ? ` : ${l.proficiencyLevel}` : ""}
              </Typography>
            ))}
          </>
        )}
      </Box>

      {/* ===== MAIN CONTENT ===== */}
      <Box sx={{ px: 4, py: 3 }}>
        {/* Name & Job Title */}
        <Typography sx={{ fontSize: 24, fontWeight: 800, color: DARK }}>{fullName}</Typography>
        {jobTitle && (
          <Typography sx={{ fontSize: 12, color: "#888", mb: 2 }}>{jobTitle}</Typography>
        )}

        {/* Summary */}
        {summaryText && (
          <>
            <MainHeading title="PROFESSIONAL SUMMARY" />
            <Typography sx={{ fontSize: 11.5, color: MUTED, mb: 2.5, textAlign: "justify" }}>
              {summaryText}
            </Typography>
          </>
        )}

        {/* Work History (correct key: experiences) */}
        {data.experiences && data.experiences.length > 0 && (
          <>
            <MainHeading title="WORK HISTORY" />
            {data.experiences.map((exp, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {exp.designation}
                  </Typography>
                  <Typography sx={{ fontSize: 11, color: "#888" }}>
                    {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>
                  {exp.companyName}{exp.location ? `, ${exp.location}` : ""}
                </Typography>
                {exp.description && (
                  <Box component="ul" sx={{ m: 0, pl: 2.5, mt: 0.5 }}>
                    {exp.description.split(/\n+/).filter(Boolean).map((line, j) => (
                      <Typography component="li" key={j} sx={{ fontSize: 11.5, color: MUTED }}>
                        {line}
                      </Typography>
                    ))}
                  </Box>
                )}
              </Box>
            ))}
          </>
        )}

        {/* Projects (if any) */}
        {data.projects && data.projects.length > 0 && (
          <>
            <MainHeading title="PROJECTS" />
            {data.projects.map((proj, i) => (
              <Box key={i} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: 12, fontWeight: 700, color: DARK }}>
                  {proj.projectName}
                </Typography>
                {proj.role && (
                  <Typography sx={{ fontSize: 11, color: MUTED }}>Role: {proj.role}</Typography>
                )}
                {proj.description && (
                  <Typography sx={{ fontSize: 11, color: MUTED, mt: 0.3 }}>
                    {proj.description}
                  </Typography>
                )}
                {proj.technologies && proj.technologies.length > 0 && (
                  <Typography sx={{ fontSize: 10, color: "#888", fontStyle: "italic" }}>
                    Tech: {proj.technologies.join(", ")}
                  </Typography>
                )}
              </Box>
            ))}
          </>
        )}
      </Box>
    </Paper>
  );
};

// ===== Helper Components =====
const SideHeading = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: 11.5, fontWeight: 800, color: "#fff", mb: 1, mt: 2, letterSpacing: "0.5px" }}>
    {title}
  </Typography>
);

const MainHeading = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: 14, fontWeight: 800, color: DARK, mb: 1.5, mt: 1, letterSpacing: "0.5px" }}>
    {title}
  </Typography>
);

const SideRow = ({ icon, text }: { icon: React.ReactNode; text?: string }) => {
  if (!text) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <Box sx={{ color: "#ccc" }}>{icon}</Box>
      <Typography sx={{ fontSize: 10.5, color: "#ddd" }}>{text}</Typography>
    </Box>
  );
};

export default DarkPatternSidebarTemplate;