import {
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  Edit,
  Email,
  Send,
  Visibility,
} from "@mui/icons-material";

import type { EmailTemplate } from "../../../types/email.types";

type Props = {
  template: EmailTemplate;
  onEdit: (template: EmailTemplate) => void;
  onSend: (template: EmailTemplate) => void;
  onPreview: (template: EmailTemplate) => void;
};

const EmailTemplateCard = ({
  template,
  onEdit,
  onSend,
  onPreview,
}: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        height: "100%",
        borderRadius: 5,
        border: "1px solid #e5e7eb",
        boxShadow: "0 18px 45px rgba(15,23,42,.08)",
      }}
    >
      <Stack spacing={2}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 3,
            bgcolor: "#eff6ff",
            color: "primary.main",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Email />
        </Box>

        <Box>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            {template.title}
          </Typography>

          <Typography color="text.secondary">
            Ready-to-use candidate email template.
          </Typography>
        </Box>

        <Chip
          label={template.category}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ width: "fit-content", fontWeight: 800 }}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => onPreview(template)}
          >
            Preview
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Edit />}
            onClick={() => onEdit(template)}
          >
            Edit
          </Button>

          <Button
            fullWidth
            variant="contained"
            startIcon={<Send />}
            onClick={() => onSend(template)}
          >
            Send
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default EmailTemplateCard;