import { Button, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFieldArray, useFormContext } from "react-hook-form";
import AppTextField from "../../../../components/common/AppTextField";
import type { ResumeFormType } from "../../../../validation/resume.validation";

const References = () => {
  const { control } = useFormContext<ResumeFormType>();
  const { fields, append, remove } = useFieldArray({ control, name: "references" });

  return (
    <Stack spacing={3}>
      {fields.map((field, index) => (
        <Paper key={field.id} sx={{ p: 3, borderRadius: 4, border: "1px solid #e5e7eb" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>Reference #{index + 1}</Typography>
            {fields.length > 1 && <IconButton color="error" onClick={() => remove(index)}><Delete /></IconButton>}
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`references.${index}.name`} control={control} label="Name" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`references.${index}.company`} control={control} label="Company" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`references.${index}.email`} control={control} label="Email" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`references.${index}.phone`} control={control} label="Phone" />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="outlined" startIcon={<Add />} onClick={() => append({ name: "", company: "", email: "", phone: "" })}>
        Add Reference
      </Button>
    </Stack>
  );
};

export default References;