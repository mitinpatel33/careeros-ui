import {
  Box,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import AuthCard from "../../components/common/AuthCard";
import AppButton from "../../components/common/AppButton";
import AppTextField from "../../components/common/AppTextField";
import PasswordField from "../../components/common/PasswordField";
import { useSignupMutation } from "../../services/authApi";
import { loginSuccess } from "../../store/auth/authSlice";
import { useAppDispatch } from "../../hooks/useLogin";
import { companyRegisterSchema, type CompanyRegisterSchemaType } from "../../validation/register.validation";

const CompanyRegisterPage = () => {
  const [signup, { isLoading }] = useSignupMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { control, handleSubmit } = useForm<CompanyRegisterSchemaType>({
    resolver: zodResolver(companyRegisterSchema),
    defaultValues: {
      companyName: "",
      website: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: CompanyRegisterSchemaType) => {
    try {
      const response = await signup({
        registrationType: "Company",
        companyName: data.companyName,
        website: data.website,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      }).unwrap();

      localStorage.setItem("token", response.data.token);
      dispatch(loginSuccess(response.data));
      navigate("/company/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#667eea,#764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        px: 2,
        py: 4,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: "100%", maxWidth: 650 }}
      >
        <AuthCard sx={{ p: { xs: 3, sm: 4 }, borderRadius: 4 }}>
          <Stack spacing={3}>
            <Box sx={{ textAlign: "center" }}>
              <Typography sx={{ fontWeight: 900, fontSize: 34 }}>
                Company Registration 🏢
              </Typography>
              <Typography color="text.secondary">
                Create company account and start hiring.
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3}>
                <AppTextField<CompanyRegisterSchemaType>
                  name="companyName"
                  control={control}
                  label="Company Name"
                  fullWidth
                />

                <AppTextField<CompanyRegisterSchemaType>
                  name="website"
                  control={control}
                  label="Website"
                  fullWidth
                />

                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <AppTextField<CompanyRegisterSchemaType>
                      name="firstName"
                      control={control}
                      label="Admin First Name"
                      fullWidth
                    />
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <AppTextField<CompanyRegisterSchemaType>
                      name="lastName"
                      control={control}
                      label="Admin Last Name"
                      fullWidth
                    />
                  </Grid>
                </Grid>

                <AppTextField<CompanyRegisterSchemaType>
                  name="email"
                  control={control}
                  label="Company Email"
                  fullWidth
                />

                <PasswordField<CompanyRegisterSchemaType>
                  name="password"
                  control={control}
                  label="Password"
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "#EAF2FF", // Same background everywhere
                      borderRadius: 3,
                    },
                  }}
                />

                <PasswordField<CompanyRegisterSchemaType>
                  name="confirmPassword"
                  control={control}
                  label="Confirm Password"
                  fullWidth
                />

                <AppButton
                  type="submit"
                  loading={isLoading}
                //   startIcon={
                //     isLoading ? (
                //       <CircularProgress size={18} color="inherit" />
                //     ) : undefined
                //   }
                >
                  {isLoading ? "Creating Company..." : "Create Company Account"}
                </AppButton>
              </Stack>
            </form>

            <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
              Already have an account?{" "}
              <Link component={RouterLink} to="/login" sx={{ fontWeight: 800 }}>
                Login
              </Link>
            </Typography>
          </Stack>
        </AuthCard>
      </motion.div>
    </Box>
  );
};

export default CompanyRegisterPage;