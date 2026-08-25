import {
  AppBar,
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";

import {
  Dashboard,
  Description,
  Person,
  Menu,
  Notifications,
  Logout,
} from "@mui/icons-material";

import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../services/authApi";

const drawerWidth = 270;

const menu = [
  { label: "Dashboard", path: "/candidate/dashboard", icon: <Dashboard /> },
  { label: "Profile", path: "/candidate/profile", icon: <Person /> },
];

const CandidateLayout = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const location = useLocation();

  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      // retrieve refreshToken from localStorage (or from Redux)
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        // if no token, just redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }

      await logout({ refreshToken }).unwrap();
      // success: clear tokens and redirect
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // If using Redux, dispatch logout action here
      navigate("/login");
    } catch (error) {
      // handle error (e.g., show snackbar)
      console.error("Logout failed:", error);
      // still clear local tokens to avoid getting stuck
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const sidebar = (
    <Box
      sx={{
        height: "100%",
        p: 2,
        color: "#fff",
        background: "linear-gradient(180deg,#667eea,#764ba2)",
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 900, mb: 3 }}>
        Resume Maker
      </Typography>

      <List>
        {menu.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              onClick={() => {
                navigate(item.path);
                setOpen(false);
              }}
              sx={{
                mb: 1,
                borderRadius: 3,
                color: "#fff",
                bgcolor: active ? "rgba(255,255,255,0.18)" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.14)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 42 }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                    sx={{ fontWeight: active ? 900 : 600, fontSize: 14 }}
                  >
                    {item.label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(16px)",
          color: "text.primary",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" sx={{ spacing: 1.5, alignItems: "center" }}>
            {isMobile && (
              <IconButton onClick={() => setOpen(true)}>
                <Menu />
              </IconButton>
            )}

            <Box>
              <Typography sx={{ fontWeight: 900 }}>Candidate Portal</Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                Build resume, select theme and publish live profile
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" sx={{ spacing: 1.5, alignItems: "center" }}>
            <IconButton>
              <Notifications />
            </IconButton>

            <Avatar
              sx={{ bgcolor: "primary.main" }}
              onClick={() => navigate("/candidate/profile")}
            >
              M
            </Avatar>

            <IconButton
              onClick={handleLogout}
              disabled={isLoading}
              color="inherit"
            >
              <Logout />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: 0 }}>
        <Drawer
          variant="temporary"
          open={open}
          onClose={() => setOpen(false)}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {sidebar}
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              border: 0,
            },
          }}
        >
          {sidebar}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 10,
          px: { xs: 2, md: 4 },
          pb: 4,
          minHeight: "100vh",
          background:
            "radial-gradient(circle at top left,#dbeafe 0,transparent 30%),radial-gradient(circle at top right,#ede9fe 0,transparent 35%),linear-gradient(135deg,#f8fafc,#eef2ff)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default CandidateLayout;
