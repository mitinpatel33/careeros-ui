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

const drawerWidth = 270;

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
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        ml: { md: `${drawerWidth}px` },
        bgcolor: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(16px)",
        color: "#0f172a",
        borderBottom: "1px solid rgba(219, 234, 254, 0.6)",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", py: 0.5 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              bgcolor: "#ffffff",
              color: "#3b82f6",
              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.15)",
            }}
          >
            <Menu />
          </IconButton>

          <Box>
            <Typography
              sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#1e3a8a" }}
            >
              {headerTitle[portal]}
            </Typography>

            <Typography sx={{ fontSize: 12, color: "#64748b" }}>
              {headerSubtitle[portal]}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <IconButton
            sx={{
              bgcolor: "#ffffff",
              color: "#3b82f6",
              boxShadow: "0 2px 8px rgba(59, 130, 246, 0.1)",
              "&:hover": { bgcolor: "#f0f7ff" },
            }}
          >
            <Notifications sx={{ fontSize: 20 }} />
          </IconButton>

          <Avatar
            sx={{
              width: 38,
              height: 38,
              background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
              boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: 14,
            }}
            onClick={() => navigate(`/${portal}/profile`)}
          >
            {avatarText[portal]}
          </Avatar>

          <IconButton
            onClick={handleLogout}
            disabled={isLoading}
            sx={{
              bgcolor: "#ffffff",
              color: "#ef4444",
              boxShadow: "0 2px 8px rgba(239, 68, 68, 0.1)",
              "&:hover": { bgcolor: "#fef2f2" },
            }}
          >
            <Logout sx={{ fontSize: 20 }} />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
