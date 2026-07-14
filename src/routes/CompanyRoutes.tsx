import { Route, Navigate } from "react-router-dom";


import CompanyDashboard from "../pages/company/CompanyDashboard";
import CompanyProfilePage from "../pages/company/profile/CompanyProfilePage";
import CompanyUsersPage from "../pages/company/users/CompanyUsersPage";
import JobManagementPage from "../pages/company/jobs/JobManagementPage";
import CandidateSearchPage from "../pages/company/candidates/CandidateSearchPage";
import ResumeReviewPage from "../pages/company/review/ResumeReviewPage";
import CandidatePipelinePage from "../pages/company/pipeline/CandidatePipelinePage";
import InterviewManagementPage from "../pages/company/interviews/InterviewsPage";
import EmailCommunicationPage from "../pages/company/emails/EmailCommunicationPage";
import CompanyAnalyticsPage from "../pages/company/analytics/CompanyAnalyticsPage";
import AIFeaturesPage from "../pages/company/ai/AIFeaturesPage";
import CompanyLayout from "../layouts/CompanyLayout";
import CompanySettingsPage from "../pages/company/settings/CompanySettingsPage";

const CompanyRoutes = (
  <Route path="/company" element={<CompanyLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />

    <Route path="dashboard" element={<CompanyDashboard />} />
    <Route path="profile" element={<CompanyProfilePage />} />
    <Route path="users" element={<CompanyUsersPage />} />
    <Route path="jobs" element={<JobManagementPage />} />
    <Route path="candidates" element={<CandidateSearchPage />} />
    <Route path="review" element={<ResumeReviewPage />} />
    <Route path="pipeline" element={<CandidatePipelinePage />} />
    <Route path="interviews" element={<InterviewManagementPage />} />
    <Route path="emails" element={<EmailCommunicationPage />} />
    <Route path="analytics" element={<CompanyAnalyticsPage />} />
    <Route path="ai-assistant" element={<AIFeaturesPage />} />
    <Route path="settings" element={<CompanySettingsPage />} />
  </Route>
);

export default CompanyRoutes;