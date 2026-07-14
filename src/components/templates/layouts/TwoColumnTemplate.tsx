import { Box, Paper, Typography } from "@mui/material";
import ResumeSection from "../components/ResumeSection";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const TwoColumnTemplate = ({ data, config, settings }: TemplateRenderProps) => {
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
      <Box
        sx={{
          p: 4,
          bgcolor: config.primaryColor,
          color: "#fff",
          textAlign: "center",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {data.personal?.fullName}
        </Typography>
        <Typography>{data.personal?.jobTitle}</Typography>
        <Typography sx={{ fontSize: settings?.fontSize ?? 13 }}>
          {data.contact?.email} | {data.contact?.phone}
        </Typography>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, p: 4 }}>
        <Box>
          {data.summary && (
            <ResumeSection title="Summary" config={config} settings={settings} sectionKey="summary">
              <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>{data.summary}</Typography>
            </ResumeSection>
          )}

          {data.experience?.length ? (
            <ResumeSection title="Experience" config={config} settings={settings} sectionKey="experience">
              {data.experience.map((item: any) => (
                <Box key={item.companyName} sx={{ mb: 1.8 }}>
                  <Typography sx={{ fontWeight: 900 }}>{item.designation}</Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 12 }}>{item.companyName}</Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 12 }}>{item.duration}</Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>{item.description}</Typography>
                </Box>
              ))}
            </ResumeSection>
          ) : null}

          {data.projects?.length ? (
            <ResumeSection title="Projects" config={config} settings={settings} sectionKey="projects">
              {data.projects.map((item: any) => (
                <Box key={item.title} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 900 }}>{item.title}</Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 12 }}>{item.techStack}</Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>{item.description}</Typography>
                </Box>
              ))}
            </ResumeSection>
          ) : null}
        </Box>

        <Box>
          {data.skills?.length ? (
            <ResumeSection title="Skills" config={config} settings={settings} sectionKey="skills">
              {data.skills.map((skill: any) => (
                <Typography key={skill} sx={{ fontSize: settings?.fontSize ?? 14 }}>
                  • {skill}
                </Typography>
              ))}
            </ResumeSection>
          ) : null}

          {data.education?.length ? (
            <ResumeSection title="Education" config={config} settings={settings} sectionKey="education">
              {data.education.map((item: any) => (
                <Box key={item.degree} sx={{ mb: 1.5 }}>
                  <Typography sx={{ fontWeight: 900 }}>{item.degree}</Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>{item.university}</Typography>
                  <Typography sx={{ fontSize: settings?.fontSize ?? 12 }}>{item.year}</Typography>
                </Box>
              ))}
            </ResumeSection>
          ) : null}

          {data.certifications?.length ? (
            <ResumeSection title="Certifications" config={config} settings={settings} sectionKey="certifications">
              {data.certifications.map((item: any) => (
                <Typography key={item} sx={{ fontSize: settings?.fontSize ?? 14 }}>
                  • {item}
                </Typography>
              ))}
            </ResumeSection>
          ) : null}

          {data.achievements?.length ? (
            <ResumeSection title="Achievements" config={config} settings={settings} sectionKey="achievements">
              {data.achievements.map((item: any) => (
                <Typography key={item} sx={{ fontSize: settings?.fontSize ?? 14 }}>
                  • {item}
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