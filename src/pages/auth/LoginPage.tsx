import { Box, Typography, Stack, Divider, Button } from "@mui/material";
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

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const response = await login(data).unwrap();

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));

      dispatch(loginSuccess(response.data));

      if (response.data.role === "Candidate") {
        navigate("/candidate");
      } else if (response.data.role === "Company") {
        navigate("/company");
      } else {
        navigate("/admin");
      }
    } catch (error) {
      console.log(error);
    }
  };

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

            <Stack spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                }}
              >
                Continue with Google
              </Button>

              <Button
                fullWidth
                variant="contained"
                startIcon={<Facebook />}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  bgcolor: "#1877F2",
                  "&:hover": {
                    bgcolor: "#166FE5",
                  },
                }}
              >
                Continue with Facebook
              </Button>
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
