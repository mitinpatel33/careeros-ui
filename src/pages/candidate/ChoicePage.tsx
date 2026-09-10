import React from "react";
import {
  Box,
  Grid,
  Typography,
  Card,
  CardActionArea,
  Stack,
} from "@mui/material";
import {
  AutoAwesome,
  EditNoteRounded,
  ArrowForwardRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const themeStyles = {
  titleColor: "#1d4ed8",
  activeGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  activeShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
  glassBg: "rgba(255, 255, 255, 0.65)",
  glassFilter: "blur(16px)",
  glassBorder: "1px solid rgba(255, 255, 255, 0.8)",
};

interface ChoicePageProps {
  onCreateResume: () => void;
  onImportResume: () => void;
}

export const ChoicePage: React.FC<ChoicePageProps> = ({
  onCreateResume,
  onImportResume,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 4 },
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: 1000 }}
      >
        <Box
          sx={{
            p: { xs: 3, sm: 5, md: 6 },
            bgcolor: themeStyles.glassBg,
            backdropFilter: themeStyles.glassFilter,
            WebkitBackdropFilter: themeStyles.glassFilter,
            borderRadius: "32px",
            border: themeStyles.glassBorder,
            boxShadow: "0 20px 40px rgba(37, 99, 235, 0.08)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: themeStyles.titleColor,
              mb: 1.5,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: { xs: "1.8rem", sm: "2.4rem" },
            }}
          >
            How would you like to build your profile? ✨
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              mb: 5,
              maxWidth: 600,
              mx: "auto",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: { xs: "0.95rem", sm: "1.05rem" },
            }}
          >
            Choose an option below to get started instantly. Import an existing
            resume using our AI parser or craft a fresh resume from scratch
            step-by-step.
          </Typography>

          <Grid container spacing={4} sx={{ justifyContent: "center" }}>
            {/* Create Resume Choice Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "24px",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(239, 246, 255, 0.9) 100%)",
                    border: "2px solid rgba(59, 130, 246, 0.3)",
                    boxShadow: "0 12px 30px rgba(37, 99, 235, 0.08)",
                    textAlign: "left",
                  }}
                >
                  <CardActionArea
                    onClick={onCreateResume}
                    sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}
                  >
                    <Stack spacing={2.5}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: "20px",
                          background: themeStyles.activeGradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          boxShadow: themeStyles.activeShadow,
                        }}
                      >
                        <EditNoteRounded sx={{ fontSize: 32 }} />
                      </Box>

                      <Stack spacing={1}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            color: themeStyles.titleColor,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          Create Resume
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#64748b",
                            lineHeight: 1.6,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          Build your professional resume manually step-by-step
                          with structured guidance, custom templates, and
                          real-time formatting controls.
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          alignItems: "center",
                          color: "#2563eb",
                          pt: 1,
                          fontWeight: 700,
                        }}
                      >
                        <span>Get Started</span>
                        <ArrowForwardRounded fontSize="small" />
                      </Stack>
                    </Stack>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>

            {/* Import Resume with AI Choice Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "24px",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(238, 242, 255, 0.9) 100%)",
                    border: "2px solid rgba(99, 102, 241, 0.3)",
                    boxShadow: "0 12px 30px rgba(99, 102, 241, 0.08)",
                    textAlign: "left",
                  }}
                >
                  <CardActionArea
                    onClick={onImportResume}
                    sx={{ p: { xs: 3, sm: 4 }, height: "100%" }}
                  >
                    <Stack spacing={2.5}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: "20px",
                          background:
                            "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          boxShadow: "0 8px 20px rgba(99, 102, 241, 0.35)",
                        }}
                      >
                        <AutoAwesome sx={{ fontSize: 32 }} />
                      </Box>

                      <Stack spacing={1}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            color: "#3730a3",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          Import Resume with AI
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#64748b",
                            lineHeight: 1.6,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                          }}
                        >
                          Upload your existing resume (PDF or Word) and let our
                          intelligent engine auto-fill all your profile sections
                          instantly.
                        </Typography>
                      </Stack>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{
                          alignItems: "center",
                          color: "#4338ca",
                          pt: 1,
                          fontWeight: 700,
                        }}
                      >
                        <span>Upload & Auto-fill</span>
                        <ArrowForwardRounded fontSize="small" />
                      </Stack>
                    </Stack>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Box>
  );
};
