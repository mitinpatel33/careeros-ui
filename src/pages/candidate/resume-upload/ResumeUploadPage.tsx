import { useState } from "react";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import { CloudUpload } from "@mui/icons-material";
import { motion } from "framer-motion";

import UploadResumeCard from "./components/UploadResumeCard";
import ParsingProgress from "./components/ParsingProgress";
import ExtractedDataPreview from "./components/ExtractedDataPreview";
import type { ParsedResumeData } from "../../../types/resumeData.types";


const sampleParsedData: ParsedResumeData = {
  personalInformation: {
    fullName: "Mitin Patel",
    email: "mitin@example.com",
    phone: "+91 98765 43210",
    location: "Surat, Gujarat",
    jobTitle: "Full Stack Developer",
    linkedIn: "https://linkedin.com/in/mitin",
    github: "https://github.com/mitin",
    portfolio: "https://mitin.dev",
  },

  professionalSummary:
    "Experienced full stack developer skilled in React.js, Node.js, .NET Core, SQL Server and MongoDB.",

  skills: {
    technical: [
      "React.js",
      "Node.js",
      "TypeScript",
      ".NET Core",
      "SQL Server",
    ],
    soft: ["Communication", "Problem Solving"],
    tools: ["Git", "Docker", "Azure DevOps"],
  },

  experiences: [
    {
      companyName: "ABC Technologies",
      designation: "Full Stack Developer",
      startDate: "2023",
      endDate: "Present",
      duration: "2023 - Present",
      description:
        "Worked on dashboard, APIs, authentication, SQL optimization and SaaS product modules.",
    },
  ],

  educations: [
    {
      degree: "B.Tech Computer Engineering",
      university: "GTU",
      passingYear: "2022",
      year: "2022",
    },
  ],

  projects: [
    {
      title: "Animated Resume Builder",
      techStack: ["React", "Node.js", "MongoDB"],
      description:
        "Built resume builder with live resume website, PDF download and theme selection.",
    },
  ],
};

const ResumeUploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setParsedData(null);
  };

  const handleParseResume = () => {
    if (!file) return;

    setIsParsing(true);

    setTimeout(() => {
      setParsedData(sampleParsedData);
      setIsParsing(false);
    }, 1800);
  };

  const handleAutoFillBuilder = () => {
    console.log("Auto-fill builder:", parsedData);
  };

  const handleGenerateLiveLink = () => {
    console.log("Generate live link:", parsedData);
  };

  const handleChooseTheme = () => {
    console.log("Choose download theme");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        background:
          "radial-gradient(circle at top left,#dbeafe 0,transparent 30%),radial-gradient(circle at top right,#ede9fe 0,transparent 35%),linear-gradient(135deg,#f8fafc,#eef2ff)",
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: "auto" }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          Resume Upload & Parsing
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Upload existing resume, extract data, auto-fill builder and generate
          live resume website link.
        </Typography>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 5 }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <UploadResumeCard
                file={file}
                isParsing={isParsing}
                onFileChange={handleFileChange}
                onParseResume={handleParseResume}
              />
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 5,
                  border: "1px solid #e5e7eb",
                  boxShadow: "0 24px 70px rgba(15,23,42,0.10)",
                  minHeight: 420,
                }}
              >
                {!file && <EmptyState />}

                {file && isParsing && <ParsingProgress fileName={file.name} />}

                {parsedData && !isParsing && (
                  <ExtractedDataPreview
                    data={parsedData}
                    onAutoFill={handleAutoFillBuilder}
                    onGenerateLiveLink={handleGenerateLiveLink}
                    onChooseTheme={handleChooseTheme}
                  />
                )}
              </Paper>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const EmptyState = () => {
  return (
    <Stack
      sx={{
        minHeight: 360,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <CloudUpload
        sx={{
          fontSize: 75,
          color: "#94a3b8",
          mb: 2,
        }}
      />

      <Typography variant="h6" sx={{ fontWeight: 900 }}>
        No Resume Uploaded
      </Typography>

      <Typography color="text.secondary" sx={{ maxWidth: 420, mt: 1 }}>
        Upload resume to extract personal info, skills, experience, education,
        projects and auto-fill resume builder.
      </Typography>
    </Stack>
  );
};

export default ResumeUploadPage;
