import React from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { ArrowForward, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Stagger Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 14 },
  },
};

const RegisterTypePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // position: "relative",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        p: { xs: 2, sm: 3 },
        // background:
        //   "linear-gradient(135deg, #090d16 0%, #0f172a 40%, #1e1b4b 100%)",
      }}
    >
      {/* Background Animated Glow Elements */}
      <Glow top="-5%" left="-5%" color="#3b82f6" duration={6} />
      <Glow bottom="-5%" right="-5%" color="#8b5cf6" duration={8} />

      <Stack
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        spacing={3}
        sx={{ width: "100%", maxWidth: 860, zIndex: 2 }}
      >
        {/* Title Header */}
        <Box sx={{ textAlign: "center" }}>
          <motion.div variants={itemVariants}>
            <Chip
              label="Choose your journey"
              sx={{
                mb: 1.5,
                color: "#93c5fd",
                fontSize: "12px",
                fontWeight: 700,
                bgcolor: "rgba(59, 130, 246, 0.12)",
                border: "1px solid rgba(147, 197, 253, 0.25)",
                backdropFilter: "blur(8px)",
                px: 0.5,
                height: "26px",
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              component="h1"
              sx={{
                color: "#fff",
                fontWeight: 900,
                fontSize: { xs: 28, sm: 38, md: 44 },
                letterSpacing: "-0.02em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              Join Resume Builder
              {/* Video-style Animated Flying Rocket */}
              <Box
                component={motion.span}
                animate={{
                  y: [0, -10, 0],
                  x: [0, 4, 0],
                  rotate: [0, 6, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                sx={{
                  display: "inline-block",
                  position: "relative",
                  filter: "drop-shadow(0 0 12px rgba(249, 115, 22, 0.6))",
                }}
              >
                🚀
                {/* Rocket Exhaust Fire Pulse */}
                <Box
                  component={motion.span}
                  animate={{
                    scale: [0.8, 1.3, 0.8],
                    opacity: [0.4, 0.9, 0.4],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  sx={{
                    position: "absolute",
                    bottom: -4,
                    left: -4,
                    width: 14,
                    height: 14,
                    borderRadius: "50%",
                    bgcolor: "#f97316",
                    filter: "blur(6px)",
                    zIndex: -1,
                  }}
                />
              </Box>
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              sx={{ color: "rgba(255,255,255,0.7)", mt: 0.8, fontSize: "14px" }}
            >
              Select how you want to use the platform.
            </Typography>
          </motion.div>
        </Box>

        {/* Compact Account Type Cards Grid */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
          <CompactAccountCard
            animatedIcon={<CandidateAnimatedIcon />}
            title="Candidate"
            subtitle="Build resumes, publish live profile and download premium themes."
            features={[
              "AI Resume Builder",
              "Live Portfolio",
              "Resume Themes",
              "ATS Score Analysis",
            ]}
            buttonText="Start as Candidate"
            accentColor="#3b82f6"
            hoverGradient="linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.05))"
            onClick={() => navigate("/register/candidate")}
          />

          <CompactAccountCard
            animatedIcon={<CompanyAnimatedIcon />}
            title="Company"
            subtitle="Post jobs, search candidates and manage hiring pipeline."
            features={[
              "Job Posting System",
              "Candidate Search",
              "AI Match Engine",
              "Hiring Pipeline",
            ]}
            buttonText="Start as Company"
            accentColor="#a855f7"
            hoverGradient="linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.05))"
            onClick={() => navigate("/register/company")}
          />
        </Stack>

        {/* Footer Navigation */}
        <motion.div variants={itemVariants}>
          <Typography
            sx={{
              textAlign: "center",
              color: "rgba(255,255,255,0.8)",
              fontSize: "13.5px",
            }}
          >
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate("/login")}
              sx={{
                fontWeight: 800,
                color: "#60a5fa",
                cursor: "pointer",
                textDecoration: "underline",
                transition: "color 0.2s",
                "&:hover": { color: "#93c5fd" },
              }}
            >
              Login
            </Box>
          </Typography>
        </motion.div>
      </Stack>
    </Box>
  );
};

interface CompactCardProps {
  animatedIcon: React.ReactNode;
  title: string;
  subtitle: string;
  features: string[];
  buttonText: string;
  accentColor: string;
  hoverGradient: string;
  onClick: () => void;
}

const CompactAccountCard: React.FC<CompactCardProps> = ({
  animatedIcon,
  title,
  subtitle,
  features,
  buttonText,
  accentColor,
  hoverGradient,
  onClick,
}) => (
  <Paper
    component={motion.div}
    variants={itemVariants}
    whileHover={{ y: -8, scale: 1.015 }}
    transition={{ type: "spring", stiffness: 220, damping: 18 }}
    onClick={onClick}
    sx={{
      flex: 1,
      p: { xs: 2.5, sm: 3 },
      borderRadius: 5,
      cursor: "pointer",
      color: "#fff",
      position: "relative",
      background: "rgba(255, 255, 255, 0.04)",
      backdropFilter: "blur(18px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)",
      overflow: "hidden",
      transition: "border-color 0.3s ease",
      "&:hover": {
        borderColor: accentColor,
      },
      "&:hover .card-glow": {
        opacity: 1,
      },
      "&:hover .cta-btn": {
        bgcolor: accentColor,
        color: "#ffffff",
        boxShadow: `0 8px 20px -4px ${accentColor}80`,
      },
    }}
  >
    {/* Inner Hover Gradient Glow Layer */}
    <Box
      className="card-glow"
      sx={{
        position: "absolute",
        inset: 0,
        background: hoverGradient,
        opacity: 0,
        transition: "opacity 0.4s ease",
        pointerEvents: "none",
      }}
    />

    <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
      {/* Animated Icon Housing */}
      <Box
        sx={{
          width: 64,
          height: 64,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(255, 255, 255, 0.06)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
        }}
      >
        {animatedIcon}
      </Box>

      {/* Card Header */}
      <Box>
        <Typography
          variant="h5"
          sx={{ fontWeight: 800, fontSize: "20px", mb: 0.5 }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: "12.5px",
            lineHeight: 1.45,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Feature Bullet Points */}
      <Stack spacing={1}>
        {features.map((feature) => (
          <Stack
            key={feature}
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <CheckCircle sx={{ fontSize: 16, color: "#4ade80" }} />
            <Typography
              sx={{
                fontSize: "13px",
                fontWeight: 600,
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {feature}
            </Typography>
          </Stack>
        ))}
      </Stack>

      {/* Action Button */}
      <Button
        className="cta-btn"
        fullWidth
        variant="contained"
        endIcon={<ArrowForward sx={{ fontSize: "18px !important" }} />}
        sx={{
          mt: 1,
          py: 1.1,
          borderRadius: 3,
          fontWeight: 800,
          fontSize: "13.5px",
          textTransform: "none",
          bgcolor: "#ffffff",
          color: "#0f172a",
          transition: "all 0.3s ease",
        }}
      >
        {buttonText}
      </Button>
    </Stack>
  </Paper>
);

// Video/SVG Custom Candidate Animation Component
const CandidateAnimatedIcon = () => (
  <Box
    sx={{
      position: "relative",
      width: 36,
      height: 36,
      display: "grid",
      placeItems: "center",
    }}
  >
    <Box
      component={motion.div}
      animate={{ y: [-2, 3, -2] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      sx={{
        width: 18,
        height: 18,
        borderRadius: "50%",
        bgcolor: "#60a5fa",
        boxShadow: "0 0 10px #60a5fa",
      }}
    />
    <Box
      component={motion.div}
      animate={{ scaleY: [0.8, 1.1, 0.8] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      sx={{
        width: 28,
        height: 10,
        borderRadius: "8px 8px 0 0",
        bgcolor: "#3b82f6",
        mt: 0.5,
      }}
    />
  </Box>
);

// Video/SVG Custom Company Animation Component
const CompanyAnimatedIcon = () => (
  <Box
    sx={{
      position: "relative",
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: 0.5,
    }}
  >
    <Box
      component={motion.div}
      animate={{ height: ["14px", "22px", "14px"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      sx={{ width: 10, bgcolor: "#c084fc", borderRadius: "2px 2px 0 0" }}
    />
    <Box
      component={motion.div}
      animate={{ height: ["24px", "16px", "24px"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      sx={{
        width: 12,
        bgcolor: "#a855f7",
        borderRadius: "2px 2px 0 0",
        boxShadow: "0 0 8px #a855f7",
      }}
    />
  </Box>
);

// Animated Background Glow Element
const Glow = ({
  top,
  left,
  right,
  bottom,
  color,
  duration,
}: {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  color: string;
  duration: number;
}) => (
  <Box
    component={motion.div}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    sx={{
      position: "absolute",
      top,
      left,
      right,
      bottom,
      width: 380,
      height: 380,
      borderRadius: "50%",
      bgcolor: color,
      filter: "blur(120px)",
      pointerEvents: "none",
    }}
  />
);

export default RegisterTypePage;
