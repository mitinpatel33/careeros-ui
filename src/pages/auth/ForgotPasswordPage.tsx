import {
  Stack,
  Typography,
  Link,
  Box,
} from "@mui/material";

import {
  Link as RouterLink,
  useNavigate,
} from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppButton from "../../components/common/AppButton";
import AppTextField from "../../components/common/AppTextField";

import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaType,
} from "../../validation/forgotPassword.validation";
import { motion } from "framer-motion";
import AuthCard from "../../components/common/AuthCard";

const ForgotPasswordPage = () => {
  const navigate =
    useNavigate();

  const {
    control,
    handleSubmit,
  } =
    useForm<ForgotPasswordSchemaType>({
      resolver:
        zodResolver(
          forgotPasswordSchema
        ),
    });

  const onSubmit = (
    data: ForgotPasswordSchemaType
  ) => {
    navigate("/verify-otp", {
      state: {
        email: data.email,
      },
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        background:
          "linear-gradient(135deg,#667eea,#764ba2)",
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
            background:
              "rgba(255,255,255,0.95)",
            backdropFilter:
              "blur(20px)",
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.15)",
          }}
        >
      <Stack spacing={4}>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          Forgot Password
        </Typography>

        <Typography
          sx={{
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Enter your email to
          receive OTP
        </Typography>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <Stack spacing={3}>
            <AppTextField
              name="email"
              control={control}
              label="Email Address"
              fullWidth
            />

            <AppButton
              type="submit"
            >
              Send OTP
            </AppButton>
          </Stack>
        </form>

        <Link
          component={RouterLink}
          to="/login"
          underline="hover"
          sx={{
            textAlign: "center",
          }}
        >
          Back to Login
        </Link>
      </Stack>
      </AuthCard>
      </motion.div>
    </Box>
  );
};

export default ForgotPasswordPage;