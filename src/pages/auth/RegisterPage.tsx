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
    animate={{ y: [0, -8, 0], x: [0, 3, 0], rotate: [0, 5, 0] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    sx={{
      display: "inline-block",
      position: "relative",
      filter: "drop-shadow(0 0 10px rgba(249, 115, 22, 0.6))",
      ml: 1,
    }}
  >
    🚀
  </Box>
);

const darkTextFieldSx = {
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "0.9rem",
    "&.Mui-focused": { color: "#60a5fa" },
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderRadius: "12px",
    fontSize: "0.95rem",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.18)" },
    "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.35)" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6", borderWidth: "2px" },
  },
  "& .MuiSvgIcon-root": { color: "rgba(255, 255, 255, 0.7)" },
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
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ width: "100%", maxWidth: 520, px: 2, zIndex: 2, py: 3 }}
    >
      <AuthCard
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 6,
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          color: "#fff",
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.75rem", sm: "2rem" },
                color: "#fff",
                letterSpacing: "-0.5px",
              }}
            >
              Create Account <AnimatedRocket />
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.65)",
                mt: 0.5,
                fontSize: "0.875rem",
              }}
            >
              Start building your professional resume
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppTextField<RegisterSchemaType>
                    name="firstName"
                    control={control}
                    label="First Name"
                    fullWidth
                    sx={darkTextFieldSx}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppTextField<RegisterSchemaType>
                    name="lastName"
                    control={control}
                    label="Last Name"
                    fullWidth
                    sx={darkTextFieldSx}
                  />
                </Grid>
              </Grid>

              <AppTextField<RegisterSchemaType>
                name="email"
                control={control}
                label="Email Address"
                fullWidth
                sx={darkTextFieldSx}
              />

              <PasswordField<RegisterSchemaType>
                name="password"
                control={control}
                label="Password"
                fullWidth
                sx={darkTextFieldSx}
              />

              <PasswordField<RegisterSchemaType>
                name="confirmPassword"
                control={control}
                label="Confirm Password"
                fullWidth
                sx={darkTextFieldSx}
              />

              <AppButton
                type="submit"
                loading={isLoading}
                sx={{
                  mt: 1,
                  py: 1.3,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  bgcolor: "#3b82f6",
                  "&:hover": { bgcolor: "#2563eb" },
                }}
              >
                Create Account
              </AppButton>
            </Stack>
          </form>

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.875rem",
              textAlign: "center",
            }}
          >
            Already have an account?{" "}
            <Link
              component={RouterLink}
              to="/login"
              underline="hover"
              sx={{ color: "#60a5fa", fontWeight: 700 }}
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
