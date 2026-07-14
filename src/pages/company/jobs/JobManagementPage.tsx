import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  Work,
  CheckCircle,
  Cancel,
  Groups,
} from "@mui/icons-material";

import CompanyStatCard from "../components/CompanyStatCard";
import JobDetailsDrawer from "./JobDetailsDrawer";
import type { JobItem } from "../../../types/company.types";
import JobCard from "./card/JobCard";
import CreateJobDialog from "./dialog/CreateJobDialog";

const initialJobs: JobItem[] = [
  {
    id: "1",
    title: "Senior React Developer",
    department: "Engineering",
    employmentType: "Full Time",
    experience: "3 - 5 Years",
    location: "Ahmedabad",
    workMode: "Hybrid",
    salaryMin: "1000000",
    salaryMax: "1800000",
    positions: "4",
    skills: ["React", "TypeScript", "MUI", "Redux"],
    description: "Build scalable web applications using React and TypeScript.",
    responsibilities: "Develop UI, integrate APIs, optimize performance.",
    requirements: "Strong React, TypeScript and frontend architecture knowledge.",
    benefits: "Flexible work, health insurance, learning budget.",
    status: "Open",
    applications: 54,
    createdAt: "20 Jun 2026",
  },
];

const JobManagementPage = () => {
  const [jobs, setJobs] = useState<JobItem[]>(initialJobs);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editJob, setEditJob] = useState<JobItem | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [workMode, setWorkMode] = useState("All");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchSearch =
        job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.department.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" || job.status === status;
      const matchWorkMode = workMode === "All" || job.workMode === workMode;

      return matchSearch && matchStatus && matchWorkMode;
    });
  }, [jobs, search, status, workMode]);

  const handleOpenCreate = () => {
    setEditJob(null);
    setDialogOpen(true);
  };

  const handleSaveJob = (job: JobItem) => {
    setJobs((prev) => {
      const exists = prev.some((x) => x.id === job.id);

      if (exists) {
        return prev.map((x) => (x.id === job.id ? job : x));
      }

      return [job, ...prev];
    });
  };

  const handleDuplicate = (job: JobItem) => {
    const duplicated: JobItem = {
      ...job,
      id: crypto.randomUUID(),
      title: `${job.title} Copy`,
      applications: 0,
      createdAt: new Date().toLocaleDateString(),
    };

    setJobs((prev) => [duplicated, ...prev]);
  };

  const handleToggleStatus = (job: JobItem) => {
    setJobs((prev) =>
      prev.map((x) =>
        x.id === job.id
          ? { ...x, status: x.status === "Open" ? "Closed" : "Open" }
          : x
      )
    );
  };

  const handleDelete = (id: string) => {
    setJobs((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        
        
        spacing={2}
        sx={{ mb: 3, justifyContent: "space-between", alignItems:{ xs: "flex-start", md: "center" } }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Job Management 💼
          </Typography>

          <Typography color="text.secondary">
            Create, publish and manage company job openings.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpenCreate}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 800,
            px: 2.5,
            py: 1.2,
          }}
        >
          Create Job
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard title="Total Jobs" subtitle="All openings" value={jobs.length} icon={<Work />} trend="+2" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard title="Open Jobs" subtitle="Active openings" value={jobs.filter((x) => x.status === "Open").length} icon={<CheckCircle />} trend="+1" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard title="Closed Jobs" subtitle="Inactive openings" value={jobs.filter((x) => x.status === "Closed").length} icon={<Cancel />} trend="0" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard title="Applications" subtitle="Total candidates" value={jobs.reduce((sum, job) => sum + job.applications, 0)} icon={<Groups />} trend="+54" />
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 5,
          border: "1px solid #e5e7eb",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Search job title or department"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="Closed">Closed</MenuItem>
              <MenuItem value="Draft">Draft</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              select
              fullWidth
              label="Work Mode"
              value={workMode}
              onChange={(e) => setWorkMode(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Onsite">Onsite</MenuItem>
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="Hybrid">Hybrid</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredJobs.map((job) => (
          <Grid key={job.id} size={{ xs: 12, md: 6, xl: 4 }}>
            <JobCard
              job={job}
              onView={(selected: any) => setSelectedJob(selected)}
              onEdit={(selected: any) => {
                setEditJob(selected);
                setDialogOpen(true);
              }}
              onDuplicate={handleDuplicate}
              onToggleStatus={handleToggleStatus}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <CreateJobDialog
        open={dialogOpen}
        editJob={editJob}
        onClose={() => {
          setDialogOpen(false);
          setEditJob(null);
        }}
        onSave={handleSaveJob}
      />

      <JobDetailsDrawer
        open={!!selectedJob}
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onEdit={(job) => {
          setSelectedJob(null);
          setEditJob(job);
          setDialogOpen(true);
        }}
      />
    </Box>
  );
};

export default JobManagementPage;