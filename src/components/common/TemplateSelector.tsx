import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import type { ResumeTemplateId } from "../../types/candidate/resume.types";
import type { TemplateCategory } from "../../types/resumeTemplate.types";
import { resumeTemplates } from "../../data/resumeTemplates";

type Props = {
  selectedTemplate: ResumeTemplateId;
  onChange: (template: ResumeTemplateId) => void;
};

const categories: ("All" | TemplateCategory)[] = [
  "All",
  "ATS",
  "Professional",
  "Modern",
  "Creative",
  "Minimal",
  "Sidebar",
  "Two Column",
];

const TemplateSelector = ({ selectedTemplate, onChange }: Props) => {
  const [category, setCategory] = useState<"All" | TemplateCategory>("All");
  const [search, setSearch] = useState("");

  const filteredTemplates = useMemo(() => {
    return resumeTemplates.filter((item: any) => {
      const categoryMatch = category === "All" || item.category === category;
      const searchMatch = item.name.toLowerCase().includes(search.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  return (
    <Paper
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        boxShadow: "0 16px 40px rgba(15,23,42,0.08)",
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        
        spacing={2}
        sx={{ mb: 3, justifyContent: "space-between", alignItems: { xs: "stretch", md: "center" } }} 
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            Choose Resume Template 🎨
          </Typography>
          <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
            Select professional template for candidate resume.
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <TextField
            size="small"
            placeholder="Search template"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ minWidth: { xs: "100%", sm: 220 } }}
          />

          <TextField
            select
            size="small"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as "All" | TemplateCategory)
            }
            sx={{ minWidth: { xs: "100%", sm: 160 } }}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Stack>

      <Grid container spacing={2}>
        {filteredTemplates.map((template: any) => {
          const active = selectedTemplate === template.id;

          return (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={template.id}>
              <Paper
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  height: 235,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  border: active
                    ? "2px solid #1976d2"
                    : "1px solid #e5e7eb",
                  bgcolor: active ? "#eff6ff" : "#fff",
                  transition: "0.25s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(15,23,42,0.12)",
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      height: 80,
                      borderRadius: 2.5,
                      bgcolor: template.primaryColor,
                      mb: 1.5,
                      p: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        width: "65%",
                        height: 7,
                        borderRadius: 5,
                        bgcolor: "#fff",
                        mb: 1.2,
                      }}
                    />
                    <Box
                      sx={{
                        width: "82%",
                        height: 5,
                        borderRadius: 5,
                        bgcolor: "rgba(255,255,255,0.65)",
                      }}
                    />
                  </Box>

                  <Typography sx={{ fontWeight: 900, fontSize: 14 }}>
                    {template.name}
                  </Typography>

                  <Chip
                    label={template.category}
                    size="small"
                    sx={{
                      mt: 0.8,
                      mb: 0.8,
                      height: 22,
                      fontSize: 11,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "text.secondary",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {template.description}
                  </Typography>
                </Box>

                <Button
                  size="small"
                  fullWidth
                  variant={active ? "contained" : "outlined"}
                  onClick={() => onChange(template.id)}
                  sx={{
                    borderRadius: 2,
                    fontWeight: 800,
                    textTransform: "none",
                  }}
                >
                  {active ? "Selected" : "Use Template"}
                </Button>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default TemplateSelector;