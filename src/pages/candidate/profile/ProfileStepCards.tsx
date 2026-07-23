import {
  Avatar,
  Box,
  Card,
  LinearProgress,
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
  completedSteps: ProfileStepKey[];
  completion: number;
  fullName?: string;
  jobTitle?: string;
  onStepChange: (step: ProfileStepKey) => void;
};

const steps = [
  { key: "personal", title: "Personal", subtitle: "Basic information", icon: <Person /> },
  { key: "summary", title: "Summary", subtitle: "Professional intro", icon: <Description /> },
  { key: "contact", title: "Contact", subtitle: "Email and address", icon: <ContactMail /> },
  { key: "social", title: "Social", subtitle: "Online profiles", icon: <Language /> },
  { key: "skills", title: "Skills", subtitle: "Technical skills", icon: <Psychology /> },
  { key: "educations", title: "Education", subtitle: "Academic details", icon: <School /> },
  { key: "experiences", title: "Experience", subtitle: "Work history", icon: <Work /> },
  { key: "projects", title: "Projects", subtitle: "Portfolio work", icon: <FolderSpecial /> },
  { key: "certificates", title: "Certificates", subtitle: "Achievements", icon: <WorkspacePremium /> },
  { key: "achievements", title: "Awards", subtitle: "Highlights", icon: <EmojiEvents /> },
  { key: "languages", title: "Languages", subtitle: "Known languages", icon: <Translate /> },
  { key: "settings", title: "Settings", subtitle: "Publish options", icon: <Settings /> },
] as const;

const ProfileStepCards = ({
  activeStep,
  completedSteps,
  completion,
  fullName = "N/A",
  jobTitle = "Your Job Title",
  onStepChange,
}: Props) => {
  const initials = fullName
    .split(" ")
    .map((x) => x[0])
    .join("")
    .slice(0, 2);

  return (
    <Card
      sx={{
        p: { xs: 2.2, sm: 3 },
        borderRadius: 5,
        boxShadow: "0 20px 60px rgba(31,81,255,.12)",
      }}
    >
      <Stack sx={{ alignItems: "center" }} spacing={2}>
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
          <Avatar
            sx={{
              width: { xs: 82, sm: 110 },
              height: { xs: 82, sm: 110 },
              fontSize: { xs: 30, sm: 40 },
              fontWeight: 900,
              bgcolor: "#bdbdbd",
              boxShadow: "0 15px 35px rgba(0,0,0,.12)",
            }}
          >
            {initials}
          </Avatar>
        </motion.div>

        <Box sx={{ textAlign: "center" }}>
          <Typography sx={{ fontSize: { xs: 22, sm: 26 }, fontWeight: 900 }}>
            {fullName}
          </Typography>
          <Typography color="text.secondary">{jobTitle}</Typography>
        </Box>

        <Box sx={{ width: "100%", mt: 1 }}>
          <Stack direction="row" sx={{ mb: 1, justifyContent: "space-between" }}>
            <Typography sx={{fontWeight: 900}}>Completion</Typography>
            <Typography sx={{fontWeight: 900}}>{completion}%</Typography>
          </Stack>

          <LinearProgress
            variant="determinate"
            value={completion}
            sx={{
              height: 10,
              borderRadius: 10,
              bgcolor: "#bbdefb",
              "& .MuiLinearProgress-bar": {
                borderRadius: 10,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            mt: 2,
            display: "grid",
            gap: 1.5,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "1fr",
            },
            maxHeight: { xs: "none", md: "52vh" },
            overflowY: { xs: "visible", md: "auto" },
            pr: { md: 0.5 },
            "&::-webkit-scrollbar": {
              width: 6,
            },
            "&::-webkit-scrollbar-thumb": {
              bgcolor: "#c7d2fe",
              borderRadius: 10,
            },
          }}
        >
          {steps.map((item) => {
            const active = activeStep === item.key;
            const completed = completedSteps.includes(item.key);

            return (
              <motion.div
                key={item.key}
                whileHover={{ scale: 1.025, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box
                  onClick={() => onStepChange(item.key)}
                  sx={{
                    p: 2,
                    borderRadius: 3,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 1.6,
                    minHeight: 74,
                    bgcolor: active ? "primary.main" : "#fff",
                    color: active ? "#fff" : "text.primary",
                    border: "1px solid #e5e7eb",
                    boxShadow: active
                      ? "0 14px 34px rgba(25,118,210,.35)"
                      : "0 8px 22px rgba(15,23,42,.04)",
                    transition: "0.25s",
                  }}
                >
                  <Box
                    sx={{
                      width: 34,
                      height: 34,
                      display: "grid",
                      placeItems: "center",
                      borderRadius: 2,
                      bgcolor: active ? "rgba(255,255,255,.18)" : "#f3f4f6",
                    }}
                  >
                    {completed ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -120 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 260 }}
                      >
                        <CheckCircle
                          sx={{
                            color: active ? "#fff" : "success.main",
                            fontSize: 22,
                          }}
                        />
                      </motion.div>
                    ) : (
                      item.icon
                    )}
                  </Box>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography
                      sx={{
                        fontWeight: 900,
                        lineHeight: 1.2,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title}
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 13,
                        color: active ? "#eaf4ff" : "text.secondary",
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
    </Card>
  );
};

export default ProfileStepCards;