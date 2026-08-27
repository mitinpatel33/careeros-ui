import {
  Avatar,
  Box,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  Person,
  Description,
  ContactMail,
  Language,
  Psychology,
  School,
  Work,
  FolderSpecial,
  WorkspacePremium,
  EmojiEvents,
  Translate,
  Settings,
  CheckCircle,
} from "@mui/icons-material";
import { motion } from "framer-motion";

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
  | "settings";

type Props = {
  activeStep: ProfileStepKey;
  completedSteps?: ProfileStepKey[];
  completion: number;
  fullName?: string;
  jobTitle?: string;
  photoURL?: string;
  onStepChange: (step: ProfileStepKey) => void;
};

const steps = [
  {
    key: "personal",
    title: "Personal",
    subtitle: "Basic info",
    icon: <Person />,
  },
  {
    key: "summary",
    title: "Summary",
    subtitle: "Professional intro",
    icon: <Description />,
  },
  {
    key: "contact",
    title: "Contact",
    subtitle: "Email & address",
    icon: <ContactMail />,
  },
  {
    key: "social",
    title: "Social",
    subtitle: "Online profiles",
    icon: <Language />,
  },
  {
    key: "skills",
    title: "Skills",
    subtitle: "Technical skills",
    icon: <Psychology />,
  },
  {
    key: "educations",
    title: "Education",
    subtitle: "Academic details",
    icon: <School />,
  },
  {
    key: "experiences",
    title: "Experience",
    subtitle: "Work history",
    icon: <Work />,
  },
  {
    key: "projects",
    title: "Projects",
    subtitle: "Portfolio work",
    icon: <FolderSpecial />,
  },
  {
    key: "certificates",
    title: "Certificates",
    subtitle: "Credentials",
    icon: <WorkspacePremium />,
  },
  {
    key: "achievements",
    title: "Awards",
    subtitle: "Highlights",
    icon: <EmojiEvents />,
  },
  {
    key: "languages",
    title: "Languages",
    subtitle: "Known languages",
    icon: <Translate />,
  },
  {
    key: "settings",
    title: "Settings",
    subtitle: "Publish options",
    icon: <Settings />,
  },
] as const;

const ProfileStepCards = ({
  activeStep,
  completedSteps = [],
  completion,
  fullName = "Candidate Name",
  jobTitle = "Your Job Title",
  photoURL,
  onStepChange,
}: Props) => {
  const initials = fullName
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.2, sm: 3 },
        borderRadius: "24px",
        // Translucent Glass Canvas
        bgcolor: "rgba(255, 255, 255, 0.65)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.8)",
        boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.08)",
      }}
    >
      <Stack sx={{ alignItems: "center" }} spacing={2}>
        {/* Candidate Avatar */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
          <Avatar
            src={photoURL || undefined}
            sx={{
              width: { xs: 80, sm: 96 },
              height: { xs: 80, sm: 96 },
              fontSize: { xs: 28, sm: 36 },
              fontWeight: 800,
              bgcolor: "#2563eb",
              color: "#ffffff",
              border: "3px solid #ffffff",
              boxShadow: "0 6px 20px rgba(37, 99, 235, 0.25)",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {!photoURL && initials}
          </Avatar>
        </motion.div>

        {/* Profile Info Header */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: { xs: 18, sm: 22 },
              fontWeight: 800,
              color: "#1e293b",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {fullName}
          </Typography>
          <Typography
            sx={{
              fontSize: 13,
              color: "#64748b",
              fontWeight: 600,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {jobTitle}
          </Typography>
        </Box>

        {/* Completion Bar */}
        <Box sx={{ width: "100%", mt: 1 }}>
          <Stack
            direction="row"
            sx={{ mb: 1, justifyContent: "space-between" }}
          >
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 700,
                color: "#1e293b",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              Completion
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 800,
                color: "#2563eb",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {completion}%
            </Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={completion}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: "rgba(219, 234, 254, 0.6)",
              "& .MuiLinearProgress-bar": {
                borderRadius: 4,
                background: "linear-gradient(90deg, #3b82f6 0%, #1d4ed8 100%)",
              },
            }}
          />
        </Box>

        {/* Navigation Step Options Grid */}
        <Box
          sx={{
            width: "100%",
            mt: 2,
            display: "grid",
            gap: 1.25,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "1fr",
            },
            maxHeight: { xs: "none", md: "52vh" },
            overflowY: { xs: "visible", md: "auto" },
            pr: { md: 0.5 },
            "&::-webkit-scrollbar": {
              width: 5,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "rgba(147, 197, 253, 0.6)",
              borderRadius: 10,
            },
          }}
        >
          {steps.map((item) => {
            const active = activeStep === item.key;
            const completed = completedSteps.includes(
              item.key as ProfileStepKey,
            );

            return (
              <motion.div
                key={item.key}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box
                  onClick={() => onStepChange(item.key as ProfileStepKey)}
                  sx={{
                    p: 1.5,
                    borderRadius: "16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    minHeight: 64,
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",

                    // Active state uses gradient; inactive state uses translucent glass
                    background: active
                      ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
                      : "rgba(255, 255, 255, 0.45)",
                    color: active ? "#ffffff" : "#1e293b",
                    border: active
                      ? "1px solid transparent"
                      : "1px solid rgba(255, 255, 255, 0.6)",
                    boxShadow: active
                      ? "0 8px 20px rgba(37, 99, 235, 0.35)"
                      : "none",

                    "&:hover": {
                      background: active
                        ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
                        : "rgba(255, 255, 255, 0.85)",
                      borderColor: active
                        ? "transparent"
                        : "rgba(147, 197, 253, 0.6)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: "10px",
                      display: "grid",
                      placeItems: "center",
                      bgcolor: active
                        ? "rgba(255, 255, 255, 0.2)"
                        : "rgba(239, 246, 255, 0.8)",
                      color: active ? "#ffffff" : "#2563eb",
                      flexShrink: 0,
                    }}
                  >
                    {completed ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260 }}
                      >
                        <CheckCircle
                          sx={{
                            color: active ? "#ffffff" : "#16a34a",
                            fontSize: 20,
                          }}
                        />
                      </motion.div>
                    ) : (
                      item.icon
                    )}
                  </Box>

                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Typography
                      sx={{
                        fontWeight: active ? 700 : 600,
                        fontSize: 14,
                        lineHeight: 1.2,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: active ? "rgba(255, 255, 255, 0.8)" : "#64748b",
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        mt: 0.2,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </motion.div>
            );
          })}
        </Box>
      </Stack>
    </Paper>
  );
};

export default ProfileStepCards;
