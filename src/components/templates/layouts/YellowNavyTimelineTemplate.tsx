// YellowNavyTimelineTemplate.tsx
import { Box, Typography, Paper, Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const NAVY = "#2b3a55";
const YELLOW = "#f4c430";
const DARK = "#1a1a1a";
const MUTED = "#4a4a4a";
const SIDEBAR_BG = "#eceef0";

const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
};
const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} – Present`;
  return `${s} – ${formatDate(end)}`;
};

const YellowNavyTimelineTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();
  const photoUrl = data.personal?.photoUrl ?? data.personal?.photoUrl;
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";
  const location = [data.contact?.city, data.contact?.state].filter(Boolean).join(", ");

  return (
    <Box sx={{ bgcolor: YELLOW, p: "14px" }}>
      <Paper
        elevation={0}
        sx={{
          width: "766px",
          minHeight: "1095px",
          mx: "auto",
          fontFamily: settings?.fontFamily ?? "'Poppins', Arial, sans-serif",
          fontSize: settings?.fontSize ?? 12,
          bgcolor: "#fff",
          color: DARK,
          overflow: "hidden",
        }}
      >
        {/* ===== HEADER ===== */}
        <Box sx={{ bgcolor: NAVY, py: 4, textAlign: "center" }}>
          <Typography sx={{ fontSize: 34, fontWeight: 800, color: "#fff", letterSpacing: "1px" }}>
            {fullName || "[YOUR FULL NAME]"}
          </Typography>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: "260px 1fr" }}>
          {/* sidebar */}
          <Box sx={{ bgcolor: SIDEBAR_BG, p: 3 }}>
            <Avatar src={photoUrl} sx={{ width: 130, height: 130, mb: 3, border: "4px solid #fff" }} />

            <SideHeading title="Contact" />
            <SideRow icon={<PhoneIcon sx={{ fontSize: 15 }} />} label="Phone" text={data.contact?.mobile} />
            <SideRow icon={<EmailIcon sx={{ fontSize: 15 }} />} label="Email" text={data.contact?.email} />
            <SideRow icon={<PlaceIcon sx={{ fontSize: 15 }} />} label="Location" text={location} />
            <SideRow icon={<LinkedInIcon sx={{ fontSize: 15 }} />} label="LinkedIn" text={data.social?.linkedInUrl} />

            {data.certifications && data.certifications.length > 0 && (
              <>
                <SideHeading title="Certifications" />
                {data.certifications.map((c, i) => (
                  <Typography key={i} sx={{ fontSize: 11.5, color: MUTED, mb: 1 }}>
                    <strong>{c.certificateName}</strong>
                    {c.issuedBy ? `, ${c.issuedBy}` : ""}
                    {c.issuedDate ? `, ${formatDate(c.issuedDate)}` : ""}
                  </Typography>
                ))}
              </>
            )}

            {data.languages && data.languages.length > 0 && (
              <>
                <SideHeading title="Languages" />
                {data.languages.map((l, i) => (
                  <Typography key={i} sx={{ fontSize: 11.5, color: MUTED, mb: 0.5 }}>
                    {l.languageName}{l.proficiencyLevel ? ` (${l.proficiencyLevel})` : ""}
                  </Typography>
                ))}
              </>
            )}
          </Box>

          {/* main timeline */}
          <Box sx={{ p: 3, pl: 4 }}>
            {summaryText && (
              <TimelineItem icon={<PersonIcon sx={{ fontSize: 16 }} />} title="Career Objective">
                <Typography sx={{ fontSize: 12, color: MUTED }}>{summaryText}</Typography>
              </TimelineItem>
            )}

            {data.skills && data.skills.length > 0 && (
              <TimelineItem icon={<WorkIcon sx={{ fontSize: 16 }} />} title="Key Skills">
                <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                  {data.skills.map((s, i) => (
                    <Typography component="li" key={i} sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>
                      {s.skillName}{s.proficiency ? ` (${s.proficiency})` : ""}
                    </Typography>
                  ))}
                </Box>
              </TimelineItem>
            )}

            {data.experience && data.experience.length > 0 && (
              <TimelineItem icon={<SchoolIcon sx={{ fontSize: 16 }} />} title="Experience" last={!data.education?.length}>
                {data.experience.map((exp, i) => (
                  <Box key={i} sx={{ mb: 2 }}>
                    <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                      {exp.designation} – {exp.companyName} {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                    </Typography>
                    {exp.description && (
                      <Box component="ul" sx={{ m: 0, pl: 2.5, mt: 0.5 }}>
                        {exp.description.split(/\n+/).filter(Boolean).map((line, j) => (
                          <Typography component="li" key={j} sx={{ fontSize: 12, color: MUTED }}>{line}</Typography>
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </TimelineItem>
            )}

            {data.education && data.education.length > 0 && (
              <TimelineItem icon={<SchoolIcon sx={{ fontSize: 16 }} />} title="Education" last>
                {data.education.map((edu, i) => (
                  <Typography key={i} sx={{ fontSize: 12, color: MUTED, mb: 0.5 }}>
                    • {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""} | {edu.instituteName} | {formatDate(edu.endDate)}
                  </Typography>
                ))}
              </TimelineItem>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

const SideHeading = ({ title }: { title: string }) => (
  <Typography sx={{ fontSize: 15, fontWeight: 800, color: NAVY, mt: 3, mb: 1, borderBottom: `1px solid ${NAVY}`, pb: 0.5 }}>
    {title}
  </Typography>
);

const SideRow = ({ icon, label, text }: { icon: React.ReactNode; label: string; text?: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
    <Box sx={{ color: NAVY }}>{icon}</Box>
    <Typography sx={{ fontSize: 11.5, color: MUTED }}>
      {label}: {text || `[Your ${label}]`}
    </Typography>
  </Box>
);

const TimelineItem = ({
  icon,
  title,
  children,
  last = false,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) => (
  <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          bgcolor: NAVY,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>
      {!last && <Box sx={{ flex: 1, width: "1px", bgcolor: "#ccc", mt: 0.5 }} />}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 800, color: NAVY, borderBottom: "1px solid #ccc", pb: 0.5, mb: 1 }}>
        {title}
      </Typography>
      {children}
    </Box>
  </Box>
);

export default YellowNavyTimelineTemplate;
