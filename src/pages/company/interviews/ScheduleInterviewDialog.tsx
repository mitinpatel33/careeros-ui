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

import { Close, Event } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type {
  InterviewItem,
  InterviewType,
} from "../../../types/interview.types";
import { scheduleInterviewSchema, type ScheduleInterviewFormType } from "../../../validation/interview.validation";


type Props = {
  open: boolean;
  onClose: () => void;
  onSchedule: (interview: InterviewItem) => void;
};

const defaultValues: ScheduleInterviewFormType = {
  candidateName: "",
  candidateRole: "",
  candidateEmail: "",
  interviewerName: "",
  interviewerEmail: "",
  interviewDate: "",
  interviewTime: "",
  interviewType: "Technical",
  meetingLink: "",
  notes: "",
};

const ScheduleInterviewDialog = ({
  open,
  onClose,
  onSchedule,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ScheduleInterviewFormType>({
    resolver: zodResolver(scheduleInterviewSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = (data: ScheduleInterviewFormType) => {
    const interview: InterviewItem = {
      id: crypto.randomUUID(),
      candidateName: data.candidateName,
      candidateRole: data.candidateRole,
      candidateEmail: data.candidateEmail,
      interviewerName: data.interviewerName,
      interviewerEmail: data.interviewerEmail,
      interviewDate: data.interviewDate,
      interviewTime: data.interviewTime,
      interviewType: data.interviewType as InterviewType,
      meetingLink: data.meetingLink || "",
      notes: data.notes || "",
      status: "Scheduled",
    };

    onSchedule(interview);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ p: 3 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
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
              <Event />
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Schedule Interview 📅
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                Schedule HR, technical or final interview.
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
                label="Candidate Name"
                {...register("candidateName")}
                error={!!errors.candidateName}
                helperText={errors.candidateName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Candidate Role"
                {...register("candidateRole")}
                error={!!errors.candidateRole}
                helperText={errors.candidateRole?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Candidate Email"
                {...register("candidateEmail")}
                error={!!errors.candidateEmail}
                helperText={errors.candidateEmail?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Interviewer Name"
                {...register("interviewerName")}
                error={!!errors.interviewerName}
                helperText={errors.interviewerName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Interviewer Email"
                {...register("interviewerEmail")}
                error={!!errors.interviewerEmail}
                helperText={errors.interviewerEmail?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Interview Type"
                defaultValue="Technical"
                {...register("interviewType")}
                error={!!errors.interviewType}
                helperText={errors.interviewType?.message}
              >
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Technical">Technical</MenuItem>
                <MenuItem value="Final">Final</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                label="Interview Date"
                {...register("interviewDate")}
                error={!!errors.interviewDate}
                helperText={errors.interviewDate?.message}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="time"
                label="Interview Time"
                {...register("interviewTime")}
                error={!!errors.interviewTime}
                helperText={errors.interviewTime?.message}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Meeting Link"
                placeholder="https://meet.google.com/xxx"
                {...register("meetingLink")}
                error={!!errors.meetingLink}
                helperText={
                  errors.meetingLink?.message ||
                  "Optional: Google Meet / Zoom / Teams link"
                }
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Notes"
                {...register("notes")}
                error={!!errors.notes}
                helperText={errors.notes?.message}
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
              Schedule Interview
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleInterviewDialog;