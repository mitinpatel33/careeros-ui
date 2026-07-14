import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";

import type { JobItem } from "../../../types/company.types";

type Props = {
  open: boolean;
  job: JobItem | null;
  onClose: () => void;
  onEdit: (job: JobItem) => void;
};

const JobDetailsDrawer = ({ open, job, onClose, onEdit }: Props) => {
  if (!job) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 520 },
            p: 3,
          },
        },
      }}
    >
      <Stack spacing={2}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            {job.title}
          </Typography>

          <Typography color="text.secondary">
            {job.department} • {job.employmentType} • {job.workMode}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
          <Chip label={job.status} color={job.status === "Open" ? "success" : "default"} />
          <Chip label={`${job.applications} Applications`} />
          <Chip label={`${job.positions} Positions`} />
        </Stack>

        <Divider />

        <Section title="Job Details">
          <Typography>Location: {job.location}</Typography>
          <Typography>Experience: {job.experience}</Typography>
          <Typography>
            Salary: ₹{job.salaryMin} - ₹{job.salaryMax}
          </Typography>
          <Typography>Created: {job.createdAt}</Typography>
        </Section>

        <Section title="Skills">
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
            {job.skills.map((skill) => (
              <Chip key={skill} label={skill} variant="outlined" />
            ))}
          </Stack>
        </Section>

        <Section title="Description">
          <Typography color="text.secondary">{job.description}</Typography>
        </Section>

        <Section title="Responsibilities">
          <Typography color="text.secondary">{job.responsibilities}</Typography>
        </Section>

        <Section title="Requirements">
          <Typography color="text.secondary">{job.requirements}</Typography>
        </Section>

        <Section title="Benefits">
          <Typography color="text.secondary">
            {job.benefits || "No benefits added"}
          </Typography>
        </Section>

        <Stack direction="row" spacing={2}>
          <Button fullWidth variant="outlined" onClick={onClose}>
            Close
          </Button>

          <Button fullWidth variant="contained" onClick={() => onEdit(job)}>
            Edit Job
          </Button>
        </Stack>
      </Stack>
    </Drawer>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box>
    <Typography sx={{ fontWeight: 900, mb: 1 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default JobDetailsDrawer;