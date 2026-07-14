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

import { Lock } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  securitySettingsSchema,
  type SecuritySettingsType,
} from "../../../validation/settings.validation";

const SecuritySettingsTab = () => {
  const [message, setMessage] = useState("");

  const {
    control,
    register,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm<SecuritySettingsType>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      twoFactorEnabled: false,
    },
  });

  const onSubmit = (data: SecuritySettingsType) => {
    console.log("Security Settings:", data);
    setMessage("Security settings saved.");

    resetField("currentPassword");
    resetField("newPassword");
    resetField("confirmPassword");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Alert severity="warning">
            Update password and enable two-factor authentication for better security.
          </Alert>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12 }}>
              <Controller
                name="twoFactorEnabled"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Enable Two Factor Authentication"
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="password"
                label="Current Password"
                {...register("currentPassword")}
                error={!!errors.currentPassword}
                helperText={errors.currentPassword?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="password"
                label="New Password"
                {...register("newPassword")}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="password"
                label="Confirm Password"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            startIcon={<Lock />}
            disabled={isSubmitting}
            sx={{ alignSelf: "flex-end", borderRadius: 3 }}
          >
            Update Security
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

export default SecuritySettingsTab;