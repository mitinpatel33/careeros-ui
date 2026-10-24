import React, { useEffect, useRef, useState } from "react";
import {
  Alert, Box, Button, Chip, Grid, Paper, Stack, Typography,
} from "@mui/material";
import {
  AutoAwesome, ArrowBack, ArrowForward, SmartToy, Visibility,
} from "@mui/icons-material";
import { cardPadding, cardSx, primaryButtonSx } from "../styles";
import { PanelHeader, SelectField } from "./shared";
import {
  useFetchQuestionsMutation,
  type InterviewQuestionDto,
  type JobTitleDto,
  type SkillDto,
} from "../../../services/interviewApi";
import { getErrorMessage } from "../../../utils/intervireUtils";
import { AiLoader } from "./AiLoader";

interface Props {
  selectedJob: JobTitleDto | null;
  skills: SkillDto[];
  skillLabel: string;
  selectedSkill: string;
  onSkillChange: (name: string) => void;
}

const DIFFICULTIES = ["Beginner", "Intermediate", "Advanced"];
const PREFETCH_WHEN_LEFT = 2; // load more when this many questions remain

const pillButtonSx = (color: string) => ({ borderRadius: "22px", textTransform: "none", color });

export const QuestionPanel: React.FC<Props> = ({
  selectedJob, skills, skillLabel, selectedSkill, onSkillChange,
}) => {
  const [difficulty, setDifficulty] = useState("Beginner");
  const [list, setList] = useState<InterviewQuestionDto[]>([]);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [fetchQuestions, { isLoading }] = useFetchQuestionsMutation();

  const job = selectedJob;
  const requestKey = `${job?._id}|${selectedSkill}|${difficulty}`;

  // latest values for async code (avoids stale closures)
  const listRef = useRef(list);
  listRef.current = list;
  const keyRef = useRef(requestKey);
  keyRef.current = requestKey;
  const busyRef = useRef(false);

  // Role / skill / difficulty changed -> start a fresh session
  useEffect(() => {
    setList([]);
    setIndex(0);
    setErrorMsg("");
    setShowAnswer(true);
    setShowExplanation(false);
  }, [requestKey]);

  /** Fetches the next unseen questions and appends them. */
  const load = async () => {
    if (!job || !selectedSkill || busyRef.current) return;
    busyRef.current = true;
    const key = keyRef.current;
    setErrorMsg("");
    try {
      const fresh = await fetchQuestions({
        jobTitleId: job._id,
        skillName: selectedSkill,
        difficulty,
        excludeIds: listRef.current.map((q) => q._id),
      }).unwrap();

      if (key !== keyRef.current) return; // selection changed while loading
      setList((prev) => {
        const seen = new Set(prev.map((q) => q._id));
        return [...prev, ...fresh.filter((q) => !seen.has(q._id))];
      });
    } catch (e) {
      if (key === keyRef.current) setErrorMsg(getErrorMessage(e));
    } finally {
      busyRef.current = false;
    }
  };

  // Keep a buffer ahead of the user so "Next" is instant
  useEffect(() => {
    if (list.length > 0 && index >= list.length - PREFETCH_WHEN_LEFT && !errorMsg) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, list.length]);

  const current = list[index];

  const go = (next: number) => {
    setIndex(Math.max(0, next));
    setShowAnswer(false);
    setShowExplanation(false);
  };

  return (
    <Paper sx={{ ...cardSx, p: cardPadding, height: "100%" }}>
      <PanelHeader
        icon={<SmartToy />}
        iconColor="#3569f6"
        title="AI Questions & Answers"
        caption="Unlimited role-wise questions with detailed answers and explanations."
        trailing={
          <Chip
            size="small"
            label="Powered by AI"
            sx={{
              display: { xs: "none", sm: "inline-flex" },
              bgcolor: "#f2eaff", color: "#8250d8", fontWeight: 750, fontSize: ".64rem",
            }}
          />
        }
      />

      <Grid container spacing={1} sx={{ mt: 1.5, mb: 1.5 }}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Typography sx={{ color: "#637696", fontSize: ".68rem", mb: 0.5 }}>Selected Role</Typography>
          <Typography noWrap sx={{ color: "#263a60", fontWeight: 800, fontSize: ".82rem", pt: 0.8 }}>
            {job?.title ?? "Choose one above"}
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectField
            label={`Select ${skillLabel}`}
            value={skills.some((x) => x.name === selectedSkill) ? selectedSkill : ""}
            options={skills.map((x) => x.name)}
            onChange={onSkillChange}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <SelectField label="Difficulty" value={difficulty} options={DIFFICULTIES} onChange={setDifficulty} />
        </Grid>
      </Grid>

      <Paper
        variant="outlined"
        sx={{ p: { xs: 1.25, sm: 1.6 }, borderRadius: "14px", bgcolor: "#fbfdff", borderColor: "#e6edfb" }}
      >
        {errorMsg && (
          <Alert
            severity="error"
            sx={{ mb: 1.5 }}
            action={
              list.length > 0 && (
                <Button color="inherit" size="small" onClick={load}>
                  Retry
                </Button>
              )
            }
          >
            {errorMsg}
          </Alert>
        )}

        {/* 1) nothing yet */}
        {list.length === 0 &&
          (isLoading ? (
            <AiLoader />
          ) : (
            <Stack spacing={1.5} sx={{ alignItems: "center", py: 2 }}>
              <Typography sx={{ color: "#8190a9", fontSize: ".8rem", textAlign: "center" }}>
                Pick a role, {skillLabel.toLowerCase()} and difficulty, then start practicing.
                You can keep going as long as you like.
              </Typography>
              <Button
                variant="contained"
                onClick={load}
                disabled={!job || !selectedSkill}
                startIcon={<AutoAwesome />}
                sx={primaryButtonSx}
              >
                Get Questions
              </Button>
            </Stack>
          ))}

        {/* 2) reached the end of the list while more are loading */}
        {list.length > 0 && !current && isLoading && (
          <AiLoader lines={2} messages={["Finding a fresh question…", "Writing the answer…"]} />
        )}

        {/* 3) a question to show */}
        {current && (
          <>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                <Chip
                  label={`Q${index + 1}`}
                  size="small"
                  sx={{ bgcolor: "#e8f0ff", color: "#3569f6", fontWeight: 850 }}
                />
                <Typography sx={{ color: "#263a60", fontWeight: 800, fontSize: ".86rem" }}>
                  {current.question}
                </Typography>
              </Stack>
              <Chip
                label={current.difficulty}
                size="small"
                sx={{ bgcolor: "#eaf4ff", color: "#3979db", fontWeight: 700, fontSize: ".66rem" }}
              />
            </Stack>

            {showAnswer ? (
              <Box sx={{ mt: 1.75 }}>
                <Typography sx={{ color: "#326af2", fontWeight: 850, fontSize: ".77rem", mb: 0.5 }}>
                  Answer:
                </Typography>
                <Typography sx={{ color: "#536987", fontSize: ".78rem", lineHeight: 1.7 }}>
                  {current.answer}
                </Typography>
                {showExplanation && current.explanationWithExample && (
                  <Paper
                    elevation={0}
                    sx={{ mt: 1.25, p: 1.25, borderRadius: "10px", bgcolor: "#f1f4ff", border: "1px solid #e3e8ff" }}
                  >
                    <Typography sx={{ color: "#5c4bd8", fontWeight: 800, fontSize: ".74rem", mb: 0.4 }}>
                      AI explanation & tip
                    </Typography>
                    <Typography sx={{ color: "#586b8b", fontSize: ".76rem", lineHeight: 1.6 }}>
                      {current.explanationWithExample}
                    </Typography>
                  </Paper>
                )}
              </Box>
            ) : (
              <Typography sx={{ mt: 1.5, color: "#8190a9", fontSize: ".8rem" }}>
                Answer hidden. Try answering aloud or writing your response before revealing the model answer.
              </Typography>
            )}

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mt: 1.5, justifyContent: "space-between" }}>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  disabled={index === 0}
                  onClick={() => go(index - 1)}
                  sx={{ ...pillButtonSx("#4265eb"), borderColor: "#cbd7ff" }}
                >
                  Previous
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={() => go(index + 1)}
                  sx={{ ...primaryButtonSx, borderRadius: "22px" }}
                >
                  Next Question
                </Button>
              </Stack>
              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                <Button size="small" startIcon={<Visibility />} onClick={() => setShowAnswer((v) => !v)} sx={pillButtonSx("#4265eb")}>
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </Button>
                <Button size="small" startIcon={<AutoAwesome />} onClick={() => setShowExplanation((v) => !v)} sx={pillButtonSx("#6554e8")}>
                  {showExplanation ? "Hide Tips" : "Explain with Example"}
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </Paper>
    </Paper>
  );
};