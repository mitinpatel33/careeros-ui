import {
  Box,
  Button,
  Checkbox,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import type { ResumeSectionKey } from "../../types/candidate/resume.types";
import { resumeSections } from "../../data/resumeSections";

type Props = {
  selectedSections: ResumeSectionKey[];
  loading: boolean;
  onChange: (sections: ResumeSectionKey[]) => void;
  onSubmit: () => void;
};

const SectionSelector = ({
  selectedSections,
  loading,
  onChange,
  onSubmit,
}: Props) => {
  const toggleSection = (key: ResumeSectionKey, required?: boolean) => {
    if (required) return;

    const exists = selectedSections.includes(key);

    onChange(
      exists
        ? selectedSections.filter((item) => item !== key)
        : [...selectedSections, key],
    );
  };

  const selectAll = () => {
    onChange(resumeSections.map((item) => item.key));
  };

  const clearOptional = () => {
    onChange(
      resumeSections.filter((item) => item.required).map((item) => item.key),
    );
  };

  return (
    <Paper
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
        borderRadius: 5,
        boxShadow: "0 20px 55px rgba(15,23,42,0.08)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Box>
          <Typography
            variant="h5"
            sx={{ fontWeight: 900, fontSize: { xs: 22, md: 28 } }}
          >
            Choose Resume Sections ✅
          </Typography>
          <Typography color="text.secondary">
            Select which details you want to show in your resume.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          <Button variant="outlined" onClick={selectAll}>
            Select All
          </Button>
          <Button variant="outlined" color="error" onClick={clearOptional}>
            Clear Optional
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {resumeSections.map((section) => {
          const Icon = section.icon;
          const checked = selectedSections.includes(section.key);

          return (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={section.key}>
              <Paper
                onClick={() => toggleSection(section.key, section.required)}
                sx={{
                  p: 2,
                  borderRadius: 4,
                  cursor: section.required ? "not-allowed" : "pointer",
                  minHeight: 112,
                  transition: "0.25s ease",
                  border: checked ? "2px solid #1976d2" : "1px solid #e5e7eb",
                  bgcolor: checked ? "#eff6ff" : "#fff",
                  "&:hover": {
                    transform: section.required ? "none" : "translateY(-4px)",
                    boxShadow: "0 12px 32px rgba(15,23,42,0.12)",
                  },
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  sx={{ alignItems: "flex-start" }}
                >
                  <Checkbox checked={checked} sx={{ p: 0.3 }} />
                  <Icon color={checked ? "primary" : "disabled"} />

                  <Box sx={{ flex: 1 }}>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: "center" }}
                    >
                      <Typography sx={{ fontWeight: 900 }}>
                        {section.label}
                      </Typography>
                      {section.required && (
                        <Chip size="small" label="Required" color="primary" />
                      )}
                    </Stack>

                    <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                      {section.description}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      <Stack direction="row" sx={{ mt: 4, justifyContent: "flex-end" }}>
        <Button
          size="large"
          variant="contained"
          disabled={selectedSections.length === 0 || loading}
          onClick={onSubmit}
          sx={{
            px: { xs: 2.5, md: 5 },
            py: 1.2,
            borderRadius: 3,
            fontWeight: 800,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          {loading ? "Loading..." : "Submit & Preview"}
        </Button>
      </Stack>
    </Paper>
  );
};

export default SectionSelector;
