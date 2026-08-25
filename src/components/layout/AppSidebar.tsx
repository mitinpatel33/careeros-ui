import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { Close, Logout } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import { sidebarMenus, type PortalType } from "./sidebarMenus";

const drawerWidth = 270;

type Props = {
  portal: PortalType;
  mobileOpen: boolean;
  onClose: () => void;
};

const portalInfo = {
  candidate: {
    title: "Career OS 🚀",
    subtitle: "Candidate Portal",
    avatar: "C",
  },
  company: {
    title: "TalentHub 💼",
    subtitle: "Recruiter Portal",
    avatar: "HR",
  },
  admin: {
    title: "AdminHub ⚡",
    subtitle: "Super Admin",
    avatar: "SA",
  },
};

const AppSidebar = ({ portal, mobileOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const info = portalInfo[portal];
  const menu = sidebarMenus[portal];

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        // Frosted Glass Layer over Login Background
        bgcolor: "rgba(240, 246, 255, 0.45)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderRight: "1px solid rgba(255, 255, 255, 0.6)",
        boxShadow: "4px 0 24px rgba(0, 0, 0, 0.02)",
      }}
    >
      {/* Login Background Video Layer inside Sidebar */}
      <Box
        component="video"
        autoPlay
        loop
        muted
        playsInline
        src="/assets/login-bg.mp4" // Ensure path matches your login background video asset
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          opacity: 0.85,
        }}
      />

      {/* Header / Branding */}
      <Box sx={{ px: 3, py: 2.5, flexShrink: 0 }}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: 22,
                background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "-0.02em",
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              }}
            >
              {info.title}
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: "#64748b",
                fontWeight: 600,
                mt: 0.2,
                fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              }}
            >
              {info.subtitle}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              color: "#64748b",
              display: { xs: "inline-flex", md: "none" },
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: "rgba(203, 213, 225, 0.4)", mx: 2.5 }} />

      {/* Navigation Menu */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          px: 2,
          py: 2,
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(203, 213, 225, 0.5)",
            borderRadius: 10,
          },
        }}
      >
        <List disablePadding>
          {menu.map((item: any) => {
            const active =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

            return (
              <ListItemButton
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  onClose();
                }}
                sx={{
                  mb: 1.2,
                  px: 2,
                  py: 1.2,
                  borderRadius: "14px",
                  color: active ? "#ffffff" : "#475569",
                  background: active
                    ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                    : "rgba(255, 255, 255, 0.35)",
                  backdropFilter: active ? "none" : "blur(8px)",
                  boxShadow: active
                    ? "0 8px 20px rgba(37, 99, 235, 0.35)"
                    : "0 2px 6px rgba(0, 0, 0, 0.01)",
                  border: active
                    ? "1px solid rgba(255, 255, 255, 0.3)"
                    : "1px solid rgba(255, 255, 255, 0.6)",
                  transition: "all .25s ease-in-out",

                  "&:hover": {
                    background: active
                      ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
                      : "rgba(255, 255, 255, 0.75)",
                    transform: "translateY(-1px)",
                    color: active ? "#ffffff" : "#1e293b",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? "#ffffff" : "#3b82f6",
                    minWidth: 38,
                    "& svg": { fontSize: 22 },
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      sx={{
                        display: "block",
                        fontWeight: active ? 700 : 600,
                        fontSize: 14,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
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

      {/* User Footer Profile Card */}
      <Box sx={{ p: 2, flexShrink: 0 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: "18px",
            bgcolor: "rgba(255, 255, 255, 0.75)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.03)",
          }}
        >
          <Stack direction="row" spacing={1.3} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#3b82f6",
                fontWeight: 700,
                fontSize: 13,
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.35)",
              }}
            >
              {info.avatar}
            </Avatar>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: "#0f172a",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                }}
              >
                {portal === "company"
                  ? "ABC Technologies"
                  : portal === "admin"
                    ? "Super Admin"
                    : "Mitin Patel"}
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: "#64748b",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                }}
              >
                {info.subtitle}
              </Typography>
            </Box>
          </Stack>

          <Button
            fullWidth
            startIcon={<Logout sx={{ fontSize: 18 }} />}
            onClick={() => navigate("/login")}
            sx={{
              mt: 1.5,
              color: "#ef4444",
              justifyContent: "center",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "rgba(254, 242, 242, 0.8)",
              fontSize: 13,
              py: 0.8,
              boxShadow: "none",
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              "&:hover": {
                bgcolor: "#fee2e2",
              },
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { md: drawerWidth },
        flexShrink: { md: 0 },
      }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            backgroundColor: "transparent !important",
            backgroundImage: "none !important",
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            border: "none",
            backgroundColor: "transparent !important",
            backgroundImage: "none !important",
            boxShadow: "none",
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    </Box>
  );
};

export default AppSidebar;
