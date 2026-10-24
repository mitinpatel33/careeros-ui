import React, { type ReactNode } from "react";
import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { motion } from "framer-motion";
import { cardPadding, cardSx, selectFieldSx } from "../styles";

export const MotionPaper = motion(Paper);

/** Card wrapper with optional title/subtitle/action header. */
export const SectionCard: React.FC<{
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}> = ({ title, subtitle, action, children }) => (
  <Paper sx={{ ...cardSx, p: cardPadding, position: "relative", zIndex: 1 }}>
    {title && (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.25}
        sx={{
          mb: 1.5,
          justifyContent: "space-between",
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Box>
          <Typography
            sx={{ color: "#20345e", fontWeight: 850, fontSize: "1.05rem" }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="caption" sx={{ color: "#7588aa" }}>
              {subtitle}
            </Typography>
          )}
        </Box>
        {action}
      </Stack>
    )}
    {children}
  </Paper>
);

/** Tinted circular icon badge. */
export const IconBadge: React.FC<{
  color: string;
  size?: number;
  children: ReactNode;
}> = ({ color, size = 36, children }) => (
  <Avatar
    sx={{ bgcolor: `${color}18`, color, width: size, height: size }}
  >
    {children}
  </Avatar>
);

/** Panel header: icon + title (+ optional trailing node) and a caption. */
export const PanelHeader: React.FC<{
  icon: ReactNode;
  iconColor: string;
  title: string;
  caption: string;
  trailing?: ReactNode;
}> = ({ icon, iconColor, title, caption, trailing }) => (
  <>
    <Stack direction="row" spacing={1} sx={{ mb: 0.5, alignItems: "center" }}>
      <IconBadge color={iconColor}>{icon}</IconBadge>
      <Typography sx={{ color: "#20345e", fontWeight: 850 }}>{title}</Typography>
      {trailing}
    </Stack>
    <Typography variant="caption" sx={{ color: "#7b8eaf" }}>
      {caption}
    </Typography>
  </>
);

/** Labeled dropdown built from a list of strings. */
export const SelectField: React.FC<{
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  fontSize?: string;
  sx?: object;
}> = ({ label, value, options, onChange, fontSize, sx }) => (
  <Box>
    {label && (
      <Typography sx={{ color: "#637696", fontSize: ".68rem", mb: 0.5 }}>
        {label}
      </Typography>
    )}
    <TextField
      select
      fullWidth
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ ...selectFieldSx(fontSize), ...sx }}
    >
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  </Box>
);

/** Clickable tile used for both job titles and skills. */
export const SelectorTile: React.FC<{
  label: string;
  selected: boolean;
  leading: ReactNode;
  onClick: () => void;
  minHeight?: number;
  fontSize?: string;
  selectedBorder?: string;
  selectedBg?: string;
  hoverBorder?: string;
  shadow?: boolean;
  chevronSize?: number;
}> = ({
  label,
  selected,
  leading,
  onClick,
  minHeight = 54,
  fontSize = ".76rem",
  selectedBorder = "#4776ff",
  selectedBg = "#f4f7ff",
  hoverBorder = "#9bb4ff",
  shadow = false,
  chevronSize,
}) => (
  <Button
    fullWidth
    onClick={onClick}
    endIcon={
      <ChevronRight
        sx={chevronSize ? { fontSize: `${chevronSize}px !important` } : undefined}
      />
    }
    sx={{
      justifyContent: "space-between",
      textTransform: "none",
      borderRadius: "12px",
      minHeight,
      px: 1.2,
      color: selected ? "#2f5df0" : "#506486",
      border: selected ? `1.5px solid ${selectedBorder}` : "1px solid #e2eaf8",
      bgcolor: selected ? selectedBg : "#fbfdff",
      boxShadow:
        selected && shadow ? "0 4px 12px rgba(61,101,245,.13)" : "none",
      "&:hover": { bgcolor: "#f3f7ff", borderColor: hoverBorder },
    }}
  >
    <Stack direction="row" spacing={1} sx={{ alignItems: "center", minWidth: 0 }}>
      {leading}
      <Typography
        noWrap
        sx={{ fontSize, fontWeight: selected ? 800 : 650 }}
      >
        {label}
      </Typography>
    </Stack>
  </Button>
);
