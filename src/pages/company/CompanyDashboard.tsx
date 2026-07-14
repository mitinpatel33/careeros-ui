import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";

import { Work, People, Visibility, Event, Add } from "@mui/icons-material";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import CompanyStatCard from "./components/CompanyStatCard";
import RecentCandidateCard from "./components/RecentCandidateCard";
import { useState } from "react";
import type { JobItem } from "../../types/company.types";
import CreateJobDialog from "./jobs/dialog/CreateJobDialog";

const chartData = [
  { month: "Jan", applications: 40 },
  { month: "Feb", applications: 70 },
  { month: "Mar", applications: 55 },
  { month: "Apr", applications: 90 },
  { month: "May", applications: 120 },
  { month: "Jun", applications: 150 },
];

const candidates = [
  {
    name: "Mitin Patel",
    role: "Full Stack Developer",
    location: "Surat",
    match: 94,
    skills: ["React", "Node", "SQL"],
  },
  {
    name: "Vidhi Jariwala",
    role: "React Developer",
    location: "Ahmedabad",
    match: 88,
    skills: ["React", "MUI", "TypeScript"],
  },
  {
    name: "Rahul Sharma",
    role: "DevOps Engineer",
    location: "Remote",
    match: 82,
    skills: ["AWS", "Docker", "CI/CD"],
  },
];

const CompanyDashboard = () => {
  const [openJobDialog, setOpenJobDialog] = useState(false);

  const handleCreateJob = (job: JobItem) => {
    console.log("Created Job:", job);
  };

  return (
    <>
      <Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          sx={{
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            spacing: 2,
            mb: 4,
          }}
        >
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              Welcome Back, HR 👋
            </Typography>

            <Typography color="text.secondary">
              Track jobs, candidates, interviews and hiring performance.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 800,
              px: 2.5,
              py: 1.2,
            }}
            onClick={() => setOpenJobDialog(true)}
          >
            Create Job
          </Button>
        </Stack>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <CompanyStatCard
              title="Open Jobs"
              subtitle="Active hiring"
              value={24}
              icon={<Work />}
              trend="+12%"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <CompanyStatCard
              title="Applications"
              subtitle="This month"
              value={320}
              icon={<People />}
              trend="+45"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <CompanyStatCard
              title="Shortlisted"
              subtitle="Ready for interview"
              value={52}
              icon={<Visibility />}
              trend="+8"
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <CompanyStatCard
              title="Hires"
              subtitle="Selected candidates"
              value={18}
              icon={<Event />}
              trend="+6"
            />
          </Grid>

          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 5,
                border: "1px solid #e5e7eb",
                height: 360,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
                Applications Overview
              </Typography>

              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="applications"
                    stroke="#4f46e5"
                    fill="#c7d2fe"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, lg: 4 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 5,
                border: "1px solid #e5e7eb",
                height: 360,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 3 }}>
                Hiring Funnel
              </Typography>

              {[
                ["Applied", 320],
                ["Reviewed", 180],
                ["Shortlisted", 72],
                ["Interview", 28],
                ["Selected", 12],
              ].map(([label, value]) => (
                <Stack
                  key={label}
                  direction="row"
                  sx={{
                    justifyContent: "space-between",
                    py: 1.4,
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <Typography sx={{ fontWeight: 700 }}>{label}</Typography>
                  <Typography sx={{ fontWeight: 900 }}>{value}</Typography>
                </Stack>
              ))}
            </Paper>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 5,
                border: "1px solid #e5e7eb",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
                Recent Matching Candidates
              </Typography>

              <Stack spacing={2}>
                {candidates.map((candidate) => (
                  <RecentCandidateCard
                    key={candidate.name}
                    candidate={candidate}
                  />
                ))}
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <CreateJobDialog
        open={openJobDialog}
        onClose={() => setOpenJobDialog(false)}
        onSave={handleCreateJob}
        editJob={null as JobItem | null}
      />
    </>
  );
};

export default CompanyDashboard;
