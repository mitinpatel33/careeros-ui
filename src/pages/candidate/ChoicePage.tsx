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
  PsychologyAltRounded,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const themeStyles = {
  titleColor: "#1d4ed8",
  activeGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  activeShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
  glassBg: "rgba(255, 255, 255, 0.75)",
  glassFilter: "blur(16px)",
  glassBorder: "1px solid rgba(255, 255, 255, 0.9)",
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
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
        boxSizing: "border-box",
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%", maxWidth: 960 }}
      >
        <Box
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            bgcolor: themeStyles.glassBg,
            backdropFilter: themeStyles.glassFilter,
            WebkitBackdropFilter: themeStyles.glassFilter,
            borderRadius: "28px",
            border: themeStyles.glassBorder,
            boxShadow: "0 20px 40px rgba(37, 99, 235, 0.08)",
            textAlign: "center",
          }}
        >
          {/* Animated Header Icon properly spaced inside container flow */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <motion.div
              animate={{
                rotate: [0, 8, -8, 8, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(59, 130, 246, 0.3)",
                }}
              >
                <PsychologyAltRounded sx={{ fontSize: 28 }} />
              </Box>
            </motion.div>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: themeStyles.titleColor,
              mb: 1,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: { xs: "1.6rem", sm: "2.2rem" },
            }}
          >
            How would you like to build your profile?
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: "#475569",
              mb: { xs: 3, md: 4 },
              maxWidth: 580,
              mx: "auto",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: { xs: "0.9rem", sm: "1rem" },
              lineHeight: 1.5,
            }}
          >
            Choose an option below to get started instantly. Import an existing
            resume using our AI parser or craft a fresh resume from scratch
            step-by-step.
          </Typography>

          <Grid container spacing={3} sx={{ justifyContent: "center" }}>
            {/* Create Resume Choice Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(239, 246, 255, 0.9) 100%)",
                    border: "2px solid rgba(59, 130, 246, 0.25)",
                    boxShadow: "0 10px 25px rgba(37, 99, 235, 0.06)",
                    textAlign: "left",
                  }}
                >
                  <CardActionArea
                    onClick={onCreateResume}
                    sx={{ p: { xs: 2.5, sm: 3.5 }, height: "100%" }}
                  >
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: "16px",
                          background: themeStyles.activeGradient,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          boxShadow: themeStyles.activeShadow,
                        }}
                      >
                        <motion.div
                          animate={{
                            y: [0, -3, 0],
                            rotate: [0, -5, 5, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <EditNoteRounded sx={{ fontSize: 28 }} />
                        </motion.div>
                      </Box>

                      <Stack spacing={0.75}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 800,
                            color: themeStyles.titleColor,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: { xs: "1.15rem", sm: "1.3rem" },
                          }}
                        >
                          Create Resume
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#64748b",
                            lineHeight: 1.5,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: { xs: "0.85rem", sm: "0.92rem" },
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
                          pt: 0.5,
                          fontWeight: 700,
                          fontSize: "0.9rem",
                        }}
                      >
                        <span>Get Started</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <ArrowForwardRounded fontSize="small" />
                        </motion.div>
                      </Stack>
                    </Stack>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>

            {/* Import Resume with AI Choice Card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <Card
                  elevation={0}
                  sx={{
                    height: "100%",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(145deg, rgba(255,255,255,0.95) 0%, rgba(238, 242, 255, 0.9) 100%)",
                    border: "2px solid rgba(99, 102, 241, 0.25)",
                    boxShadow: "0 10px 25px rgba(99, 102, 241, 0.06)",
                    textAlign: "left",
                  }}
                >
                  <CardActionArea
                    onClick={onImportResume}
                    sx={{ p: { xs: 2.5, sm: 3.5 }, height: "100%" }}
                  >
                    <Stack spacing={2}>
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: "16px",
                          background:
                            "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#fff",
                          boxShadow: "0 8px 20px rgba(99, 102, 241, 0.35)",
                        }}
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.15, 1],
                            rotate: [0, 15, -15, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <AutoAwesome sx={{ fontSize: 28 }} />
                        </motion.div>
                      </Box>

                      <Stack spacing={0.75}>
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 1000,
                            color: "#3730a3",
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: { xs: "1.15rem", sm: "1.3rem" },
                          }}
                        >
                          Import Resume with AI
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#64748b",
                            lineHeight: 1.5,
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: { xs: "0.85rem", sm: "0.92rem" },
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
                          pt: 0.5,
                          fontWeight: 700,
                          fontSize: "0.9rem",
                        }}
                      >
                        <span>Upload & Auto-fill</span>
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <ArrowForwardRounded fontSize="small" />
                        </motion.div>
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
