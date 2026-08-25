import React from "react";
import {
  Button,
  CircularProgress,
  type SxProps,
  type Theme,
} from "@mui/material";

interface AppButtonProps {
  children: React.ReactNode;
  loading?: boolean;
  type?: "button" | "submit";
  fullWidth?: boolean;
  color?: "primary" | "success" | "error";
  variant?: "contained" | "outlined" | "text";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const AppButton = ({
  children,
  loading = false,
  type = "button",
  fullWidth = true,
  color = "primary",
  variant = "contained",
  startIcon,
  endIcon,
  disabled,
  onClick,
  sx,
}: AppButtonProps) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      size="large"
      type={type}
      color={color}
      disabled={loading || disabled}
      startIcon={
        loading ? <CircularProgress size={18} color="inherit" /> : startIcon
      }
      endIcon={!loading ? endIcon : undefined}
      onClick={onClick}
      sx={[
        {
          height: 48,
          px: 3,
          borderRadius: "16px",
          textTransform: "none",
          fontWeight: 700,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {loading ? "Please Wait..." : children}
    </Button>
  );
};

export default AppButton;
