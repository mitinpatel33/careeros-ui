import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;