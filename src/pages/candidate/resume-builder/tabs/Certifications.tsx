import { Button, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { ResumeFormType } from "../../../../validation/resume.validation";
import AppTextField from "../../../../components/common/AppTextField";

const Certifications = () => {
  const { control } = useFormContext<ResumeFormType>();
  const { fields, append, remove } = useFieldArray({ control, name: "certifications" });

  return (
    <Stack spacing={3}>
      {fields.map((field, index) => (
        <Paper key={field.id} sx={{ p: 3, borderRadius: 4, border: "1px solid #e5e7eb" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>Certification #{index + 1}</Typography>
            {fields.length > 1 && <IconButton color="error" onClick={() => remove(index)}><Delete /></IconButton>}
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`certifications.${index}.name`} control={control} label="Certificate Name" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`certifications.${index}.organization`} control={control} label="Organization" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`certifications.${index}.issueDate`} control={control} label="Issue Date" type="date" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`certifications.${index}.credentialUrl`} control={control} label="Credential URL" />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="outlined" startIcon={<Add />} onClick={() => append({ name: "", organization: "", issueDate: "", credentialUrl: "" })}>
        Add Certification
      </Button>
    </Stack>
  );
};

export default Certifications;