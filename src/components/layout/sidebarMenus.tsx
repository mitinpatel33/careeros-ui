import {
  Dashboard,
  Person,
  Description,
  Palette,
  Analytics,
  Settings,
  Business,
  People,
  Work,
  Search,
  ViewKanban,
  Event,
  Email,
  Payments,
  Subscriptions,
  Security,
  Article,
  AutoAwesome,
} from "@mui/icons-material";

export type PortalType = "candidate" | "company" | "admin";

export const sidebarMenus = {
  candidate: [
    {
      label: "Dashboard",
      path: "/candidate/dashboard",
      icon: <Dashboard />,
    },
    {
      label: "Profile",
      path: "/candidate/profile",
      icon: <Person />,
    },
  ],

  company: [
    {
      label: "Dashboard",
      path: "/company/dashboard",
      icon: <Dashboard />,
    },
    {
      label: "Company Profile",
      path: "/company/profile",
      icon: <Business />,
    },
    {
      label: "Recruiters",
      path: "/company/users",
      icon: <People />,
    },
    {
      label: "Jobs",
      path: "/company/jobs",
      icon: <Work />,
    },
    {
      label: "Candidate Search",
      path: "/company/candidates",
      icon: <Search />,
    },
    {
      label: "Pipeline",
      path: "/company/pipeline",
      icon: <ViewKanban />,
    },
    {
      label: "Interviews",
      path: "/company/interviews",
      icon: <Event />,
    },
    {
      label: "Emails",
      path: "/company/emails",
      icon: <Email />,
    },
    {
      label: "Analytics",
      icon: <Analytics />,
    },
    {
      label: "AI Assistant",
      path: "/company/ai-assistant",
      icon: <AutoAwesome />,
    },
    {
      label: "Settings",
      path: "/company/settings",
      icon: <Settings />,
    },
  ],

  admin: [
    {
      label: "Dashboard",
      path: "/admin/dashboard",
      icon: <Dashboard />,
    },
    {
      label: "Users",
      path: "/admin/users",
      icon: <People />,
    },
    {
      label: "Companies",
      path: "/admin/companies",
      icon: <Business />,
    },
    {
      label: "Themes",
      path: "/admin/themes",
      icon: <Palette />,
    },
    {
      label: "Subscriptions",
      path: "/admin/subscriptions",
      icon: <Subscriptions />,
    },
    {
      label: "Payments",
      path: "/admin/payments",
      icon: <Payments />,
    },
    {
      label: "Content",
      path: "/admin/content",
      icon: <Article />,
    },
    {
      label: "Audit Logs",
      path: "/admin/audit-logs",
      icon: <Security />,
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: <Settings />,
    },
  ],
};
