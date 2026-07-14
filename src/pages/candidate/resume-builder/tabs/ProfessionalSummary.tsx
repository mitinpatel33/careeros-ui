import { Button, Stack } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useFormContext } from "react-hook-form";
import type { ResumeFormType } from "../../../../validation/resume.validation";
import AppTextField from "../../../../components/common/AppTextField";

const ProfessionalSummary = () => {
  const { control, setValue } = useFormContext<ResumeFormType>();

  const handleAI = () => {
    setValue(
      "summary",
      "Experienced full stack developer skilled in building scalable web applications using React.js, Node.js, TypeScript, and modern cloud-based technologies."
    );
  };

  return (
    <Stack spacing={2.5}>
      <AppTextField
        name="summary"
        control={control}
        label="Professional Summary"
        multiline
        rows={7}
      />

      <Button variant="outlined" startIcon={<AutoAwesomeIcon />} onClick={handleAI}>
        Generate with AI
      </Button>
    </Stack>
  );
};

export default ProfessionalSummary;