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
import BlueSidebarTemplate from "../../../../components/templates/NewTemplate/BlueSidebarTemplate";
import PinkSidebarTemplate from "../../../../components/templates/NewTemplate/PinkSidebarTemplate";
import PhotoTopClassicTemplate from "../../../../components/templates/NewTemplate/PhotoTopClassicTemplate";
import TealDottedTemplate from "../../../../components/templates/NewTemplate/TealDottedTemplate";
import TealBannerTemplate from "../../../../components/templates/NewTemplate/TealBannerTemplate";
import SidebarNetworkTemplate from "../../../../components/templates/NewTemplate/SidebarNetworkTemplate";
import { SAMPLE_RESUME_DATA } from "../../../../utils/sampleResumeData";

// Visual style tokens for Glassmorphism Theme
const glassStyles = {
  containerBg: "rgba(255, 255, 255, 0.45)",
  cardBg: "rgba(255, 255, 255, 0.65)",
  selectedCardBg: "rgba(238, 242, 255, 0.75)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  selectedBorder: "2px solid #2563eb",
  backdropFilter: "blur(16px)",
  activeGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

const TEMPLATES = [
  {
    id: "classic-blue",
    name: "Classic Blue",
    count: "1/20",
    description:
      "A clean and professional layout suitable for traditional roles.",
    component: ClassicBlueTemplate,
  },
  {
    id: "sidebar-network",
    name: "Sidebar Network",
    count: "8/20",
    description:
      "Warm coral top section with clear left-aligned contact highlight box.",
    component: SidebarNetworkTemplate,
  },
  {
    id: "dark-header",
    name: "Dark Header",
    count: "2/20",
    description:
      "Modern design featuring a bold top section and sleek typography.",
    component: DarkHeaderTemplate,
  },
  {
    id: "coral-header",
    name: "Coral Header",
    count: "3/20",
    description:
      "Vibrant accent elements perfect for creative and technology roles.",
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
    description:
      "Clean single-column layout with photo header and pill-style skill badges.",
    component: BlueSidebarTemplate,
  },
  {
    id: "photo-top-classic",
    name: "Photo Top Classic",
    count: "6/20",
    description:
      "Lightweight geometric background accent with soft teal timeline accents.",
    component: PhotoTopClassicTemplate,
  },
  {
    id: "teal-dotted",
    name: "Teal Dotted",
    count: "7/20",
    description:
      "Structured corporate design with a broad top header and split columns.",
    component: TealDottedTemplate,
  },
  {
    id: "teal-banner",
    name: "Teal Banner",
    count: "8/20",
    description:
      "Warm coral top section with clear left-aligned contact highlight box.",
    component: TealBannerTemplate,
  },
];

const ScaledResumePreview = ({ Component }: { Component: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.25);

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
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
        paddingTop: "141.4%",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 4px 14px rgba(0, 0, 0, 0.06)",
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
    initialSelected || "classic-blue",
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
    <Box
      sx={{
        width: "100%",
        p: { xs: 2.5, md: 3.5 },
        bgcolor: glassStyles.containerBg,
        backdropFilter: glassStyles.backdropFilter,
        WebkitBackdropFilter: glassStyles.backdropFilter,
        border: glassStyles.border,
        borderRadius: "24px",
        boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.05)",
      }}
    >
      {/* Step Heading */}
      <Typography
        variant="h5"
        align="center"
        sx={{
          fontWeight: 800,
          color: "#1e3a8a",
          mb: 0.5,
          fontFamily: glassStyles.fontFamily,
          letterSpacing: "-0.01em",
        }}
      >
        Choose a Resume Template
      </Typography>
      <Typography
        variant="body2"
        align="center"
        sx={{
          color: "#3b82f6",
          mb: 4,
          fontFamily: glassStyles.fontFamily,
          fontWeight: 600,
        }}
      >
        Select one of our expertly designed templates to kickstart your job
        application.
      </Typography>

      {/* Glassmorphism Template Grid */}
      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        {TEMPLATES.map((template) => {
          const isSelected = selected === template.id;
          const TemplateComponent = template.component;

          return (
            <Grid key={template.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
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
                      borderRadius: "18px",
                      bgcolor: "transparent",
                      "&:hover": { bgcolor: "transparent" },
                    }}
                  >
                    {/* Outer Card Glass Container */}
                    <Box
                      sx={{
                        position: "relative",
                        p: 1.5,
                        bgcolor: isSelected
                          ? glassStyles.selectedCardBg
                          : glassStyles.cardBg,
                        backdropFilter: glassStyles.backdropFilter,
                        WebkitBackdropFilter: glassStyles.backdropFilter,
                        borderRadius: "18px",
                        border: isSelected
                          ? glassStyles.selectedBorder
                          : glassStyles.border,
                        boxShadow: isSelected
                          ? "0 10px 25px rgba(37, 99, 235, 0.25)"
                          : "0 4px 12px rgba(0, 0, 0, 0.03)",
                        transition: "all 0.25s ease-in-out",
                      }}
                    >
                      <ScaledResumePreview Component={TemplateComponent} />

                      {/* Active Checkmark Overlay */}
                      {isSelected && (
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            bgcolor: "rgba(37, 99, 235, 0.1)",
                            backdropFilter: "blur(2px)",
                            borderRadius: "16px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <CheckCircleRoundedIcon
                            sx={{
                              fontSize: 48,
                              color: "#2563eb",
                              bgcolor: "#ffffff",
                              borderRadius: "50%",
                              boxShadow: "0 4px 16px rgba(37, 99, 235, 0.3)",
                            }}
                          />
                        </Box>
                      )}
                    </Box>

                    {/* Meta Label Info */}
                    <Box sx={{ pt: 1.5, px: 0.5 }}>
                      <Stack
                        direction="row"
                        sx={{
                          mb: 0.5,
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: isSelected ? "#1d4ed8" : "#0f172a",
                            fontSize: "0.95rem",
                            fontFamily: glassStyles.fontFamily,
                          }}
                        >
                          {template.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{
                            color: "#3b82f6",
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            fontFamily: glassStyles.fontFamily,
                            bgcolor: "rgba(219, 234, 254, 0.6)",
                            px: 1,
                            py: 0.2,
                            borderRadius: "12px",
                          }}
                        >
                          {template.count}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#475569",
                          fontSize: "0.78rem",
                          fontFamily: glassStyles.fontFamily,
                          fontWeight: 500,
                          lineHeight: 1.35,
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

      {/* Navigation Footer Controls */}
      <Stack
        direction="row"
        sx={{ mt: 5, justifyContent: "space-between", alignItems: "center" }}
      >
        <Button
          variant="outlined"
          onClick={onBack}
          disabled={loading}
          sx={{
            minWidth: 100,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontFamily: glassStyles.fontFamily,
            color: "#1d4ed8",
            borderColor: "rgba(147, 197, 253, 0.8)",
            bgcolor: "rgba(255, 255, 255, 0.6)",
            backdropFilter: glassStyles.backdropFilter,
            "&:hover": {
              borderColor: "#2563eb",
              bgcolor: "rgba(255, 255, 255, 0.9)",
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
            minWidth: 130,
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 700,
            fontFamily: glassStyles.fontFamily,
            background: glassStyles.activeGradient,
            boxShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
            px: 3,
            py: 1,
            "&:hover": {
              background: glassStyles.activeGradient,
              opacity: 0.95,
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
