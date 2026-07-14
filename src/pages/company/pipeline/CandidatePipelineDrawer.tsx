import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  ArrowForward,
  Close,
  Email,
  Event,
  LocationOn,
  Phone,
  Star,
} from "@mui/icons-material";

import { useEffect, useState } from "react";

import type { PipelineCandidate } from "../../../types/pipeline.types";

type Props = {
  open: boolean;
  candidate: PipelineCandidate | null;
  onClose: () => void;
  onMove: (candidate: PipelineCandidate) => void;
  onMoveNext: (
    candidate: PipelineCandidate
  ) => void;
  onScheduleInterview: (
    candidate: PipelineCandidate
  ) => void;
  onSaveNote: (
    candidateId: string,
    note: string
  ) => void;
};

const CandidatePipelineDrawer = ({
  open,
  candidate,
  onClose,
  onMove,
  onMoveNext,
  onScheduleInterview,
  onSaveNote,
}: Props) => {
  const [note, setNote] = useState("");

  useEffect(() => {
    setNote("");
  }, [candidate]);

  if (!candidate) {
    return null;
  }

  const initials = candidate.name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSaveNote = () => {
    const cleanedNote = note.trim();

    if (!cleanedNote) return;

    onSaveNote(candidate.id, cleanedNote);
    setNote("");
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: {
              xs: "100%",
              sm: 520,
            },
            p: {
              xs: 2,
              sm: 3,
            },
          },
        },
      }}
    >
      <Stack spacing={2.5}>
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
        >
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: "center" }}
          >
            <Avatar
              src={candidate.avatarUrl}
              sx={{
                width: 64,
                height: 64,
                bgcolor: "primary.main",
                fontWeight: 900,
              }}
            >
              {initials}
            </Avatar>

            <Box>
              <Typography
                variant="h5"
                sx={{ fontWeight: 900 }}
              >
                {candidate.name}
              </Typography>

              <Typography color="text.secondary">
                {candidate.role}
              </Typography>
            </Box>
          </Stack>

          <Button
            color="inherit"
            onClick={onClose}
            sx={{ minWidth: 40 }}
          >
            <Close />
          </Button>
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: "wrap"}}
          useFlexGap
        >
          <Chip
            label={candidate.currentStage}
            color="primary"
          />

          <Chip
            label={`${candidate.matchScore}% Match`}
            icon={<Star />}
            color="success"
          />

          <Chip
            label={`ATS ${candidate.atsScore}%`}
            variant="outlined"
          />
        </Stack>

        <Box>
          <Stack
            direction="row"
            sx={{ mb: 0.8, justifyContent: "space-between" }}
          >
            <Typography sx={{ fontWeight: 800 }}>
              AI Match Score
            </Typography>

            <Typography
              sx={{
                fontWeight: 900,
                color: "success.main",
              }}
            >
              {candidate.matchScore}%
            </Typography>
          </Stack>

          <LinearProgress
            value={candidate.matchScore}
            variant="determinate"
            sx={{
              height: 10,
              borderRadius: 99,
            }}
          />
        </Box>

        <Divider />

        <Section title="Contact Information">
          <Stack spacing={1}>
            <ContactRow
              icon={<Email />}
              value={candidate.email}
            />

            <ContactRow
              icon={<Phone />}
              value={candidate.phone}
            />

            <ContactRow
              icon={<LocationOn />}
              value={candidate.location}
            />
          </Stack>
        </Section>

        <Section title="Applied Job">
          <Typography sx={{ fontWeight: 800 }}>
            {candidate.jobTitle}
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ fontSize: 13 }}
          >
            Applied on {candidate.appliedDate}
          </Typography>
        </Section>

        <Section title="Professional Summary">
          <Typography
            color="text.secondary"
            sx={{ lineHeight: 1.7 }}
          >
            {candidate.summary}
          </Typography>
        </Section>

        <Section title="Skills">
          <Stack
            direction="row"
            spacing={1}
            sx={{ flexWrap: "wrap"}}
            useFlexGap
          >
            {candidate.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
                variant="outlined"
              />
            ))}
          </Stack>
        </Section>

        <Section title="Recruiter Notes">
          <Stack spacing={1}>
            {candidate.notes.length === 0 && (
              <Typography
                color="text.secondary"
                sx={{ fontSize: 13 }}
              >
                No notes added yet.
              </Typography>
            )}

            {candidate.notes.map(
              (existingNote, index) => (
                <Box
                  key={`${existingNote}-${index}`}
                  sx={{
                    p: 1.5,
                    borderRadius: 3,
                    bgcolor: "#f8fafc",
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Typography sx={{ fontSize: 13 }}>
                    {existingNote}
                  </Typography>
                </Box>
              )
            )}

            <TextField
              fullWidth
              multiline
              minRows={3}
              label="Add recruiter note"
              value={note}
              onChange={(event) =>
                setNote(event.target.value)
              }
            />

            <Button
              variant="outlined"
              onClick={handleSaveNote}
              disabled={!note.trim()}
              sx={{ alignSelf: "flex-start" }}
            >
              Save Note
            </Button>
          </Stack>
        </Section>

        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
          spacing={1.5}
        >
          <Button
            fullWidth
            variant="outlined"
            onClick={() => onMove(candidate)}
          >
            Change Stage
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Event />}
            onClick={() =>
              onScheduleInterview(candidate)
            }
          >
            Schedule Interview
          </Button>
        </Stack>

        {candidate.currentStage !== "Selected" &&
          candidate.currentStage !==
            "Rejected" && (
            <Button
              fullWidth
              variant="contained"
              endIcon={<ArrowForward />}
              onClick={() =>
                onMoveNext(candidate)
              }
            >
              Move to Next Stage
            </Button>
          )}
      </Stack>
    </Drawer>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 900,
          mb: 1.2,
        }}
      >
        {title}
      </Typography>

      {children}
    </Box>
  );
};

const ContactRow = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => {
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: "center" }}
    >
      <Box
        sx={{
          color: "primary.main",
          display: "flex",

          "& svg": {
            fontSize: 19,
          },
        }}
      >
        {icon}
      </Box>

      <Typography sx={{ fontSize: 14 }}>
        {value}
      </Typography>
    </Stack>
  );
};

export default CandidatePipelineDrawer;