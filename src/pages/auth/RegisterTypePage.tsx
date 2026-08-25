import React from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { ArrowForward, CheckCircle } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Entrance Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
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
        // minHeight: "100vh",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        // p: { xs: 2, sm: 3 },
        // background: "linear-gradient(135deg, #f0f7ff 0%, #eef2ff 100%)",
        // position: "relative",
      }}
    >
      <Stack
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        spacing={3.5}
        sx={{ width: "100%", maxWidth: 860, zIndex: 2 }}
      >
        {/* Title Header */}
        <Box sx={{ textAlign: "center" }}>
          <motion.div variants={itemVariants}>
            <Chip
              label="Choose your journey"
              sx={{
                mb: 2,
                color: "#2563eb",
                fontSize: "13px",
                fontWeight: 600,
                bgcolor: "#e0edff",
                border: "1px solid #c7d2fe",
                borderRadius: "20px",
                px: 1,
                height: "30px",
              }}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              component="h1"
              sx={{
                color: "#1e3a8a",
                fontWeight: 900,
                fontSize: { xs: 32, sm: 42, md: 48 },
                letterSpacing: "-0.03em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.5,
              }}
            >
              <Box>
                Join Career OS
              </Box>

              {/* Animated Flying Rocket */}
              <Box
                component={motion.span}
                animate={{
                  y: [0, -8, 0],
                  x: [0, 3, 0],
                  rotate: [0, 6, 0],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                sx={{
                  display: "inline-block",
                  position: "relative",
                  filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.15))",
                }}
              >
                🚀
              </Box>
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography
              sx={{
                color: "#64748b",
                mt: 1,
                fontSize: "15px",
                fontWeight: 500,
              }}
            >
              Select how you want to use the platform.
            </Typography>
          </motion.div>
        </Box>

        {/* Account Type Cards Grid */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={3.5}>
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
            buttonGradient="linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)"
            glowColor="rgba(37, 99, 235, 0.45)"
            iconBg="#e0edff"
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
            buttonGradient="linear-gradient(180deg, #a855f7 0%, #7c3aed 100%)"
            glowColor="rgba(139, 92, 246, 0.45)"
            iconBg="#f3e8ff"
            onClick={() => navigate("/register/company")}
          />
        </Stack>

        {/* Footer Navigation */}
        <motion.div variants={itemVariants}>
          <Typography
            sx={{
              textAlign: "center",
              color: "#64748b",
              fontSize: "14px",
              fontWeight: 500,
              mt: 1,
            }}
          >
            Already have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate("/login")}
              sx={{
                fontWeight: 700,
                color: "#2563eb",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
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
  buttonGradient: string;
  glowColor: string;
  iconBg: string;
  onClick: () => void;
}

const CompactAccountCard: React.FC<CompactCardProps> = ({
  animatedIcon,
  title,
  subtitle,
  features,
  buttonText,
  buttonGradient,
  glowColor,
  iconBg,
  onClick,
}) => (
  <Paper
    component={motion.div}
    variants={itemVariants}
    whileHover={{ y: -4, scale: 1.005 }}
    transition={{ type: "spring", stiffness: 200, damping: 16 }}
    onClick={onClick}
    sx={{
      flex: 1,
      p: { xs: 2.5, sm: 3 }, // Reduced vertical padding to prevent scrolling
      borderRadius: "24px", // Compact border radius
      cursor: "pointer",
      color: "#0f172a",
      position: "relative",
      bgcolor: "#ffffff",
      boxShadow:
        "0 15px 35px -10px rgba(37, 99, 235, 0.18), 0 5px 15px -5px rgba(59, 130, 246, 0.12)",
      border: "1px solid rgba(191, 219, 254, 0.5)",
      overflow: "hidden",
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        boxShadow: `0 20px 40px -8px ${glowColor}, 0 8px 20px -8px rgba(37, 99, 235, 0.2)`,
        borderColor: "rgba(147, 197, 253, 0.8)",
      },
    }}
  >
    <Stack spacing={2} sx={{ position: "relative", zIndex: 1 }}>
      {/* Smaller Icon Container */}
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: iconBg,
        }}
      >
        {animatedIcon}
      </Box>

      {/* Card Title & Subtitle */}
      <Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            fontSize: "1.25rem",
            color: "#1e3a8a",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            color: "#64748b",
            fontSize: "0.8rem",
            lineHeight: 1.4,
            fontWeight: 500,
            minHeight: "34px", // Fixes layout shift across different subtitle lengths
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      {/* Compact Feature List */}
      <Stack spacing={1} sx={{ pt: 0.25 }}>
        {features.map((feature) => (
          <Stack
            key={feature}
            direction="row"
            spacing={1}
            sx={{ alignItems: "center" }}
          >
            <CheckCircle sx={{ fontSize: 16, color: "#16a34a" }} />
            <Typography
              sx={{
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#334155",
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
        endIcon={<ArrowForward sx={{ fontSize: "16px !important" }} />}
        sx={{
          mt: 1,
          py: 1.1,
          borderRadius: "50px",
          fontWeight: 700,
          fontSize: "0.875rem",
          textTransform: "none",
          background: buttonGradient,
          color: "#ffffff",
          boxShadow: `0 0 16px ${glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.3)`,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            transform: "translateY(-1px)",
            background: buttonGradient,
            boxShadow: `0 0 24px ${glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.5)`,
          },
          "&:active": {
            transform: "translateY(1px)",
          },
        }}
      >
        {buttonText}
      </Button>
    </Stack>
  </Paper>
);

// Original Candidate Custom Animated Icon
const CandidateAnimatedIcon = () => (
  <Box
    sx={{
      position: "relative",
      width: 36,
      height: 36,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      component={motion.div}
      animate={{ y: [-2, 2, -2] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      sx={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        bgcolor: "#3b82f6",
        boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
      }}
    />
    <Box
      component={motion.div}
      animate={{ scaleY: [0.85, 1.1, 0.85] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      sx={{
        width: 26,
        height: 10,
        borderRadius: "6px 6px 0 0",
        bgcolor: "#2563eb",
        mt: 0.5,
      }}
    />
  </Box>
);

// Original Company Custom Animated Icon
const CompanyAnimatedIcon = () => (
  <Box
    sx={{
      position: "relative",
      width: 36,
      height: 36,
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: 0.6,
    }}
  >
    <Box
      component={motion.div}
      animate={{ height: ["12px", "20px", "12px"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      sx={{ width: 9, bgcolor: "#a855f7", borderRadius: "3px 3px 0 0" }}
    />
    <Box
      component={motion.div}
      animate={{ height: ["22px", "14px", "22px"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      sx={{
        width: 11,
        bgcolor: "#7c3aed",
        borderRadius: "3px 3px 0 0",
        boxShadow: "0 0 8px rgba(124, 58, 237, 0.4)",
      }}
    />
  </Box>
);

export default RegisterTypePage;
