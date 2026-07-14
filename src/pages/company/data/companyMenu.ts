import {
  Dashboard,
  Analytics,
  Settings,
  Business,
  People,
  Work,
  Search,
  ViewKanban,
  Event,
  Email,
} from "@mui/icons-material";

export const companyMenu = [
  {
    label: "Dashboard",
    path: "/company/dashboard",
    icon: Dashboard,
  },
  {
    label: "Company Profile",
    path: "/company/profile",
    icon: Business,
  },
  {
    label: "Recruiters",
    path: "/company/users",
    icon: People,
  },
  {
    label: "Jobs",
    path: "/company/jobs",
    icon: Work,
  },
  {
    label: "Candidate Search",
    path: "/company/candidates",
    icon: Search,
  },
  {
    label: "Pipeline",
    path: "/company/pipeline",
    icon: ViewKanban,
  },
  {
    label: "Interviews",
    path: "/company/interviews",
    icon: Event,
  },
  {
    label: "Emails",
    path: "/company/emails",
    icon: Email,
  },
  {
    label: "Analytics",
    path: "/company/analytics",
    icon: Analytics,
  },
  {
    label: "Settings",
    path: "/company/settings",
    icon: Settings,
  },
];