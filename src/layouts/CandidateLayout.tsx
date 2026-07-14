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
  UploadFile,
  Palette,
  Analytics,
  Settings,
  Menu,
  Notifications,
} from "@mui/icons-material";

import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 270;

const menu = [
  { label: "Dashboard", path: "/candidate/dashboard", icon: <Dashboard /> },
  { label: "Profile", path: "/candidate/profile", icon: <Person /> },
  { label: "Resume Builder", path: "/candidate/resume-builder", icon: <Description /> },
  { label: "Resume Upload", path: "/candidate/resume-upload", icon: <UploadFile /> },
  { label: "Resume Themes", path: "/candidate/resume-themes", icon: <Palette /> },
  { label: "Analytics", path: "/candidate/analytics", icon: <Analytics /> },
  { label: "Settings", path: "/candidate/settings", icon: <Settings /> },
];

const CandidateLayout = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const location = useLocation();

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
                  <Typography sx={{ fontWeight: active ? 900 : 600, fontSize: 14 }}>
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

            <Avatar sx={{ bgcolor: "primary.main" }} onClick={() => navigate("/candidate/profile")}>
              M
            </Avatar>
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