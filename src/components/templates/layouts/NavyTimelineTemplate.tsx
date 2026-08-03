// NavyTimelineTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import SchoolIcon from "@mui/icons-material/School";
import BuildIcon from "@mui/icons-material/Build";
import WorkIcon from "@mui/icons-material/Work";
import VerifiedIcon from "@mui/icons-material/Verified";
import TranslateIcon from "@mui/icons-material/Translate";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const NAVY = "#1b2b4a";
const DARK = "#1a1a1a";
const MUTED = "#4a4a4a";
const DOT_FILLED = NAVY;
const DOT_EMPTY = "#d5d8e0";
const TOTAL_DOTS = 5;

const formatDate = (d?: Date | string) => {
  if (!d) return "";
  const date = new Date(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};
const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} - Present`;
  return `${s} - ${formatDate(end)}`;
};

const proficiencyToDots = (p?: string | number) => {
  if (typeof p === "number") return Math.max(0, Math.min(TOTAL_DOTS, Math.round(p)));
  switch ((p ?? "").toLowerCase()) {
    case "beginner": return 1;
    case "elementary": return 2;
    case "intermediate": return 3;
    case "advanced": return 4;
    case "expert":
    case "fluent": return 5;
    default: return 3;
  }
};

const NavyTimelineTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";
  const location = [data.contact?.city, data.contact?.state, data.contact?.zip].filter(Boolean).join(", ");

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 5,
        fontFamily: settings?.fontFamily ?? "'Segoe UI', Arial, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        bgcolor: "#fff",
        color: DARK,
      }}
    >
      {/* ===== HEADER ===== */}
      <Typography sx={{ fontSize: 30, fontWeight: 800, color: NAVY }}>{fullName}</Typography>
      <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap", mt: 1, mb: 1 }}>
        <ContactInline icon={<PlaceIcon sx={{ fontSize: 15 }} />} text={location} />
        <ContactInline icon={<PhoneIcon sx={{ fontSize: 15 }} />} text={data.contact?.mobile} />
        <ContactInline icon={<EmailIcon sx={{ fontSize: 15 }} />} text={data.contact?.email} />
      </Box>
      {summaryText && (
        <Typography sx={{ fontSize: 12, color: MUTED, mb: 2 }}>{summaryText}</Typography>
      )}

      {/* ===== EDUCATION ===== */}
      {data.education && data.education.length > 0 && (
        <>
          <SectionHeading icon={<SchoolIcon sx={{ fontSize: 17 }} />} title="Education" />
          {data.education.map((edu, i) => (
            <DateRow key={i} date={formatDate(edu.endDate)}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                {edu.degree}{edu.fieldOfStudy ? `: ${edu.fieldOfStudy}` : ""}
              </Typography>
              <Typography sx={{ fontSize: 12, fontStyle: "italic", color: "#666" }}>
                {edu.instituteName}
              </Typography>
            </DateRow>
          ))}
        </>
      )}

      {/* ===== SKILLS ===== */}
      {data.skills && data.skills.length > 0 && (
        <>
          <SectionHeading icon={<BuildIcon sx={{ fontSize: 17 }} />} title="Skills" />
          <Box component="ul" sx={{ m: 0, mb: 2, pl: 4 }}>
            {data.skills.map((s, i) => (
              <Typography component="li" key={i} sx={{ fontSize: 12.5, color: MUTED, mb: 0.5 }}>
                {s.skillName}
              </Typography>
            ))}
          </Box>
        </>
      )}

      {/* ===== WORK HISTORY ===== */}
      {data.experience && data.experience.length > 0 && (
        <>
          <SectionHeading icon={<WorkIcon sx={{ fontSize: 17 }} />} title="Work History" />
          {data.experience.map((exp, i) => (
            <DateRow key={i} date={formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}>
              <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>{exp.designation}</Typography>
              <Typography sx={{ fontSize: 12, fontStyle: "italic", color: "#666", mb: 0.5 }}>
                {exp.companyName}{location ? `, ${location}` : ""}
              </Typography>
              {exp.description && (
                <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                  {exp.description.split(/\n+/).filter(Boolean).map((line, j) => (
                    <Typography component="li" key={j} sx={{ fontSize: 12, color: MUTED }}>{line}</Typography>
                  ))}
                </Box>
              )}
            </DateRow>
          ))}
        </>
      )}

      {/* ===== CERTIFICATIONS ===== */}
      {data.certifications && data.certifications.length > 0 && (
        <>
          <SectionHeading icon={<VerifiedIcon sx={{ fontSize: 17 }} />} title="Certifications" />
          <Box component="ul" sx={{ m: 0, mb: 2, pl: 4 }}>
            {data.certifications.map((c, i) => (
              <Typography component="li" key={i} sx={{ fontSize: 12.5, color: MUTED, mb: 0.5 }}>
                {c.certificateName}{c.issuedBy ? ` - ${c.issuedBy}` : ""}
              </Typography>
            ))}
          </Box>
        </>
      )}

      {/* ===== LANGUAGES ===== */}
      {data.languages && data.languages.length > 0 && (
        <>
          <SectionHeading icon={<TranslateIcon sx={{ fontSize: 17 }} />} title="Languages" />
          {data.languages.map((l, i) => (
            <Box key={i} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1, pl: 4, maxWidth: 420 }}>
              <Typography sx={{ fontSize: 12.5, color: DARK }}>{l.languageName}</Typography>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box sx={{ display: "flex", gap: "3px" }}>
                  {Array.from({ length: TOTAL_DOTS }).map((_, d) => (
                    <Box
                      key={d}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: d < proficiencyToDots(l.proficiencyLevel) ? DOT_FILLED : DOT_EMPTY,
                      }}
                    />
                  ))}
                </Box>
                <Typography sx={{ fontSize: 10.5, color: "#888" }}>{l.proficiencyLevel}</Typography>
              </Box>
            </Box>
          ))}
        </>
      )}
    </Paper>
  );
};

const SectionHeading = ({ icon, title }: { icon: React.ReactNode; title: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5, mt: 2 }}>
    <Box sx={{ color: NAVY }}>{icon}</Box>
    <Typography sx={{ fontSize: 16, fontWeight: 800, color: NAVY }}>{title}</Typography>
  </Box>
);

const DateRow = ({ date, children }: { date: string; children: React.ReactNode }) => (
  <Box sx={{ display: "grid", gridTemplateColumns: "110px 1fr", mb: 2 }}>
    <Typography sx={{ fontSize: 11.5, color: "#666" }}>{date}</Typography>
    <Box>{children}</Box>
  </Box>
);

const ContactInline = ({ icon, text }: { icon: React.ReactNode; text?: string }) => {
  if (!text) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
      <Box sx={{ color: NAVY }}>{icon}</Box>
      <Typography sx={{ fontSize: 12, color: MUTED }}>{text}</Typography>
    </Box>
  );
};

export default NavyTimelineTemplate;
