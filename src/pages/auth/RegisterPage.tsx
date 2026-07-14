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
      sx={{
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: {
          xs: 2,
          sm: 3,
        },
        py: 4,
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
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
          maxWidth: "550px",
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

            <Box sx={{ textAlign: "center" }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: "2rem",
                    sm: "2.5rem",
                  },
                }}
              >
                Create Account
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
                Start building your professional resume
              </Typography>
            </Box>

            {/* Form */}

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <Grid container spacing={2}>
                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <AppTextField<RegisterSchemaType>
                      name="firstName"
                      control={control}
                      label="First Name"
                      fullWidth
                    />
                  </Grid>

                  <Grid
                    size={{
                      xs: 12,
                      sm: 6,
                    }}
                  >
                    <AppTextField<RegisterSchemaType>
                      name="lastName"
                      control={control}
                      label="Last Name"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <AppTextField<RegisterSchemaType>
                  name="email"
                  control={control}
                  label="Email Address"
                  fullWidth
                />

                <PasswordField<RegisterSchemaType>
                  name="password"
                  control={control}
                  label="Password"
                  fullWidth
                />

                <PasswordField<RegisterSchemaType>
                  name="confirmPassword"
                  control={control}
                  label="Confirm Password"
                  fullWidth
                />

                <AppButton type="submit" loading={isLoading}>
                  Create Account
                </AppButton>
              </Stack>
            </form>

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
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                underline="hover"
                sx={{
                  fontWeight: 600,
                }}
              >
                Login
              </Link>
            </Typography>
          </Stack>
        </AuthCard>
      </motion.div>
    </Box>
  );
};

export default RegisterPage;
