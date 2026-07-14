import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Close, RateReview } from "@mui/icons-material";
import { useEffect, useState } from "react";
import type { InterviewItem } from "../../../types/interview.types";

type Props = {
  open: boolean;
  interview: InterviewItem | null;
  onClose: () => void;
  onSave: (id: string, rating: number, feedback: string) => void;
};

const FeedbackDialog = ({
  open,
  interview,
  onClose,
  onSave,
}: Props) => {
  const [rating, setRating] = useState<number>(3);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (interview) {
      setRating(interview.rating || 3);
      setFeedback(interview.feedback || "");
    }
  }, [interview]);

  const handleSave = () => {
    if (!interview) return;

    onSave(interview.id, rating, feedback);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ p: 3 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "#fff",
                display: "grid",
                placeItems: "center",
              }}
            >
              <RateReview />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                Interview Feedback
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                {interview?.candidateName}
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Box>
            <Typography sx={{ fontWeight: 800, mb: 1 }}>
              Candidate Rating
            </Typography>

            <Rating
              value={rating}
              onChange={(_, value) => setRating(value || 1)}
              size="large"
            />
          </Box>

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Feedback Notes"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "flex-end" }}
          >
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>

            <Button variant="contained" onClick={handleSave}>
              Save Feedback
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;