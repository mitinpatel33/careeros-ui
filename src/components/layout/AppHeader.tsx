import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Logout, Menu, Notifications } from "@mui/icons-material";
import type { PortalType } from "./sidebarMenus";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../services/authApi";

type Props = {
  portal: PortalType;
  onMenuClick: () => void;
};

const headerTitle = {
  candidate: "Candidate Portal 🚀",
  company: "Company Portal 💼",
  admin: "Admin Panel ⚡",
};

const headerSubtitle = {
  candidate: "Build resume, select theme and publish live profile",
  company: "Manage hiring, candidates and interviews",
  admin: "Manage users, companies, billing and platform",
};

const avatarText = {
  candidate: "M",
  company: "HR",
  admin: "SA",
};

const AppHeader = ({ portal, onMenuClick }: Props) => {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const isCandidate = portal === "candidate";

  // Dynamic Glass Theme styles matching AppSidebar exactly
  const themeStyles = {
    headerBg: isCandidate
      ? "rgba(235, 240, 255, 0.4)" // Blue Glass
      : "rgba(245, 235, 255, 0.4)", // Purple Glass

    headerBorder: isCandidate
      ? "rgba(147, 197, 253, 0.5)"
      : "rgba(216, 180, 254, 0.5)",

    titleColor: isCandidate ? "#1d4ed8" : "#6b21a8",
    subtitleColor: isCandidate ? "#3b82f6" : "#9333ea",
    iconColor: isCandidate ? "#2563eb" : "#9333ea",

    avatarGradient: isCandidate
      ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
      : "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",

    avatarShadow: isCandidate
      ? "0 4px 14px rgba(37, 99, 235, 0.35)"
      : "0 4px 14px rgba(168, 85, 247, 0.35)",

    headerShadow: isCandidate
      ? "0 10px 30px -10px rgba(37, 99, 235, 0.12), 0 4px 12px rgba(0, 0, 0, 0.02)"
      : "0 10px 30px -10px rgba(168, 85, 247, 0.12), 0 4px 12px rgba(0, 0, 0, 0.02)",

    btnHoverShadow: isCandidate
      ? "0 4px 12px rgba(37, 99, 235, 0.2)"
      : "0 4px 12px rgba(147, 51, 234, 0.2)",
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
        return;
      }

      await logout({ refreshToken }).unwrap();
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  return (
    <Box sx={{ p: { xs: 1.5, md: 2 }, pb: 0 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: themeStyles.headerBg,
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          borderRadius: "20px",
          border: `1px solid ${themeStyles.headerBorder}`,
          boxShadow: themeStyles.headerShadow,
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar
          sx={{
            justifyContent: "space-between",
            px: { xs: 2, sm: 3 },
            py: 1,
            minHeight: "64px !important",
          }}
        >
          {/* Left Title Section */}
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <IconButton
              onClick={onMenuClick}
              sx={{
                display: { xs: "inline-flex", md: "none" },
                bgcolor: "rgba(255, 255, 255, 0.6)",
                color: themeStyles.iconColor,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                "&:hover": { bgcolor: "#ffffff" },
              }}
            >
              <Menu />
            </IconButton>

            <Box>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1rem", sm: "1.15rem" },
                  color: themeStyles.titleColor,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {headerTitle[portal]}
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: 11, sm: 12 },
                  color: themeStyles.subtitleColor,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 600,
                  mt: 0.2,
                }}
              >
                {headerSubtitle[portal]}
              </Typography>
            </Box>
          </Stack>

          {/* Right Action Icons */}
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <IconButton
              sx={{
                bgcolor: "rgba(255, 255, 255, 0.6)",
                color: themeStyles.iconColor,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                border: "1px solid rgba(255, 255, 255, 0.8)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: "#ffffff",
                  transform: "translateY(-1px)",
                  boxShadow: themeStyles.btnHoverShadow,
                },
              }}
            >
              <Notifications sx={{ fontSize: 20 }} />
            </IconButton>

            {/* Dynamic Avatar Gradient */}
            <Avatar
              sx={{
                width: 40,
                height: 40,
                background: themeStyles.avatarGradient,
                boxShadow: themeStyles.avatarShadow,
                fontWeight: 700,
                cursor: "pointer",
                fontSize: 13,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                border: "2px solid #ffffff",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              onClick={() => navigate(`/${portal}/profile`)}
            >
              {avatarText[portal]}
            </Avatar>

            <IconButton
              onClick={handleLogout}
              disabled={isLoading}
              sx={{
                bgcolor: "rgba(254, 242, 242, 0.45)",
                color: "#ef4444",
                boxShadow: "0 2px 8px rgba(239, 68, 68, 0.08)",
                border: "1px solid rgba(254, 202, 202, 0.5)",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  bgcolor: "rgba(254, 226, 226, 0.75)",
                  transform: "translateY(-1px)",
                  boxShadow: "0 4px 12px rgba(239, 68, 68, 0.2)",
                },
              }}
            >
              <Logout sx={{ fontSize: 20 }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppHeader;
