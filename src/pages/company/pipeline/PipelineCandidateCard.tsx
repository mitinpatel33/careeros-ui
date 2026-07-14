import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  ArrowForward,
  Event,
  MoreVert,
  PersonSearch,
  Star,
} from "@mui/icons-material";

import { useState } from "react";

import type {
  PipelineCandidate,
  PipelineStage,
} from "../../../types/pipeline.types";

type Props = {
  candidate: PipelineCandidate;
  onView: (candidate: PipelineCandidate) => void;
  onMove: (candidate: PipelineCandidate) => void;
  onMoveNext: (candidate: PipelineCandidate) => void;
  onScheduleInterview: (candidate: PipelineCandidate) => void;
  onReject: (candidate: PipelineCandidate) => void;
};

const getStageColor = (
  stage: PipelineStage
):
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info" => {
  switch (stage) {
    case "Applied":
      return "info";
    case "Reviewed":
      return "primary";
    case "Shortlisted":
      return "secondary";
    case "Interview":
      return "warning";
    case "Selected":
      return "success";
    case "Rejected":
      return "error";
    default:
      return "default";
  }
};

const PipelineCandidateCard = ({
  candidate,
  onView,
  onMove,
  onMoveNext,
  onScheduleInterview,
  onReject,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  if (!candidate) return null;

  const initials = candidate.name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <Paper
        elevation={0}
        onClick={() => onView(candidate)}
        sx={{
          p: 2,
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          bgcolor: "#fff",
          cursor: "pointer",
          transition: "all .25s ease",
          "&:hover": {
            transform: "translateY(-3px)",
            borderColor: "primary.light",
            boxShadow: "0 16px 35px rgba(15,23,42,.10)",
          },
        }}
      >
        <Stack spacing={1.5}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }} spacing={1}>
            <Stack direction="row" spacing={1.2} sx={{ minWidth: 0 }}>
              <Avatar
                sx={{
                  width: 42,
                  height: 42,
                  bgcolor: "primary.main",
                  fontWeight: 900,
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                {initials}
              </Avatar>

              <Box sx={{ minWidth: 0 }}>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 15,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {candidate.name}
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    fontSize: 12,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {candidate.role}
                </Typography>
              </Box>
            </Stack>

            <IconButton
              size="small"
              onClick={(event) => {
                event.stopPropagation();
                setAnchorEl(event.currentTarget);
              }}
            >
              <MoreVert fontSize="small" />
            </IconButton>
          </Stack>

          <Stack direction="row" spacing={0.7} sx={{ flexWrap: "wrap" }} useFlexGap>
            <Chip label={candidate.location} size="small" variant="outlined" />
            <Chip label={candidate.experience} size="small" variant="outlined" />
            <Chip
              label={candidate.currentStage}
              size="small"
              color={getStageColor(candidate.currentStage)}
            />
          </Stack>

          <Box>
            <Stack direction="row"  sx={{ mb: 0.5, justifyContent: "space-between" }}>
              <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                <Star sx={{ fontSize: 16, color: "warning.main" }} />
                <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
                  AI Match
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 900,
                  color: "success.main",
                }}
              >
                {candidate.matchScore}%
              </Typography>
            </Stack>

            <LinearProgress
              variant="determinate"
              value={candidate.matchScore}
              sx={{
                height: 7,
                borderRadius: 99,
                bgcolor: "#e2e8f0",
                "& .MuiLinearProgress-bar": {
                  borderRadius: 99,
                },
              }}
            />
          </Box>

          <Stack direction="row" spacing={0.7}   useFlexGap>
            {candidate.skills.slice(0, 3).map((skill) => (
              <Chip
                key={skill}
                label={skill}
                size="small"
                sx={{
                  bgcolor: "#f1f5f9",
                  fontSize: 11,
                }}
              />
            ))}

            {candidate.skills.length > 3 && (
              <Chip
                label={`+${candidate.skills.length - 3}`}
                size="small"
                variant="outlined"
              />
            )}
          </Stack>

          <Typography color="text.secondary" sx={{ fontSize: 11 }}>
            Applied on {candidate.appliedDate}
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
            <Button
              fullWidth
              size="small"
              variant="outlined"
              startIcon={<PersonSearch />}
              onClick={(event) => {
                event.stopPropagation();
                onView(candidate);
              }}
              sx={{
                textTransform: "none",
                fontWeight: 800,
                borderRadius: 2.5,
              }}
            >
              View
            </Button>

            {candidate.currentStage !== "Selected" &&
              candidate.currentStage !== "Rejected" && (
                <Button
                  fullWidth
                  size="small"
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={(event) => {
                    event.stopPropagation();
                    onMoveNext(candidate);
                  }}
                  sx={{
                    textTransform: "none",
                    fontWeight: 800,
                    borderRadius: 2.5,
                  }}
                >
                  Next
                </Button>
              )}
          </Stack>
        </Stack>
      </Paper>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            onView(candidate);
            setAnchorEl(null);
          }}
        >
          View candidate
        </MenuItem>

        <MenuItem
          onClick={() => {
            onMove(candidate);
            setAnchorEl(null);
          }}
        >
          Move to another stage
        </MenuItem>

        <MenuItem
          onClick={() => {
            onScheduleInterview(candidate);
            setAnchorEl(null);
          }}
        >
          <Event fontSize="small" sx={{ mr: 1 }} />
          Schedule interview
        </MenuItem>

        {candidate.currentStage !== "Rejected" && (
          <MenuItem
            sx={{ color: "error.main" }}
            onClick={() => {
              onReject(candidate);
              setAnchorEl(null);
            }}
          >
            Reject candidate
          </MenuItem>
        )}
      </Menu>
    </>
  );
};

export default PipelineCandidateCard;