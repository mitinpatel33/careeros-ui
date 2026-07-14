import { Box, Divider, Paper, Typography } from "@mui/material";
import { getThemeColor } from "./templateUtils";
import type {
  ResumeData,
  ResumeThemeColor,
} from "../../types/candidate/resume.types";

type Props = {
  data: ResumeData;
  themeColor: ResumeThemeColor;
};

const AtsTemplate = ({ data, themeColor }: Props) => {
  const primary = getThemeColor(themeColor);

  return (
    <Paper
      sx={{
        p: { xs: 2.5, md: 5 },
        borderRadius: 1,
        maxWidth: 850,
        minWidth: { md: 780 },
        mx: "auto",
        boxShadow: "none",
        border: "1px solid #ddd",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 900, fontSize: { xs: 28, md: 36 } }}
      >
        {data.personal?.fullName}
      </Typography>

      <Typography>{data.personal?.jobTitle}</Typography>
      <Typography sx={{ fontSize: 14 }}>
        {data.contact?.email} | {data.contact?.phone}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {data.summary && (
        <Section title="SUMMARY" color={primary} content={data.summary} />
      )}

      {data.skills?.length ? (
        <Section
          title="SKILLS"
          color={primary}
          content={data.skills.join(", ")}
        />
      ) : null}

      {data.experience?.length ? (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 900, color: primary }}>
            EXPERIENCE
          </Typography>

          {data.experience.map((item) => (
            <Box key={item.companyName} sx={{ mb: 1.5 }}>
              <Typography sx={{ fontWeight: 800 }}>
                {item.designation}, {item.companyName}
              </Typography>
              <Typography sx={{ fontSize: 13 }}>{item.duration}</Typography>
              <Typography>{item.description}</Typography>
            </Box>
          ))}
        </Box>
      ) : null}

      {data.education?.length ? (
        <Box sx={{ mb: 2 }}>
          <Typography sx={{ fontWeight: 900, color: primary }}>
            EDUCATION
          </Typography>

          {data.education.map((item) => (
            <Typography key={item.degree}>
              {item.degree}, {item.university}, {item.year}
            </Typography>
          ))}
        </Box>
      ) : null}
    </Paper>
  );
};

const Section = ({
  title,
  color,
  content,
}: {
  title: string;
  color: string;
  content: string;
}) => (
  <Box sx={{ mb: 2 }}>
    <Typography sx={{ fontWeight: 900, color }}>{title}</Typography>
    <Typography>{content}</Typography>
  </Box>
);

export default AtsTemplate;
