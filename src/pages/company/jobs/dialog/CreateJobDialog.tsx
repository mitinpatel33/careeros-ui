import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Close, Work } from "@mui/icons-material";
import { useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppFormField from "../../../../components/common/AppFormField";
import type { JobItem } from "../../../../types/company.types";
import { jobSchema, type JobFormType } from "../../../../validation/job.validation";

type Props = {
  open: boolean;
  editJob: JobItem | null;
  onClose: () => void;
  onSave: (jobData: Partial<JobItem>) => Promise<void>;
  isSubmitting?: boolean;
};

const defaultValues: JobFormType = {
  jobTitle: "",
  department: "",
  jobDescription: "",
  jobType: "Full-time",
  workplaceType: "On-site",
  experience: "",
  location: "",
  minimumSalary: 0,
  maximumSalary: 0,
  salaryCurrency: "",
  salaryPeriod: "Yearly",
  skills: "",
  requirements: "",
  responsibilities: "",
  status: "Active",
  applicationDeadline: "",
};

const JOB_TYPE_OPTIONS = [
  { label: "Full Time", value: "Full-time" },
  { label: "Part Time", value: "Part-time" },
  { label: "Contract", value: "Contract" },
  { label: "Internship", value: "Internship" },
  { label: "Remote", value: "Remote" },
  { label: "Freelance", value: "Freelance" },
];

const WORKPLACE_TYPE_OPTIONS = [
  { label: "On-site", value: "On-site" },
  { label: "Hybrid", value: "Hybrid" },
  { label: "Remote", value: "Remote" },
];

const SALARY_PERIOD_OPTIONS = [
  { label: "Yearly", value: "Yearly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Hourly", value: "Hourly" },
];

const STATUS_OPTIONS = [
  { label: "Active", value: "Active" },
  { label: "Draft", value: "Draft" },
  { label: "Closed", value: "Closed" },
  { label: "Archived", value: "Archived" },
];

const CreateJobDialog = ({
  open,
  editJob,
  onClose,
  onSave,
  isSubmitting = false,
}: Props) => {
  const { control, handleSubmit, reset } = useForm<JobFormType>({
    resolver: zodResolver(jobSchema) as Resolver<JobFormType>,
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    if (editJob) {
      reset({
        jobTitle: editJob.jobTitle || "",
        department: editJob.department || "",
        jobDescription: editJob.jobDescription || "",
        jobType: editJob.jobType || "Full-time",
        workplaceType: editJob.workplaceType || "On-site",
        experience: editJob.experience || "",
        location: editJob.location || "",
        minimumSalary: editJob.minimumSalary || 0,
        maximumSalary: editJob.maximumSalary || 0,
        salaryCurrency: editJob.salaryCurrency || "",
        salaryPeriod: editJob.salaryPeriod || "Yearly",
        skills: editJob.skills ? editJob.skills.join(", ") : "",
        requirements: editJob.requirements ? editJob.requirements.join("\n") : "",
        responsibilities: editJob.responsibilities ? editJob.responsibilities.join("\n") : "",
        status: editJob.status || "Active",
        applicationDeadline: editJob.applicationDeadline
          ? new Date(editJob.applicationDeadline).toISOString().split("T")[0]
          : "",
      });
    } else {
      reset(defaultValues);
    }
  }, [editJob, open, reset]);

  const onSubmit = async (data: JobFormType) => {
    const payload: Partial<JobItem> = {
      jobTitle: data.jobTitle,
      department: data.department,
      jobDescription: data.jobDescription,
      jobType: data.jobType,
      workplaceType: data.workplaceType,
      experience: data.experience,
      location: data.location,
      minimumSalary: Number(data.minimumSalary),
      maximumSalary: Number(data.maximumSalary),
      salaryCurrency: data.salaryCurrency,
      salaryPeriod: data.salaryPeriod,
      skills: data.skills
        ? data.skills.split(",").map((x) => x.trim()).filter(Boolean)
        : [],
      requirements: data.requirements
        ? data.requirements.split("\n").map((x) => x.trim()).filter(Boolean)
        : [],
      responsibilities: data.responsibilities
        ? data.responsibilities.split("\n").map((x) => x.trim()).filter(Boolean)
        : [],
      status: data.status,
      applicationDeadline: data.applicationDeadline ? data.applicationDeadline : undefined,
    };

    await onSave(payload);
  };

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ p: 3 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "#fff",
                display: "grid",
                placeItems: "center",
              }}
            >
              <Work />
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                {editJob ? "Edit Job Posting" : "Create New Job Posting"} 💼
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                Fill in job details, requirements and salary specs to publish.
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" sx={{ p: 1 }} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="jobTitle"
                control={control}
                label="Job Title"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="department"
                control={control}
                label="Department"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <AppFormField
                name="jobType"
                control={control}
                label="Job Type"
                type="select"
                options={JOB_TYPE_OPTIONS}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <AppFormField
                name="workplaceType"
                control={control}
                label="Workplace Type"
                type="select"
                options={WORKPLACE_TYPE_OPTIONS}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <AppFormField
                name="experience"
                control={control}
                label="Experience"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="location"
                control={control}
                label="Location"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="status"
                control={control}
                label="Status"
                type="select"
                options={STATUS_OPTIONS}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <AppFormField
                name="minimumSalary"
                control={control}
                label="Minimum Salary"
                type="number"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <AppFormField
                name="maximumSalary"
                control={control}
                label="Maximum Salary"
                type="number"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <AppFormField
                name="salaryCurrency"
                control={control}
                label="Currency"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>
              <AppFormField
                name="salaryPeriod"
                control={control}
                label="Salary Period"
                type="select"
                options={SALARY_PERIOD_OPTIONS}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <AppFormField
                name="skills"
                control={control}
                label="Required Skills (Comma separated)"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <AppFormField
                name="applicationDeadline"
                control={control}
                label="Application Deadline"
                type="date"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <AppFormField
                name="jobDescription"
                control={control}
                label="Job Description"
                type="textarea"
                rows={4}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="responsibilities"
                control={control}
                label="Responsibilities (One per line)"
                type="textarea"
                rows={4}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppFormField
                name="requirements"
                control={control}
                label="Requirements (One per line)"
                type="textarea"
                rows={4}
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 3, justifyContent: "flex-end" }}
          >
            <Button variant="outlined" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              {editJob ? "Update Job" : "Publish Job"}
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobDialog;