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

const MinimalTemplate = ({ data, themeColor }: Props) => {
  const primary = getThemeColor(themeColor);

  return (
    <Paper
      sx={{
        p: { xs: 3, md: 6 },
        borderRadius: 0,
        maxWidth: 850,
        minWidth: { md: 780 },
        mx: "auto",
        bgcolor: "#fff",
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontWeight: 300, fontSize: { xs: 34, md: 48 } }}
      >
        {data.personal?.firstName} + {` `} + {data.personal?.lastName}
      </Typography>

      <Typography sx={{ mt: 1, color: primary }}>
        {data.personal?.jobTitle}
      </Typography>

      <Divider sx={{ my: 3 }} />

      {data.summary && (
        <Block
          title="About"
          body={
            typeof data.summary === "string"
              ? data.summary
              : data.summary.professionalSummary ||
                data.summary.careerObjective ||
                ""
          }
          color={primary}
        />
      )}

      {data.skills?.length ? (
        <Block title="Skills" body={data.skills.join(" / ")} color={primary} />
      ) : null}

      {data.projects?.length ? (
        <Box sx={{ mb: 3 }}>
          <Typography sx={{ mb: 1, color: primary, fontWeight: 900 }}>
            Projects
          </Typography>

          {data.projects.map((project: any) => (
            <Box key={project.title} sx={{ mb: 2 }}>
              <Typography sx={{ fontWeight: 900 }}>{project.title}</Typography>
              <Typography color="text.secondary">
                {project.techStack} - {project.description}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : null}
    </Paper>
  );
};

const Block = ({
  title,
  body,
  color,
}: {
  title: string;
  body: string;
  color: string;
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography sx={{ mb: 0.5, color, fontWeight: 900 }}>{title}</Typography>
    <Typography color="text.secondary">{body}</Typography>
  </Box>
);

export default MinimalTemplate;
