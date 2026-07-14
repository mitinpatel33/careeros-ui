import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { getThemeColor } from "./templateUtils";
import type {
  ResumeData,
  ResumeThemeColor,
} from "../../types/candidate/resume.types";

type Props = {
  data: ResumeData;
  themeColor: ResumeThemeColor;
};

const DefaultTemplate = ({ data, themeColor }: Props) => {
  const primary = getThemeColor(themeColor);

  return (
    <Paper
      id="resume-preview"
      sx={{
        p: { xs: 2.5, sm: 4, md: 5 },
        borderRadius: 4,
        maxWidth: 900,
        minWidth: { md: 780 },
        mx: "auto",
        bgcolor: "#fff",
      }}
    >
      {data.personal && (
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, fontSize: { xs: 28, md: 36 } }}
          >
            {data.personal.fullName}
          </Typography>
          <Typography sx={{ fontWeight: 700 }}>
            {data.personal.jobTitle}
          </Typography>
          <Typography color="text.secondary">
            {data.personal.location}
          </Typography>
        </Box>
      )}

      {data.contact && (
        <Typography sx={{ mt: 1, textAlign: "center", fontSize: 14 }}>
          {data.contact.email} | {data.contact.phone}
        </Typography>
      )}

      <Divider sx={{ my: 3 }} />

      {data.summary && (
        <Section title="Summary" color={primary}>
          <Typography>{data.summary}</Typography>
        </Section>
      )}

      {data.skills?.length ? (
        <Section title="Skills" color={primary}>
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {data.skills.map((skill) => (
              <Chip key={skill} label={skill} />
            ))}
          </Stack>
        </Section>
      ) : null}

      {data.experience?.length ? (
        <Section title="Experience" color={primary}>
          {data.experience.map((item) => (
            <Box key={item.companyName} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 900 }}>
                {item.designation} - {item.companyName}
              </Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {item.duration}
              </Typography>
              <Typography>{item.description}</Typography>
            </Box>
          ))}
        </Section>
      ) : null}

      {data.education?.length ? (
        <Section title="Education" color={primary}>
          {data.education.map((item) => (
            <Box key={item.degree} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 900 }}>{item.degree}</Typography>
              <Typography>{item.university}</Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {item.year}
              </Typography>
            </Box>
          ))}
        </Section>
      ) : null}

      {data.projects?.length ? (
        <Section title="Projects" color={primary}>
          {data.projects.map((item) => (
            <Box key={item.title} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 900 }}>{item.title}</Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {item.techStack}
              </Typography>
              <Typography>{item.description}</Typography>
            </Box>
          ))}
        </Section>
      ) : null}
    </Paper>
  );
};

const Section = ({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography sx={{ mb: 1, fontWeight: 900, color }}>{title}</Typography>
    {children}
  </Box>
);

export default DefaultTemplate;
