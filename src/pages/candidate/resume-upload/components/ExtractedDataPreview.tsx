import {
  Alert,
  Box,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  CheckCircle,
  Person,
  Work,
  School,
  Folder,
  Code,
} from "@mui/icons-material";

import UploadResultActions from "./UploadResultActions";
import type { ParsedResumeData } from "../../../../types/resumeData.types";

type Props = {
  data: ParsedResumeData;
  onAutoFill: () => void;
  onGenerateLiveLink: () => void;
  onChooseTheme?: () => void;
};

const ExtractedDataPreview = ({
  data,
  onAutoFill,
  onGenerateLiveLink,
  onChooseTheme,
}: Props) => {
  const personal = data.personalInformation;

  const allSkills = [
    ...data.skills.technical,
    ...(data.skills.soft || []),
    ...(data.skills.tools || []),
  ];

  return (
    <Stack spacing={3}>
      <Alert
        severity="success"
        icon={<CheckCircle />}
        sx={{ borderRadius: 3 }}
      >
        Resume parsed successfully. Review extracted data below.
      </Alert>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
          color: "#fff",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          {personal.fullName}
        </Typography>

        <Typography sx={{ opacity: 0.9 }}>
          {personal.jobTitle}
        </Typography>

        <Typography sx={{ mt: 1, opacity: 0.85 }}>
          {personal.email} • {personal.phone} • {personal.location}
        </Typography>
      </Paper>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <PreviewSection icon={<Person />} title="Professional Summary">
            <Typography color="text.secondary">
              {data.professionalSummary}
            </Typography>
          </PreviewSection>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <PreviewSection icon={<Code />} title="Skills">
            <Box>
              {allSkills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  color="primary"
                  variant="outlined"
                  sx={{
                    mr: 1,
                    mb: 1,
                    fontWeight: 700,
                  }}
                />
              ))}
            </Box>
          </PreviewSection>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <PreviewSection icon={<Work />} title="Experience">
            {data.experiences.map((exp: any, index: any) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 800 }}>
                  {exp.designation}
                </Typography>

                <Typography color="primary" sx={{ fontWeight: 700 }}>
                  {exp.companyName}
                </Typography>

                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                  {exp.duration || `${exp.startDate} - ${exp.endDate || "Present"}`}
                </Typography>

                <Typography sx={{ mt: 1 }} color="text.secondary">
                  {exp.description}
                </Typography>

                {index !== data.experiences.length - 1 && (
                  <Divider sx={{ mt: 2 }} />
                )}
              </Box>
            ))}
          </PreviewSection>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <PreviewSection icon={<School />} title="Education">
            {data.educations.map((edu: any, index: any) => (
              <Box key={index} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 800 }}>
                  {edu.degree}
                </Typography>

                <Typography color="text.secondary">
                  {edu.university}
                </Typography>

                <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                  {edu.year || edu.passingYear}
                </Typography>
              </Box>
            ))}
          </PreviewSection>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <PreviewSection icon={<Folder />} title="Projects">
            {data.projects.map((project: any, index: any) => (
              <Box key={index} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontWeight: 800 }}>
                  {project.title}
                </Typography>

                <Typography color="primary" sx={{ fontSize: 13 }}>
                  {project.techStack.join(", ")}
                </Typography>

                <Typography color="text.secondary">
                  {project.description}
                </Typography>
              </Box>
            ))}
          </PreviewSection>
        </Grid>
      </Grid>

      <UploadResultActions
        onAutoFill={onAutoFill}
        onGenerateLiveLink={onGenerateLiveLink}
        onChooseTheme={onChooseTheme}
      />
    </Stack>
  );
};

const PreviewSection = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        bgcolor: "#fff",
      }}
    >
      <Stack
        direction="row"
        sx={{ mb: 2, alignItems:"center",  spacing: 1.2 }}
      >
        <Box
          sx={{
            color: "primary.main",
            display: "flex",
          }}
        >
          {icon}
        </Box>

        <Typography sx={{ fontWeight: 900 }}>
          {title}
        </Typography>
      </Stack>

      {children}
    </Paper>
  );
};

export default ExtractedDataPreview;