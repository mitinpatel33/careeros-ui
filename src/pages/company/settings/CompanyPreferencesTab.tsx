import {
  Alert,
  Button,
  Grid,
  MenuItem,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";

import { Save } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  companyPreferencesSchema,
  type CompanyPreferencesType,
} from "../../../validation/settings.validation";

const CompanyPreferencesTab = () => {
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyPreferencesType>({
    resolver: zodResolver(companyPreferencesSchema),
    defaultValues: {
      companyName: "ABC Technologies",
      website: "https://abc.com",
      industry: "IT Services",
      companySize: "51-200",
      timezone: "Asia/Kolkata",
      defaultCurrency: "INR",
    },
  });

  const onSubmit = (data: CompanyPreferencesType) => {
    console.log("Company Preferences:", data);
    setMessage("Company preferences saved.");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={3}>
          <Alert severity="info">
            These details are used in job posts, emails and offer letters.
          </Alert>

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Company Name"
                {...register("companyName")}
                error={!!errors.companyName}
                helperText={errors.companyName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Website"
                {...register("website")}
                error={!!errors.website}
                helperText={errors.website?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Industry"
                {...register("industry")}
                error={!!errors.industry}
                helperText={errors.industry?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Company Size"
                defaultValue="51-200"
                {...register("companySize")}
                error={!!errors.companySize}
                helperText={errors.companySize?.message}
              >
                <MenuItem value="1-10">1-10</MenuItem>
                <MenuItem value="11-50">11-50</MenuItem>
                <MenuItem value="51-200">51-200</MenuItem>
                <MenuItem value="201-500">201-500</MenuItem>
                <MenuItem value="500+">500+</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Timezone"
                defaultValue="Asia/Kolkata"
                {...register("timezone")}
                error={!!errors.timezone}
                helperText={errors.timezone?.message}
              >
                <MenuItem value="Asia/Kolkata">Asia/Kolkata</MenuItem>
                <MenuItem value="UTC">UTC</MenuItem>
                <MenuItem value="America/New_York">America/New_York</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Default Currency"
                defaultValue="INR"
                {...register("defaultCurrency")}
                error={!!errors.defaultCurrency}
                helperText={errors.defaultCurrency?.message}
              >
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            startIcon={<Save />}
            disabled={isSubmitting}
            sx={{ alignSelf: "flex-end", borderRadius: 3 }}
          >
            Save Changes
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

export default CompanyPreferencesTab;