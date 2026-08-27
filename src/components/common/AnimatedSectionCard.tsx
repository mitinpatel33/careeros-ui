import { Box, Paper, Stack, Typography, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  children: ReactNode;
};

const AnimatedSectionCard = ({ title, subtitle, icon, children }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ width: "100%" }}
    >
      <Paper
        elevation={0}
        sx={{
          borderRadius: "24px",
          overflow: "hidden",
          // Glassmorphism styling matching AppSidebar & AppHeader
          bgcolor: "rgba(255, 255, 255, 0.65)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.8)",
          boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.08)",
        }}
      >
        {/* Card Header */}
        <Box
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderBottom: "1px solid rgba(226, 232, 240, 0.6)",
            bgcolor: "rgba(255, 255, 255, 0.3)",
          }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                width: 48,
                height: 48,
                background: "linear-gradient(135deg, #3b82f6 0%, #4a78f7 100%)",
                boxShadow: "0 6px 16px rgba(122, 163, 252, 0.3)",
                color: "#ffffff",
              }}
            >
              {icon}
            </Avatar>

            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: 18, sm: 22 },
                  color: "#1d4ed8",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </Typography>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "#3b82f6",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {subtitle}
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* Form Body Container */}
        <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 4 } }}>{children}</Box>
      </Paper>
    </motion.div>
  );
};

export default AnimatedSectionCard;
