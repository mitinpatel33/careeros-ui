import {
  Avatar,
  Box,
  Chip,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import type { ThemeLayoutProps } from "../../../types/types";
import { splitText } from "../layouts/helpers";

const CreativeLayout = ({ data, config }: ThemeLayoutProps) => {
  const skills = splitText(data.skills);

  return (
    <Box
      sx={{
        width: 794,
        minHeight: 1123,
        bgcolor: "#fff",
        color: config.textColor,
        p: 4,
        fontFamily: config.fontFamily,
      }}
    >
      <Box
        sx={{
          p: 4,
          borderRadius: 4,
          background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`,
          color: "#fff",
        }}
      >
        <Stack direction="row" sx={{ spacing: 3, alignItems: "center" }}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              bgcolor: "#fff",
              color: config.primaryColor,
              fontWeight: 900,
              fontSize: 34,
            }}
          >
            {data.fullName?.[0]}
          </Avatar>

          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              {data.fullName}
            </Typography>

            <Typography sx={{ fontWeight: 700 }}>
              {data.jobTitle}
            </Typography>

            <Typography sx={{ fontSize: 13, mt: 1 }}>
              {data.email} | {data.phone}
            </Typography>
          </Box>
        </Stack>
      </Box>

      <Grid container sx={{ spacing: 3, mt: 1 }}>
        <Grid size={{ xs: 12 }}>
          <Section title="About Me" color={config.primaryColor}>
            <Typography sx={{ fontSize: 13, lineHeight: 1.8 }}>
              {data.summary}
            </Typography>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Skills" color={config.primaryColor}>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
              {skills.map((skill: string) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{
                    bgcolor: config.accentColor,
                    fontWeight: 700,
                  }}
                />
              ))}
            </Stack>
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Education" color={config.primaryColor}>
            {data.educations.map((edu: any, index: any) => (
              <Box key={index} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 800 }}>{edu.degree}</Typography>
                <Typography sx={{ fontSize: 13 }}>{edu.university}</Typography>
                <Typography sx={{ fontSize: 12 }}>{edu.passingYear}</Typography>
              </Box>
            ))}
          </Section>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Section title="Projects" color={config.primaryColor}>
            {data.projects.map((project: any, index: any) => (
              <Box
                key={index}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: config.accentColor,
                  mb: 2,
                }}
              >
                <Typography sx={{ fontWeight: 900 }}>
                  {project.title}
                </Typography>

                <Typography sx={{ fontSize: 12, color: config.primaryColor }}>
                  {project.techStack}
                </Typography>

                <Typography sx={{ fontSize: 13, mt: 0.5 }}>
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

const Section = ({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mt: 3 }}>
    <Typography
      sx={{
        fontWeight: 900,
        color,
        fontSize: 16,
        mb: 1,
      }}
    >
      {title}
    </Typography>

    {children}
  </Box>
);

export default CreativeLayout;