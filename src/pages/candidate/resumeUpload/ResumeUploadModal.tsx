import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  LinearProgress,
  Stack,
  IconButton,
  Alert,
  Chip,
} from "@mui/material";
import {
  CloudUpload,
  Close,
  CheckCircle,
  AutoAwesome,
} from "@mui/icons-material";
import AppButton from "../../../components/common/AppButton";
import {
  useImportResumeMutation,
  useBulkSaveProfileMutation,
} from "../../../services/candidateprofileApi";

interface ResumeUploadModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface ApiErrorResponse {
  data?: {
    message?: string;
  };
}

export default function ResumeUploadModal({
  open,
  onClose,
  onSuccess,
}: ResumeUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [importResume, { isLoading: isParsing }] = useImportResumeMutation();
  const [bulkSaveProfile, { isLoading: isSaving }] =
    useBulkSaveProfileMutation();

  const isLoading = isParsing || isSaving;

  const processResumeUpload = async (fileToUpload: File): Promise<void> => {
    try {
      // 1. Send file to backend to parse using Gemini AI
      const importResponse = await importResume(fileToUpload).unwrap();
      
      // 2. Persist extracted JSON sections immediately to the database
      if (importResponse.data) {
        await bulkSaveProfile(importResponse.data).unwrap();
      }

      setFile(null);
      onClose();
      if (onSuccess) onSuccess();
    } catch (err: unknown) {
      const error = err as ApiErrorResponse;
      setErrorMsg(error?.data?.message || "An error occurred while uploading.");
      console.error("Failed to import resume:", err);
    }
  };

  // Keep handleSubmit as an optional fallback or remove it if auto-upload is preferred
  const handleSubmit = async (): Promise<void> => {
    if (file) {
      await processResumeUpload(file);
    }
  };

  const handleFile = async (selectedFile: File): Promise<void> => {
    setErrorMsg(null);
    const validMimes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
    ];

    if (!validMimes.includes(selectedFile.type)) {
      setErrorMsg("Please provide a PDF or Word document (.pdf, .docx).");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setErrorMsg("File size must not exceed 10 MB.");
      return;
    }

    setFile(selectedFile);

    // Automatically trigger parsing and saving right after successful file validation
    await processResumeUpload(selectedFile);
  };

  // const handleSubmit = async (): Promise<void> => {
  //   if (!file) return;
  //   try {
  //     // 1. Send file to backend to parse using Gemini AI
  //     const importResponse = await importResume(file).unwrap();

  //     // 2. Persist extracted JSON sections immediately to the database
  //     if (importResponse.data) {
  //       await bulkSaveProfile(importResponse.data).unwrap();
  //     }

  //     setFile(null);
  //     onClose();
  //     if (onSuccess) onSuccess();
  //   } catch (err: unknown) {
  //     const error = err as ApiErrorResponse;
  //     setErrorMsg(error?.data?.message || "An error occurred while uploading.");
  //     console.error("Failed to import resume:", err);
  //   }
  // };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isLoading ? undefined : onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
          <AutoAwesome color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Import Resume (AI Powered)
          </Typography>
        </Stack>
        <IconButton onClick={onClose} disabled={isLoading}>
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {errorMsg && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {errorMsg}
          </Alert>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleInputChange}
          accept=".pdf,.doc,.docx"
          style={{ display: "none" }}
        />

        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !isLoading && fileInputRef.current?.click()}
          sx={{
            border: "2px dashed",
            borderColor: isDragging
              ? "primary.main"
              : file
                ? "success.main"
                : "grey.400",
            borderRadius: 3,
            p: 4,
            textAlign: "center",
            bgcolor: isDragging ? "action.hover" : "background.default",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {file ? (
            <Stack sx={{ alignItems: "center" }} spacing={1}>
              <CheckCircle color="success" sx={{ fontSize: 48 }} />
              <Typography sx={{ fontWeight: 600 }}>{file.name}</Typography>
              <Chip
                label={`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                size="small"
              />
            </Stack>
          ) : (
            <Stack sx={{ alignItems: "center" }} spacing={1}>
              <CloudUpload color="primary" sx={{ fontSize: 48 }} />
              <Typography sx={{ fontWeight: 600 }}>
                Drag & drop resume here
              </Typography>
              <Typography variant="body2" color="text.secondary">
                PDF or Word documents up to 10MB
              </Typography>
              <AppButton
                variant="outlined"
                fullWidth={false}
                sx={{ mt: 1, height: 36, borderRadius: "8px" }}
              >
                Browse File
              </AppButton>
            </Stack>
          )}
        </Box>

        {isLoading && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="body2"
              color="primary"
              sx={{ fontWeight: 600, mb: 1 }}
            >
              {isParsing
                ? "Parsing document with AI..."
                : "Saving details to your profile..."}
            </Typography>
            <LinearProgress sx={{ borderRadius: 2, height: 6 }} />
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <AppButton
          variant="text"
          color="primary"
          fullWidth={false}
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </AppButton>
        <AppButton
          variant="contained"
          color="primary"
          fullWidth={false}
          loading={isLoading}
          disabled={!file}
          onClick={handleSubmit}
          startIcon={<AutoAwesome />}
        >
          Import & Fill Profile
        </AppButton>
      </DialogActions>
    </Dialog>
  );
}
