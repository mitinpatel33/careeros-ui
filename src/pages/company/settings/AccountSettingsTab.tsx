import {
  Alert,
  Button,
  Grid,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";

import { Save } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  accountSettingsSchema,
  type AccountSettingsType,
} from "../../../validation/settings.validation";

const AccountSettingsTab = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountSettingsType>({
    resolver: zodResolver(accountSettingsSchema),
    defaultValues: {
      adminName: "Amit HR",
      adminEmail: "amit@abc.com",
      phone: "9876543210",
      designation: "HR Manager",
    },
  });

  const onSubmit = (data: AccountSettingsType) => {
    console.log("Account Settings:", data);
    setMessage("Account settings saved.");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Alert severity="info">
            Update logged-in admin profile information.
          </Alert>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Admin Name"
                {...register("adminName")}
                error={!!errors.adminName}
                helperText={errors.adminName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Admin Email"
                {...register("adminEmail")}
                error={!!errors.adminEmail}
                helperText={errors.adminEmail?.message}
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
                label="Designation"
                {...register("designation")}
                error={!!errors.designation}
                helperText={errors.designation?.message}
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
            disabled={isSubmitting}
            sx={{ alignSelf: "flex-end", borderRadius: 3 }}
          >
            Save Account
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

export default AccountSettingsTab;