import React, { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Avatar,
  LinearProgress,
  Button,
  Divider,
  Container,
  useTheme,
  useMediaQuery,
  alpha,
  Tabs,
  Tab,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";

import {
  Description,
  Visibility,
  Download,
  TrendingUp,
  Add,
  FileUpload,
  PictureAsPdf,
  CheckCircle,
  Warning,
  AutoFixHigh,
  Mic,
  Stop,
  ContentCopy,
} from "@mui/icons-material";

import { motion } from "framer-motion";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// --- Static Data Definitions ---
const stats = [
  {
    title: "Total Resumes",
    value: "12",
    icon: <Description sx={{ fontSize: 28 }} />,
    color: "#6366f1",
    trend: "+2 from last month",
  },
  {
    title: "Profile Views",
    value: "2,450",
    icon: <Visibility sx={{ fontSize: 28 }} />,
    color: "#10b981",
    trend: "+12.5% this week",
  },
  {
    title: "Downloads",
    value: "824",
    icon: <Download sx={{ fontSize: 28 }} />,
    color: "#f59e0b",
    trend: "+43 new downloads",
  },
  {
    title: "ATS Score",
    value: "92%",
    icon: <TrendingUp sx={{ fontSize: 28 }} />,
    color: "#ef4444",
    trend: "Excellent score",
  },
];

const chartData = [
  { month: "Jan", views: 400 },
  { month: "Feb", views: 650 },
  { month: "Mar", views: 900 },
  { month: "Apr", views: 1400 },
  { month: "May", views: 1900 },
  { month: "Jun", views: 2450 },
];

const resumes = [
  {
    name: "Frontend Developer Resume",
    updated: "2 Hours Ago",
    type: "frontend",
  },
  { name: "React Developer Resume", updated: "Yesterday", type: "react" },
  { name: "Full Stack Resume", updated: "3 Days Ago", type: "fullstack" },
];

const glassCard = {
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderRadius: "24px",
  boxShadow: "0 20px 35px -10px rgba(0, 0, 0, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.5)",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
  "&:hover": {
    boxShadow: "0 25px 40px -12px rgba(0, 0, 0, 0.15)",
  },
};

const MotionPaper = motion(Paper);

export const CandidateDashboardPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Navigation State
  const [activeTab, setActiveTab] = useState(0);

  // 1. JD Tailor State
  const [jdText, setJdText] = useState("");
  const [tailoredBullets, setTailoredBullets] = useState<string[]>([]);
  const [isTailoring, setIsTailoring] = useState(false);

  // 2. Mock Interview State
  const [isRecording, setIsRecording] = useState(false);
  const [hasFeedback, setHasFeedback] = useState(false);

  // Handlers
  const handleTailorResume = () => {
    setIsTailoring(true);
    setTimeout(() => {
      setTailoredBullets([
        "Architected high-throughput React/TypeScript UI interfaces matching ATS core keywords: RTK Query, MUI, Performance Optimization.",
        "Engineered scalable state delivery mechanisms, increasing load responsiveness by 40%.",
        "Collaborated using agile methodologies to deliver recruiter-facing candidate dashboards.",
      ]);
      setIsTailoring(false);
    }, 800);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2, md: 3 },
      }}
    >
      <Container maxWidth="xl" disableGutters={isMobile}>
        <Stack spacing={{ xs: 2, sm: 3, md: 4 }}>
          {/* Hero Section */}
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            sx={{
              ...glassCard,
              p: { xs: 2.5, sm: 3, md: 4 },
              background: "linear-gradient(120deg, #1e293b 0%, #0f172a 100%)",
              color: "#fff",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
              }}
              spacing={2}
            >
              <Box>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{ fontWeight: 800, mb: 1 }}
                >
                  Welcome Back 👋 Mitin
                </Typography>
                <Typography
                  sx={{ opacity: 0.85, fontSize: { xs: "0.9rem", sm: "1rem" } }}
                >
                  Let's build your next career opportunity. Your AI Career OS
                  journey continues.
                </Typography>
              </Box>
              <Avatar
                sx={{
                  width: { xs: 56, sm: 70 },
                  height: { xs: 56, sm: 70 },
                  bgcolor: "rgba(255,255,255,0.2)",
                  border: "2px solid rgba(255,255,255,0.5)",
                }}
              >
                <Typography variant="h5">MP</Typography>
              </Avatar>
            </Stack>
          </MotionPaper>

          {/* Stats Grid */}
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
            {stats.map((item, index) => (
              <Grid key={item.title} size={{ xs: 12, sm: 6, md: 3 }}>
                <MotionPaper
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  sx={{
                    ...glassCard,
                    p: { xs: 2, sm: 2.5 },
                    height: "100%",
                    background: "#fff",
                  }}
                >
                  <Stack
                    direction="row"
                    sx={{
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#64748b",
                          fontWeight: 500,
                          letterSpacing: "0.5px",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant={isMobile ? "h4" : "h3"}
                        sx={{ fontWeight: 800, color: "#1e293b", mt: 1 }}
                      >
                        {item.value}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#64748b", mt: 0.5, display: "block" }}
                      >
                        {item.trend}
                      </Typography>
                    </Box>
                    <Avatar
                      sx={{
                        bgcolor: alpha(item.color, 0.1),
                        color: item.color,
                        width: 48,
                        height: 48,
                      }}
                    >
                      {item.icon}
                    </Avatar>
                  </Stack>
                </MotionPaper>
              </Grid>
            ))}
          </Grid>

          {/* Navigation Tabs for All 8 Candidate Features */}
          <Paper sx={{ ...glassCard, background: "#fff", p: 1 }}>
            <Tabs
              value={activeTab}
              onChange={(_, val) => setActiveTab(val)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                "& .MuiTab-root": {
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: "12px",
                  minHeight: 48,
                },
              }}
            >
              <Tab
                icon={<AutoFixHigh />}
                label="JD Tailor"
                iconPosition="start"
              />
              <Tab
                icon={<Mic />}
                label="AI Mock Interview"
                iconPosition="start"
              />
            </Tabs>
          </Paper>

          {/* Tab 0: Overview & JD Tailor */}
          {activeTab === 0 && (
            <Stack spacing={3}>
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <MotionPaper sx={{ ...glassCard, p: 3, background: "#fff" }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
                    >
                      JD-Based Resume Tailoring
                    </Typography>
                    <TextField
                      multiline
                      rows={6}
                      fullWidth
                      placeholder="Paste the target job description text here..."
                      value={jdText}
                      onChange={(e) => setJdText(e.target.value)}
                      sx={{ mb: 2 }}
                    />
                    <Button
                      variant="contained"
                      startIcon={<AutoFixHigh />}
                      onClick={handleTailorResume}
                      disabled={!jdText || isTailoring}
                      fullWidth
                      sx={{
                        py: 1.5,
                        borderRadius: "40px",
                        bgcolor: "#6366f1",
                        "&:hover": { bgcolor: "#4f46e5" },
                      }}
                    >
                      {isTailoring
                        ? "Analyzing ATS Keywords..."
                        : "Tailor Resume Bullets & ATS Score"}
                    </Button>
                  </MotionPaper>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <MotionPaper
                    sx={{
                      ...glassCard,
                      p: 3,
                      background: "#fff",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
                    >
                      Optimized Resume Output
                    </Typography>
                    {tailoredBullets.length > 0 ? (
                      <Box>
                        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                          <Chip
                            label="ATS Fit: 94%"
                            color="success"
                            sx={{ fontWeight: "bold" }}
                          />
                          <Chip
                            label="Matched Keywords: React, RTK Query, MUI"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                        <List>
                          {tailoredBullets.map((bullet, idx) => (
                            <ListItem
                              key={idx}
                              sx={{
                                bgcolor: "#f8fafc",
                                mb: 1,
                                borderRadius: "12px",
                              }}
                            >
                              <ListItemIcon>
                                <CheckCircle sx={{ color: "#10b981" }} />
                              </ListItemIcon>
                              <ListItemText primary={bullet} />
                            </ListItem>
                          ))}
                        </List>
                      </Box>
                    ) : (
                      <Typography
                        color="text.secondary"
                        sx={{ py: 6, textAlign: "center" }}
                      >
                        Paste a job description on the left to generate
                        job-aligned bullet points and custom ATS analysis.
                      </Typography>
                    )}
                  </MotionPaper>
                </Grid>
              </Grid>

              {/* Original Analytics Chart Component */}
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
                <Grid size={{ xs: 12, lg: 7.5 }}>
                  <MotionPaper
                    sx={{
                      ...glassCard,
                      p: { xs: 2, sm: 3 },
                      background: "#fff",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 700,
                        color: "#1e293b",
                        mb: { xs: 2, sm: 3 },
                      }}
                    >
                      Resume Analytics Overview
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        height: { xs: 240, sm: 280, md: 320 },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient
                              id="colorViews"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#6366f1"
                                stopOpacity={0.3}
                              />
                              <stop
                                offset="95%"
                                stopColor="#6366f1"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e2e8f0"
                          />
                          <XAxis
                            dataKey="month"
                            stroke="#64748b"
                            tick={{ fontSize: 12 }}
                          />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "#fff",
                              border: "none",
                              borderRadius: "12px",
                              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="views"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fill="url(#colorViews)"
                            fillOpacity={1}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>
                  </MotionPaper>
                </Grid>

                <Grid size={{ xs: 12, lg: 4.5 }}>
                  <MotionPaper
                    sx={{
                      ...glassCard,
                      p: { xs: 2, sm: 3 },
                      background: "#fff",
                      height: "100%",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
                    >
                      Profile Strength
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Stack
                        direction="row"
                        sx={{ justifyContent: "space-between", mb: 1 }}
                      >
                        <Typography variant="body2" sx={{ color: "#64748b" }}>
                          Completion
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ fontWeight: 600, color: "#6366f1" }}
                        >
                          92%
                        </Typography>
                      </Stack>
                      <LinearProgress
                        variant="determinate"
                        value={92}
                        sx={{
                          height: 8,
                          borderRadius: 4,
                          bgcolor: "#e2e8f0",
                          "& .MuiLinearProgress-bar": {
                            bgcolor: "#6366f1",
                            borderRadius: 4,
                          },
                        }}
                      />
                    </Box>
                    <Stack spacing={2} sx={{ mt: 3 }}>
                      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5}>
                        <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: "#1e293b" }}>
                          Personal Details
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5}>
                        <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: "#1e293b" }}>
                          Experience
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5}>
                        <CheckCircle sx={{ color: "#10b981", fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: "#1e293b" }}>
                          Skills
                        </Typography>
                      </Stack>
                      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5}>
                        <Warning sx={{ color: "#f59e0b", fontSize: 20 }} />
                        <Typography variant="body2" sx={{ color: "#1e293b" }}>
                          Portfolio Missing
                        </Typography>
                      </Stack>
                    </Stack>
                    <Button
                      variant="text"
                      sx={{ mt: 3, color: "#6366f1", fontWeight: 600 }}
                      fullWidth
                    >
                      Complete Profile →
                    </Button>
                  </MotionPaper>
                </Grid>
              </Grid>
            </Stack>
          )}

          {/* Tab 1: AI Mock Interview */}
          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 7 }}>
                <MotionPaper sx={{ ...glassCard, p: 3, background: "#fff" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
                  >
                    AI Mock Interview Simulator
                  </Typography>
                  <Paper
                    variant="outlined"
                    sx={{
                      p: 2,
                      mb: 3,
                      bgcolor: "#f8fafc",
                      borderRadius: "16px",
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "primary.main", fontWeight: "bold" }}
                    >
                      Question 1/3 (Senior Full Stack Engineer Role):
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 1 }}>
                      "How do you handle race conditions and cache
                      synchronization when making simultaneous API requests in a
                      React/Redux environment?"
                    </Typography>
                  </Paper>
                  <Stack direction="row" spacing={2}>
                    {!isRecording ? (
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<Mic />}
                        onClick={() => setIsRecording(true)}
                        sx={{ borderRadius: "30px" }}
                      >
                        Record Answer
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<Stop />}
                        onClick={() => {
                          setIsRecording(false);
                          setHasFeedback(true);
                        }}
                        sx={{ borderRadius: "30px" }}
                      >
                        Stop Recording
                      </Button>
                    )}
                    <Button variant="outlined" sx={{ borderRadius: "30px" }}>
                      Text Response
                    </Button>
                  </Stack>
                  {isRecording && (
                    <LinearProgress
                      color="error"
                      sx={{ my: 3, borderRadius: 2 }}
                    />
                  )}
                </MotionPaper>
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <MotionPaper sx={{ ...glassCard, p: 3, background: "#fff" }}>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
                  >
                    Live AI Feedback (STAR Metrics)
                  </Typography>
                  {hasFeedback ? (
                    <Stack spacing={2}>
                      <Box sx={{ display: "flex", gap: 1 }}>
                        <Chip label="Clarity: 89%" color="success" />
                        <Chip label="STAR Structure: Strong" color="primary" />
                      </Box>
                      <Typography variant="body2">
                        • <strong>Filler Words:</strong> 2 instances detected
                        ("like", "you know").
                      </Typography>
                      <Typography variant="body2">
                        • <strong>Recommendation:</strong> Add more metric
                        details on the final <i>Result</i> step of your answer.
                      </Typography>
                    </Stack>
                  ) : (
                    <Typography color="text.secondary">
                      Record or submit an answer to receive instant clarity,
                      filler word, and STAR feedback.
                    </Typography>
                  )}
                </MotionPaper>
              </Grid>
            </Grid>
          )}

          {/* Recent Resumes & Quick Actions */}
          <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                sx={{
                  ...glassCard,
                  p: { xs: 2, sm: 3 },
                  background: "#fff",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
                >
                  Recent Resumes
                </Typography>
                <Stack spacing={1.5}>
                  {resumes.map((resume, index) => (
                    <Paper
                      key={index}
                      elevation={0}
                      sx={{
                        p: 2,
                        background: "#f8fafc",
                        borderRadius: "16px",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          background: "#f1f5f9",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        sx={{
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        <Stack
                          direction="row"
                          sx={{ alignItems: "center" }}
                          spacing={1.5}
                        >
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: "#e0e7ff",
                              color: "#6366f1",
                            }}
                          >
                            <Description sx={{ fontSize: 18 }} />
                          </Avatar>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 500, color: "#1e293b" }}
                          >
                            {resume.name}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" sx={{ color: "#64748b" }}>
                          {resume.updated}
                        </Typography>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
                <Button
                  variant="text"
                  sx={{ mt: 2, color: "#6366f1" }}
                  fullWidth
                >
                  View All Resumes →
                </Button>
              </MotionPaper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <MotionPaper
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                sx={{
                  ...glassCard,
                  p: { xs: 2, sm: 3 },
                  background: "#fff",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
                >
                  Quick Actions
                </Typography>
                <Stack spacing={2}>
                  <Button
                    variant="contained"
                    startIcon={<Add />}
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: "40px",
                      bgcolor: "#6366f1",
                      "&:hover": { bgcolor: "#4f46e5" },
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Create Resume
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<FileUpload />}
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: "40px",
                      borderColor: "#cbd5e1",
                      color: "#1e293b",
                      "&:hover": { borderColor: "#6366f1", bgcolor: "#f8fafc" },
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Import Resume
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<PictureAsPdf />}
                    fullWidth
                    sx={{
                      py: 1.5,
                      borderRadius: "40px",
                      borderColor: "#cbd5e1",
                      color: "#1e293b",
                      "&:hover": { borderColor: "#ef4444", bgcolor: "#fef2f2" },
                      textTransform: "none",
                      fontWeight: 600,
                    }}
                  >
                    Download PDF
                  </Button>
                </Stack>
              </MotionPaper>
            </Grid>
          </Grid>

          {/* Live Resume URL Footer Card */}
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            sx={{
              ...glassCard,
              p: { xs: 2, sm: 3 },
              background: "#fff",
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: "#1e293b", mb: 2 }}
            >
              Live Resume URL
            </Typography>
            <Divider sx={{ mb: 2, borderColor: "#e2e8f0" }} />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                gap: 2,
              }}
            >
              <Typography
                sx={{
                  color: "#6366f1",
                  fontWeight: 500,
                  wordBreak: "break-all",
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                }}
              >
                https://resume.app/mitin-patel
              </Typography>
              <Button
                variant="text"
                size="small"
                startIcon={<ContentCopy />}
                sx={{ color: "#64748b", textTransform: "none" }}
              >
                Copy Link
              </Button>
            </Stack>
          </MotionPaper>
        </Stack>
      </Container>
    </Box>
  );
};

export default CandidateDashboardPage;
