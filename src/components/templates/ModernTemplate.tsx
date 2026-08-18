import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import { getThemeColor } from "./templateUtils";
import type {
  ResumeData,
  ResumeThemeColor,
} from "../../types/candidate/resume.types";

type Props = {
  data: ResumeData;
  themeColor: ResumeThemeColor;
};

const ModernTemplate = ({ data, themeColor }: Props) => {
  const primary = getThemeColor(themeColor);
  const summaryText =
    typeof data.summary === "string"
      ? data.summary
      : data.summary?.professionalSummary ??
        data.summary?.careerObjective ??
        "";

  return (
    <Paper
      sx={{
        overflow: "hidden",
        borderRadius: 4,
        maxWidth: 950,
        minWidth: { md: 780 },
        mx: "auto",
        bgcolor: "#fff",
      }}
    >
      <Box sx={{ bgcolor: primary, color: "#fff", p: { xs: 3, md: 5 } }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, fontSize: { xs: 28, md: 38 } }}
        >
          {data.personal?.firstName} + {" "} + {data.personal?.lastName}
        </Typography>
        <Typography>{data.personal?.jobTitle}</Typography>
        <Typography sx={{ fontSize: 14 }}>{data.contact?.email}</Typography>
      </Box>

      <Box sx={{ p: { xs: 2.5, md: 5 } }}>
        {summaryText && <Block title="Profile" color={primary} text={summaryText} />}

        {data.skills?.length ? (
          <Box sx={{ mb: 3 }}>
            <Title title="Skills" color={primary} />
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
              {data.skills.map((skill: any) => (
                <Chip key={skill} label={skill} />
              ))}
            </Stack>
          </Box>
        ) : null}

        {data.experience?.length ? (
          <Box sx={{ mb: 3 }}>
            <Title title="Experience" color={primary} />
            {data.experience.map((item: any) => (
              <Box key={item.companyName} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 900 }}>
                  {item.designation} - {item.companyName}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {item.duration}
                </Typography>
                <Typography>{item.description}</Typography>
              </Box>
            ))}
          </Box>
        ) : null}

        {data.education?.length ? (
          <Box sx={{ mb: 3 }}>
            <Title title="Education" color={primary} />
            {data.education.map((item: any) => (
              <Box key={item.degree} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 900 }}>{item.degree}</Typography>
                <Typography>{item.university}</Typography>
              </Box>
            ))}
          </Box>
        ) : null}
      </Box>
    </Paper>
  );
};

const Title = ({ title, color }: { title: string; color: string }) => (
  <Typography sx={{ mb: 1, color, fontWeight: 900 }}>{title}</Typography>
);

const Block = ({
  title,
  color,
  text,
}: {
  title: string;
  color: string;
  text: string;
}) => (
  <Box sx={{ mb: 3 }}>
    <Title title={title} color={color} />
    <Typography>{text}</Typography>
  </Box>
);

export default ModernTemplate;
