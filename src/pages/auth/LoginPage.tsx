import { Box, Typography, Stack, Divider, Button, type SvgIconProps, SvgIcon } from "@mui/material";
import { Google, Facebook } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import AuthCard from "../../components/common/AuthCard";
import AppButton from "../../components/common/AppButton";
import AppTextField from "../../components/common/AppTextField";
import PasswordField from "../../components/common/PasswordField";

import {
  loginSchema,
  type LoginSchemaType,
} from "../../validation/auth.validation";
import { loginSuccess } from "../../store/auth/authSlice";
import { useLoginMutation } from "../../services/authApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useLogin";
import { appToast } from "../../common/toast/appToast";
import { useState } from "react";
import ActionIconButton from "../../components/common/ActionIconButton";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleIcon = (props: SvgIconProps) => (
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
);

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const [socialLoading, setSocialLoading] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSuccess = (userData: any, message: string) => {
    localStorage.setItem("token", userData.token ?? userData); // adjust based on your response shape
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch(loginSuccess(userData));

    if (userData.role === "Candidate") {
      navigate("/candidate");
    } else if (userData.role === "Company") {
      navigate("/company");
    } else {
      navigate("/admin");
    }

    appToast.success(message);
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await login(data).unwrap();
      handleLoginSuccess(response.data, response.message);
    } catch (error: any) {
      console.log("error", error);
      appToast.error(error.data?.message || "Login failed");
    }
  };

  // ---------- Google Login ----------
  const googleLogin = useGoogleLogin({
  onSuccess: async (tokenResponse) => {
    setSocialLoading(true);
    try {
      // tokenResponse.access_token is the OAuth access token
      const response = await login({
        token: tokenResponse.access_token,
        provider: "google",
        email: "",
        password: ""
      }).unwrap();

      handleLoginSuccess(response.data, response.message);
    } catch (error: any) {
      appToast.error(error.data?.message || "Google login failed");
    } finally {
      setSocialLoading(false);
    }
  },
  onError: () => {
    appToast.error("Google login failed");
  },
});

// Then your button's onClick just calls this function
const handleGoogleLogin = () => googleLogin();

  // ---------- Facebook Login ----------
  const handleFacebookLogin = async () => {
    setSocialLoading(true);
    try {
      // 1. Get Facebook access token (e.g., using FB.login() or react-facebook-login)
      // const fbResponse = await new Promise((resolve) => FB.login(resolve));
      // const token = fbResponse.authResponse.accessToken;

      // 2. Send token to backend
      const response = await login({
        token: "MOCK_FACEBOOK_TOKEN", // replace with real token
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
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
        overflow: "hidden",
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        style={{
          width: "100%",
          maxWidth: "450px",
        }}
      >
        <AuthCard
          sx={{
            width: "100%",
            p: {
              xs: 3,
              sm: 4,
            },
            borderRadius: 4,
            background: "rgba(255,255,255,0.95)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
          <Stack
            spacing={{
              xs: 3,
              sm: 4,
            }}
          >
            {/* Header */}

            <Box
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: "2rem",
                    sm: "2.5rem",
                  },
                }}
              >
                Resume Maker
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  fontSize: {
                    xs: "0.9rem",
                    sm: "1rem",
                  },
                }}
              >
                Create Professional & Animated Resumes
              </Typography>
            </Box>

            {/* Form */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <AppTextField<LoginSchemaType>
                  name="email"
                  control={control}
                  label="Email Address"
                  fullWidth
                />

                <PasswordField<LoginSchemaType>
                  name="password"
                  control={control}
                  label="Password"
                  fullWidth
                />

                <Box
                  sx={{
                    textAlign: "right",
                  }}
                >
                  <Typography
                    sx={{
                      cursor: "pointer",
                      color: "primary.main",
                      fontSize: "0.9rem",
                    }}
                  >
                    Forgot Password?
                  </Typography>
                </Box>

                <AppButton type="submit" loading={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </AppButton>
              </Stack>
            </form>

            {/* Divider */}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Divider
                sx={{
                  flex: 1,
                }}
              />

              <Typography
                sx={{
                  mx: 2,
                  fontSize: "0.85rem",
                  whiteSpace: "nowrap",
                }}
                color="text.secondary"
              >
                OR CONTINUE WITH
              </Typography>

              <Divider
                sx={{
                  flex: 1,
                }}
              />
            </Box>
            {/* Social Login */}
            <Stack
              direction="row"
              sx={{ justifyContent: "center" }}
              spacing={2}
            >
              <ActionIconButton
                title={"Google"}
                onClick={handleGoogleLogin}
                disabled={isAnyLoading}
                icon={GoogleIcon}
                aria-label="Continue with Google"
                sx={{
                  // border: 1,
                  // borderColor: "grey.300",
                  // bgcolor: "white",
                  // "&:hover": { bgcolor: "grey.100" },
                }}
              />
              <ActionIconButton
                title={"Facebook"}
                onClick={handleFacebookLogin}
                disabled={isAnyLoading}
                icon={Facebook}
                aria-label="Continue with Facebook"
                sx={{
                  bgcolor: "#1877F2",
                  color: "white",
                  "&:hover": { bgcolor: "#166FE5" }
                }}
              />
            </Stack>

            {/* Footer */}

            <Typography
              color="text.secondary"
              sx={{
                fontSize: {
                  xs: "0.9rem",
                  sm: "1rem",
                },
                textAlign: "center",
              }}
            >
              Don't have an account?{" "}
              <Box
                component="span"
                sx={{
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/register")}
              >
                Sign Up
              </Box>
            </Typography>
          </Stack>
        </AuthCard>
      </motion.div>
    </Box>
  );
};

export default LoginPage;
