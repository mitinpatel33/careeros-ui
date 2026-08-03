import { IconButton, Tooltip, type SxProps, type Theme } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

type Props = {
  title: string;
  icon: SvgIconComponent;
  disabled: boolean;
  onClick: () => void;
  variant?: "outlined" | "filled";
  sx?: SxProps<Theme>;
};

const ActionIconButton = ({
  title,
  icon: Icon,
  onClick,
  variant = "outlined",
  sx, 
}: Props) => {
  const filled = variant === "filled";

  return (
    <Tooltip title={title} arrow>
      <IconButton
        onClick={onClick}
        sx={[
          {
            width: 50,
            height: 50,
            // borderRadius: 3,
            // bgcolor: filled ? "primary.main" : "#fff",
            // border: filled ? "none" : "1px solid #dbe3f0",
            color: filled ? "#fff" : "primary.main",
            transition: "all .25s ease",
            "&:hover": {
              bgcolor: filled ? "primary.dark" : "primary.main",
              color: "#fff",
              transform: "translateY(-2px)",
              boxShadow: filled
                ? "0 12px 28px rgba(25,118,210,.35)"
                : "0 10px 25px rgba(25,118,210,.25)",
            },
          },
          // spread custom sx to override or extend
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default ActionIconButton;