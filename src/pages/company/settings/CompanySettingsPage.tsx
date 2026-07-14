import { Box, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

import CompanyPreferencesTab from "./CompanyPreferencesTab";
import NotificationSettingsTab from "./NotificationSettingsTab";
import SecuritySettingsTab from "./SecuritySettingsTab";
import BillingSettingsTab from "./BillingSettingsTab";
import AccountSettingsTab from "./AccountSettingsTab";

const CompanySettingsPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          fontSize: { xs: 28, md: 36 },
        }}
      >
        Settings ⚙️
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Manage company preferences, notifications, billing and security.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 5,
          border: "1px solid #e5e7eb",
          overflow: "hidden",
        }}
      >
        <Tabs
          value={tab}
          onChange={(_, value) => setTab(value)}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            px: 2,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <Tab label="Company" />
          <Tab label="Notifications" />
          <Tab label="Security" />
          <Tab label="Billing" />
          <Tab label="Account" />
        </Tabs>

        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {tab === 0 && <CompanyPreferencesTab />}
          {tab === 1 && <NotificationSettingsTab />}
          {tab === 2 && <SecuritySettingsTab />}
          {tab === 3 && <BillingSettingsTab />}
          {tab === 4 && <AccountSettingsTab />}
        </Box>
      </Paper>
    </Box>
  );
};

export default CompanySettingsPage;