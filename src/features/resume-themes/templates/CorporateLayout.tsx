import {
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { splitText } from "../layouts/helpers";
import type { ThemeLayoutProps } from "../../../types/types";


const CorporateLayout = ({ data, config }: ThemeLayoutProps) => {
  const skills = splitText(data.skills);

  return (
    <Box
      sx={{
        width: 794,
        minHeight: 1123,
        bgcolor: config.backgroundColor,
        color: config.textColor,
        fontFamily: config.fontFamily,
      }}
    >
      <Box
        sx={{
          p: 4,
          bgcolor: config.primaryColor,
          color: "#fff",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {data.fullName}
        </Typography>

        <Typography  sx={{ opacity: 0.9, fontWeight: 700 }}>
          {data.jobTitle}
        </Typography>

        <Typography sx={{ fontSize: 13, mt: 1 }}>
          {data.email} | {data.phone} | {data.location}
        </Typography>
      </Box>

      <Grid container>
        <Grid
          size={{ xs: 4 }}
          sx={{
            bgcolor: config.accentColor,
            p: 3,
            minHeight: 960,
          }}
        >
          <Title color={config.primaryColor}>Skills</Title>

          <Stack spacing={1}>
            {skills.map((skill: string) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{ justifyContent: "flex-start" }}
              />
            ))}
          </Stack>

          <Title color={config.primaryColor}>Education</Title>

          {data.educations.map((edu: any, index: any) => (
            <Box key={index} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 800, fontSize: 13 }}>
                {edu.degree}
              </Typography>

              <Typography sx={{ fontSize: 12 }}>
                {edu.university}
              </Typography>

              <Typography sx={{ fontSize: 12 }}>
                {edu.passingYear}
              </Typography>
            </Box>
          ))}
        </Grid>

        <Grid size={{ xs: 8 }} sx={{ p: 4 }}>
          <Section title="Profile" color={config.primaryColor}>
            <Typography sx={{ fontSize: 13, lineHeight: 1.8 }}>
              {data.summary}
            </Typography>
          </Section>

          <Section title="Experience" color={config.primaryColor}>
            {data.experiences.map((exp: any, index: any) => (
              <Box key={index} sx={{ mb: 2.5 }}>
                <Typography sx={{ fontWeight: 900 }}>
                  {exp.designation}
                </Typography>

                <Typography sx={{ color: config.primaryColor, fontSize: 13 }}>
                  {exp.companyName}
                </Typography>

                <Typography sx={{ fontSize: 12, color: config.secondaryColor }}>
                  {exp.startDate} - {exp.endDate || "Present"}
                </Typography>

                <Typography sx={{ fontSize: 13, mt: 1, lineHeight: 1.7 }}>
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </Section>

          <Section title="Projects" color={config.primaryColor}>
            {data.projects.map((project: any, index: any) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 800 }}>
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
        </Grid>
      </Grid>
    </Box>
  );
};

const Title = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => (
  <Typography
    sx={{
      mt: 3,
      mb: 1.5,
      fontWeight: 900,
      color,
      textTransform: "uppercase",
      fontSize: 14,
    }}
  >
    {children}
  </Typography>
);

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
        textTransform: "uppercase",
        fontSize: 14,
        mb: 1,
      }}
    >
      {title}
    </Typography>

    {children}
  </Box>
);

export default CorporateLayout;