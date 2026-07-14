import { Button, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { ResumeFormType } from "../../../../validation/resume.validation";
import AppTextField from "../../../../components/common/AppTextField";

const Experience = () => {
  const { control } = useFormContext<ResumeFormType>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experiences",
  });

  return (
    <Stack spacing={3}>
      {fields.map((field, index) => (
        <Paper key={field.id} sx={{ p: 3, borderRadius: 4, border: "1px solid #e5e7eb" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2 }} >
            <Typography sx={{ fontWeight: 900 }}>Experience #{index + 1}</Typography>

            {fields.length > 1 && (
              <IconButton color="error" onClick={() => remove(index)}>
                <Delete />
              </IconButton>
            )}
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`experiences.${index}.companyName`} control={control} label="Company Name" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`experiences.${index}.designation`} control={control} label="Designation" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`experiences.${index}.startDate`} control={control} label="Start Date" type="date" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`experiences.${index}.endDate`} control={control} label="End Date" type="date" />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <AppTextField name={`experiences.${index}.description`} control={control} label="Description" multiline rows={4} />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button
        variant="outlined"
        startIcon={<Add />}
        onClick={() =>
          append({
            companyName: "",
            designation: "",
            startDate: "",
            endDate: "",
            description: "",
          })
        }
      >
        Add Experience
      </Button>
    </Stack>
  );
};

export default Experience;