import {
  Box,
  Button,
  Chip,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  CheckCircle,
  FilterAltOff,
  Groups,
  PersonSearch,
  Schedule,
} from "@mui/icons-material";

import { useMemo, useState } from "react";

import CompanyStatCard from "../components/CompanyStatCard";
import PipelineColumn from "./PipelineColumn";
import MoveCandidateDialog from "./MoveCandidateDialog";
import CandidatePipelineDrawer from "./CandidatePipelineDrawer";

import type {
  PipelineCandidate,
  PipelineStage,
} from "../../../types/pipeline.types";
import AddCandidateDialog from "./dialog/AddCandidateDialog";

const pipelineStages: PipelineStage[] = [
  "Applied",
  "Reviewed",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

const jobOptions = [
  { id: "job-1", title: "Senior Full Stack Developer" },
  { id: "job-2", title: "Senior React Developer" },
  { id: "job-3", title: "Node.js Backend Developer" },
  { id: "job-4", title: "Senior .NET Developer" },
];

const initialCandidates: PipelineCandidate[] = [
  {
    id: "1",
    name: "Mitin Patel",
    email: "mitin@example.com",
    phone: "+91 9876543210",
    role: "Full Stack Developer",
    jobId: "job-1",
    jobTitle: "Senior Full Stack Developer",
    location: "Surat",
    experience: "3 Years",
    matchScore: 94,
    atsScore: 96,
    appliedDate: "20 Jun 2026",
    currentStage: "Applied",
    skills: ["React", "Node.js", ".NET Core", "SQL Server"],
    summary:
      "Full Stack Developer with React, Node.js, .NET Core and SQL experience.",
    notes: [],
  },
  {
    id: "2",
    name: "Rahul Shah",
    email: "rahul@example.com",
    phone: "+91 9876543211",
    role: "React Developer",
    jobId: "job-2",
    jobTitle: "Senior React Developer",
    location: "Ahmedabad",
    experience: "2 Years",
    matchScore: 87,
    atsScore: 89,
    appliedDate: "19 Jun 2026",
    currentStage: "Applied",
    skills: ["React", "TypeScript", "Redux", "MUI"],
    summary: "React developer with strong frontend experience.",
    notes: [],
  },
  {
    id: "3",
    name: "Vidhi Jariwala",
    email: "vidhi@example.com",
    phone: "+91 9876543212",
    role: "React Developer",
    jobId: "job-2",
    jobTitle: "Senior React Developer",
    location: "Ahmedabad",
    experience: "2.5 Years",
    matchScore: 91,
    atsScore: 93,
    appliedDate: "18 Jun 2026",
    currentStage: "Reviewed",
    skills: ["React", "MUI", "TypeScript"],
    summary: "Frontend developer focused on React and responsive UI.",
    notes: ["Strong UI implementation skills."],
  },
  {
    id: "4",
    name: "Neha Patel",
    email: "neha@example.com",
    phone: "+91 9876543213",
    role: "Node.js Developer",
    jobId: "job-3",
    jobTitle: "Node.js Backend Developer",
    location: "Surat",
    experience: "4 Years",
    matchScore: 89,
    atsScore: 91,
    appliedDate: "17 Jun 2026",
    currentStage: "Shortlisted",
    skills: ["Node.js", "Express", "MongoDB", "Redis"],
    summary: "Backend developer with Node.js and MongoDB experience.",
    notes: [],
  },
  {
    id: "5",
    name: "Amit Sharma",
    email: "amit@example.com",
    phone: "+91 9876543214",
    role: ".NET Developer",
    jobId: "job-4",
    jobTitle: "Senior .NET Developer",
    location: "Pune",
    experience: "5 Years",
    matchScore: 92,
    atsScore: 94,
    appliedDate: "16 Jun 2026",
    currentStage: "Interview",
    skills: [".NET Core", "C#", "SQL Server", "Azure"],
    summary: "Experienced .NET developer with API and SQL Server skills.",
    notes: ["Technical round scheduled."],
  },
  {
    id: "6",
    name: "Riya Mehta",
    email: "riya@example.com",
    phone: "+91 9876543215",
    role: "UI/UX Designer",
    jobId: "job-1",
    jobTitle: "Senior Full Stack Developer",
    location: "Remote",
    experience: "4 Years",
    matchScore: 90,
    atsScore: 88,
    appliedDate: "15 Jun 2026",
    currentStage: "Selected",
    skills: ["Figma", "UI Design", "UX Research"],
    summary: "Product designer with strong UI/UX skills.",
    notes: ["Offer approved."],
  },
];

const CandidatePipelinePage = () => {
  const [addOpen, setAddOpen] = useState(false);

  const [candidates, setCandidates] =
    useState<PipelineCandidate[]>(initialCandidates);

  const [selectedCandidate, setSelectedCandidate] =
    useState<PipelineCandidate | null>(null);

  const [movingCandidate, setMovingCandidate] =
    useState<PipelineCandidate | null>(null);

  const [search, setSearch] = useState("");
  const [jobFilter, setJobFilter] = useState("All");
  const [stageFilter, setStageFilter] = useState<PipelineStage | "All">("All");

  const [message, setMessage] = useState("");

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const query = search.trim().toLowerCase();

      const matchSearch =
        !query ||
        candidate.name.toLowerCase().includes(query) ||
        candidate.role.toLowerCase().includes(query) ||
        candidate.skills.join(" ").toLowerCase().includes(query);

      const matchJob = jobFilter === "All" || candidate.jobId === jobFilter;

      const matchStage =
        stageFilter === "All" || candidate.currentStage === stageFilter;

      return matchSearch && matchJob && matchStage;
    });
  }, [candidates, search, jobFilter, stageFilter]);

  const handleAddCandidate = (candidate: PipelineCandidate) => {
    setCandidates((prev) => [candidate, ...prev]);
    setMessage("Candidate added successfully.");
  };

  const getCandidatesByStage = (stage: PipelineStage) =>
    filteredCandidates.filter((candidate) => candidate.currentStage === stage);

  const updateStage = (candidateId: string, newStage: PipelineStage) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, currentStage: newStage }
          : candidate,
      ),
    );

    setSelectedCandidate((prev) =>
      prev?.id === candidateId ? { ...prev, currentStage: newStage } : prev,
    );

    setMessage(`Candidate moved to ${newStage}.`);
  };

  const moveToNextStage = (candidate: PipelineCandidate) => {
    const currentIndex = pipelineStages.indexOf(candidate.currentStage);

    if (
      currentIndex === -1 ||
      candidate.currentStage === "Selected" ||
      candidate.currentStage === "Rejected"
    ) {
      return;
    }

    const nextStage = pipelineStages[currentIndex + 1];

    if (nextStage) {
      updateStage(candidate.id, nextStage);
    }
  };

  const rejectCandidate = (candidate: PipelineCandidate) => {
    updateStage(candidate.id, "Rejected");
  };

  const scheduleInterview = (candidate: PipelineCandidate) => {
    updateStage(candidate.id, "Interview");
  };

  const saveNote = (candidateId: string, note: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? { ...candidate, notes: [...candidate.notes, note] }
          : candidate,
      ),
    );

    setSelectedCandidate((prev) =>
      prev?.id === candidateId
        ? { ...prev, notes: [...prev.notes, note] }
        : prev,
    );

    setMessage("Note saved.");
  };

  const clearFilters = () => {
    setSearch("");
    setJobFilter("All");
    setStageFilter("All");
  };

  const stats = [
    {
      title: "New Applications",
      subtitle: "Awaiting review",
      value: candidates.filter((x) => x.currentStage === "Applied").length,
      icon: <PersonSearch />,
      trend: "+2",
    },
    {
      title: "Shortlisted",
      subtitle: "Ready for interview",
      value: candidates.filter((x) => x.currentStage === "Shortlisted").length,
      icon: <Groups />,
      trend: "+1",
    },
    {
      title: "Interviews",
      subtitle: "Currently scheduled",
      value: candidates.filter((x) => x.currentStage === "Interview").length,
      icon: <Schedule />,
      trend: "+1",
    },
    {
      title: "Selected",
      subtitle: "Successful candidates",
      value: candidates.filter((x) => x.currentStage === "Selected").length,
      icon: <CheckCircle />,
      trend: "+1",
    },
  ];

  return (
    <>
      <Box sx={{ width: "100%", overflowX: "hidden" }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2}
          sx={{
            mb: 3,
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                fontSize: { xs: 26, sm: 30, md: 34 },
              }}
            >
              Candidate Pipeline 🧩
            </Typography>

            <Typography color="text.secondary">
              Track and manage candidates throughout the hiring process.
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => setAddOpen(true)}
            sx={{
              borderRadius: 3,
              px: 2.5,
              py: 1.2,
              textTransform: "none",
              fontWeight: 800,
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Add Candidate
          </Button>
        </Stack>

        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {stats.map((item) => (
            <Grid key={item.title} size={{ xs: 12, sm: 6, lg: 3 }}>
              <CompanyStatCard
                title={item.title}
                subtitle={item.subtitle}
                value={item.value}
                icon={item.icon}
                trend={item.trend}
              />
            </Grid>
          ))}
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 2.5 },
            mb: 3,
            borderRadius: 5,
            border: "1px solid #e5e7eb",
            bgcolor: "rgba(255,255,255,.9)",
          }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 5 }}>
              <TextField
                fullWidth
                label="Search candidate, role or skill"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <TextField
                select
                fullWidth
                label="Job"
                value={jobFilter}
                onChange={(e) => setJobFilter(e.target.value)}
              >
                <MenuItem value="All">All Jobs</MenuItem>
                {jobOptions.map((job) => (
                  <MenuItem key={job.id} value={job.id}>
                    {job.title}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                select
                fullWidth
                label="Stage"
                value={stageFilter}
                onChange={(e) =>
                  setStageFilter(e.target.value as PipelineStage | "All")
                }
              >
                <MenuItem value="All">All Stages</MenuItem>
                {pipelineStages.map((stage) => (
                  <MenuItem key={stage} value={stage}>
                    {stage}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 2 }}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<FilterAltOff />}
                onClick={clearFilters}
                sx={{
                  minHeight: 56,
                  borderRadius: 3,
                }}
              >
                Clear
              </Button>
            </Grid>
          </Grid>

          <Stack
            direction="row"
            spacing={1}
            sx={{ mt: 2, alignItems: "center" }}
          >
            <Typography sx={{ fontSize: 13 }} color="text.secondary">
              Showing
            </Typography>

            <Chip
              size="small"
              color="primary"
              label={filteredCandidates.length}
              sx={{ fontWeight: 800 }}
            />

            <Typography sx={{ fontSize: 13 }} color="text.secondary">
              candidates
            </Typography>
          </Stack>
        </Paper>

        {/* RESPONSIVE PIPELINE GRID */}
        <Grid container spacing={2.5}>
          {pipelineStages.map((stage) => (
            <Grid
              key={stage}
              size={{
                xs: 12,
                sm: 6,
                lg: 4,
                xl: 2,
              }}
            >
              <PipelineColumn
                stage={stage}
                candidates={getCandidatesByStage(stage)}
                onView={setSelectedCandidate}
                onMove={setMovingCandidate}
                onMoveNext={moveToNextStage}
                onScheduleInterview={scheduleInterview}
                onReject={rejectCandidate}
              />
            </Grid>
          ))}
        </Grid>

        <CandidatePipelineDrawer
          open={Boolean(selectedCandidate)}
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
          onMove={setMovingCandidate}
          onMoveNext={moveToNextStage}
          onScheduleInterview={scheduleInterview}
          onSaveNote={saveNote}
        />

        <MoveCandidateDialog
          open={Boolean(movingCandidate)}
          candidate={movingCandidate}
          onClose={() => setMovingCandidate(null)}
          onMove={updateStage}
        />

        <Snackbar
          open={Boolean(message)}
          autoHideDuration={2500}
          message={message}
          onClose={() => setMessage("")}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        />
      </Box>
      <AddCandidateDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={handleAddCandidate}
      />
    </>
  );
};

export default CandidatePipelinePage;
