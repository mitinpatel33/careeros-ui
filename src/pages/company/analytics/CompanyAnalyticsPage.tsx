import {
  Box,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Funnel,
  FunnelChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const applicationData = [
  { job: "React", count: 80 },
  { job: "Node", count: 45 },
  { job: ".NET", count: 60 },
  { job: "DevOps", count: 25 },
];

const funnelData = [
  { name: "Applied", value: 320 },
  { name: "Reviewed", value: 180 },
  { name: "Shortlisted", value: 72 },
  { name: "Interview", value: 28 },
  { name: "Selected", value: 12 },
];

const CompanyAnalyticsPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Reports & Analytics 📊
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Track applications, hiring funnel and recruiter performance.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, borderRadius: 5, height: 360 }}>
            <Typography sx={{ fontWeight: 900, mb: 2 }}>
              Applications by Job
            </Typography>

            <ResponsiveContainer width="100%" height="85%">
              <BarChart data={applicationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="job" />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, borderRadius: 5, height: 360 }}>
            <Typography sx={{ fontWeight: 900, mb: 2 }}>
              Hiring Funnel
            </Typography>

            <ResponsiveContainer width="100%" height="85%">
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="value" data={funnelData} fill="#7c3aed" />
              </FunnelChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyAnalyticsPage;