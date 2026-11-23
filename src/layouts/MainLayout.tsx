import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import AppSidebar from "../components/layout/AppSidebar";
import AppHeader from "../components/layout/AppHeader";
import type { PortalType } from "../components/layout/sidebarMenus";
import ConnectedConstellationBg from "./ConnectedConstellationBg";

type Props = {
  portal: PortalType;
};

const MainLayout = ({ portal }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const isCandidate = portal === "candidate";

  const layoutStyles = {
    bgGradient: isCandidate
      ? "linear-gradient(135deg, #eff6ff 0%, #e0f2fe 40%, #eef2ff 100%)"
      : "linear-gradient(135deg, #f5f3ff 0%, #fae8ff 40%, #f3eefd 100%)",
    scrollbarThumb: isCandidate ? "rgba(59, 130, 246, 0.3)" : "rgba(168, 85, 247, 0.3)",
    scrollbarThumbHover: isCandidate ? "rgba(37, 99, 235, 0.5)" : "rgba(147, 51, 234, 0.5)",
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100dvh", // dvh: correct height on mobile browsers with collapsing address bar
        overflow: "hidden",
        display: "flex",
        position: "relative",
        background: layoutStyles.bgGradient,
        transition: "background 0.3s ease",
      }}
    >
      <ConnectedConstellationBg />

      <AppSidebar portal={portal} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box
        sx={{
          flex: 1,
          minWidth: 0, // lets content shrink instead of overflowing on small screens
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 2,
        }}
      >
        <AppHeader portal={portal} onMenuClick={() => setMobileOpen(true)} />

        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            // tighter spacing under the header
            px: { xs: 1.25, sm: 2, md: 2.5 },
            pt: { xs: 0.5, sm: 1, md: 1 },
            pb: { xs: 1.5, sm: 2, md: 2.5 },
            "&::-webkit-scrollbar": { width: 6 },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: layoutStyles.scrollbarThumb,
              borderRadius: 10,
              "&:hover": { bgcolor: layoutStyles.scrollbarThumbHover },
            },
            "&::-webkit-scrollbar-track": { bgcolor: "transparent" },
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "1440px", mx: "auto" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;