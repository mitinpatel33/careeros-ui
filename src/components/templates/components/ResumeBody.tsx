import { Box, Chip, Stack, Typography } from "@mui/material";
import ResumeSection from "./ResumeSection";
import type { ResumeData } from "../../../types/candidate/resume.types";
import type { ResumeTemplateConfig } from "../../../types/resumeTemplate.types";

type Props = {
  data: ResumeData;
  config: ResumeTemplateConfig;
  hideSidebarData?: boolean;
  settings?: any;
};

const ResumeBody = ({ data, config, hideSidebarData = false, settings }: Props) => {
  return (
    <>
      {data.summary && (
        <ResumeSection title="Summary" config={config}>
          <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
            {data.summary}
          </Typography>
        </ResumeSection>
      )}

      {!hideSidebarData && data.skills?.length ? (
        <ResumeSection title="Skills" config={config}>
          <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
            {data.skills.map((skill) => (
              <Chip key={skill} label={skill} size="small" />
            ))}
          </Stack>
        </ResumeSection>
      ) : null}

      {data.experience?.length ? (
        <ResumeSection title="Experience" config={config}>
          {data.experience.map((item) => (
            <Box key={item.companyName} sx={{ mb: 1.8 }}>
              <Typography sx={{ fontWeight: 900 }}>
                {item.designation} - {item.companyName}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                {item.duration}
              </Typography>
              <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </ResumeSection>
      ) : null}

      {data.education?.length ? (
        <ResumeSection title="Education" config={config}>
          {data.education.map((item) => (
            <Box key={item.degree} sx={{ mb: 1.5 }}>
              <Typography sx={{ fontWeight: 900 }}>
                {item.degree}
              </Typography>
              <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
                {item.university}
              </Typography>
              <Typography sx={{ fontSize: settings?.fontSize ?? 12 }}>
                {item.year} {item.grade ? ` | ${item.grade}` : ""}
              </Typography>
            </Box>
          ))}
        </ResumeSection>
      ) : null}

      {data.projects?.length ? (
        <ResumeSection title="Projects" config={config}>
          {data.projects.map((item) => (
            <Box key={item.title} sx={{ mb: 1.8 }}>
              <Typography sx={{ fontWeight: 900 }}>
                {item.title}
              </Typography>
              <Typography sx={{ fontSize: settings?.fontSize ?? 12, color: "text.secondary" }}>
                {item.techStack}
              </Typography>
              <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
                {item.description}
              </Typography>
            </Box>
          ))}
        </ResumeSection>
      ) : null}

      {data.certifications?.length ? (
        <ResumeSection title="Certifications" config={config}>
          {data.certifications.map((item) => (
            <Typography key={item} sx={{ fontSize: settings?.fontSize ?? 14 }}>
              • {item}
            </Typography>
          ))}
        </ResumeSection>
      ) : null}

      {data.achievements?.length ? (
        <ResumeSection title="Achievements" config={config}>
          {data.achievements.map((item) => (
            <Typography key={item} sx={{ fontSize: settings?.fontSize ?? 14 }}>
              • {item}
            </Typography>
          ))}
        </ResumeSection>
      ) : null}

      {data.languages?.length ? (
        <ResumeSection title="Languages" config={config}>
          <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
            {data.languages.join(", ")}
          </Typography>
        </ResumeSection>
      ) : null}

      {data.references?.length ? (
        <ResumeSection title="References" config={config}>
          {data.references.map((item) => (
            <Box key={item.email ?? item.name} sx={{ mb: 1 }}>
              <Typography sx={{ fontWeight: 800 }}>
                {item.name}
              </Typography>
              <Typography sx={{ fontSize: settings?.fontSize ?? 13 }}>
                {item.company}
              </Typography>
              <Typography sx={{ fontSize: settings?.fontSize ?? 13 }}>
                {item.email}
              </Typography>
            </Box>
          ))}
        </ResumeSection>
      ) : null}
    </>
  );
};

export default ResumeBody;