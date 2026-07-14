import { Box, Chip, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import type { ResumeFormType } from "../../../../validation/resume.validation";
import AppTextField from "../../../../components/common/AppTextField";

const Skills = () => {
  const { control, watch } = useFormContext<ResumeFormType>();

  const skills =
    watch("skills")
      ?.split(",")
      .map((x) => x.trim())
      .filter(Boolean) || [];

  return (
    <Stack spacing={3}>
      <AppTextField
        name="skills"
        control={control}
        label="Skills"
        placeholder="React.js, Node.js, TypeScript, MongoDB"
        multiline
        rows={4}
      />

      <Box>
        {skills.map((skill) => (
          <Chip key={skill} label={skill} color="primary" variant="outlined" sx={{ mr: 1, mb: 1 }} />
        ))}
      </Box>
    </Stack>
  );
};

export default Skills;