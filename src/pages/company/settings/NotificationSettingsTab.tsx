import {
  Alert,
  Button,
  FormControlLabel,
  Grid,
  Snackbar,
  Stack,
  Switch,
  TextField,
} from "@mui/material";

import { Save } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  notificationSettingsSchema,
  type NotificationSettingsType,
} from "../../../validation/settings.validation";

const NotificationSettingsTab = () => {
  const [message, setMessage] = useState("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NotificationSettingsType>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      applicationEmail: true,
      interviewEmail: true,
      candidateStatusEmail: true,
      weeklyReportEmail: false,
      emailSenderName: "ABC Technologies HR",
      replyToEmail: "hr@abc.com",
    },
  });

  const onSubmit = (data: NotificationSettingsType) => {
    console.log("Notification Settings:", data);
    setMessage("Notification settings saved.");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Alert severity="info">
            Manage email notifications sent to candidates and recruiters.
          </Alert>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email Sender Name"
                {...register("emailSenderName")}
                error={!!errors.emailSenderName}
                helperText={errors.emailSenderName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Reply To Email"
                {...register("replyToEmail")}
                error={!!errors.replyToEmail}
                helperText={errors.replyToEmail?.message}
              />
            </Grid>

            {[
              ["applicationEmail", "Application received emails"],
              ["interviewEmail", "Interview schedule emails"],
              ["candidateStatusEmail", "Candidate status update emails"],
              ["weeklyReportEmail", "Weekly hiring report emails"],
            ].map(([name, label]) => (
              <Grid key={name} size={{ xs: 12, md: 6 }}>
                <Controller
                  name={name as keyof NotificationSettingsType}
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={Boolean(field.value)}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      }
                      label={label}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>

          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
            disabled={isSubmitting}
            sx={{ alignSelf: "flex-end", borderRadius: 3 }}
          >
            Save Notifications
          </Button>
        </Stack>
      </form>

      <Snackbar
        open={!!message}
        autoHideDuration={2500}
        message={message}
        onClose={() => setMessage("")}
      />
    </>
  );
};

export default NotificationSettingsTab;