import {
  Alert,
  Button,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  CloudUpload,
  AutoAwesome,
} from "@mui/icons-material";

type Props = {
  file: File | null;
  isParsing: boolean;
  onFileChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onParseResume: () => void;
};

const UploadResumeCard = ({
  file,
  isParsing,
  onFileChange,
  onParseResume,
}: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 5,
        border: "1px solid #e5e7eb",
        boxShadow: "0 24px 70px rgba(15,23,42,0.10)",
        textAlign: "center",
        height: "100%",
      }}
    >
      <CloudUpload
        sx={{
          fontSize: 78,
          color: "primary.main",
          mb: 2,
        }}
      />

      <Typography variant="h5" sx={{ fontWeight: 900 }}>
        Upload Existing Resume
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Supported files: PDF, DOC, DOCX, TXT
      </Typography>

      <Button
        variant="contained"
        component="label"
        size="large"
        startIcon={<CloudUpload />}
        sx={{
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 800,
        }}
      >
        Choose Resume
        <input
          hidden
          type="file"
          accept=".pdf,.doc,.docx,.txt"
          onChange={onFileChange}
        />
      </Button>

      {file && (
        <Alert
          severity="success"
          sx={{
            mt: 3,
            textAlign: "left",
            borderRadius: 3,
          }}
        >
          Selected: {file.name}
        </Alert>
      )}

      <Button
        fullWidth
        variant="outlined"
        disabled={!file || isParsing}
        onClick={onParseResume}
        startIcon={<AutoAwesome />}
        sx={{
          mt: 3,
          py: 1.3,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 800,
        }}
      >
        {isParsing
          ? "Parsing Resume..."
          : "Extract Resume Data"}
      </Button>

      <Stack sx={{ mt: 3 }} spacing={1}>
        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          After extraction, data will auto-fill Resume Builder.
        </Typography>

        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          Theme selection is only for PDF/DOCX download.
        </Typography>

        <Typography sx={{ fontSize: 13 }} color="text.secondary">
          Live resume website will use saved resume data.
        </Typography>
      </Stack>
    </Paper>
  );
};

export default UploadResumeCard;