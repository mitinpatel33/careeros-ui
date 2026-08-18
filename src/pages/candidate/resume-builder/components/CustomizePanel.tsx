import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Drawer,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";

import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import StyleRoundedIcon from "@mui/icons-material/StyleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

import { resumeTemplates } from "../../../../data/resumeTemplates";
import type {
  ResumeTemplateId,
  ResumeThemeColor,
} from "../../../../types/candidate/resume.types";
import type { TemplateCategory } from "../../../../types/resumeTemplate.types";

const colors: { label: string; value: ResumeThemeColor; color: string }[] = [
  { label: "Blue", value: "blue", color: "#1976d2" },
  { label: "Black", value: "black", color: "#111827" },
  { label: "Green", value: "green", color: "#16a34a" },
  { label: "Purple", value: "purple", color: "#7c3aed" },
  { label: "Orange", value: "orange", color: "#ea580c" },
];

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

type Props = {
  themeColor: ResumeThemeColor;
  selectedTemplate: ResumeTemplateId;
  onThemeChange: (color: ResumeThemeColor) => void;
  onTemplateChange: (template: ResumeTemplateId) => void;
};

const CustomizePanel = ({
  themeColor,
  selectedTemplate,
  onThemeChange,
  onTemplateChange,
}: Props) => {
  const [templateOpen, setTemplateOpen] = useState(false);
  const [category, setCategory] = useState<"All" | TemplateCategory>("All");
  const [search, setSearch] = useState("");

  const filteredTemplates = useMemo(() => {
    return resumeTemplates.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const searchMatch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [category, search]);

  const activeTemplate = resumeTemplates.find(
    (item) => item.id === selectedTemplate,
  );

  return (
    <>
      <Stack spacing={2}>
        {/* Template Button */}
        <Paper
          onClick={() => setTemplateOpen(true)}
          sx={{
            p: 2.2,
            borderRadius: 5,
            cursor: "pointer",
            bgcolor: "rgba(255,255,255,0.85)",
            border: "1px solid #e5e7eb",
            boxShadow: "0 20px 55px rgba(15,23,42,0.12)",
            transition: "0.25s",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 24px 65px rgba(15,23,42,0.16)",
            },
          }}
        >
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
            <StyleRoundedIcon color="primary" />

            <Box sx={{ flex: 1 }}>
              <Typography sx={{ fontWeight: 950 }}>
                Choose Template
              </Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                {activeTemplate?.name ?? "Select resume template"}
              </Typography>
            </Box>

            <Chip label="Open" size="small" color="primary" />
          </Stack>
        </Paper>

        {/* Color Settings */}
        <Paper
          sx={{
            p: 2.2,
            borderRadius: 5,
            bgcolor: "rgba(255,255,255,0.85)",
            border: "1px solid #e5e7eb",
            boxShadow: "0 20px 55px rgba(15,23,42,0.12)",
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 2, alignItems: "center" }}
          >
            <PaletteRoundedIcon color="primary" />
            <Box>
              <Typography sx={{ fontWeight: 950 }}>
                Customize Color
              </Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                Choose resume theme
              </Typography>
            </Box>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, 1fr)",
                sm: "repeat(5, 1fr)",
                xl: "1fr",
              },
              gap: 1,
            }}
          >
            {colors.map((item) => {
              const active = themeColor === item.value;

              return (
                <motion.div
                  key={item.value}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Paper
                    onClick={() => onThemeChange(item.value)}
                    sx={{
                      p: 1.3,
                      borderRadius: 3,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      border: active
                        ? "2px solid #2563eb"
                        : "1px solid #e5e7eb",
                      bgcolor: active ? "#eff6ff" : "#fff",
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: item.color,
                      }}
                    />

                    <Typography sx={{ fontWeight: 900, fontSize: 14 }}>
                      {item.label}
                    </Typography>
                  </Paper>
                </motion.div>
              );
            })}
          </Box>
        </Paper>

        {/* Score */}
        <Paper
          sx={{
            p: 2.2,
            borderRadius: 5,
            bgcolor: "#111827",
            color: "#fff",
            boxShadow: "0 20px 55px rgba(15,23,42,0.25)",
          }}
        >
          <Stack direction="row" spacing={1.3} sx={{ alignItems: "center" }}>
            <AutoGraphRoundedIcon />
            <Box>
              <Typography sx={{ fontWeight: 950 }}>Resume Score</Typography>
              <Typography sx={{ fontSize: 30, fontWeight: 950 }}>
                100%
              </Typography>
              <Typography sx={{ fontSize: 13, opacity: 0.8 }}>
                Ready to download ✨
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Stack>

      {/* Template Drawer */}
      <Drawer
        anchor="right"
        open={templateOpen}
        onClose={() => setTemplateOpen(false)}
      >
        <Box
          sx={{
            width: { xs: "100vw", sm: 440 },
            height: "100%",
            p: 2.5,
            bgcolor: "#f8fafc",
          }}
        >
          <Stack
            direction="row"
            sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}
          >
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 950 }}>
                Templates 🎨
              </Typography>
              <Typography sx={{ fontSize: 13, color: "text.secondary" }}>
                Select resume template design.
              </Typography>
            </Box>

            <IconButton onClick={() => setTemplateOpen(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#fff",
                },
              }}
            />

            <TextField
              select
              size="small"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as "All" | TemplateCategory)
              }
              sx={{
                minWidth: 140,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                  bgcolor: "#fff",
                },
              }}
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Stack>

          <Stack
            spacing={1.4}
            sx={{
              height: "calc(100vh - 145px)",
              overflowY: "auto",
              pr: 0.5,
              "&::-webkit-scrollbar": { width: 6 },
              "&::-webkit-scrollbar-thumb": {
                bgcolor: "#cbd5e1",
                borderRadius: 10,
              },
            }}
          >
            {filteredTemplates.map((template, index) => {
              const active = selectedTemplate === template.id;

              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Paper
                    onClick={() => {
                      onTemplateChange(template.id);
                      setTemplateOpen(false);
                    }}
                    sx={{
                      p: 1.4,
                      borderRadius: 4,
                      cursor: "pointer",
                      border: active
                        ? "2px solid #2563eb"
                        : "1px solid #e5e7eb",
                      bgcolor: active ? "#eff6ff" : "#fff",
                      position: "relative",
                      transition: "0.25s",
                      "&:hover": {
                        transform: "translateY(-3px)",
                        boxShadow: "0 14px 30px rgba(15,23,42,0.12)",
                      },
                    }}
                  >
                    {active && (
                      <CheckCircleRoundedIcon
                        color="primary"
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 12,
                          bgcolor: "#fff",
                          borderRadius: "50%",
                        }}
                      />
                    )}

                    <Stack direction="row" spacing={1.5}>
                      <Box
                        sx={{
                          width: 128,
                          height: 92,
                          flexShrink: 0,
                          borderRadius: 3,
                          p: 1.3,
                          background:
                            template.id === "futuristicGradient"
                              ? "linear-gradient(135deg,#2563eb,#9333ea)"
                              : template.primaryColor,
                        }}
                      >
                        <Box
                          sx={{
                            width: "65%",
                            height: 7,
                            borderRadius: 10,
                            bgcolor: "#fff",
                            mb: 1,
                          }}
                        />
                        <Box
                          sx={{
                            width: "85%",
                            height: 5,
                            borderRadius: 10,
                            bgcolor: "rgba(255,255,255,0.7)",
                          }}
                        />
                      </Box>

                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 950 }} noWrap>
                          {template.name}
                        </Typography>

                        <Stack direction="row" spacing={0.7} sx={{ my: 0.7 }}>
                          <Chip
                            label={template.category}
                            size="small"
                            sx={{ height: 22, fontSize: 11 }}
                          />

                          {template.category === "ATS" && (
                            <Chip
                              label="ATS"
                              size="small"
                              color="success"
                              variant="outlined"
                              sx={{ height: 22, fontSize: 11 }}
                            />
                          )}
                        </Stack>

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
                    </Stack>
                  </Paper>
                </motion.div>
              );
            })}
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default CustomizePanel;