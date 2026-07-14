import {
  Box,
  Button,
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
  CalendarMonth,
  CheckCircle,
  HourglassTop,
  RateReview,
} from "@mui/icons-material";

import { useMemo, useState } from "react";

import CompanyStatCard from "../components/CompanyStatCard";
import InterviewCard from "./InterviewCard";
import ScheduleInterviewDialog from "./ScheduleInterviewDialog";
import FeedbackDialog from "./FeedbackDialog";
import InterviewDetailsDrawer from "./InterviewDetailsDrawer";

import type {
  InterviewItem,
  InterviewStatus,
  InterviewType,
} from "../../../types/interview.types";

const initialInterviews: InterviewItem[] = [
  {
    id: "1",
    candidateName: "Mitin Patel",
    candidateRole: "Full Stack Developer",
    candidateEmail: "mitin@example.com",
    interviewerName: "Amit HR",
    interviewerEmail: "amit@company.com",
    interviewDate: "20 Jun 2026",
    interviewTime: "11:00 AM",
    interviewType: "Technical",
    meetingLink: "https://meet.google.com/demo",
    status: "Scheduled",
    notes: "Technical interview for React and Node.js.",
  },
  {
    id: "2",
    candidateName: "Vidhi Jariwala",
    candidateRole: "React Developer",
    candidateEmail: "vidhi@example.com",
    interviewerName: "Neha Recruiter",
    interviewerEmail: "neha@company.com",
    interviewDate: "21 Jun 2026",
    interviewTime: "02:00 PM",
    interviewType: "HR",
    meetingLink: "https://zoom.us/demo",
    status: "Pending Feedback",
    notes: "Check communication and salary expectation.",
  },
];

const InterviewsPage = () => {
  const [interviews, setInterviews] =
    useState<InterviewItem[]>(initialInterviews);

  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [feedbackInterview, setFeedbackInterview] =
    useState<InterviewItem | null>(null);
  const [selectedInterview, setSelectedInterview] =
    useState<InterviewItem | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<InterviewStatus | "All">("All");
  const [type, setType] = useState<InterviewType | "All">("All");
  const [message, setMessage] = useState("");

  const filteredInterviews = useMemo(() => {
    return interviews.filter((interview) => {
      const query = search.toLowerCase();

      const matchSearch =
        interview.candidateName.toLowerCase().includes(query) ||
        interview.candidateRole.toLowerCase().includes(query) ||
        interview.interviewerName.toLowerCase().includes(query);

      const matchStatus = status === "All" || interview.status === status;
      const matchType = type === "All" || interview.interviewType === type;

      return matchSearch && matchStatus && matchType;
    });
  }, [interviews, search, status, type]);

  const handleSchedule = (interview: InterviewItem) => {
    setInterviews((prev) => [interview, ...prev]);
    setMessage("Interview scheduled successfully.");
  };

  const handleFeedback = (
    id: string,
    rating: number,
    feedback: string
  ) => {
    setInterviews((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              rating,
              feedback,
              status: "Completed",
            }
          : item
      )
    );

    setSelectedInterview((prev) =>
      prev?.id === id
        ? {
            ...prev,
            rating,
            feedback,
            status: "Completed",
          }
        : prev
    );

    setMessage("Feedback saved successfully.");
  };

  const handleCancel = (id: string) => {
    setInterviews((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, status: "Cancelled" }
          : item
      )
    );

    setMessage("Interview cancelled.");
  };

  const stats = [
    {
      title: "Total Interviews",
      subtitle: "All scheduled",
      value: interviews.length,
      icon: <CalendarMonth />,
      trend: "+2",
    },
    {
      title: "Scheduled",
      subtitle: "Upcoming",
      value: interviews.filter((x) => x.status === "Scheduled").length,
      icon: <CheckCircle />,
      trend: "+1",
    },
    {
      title: "Pending Feedback",
      subtitle: "Needs review",
      value: interviews.filter((x) => x.status === "Pending Feedback").length,
      icon: <HourglassTop />,
      trend: "+1",
    },
    {
      title: "Completed",
      subtitle: "Feedback done",
      value: interviews.filter((x) => x.status === "Completed").length,
      icon: <RateReview />,
      trend: "+0",
    },
  ];

  return (
    <Box>
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
              fontSize: { xs: 28, md: 36 },
            }}
          >
            Interviews 🗓️
          </Typography>

          <Typography color="text.secondary">
            Schedule interviews and collect candidate feedback.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setScheduleOpen(true)}
          sx={{
            borderRadius: 3,
            px: 2.5,
            py: 1.2,
            textTransform: "none",
            fontWeight: 800,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          Schedule Interview
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
          p: 2.5,
          mb: 3,
          borderRadius: 5,
          border: "1px solid #e5e7eb",
          bgcolor: "rgba(255,255,255,.9)",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Search candidate, role or interviewer"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as InterviewStatus | "All")
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Scheduled">Scheduled</MenuItem>
              <MenuItem value="Pending Feedback">Pending Feedback</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <TextField
              select
              fullWidth
              label="Interview Type"
              value={type}
              onChange={(e) =>
                setType(e.target.value as InterviewType | "All")
              }
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
              <MenuItem value="Technical">Technical</MenuItem>
              <MenuItem value="Final">Final</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredInterviews.map((interview) => (
          <Grid key={interview.id} size={{ xs: 12, md: 6, xl: 4 }}>
            <InterviewCard
              interview={interview}
              onView={setSelectedInterview}
              onFeedback={setFeedbackInterview}
              onCancel={handleCancel}
            />
          </Grid>
        ))}
      </Grid>

      <ScheduleInterviewDialog
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        onSchedule={handleSchedule}
      />

      <FeedbackDialog
        open={Boolean(feedbackInterview)}
        interview={feedbackInterview}
        onClose={() => setFeedbackInterview(null)}
        onSave={handleFeedback}
      />

      <InterviewDetailsDrawer
        open={Boolean(selectedInterview)}
        interview={selectedInterview}
        onClose={() => setSelectedInterview(null)}
        onFeedback={(interview) => {
          setSelectedInterview(null);
          setFeedbackInterview(interview);
        }}
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
  );
};

export default InterviewsPage;