import { IconButton, Tooltip } from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";

type Props = {
  title: string;
  icon: SvgIconComponent;
  onClick: () => void;
  variant?: "outlined" | "filled";
};

const ActionIconButton = ({
  title,
  icon: Icon,
  onClick,
  variant = "outlined",
}: Props) => {
  const filled = variant === "filled";

  return (
    <Tooltip title={title} arrow>
      <IconButton
        onClick={onClick}
        sx={{
          width: 52,
          height: 52,
          borderRadius: 3,
          bgcolor: filled ? "primary.main" : "#fff",
          border: filled ? "none" : "1px solid #dbe3f0",
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
        }}
      >
        <Icon />
      </IconButton>
    </Tooltip>
  );
};

export default ActionIconButton;