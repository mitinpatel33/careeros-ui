import { Box, Typography, Stack, Grid, Link } from "@mui/material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import AuthCard from "../../components/common/AuthCard";
import AppButton from "../../components/common/AppButton";
import AppTextField from "../../components/common/AppTextField";
import PasswordField from "../../components/common/PasswordField";

import {
  registerSchema,
  type RegisterSchemaType,
} from "../../validation/register.validation";
import { useSignupMutation } from "../../services/authApi";
import { useAppDispatch } from "../../hooks/useLogin";
import { loginSuccess } from "../../store/auth/authSlice";

const AnimatedRocket = () => (
  <Box
    component={motion.span}
    animate={{ y: [0, -6, 0], x: [0, 2, 0], rotate: [0, 4, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    sx={{
      display: "inline-block",
      position: "relative",
      ml: 0.5,
    }}
  >
    🚀
  </Box>
);

// High-contrast clean input styling for light theme
const lightTextFieldSx = {
  "& .MuiInputLabel-root": {
    color: "#64748b",
    fontSize: "0.825rem",
    fontWeight: 500,
    "&.Mui-focused": { color: "#2563eb" },
  },
  "& .MuiOutlinedInput-root": {
    color: "#0f172a",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    fontSize: "0.9rem",
    "& fieldset": { borderColor: "#e2e8f0", borderWidth: "1px" },
    "&:hover fieldset": { borderColor: "#cbd5e1" },
    "&.Mui-focused": {
      backgroundColor: "#ffffff",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6",
      borderWidth: "1.5px",
    },
  },
  "& .MuiSvgIcon-root": { color: "#64748b" },
};

// Glowing pill button style matching Login
const glowButtonSx = {
  height: 50,
  width: "100%",
  borderRadius: "12px !important", // Match exact squircle corners (not full pill)
  fontWeight: 700,
  fontSize: "0.95rem",
  fontFamily: "'Inter', -apple-system, sans-serif",
  textTransform: "none",
  color: "#ffffff",
  letterSpacing: "0.3px",

  // Linear blue gradient matching the visual core
  background: "linear-gradient(180deg, #4da0ff 0%, #2b7fff 50%, #1e6bf0 100%)",

  // Multi-layered outline: Crisp glowing white inner border + bright cyan outer glow
  boxShadow: `
    0 0 0 1px #ffffff,
    0 0 0 2.5px #7dd3fc,
    0 0 18px 4px rgba(56, 189, 248, 0.65),
    0 0 35px 8px rgba(56, 189, 248, 0.35),
    0 8px 20px rgba(37, 99, 235, 0.3)
  `,

  transition: "all 0.25s ease-in-out",

  "&:hover": {
    background:
      "linear-gradient(180deg, #5fb0ff 0%, #3d8cff 50%, #2374ff 100%)",
    boxShadow: `
      0 0 0 1px #ffffff,
      0 0 0 3px #bae6fd,
      0 0 22px 6px rgba(56, 189, 248, 0.85),
      0 0 45px 12px rgba(56, 189, 248, 0.5),
      0 10px 25px rgba(37, 99, 235, 0.4)
    `,
    transform: "translateY(-1px)",
  },

  "&:active": {
    transform: "translateY(1px)",
    boxShadow: `
      0 0 0 1px #ffffff,
      0 0 0 2px #38bdf8,
      0 0 12px 2px rgba(56, 189, 248, 0.5),
      0 4px 12px rgba(37, 99, 235, 0.3)
    `,
  },
};

const RegisterPage = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const response = await signup({
        registrationType: "Candidate",
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }).unwrap();

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(loginSuccess(response.data));
      navigate("/candidate/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      sx={{ width: "100%", maxWidth: 460, px: 2, zIndex: 2, py: 2 }}
    >
      <AuthCard
        sx={{
          p: { xs: 3, sm: 3.5 },
          borderRadius: 7,
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(191, 219, 254, 0.6)",
          boxShadow:
            "0 20px 45px -10px rgba(37, 99, 235, 0.25), 0 10px 25px -15px rgba(59, 130, 246, 0.2)",
        }}
      >
        <Stack spacing={2.5}>
          {/* Header */}
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.75rem", sm: "1.95rem" },
                color: "#2563eb",
                letterSpacing: "-0.5px",
              }}
            >
              Create Account <AnimatedRocket />
            </Typography>
            <Typography
              sx={{
                color: "#64748b",
                mt: 0.25,
                fontSize: "0.825rem",
                fontWeight: 500,
              }}
            >
              Start building your professional resume
            </Typography>
          </Box>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={1.8}>
              <Grid container spacing={1.5}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppTextField<RegisterSchemaType>
                    name="firstName"
                    control={control}
                    label="First Name"
                    fullWidth
                    sx={lightTextFieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppTextField<RegisterSchemaType>
                    name="lastName"
                    control={control}
                    label="Last Name"
                    fullWidth
                    sx={lightTextFieldSx}
                  />
                </Grid>
              </Grid>

              <AppTextField<RegisterSchemaType>
                name="email"
                control={control}
                label="Email Address"
                fullWidth
                sx={lightTextFieldSx}
              />

              <PasswordField<RegisterSchemaType>
                name="password"
                control={control}
                label="Password"
                fullWidth
                sx={lightTextFieldSx}
              />

              <PasswordField<RegisterSchemaType>
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                fullWidth
                sx={lightTextFieldSx}
              />

              <AppButton
                type="submit"
                loading={isLoading}
                sx={{ ...glowButtonSx, mt: 1 }}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </AppButton>
            </Stack>
          </form>

          {/* Footer Link */}
          <Typography
            sx={{
              color: "#64748b",
              fontSize: "0.825rem",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              sx={{ color: "#2563eb", fontWeight: 700 }}
            >
              Login
            </Link>
          </Typography>
        </Stack>
      </AuthCard>
    </Box>
  );
};

export default RegisterPage;
