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

const drawerWidth = 260;

type Props = {
  portal: PortalType;
  onMenuClick: () => void;
};

const headerTitle = {
  candidate: "Candidate Portal",
  company: "Company Portal",
  admin: "Admin Panel",
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
      // retrieve refreshToken from localStorage (or from Redux)
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // if no token, just redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        navigate("/login");
        return;
      }

      await logout({ refreshToken }).unwrap();
      // success: clear tokens and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      // If using Redux, dispatch logout action here
      navigate("/login");
    } catch (error) {
      // handle error (e.g., show snackbar)
      console.error("Logout failed:", error);
      // still clear local tokens to avoid getting stuck
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
        ml: {
          md: `${drawerWidth}px`,
        },
        bgcolor: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(16px)",
        color: "text.primary",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" sx={{ spacing: 1.5, alignItems: "center" }}>
          <IconButton
            onClick={onMenuClick}
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
            }}
          >
            <Menu />
          </IconButton>

          <Box>
            <Typography sx={{ fontWeight: 900 }}>
              {headerTitle[portal]}
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: "text.secondary",
              }}
            >
              {headerSubtitle[portal]}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <IconButton>
            <Notifications />
          </IconButton>

          <Avatar
            sx={{
              bgcolor: portal === "admin" ? "error.main" : "primary.main",
              fontWeight: 800,
              cursor: "pointer",
            }}
            onClick={() => navigate(`/${portal}/profile`)}
          >
            {avatarText[portal]}
          </Avatar>

          <IconButton
            onClick={handleLogout}
            disabled={isLoading}
            // color="inherit"
          >
            <Logout />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
