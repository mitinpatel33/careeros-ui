import { Button, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { ResumeFormType } from "../../../../validation/resume.validation";
import AppTextField from "../../../../components/common/AppTextField";

const Education = () => {
  const { control } = useFormContext<ResumeFormType>();
  const { fields, append, remove } = useFieldArray({ control, name: "educations" });

  return (
    <Stack spacing={3}>
      {fields.map((field, index) => (
        <Paper key={field.id} sx={{ p: 3, borderRadius: 4, border: "1px solid #e5e7eb" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>Education #{index + 1}</Typography>
            {fields.length > 1 && <IconButton color="error" onClick={() => remove(index)}><Delete /></IconButton>}
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`educations.${index}.degree`} control={control} label="Degree" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`educations.${index}.university`} control={control} label="University" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`educations.${index}.passingYear`} control={control} label="Passing Year" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`educations.${index}.grade`} control={control} label="Grade / CGPA" />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="outlined" startIcon={<Add />} onClick={() => append({ degree: "", university: "", passingYear: "", grade: "" })}>
        Add Education
      </Button>
    </Stack>
  );
};

export default Education;