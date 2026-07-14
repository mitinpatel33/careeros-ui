import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { ResumeFormType } from "../../../../validation/resume.validation";
import AppTextField from "../../../../components/common/AppTextField";

const PersonalInformation = () => {
  const { control } = useFormContext<ResumeFormType>();

  return (
    <Grid container spacing={2.5}>
      <Grid size={{ xs: 12, md: 6 }}>
        <AppTextField name="fullName" control={control} label="Full Name" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppTextField name="jobTitle" control={control} label="Job Title" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppTextField name="email" control={control} label="Email" />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <AppTextField name="phone" control={control} label="Phone" />
      </Grid>

      <Grid size={{ xs: 12 }}>
        <AppTextField name="location" control={control} label="Location" />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <AppTextField name="linkedIn" control={control} label="LinkedIn" />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <AppTextField name="github" control={control} label="GitHub" />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <AppTextField name="portfolio" control={control} label="Portfolio" />
      </Grid>
    </Grid>
  );
};

export default PersonalInformation;