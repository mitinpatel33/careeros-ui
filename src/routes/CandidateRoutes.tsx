import { Route, Navigate } from "react-router-dom";

import DashboardPage from "../pages/candidate/dashboard/DashboardPage";
// import ProfilePage from "../pages/candidate/profile/ProfilePage";
import ResumeBuilderPage from "../pages/candidate/resume-builder/ResumeBuilderPage";
import CandidateLayout from "../layouts/CandidateLayout";
import CandidateProfileView from "../pages/candidate/profile/CandidateProfileView";

const CandidateRoutes = (
  <Route path="/candidate" element={<CandidateLayout />}>
    <Route index element={<Navigate to="dashboard" replace />} />

    <Route path="dashboard" element={<DashboardPage />} />
    {/* <Route path="profile" element={<ProfilePage />} /> */}
    <Route path="resume-builder" element={<ResumeBuilderPage />} />
    <Route path="profile" element={<CandidateProfileView />} />
  </Route>
);

export default CandidateRoutes;