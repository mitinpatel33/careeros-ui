import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Close, Work } from "@mui/icons-material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { JobItem } from "../../../../types/company.types";
import { jobSchema, type JobFormType } from "../../../../validation/job.validation";


type Props = {
  open: boolean;
  editJob: JobItem | null;
  onClose: () => void;
  onSave: (job: JobItem) => void;
};

const defaultValues: JobFormType = {
  title: "",
  department: "",
  employmentType: "",
  experience: "",
  location: "",
  workMode: "",
  salaryMin: "",
  salaryMax: "",
  positions: "",
  skills: "",
  description: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
};

const CreateJobDialog = ({
  open,
  editJob,
  onClose,
  onSave,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JobFormType>({
    resolver: zodResolver(jobSchema),
    defaultValues,
    mode: "onSubmit",
  });

  useEffect(() => {
    if (editJob) {
      reset({
        title: editJob.title,
        department: editJob.department,
        employmentType: editJob.employmentType,
        experience: editJob.experience,
        location: editJob.location,
        workMode: editJob.workMode,
        salaryMin: editJob.salaryMin,
        salaryMax: editJob.salaryMax,
        positions: editJob.positions,
        skills: editJob.skills.join(", "),
        description: editJob.description,
        responsibilities: editJob.responsibilities,
        requirements: editJob.requirements,
        benefits: editJob.benefits || "",
      });
    } else {
      reset(defaultValues);
    }
  }, [editJob, open, reset]);

  const onSubmit = (data: JobFormType) => {
    const payload: JobItem = {
      id: editJob?.id || crypto.randomUUID(),
      title: data.title,
      department: data.department,
      employmentType: data.employmentType,
      experience: data.experience,
      location: data.location,
      workMode: data.workMode,
      salaryMin: data.salaryMin,
      salaryMax: data.salaryMax,
      positions: data.positions,
      skills: data.skills
        .split(",")
        .map((x: any) => x.trim())
        .filter(Boolean),
      description: data.description,
      responsibilities: data.responsibilities,
      requirements: data.requirements,
      benefits: data.benefits || "",
      status: editJob?.status || "Open",
      applications: editJob?.applications || 0,
      createdAt: editJob?.createdAt || new Date().toLocaleDateString(),
    };

    onSave(payload);
    reset(defaultValues);
    onClose();
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
                {editJob ? "Edit Job" : "Create New Job"} 💼
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                Add job details, required skills and publish openings.
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" sx={{ p: 3 }} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Job Title"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Department"
                {...register("department")}
                error={!!errors.department}
                helperText={errors.department?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Employment Type"
                defaultValue=""
                {...register("employmentType")}
                error={!!errors.employmentType}
                helperText={errors.employmentType?.message}
              >
                <MenuItem value="">Select Employment Type</MenuItem>
                <MenuItem value="Full Time">Full Time</MenuItem>
                <MenuItem value="Part Time">Part Time</MenuItem>
                <MenuItem value="Contract">Contract</MenuItem>
                <MenuItem value="Internship">Internship</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                select
                fullWidth
                label="Work Mode"
                defaultValue=""
                {...register("workMode")}
                error={!!errors.workMode}
                helperText={errors.workMode?.message}
              >
                <MenuItem value="">Select Work Mode</MenuItem>
                <MenuItem value="Onsite">Onsite</MenuItem>
                <MenuItem value="Remote">Remote</MenuItem>
                <MenuItem value="Hybrid">Hybrid</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Experience"
                placeholder="3 - 5 Years"
                {...register("experience")}
                error={!!errors.experience}
                helperText={errors.experience?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Location"
                {...register("location")}
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Minimum Salary"
                placeholder="1000000"
                {...register("salaryMin")}
                error={!!errors.salaryMin}
                helperText={errors.salaryMin?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Maximum Salary"
                placeholder="1800000"
                {...register("salaryMax")}
                error={!!errors.salaryMax}
                helperText={errors.salaryMax?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Open Positions"
                placeholder="4"
                {...register("positions")}
                error={!!errors.positions}
                helperText={errors.positions?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                label="Required Skills"
                placeholder="React, Node.js, TypeScript"
                {...register("skills")}
                error={!!errors.skills}
                helperText={errors.skills?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Job Description"
                {...register("description")}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Responsibilities"
                {...register("responsibilities")}
                error={!!errors.responsibilities}
                helperText={errors.responsibilities?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Requirements"
                {...register("requirements")}
                error={!!errors.requirements}
                helperText={errors.requirements?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Benefits"
                {...register("benefits")}
                error={!!errors.benefits}
                helperText={errors.benefits?.message}
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            
            spacing={2}
            sx={{ mt: 3, justifyContent: "flex-end" }}
          >
            <Button variant="outlined" onClick={handleClose}>
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