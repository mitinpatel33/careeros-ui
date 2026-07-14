import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";

import { Send } from "@mui/icons-material";
import type { EmailTemplate } from "../../../types/email.types";

type Props = {
  open: boolean;
  template: EmailTemplate | null;
  onClose: () => void;
  onSend: (template: EmailTemplate) => void;
};

const EmailPreviewDrawer = ({
  open,
  template,
  onClose,
  onSend,
}: Props) => {
  if (!template) return null;

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
            {template.title}
          </Typography>

          <Typography color="text.secondary">
            Email template preview
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography sx={{ fontWeight: 900, mb: 1 }}>
            Subject
          </Typography>

          <Typography>{template.subject}</Typography>
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 900, mb: 1 }}>
            Body
          </Typography>

          <Typography
            color="text.secondary"
            sx={{
              whiteSpace: "pre-line",
              lineHeight: 1.8,
            }}
          >
            {template.body}
          </Typography>
        </Box>

        <Button
          fullWidth
          variant="contained"
          startIcon={<Send />}
          onClick={() => onSend(template)}
        >
          Send This Email
        </Button>
      </Stack>
    </Drawer>
  );
};

export default EmailPreviewDrawer;