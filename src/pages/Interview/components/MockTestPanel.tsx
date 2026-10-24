import React, { useEffect, useRef, useState } from "react";
import {
  Alert, Box, Button, CircularProgress, Grid, Paper, Tab, Tabs, Typography,
} from "@mui/material";
import { ArrowForward, Quiz, RestartAlt } from "@mui/icons-material";
import { mockLevels } from "../data";
import { cardPadding, cardSx, primaryButtonSx } from "../styles";
import { PanelHeader, SelectField } from "./shared";
import { useFetchMockTestMutation, type JobTitleDto, type SkillDto } from "../../../services/interviewApi";
import { getErrorMessage } from "../../../utils/intervireUtils";
import { AiLoader } from "./AiLoader";

interface Props {
  selectedJob: JobTitleDto | null;
  skills: SkillDto[];
  skillLabel: string;
  userId?: string;
  selectedSkill: string;
  onSkillChange: (name: string) => void;
}

const tabsSx = {
  mt: 1.5, mb: 1.5, minHeight: 42, bgcolor: "#f0f4fb", p: 0.5, borderRadius: "12px",
  "& .MuiTabs-indicator": {
    height: "100%", borderRadius: "9px", zIndex: 0,
    background: "linear-gradient(100deg,#3769ff,#6858f5)",
  },
  "& .MuiTab-root": {
    zIndex: 1, minHeight: 38, textTransform: "none", fontWeight: 800,
    fontSize: ".75rem", borderRadius: "9px", color: "#7182a1",
  },
  "& .Mui-selected": { color: "#fff !important" },
};

export const MockTestPanel: React.FC<Props> = ({
  selectedJob, skills, skillLabel, userId, selectedSkill, onSkillChange,
}) => {
  const [mode, setMode] = useState(0);
  const [level, setLevel] = useState("Basic");

  const [fetchMockTest, { data: mockTest, isLoading, error, reset }] = useFetchMockTestMutation();

  const byJob = mode === 0;
  const job = selectedJob;
  const target = byJob ? job?.title ?? "" : selectedSkill;

  const resetRef = useRef(reset);
  resetRef.current = reset;

  useEffect(() => {
    resetRef.current();
  }, [mode, selectedJob?._id, selectedSkill, level]);

  const handleStart = () => {
    if (mockTest) return reset();
    if (!job) return;
    fetchMockTest({
      userId,
      jobTitleId: job._id,
      skillName: byJob ? undefined : selectedSkill,
      difficulty: level,
    });
  };

  return (
    <Paper sx={{ ...cardSx, p: cardPadding, height: "100%" }}>
      <PanelHeader
        icon={<Quiz />}
        iconColor="#5b5be9"
        title="Mock Test"
        caption="Practice tests based on role and level."
      />

      <Tabs value={mode} onChange={(_, v) => setMode(v)} variant="fullWidth" sx={tabsSx}>
        <Tab label="By Role" />
        <Tab label={`By ${skillLabel}`} />
      </Tabs>

      {byJob ? (
        <Typography sx={{ mb: 1.5, color: "#263a60", fontWeight: 800, fontSize: ".82rem" }}>
          {job?.title ?? "Choose a role above"}
        </Typography>
      ) : (
        <SelectField
          label={`Select ${skillLabel}`}
          value={skills.some((x) => x.name === selectedSkill) ? selectedSkill : ""}
          options={skills.map((x) => x.name)}
          onChange={onSkillChange}
          fontSize=".8rem"
          sx={{ mb: 1.5 }}
        />
      )}

      <Typography sx={{ color: "#637696", fontSize: ".68rem", mb: 0.8 }}>Select Level</Typography>
      <Grid container spacing={0.8} sx={{ mb: 1.5 }}>
        {mockLevels.map((item) => {
          const active = level === item.name;
          return (
            <Grid key={item.name} size={{ xs: 4 }}>
              <Button
                fullWidth
                onClick={() => setLevel(item.name)}
                sx={{
                  minHeight: 40, px: 0.5, borderRadius: "10px",
                  border: active ? `1.5px solid ${item.color}` : "1px solid #e4eafa",
                  bgcolor: active ? item.bg : "#fff",
                  color: item.color, textTransform: "none",
                  fontSize: { xs: ".65rem", sm: ".72rem" }, fontWeight: 800,
                }}
              >
                {item.name}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {error && <Alert severity="error" sx={{ mb: 1.5 }}>{getErrorMessage(error)}</Alert>}
      {isLoading && (
        <AiLoader
          lines={2}
          messages={["Building your mock test…", "Writing options…", "Checking answers…"]}
        />
      )}
      <Button
        fullWidth
        variant="contained"
        disabled={isLoading || (!mockTest && (!job || (!byJob && !selectedSkill)))}
        endIcon={
          isLoading ? <CircularProgress size={16} color="inherit" /> : mockTest ? <RestartAlt /> : <ArrowForward />
        }
        onClick={handleStart}
        sx={{ ...primaryButtonSx, py: 1.25 }}
      >
        {isLoading ? "Preparing test..." : mockTest ? "Reset Mock Test" : "Start Mock Test"}
      </Button>

      <Paper
        elevation={0}
        sx={{ mt: 1.5, p: 1.25, borderRadius: "12px", bgcolor: "#eef5ff", display: "flex", gap: 1, alignItems: "flex-start" }}
      >
        <Quiz sx={{ color: "#3f7cf3", fontSize: 20, mt: 0.1 }} />
        <Box>
          <Typography sx={{ color: "#61789e", fontSize: ".72rem", lineHeight: 1.5 }}>
            {mockTest
              ? `Your ${level.toLowerCase()} ${target} mock test "${mockTest.title}" is ready to begin.`
              : "Each test includes multiple-choice questions and feedback."}
          </Typography>
          {mockTest && (
            <Typography sx={{ color: "#3867e8", fontWeight: 800, fontSize: ".72rem", mt: 0.5 }}>
              {mockTest.questions.length} questions · Timed practice · AI review
            </Typography>
          )}
        </Box>
      </Paper>
    </Paper>
  );
};