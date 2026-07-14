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
  Business,
  People,
  Work,
  Search,
  ViewKanban,
  Event,
  Email,
  Analytics,
  Settings,
  Menu,
  Notifications,
  SmartToy as SmartToyIcon,
} from "@mui/icons-material";

import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 280;

const menu = [
  { label: "Dashboard", path: "/company/dashboard", icon: <Dashboard /> },
  { label: "Company Profile", path: "/company/profile", icon: <Business /> },
  { label: "Recruiters", path: "/company/users", icon: <People /> },
  { label: "Jobs", path: "/company/jobs", icon: <Work /> },
  { label: "Candidate Search", path: "/company/candidates", icon: <Search /> },
  { label: "Pipeline", path: "/company/pipeline", icon: <ViewKanban /> },
  { label: "Interviews", path: "/company/interviews", icon: <Event /> },
  { label: "Emails", path: "/company/emails", icon: <Email /> },
  { label: "Analytics", path: "/company/analytics", icon: <Analytics /> },
  { label: "AI Assistant", path: "/company/ai-assistant", icon: <SmartToyIcon /> },
  { label: "Settings", path: "/company/settings", icon: <Settings /> },
];

const CompanyLayout = () => {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:900px)");
  const navigate = useNavigate();
  const location = useLocation();

  const sidebar = (
    <Box
      sx={{
        p: 2,
        color: "#fff",
        background: "linear-gradient(180deg,#667eea,#764ba2)",
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 900 }}>
          TalentHub
        </Typography>

        <Typography variant="caption" color="rgba(255,255,255,.7)">
          Recruiter Portal
        </Typography>
      </Box>

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
                bgcolor: active ? "rgba(255,255,255,0.16)" : "transparent",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.12)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 42 }}>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: active ? 900 : 600,
                      fontSize: 14,
                    }}
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
              <Typography sx={{ fontWeight: 900 }}>Company Portal</Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                Manage hiring, candidates and interviews
              </Typography>
            </Box>
          </Stack>

          <Stack direction="row" sx={{ spacing: 1.5, alignItems: "center" }}>
            <IconButton>
              <Notifications />
            </IconButton>

            <Avatar sx={{ bgcolor: "primary.main" }}>HR</Avatar>
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
            "radial-gradient(circle at top left,#dbeafe 0,transparent 30%),linear-gradient(135deg,#f8fafc,#eef2ff)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default CompanyLayout;
