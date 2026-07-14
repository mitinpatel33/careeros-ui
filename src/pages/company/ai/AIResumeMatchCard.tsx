import {
  Avatar,
  Box,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const AIResumeMatchCard = () => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 5,
        border: "1px solid #e5e7eb",
        height: "100%",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 900, mb: 2 }}>
        Top AI Match
      </Typography>

      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "primary.main" }}>M</Avatar>

        <Box>
          <Typography sx={{ fontWeight: 900 }}>Mitin Patel</Typography>
          <Typography color="text.secondary" sx={{ fontSize: 14 }}>
            Full Stack Developer
          </Typography>
        </Box>
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: 800 }}>Match Score</Typography>
          <Typography sx={{ fontWeight: 900 }}>94%</Typography>
        </Stack>

        <LinearProgress
          variant="determinate"
          value={94}
          sx={{ mt: 1, height: 10, borderRadius: 99 }}
        />
      </Box>

      <Stack direction="row" spacing={1} useFlexGap sx={{ mt: 2, flexWrap: "wrap" }}>
        {["React", "Node.js", "SQL", "MongoDB"].map((skill) => (
          <Chip key={skill} label={skill} color="success" variant="outlined" />
        ))}
      </Stack>
    </Paper>
  );
};

export default AIResumeMatchCard;