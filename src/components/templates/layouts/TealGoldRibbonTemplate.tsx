// TealGoldRibbonTemplate.tsx
import { Box, Typography, Paper, Avatar } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const TEAL = "#1f3a3f";
const GOLD = "#c9a24b";
const MUTED_LIGHT = "#d7dfe0";
const DARK = "#1a1a1a";
const MUTED = "#4a4a4a";

const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
};
const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) => {
  const s = formatDate(start);
  if (isCurrent || !end) return `${s} - current`;
  return `${s} - ${formatDate(end)}`;
};

const TealGoldRibbonTemplate = ({ data, settings }: TemplateRenderProps) => {
  const firstName = data.personal?.firstName ?? "";
  const lastName = data.personal?.lastName ?? "";
  const photoUrl = data.personal?.photoUrl ?? data.personal?.profileImage;
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";
  const location = [data.contact?.city, data.contact?.country ?? data.contact?.state].filter(Boolean).join(", ");

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
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ===== HEADER ===== */}
      <Box sx={{ bgcolor: TEAL, px: 5, pt: 4, pb: 8, position: "relative" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Avatar src={photoUrl} sx={{ width: 100, height: 100, border: `3px solid ${GOLD}` }} />
          <Box>
            <Typography sx={{ fontSize: 30, fontWeight: 800, color: "#fff" }}>
              <Box component="span" sx={{ color: GOLD }}>{firstName} </Box>
              {lastName}
            </Typography>
            {data.personal?.jobTitle && (
              <Typography sx={{ fontSize: 12, color: MUTED_LIGHT, letterSpacing: "1px", mb: 1 }}>
                {data.personal.jobTitle}
              </Typography>
            )}
            {summaryText && (
              <Typography sx={{ fontSize: 11, color: MUTED_LIGHT, maxWidth: 520 }}>
                {summaryText}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
      {/* gold ribbon */}
      <Box
        sx={{
          position: "absolute",
          top: 175,
          left: 0,
          width: "100%",
          height: 40,
          bgcolor: GOLD,
          clipPath: "polygon(0 0, 100% 0, 100% 40%, 45% 100%, 0 60%)",
        }}
      />

      {/* ===== BODY ===== */}
      <Box sx={{ display: "grid", gridTemplateColumns: "220px 1fr", mt: 4 }}>
        {/* sidebar */}
        <Box sx={{ pl: 5, pr: 3 }}>
          <SidebarRow icon={<PhoneIcon sx={{ fontSize: 15 }} />} text={data.contact?.mobile} />
          <SidebarRow icon={<EmailIcon sx={{ fontSize: 15 }} />} text={data.contact?.email} />
          <SidebarRow icon={<PlaceIcon sx={{ fontSize: 15 }} />} text={location} />
          <SidebarRow icon={<LinkedInIcon sx={{ fontSize: 15 }} />} text={data.contact?.linkedin} />

          {data.skills && data.skills.length > 0 && (
            <>
              <Pill title="Skills" />
              <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 3 }}>
                {data.skills.map((s, i) => (
                  <Typography component="li" key={i} sx={{ fontSize: 11.5, color: MUTED, mb: 0.5 }}>
                    {s.skillName}
                  </Typography>
                ))}
              </Box>
            </>
          )}

          {data.languages && data.languages.length > 0 && (
            <>
              <Pill title="Languages" />
              <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 3 }}>
                {data.languages.map((l, i) => (
                  <Typography component="li" key={i} sx={{ fontSize: 11.5, color: MUTED, mb: 0.5 }}>
                    {l.languageName}{l.proficiencyLevel ? ` – ${l.proficiencyLevel}` : ""}
                  </Typography>
                ))}
              </Box>
            </>
          )}
        </Box>

        {/* main */}
        <Box sx={{ pr: 5 }}>
          {data.experience && data.experience.length > 0 && (
            <>
              <MainPill title="Experience" />
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 700, color: DARK }}>{exp.designation}</Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#777", mb: 0.5 }}>
                    {exp.companyName}{location ? `, ${location}` : ""} | {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                  </Typography>
                  {exp.description && (
                    <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                      {exp.description.split(/\n+/).filter(Boolean).map((line, j) => (
                        <Typography component="li" key={j} sx={{ fontSize: 11.5, color: MUTED }}>{line}</Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              ))}
            </>
          )}

          {data.education && data.education.length > 0 && (
            <>
              <MainPill title="Education" />
              {data.education.map((edu, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {edu.degree}{edu.fieldOfStudy ? `: ${edu.fieldOfStudy}` : ""} | {formatDate(edu.endDate)}
                  </Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#777" }}>{edu.instituteName}</Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

const Pill = ({ title }: { title: string }) => (
  <Box sx={{ display: "inline-block", border: `1.5px solid ${GOLD}`, borderRadius: "20px", px: 2, py: 0.5, mb: 1.5 }}>
    <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: "1px", color: TEAL }}>
      {title.toUpperCase()}
    </Typography>
  </Box>
);

const MainPill = ({ title }: { title: string }) => (
  <Box sx={{ display: "inline-block", bgcolor: GOLD, borderRadius: "20px", px: 3, py: 0.75, mb: 2 }}>
    <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: "1px", color: "#fff" }}>
      {title.toUpperCase()}
    </Typography>
  </Box>
);

const SidebarRow = ({ icon, text }: { icon: React.ReactNode; text?: string }) => {
  if (!text) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mb: 1.25 }}>
      <Box sx={{ color: GOLD }}>{icon}</Box>
      <Typography sx={{ fontSize: 11.5, color: MUTED }}>{text}</Typography>
    </Box>
  );
};

export default TealGoldRibbonTemplate;
