import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import AppSidebar from "../components/layout/AppSidebar";
import AppHeader from "../components/layout/AppHeader";
import type { PortalType } from "../components/layout/sidebarMenus";

const drawerWidth = 270;

type Props = {
  portal: PortalType;
};

const MainLayout = ({ portal }: Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        background:
          "radial-gradient(circle at 50% 30%, #f0f7ff 0%, #e0f2fe 100%)",
        position: "relative",
      }}
    >
      {/* Background Floating Network SVG Grid */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.6,
          //backgroundImage: `radial-gradient(#3b82f6 0.75px, transparent 0.75px), radial-gradient(#60a5fa 0.75px, #f0f7ff 0.75px)`,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0, 15px 15px",
        }}
      />

      <AppSidebar
        portal={portal}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <Box
        sx={{
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
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
            p: { xs: 2, md: 3 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "1440px",
              mx: "auto",
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
