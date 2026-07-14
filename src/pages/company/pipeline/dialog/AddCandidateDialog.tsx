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

import { Close, PersonAdd, UploadFile } from "@mui/icons-material";
import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PipelineCandidate, PipelineStage } from "../../../../types/pipeline.types";
import { addCandidateSchema, type AddCandidateFormType } from "../../../../validation/addCandidate.validation";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (candidate: PipelineCandidate) => void;
};

const jobs = [
  { id: "job-1", title: "Senior Full Stack Developer" },
  { id: "job-2", title: "Senior React Developer" },
  { id: "job-3", title: "Node.js Backend Developer" },
  { id: "job-4", title: "Senior .NET Developer" },
];

const stages: PipelineStage[] = [
  "Applied",
  "Reviewed",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

const defaultValues: AddCandidateFormType = {
  name: "",
  email: "",
  phone: "",
  role: "",
  location: "",
  experience: "",
  skills: "",
  jobId: "job-1",
  currentStage: "Applied",
  summary: "",
};

const AddCandidateDialog = ({ open, onClose, onAdd }: Props) => {
  const [resumeName, setResumeName] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddCandidateFormType>({
    resolver: zodResolver(addCandidateSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleClose = () => {
    reset(defaultValues);
    setResumeName("");
    onClose();
  };

  const onSubmit = (data: AddCandidateFormType) => {
    const selectedJob = jobs.find((x) => x.id === data.jobId);

    const candidate: PipelineCandidate  = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      jobId: data.jobId,
      jobTitle: selectedJob?.title || "",
      location: data.location,
      experience: data.experience,
      matchScore: 85,
      atsScore: 82,
      appliedDate: new Date().toLocaleDateString(),
      currentStage: data.currentStage as PipelineStage,
      skills: data.skills
        .split(",")
        .map((x: any) => x.trim())
        .filter(Boolean),
      summary: data.summary,
      notes: resumeName ? [`Resume uploaded: ${resumeName}`] : [],
    };

    onAdd(candidate);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "#fff",
                display: "grid",
                placeItems: "center",
              }}
            >
              <PersonAdd />
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Add Candidate 👤
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                Add candidate manually into hiring pipeline.
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" sx={{ p: 3 }} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Candidate Name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Current Role"
                {...register("role")}
                error={!!errors.role}
                helperText={errors.role?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Location"
                {...register("location")}
                error={!!errors.location}
                helperText={errors.location?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Experience"
                placeholder="3 Years"
                {...register("experience")}
                error={!!errors.experience}
                helperText={errors.experience?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Job Applied For"
                defaultValue="job-1"
                {...register("jobId")}
                error={!!errors.jobId}
                helperText={errors.jobId?.message}
              >
                {jobs.map((job) => (
                  <MenuItem key={job.id} value={job.id}>
                    {job.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Pipeline Stage"
                defaultValue="Applied"
                {...register("currentStage")}
                error={!!errors.currentStage}
                helperText={errors.currentStage?.message}
              >
                {stages.map((stage) => (
                  <MenuItem key={stage} value={stage}>
                    {stage}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Skills"
                placeholder="React, Node.js, SQL Server"
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
                label="Candidate Summary"
                {...register("summary")}
                error={!!errors.summary}
                helperText={errors.summary?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<UploadFile />}
                sx={{
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 800,
                }}
              >
                Upload Resume
                <input
                  hidden
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setResumeName(file.name);
                  }}
                />
              </Button>

              {resumeName && (
                <Typography sx={{ mt: 1, fontSize: 13 }} color="text.secondary">
                  Selected: {resumeName}
                </Typography>
              )}
            </Grid>
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "flex-end",
              gap: 2,
              mt: 3,
            }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Add Candidate
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default AddCandidateDialog;