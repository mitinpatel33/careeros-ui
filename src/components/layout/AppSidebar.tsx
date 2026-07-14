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
    title: "ResumeHub",
    subtitle: "Candidate Portal",
    avatar: "C",
    gradient: "linear-gradient(180deg,#667eea 0%,#764ba2 100%)",
  },
  company: {
    title: "TalentHub",
    subtitle: "Recruiter Portal",
    avatar: "HR",
    gradient: "linear-gradient(180deg,#0f172a 0%,#1e1b4b 100%)",
  },
  admin: {
    title: "AdminHub",
    subtitle: "Super Admin",
    avatar: "SA",
    gradient: "linear-gradient(180deg,#020617 0%,#111827 100%)",
  },
};

const AppSidebar = ({ portal, mobileOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const info = portalInfo[portal];
  const menu = sidebarMenus[portal];

  const sidebar = (
    <Box
      sx={{
        height: "100vh",
        color: "#fff",
        background: info.gradient,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Box sx={{ px: 2.2, py: 2.2, flexShrink: 0 }}>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Box>
            <Typography
              sx={{
                fontWeight: 900,
                fontSize: 24,
                lineHeight: 1.1,
              }}
            >
              {info.title}
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: "rgba(255,255,255,.72)",
                mt: 0.5,
              }}
            >
              {info.subtitle}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              color: "#fff",
              display: { xs: "inline-flex", md: "none" },
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,.1)" }} />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          px: 1.5,
          py: 1.5,

          "&::-webkit-scrollbar": {
            width: 6,
          },

          "&::-webkit-scrollbar-track": {
            bgcolor: "transparent",
          },

          "&::-webkit-scrollbar-thumb": {
            bgcolor: "rgba(255,255,255,.25)",
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
                  mb: 0.6,
                  px: 1.8,
                  py: 1.1,
                  borderRadius: 3,
                  color: "#fff",
                  position: "relative",
                  overflow: "hidden",
                  transition: "all .25s ease",

                  bgcolor: active ? "rgba(255,255,255,.15)" : "transparent",

                  border: active
                    ? "1px solid rgba(255,255,255,.18)"
                    : "1px solid transparent",

                  boxShadow: active ? "0 10px 30px rgba(0,0,0,.18)" : "none",

                  "&::before": active
                    ? {
                        content: '""',
                        position: "absolute",
                        left: 0,
                        top: "22%",
                        height: "56%",
                        width: 4,
                        borderRadius: 99,
                        bgcolor: "#60a5fa",
                      }
                    : {},

                  "&:hover": {
                    bgcolor: "rgba(255,255,255,.12)",
                    transform: "translateX(4px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active ? "#93c5fd" : "rgba(255,255,255,.82)",
                    minWidth: 40,

                    "& svg": {
                      fontSize: 21,
                    },
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
                        fontWeight: active ? 900 : 700,
                        fontSize: 14,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
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

      <Box sx={{ p: 1.5, flexShrink: 0 }}>
        <Box
          sx={{
            p: 1.4,
            borderRadius: 4,
            bgcolor: "rgba(255,255,255,.10)",
            border: "1px solid rgba(255,255,255,.12)",
          }}
        >
          <Stack direction="row" spacing={1.3} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: "#2563eb",
                fontWeight: 900,
                fontSize: 13,
              }}
            >
              {info.avatar}
            </Avatar>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 900,
                  fontSize: 13,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
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
                  color: "rgba(255,255,255,.65)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {info.subtitle}
              </Typography>
            </Box>
          </Stack>

          <Button
            fullWidth
            startIcon={<Logout />}
            sx={{
              mt: 1.3,
              color: "#fff",
              justifyContent: "flex-start",
              borderRadius: 2.5,
              textTransform: "none",
              fontWeight: 800,
              bgcolor: "rgba(255,255,255,.08)",

              "&:hover": {
                bgcolor: "rgba(255,255,255,.14)",
              },
            }}
          >
            Logout
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
            height: "100vh",
            border: 0,
            overflow: "hidden",
            bgcolor: "transparent",
            boxShadow: "0 24px 80px rgba(0,0,0,.35)",
          },
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
            height: "100vh",
            border: 0,
            overflow: "hidden",
            bgcolor: "transparent",
            boxShadow: "8px 0 30px rgba(15,23,42,.12)",
          },
        }}
      >
        {sidebar}
      </Drawer>
    </Box>
  );
};

export default AppSidebar;
