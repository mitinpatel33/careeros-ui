import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  CalendarMonth,
  MoreVert,
  Person,
  VideoCall,
} from "@mui/icons-material";

import { useState } from "react";
import type { InterviewItem } from "../../../types/interview.types";

type Props = {
  interview: InterviewItem;
  onView: (interview: InterviewItem) => void;
  onFeedback: (interview: InterviewItem) => void;
  onCancel: (id: string) => void;
};

const InterviewCard = ({
  interview,
  onView,
  onFeedback,
  onCancel,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 5,
        border: "1px solid #e5e7eb",
        boxShadow: "0 18px 45px rgba(15,23,42,.08)",
        height: "100%",
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 3,
              bgcolor: "#eff6ff",
              color: "primary.main",
              display: "grid",
              placeItems: "center",
            }}
          >
            <CalendarMonth />
          </Box>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
        </Stack>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {interview.candidateName}
          </Typography>

          <Typography color="text.secondary">
            {interview.candidateRole}
          </Typography>
        </Box>

        <Stack spacing={1}>
          <Info
            icon={<CalendarMonth />}
            value={`${interview.interviewDate} • ${interview.interviewTime}`}
          />

          <Info
            icon={<Person />}
            value={`Interviewer: ${interview.interviewerName}`}
          />

          <Info
            icon={<VideoCall />}
            value={interview.interviewType}
          />
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
          <Chip
            label={interview.status}
            color={
              interview.status === "Completed"
                ? "success"
                : interview.status === "Cancelled"
                ? "error"
                : interview.status === "Pending Feedback"
                ? "warning"
                : "primary"
            }
            sx={{ fontWeight: 800 }}
          />

          {interview.rating && (
            <Chip label={`${interview.rating}/5 Rating`} variant="outlined" />
          )}
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button fullWidth variant="outlined" onClick={() => onFeedback(interview)}>
            Feedback
          </Button>

          <Button fullWidth variant="contained" onClick={() => onView(interview)}>
            View
          </Button>
        </Stack>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            onView(interview);
            setAnchorEl(null);
          }}
        >
          View Details
        </MenuItem>

        <MenuItem
          onClick={() => {
            onFeedback(interview);
            setAnchorEl(null);
          }}
        >
          Add Feedback
        </MenuItem>

        <MenuItem
          sx={{ color: "error.main" }}
          onClick={() => {
            onCancel(interview.id);
            setAnchorEl(null);
          }}
        >
          Cancel Interview
        </MenuItem>
      </Menu>
    </Paper>
  );
};

const Info = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) => (
  <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
    <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
    <Typography sx={{ fontSize: 14 }}>{value}</Typography>
  </Stack>
);

export default InterviewCard;