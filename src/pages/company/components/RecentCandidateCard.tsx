import {
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

type Candidate = {
  name: string;
  role: string;
  location: string;
  match: number;
  skills: string[];
};

type Props = {
  candidate: Candidate;
};

const RecentCandidateCard = ({ candidate }: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        sx={{ justifyContent: "space-between", spacing: 2 }}
      >
        <Stack direction="row" spacing={2}>
          <Avatar sx={{ bgcolor: "primary.main" }}>
            {candidate.name[0]}
          </Avatar>

          <Box>
            <Typography sx={{ fontWeight: 900 }}>
              {candidate.name}
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: 14 }}>
              {candidate.role} • {candidate.location}
            </Typography>

            <Stack direction="row" sx={{ spacing: 1, mt: 1, flexWrap: "wrap" }} useFlexGap>
              {candidate.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Stack>
          </Box>
        </Stack>

        <Stack sx={{ alignItems: { xs: "flex-start", sm: "flex-end" }, spacing: 1 }}>
          <Chip
            label={`${candidate.match}% Match`}
            color="success"
            sx={{ fontWeight: 800 }}
          />

          <Button variant="contained" size="small">
            Review
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RecentCandidateCard;