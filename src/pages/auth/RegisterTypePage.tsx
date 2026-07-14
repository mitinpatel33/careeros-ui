import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  ArrowForward,
  Business,
  CheckCircle,
  Person,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RegisterTypePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        placeItems: "center",
        p: { xs: 2, md: 4 },
        background:
          "linear-gradient(135deg,#0f172a 0%,#1e3a8a 45%,#7c3aed 100%)",
      }}
    >
      <Glow top={-80} left={-70} color="#60a5fa" />
      <Glow bottom={-90} right={-70} color="#a855f7" />

      <Stack
        component={motion.div}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        spacing={4}
        sx={{ width: "100%", maxWidth: 1050, zIndex: 2 }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Chip
            label="Choose your journey"
            sx={{
              mb: 2,
              color: "#fff",
              fontWeight: 800,
              bgcolor: "rgba(255,255,255,.14)",
            }}
          />

          <Typography
            sx={{
              color: "#fff",
              fontWeight: 900,
              fontSize: { xs: 34, sm: 46, md: 58 },
            }}
          >
            Join Resume Builder 🚀
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,.75)", mt: 1 }}>
            Select how you want to use the platform.
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
          <AccountCard
            icon={<Person />}
            title="Candidate"
            subtitle="Build resumes, publish live profile and download premium themes."
            features={[
              "AI Resume Builder",
              "Live Portfolio",
              "Resume Themes",
              "ATS Score",
            ]}
            buttonText="Start as Candidate"
            onClick={() => navigate("/register/candidate")}
          />

          <AccountCard
            icon={<Business />}
            title="Company"
            subtitle="Post jobs, search candidates and manage hiring pipeline."
            features={[
              "Job Posting",
              "Candidate Search",
              "AI Matching",
              "Hiring Pipeline",
            ]}
            buttonText="Start as Company"
            onClick={() => navigate("/register/company")}
          />
        </Stack>

        <Typography sx={{ textAlign: "center", color: "#fff" }}>
          Already have an account?{" "}
          <Box
            component="span"
            onClick={() => navigate("/login")}
            sx={{ fontWeight: 900, cursor: "pointer", textDecoration: "underline" }}
          >
            Login
          </Box>
        </Typography>
      </Stack>
    </Box>
  );
};

const AccountCard = ({ icon, title, subtitle, features, buttonText, onClick }: any) => (
  <Paper
    component={motion.div}
    whileHover={{ y: -10, scale: 1.02 }}
    onClick={onClick}
    sx={{
      flex: 1,
      p: { xs: 3, sm: 4 },
      borderRadius: 6,
      cursor: "pointer",
      color: "#fff",
      background: "rgba(255,255,255,.10)",
      backdropFilter: "blur(22px)",
      border: "1px solid rgba(255,255,255,.18)",
      boxShadow: "0 25px 80px rgba(0,0,0,.25)",
    }}
  >
    <Stack spacing={2.3}>
      <Box
        component={motion.div}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        sx={{
          width: 84,
          height: 84,
          borderRadius: 5,
          display: "grid",
          placeItems: "center",
          bgcolor: "rgba(255,255,255,.16)",
          "& svg": { fontSize: 48 },
        }}
      >
        {icon}
      </Box>

      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        {title}
      </Typography>

      <Typography sx={{ color: "rgba(255,255,255,.75)" }}>
        {subtitle}
      </Typography>

      <Stack spacing={1}>
        {features.map((feature: string) => (
          <Stack key={feature} direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <CheckCircle sx={{ fontSize: 19, color: "#86efac" }} />
            <Typography sx={{ fontSize: 14.5, fontWeight: 700 }}>
              {feature}
            </Typography>
          </Stack>
        ))}
      </Stack>

      <Button
        fullWidth
        variant="contained"
        endIcon={<ArrowForward />}
        sx={{
          py: 1.4,
          borderRadius: 4,
          fontWeight: 900,
          textTransform: "none",
          bgcolor: "#fff",
          color: "#1e1b4b",
        }}
      >
        {buttonText}
      </Button>
    </Stack>
  </Paper>
);

const Glow = ({ top, left, right, bottom, color }: any) => (
  <Box
    component={motion.div}
    animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
    transition={{ duration: 5, repeat: Infinity }}
    sx={{
      position: "absolute",
      top,
      left,
      right,
      bottom,
      width: 260,
      height: 260,
      borderRadius: "50%",
      bgcolor: color,
      filter: "blur(110px)",
    }}
  />
);

export default RegisterTypePage;