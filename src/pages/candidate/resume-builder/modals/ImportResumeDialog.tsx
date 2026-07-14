import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  AutoAwesome,
  CloudUpload,
  Close,
} from "@mui/icons-material";

import { useState } from "react";

type ParsedResumeData = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  summary: string;
  skills: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onParsedData: (data: ParsedResumeData) => void;
};

const ImportResumeDialog = ({
  open,
  onClose,
  onParsedData,
}: Props) => {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
  };

  const handleParse = () => {
    if (!file) return;

    setIsParsing(true);

    setTimeout(() => {
      const parsedData: ParsedResumeData = {
        fullName: "Mitin Patel",
        email: "mitin@example.com",
        phone: "9876543210",
        location: "Surat, Gujarat",
        jobTitle: "Full Stack Developer",
        summary:
          "Experienced full stack developer skilled in React.js, Node.js, TypeScript, .NET Core and SQL Server.",
        skills:
          "React.js, Node.js, TypeScript, .NET Core, SQL Server, MongoDB",
      };

      onParsedData(parsedData);
      setIsParsing(false);
      setFile(null);
      onClose();
    }, 1500);
  };

  return (
    <Dialog
      open={open}
      onClose={isParsing ? undefined : onClose}
      fullWidth
      maxWidth="sm"
      slotProps={{
        paper: {
          sx: {
            borderRadius: 5,
          },
        },
      }}
    >
      <DialogTitle>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            Import Existing Resume
          </Typography>

          <Button
            onClick={onClose}
            disabled={isParsing}
            sx={{ minWidth: 0 }}
          >
            <Close />
          </Button>
        </Stack>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              textAlign: "center",
              borderRadius: 4,
              border: "2px dashed #c7d2fe",
              bgcolor: "#f8fafc",
            }}
          >
            <CloudUpload
              sx={{
                fontSize: 72,
                color: "primary.main",
                mb: 2,
              }}
            />

            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              Upload Resume File
            </Typography>

            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Supported files: PDF, DOC, DOCX, TXT
            </Typography>

            <Button
              variant="contained"
              component="label"
              disabled={isParsing}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: 800,
              }}
            >
              Choose File
              <input
                hidden
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
            </Button>
          </Paper>

          {file && (
            <Alert severity="success">
              Selected file: {file.name}
            </Alert>
          )}

          {isParsing && (
            <Box>
              <Stack direction="row" sx={{ spacing: 1, alignItems: "center", mb: 1 }} >
                <AutoAwesome color="primary" />
                <Typography sx={{ fontWeight: 800 }}>
                  Extracting resume data...
                </Typography>
              </Stack>

              <LinearProgress
                sx={{
                  height: 10,
                  borderRadius: 10,
                }}
              />
            </Box>
          )}

          <Stack direction="row" sx={{ justifyContent: "flex-end", spacing:2 }} >
            <Button
              variant="outlined"
              onClick={onClose}
              disabled={isParsing}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleParse}
              disabled={!file || isParsing}
              startIcon={<AutoAwesome />}
            >
              Extract & Auto-fill
            </Button>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default ImportResumeDialog;