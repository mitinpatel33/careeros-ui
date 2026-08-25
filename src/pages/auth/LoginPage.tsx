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

// EXACT MATCH TO IMAGE 2 (image_415a7c.png)
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

const lightTextFieldSx = {
  "& .MuiInputLabel-root": {
    color: "#64748b",
    fontSize: "0.825rem",
    fontWeight: 500,
    "&.Mui-focused": { color: "#2563eb" },
  },
  "& .MuiOutlinedInput-root": {
    color: "#0f172a",
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    fontSize: "0.925rem",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.02)",
    "& fieldset": { borderColor: "#e2e8f0", borderWidth: "1px" },
    "&:hover fieldset": { borderColor: "#cbd5e1" },
    "&.Mui-focused fieldset": {
      borderColor: "#3b82f6",
      borderWidth: "1.5px",
    },
  },
  "& .MuiSvgIcon-root": { color: "#64748b" },
};

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
    animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
    sx={{ display: "inline-block", position: "relative", ml: 0.5 }}
  >
    🚀
  </Box>
);

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

  const isAnyLoading = isLoading || socialLoading;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      sx={{ width: "100%", maxWidth: 420, px: 2, zIndex: 2 }}
    >
      {/* Animated Floating Card */}
      <Box
        component={motion.div}
        // animate={{ y: [0, -8, 0] }}
        // transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <AuthCard
          sx={{
            p: { xs: 3.5, sm: 4.5 },
            borderRadius: 8,
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.9)",
            boxShadow: `
              0 20px 50px -10px rgba(37, 99, 235, 0.2),
              0 10px 30px -15px rgba(56, 189, 248, 0.25)
            `,
          }}
        >
          <Stack spacing={2.5}>
            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: "1.85rem", sm: "2.1rem" },
                  color: "#2563eb",
                  letterSpacing: "-0.5px",
                }}
              >
                Career OS <AnimatedRocket />
              </Typography>
              <Typography
                sx={{
                  color: "#64748b",
                  mt: 0.5,
                  fontSize: "0.85rem",
                  fontWeight: 500,
                }}
              >
                Create Professional & Animated Resumes
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <AppTextField<LoginSchemaType>
                  name="email"
                  autoComplete="new-email"
                  control={control}
                  label="Email Address"
                  fullWidth
                  sx={lightTextFieldSx}
                />

                <PasswordField<LoginSchemaType>
                  name="password"
                  control={control}
                  label="Password"
                  fullWidth
                  sx={lightTextFieldSx}
                  autoComplete="new-password"
                />

                <Box sx={{ textAlign: "right", pt: 0.5 }}>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      color: "#3b82f6",
                      fontSize: "0.825rem",
                      fontWeight: 600,
                      "&:hover": { textDecoration: "underline" },
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Box>

                <AppButton type="submit" loading={isLoading} sx={glowButtonSx}>
                  {isLoading ? "Logging in..." : "Login"}
                </AppButton>
              </Stack>
            </form>

            <Box sx={{ display: "flex", alignItems: "center", my: 0.5 }}>
              <Divider sx={{ flex: 1, borderColor: "#e2e8f0" }} />
              <Typography
                sx={{
                  mx: 2,
                  fontSize: "0.7rem",
                  color: "#94a3b8",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                OR CONTINUE WITH
              </Typography>
              <Divider sx={{ flex: 1, borderColor: "#e2e8f0" }} />
            </Box>

            <Stack
              direction="row"
              spacing={2}
              sx={{ justifyContent: "center" }}
            >
              <ActionIconButton
                title="Google"
                onClick={() => googleLogin()}
                disabled={isAnyLoading}
                icon={GoogleIcon}
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  bgcolor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  "&:hover": { bgcolor: "#f8fafc", borderColor: "#cbd5e1" },
                }}
              />
              <ActionIconButton
                title="Facebook"
                onClick={() => {}}
                disabled={isAnyLoading}
                icon={Facebook}
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: "50%",
                  bgcolor: "#1877F2",
                  color: "#ffffff",
                  boxShadow: "0 4px 12px rgba(24, 119, 242, 0.3)",
                  "&:hover": { bgcolor: "#166FE5" },
                }}
              />
            </Stack>

            <Typography
              sx={{
                color: "#64748b",
                fontSize: "0.85rem",
                textAlign: "center",
                fontWeight: 500,
              }}
            >
              Don't have an account?{" "}
              <Box
                component="span"
                onClick={() => navigate("/register")}
                sx={{
                  color: "#2563eb",
                  fontWeight: 700,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign Up
              </Box>
            </Typography>
          </Stack>
        </AuthCard>
      </Box>
    </Box>
  );
};

export default LoginPage;
