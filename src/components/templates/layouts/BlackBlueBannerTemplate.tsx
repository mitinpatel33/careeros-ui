// BlackBlueBannerTemplate.tsx
import { Box, Typography, Paper, Avatar } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import PlaceIcon from "@mui/icons-material/Place";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const BLACK = "#232323";
const BLUE = "#2ba9de";

const formatDate = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "short" });
};
const formatRange = (start?: Date | string, end?: Date | string, isCurrent?: boolean) =>
  isCurrent || !end ? `${formatDate(start)} - present` : `${formatDate(start)} - ${formatDate(end)}`;

const BlackBlueBannerTemplate = ({ data, settings }: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${data.personal?.lastName ?? ""}`.trim();
  const summaryText = data.summary?.professionalSummary || data.summary?.careerObjective || "";
  const photoUrl = data.personal?.photoUrl ?? data.personal?.photoUrl;

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
        color: "#333",
        display: "grid",
        gridTemplateColumns: "230px 1fr",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Box sx={{ bgcolor: BLACK, color: "#fff", px: 3, py: 4 }}>
        <Avatar src={photoUrl} sx={{ width: 90, height: 90, mb: 3 }}>
          {!photoUrl && fullName.charAt(0)}
        </Avatar>

        <BlueTab title="Contact" />
        <Box sx={{ mb: 3 }}>
          <Row icon={<PhoneIcon sx={{ fontSize: 14 }} />} text={data.contact?.mobile} />
          <Row icon={<EmailIcon sx={{ fontSize: 14 }} />} text={data.contact?.email} />
          <Row icon={<LanguageIcon sx={{ fontSize: 14 }} />} text={data.social?.websiteUrl} />
          <Row icon={<PlaceIcon sx={{ fontSize: 14 }} />} text={[data.contact?.address, data.contact?.city].filter(Boolean).join(", ")} />
        </Box>

        {data.education && data.education.length > 0 && (
          <>
            <BlueTab title="Education" />
            <Box sx={{ mb: 3 }}>
              {data.education.map((edu, i) => (
                <Box key={i} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#eee" }}>
                    {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                  </Typography>
                  <Typography sx={{ fontSize: 10.5, color: "#aaa" }}>
                    {formatDate(edu.endDate)} / {edu.instituteName}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}

        {data.skills && data.skills.length > 0 && (
          <>
            <BlueTab title="Skills" />
            <Box sx={{ mb: 3 }}>
              {data.skills.map((s, i) => (
                <Typography key={i} sx={{ fontSize: 11.5, color: "#ddd", mb: 0.5 }}>• {s.skillName}</Typography>
              ))}
            </Box>
          </>
        )}

        {data.languages && data.languages.length > 0 && (
          <>
            <BlueTab title="Language" />
            {data.languages.map((l, i) => (
              <Typography key={i} sx={{ fontSize: 11.5, color: "#ddd", mb: 0.5 }}>
                • {l.languageName}{l.proficiencyLevel ? ` – ${l.proficiencyLevel}` : ""}
              </Typography>
            ))}
          </>
        )}
      </Box>

      {/* Main */}
      <Box sx={{ px: 4, py: 4 }}>
        <Typography sx={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a" }}>{fullName}</Typography>
        <Typography sx={{ fontSize: 13, color: "#666", mb: 3 }}>{data.personal?.jobTitle}</Typography>

        {summaryText && (
          <>
            <MainHeading title="About Me" />
            <Typography sx={{ fontSize: 12, color: "#444", mb: 3, textAlign: "justify" }}>{summaryText}</Typography>
          </>
        )}

        {data.experience && data.experience.length > 0 && (
          <>
            <MainHeading title="Experience" />
            {data.experience.map((exp, i) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontSize: 11.5, color: "#888" }}>
                  {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                </Typography>
                <Typography sx={{ fontSize: 12.5, color: "#666" }}>{exp.companyName}</Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 700, mb: 0.5 }}>{exp.designation}</Typography>
                {exp.description && exp.description.split(/\n+/).filter(Boolean).map((l, j) => (
                  <Typography key={j} sx={{ fontSize: 12, color: "#555" }}>– {l}</Typography>
                ))}
              </Box>
            ))}
          </>
        )}

        {data.achievements && data.achievements.length > 0 && (
          <>
            <MainHeading title="References" />
            <Box sx={{ display: "flex", gap: 4 }}>
              {data.achievements.slice(0, 2).map((a, i) => (
                <Box key={i}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>{a.title}</Typography>
                  <Typography sx={{ fontSize: 11.5, color: "#666" }}>{a.description}</Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Box>
    </Paper>
  );
};

const BlueTab = ({ title }: { title: string }) => (
  <Box sx={{ bgcolor: BLUE, px: 1.5, py: 0.5, mb: 1, mt: 1, display: "inline-block" }}>
    <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{title}</Typography>
  </Box>
);

const MainHeading = ({ title }: { title: string }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5, mt: 1 }}>
    <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>{title}</Typography>
    <Box sx={{ flex: 1, borderTop: "1px solid #ccc" }} />
  </Box>
);

const Row = ({ icon, text }: { icon: React.ReactNode; text?: string }) => {
  if (!text) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <Box sx={{ color: "#ccc", display: "flex" }}>{icon}</Box>
      <Typography sx={{ fontSize: 11, color: "#ddd" }}>{text}</Typography>
    </Box>
  );
};

export default BlackBlueBannerTemplate;
