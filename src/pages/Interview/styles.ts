import type { SxProps, Theme } from "@mui/material";

export const cardSx: SxProps<Theme> = {
  borderRadius: "18px",
  border: "1px solid rgba(220,232,255,.95)",
  background: "rgba(255,255,255,.96)",
  boxShadow: "0 12px 30px rgba(47,89,153,.08)",
  transition: "box-shadow .2s ease, transform .2s ease",
  "&:hover": { boxShadow: "0 16px 34px rgba(47,89,153,.12)" },
};

export const cardPadding = { xs: 1.5, sm: 2, md: 2.25 };

export const primaryButtonSx: SxProps<Theme> = {
  textTransform: "none",
  fontWeight: 750,
  borderRadius: "12px",
  background: "linear-gradient(100deg,#3769ff,#6858f5)",
  boxShadow: "0 5px 12px rgba(65,93,245,.2)",
  "&:hover": { background: "linear-gradient(100deg,#2859ed,#5846e8)" },
};

export const selectFieldSx = (fontSize = ".78rem") => ({
  "& .MuiOutlinedInput-root": { borderRadius: "10px", fontSize },
});

export const pageBackgroundSx: SxProps<Theme> = {
  minHeight: "100vh",
  py: { xs: 1.5, sm: 2, md: 2.5 },
  px: { xs: 1, sm: 1.5, md: 2.5 },
  // background:
  //   "radial-gradient(circle at 75% 8%, rgba(211,205,255,.48), transparent 25%), linear-gradient(135deg,#e9f5ff 0%,#e2f3ff 48%,#eff0ff 100%)",
  position: "relative",
  overflow: "hidden",
  "&:before": {
    content: '""',
    pointerEvents: "none",
    position: "absolute",
    inset: 0,
    opacity: 0.35,
    backgroundImage:
      "radial-gradient(circle at 15% 20%, #a78bfa 0 2px, transparent 3px), radial-gradient(circle at 84% 38%, #8b5cf6 0 2px, transparent 3px), linear-gradient(135deg, transparent 49.7%, #c4b5fd 49.9%, transparent 50.1%)",
    backgroundSize: "190px 170px, 250px 210px, 310px 270px",
  },
};
