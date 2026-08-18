import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { motion } from "framer-motion";

// Import template components
import ClassicBlueTemplate from "../../../../components/templates/NewTemplate/ClassicBlueTemplate";
import DarkHeaderTemplate from "../../../../components/templates/NewTemplate/DarkHeaderTemplate";
import CoralHeaderTemplate from "../../../../components/templates/NewTemplate/CoralHeaderTemplate";

import { SAMPLE_RESUME_DATA } from "../../../../utils/sampleResumeData";
import BlueSidebarTemplate from "../../../../components/templates/NewTemplate/BlueSidebarTemplate";
import PinkSidebarTemplate from "../../../../components/templates/NewTemplate/PinkSidebarTemplate";
import PhotoTopClassicTemplate from "../../../../components/templates/NewTemplate/PhotoTopClassicTemplate";
import TealDottedTemplate from "../../../../components/templates/NewTemplate/TealDottedTemplate";
import TealBannerTemplate from "../../../../components/templates/NewTemplate/TealBannerTemplate";
import SidebarNetworkTemplate from "../../../../components/templates/NewTemplate/SidebarNetworkTemplate";

// Complete template registry matching the UI preview list
const TEMPLATES = [
  {
    id: "classic-blue",
    name: "Classic Blue",
    count: "1/20",
    description: "A clean and professional layout suitable for traditional roles.",
    component: ClassicBlueTemplate,
  },
  {
    id: "sidebar-network",
    name: "Sidebar Network",
    count: "8/20",
    description: "Warm coral top section with clear left-aligned contact highlight box.",
    component: SidebarNetworkTemplate,
  },
  {
    id: "dark-header",
    name: "Dark Header",
    count: "2/20",
    description: "Modern design featuring a bold top section and sleek typography.",
    component: DarkHeaderTemplate,
  },
  {
    id: "coral-header",
    name: "Coral Header",
    count: "3/20",
    description: "Vibrant accent elements perfect for creative and technology roles.",
    component: CoralHeaderTemplate,
  },
  {
    id: "pink-sidebar",
    name: "Pink Sidebar",
    count: "4/20",
    description: "A dynamic blue-themed grid with left column skill breakdown.",
    component: PinkSidebarTemplate,
  },
  {
    id: "blue-sidebar",
    name: "Blue Sidebar",
    count: "5/20",
    description: "Clean single-column layout with photo header and pill-style skill badges.",
    component: BlueSidebarTemplate,
  },
  {
    id: "photo-top-classic",
    name: "Photo Top Classic",
    count: "6/20",
    description: "Lightweight geometric background accent with soft teal timeline accents.",
    component: PhotoTopClassicTemplate,
  },
  {
    id: "teal-dotted",
    name: "Teal Dotted",
    count: "7/20",
    description: "Structured corporate design with a broad top header and split columns.",
    component: TealDottedTemplate,
  },
  {
    id: "teal-banner",
    name: "Teal Banner",
    count: "8/20",
    description: "Warm coral top section with clear left-aligned contact highlight box.",
    component: TealBannerTemplate,
  },
];

// Handles fluid scaling of standard A4 sized resume templates inside preview cards
const ScaledResumePreview = ({ Component }: { Component: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        // Standard A4 width is ~794px at standard DPI
        const containerWidth = containerRef.current.clientWidth;
        setScale(containerWidth / 794);
      }
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        paddingTop: "141.4%", // Aspect ratio of standard A4 paper (1:1.414)
        position: "relative",
        overflow: "hidden",
        bgcolor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "794px",
          height: "1123px",
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
          userSelect: "none",
        }}
      >
        <Component data={SAMPLE_RESUME_DATA as any} />
      </Box>
    </Box>
  );
};

interface TemplateSelectionStepProps {
  isFirst?: boolean;
  isLast?: boolean;
  onBack: () => void;
  loading: boolean;
  selectedTemplate?: string;
  onSubmit: (values: { selectedTemplate: string }) => void;
}

const TemplateSelectionStep = ({
  onBack,
  loading,
  selectedTemplate: initialSelected,
  onSubmit,
}: TemplateSelectionStepProps) => {
  const [selected, setSelected] = useState<string | undefined>(
    initialSelected || "classic-blue"
  );

  const handleSelect = (id: string) => {
    setSelected(id);
  };

  const handleSubmit = () => {
    if (selected) {
      onSubmit({ selectedTemplate: selected });
    }
  };

  return (
    <Box sx={{ width: "100%", py: 1 }}>
      {/* Title & Subtitle */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}
      >
        Choose a Resume Template
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{ color: "#64748b", mb: 4 }}
      >
        Select one of our expertly designed templates to kickstart your job application.
      </Typography>

      {/* Responsive Grid Displaying All Templates */}
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {TEMPLATES.map((template) => {
          const isSelected = selected === template.id;
          const TemplateComponent = template.component;

          return (
            <Grid key={template.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  elevation={0}
                  onClick={() => handleSelect(template.id)}
                  sx={{
                    bgcolor: "transparent",
                    cursor: "pointer",
                    overflow: "visible",
                  }}
                >
                  <CardActionArea
                    disableRipple
                    sx={{
                      p: 0,
                      borderRadius: "16px",
                      bgcolor: "transparent",
                      "&:hover": { bgcolor: "transparent" },
                    }}
                  >
                    {/* Preview Card Shell */}
                    <Box
                      sx={{
                        position: "relative",
                        p: 1.5,
                        bgcolor: "#f8fafc",
                        borderRadius: "16px",
                        border: isSelected
                          ? "2px solid #2563eb"
                          : "1px solid #e2e8f0",
                        boxShadow: isSelected
                          ? "0 8px 20px -4px rgba(37, 99, 235, 0.2)"
                          : "0 2px 6px rgba(0,0,0,0.02)",
                        transition: "all 0.2s ease-in-out",
                      }}
                    >
                      <ScaledResumePreview Component={TemplateComponent} />

                      {/* Active Selection Overlay */}
                      {isSelected && (
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            bgcolor: "rgba(37, 99, 235, 0.04)",
                            borderRadius: "14px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircleRoundedIcon
                            sx={{
                              fontSize: 44,
                              color: "#2563eb",
                              bgcolor: "#ffffff",
                              borderRadius: "50%",
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Meta Info Below Card */}
                    <Box sx={{ pt: 1.5, px: 0.5 }}>
                      <Stack
                        direction="row"
                        
                        sx={{ mb: 0.25, justifyContent: "space-between",
                        alignItems: "center" }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: isSelected ? "#2563eb" : "#0f172a",
                            fontSize: "0.95rem",
                          }}
                        >
                          {template.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#94a3b8",
                            fontWeight: 600,
                            fontSize: "0.75rem",
                          }}
                        >
                          {template.count}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#64748b",
                          fontSize: "0.78rem",
                          lineHeight: 1.3,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {template.description}
                      </Typography>
                    </Box>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          );
        })}
      </Grid>

      {/* Navigation Footer */}
      <Stack
        direction="row"
        
        sx={{ mt: 5, justifyContent: "space-between",
        alignItems: "center" }}
      >
        <Button
          variant="outlined"
          onClick={onBack}
          disabled={loading}
          sx={{
            minWidth: 90,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            color: "#2563eb",
            borderColor: "#cbd5e1",
            bgcolor: "#ffffff",
            "&:hover": {
              borderColor: "#94a3b8",
              bgcolor: "#f8fafc",
            },
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!selected || loading}
          sx={{
            minWidth: 110,
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
            bgcolor: "#2563eb",
            boxShadow: "0 2px 8px rgba(37, 99, 235, 0.25)",
            "&:hover": {
              bgcolor: "#1d4ed8",
            },
          }}
        >
          {loading ? "Saving..." : "Next Step"}
        </Button>
      </Stack>
    </Box>
  );
};

export default TemplateSelectionStep;