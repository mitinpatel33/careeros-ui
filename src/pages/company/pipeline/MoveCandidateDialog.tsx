import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import type {
  PipelineCandidate,
  PipelineStage,
} from "../../../types/pipeline.types";

type Props = {
  open: boolean;
  candidate: PipelineCandidate | null;
  onClose: () => void;
  onMove: (
    candidateId: string,
    stage: PipelineStage
  ) => void;
};

const stages: PipelineStage[] = [
  "Applied",
  "Reviewed",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
];

const MoveCandidateDialog = ({
  open,
  candidate,
  onClose,
  onMove,
}: Props) => {
  const [selectedStage, setSelectedStage] =
    useState<PipelineStage>("Applied");

  useEffect(() => {
    if (candidate) {
      setSelectedStage(candidate.currentStage);
    }
  }, [candidate]);

  const handleMove = () => {
    if (!candidate) return;

    onMove(candidate.id, selectedStage);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: 900 }}>
        Move Candidate
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2.5} sx={{ mt: 1 }}>
          <Typography color="text.secondary">
            Move{" "}
            <strong>{candidate?.name}</strong> to
            another hiring stage.
          </Typography>

          <TextField
            select
            fullWidth
            label="Pipeline Stage"
            value={selectedStage}
            onChange={(event) =>
              setSelectedStage(
                event.target.value as PipelineStage
              )
            }
          >
            {stages.map((stage) => (
              <MenuItem
                key={stage}
                value={stage}
              >
                {stage}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          variant="outlined"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={handleMove}
          disabled={
            !candidate ||
            candidate.currentStage === selectedStage
          }
        >
          Move Candidate
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MoveCandidateDialog;