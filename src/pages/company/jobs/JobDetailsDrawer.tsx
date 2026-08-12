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
            {job.jobTitle}
          </Typography>

          <Typography color="text.secondary">
            {job.department || "General"} • {job.jobType} • {job.workplaceType}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
          <Chip
            label={job.status}
            color={
              job.status === "Active"
                ? "success"
                : job.status === "Closed"
                ? "error"
                : "default"
            }
          />
          <Chip label={`${job.applicationsCount || 0} Applications`} />
          <Chip label={`${job.viewsCount || 0} Views`} />
        </Stack>

        <Divider />

        <Section title="Job Overview">
          <Typography>Location: {job.location || "Not specified"}</Typography>
          <Typography>Experience: {job.experience || "N/A"}</Typography>
          <Typography>
            Salary: {job.salaryCurrency || "$"} {job.minimumSalary?.toLocaleString() || 0} - {job.maximumSalary?.toLocaleString() || 0} / {job.salaryPeriod || "yr"}
          </Typography>
          {job.applicationDeadline && (
            <Typography>
              Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
            </Typography>
          )}
          {job.createdAt && (
            <Typography>
              Posted On: {new Date(job.createdAt).toLocaleDateString()}
            </Typography>
          )}
        </Section>

        <Section title="Skills Required">
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
            {job.skills?.map((skill) => (
              <Chip key={skill} label={skill} variant="outlined" />
            ))}
          </Stack>
        </Section>

        <Section title="Job Description">
          <Typography color="text.secondary" sx={{ whitespace: "pre-line" }}>
            {job.jobDescription}
          </Typography>
        </Section>

        {job.responsibilities && job.responsibilities.length > 0 && (
          <Section title="Responsibilities">
            {job.responsibilities.map((item, idx) => (
              <Typography key={idx} color="text.secondary">• {item}</Typography>
            ))}
          </Section>
        )}

        {job.requirements && job.requirements.length > 0 && (
          <Section title="Requirements">
            {job.requirements.map((item, idx) => (
              <Typography key={idx} color="text.secondary">• {item}</Typography>
            ))}
          </Section>
        )}

        <Stack direction="row" spacing={2} sx={{ pt: 2 }}>
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