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
import AppSnackbar from "../../../components/common/AppSnackbar";

const JobManagementPage = () => {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editJob, setEditJob] = useState<Partial<JobItem> | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [workMode, setWorkMode] = useState("All");

  // Snackbar states
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const title = job.jobTitle ?? "";
      const department = job.department ?? "";

      const matchSearch =
        title.toLowerCase().includes(search.toLowerCase()) ||
        department.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" || job.status === status;
      const matchWorkMode = workMode === "All" || job.workplaceType === workMode;

      return matchSearch && matchStatus && matchWorkMode;
    });
  }, [jobs, search, status, workMode]);

  const handleOpenCreate = () => {
    setEditJob(null);
    setDialogOpen(true);
  };

  const handleSaveJob = async (jobData: Partial<JobItem>) => {
    try {
      const job: JobItem = {
        ...jobData,
        _id: jobData._id ?? crypto.randomUUID(),
        jobTitle: jobData.jobTitle ?? "Untitled Job",
        department: jobData.department ?? "General",
        status: jobData.status ?? "Draft",
        workplaceType: jobData.workplaceType ?? "Onsite",
        applicationsCount: jobData.applicationsCount ?? 0,
        createdAt: jobData.createdAt ?? new Date().toISOString(),
      } as JobItem;

      setJobs((prev) => {
        const exists = prev.some((x) => x._id === job._id);

        if (exists) {
          return prev.map((x) => (x._id === job._id ? job : x));
        }

        return [job, ...prev];
      });

      // Set success message
      const action = jobData._id ? "updated" : "created";
      setSuccessMessage(`Job "${job.jobTitle}" ${action} successfully! 🎉`);

      // Close dialog
      setDialogOpen(false);
      setEditJob(null);

    } catch (error) {
      // Set error message
      setErrorMessage(error instanceof Error ? error.message : "Failed to save job. Please try again.");
    }
  };

  const handleToggleStatus = (job: JobItem) => {
    setJobs((prev) =>
      prev.map((x) =>
        x._id === job._id
          ? {
            ...x,
            status: x.status === "Active" ? "Closed" : "Active",
          }
          : x
      )
    );

    // Optional: Show status change message
    const newStatus = job.status === "Active" ? "Closed" : "Active";
    setSuccessMessage(`Job "${job.jobTitle}" ${newStatus === "Active" ? "activated" : "closed"} successfully!`);
  };

  const handleDelete = (id: string) => {
    const deletedJob = jobs.find(job => job._id === id);
    setJobs((prev) => prev.filter((x) => x._id !== id));

    if (deletedJob) {
      setSuccessMessage(`Job "${deletedJob.jobTitle}" deleted successfully!`);
    }
  };

  const handleCloseSnackbar = () => {
    setSuccessMessage("");
  };

  const handleCloseErrorSnackbar = () => {
    setErrorMessage("");
  };

  return (
    <>
      <Box>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{ mb: 3, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}
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
            <CompanyStatCard
              title="Total Jobs"
              subtitle="All openings"
              value={jobs.length}
              icon={<Work />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <CompanyStatCard
              title="Active Jobs"
              subtitle="Openings in progress"
              value={jobs.filter((x) => x.status === "Active").length}
              icon={<CheckCircle />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <CompanyStatCard
              title="Closed Jobs"
              subtitle="Inactive openings"
              value={jobs.filter((x) => x.status === "Closed").length}
              icon={<Cancel />}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
            <CompanyStatCard
              title="Applications"
              subtitle="Total candidates"
              value={jobs.reduce((sum, job) => sum + (job.applicationsCount ?? 0), 0)}
              icon={<Groups />}
            />
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
                <MenuItem value="Active">Active</MenuItem>
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
            <Grid key={job._id} size={{ xs: 12, md: 6, xl: 4 }}>
              <JobCard
                job={job}
                onView={(selected: any) => setSelectedJob(selected)}
                onEdit={(selected: any) => {
                  setEditJob(selected);
                  setDialogOpen(true);
                }}
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

      {/* AppSnackbar */}
      <AppSnackbar
        successMessage={successMessage}
        errorMessage={errorMessage}
        onCloseSuccess={handleCloseSnackbar}
        onCloseError={handleCloseErrorSnackbar}
      />
    </>
  );
};

export default JobManagementPage;