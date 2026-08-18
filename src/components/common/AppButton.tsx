import { Button, CircularProgress, type SxProps, type Theme } from "@mui/material";

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
  sx?: SxProps<Theme>; // 1. Added sx prop definition
}

const AppButton = ({
  children,
  loading = false,
  type = "button",
  fullWidth = false,
  color = "primary",
  variant = "contained",
  startIcon,
  endIcon,
  disabled,
  onClick,
  sx, // 2. Received sx prop
}: AppButtonProps) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      size="large"
      type={type}
      color={color}
      disabled={loading || disabled}
      startIcon={loading ? <CircularProgress size={18} color="inherit" /> : startIcon}
      endIcon={!loading ? endIcon : undefined}
      onClick={onClick}
      sx={{
        height: 50,
        px: 3,
        borderRadius: 3,
        textTransform: "none",
        fontWeight: 800,
        boxShadow: variant === "contained" ? "0 12px 30px rgba(25,118,210,.25)" : "none",
        transition: "0.25s",
        "&:hover": {
          transform: "translateY(-2px)",
        },
        // 3. Merged incoming custom sx styles smoothly
        ...(Array.isArray(sx) ? sx : [sx]),
      }}
    >
      {loading ? "Please Wait..." : children}
    </Button>
  );
};

export default AppButton;