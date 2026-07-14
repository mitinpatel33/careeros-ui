import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Edit, Download } from "@mui/icons-material";
import { useFormContext } from "react-hook-form";
import type { ResumeFormType } from "../../../../validation/resume.validation";

type Props = {
  onEdit: () => void;
};

const ResumePreview = ({ onEdit }: Props) => {
  const { watch } = useFormContext<ResumeFormType>();
  const data = watch();

  const skills = data.skills.split(",").map((x) => x.trim()).filter(Boolean);

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 5 }}>
      <Stack direction={{ xs: "column", md: "row" }} sx={{ justifyContent: "space-between", gap: 2 }}>
        <Box>
          <Typography variant="h3" sx={{ fontWeight: 900 }}>
            {data.fullName || "Your Name"}
          </Typography>
          <Typography color="primary" sx={{ fontWeight: 800 }}>
            {data.jobTitle || "Job Title"}
          </Typography>
          <Typography color="text.secondary">
            {data.email} • {data.phone} • {data.location}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1}>
          <Button variant="outlined" startIcon={<Edit />} onClick={onEdit}>
            Edit
          </Button>
          <Button variant="contained" startIcon={<Download />}>
            Download PDF
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Section title="Professional Summary">
        <Typography>{data.summary}</Typography>
      </Section>

      <Section title="Skills">
        {skills.map((skill: string) => (
          <Chip key={skill} label={skill} sx={{ mr: 1, mb: 1 }} />
        ))}
      </Section>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Experience">
            {data.experiences.map((exp: any, i: any) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 800 }}>{exp.designation}</Typography>
                <Typography sx={{ color: "text.secondary" }}>{exp.companyName}</Typography>
                <Typography sx={{ fontSize: 13 }}>
                  {exp.startDate} - {exp.endDate || "Present"}
                </Typography>
                <Typography sx={{ mt: 1 }}>{exp.description}</Typography>
              </Box>
            ))}
          </Section>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Section title="Education">
            {data.educations.map((edu: any, i: any) => (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography sx={{ fontWeight: 800 }}>{edu.degree}</Typography>
                <Typography color="text.secondary">{edu.university}</Typography>
                <Typography sx={{ fontSize: 13 }}>{edu.passingYear}</Typography>
              </Box>
            ))}
          </Section>
        </Grid>
      </Grid>

      <Section title="Projects">
        {data.projects.map((project: any, i: any) => (
          <Box key={i} sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 800 }}>{project.title}</Typography>
            <Typography color="primary">{project.techStack}</Typography>
            <Typography>{project.description}</Typography>
          </Box>
        ))}
      </Section>
    </Paper>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: 900, mb:1 }} >
      {title}
    </Typography>
    {children}
  </Box>
);

export default ResumePreview;