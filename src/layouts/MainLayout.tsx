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
        bgcolor: "#eef2ff",
      }}
    >
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
        }}
      >
        <AppHeader
          portal={portal}
          onMenuClick={() => setMobileOpen(true)}
        />

        <Box
          component="main"
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            overflowX: "hidden",
            p: { xs: 2, md: 3 },
            background:
              "radial-gradient(circle at top left,#dbeafe 0,transparent 32%),linear-gradient(135deg,#f8fafc,#eef2ff)",
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