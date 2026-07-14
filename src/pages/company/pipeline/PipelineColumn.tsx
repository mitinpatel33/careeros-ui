import { Box, Chip, Paper, Stack, Typography } from "@mui/material";

import {
  CheckCircle,
  FactCheck,
  Groups,
  PersonAdd,
  PersonOff,
  VideoCall,
} from "@mui/icons-material";

import PipelineCandidateCard from "./PipelineCandidateCard";

import type {
  PipelineCandidate,
  PipelineStage,
} from "../../../types/pipeline.types";

type Props = {
  stage: PipelineStage;
  candidates: PipelineCandidate[];
  onView: (candidate: PipelineCandidate) => void;
  onMove: (candidate: PipelineCandidate) => void;
  onMoveNext: (candidate: PipelineCandidate) => void;
  onScheduleInterview: (candidate: PipelineCandidate) => void;
  onReject: (candidate: PipelineCandidate) => void;
};

const stageSettings: Record<
  PipelineStage,
  {
    icon: React.ReactNode;
    background: string;
    color: string;
  }
> = {
  Applied: {
    icon: <PersonAdd />,
    background: "#eff6ff",
    color: "#2563eb",
  },
  Reviewed: {
    icon: <FactCheck />,
    background: "#eef2ff",
    color: "#4f46e5",
  },
  Shortlisted: {
    icon: <Groups />,
    background: "#faf5ff",
    color: "#9333ea",
  },
  Interview: {
    icon: <VideoCall />,
    background: "#fff7ed",
    color: "#ea580c",
  },
  Selected: {
    icon: <CheckCircle />,
    background: "#f0fdf4",
    color: "#16a34a",
  },
  Rejected: {
    icon: <PersonOff />,
    background: "#fef2f2",
    color: "#dc2626",
  },
};

const PipelineColumn = ({
  stage,
  candidates = [],
  onView,
  onMove,
  onMoveNext,
  onScheduleInterview,
  onReject,
}: Props) => {
  const settings = stageSettings[stage];

  const safeCandidates = candidates.filter(
    (candidate): candidate is PipelineCandidate =>
      Boolean(candidate && candidate.id && candidate.name),
  );

  return (
    <Paper
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: 360,
        maxHeight: {
          xs: "none",
          lg: 680,
        },
        display: "flex",
        flexDirection: "column",
        borderRadius: 5,
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        bgcolor: "rgba(255,255,255,.95)",
      }}
    >
      <Stack
        direction="row"
        sx={{
          p: 2,
          borderBottom: "1px solid #e5e7eb",
          bgcolor: settings.background,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 34,
              height: 34,
              display: "grid",
              placeItems: "center",
              borderRadius: 2.5,
              bgcolor: "#fff",
              color: settings.color,
              flexShrink: 0,
              "& svg": { fontSize: 20 },
            }}
          >
            {settings.icon}
          </Box>

          <Typography
            sx={{
              fontWeight: 900,
              color: settings.color,
              fontSize: 16,
            }}
          >
            {stage}
          </Typography>
        </Stack>

        <Chip
          label={safeCandidates.length}
          size="small"
          sx={{
            fontWeight: 900,
            bgcolor: "#fff",
            color: settings.color,
          }}
        />
      </Stack>

      <Stack
        spacing={1.5}
        sx={{
          p: 1.5,
          flex: 1,
          overflowY: {
            xs: "visible",
            lg: "auto",
          },
          "&::-webkit-scrollbar": { width: 5 },
          "&::-webkit-scrollbar-thumb": {
            borderRadius: 99,
            bgcolor: "#cbd5e1",
          },
        }}
      >
        {safeCandidates.length > 0 ? (
          safeCandidates.map((candidate) => (
            <PipelineCandidateCard
              key={candidate.id}
              candidate={candidate}
              onView={onView}
              onMove={onMove}
              onMoveNext={onMoveNext}
              onScheduleInterview={onScheduleInterview}
              onReject={onReject}
            />
          ))
        ) : (
          <Box
            sx={{
              minHeight: 180,
              display: "grid",
              placeItems: "center",
              textAlign: "center",
              p: 2,
            }}
          >
            <Box>
              <Groups sx={{ fontSize: 42, color: "text.disabled" }} />

              <Typography sx={{ mt: 1, fontWeight: 800, fontSize: 13 }}>
                No candidates
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 12 }}>
                Candidates moved here will appear here.
              </Typography>
            </Box>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default PipelineColumn;
