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

const FONT = "'Plus Jakarta Sans', sans-serif";

const themeStyles = {
  titleColor: "#1d4ed8",
  activeGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  activeShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
  // medium-white mirror glass (same as the profile page)
  glassBg:
    "linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.38) 100%)",
  glassFilter: "blur(18px) saturate(160%)",
  glassBorder: "1px solid rgba(255, 255, 255, 0.75)",
  glassShadow:
    "0 12px 32px -8px rgba(37, 99, 235, 0.14), inset 0 1px 0 rgba(255,255,255,0.85)",
};

interface ChoicePageProps {
  onCreateResume: () => void;
  onImportResume: () => void;
}

interface Option {
  key: string;
  title: string;
  description: string;
  cta: string;
  onClick: () => void;
  Icon: React.ElementType;
  accent: string; // text / border accent
  titleColor: string;
  iconGradient: string;
  iconShadow: string;
  cardBg: string;
  hoverBorder: string;
  idleBorder: string;
  idleShadow: string;
  hoverShadow: string;
  iconMotion: Record<string, number[]>;
}

const ChoicePage: React.FC<ChoicePageProps> = ({
  onCreateResume,
  onImportResume,
}) => {
  const options: Option[] = [
    {
      key: "create",
      title: "Create Resume",
      description:
        "Build your professional resume manually step-by-step with structured guidance, custom templates, and real-time formatting controls.",
      cta: "Get Started",
      onClick: onCreateResume,
      Icon: EditNoteRounded,
      accent: "#2563eb",
      titleColor: themeStyles.titleColor,
      iconGradient: themeStyles.activeGradient,
      iconShadow: themeStyles.activeShadow,
      cardBg:
        "linear-gradient(145deg, rgba(255,255,255,0.88) 0%, rgba(219,234,254,0.55) 100%)",
      idleBorder: "1px solid rgba(59,130,246,0.28)",
      hoverBorder: "rgba(59,130,246,0.6)",
      idleShadow: "0 6px 18px rgba(37,99,235,0.07)",
      hoverShadow: "0 16px 32px rgba(37,99,235,0.18)",
      iconMotion: { y: [0, -3, 0], rotate: [0, -5, 5, 0] },
    },
    {
      key: "import",
      title: "Import Resume with AI",
      description:
        "Upload your existing resume (PDF or Word) and let our intelligent engine auto-fill all your profile sections instantly.",
      cta: "Upload & Auto-fill",
      onClick: onImportResume,
      Icon: AutoAwesome,
      accent: "#4338ca",
      titleColor: "#3730a3",
      iconGradient: "linear-gradient(135deg, #6366f1 0%, #4338ca 100%)",
      iconShadow: "0 8px 20px rgba(99,102,241,0.35)",
      cardBg:
        "linear-gradient(145deg, rgba(255,255,255,0.88) 0%, rgba(224,231,255,0.6) 100%)",
      idleBorder: "1px solid rgba(99,102,241,0.28)",
      hoverBorder: "rgba(99,102,241,0.6)",
      idleShadow: "0 6px 18px rgba(99,102,241,0.07)",
      hoverShadow: "0 16px 32px rgba(99,102,241,0.2)",
      iconMotion: { scale: [1, 1.12, 1], rotate: [0, 12, -12, 0] },
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        boxSizing: "border-box",
        // no extra vertical centring / padding → sits right under the header
        display: "block",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: "100%" }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            py: { xs: 2.5, sm: 3, md: 3.5 },
            background: themeStyles.glassBg,
            backdropFilter: themeStyles.glassFilter,
            WebkitBackdropFilter: themeStyles.glassFilter,
            borderRadius: { xs: "20px", md: "26px" },
            border: themeStyles.glassBorder,
            boxShadow: themeStyles.glassShadow,
            textAlign: "center",
          }}
        >
          {/* header icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: { xs: 1.25, md: 1.5 },
            }}
          >
            <motion.div
              animate={{ rotate: [0, 8, -8, 8, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Box
                sx={{
                  width: { xs: 44, md: 52 },
                  height: { xs: 44, md: 52 },
                  borderRadius: "16px",
                  background:
                    "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  boxShadow: "0 8px 20px rgba(59,130,246,0.3)",
                }}
              >
                <PsychologyAltRounded sx={{ fontSize: { xs: 24, md: 28 } }} />
              </Box>
            </motion.div>
          </Box>

          <Typography
            component="h2"
            sx={{
              fontWeight: 800,
              color: themeStyles.titleColor,
              mb: 0.75,
              fontFamily: FONT,
              lineHeight: 1.2,
              fontSize: { xs: "1.3rem", sm: "1.8rem", md: "2.1rem" },
              textWrap: "balance",
            }}
          >
            How would you like to build your profile?
          </Typography>

          <Typography
            sx={{
              color: "#475569",
              mb: { xs: 2.5, md: 3 },
              maxWidth: 560,
              mx: "auto",
              fontFamily: FONT,
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              lineHeight: 1.55,
            }}
          >
            Choose an option below to get started instantly. Import an existing
            resume using our AI parser or craft a fresh resume from scratch
            step-by-step.
          </Typography>

          {/* equal-height cards */}
          <Grid
            container
            spacing={{ xs: 1.5, sm: 2, md: 2.5 }}
            sx={{ alignItems: "stretch" }}
          >
            {options.map((o) => (
              <Grid
                key={o.key}
                size={{ xs: 12, md: 6 }}
                sx={{ display: "flex" }}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 350, damping: 24 }}
                  style={{ width: "100%", display: "flex" }}
                >
                  <Card
                    elevation={0}
                    sx={{
                      flex: 1,
                      display: "flex",
                      borderRadius: "20px",
                      background: o.cardBg,
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      border: o.idleBorder,
                      boxShadow: o.idleShadow,
                      textAlign: "left",
                      transition: "border-color .2s, box-shadow .2s",
                      "&:hover": {
                        borderColor: o.hoverBorder,
                        boxShadow: o.hoverShadow,
                      },
                      "&:hover .cta-arrow": { transform: "translateX(3px)" },
                    }}
                  >
                    <CardActionArea
                      onClick={o.onClick}
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent: "flex-start",
                        // icon left + text on tablets/desktop keeps cards compact
                        p: { xs: 2, sm: 2.5, md: 3 },
                      }}
                    >
                      <Stack
                        direction={{ xs: "row", sm: "column" }}
                        spacing={{ xs: 1.5, sm: 1.75 }}
                        sx={{
                          alignItems: { xs: "flex-start", sm: "stretch" },
                          flex: 1,
                        }}
                      >
                        <Box
                          sx={{
                            flexShrink: 0,
                            width: { xs: 44, md: 50 },
                            height: { xs: 44, md: 50 },
                            borderRadius: "15px",
                            background: o.iconGradient,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            boxShadow: o.iconShadow,
                          }}
                        >
                          <motion.div
                            animate={o.iconMotion}
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
                            <o.Icon sx={{ fontSize: { xs: 24, md: 27 } }} />
                          </motion.div>
                        </Box>

                        <Stack sx={{ flex: 1, minWidth: 0 }}>
                          <Typography
                            component="h3"
                            sx={{
                              fontWeight: 800,
                              color: o.titleColor,
                              fontFamily: FONT,
                              lineHeight: 1.25,
                              fontSize: {
                                xs: "1.05rem",
                                sm: "1.2rem",
                                md: "1.3rem",
                              },
                              mb: 0.5,
                            }}
                          >
                            {o.title}
                          </Typography>
                          <Typography
                            sx={{
                              color: "#64748b",
                              lineHeight: 1.55,
                              fontFamily: FONT,
                              fontSize: { xs: "0.82rem", sm: "0.9rem" },
                            }}
                          >
                            {o.description}
                          </Typography>

                          {/* CTA pinned to the bottom so both cards line up */}
                          <Stack
                            direction="row"
                            spacing={0.75}
                            sx={{
                              alignItems: "center",
                              color: o.accent,
                              mt: "auto",
                              pt: { xs: 1.5, sm: 2 },
                              fontFamily: FONT,
                              fontWeight: 700,
                              fontSize: { xs: "0.85rem", sm: "0.9rem" },
                            }}
                          >
                            <span>{o.cta}</span>
                            <ArrowForwardRounded
                              className="cta-arrow"
                              sx={{ fontSize: 18, transition: "transform .2s" }}
                            />
                          </Stack>
                        </Stack>
                      </Stack>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </motion.div>
    </Box>
  );
};

export { ChoicePage };
export default ChoicePage;
