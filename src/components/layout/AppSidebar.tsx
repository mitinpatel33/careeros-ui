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
import { useAppDispatch, useAppSelector } from "../../hooks/useLogin";
import { logout as logoutAction } from "../../store/auth/authSlice";
import { useLogoutMutation } from "../../services/authApi";

const drawerWidth = 270;

type Props = {
  portal: PortalType;
  mobileOpen: boolean;
  onClose: () => void;
};

const portalInfo = {
  candidate: { title: "Career OS 🚀", subtitle: "Candidate Portal" },
  company: { title: "Talent Hub 💼", subtitle: "Company Portal" },
  admin: { title: "AdminHub ⚡", subtitle: "Super Admin" },
};

const getInitials = (name?: string, fallback = "U") => {
  if (!name) return fallback;
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const AppSidebar = ({ portal, mobileOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const info = portalInfo[portal];
  const menu = sidebarMenus[portal];

  const displayName = user?.fullName || user?.email || "User";
  const userAvatar = getInitials(user?.fullName);

  const isCandidate = portal === "candidate";

  const themeStyles = {
    sidebarBg: isCandidate
      ? "rgba(235, 240, 255, 0.25)"
      : "rgba(245, 235, 255, 0.25)",
    borderRight: isCandidate
      ? "1px solid rgba(147, 197, 253, 0.35)"
      : "1px solid rgba(216, 180, 254, 0.35)",
    titleColor: isCandidate ? "#1d4ed8" : "#6b21a8",
    subtitleColor: isCandidate ? "#3b82f6" : "#9333ea",
    iconColor: isCandidate ? "#2563eb" : "#9333ea",
    activeTextColor: "#ffffff",
    inactiveTextColor: isCandidate ? "#1e40af" : "#581c87",
    activeGradient: isCandidate
      ? "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
      : "linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)",
    activeShadow: isCandidate
      ? "0 8px 20px rgba(37, 99, 235, 0.35)"
      : "0 8px 20px rgba(168, 85, 247, 0.35)",
    btnHoverBg: isCandidate
      ? "rgba(239, 246, 255, 0.6)"
      : "rgba(255, 255, 255, 0.4)",
    avatarBg: isCandidate ? "#2563eb" : "#9333ea",
    avatarShadow: isCandidate
      ? "0 4px 12px rgba(37, 99, 235, 0.3)"
      : "0 4px 12px rgba(147, 51, 234, 0.3)",
  };

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await logoutApi({ refreshToken }).unwrap();
      }
    } catch (error) {
      console.error("Backend logout failed or session expired:", error);
    } finally {
      dispatch(logoutAction());
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      navigate("/login");
    }
  };

  const sidebarContent = (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        bgcolor: themeStyles.sidebarBg,
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        borderRight: themeStyles.borderRight,
        boxShadow: "4px 0 24px rgba(0, 0, 0, 0.03)",
        transition: "all 0.3s ease",
      }}
    >
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
                color: themeStyles.titleColor,
                letterSpacing: "-0.02em",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {info.title}
            </Typography>

            <Typography
              sx={{
                fontSize: 12,
                color: themeStyles.subtitleColor,
                fontWeight: 600,
                mt: 0.2,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {info.subtitle}
            </Typography>
          </Box>

          <IconButton
            onClick={onClose}
            sx={{
              color: themeStyles.titleColor,
              display: { xs: "inline-flex", md: "none" },
            }}
          >
            <Close />
          </IconButton>
        </Stack>
      </Box>

      <Divider
        sx={{
          borderColor: isCandidate
            ? "rgba(147, 197, 253, 0.3)"
            : "rgba(216, 180, 254, 0.3)",
          mx: 2.5,
        }}
      />

      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          overflowY: "auto",
          px: 2,
          py: 2,
          "&::-webkit-scrollbar": { width: 4 },
          "&::-webkit-scrollbar-thumb": {
            bgcolor: isCandidate
              ? "rgba(59, 130, 246, 0.3)"
              : "rgba(168, 85, 247, 0.3)",
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
                  color: active
                    ? themeStyles.activeTextColor
                    : themeStyles.inactiveTextColor,
                  background: active
                    ? themeStyles.activeGradient
                    : "rgba(255, 255, 255, 0.25)",
                  backdropFilter: active ? "none" : "blur(8px)",
                  boxShadow: active ? themeStyles.activeShadow : "none",
                  border: active
                    ? "1px solid rgba(255, 255, 255, 0.5)"
                    : "1px solid rgba(255, 255, 255, 0.35)",
                  transition: "all .2s ease-in-out",
                  "&:hover": {
                    background: active
                      ? themeStyles.activeGradient
                      : themeStyles.btnHoverBg,
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: active
                      ? themeStyles.activeTextColor
                      : themeStyles.iconColor,
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
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
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

      <Box sx={{ p: 2, flexShrink: 0 }}>
        <Box
          sx={{
            p: 1.5,
            borderRadius: "18px",
            bgcolor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.45)",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
          }}
        >
          <Stack direction="row" spacing={1.3} sx={{ alignItems: "center" }}>
            <Avatar
              sx={{
                width: 38,
                height: 38,
                bgcolor: themeStyles.avatarBg,
                fontWeight: 700,
                fontSize: 13,
                boxShadow: themeStyles.avatarShadow,
              }}
            >
              {userAvatar}
            </Avatar>

            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 13,
                  color: isCandidate ? "#1e3a8a" : "#3b0764",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {displayName}
              </Typography>

              <Typography
                sx={{
                  fontSize: 11,
                  color: themeStyles.subtitleColor,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {user?.role || info.subtitle}
              </Typography>
            </Box>
          </Stack>

          <Button
            fullWidth
            disabled={isLoading}
            startIcon={<Logout sx={{ fontSize: 18 }} />}
            onClick={handleLogout}
            sx={{
              mt: 1.5,
              color: "#ef4444",
              justifyContent: "center",
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              bgcolor: "rgba(254, 242, 242, 0.45)",
              backdropFilter: "blur(6px)",
              fontSize: 13,
              py: 0.8,
              border: "1px solid rgba(254, 202, 202, 0.5)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              "&:hover": {
                bgcolor: "rgba(254, 226, 226, 0.75)",
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