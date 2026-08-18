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
  Search,
  People,
  Star,
  Bookmark,
  CheckCircle,
} from "@mui/icons-material";

import CompanyStatCard from "../components/CompanyStatCard";
import CandidateCard from "./CandidateCard";
import CandidateDetailsDrawer from "./CandidateDetailsDrawer";

export type PipelineStage = "Applied" | "Screening" | "Interview" | "Shortlisted" | "Hired" | "Rejected";

export type PipelineCandidate = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  jobId?: string;
  jobTitle?: string;
  location: string;
  experience: string;
  match: number;
  matchScore?: number;
  atsScore: number;
  appliedDate?: string;
  currentStage?: PipelineStage;
  skills: string[];
  matchedSkills?: string[];
  missingSkills?: string[];
  summary: string;
  notes?: string[];
  avatarUrl?: string;
  expectedSalary?: string;
  availability?: string;
  education?: string;
  status: string;
  saved: boolean;
};

const initialCandidates: PipelineCandidate[] = [
  {
    id: "1",
    name: "Mitin Patel",
    role: "Full Stack Developer",
    location: "Surat",
    experience: "3 Years",
    match: 94,
    atsScore: 96,
    email: "mitin@example.com",
    phone: "+91 9876543210",
    skills: ["React", "Node", "SQL", ".NET Core", "MongoDB"],
    matchedSkills: ["React", "Node", "SQL"],
    missingSkills: ["AWS", "Docker"],
    summary:
      "Full stack developer with experience in React, Node.js, .NET Core, SQL Server and MongoDB.",
    education: "B.Tech Computer Engineering",
    status: "Available",
    saved: false,
  },
  {
    id: "2",
    name: "Vidhi Jariwala",
    role: "React Developer",
    location: "Ahmedabad",
    experience: "2 Years",
    expectedSalary: "₹6 LPA",
    availability: "15 Days",
    match: 88,
    atsScore: 90,
    email: "vidhi@example.com",
    phone: "+91 9876543211",
    skills: ["React", "MUI", "TypeScript", "Redux"],
    matchedSkills: ["React", "MUI", "TypeScript"],
    missingSkills: ["Node.js"],
    summary:
      "Frontend developer focused on React, Material UI, TypeScript and modern UI development.",
    education: "BCA",
    status: "Available",
    saved: true,
  },
];

const CandidateSearchPage = () => {
  const [candidates, setCandidates] =
    useState<PipelineCandidate[]>(initialCandidates);

  const [selectedCandidate, setSelectedCandidate] =
    useState<PipelineCandidate | null>(null);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("All");
  const [match, setMatch] = useState("All");

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const query = search.toLowerCase();

      const matchSearch =
        candidate.name.toLowerCase().includes(query) ||
        candidate.role.toLowerCase().includes(query) ||
        candidate.skills.join(" ").toLowerCase().includes(query);

      const matchLocation =
        !location ||
        candidate.location.toLowerCase().includes(location.toLowerCase());

      const matchExperience =
        experience === "All" ||
        candidate.experience.includes(experience);

      const matchScore =
        match === "All" ||
        candidate?.match >= Number(match);

      return (
        matchSearch &&
        matchLocation &&
        matchExperience &&
        matchScore
      );
    });
  }, [candidates, search, location, experience, match]);

  const handleShortlist = (id: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? { ...candidate, status: "Shortlisted" }
          : candidate
      )
    );
  };

  const handleSave = (id: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === id
          ? { ...candidate, saved: !candidate.saved }
          : candidate
      )
    );
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 3, justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" } }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Candidate Search 🔍
          </Typography>

          <Typography color="text.secondary">
            Search resume database using skills, location and experience filters.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Search />}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 800,
            px: 2.5,
            py: 1.2,
          }}
        >
          AI Match Candidates
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{xs: 12, sm: 6, lg: 3}}>
          <CompanyStatCard
            title="Total Candidates"
            subtitle="Resume database"
            value={candidates.length}
            icon={<People />}
            trend="+12"
          />
        </Grid>

        <Grid size={{xs: 12, sm: 6, lg: 3}}>
          <CompanyStatCard
            title="Top Match"
            subtitle="Best candidate"
            value={`${Math.max(...candidates.map((x) => x.match))}%`}
            icon={<Star />}
            trend="+4%"
          />
        </Grid>

        <Grid size={{xs: 12, sm: 6, lg: 3}}>
          <CompanyStatCard
            title="Saved"
            subtitle="Saved profiles"
            value={candidates.filter((x) => x.saved).length}
            icon={<Bookmark />}
            trend="+1"
          />
        </Grid>

        <Grid size={{xs: 12, sm: 6, lg: 3}}>
          <CompanyStatCard
            title="Shortlisted"
            subtitle="Ready for review"
            value={candidates.filter((x) => x.status === "Shortlisted").length}
            icon={<CheckCircle />}
            trend="+2"
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
          <Grid size={{xs: 12, md: 4}}>
            <TextField
              fullWidth
              label="Search skills, role or name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid size={{xs: 12, md: 3}}>
            <TextField
              fullWidth
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Grid>

          <Grid size={{xs: 12, md: 2}}>
            <TextField
              select
              fullWidth
              label="Experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="1">1+ Years</MenuItem>
              <MenuItem value="2">2+ Years</MenuItem>
              <MenuItem value="3">3+ Years</MenuItem>
              <MenuItem value="5">5+ Years</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{xs: 12, md: 2}}>
            <TextField
              select
              fullWidth
              label="Match"
              value={match}
              onChange={(e) => setMatch(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="70">70%+</MenuItem>
              <MenuItem value="80">80%+</MenuItem>
              <MenuItem value="90">90%+</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{xs: 12, md: 1}}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                height: "100%",
                borderRadius: 3,
                minHeight: 56,
              }}
            >
              <Search />
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredCandidates.map((candidate) => (
          <Grid key={candidate.id} size={{xs: 12, md: 6, xl: 4}}>
            <CandidateCard
              candidate={candidate}
              onView={(selected) => setSelectedCandidate(selected)}
              onShortlist={handleShortlist}
              onSave={handleSave}
            />
          </Grid>
        ))}
      </Grid>

      <CandidateDetailsDrawer
        open={!!selectedCandidate}
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
        onShortlist={handleShortlist}
      />
    </Box>
  );
};

export default CandidateSearchPage;