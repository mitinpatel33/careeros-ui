import { Button, Grid, IconButton, Paper, Stack, Typography } from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { useFieldArray, useFormContext } from "react-hook-form";
import type { ResumeFormType } from "../../../../validation/resume.validation";
import AppTextField from "../../../../components/common/AppTextField";

const Projects = () => {
  const { control } = useFormContext<ResumeFormType>();
  const { fields, append, remove } = useFieldArray({ control, name: "projects" });

  return (
    <Stack spacing={3}>
      {fields.map((field, index) => (
        <Paper key={field.id} sx={{ p: 3, borderRadius: 4, border: "1px solid #e5e7eb" }}>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>Project #{index + 1}</Typography>
            {fields.length > 1 && <IconButton color="error" onClick={() => remove(index)}><Delete /></IconButton>}
          </Stack>

          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`projects.${index}.title`} control={control} label="Project Title" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`projects.${index}.techStack`} control={control} label="Tech Stack" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`projects.${index}.liveUrl`} control={control} label="Live URL" />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <AppTextField name={`projects.${index}.githubUrl`} control={control} label="GitHub URL" />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <AppTextField name={`projects.${index}.description`} control={control} label="Description" multiline rows={4} />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Button variant="outlined" startIcon={<Add />} onClick={() => append({ title: "", techStack: "", description: "", liveUrl: "", githubUrl: "" })}>
        Add Project
      </Button>
    </Stack>
  );
};

export default Projects;