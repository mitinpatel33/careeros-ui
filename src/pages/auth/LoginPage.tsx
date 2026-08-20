import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  SvgIcon,
  type SvgIconProps,
} from "@mui/material";
import { Facebook } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

import AuthCard from "../../components/common/AuthCard";
import AppButton from "../../components/common/AppButton";
import AppTextField from "../../components/common/AppTextField";
import PasswordField from "../../components/common/PasswordField";
import ActionIconButton from "../../components/common/ActionIconButton";

import {
  loginSchema,
  type LoginSchemaType,
} from "../../validation/auth.validation";
import { loginSuccess } from "../../store/auth/authSlice";
import { useLoginMutation } from "../../services/authApi";
import { useAppDispatch } from "../../hooks/useLogin";
import { appToast } from "../../common/toast/appToast";

const GoogleIcon = ((props: SvgIconProps) => (
  <SvgIcon {...props} viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </SvgIcon>
)) as typeof SvgIcon;

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

// Shared input field styling for clean dark mode typography
const darkTextFieldSx = {
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: "0.9rem",
    "&.Mui-focused": { color: "#93c5fd" },
  },
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "rgba(255, 255, 255, 0.2)", // Brighter translucent white input background
    borderRadius: "12px",
    fontSize: "0.95rem",
    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.4)" },
    "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.7)" },
    "&.Mui-focused fieldset": { borderColor: "#60a5fa", borderWidth: "2px" },
  },
  "& .MuiSvgIcon-root": { color: "#fff" },
};

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [socialLoading, setSocialLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleLoginSuccess = (userData: any, message: string) => {
    localStorage.setItem("token", userData.token ?? userData);
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(loginSuccess(userData));

    if (userData.role === "Candidate") navigate("/candidate");
    else if (userData.role === "Company") navigate("/company");
    else navigate("/admin");

    appToast.success(message);
  };

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await login({
        ...data,
        token: "",
        provider: "email",
      }).unwrap();
      handleLoginSuccess(response.data, response.message);
    } catch (error: any) {
      appToast.error(error.data?.message || "Login failed");
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setSocialLoading(true);
      try {
        const response = await login({
          token: tokenResponse.access_token,
          provider: "google",
          email: "",
          password: "",
        }).unwrap();
        handleLoginSuccess(response.data, response.message);
      } catch (error: any) {
        appToast.error(error.data?.message || "Google login failed");
      } finally {
        setSocialLoading(false);
      }
    },
    onError: () => appToast.error("Google login failed"),
  });

  const handleFacebookLogin = async () => {
    setSocialLoading(true);
    try {
      const response = await login({
        token: "MOCK_FACEBOOK_TOKEN",
        provider: "facebook",
      } as any).unwrap();
      handleLoginSuccess(response.data, response.message);
    } catch (error: any) {
      appToast.error(error.data?.message || "Facebook login failed");
    } finally {
      setSocialLoading(false);
    }
  };

  const isAnyLoading = isLoading || socialLoading;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{ width: "100%", maxWidth: 440, px: 2, zIndex: 2 }}
    >
      <AuthCard
        sx={{
          p: { xs: 3, sm: 4 },
          borderRadius: 6,
          // Stronger white tint (30% opacity white)
          background: "rgba(255, 255, 255, 0.3)",
          backdropFilter: "blur(25px)",
          border: "1px solid rgba(255, 255, 255, 0.45)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
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
              Career OS <AnimatedRocket />
            </Typography>
            <Typography
              sx={{
                color: "rgba(255, 255, 255, 0.65)",
                mt: 0.5,
                fontSize: "0.875rem",
              }}
            >
              Create Professional & Animated Resumes
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2.5}>
              <AppTextField<LoginSchemaType>
                name="email"
                control={control}
                label="Email Address"
                fullWidth
                sx={darkTextFieldSx}
              />

              <PasswordField<LoginSchemaType>
                name="password"
                control={control}
                label="Password"
                fullWidth
                sx={darkTextFieldSx}
              />

              <Box sx={{ textAlign: "right" }}>
                <Typography
                  sx={{
                    cursor: "pointer",
                    color: "#60a5fa",
                    fontSize: "0.85rem",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Forgot Password?
                </Typography>
              </Box>

              <AppButton
                type="submit"
                loading={isLoading}
                sx={{
                  py: 1.3,
                  borderRadius: 3,
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  bgcolor: "#3b82f6",
                  "&:hover": { bgcolor: "#2563eb" },
                }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </AppButton>
            </Stack>
          </form>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Divider
              sx={{ flex: 1, borderColor: "rgba(255, 255, 255, 0.15)" }}
            />
            <Typography
              sx={{
                mx: 2,
                fontSize: "0.75rem",
                color: "rgba(255,255,255,0.5)",
                fontWeight: 700,
                letterSpacing: "0.5px",
              }}
            >
              OR CONTINUE WITH
            </Typography>
            <Divider
              sx={{ flex: 1, borderColor: "rgba(255, 255, 255, 0.15)" }}
            />
          </Box>

          <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }}>
            <ActionIconButton
              title="Google"
              onClick={() => googleLogin()}
              disabled={isAnyLoading}
              icon={GoogleIcon}
              sx={{
                bgcolor: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.2)",
                "&:hover": { bgcolor: "rgba(255,255,255,0.18)" },
              }}
            />
            <ActionIconButton
              title="Facebook"
              onClick={handleFacebookLogin}
              disabled={isAnyLoading}
              icon={Facebook}
              sx={{
                bgcolor: "#1877F2",
                color: "#fff",
                "&:hover": { bgcolor: "#166FE5" },
              }}
            />
          </Stack>

          <Typography
            sx={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: "0.875rem",
              textAlign: "center",
            }}
          >
            Don't have an account?{" "}
            <Box
              component="span"
              onClick={() => navigate("/register")}
              sx={{
                color: "#60a5fa",
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Sign Up
            </Box>
          </Typography>
        </Stack>
      </AuthCard>
    </Box>
  );
};

export default LoginPage;
