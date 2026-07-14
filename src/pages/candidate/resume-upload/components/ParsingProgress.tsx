import {
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import { AutoAwesome } from "@mui/icons-material";

type Props = {
  fileName: string;
};

const ParsingProgress = ({ fileName }: Props) => {
  return (
    <Stack
      sx={{ minHeight: 380, alignItems: "center", justifyContent:"center" }}
    >
      <AutoAwesome
        sx={{
          fontSize: 78,
          color: "primary.main",
          mb: 2,
          animation: "pulse 1.4s infinite",
          "@keyframes pulse": {
            "0%": {
              transform: "scale(1)",
              opacity: 0.7,
            },
            "50%": {
              transform: "scale(1.15)",
              opacity: 1,
            },
            "100%": {
              transform: "scale(1)",
              opacity: 0.7,
            },
          },
        }}
      />

      <Typography variant="h6" sx={{ fontWeight: 900 }}>
        Extracting Resume Data...
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        Reading {fileName}
      </Typography>

      <LinearProgress
        sx={{
          width: "100%",
          maxWidth: 420,
          height: 10,
          borderRadius: 10,
        }}
      />

      <Typography color="text.secondary" sx={{ mt: 2, fontSize: 13 }}>
        Extracting personal info, skills, education, experience and projects.
      </Typography>
    </Stack>
  );
};

export default ParsingProgress;