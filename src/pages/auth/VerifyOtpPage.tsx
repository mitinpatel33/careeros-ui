import {
  Box,
  Stack,
  Typography,
} from "@mui/material";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import AppButton from "../../components/common/AppButton";
import AppTextField from "../../components/common/AppTextField";

import { motion } from "framer-motion";

import {
  otpSchema,
  type OtpSchemaType,
} from "../../validation/otp.validation";
import AuthCard from "../../components/common/AuthCard";

const VerifyOtpPage = () => {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const email =
    location.state?.email;

  const {
    control,
    handleSubmit,
  } = useForm<OtpSchemaType>({
    resolver:
      zodResolver(
        otpSchema
      ),
  });

  const onSubmit = (
    data: OtpSchemaType
  ) => {
    navigate(
      "/reset-password",
      {
        state: {
          email,
          otp: data.otp,
        },
      }
    );
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
          sx={{ textAlign: "center", fontWeight: 700 }}
        >
          Verify OTP
        </Typography>

        <Typography
          sx={{ textAlign: "center" }}
          color="text.secondary"
        >
          OTP sent to
          <br />
          <strong>
            {email}
          </strong>
        </Typography>

        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
        >
          <Stack spacing={3}>
            <AppTextField
              name="otp"
              control={control}
              label="Enter OTP"
              fullWidth
            />

            <AppButton
              type="submit"
            >
              Verify OTP
            </AppButton>
          </Stack>
        </form>
      </Stack>
      </AuthCard>
      </motion.div>
    </Box>
  );
};

export default VerifyOtpPage;