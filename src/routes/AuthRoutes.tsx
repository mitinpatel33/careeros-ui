import { Route, Navigate } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import { ROUTES } from "../constants/routePaths";
import RegisterTypePage from "../pages/auth/RegisterTypePage";
import AuthLayout from "../layouts/AuthLayout";

const AuthRoutes = (
  <Route element={<AuthLayout />}>
    <Route index element={<Navigate to={ROUTES.AUTH.LOGIN} replace />} />
    <Route path="login" element={<LoginPage />} />
    <Route path="register" element={<RegisterTypePage />} />
    <Route path="register/candidateregister" element={<RegisterPage />} />
    <Route path="register/companyregister" element={<RegisterPage />} />
    <Route path="forgot-password" element={<ForgotPasswordPage />} />
    <Route path="reset-password" element={<ResetPasswordPage />} />
    <Route path="verify-otp" element={<VerifyOtpPage />} />
  </Route>
);

export default AuthRoutes;
