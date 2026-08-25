import { useRoutes, Navigate } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout"; // Single Layout component

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "../pages/auth/ResetPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";

import DashboardPage from "../pages/candidate/dashboard/DashboardPage";
import ProfilePage from "../pages/candidate/profile/ProfilePage";
import CandidateProfileView from "../pages/candidate/profile/CandidateProfileView";

import CompanyDashboard from "../pages/company/CompanyDashboard";
import CompanyProfilePage from "../pages/company/profile/CompanyProfilePage";
import CompanyUsersPage from "../pages/company/users/CompanyUsersPage";
import JobManagementPage from "../pages/company/jobs/JobManagementPage";
import CandidateSearchPage from "../pages/company/candidates/CandidateSearchPage";
import ResumeReviewPage from "../pages/company/review/ResumeReviewPage";
import CandidatePipelinePage from "../pages/company/pipeline/CandidatePipelinePage";
import EmailCommunicationPage from "../pages/company/emails/EmailCommunicationPage";
import CompanyAnalyticsPage from "../pages/company/analytics/CompanyAnalyticsPage";
import AIFeaturesPage from "../pages/company/ai/AIFeaturesPage";
import InterviewsPage from "../pages/company/interviews/InterviewsPage";
import CompanySettingsPage from "../pages/company/settings/CompanySettingsPage";
import RegisterTypePage from "../pages/auth/RegisterTypePage";
import CompanyRegisterPage from "../pages/auth/CompanyRegisterPage";

import ProtectedRoute from "./ProtectedRoute";
import RoleRoute from "./RoleRoute";

const MainRoutes = () => {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },

    // Auth Routes
    {
      element: <AuthLayout />,
      children: [
        { path: "login", element: <LoginPage /> },
        { path: "register", element: <RegisterTypePage /> },
        { path: "register/candidate", element: <RegisterPage /> },
        { path: "register/company", element: <CompanyRegisterPage /> },
        { path: "forgot-password", element: <ForgotPasswordPage /> },
        { path: "reset-password", element: <ResetPasswordPage /> },
        { path: "verify-otp", element: <VerifyOtpPage /> },
      ],
    },

    // Authenticated Routes
    {
      element: <ProtectedRoute />,
      children: [
        // Candidate Portal
        {
          element: <RoleRoute allowedRoles={["Candidate"]} />,
          children: [
            {
              path: "candidate",
              element: <MainLayout portal="candidate" />,
              children: [
                { index: true, element: <Navigate to="dashboard" replace /> },
                { path: "dashboard", element: <DashboardPage /> },
                { path: "profile", element: <ProfilePage /> },
                { path: "profile/view", element: <CandidateProfileView /> },
              ],
            },
          ],
        },

        // Company Portal
        {
          element: <RoleRoute allowedRoles={["Company"]} />,
          children: [
            {
              path: "company",
              element: <MainLayout portal="company" />,
              children: [
                { index: true, element: <Navigate to="dashboard" replace /> },
                { path: "dashboard", element: <CompanyDashboard /> },
                { path: "profile", element: <CompanyProfilePage /> },
                { path: "users", element: <CompanyUsersPage /> },
                { path: "jobs", element: <JobManagementPage /> },
                { path: "candidates", element: <CandidateSearchPage /> },
                { path: "review", element: <ResumeReviewPage /> },
                { path: "pipeline", element: <CandidatePipelinePage /> },
                { path: "interviews", element: <InterviewsPage /> },
                { path: "emails", element: <EmailCommunicationPage /> },
                { path: "analytics", element: <CompanyAnalyticsPage /> },
                { path: "ai-assistant", element: <AIFeaturesPage /> },
                { path: "settings", element: <CompanySettingsPage /> },
              ],
            },
          ],
        },

        // Admin Portal (Optional)
        {
          element: <RoleRoute allowedRoles={["Admin"]} />,
          children: [
            {
              path: "admin",
              element: <MainLayout portal="admin" />,
              children: [
                { index: true, element: <Navigate to="dashboard" replace /> },
                // { path: "dashboard", element: <AdminDashboardPage /> },
              ],
            },
          ],
        },
      ],
    },

    {
      path: "*",
      element: <Navigate to="/login" replace />,
    },
  ]);
};

export default MainRoutes;
