import {
  Box,
  Chip,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { ThemeLayoutProps } from "../../../types/types";
import { splitText } from "../layouts/helpers";


const PremiumLayout = ({ data, config }: ThemeLayoutProps) => {
  const skills = splitText(data.skills);

  const isDark = config.backgroundColor === "#030712";

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
      <Box
        sx={{
          textAlign: "center",
          border: `2px solid ${config.accentColor}`,
          p: 4,
          mb: 4,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            color: isDark ? config.accentColor : config.primaryColor,
          }}
        >
          {data.fullName}
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            color: isDark ? "#e5e7eb" : config.secondaryColor,
          }}
        >
          {data.jobTitle}
        </Typography>

        <Typography sx={{ fontSize: 13, mt: 1 }}>
          {data.email} | {data.phone} | {data.location}
        </Typography>
      </Box>

      <Section
        title="Executive Summary"
        color={isDark ? config.accentColor : config.primaryColor}
      >
        <Typography sx={{ fontSize: 14, lineHeight: 1.9 }}>
          {data.summary}
        </Typography>
      </Section>

      <Section
        title="Experience"
        color={isDark ? config.accentColor : config.primaryColor}
      >
        {data.experiences.map((exp: any, index: any) => (
          <Box key={index} sx={{ mb: 2.5 }}>
            <Typography sx={{ fontWeight: 900 }}>
              {exp.designation}
            </Typography>

            <Typography
              sx={{
                color: isDark ? config.accentColor : config.primaryColor,
                fontSize: 13,
              }}
            >
              {exp.companyName}
            </Typography>

            <Typography sx={{ fontSize: 12 }}>
              {exp.startDate} - {exp.endDate || "Present"}
            </Typography>

            <Typography sx={{ fontSize: 13, mt: 1, lineHeight: 1.7 }}>
              {exp.description}
            </Typography>
          </Box>
        ))}
      </Section>

      <Section
        title="Skills"
        color={isDark ? config.accentColor : config.primaryColor}
      >
        <Stack direction="row" sx={{gap: 1, flexWrap: "wrap" }}>
          {skills.map((skill: any) => (
            <Chip
              key={skill}
              label={skill}
              sx={{
                bgcolor: isDark ? "#111827" : config.accentColor,
                color: isDark ? config.accentColor : config.primaryColor,
                border: `1px solid ${
                  isDark ? config.accentColor : config.primaryColor
                }`,
              }}
            />
          ))}
        </Stack>
      </Section>

      <Divider
        sx={{
          my: 3,
          borderColor: isDark ? "#374151" : "#e5e7eb",
        }}
      />

      <Section
        title="Education"
        color={isDark ? config.accentColor : config.primaryColor}
      >
        {data.educations.map((edu: any, index: any) => (
          <Box key={index} sx={{ mb: 1.5 }}>
            <Typography sx={{ fontWeight: 900 }}>{edu.degree}</Typography>

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
  <Box sx={{ mb: 3 }}>
    <Typography
      sx={{
        color,
        fontWeight: 900,
        letterSpacing: 1,
        textTransform: "uppercase",
        mb: 1.2,
      }}
    >
      {title}
    </Typography>

    {children}
  </Box>
);

export default PremiumLayout;