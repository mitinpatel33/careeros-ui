import { Button, Stack } from "@mui/material";

import {
  Edit,
  Public,
  Download,
} from "@mui/icons-material";

type Props = {
  onAutoFill: () => void;
  onGenerateLiveLink: () => void;
  onChooseTheme?: () => void;
};

const UploadResultActions = ({
  onAutoFill,
  onGenerateLiveLink,
  onChooseTheme,
}: Props) => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
    >
      <Button
        variant="contained"
        startIcon={<Edit />}
        onClick={onAutoFill}
        sx={{
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 800,
        }}
      >
        Auto-fill Resume Builder
      </Button>

      <Button
        variant="outlined"
        startIcon={<Public />}
        onClick={onGenerateLiveLink}
        sx={{
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 800,
        }}
      >
        Generate Live Link
      </Button>

      <Button
        variant="outlined"
        startIcon={<Download />}
        onClick={onChooseTheme}
        sx={{
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 800,
        }}
      >
        Choose Download Theme
      </Button>
    </Stack>
  );
};

export default UploadResultActions;