import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";

import {
  Email,
  Event,
  Person,
  VideoCall,
} from "@mui/icons-material";

import type { InterviewItem } from "../../../types/interview.types";

type Props = {
  open: boolean;
  interview: InterviewItem | null;
  onClose: () => void;
  onFeedback: (interview: InterviewItem) => void;
};

const InterviewDetailsDrawer = ({
  open,
  interview,
  onClose,
  onFeedback,
}: Props) => {
  if (!interview) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 520 },
            p: 3,
          },
        },
      }}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 900 }}>
            {interview.candidateName}
          </Typography>

          <Typography color="text.secondary">
            {interview.candidateRole}
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
          <Chip label={interview.status} color="primary" />
          <Chip label={interview.interviewType} />
          {interview.rating && <Chip label={`${interview.rating}/5 Rating`} />}
        </Stack>

        <Divider />

        <Info icon={<Email />} label="Candidate Email" value={interview.candidateEmail} />
        <Info icon={<Person />} label="Interviewer" value={interview.interviewerName} />
        <Info icon={<Email />} label="Interviewer Email" value={interview.interviewerEmail} />
        <Info icon={<Event />} label="Date & Time" value={`${interview.interviewDate} • ${interview.interviewTime}`} />
        <Info icon={<VideoCall />} label="Meeting Link" value={interview.meetingLink || "No meeting link"} />

        <Divider />

        <Box>
          <Typography sx={{ fontWeight: 900, mb: 1 }}>
            Notes
          </Typography>

          <Typography color="text.secondary">
            {interview.notes || "No notes added"}
          </Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 900, mb: 1 }}>
            Feedback
          </Typography>

          <Typography color="text.secondary">
            {interview.feedback || "Feedback not submitted yet"}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={() => onFeedback(interview)}
        >
          Add / Edit Feedback
        </Button>
      </Stack>
    </Drawer>
  );
};

const Info = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <Stack direction="row" spacing={1.5} sx={{ alignItems: "flex-start" }}>
    <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>

    <Box>
      <Typography sx={{ fontWeight: 800, fontSize: 13 }}>
        {label}
      </Typography>

      <Typography color="text.secondary" sx={{ wordBreak: "break-word" }}>
        {value}
      </Typography>
    </Box>
  </Stack>
);

export default InterviewDetailsDrawer;