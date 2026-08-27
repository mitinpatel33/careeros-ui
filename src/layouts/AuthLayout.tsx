import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import ConnectedConstellationBg from "./ConnectedConstellationBg";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        width: "100%",
        position: "relative",
        overflow: "hidden", // Prevents full-page horizontal/vertical scrollbars from floating background items
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 0, sm: 0 },
        px: 2,
        background:
          "linear-gradient(180deg, #f8faff 0%, #f3eefd 50%, #f1f5fe 100%)",
      }}
    >
      <ConnectedConstellationBg />

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AuthLayout;
