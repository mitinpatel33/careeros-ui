import { useEffect, useRef } from "react";
import {
  Avatar,
  Box,
  ButtonBase,
  LinearProgress,
  Paper,
  Stack,
  Typography,
  alpha,
} from "@mui/material";
import type { SvgIconComponent } from "@mui/icons-material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import NotesRoundedIcon from "@mui/icons-material/NotesRounded";
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import WorkRoundedIcon from "@mui/icons-material/WorkRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import TranslateRoundedIcon from "@mui/icons-material/TranslateRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

export type ProfileStepKey =
  | "personal"
  | "summary"
  | "contact"
  | "social"
  | "skills"
  | "educations"
  | "experiences"
  | "projects"
  | "certificates"
  | "achievements"
  | "languages"
  | "template"
  | "settings";

interface StepMeta {
  key: ProfileStepKey;
  title: string;
  subtitle: string;
  icon: SvgIconComponent;
}

/** Same order as `steps` in ProfilePage */
const STEP_META: StepMeta[] = [
  {
    key: "personal",
    title: "Personal",
    subtitle: "Basic info",
    icon: PersonRoundedIcon,
  },
  {
    key: "summary",
    title: "Summary",
    subtitle: "Professional intro",
    icon: NotesRoundedIcon,
  },
  {
    key: "contact",
    title: "Contact",
    subtitle: "Email & address",
    icon: ContactMailRoundedIcon,
  },
  {
    key: "social",
    title: "Social",
    subtitle: "Online profiles",
    icon: PublicRoundedIcon,
  },
  {
    key: "skills",
    title: "Skills",
    subtitle: "Technical skills",
    icon: BoltRoundedIcon,
  },
  {
    key: "educations",
    title: "Education",
    subtitle: "Academic details",
    icon: SchoolRoundedIcon,
  },
  {
    key: "experiences",
    title: "Experience",
    subtitle: "Work history",
    icon: WorkRoundedIcon,
  },
  {
    key: "projects",
    title: "Projects",
    subtitle: "Portfolio & client work",
    icon: RocketLaunchRoundedIcon,
  },
  {
    key: "certificates",
    title: "Certificates",
    subtitle: "Courses & licences",
    icon: WorkspacePremiumRoundedIcon,
  },
  {
    key: "achievements",
    title: "Achievements",
    subtitle: "Awards & honours",
    icon: EmojiEventsRoundedIcon,
  },
  {
    key: "languages",
    title: "Languages",
    subtitle: "Spoken languages",
    icon: TranslateRoundedIcon,
  },
  {
    key: "template",
    title: "Template",
    subtitle: "Pick a resume design",
    icon: PaletteRoundedIcon,
  },
  {
    key: "settings",
    title: "Settings",
    subtitle: "Publish & visibility",
    icon: TuneRoundedIcon,
  },
];

const FONT = "'Plus Jakarta Sans', sans-serif";
const theme = {
  titleColor: "#1d4ed8",
  subtitleColor: "#3b82f6",
  iconColor: "#2563eb",
  activeGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
  activeShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
  // medium-white mirror glass
  glassBg:
    "linear-gradient(135deg, rgba(255,255,255,0.62) 0%, rgba(255,255,255,0.38) 100%)",
  glassBorder: "1px solid rgba(255, 255, 255, 0.75)",
  glassFilter: "blur(18px) saturate(160%)",
  glassShadow:
    "0 8px 24px -6px rgba(37, 99, 235, 0.12), inset 0 1px 0 rgba(255,255,255,0.85)",
};

interface Props {
  activeStep: ProfileStepKey;
  completion: number;
  fullName?: string;
  jobTitle?: string;
  photoURL?: string;
  onStepChange: (step: ProfileStepKey) => void;
  completedSteps?: ProfileStepKey[];
}

const initialsOf = (name?: string) =>
  (name || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("") || "U";

const progressSx = {
  height: 8,
  borderRadius: 99,
  bgcolor: alpha(theme.iconColor, 0.12),
  "& .MuiLinearProgress-bar": {
    borderRadius: 99,
    background: "linear-gradient(90deg,#3b82f6 0%,#8b5cf6 100%)",
  },
};

const ProfileStepCards = ({
  activeStep,
  completion,
  fullName,
  jobTitle,
  photoURL,
  onStepChange,
  completedSteps = [],
}: Props) => {
  const pct = Math.max(0, Math.min(100, Math.round(completion)));

  // keep the active chip visible in the horizontal strip (mobile / tablet)
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  useEffect(() => {
    chipRefs.current[activeStep]?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: "smooth",
    });
  }, [activeStep]);

  const avatar = (size: number) => (
    <Avatar
      src={photoURL || undefined}
      alt={fullName}
      sx={{
        width: size,
        height: size,
        fontFamily: FONT,
        fontWeight: 800,
        fontSize: size * 0.34,
        background: theme.activeGradient,
        boxShadow: theme.activeShadow,
        border: "3px solid #fff",
      }}
    >
      {initialsOf(fullName)}
    </Avatar>
  );

  return (
    <>
      {/* ═════════ Desktop (lg+): sticky vertical sidebar ═════════ */}
      <Paper
        elevation={0}
        sx={{
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          position: "sticky",
          top: 16,
          maxHeight: "calc(100dvh - 32px)",
          borderRadius: "24px",
          overflow: "hidden",
          bgcolor: theme.glassBg,
          backdropFilter: theme.glassFilter,
          WebkitBackdropFilter: theme.glassFilter,
          border: theme.glassBorder,
          boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.08)",
        }}
      >
        {/* identity + progress */}
        <Stack
          spacing={1.5}
          sx={{
            p: 2.5,
            pb: 2,
            alignItems: "center",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          {avatar(72)}
          <Box sx={{ minWidth: 0, maxWidth: "100%" }}>
            <Typography
              noWrap
              sx={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: 17,
                color: theme.titleColor,
              }}
            >
              {fullName || "Your name"}
            </Typography>
            <Typography
              noWrap
              sx={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 12.5,
                color: theme.subtitleColor,
              }}
            >
              {jobTitle || "Add your job title"}
            </Typography>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", mb: 0.75 }}
            >
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 12,
                  color: "text.secondary",
                }}
              >
                Profile completion
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 12,
                  color: theme.titleColor,
                }}
              >
                {pct}%
              </Typography>
            </Stack>
            <LinearProgress variant="determinate" value={pct} sx={progressSx} />
          </Box>
        </Stack>

        <Box
          sx={{
            height: "1px",
            mx: 2.5,
            bgcolor: alpha(theme.iconColor, 0.1),
            flexShrink: 0,
          }}
        />

        {/* steps – fills remaining height, scrolls only if the viewport is short */}
        <Box
          component="nav"
          aria-label="Profile steps"
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: "auto",
            p: 1.5,
            display: "flex",
            flexDirection: "column",
            gap: 0.5,
            scrollbarWidth: "thin",
            scrollbarColor: `${alpha(theme.iconColor, 0.3)} transparent`,
          }}
        >
          {STEP_META.map((s, i) => {
            const active = s.key === activeStep;
            const done = completedSteps.includes(s.key);
            const Icon = s.icon;
            return (
              <ButtonBase
                key={s.key}
                onClick={() => onStepChange(s.key)}
                aria-current={active ? "step" : undefined}
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  gap: 1.5,
                  px: 1.25,
                  py: 1,
                  borderRadius: "14px",
                  fontFamily: FONT,
                  color: active ? "#fff" : "text.primary",
                  background: active ? theme.activeGradient : "transparent",
                  boxShadow: active ? theme.activeShadow : "none",
                  transition: "background .2s, box-shadow .2s",
                  "&:hover": {
                    background: active
                      ? theme.activeGradient
                      : alpha(theme.iconColor, 0.07),
                  },
                  "&.Mui-focusVisible": {
                    outline: `2px solid ${alpha(theme.iconColor, 0.6)}`,
                    outlineOffset: 2,
                  },
                }}
              >
                <Box
                  sx={{
                    flexShrink: 0,
                    width: 34,
                    height: 34,
                    borderRadius: "11px",
                    display: "grid",
                    placeItems: "center",
                    color: active ? "#fff" : theme.iconColor,
                    bgcolor: active
                      ? "rgba(255,255,255,0.2)"
                      : alpha(theme.iconColor, 0.1),
                  }}
                >
                  <Icon sx={{ fontSize: 19 }} />
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Typography
                    noWrap
                    sx={{
                      fontFamily: FONT,
                      fontWeight: 700,
                      fontSize: 13.5,
                      lineHeight: 1.25,
                    }}
                  >
                    {s.title}
                  </Typography>
                  <Typography
                    noWrap
                    sx={{
                      fontFamily: FONT,
                      fontWeight: 500,
                      fontSize: 11.5,
                      lineHeight: 1.3,
                      color: active
                        ? "rgba(255,255,255,0.8)"
                        : "text.secondary",
                    }}
                  >
                    {s.subtitle}
                  </Typography>
                </Box>
                {done && !active && (
                  <CheckRoundedIcon sx={{ fontSize: 18, color: "#10b981" }} />
                )}
              </ButtonBase>
            );
          })}
        </Box>
      </Paper>

      {/* ═════════ Mobile + tablet (< lg): compact header + swipeable step strip ═════════ */}
      <Paper
        elevation={0}
        sx={{
          display: { xs: "block", lg: "none" },
          borderRadius: { xs: "18px", md: "22px" },
          overflow: "hidden",
          bgcolor: theme.glassBg,
          backdropFilter: theme.glassFilter,
          WebkitBackdropFilter: theme.glassFilter,
          border: theme.glassBorder,
          boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.08)",
        }}
      >
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ p: { xs: 1.5, md: 2 }, alignItems: "center" }}
        >
          {avatar(44)}
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              noWrap
              sx={{
                fontFamily: FONT,
                fontWeight: 800,
                fontSize: { xs: 15, md: 16 },
                color: theme.titleColor,
              }}
            >
              {fullName || "Your name"}
            </Typography>
            <Typography
              noWrap
              sx={{
                fontFamily: FONT,
                fontWeight: 600,
                fontSize: 12,
                color: theme.subtitleColor,
              }}
            >
              {jobTitle || "Add your job title"}
            </Typography>
          </Box>
          {/* progress block: fixed width so it never squeezes the name */}
          <Box sx={{ width: { xs: 96, sm: 160, md: 220 }, flexShrink: 0 }}>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-between", mb: 0.5 }}
            >
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 11,
                  color: "text.secondary",
                }}
              >
                Complete
              </Typography>
              <Typography
                sx={{
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 11,
                  color: theme.titleColor,
                }}
              >
                {pct}%
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={pct}
              sx={{ ...progressSx, height: 6 }}
            />
          </Box>
        </Stack>

        <Box
          component="nav"
          aria-label="Profile steps"
          sx={{
            display: "flex",
            gap: 1,
            px: { xs: 1.5, md: 2 },
            pb: 1.5,
            overflowX: "auto",
            scrollSnapType: "x proximity",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {STEP_META.map((s, i) => {
            const active = s.key === activeStep;
            const done = completedSteps.includes(s.key);
            const Icon = s.icon;
            return (
              <ButtonBase
                key={s.key}
                ref={(el) => {
                  chipRefs.current[s.key] = el;
                }}
                onClick={() => onStepChange(s.key)}
                aria-current={active ? "step" : undefined}
                sx={{
                  flexShrink: 0,
                  scrollSnapAlign: "center",
                  gap: 0.75,
                  pl: 0.75,
                  pr: 1.5,
                  py: 0.75,
                  borderRadius: 99,
                  fontFamily: FONT,
                  fontWeight: 700,
                  fontSize: 13,
                  whiteSpace: "nowrap",
                  color: active ? "#fff" : theme.titleColor,
                  background: active
                    ? theme.activeGradient
                    : "rgba(255,255,255,0.75)",
                  border: active
                    ? "1px solid transparent"
                    : `1px solid ${alpha(theme.iconColor, 0.18)}`,
                  boxShadow: active ? theme.activeShadow : "none",
                  transition: "all .2s ease",
                  "&.Mui-focusVisible": {
                    outline: `2px solid ${alpha(theme.iconColor, 0.6)}`,
                    outlineOffset: 2,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    color: active ? "#fff" : theme.iconColor,
                    bgcolor: active
                      ? "rgba(255,255,255,0.22)"
                      : alpha(theme.iconColor, 0.1),
                  }}
                >
                  {done && !active ? (
                    <CheckRoundedIcon sx={{ fontSize: 15, color: "#10b981" }} />
                  ) : (
                    <Icon sx={{ fontSize: 15 }} />
                  )}
                </Box>
                <Box component="span" sx={{ display: "inline-flex", gap: 0.5 }}>
                  <Box
                    component="span"
                    sx={{ opacity: 0.6, display: { xs: "none", sm: "inline" } }}
                  >
                    {i + 1}.
                  </Box>
                  {s.title}
                </Box>
              </ButtonBase>
            );
          })}
        </Box>
      </Paper>
    </>
  );
};

export default ProfileStepCards;
