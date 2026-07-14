import {
  Box,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { ThemeLayoutProps } from "../../../types/types";
import { splitText } from "../layouts/helpers";

const TechnicalLayout = ({ data, config }: ThemeLayoutProps) => {
  const skills = splitText(data.skills);

  return (
    <Box
      sx={{
        width: 794,
        minHeight: 1123,
        bgcolor: config.backgroundColor,
        color: config.textColor,
        p: 4,
        fontFamily: config.fontFamily,
      }}
    >
      <Box
        sx={{
          borderLeft: `8px solid ${config.primaryColor}`,
          pl: 3,
          mb: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {data.fullName}
        </Typography>

        <Typography
          sx={{
            fontWeight: 800,
            color: config.primaryColor,
          }}
        >
          {data.jobTitle}
        </Typography>

        <Typography sx={{ fontSize: 13, mt: 1 }}>
          {data.email} | {data.phone} | {data.location}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Box
            sx={{
              p: 2,
              bgcolor: config.accentColor,
              borderRadius: 3,
            }}
          >
            <Typography sx={{ fontWeight: 900, mb: 1 }}>
              Tech Stack
            </Typography>

            <Stack spacing={1}>
              {skills.map((skill: string) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  sx={{ fontWeight: 700 }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Section title="Summary" color={config.primaryColor}>
            <Typography sx={{ fontSize: 13, lineHeight: 1.8 }}>
              {data.summary}
            </Typography>
          </Section>

          <Section title="Experience" color={config.primaryColor}>
            {data.experiences.map((exp: any, index: any) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 900 }}>
                  {exp.designation}
                </Typography>

                <Typography sx={{ fontSize: 13, color: config.primaryColor }}>
                  {exp.companyName}
                </Typography>

                <Typography sx={{ fontSize: 12 }}>
                  {exp.startDate} - {exp.endDate || "Present"}
                </Typography>

                <Typography sx={{ fontSize: 13, mt: 0.5 }}>
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </Section>
        </Grid>
      </Grid>

      <Divider sx={{ my: 3 }} />

      <Section title="Projects" color={config.primaryColor}>
        {data.projects.map((project: any, index: any) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>
              {project.title}
            </Typography>

            <Typography sx={{ fontSize: 12, color: config.primaryColor }}>
              {project.techStack}
            </Typography>

            <Typography sx={{ fontSize: 13 }}>
              {project.description}
            </Typography>
          </Box>
        ))}
      </Section>
    </Box>
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
    <Typography
      sx={{
        fontWeight: 900,
        color,
        mb: 1,
        fontSize: 15,
        textTransform: "uppercase",
      }}
    >
      {title}
    </Typography>

    {children}
  </Box>
);

export default TechnicalLayout;