import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { ThemeLayoutProps } from "../../../types/types";
import { splitText } from "../layouts/helpers";


const ATSLayout = ({ data, config }: ThemeLayoutProps) => {
  const skills = splitText(data.skills);

  return (
    <Box
      sx={{
        width: 794,
        minHeight: 1123,
        bgcolor: config.backgroundColor,
        color: config.textColor,
        p: 5,
        fontFamily: config.fontFamily,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          color: config.primaryColor,
          textAlign:
            config.id === "simple-ats" ? "left" : "center",
        }}
      >
        {data.fullName}
      </Typography>

      <Typography
        sx={{
          fontWeight: 700,
          textAlign:
            config.id === "simple-ats" ? "left" : "center",
          color: config.secondaryColor,
        }}
      >
        {data.jobTitle}
      </Typography>

      <Typography
        sx={{
          fontSize: 13,
          mt: 1,
          textAlign:
            config.id === "simple-ats" ? "left" : "center",
        }}
      >
        {data.email} | {data.phone} | {data.location}
      </Typography>

      <Divider sx={{ my: 2.5 }} />

      <Section title="Professional Summary" color={config.primaryColor}>
        <Typography sx={{ fontSize: 13, lineHeight: 1.7 }}>
          {data.summary}
        </Typography>
      </Section>

      <Section title="Skills" color={config.primaryColor}>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          {skills.map((skill: string) => (
            <Chip key={skill} label={skill} size="small" />
          ))}
        </Stack>
      </Section>

      <Section title="Experience" color={config.primaryColor}>
        {data.experiences.map((exp: any, index: any) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 14 }}>
              {exp.designation} - {exp.companyName}
            </Typography>

            <Typography sx={{ fontSize: 12, color: config.secondaryColor }}>
              {exp.startDate} - {exp.endDate || "Present"}
            </Typography>

            <Typography sx={{ fontSize: 13, mt: 0.5, lineHeight: 1.7 }}>
              {exp.description}
            </Typography>
          </Box>
        ))}
      </Section>

      <Section title="Education" color={config.primaryColor}>
        {data.educations.map((edu: any, index: any) => (
          <Box key={index} sx={{ mb: 1.5 }}>
            <Typography sx={{ fontWeight: 800, fontSize: 14 }}>
              {edu.degree}
            </Typography>

            <Typography sx={{ fontSize: 13 }}>
              {edu.university} - {edu.passingYear}
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
  <Box sx={{ mb: 2.8 }}>
    <Typography
      sx={{
        fontWeight: 900,
        fontSize: 14,
        color,
        textTransform: "uppercase",
        borderBottom: `1px solid ${color}`,
        mb: 1,
        pb: 0.4,
      }}
    >
      {title}
    </Typography>

    {children}
  </Box>
);

export default ATSLayout;