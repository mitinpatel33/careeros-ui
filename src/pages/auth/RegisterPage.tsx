import React, { useState } from "react";
import { Box, Typography, Grid, Link, IconButton, Stack } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z } from "zod";

import AuthCard from "../../components/common/AuthCard";
import AppButton from "../../components/common/AppButton";
import AppTextField from "../../components/common/AppTextField";
import PasswordField from "../../components/common/PasswordField";
import { useSignupMutation } from "../../services/authApi";
import { useAppDispatch } from "../../hooks/useLogin";
import { loginSuccess } from "../../store/auth/authSlice";
import RegisterTypePage from "./RegisterTypePage";

const baseRegisterSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

const candidateSchema = baseRegisterSchema.extend({
  role: z.literal("Candidate"),
});

const companySchema = baseRegisterSchema.extend({
  role: z.literal("Company"),
  companyName: z.string().trim().min(1, "Company name is required"),
  website: z.string().trim().min(1, "Website URL is required"),
});

const unifiedRegisterSchema = z
  .discriminatedUnion("role", [candidateSchema, companySchema])
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type UnifiedRegisterSchemaType = z.infer<typeof unifiedRegisterSchema>;
type RoleType = "Candidate" | "Company";

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
    "&.Mui-focused": { backgroundColor: "#ffffff" },
    "&.Mui-focused fieldset": { borderColor: "#3b82f6", borderWidth: "1.5px" },
  },
  "& .MuiSvgIcon-root": { color: "#64748b" },
};

const RegisterPage = () => {
  const [selectedRole, setSelectedRole] = useState<RoleType | null>(null);
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit, setValue, clearErrors, reset } =
    useForm<UnifiedRegisterSchemaType>({
      resolver: zodResolver(unifiedRegisterSchema),
      defaultValues: {
        role: "Candidate",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    });

  const handleRoleSelect = (role: RoleType) => {
    setSelectedRole(role);
    clearErrors();
    if (role === "Company") {
      setValue("role", "Company");
      setValue("companyName", "");
      setValue("website", "");
    } else {
      setValue("role", "Candidate");
    }
  };

  const handleBackToSelection = () => {
    setSelectedRole(null);
    reset();
  };

  const onSubmit = async (data: UnifiedRegisterSchemaType) => {
    try {
      const payload =
        data.role === "Company"
          ? {
              registrationType: "Company" as const,
              companyName: data.companyName,
              website: data.website,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              password: data.password,
            }
          : {
              registrationType: "Candidate" as const,
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              password: data.password,
            };

      const response = await signup(payload).unwrap();

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(loginSuccess(response.data));

      navigate(
        data.role === "Company" ? "/company/dashboard" : "/candidate/dashboard",
      );
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const isCompany = selectedRole === "Company";

  return (
    <Box sx={{ overflow: "hidden", display: "grid", placeItems: "center" }}>
      <AnimatePresence mode="wait">
        {!selectedRole ? (
          <RegisterTypePage
            key="selection-view"
            onSelectRole={handleRoleSelect}
          />
        ) : (
          <Box
            key="form-view"
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            sx={{
              width: "100%",
              maxWidth: 520,
              px: 2,
              py: 2,
              zIndex: 2,
              mx: "auto",
            }}
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
                <Box sx={{ position: "relative", textAlign: "center" }}>
                  <IconButton
                    onClick={handleBackToSelection}
                    sx={{
                      position: "absolute",
                      left: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#64748b",
                      "&:hover": { color: "#2563eb", bgcolor: "#f1f5f9" },
                    }}
                  >
                    <ArrowBack />
                  </IconButton>

                  <Typography
                    sx={{
                      fontWeight: 800,
                      fontSize: { xs: "1.5rem", sm: "1.75rem" },
                      color: isCompany ? "#7c3aed" : "#2563eb",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {isCompany ? "Company Sign Up" : "Candidate Sign Up"}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#64748b",
                      mt: 0.25,
                      fontSize: "0.825rem",
                      fontWeight: 500,
                    }}
                  >
                    {isCompany
                      ? "Create company account and start hiring"
                      : "Start building your professional resume"}
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <Stack spacing={1.8}>
                    {isCompany && (
                      <>
                        <AppTextField<UnifiedRegisterSchemaType>
                          name="companyName"
                          control={control}
                          label="Company Name"
                          fullWidth
                          sx={lightTextFieldSx}
                        />
                        <AppTextField<UnifiedRegisterSchemaType>
                          name="website"
                          control={control}
                          label="Company Website"
                          fullWidth
                          sx={lightTextFieldSx}
                        />
                      </>
                    )}

                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <AppTextField<UnifiedRegisterSchemaType>
                          name="firstName"
                          control={control}
                          label={isCompany ? "Admin First Name" : "First Name"}
                          fullWidth
                          sx={lightTextFieldSx}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <AppTextField<UnifiedRegisterSchemaType>
                          name="lastName"
                          control={control}
                          label={isCompany ? "Admin Last Name" : "Last Name"}
                          fullWidth
                          sx={lightTextFieldSx}
                        />
                      </Grid>
                    </Grid>

                    <AppTextField<UnifiedRegisterSchemaType>
                      name="email"
                      control={control}
                      label={isCompany ? "Company Email" : "Email Address"}
                      fullWidth
                      sx={lightTextFieldSx}
                    />

                    <PasswordField<UnifiedRegisterSchemaType>
                      name="password"
                      control={control}
                      label="Password"
                      fullWidth
                      sx={lightTextFieldSx}
                    />

                    <PasswordField<UnifiedRegisterSchemaType>
                      name="confirmPassword"
                      control={control}
                      label="Confirm Password"
                      fullWidth
                      sx={lightTextFieldSx}
                    />

                    <AppButton
                      type="submit"
                      loading={isLoading}
                      sx={{
                        height: 50,
                        width: "100%",
                        borderRadius: "12px !important",
                        fontWeight: 700,
                        fontSize: "0.95rem",
                        textTransform: "none",
                        color: "#ffffff",
                        mt: 1,
                        background: isCompany
                          ? "linear-gradient(180deg, #a855f7 0%, #7c3aed 100%)"
                          : "linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)",
                        boxShadow: isCompany
                          ? "0 0 18px 4px rgba(168, 85, 247, 0.4)"
                          : "0 0 18px 4px rgba(56, 189, 248, 0.45)",
                        "&:hover": {
                          background: isCompany
                            ? "linear-gradient(180deg, #b86eff 0%, #8b46ff 100%)"
                            : "linear-gradient(180deg, #4da0ff 0%, #2b7fff 100%)",
                        },
                      }}
                    >
                      {isLoading
                        ? isCompany
                          ? "Creating Company..."
                          : "Creating Account..."
                        : isCompany
                          ? "Create Company Account"
                          : "Create Account"}
                    </AppButton>
                  </Stack>
                </form>

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
        )}
      </AnimatePresence>
    </Box>
  );
};

export default RegisterPage;
