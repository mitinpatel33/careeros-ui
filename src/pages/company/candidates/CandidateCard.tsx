import {
  Avatar,
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  Bookmark,
  BookmarkBorder,
  Visibility,
  Star,
} from "@mui/icons-material";

type Props = {
  candidate: any;
  onView: (candidate: any) => void;
  onShortlist: (id: string) => void;
  onSave: (id: string) => void;
};

const CandidateCard = ({
  candidate,
  onView,
  onShortlist,
  onSave,
}: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 5,
        border: "1px solid #e5e7eb",
        boxShadow: "0 18px 45px rgba(15,23,42,.08)",
        height: "100%",
        transition: "all .25s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 24px 70px rgba(15,23,42,.12)",
        },
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1.5} sx={{ minWidth: 0 }}>
            <Avatar sx={{ bgcolor: "primary.main", fontWeight: 900 }}>
              {candidate.name[0]}
            </Avatar>

            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 900 }}>
                {candidate.name}
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                {candidate.role} • {candidate.location}
              </Typography>
            </Box>
          </Stack>

          <Chip
            icon={<Star />}
            label={`${candidate.match}% Match`}
            color="success"
            sx={{
              fontWeight: 900,
              flexShrink: 0,
            }}
          />
        </Stack>

        <Box>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.7  }}>
            <Typography sx={{ fontSize: 12, fontWeight: 800 }}>
              AI Match
            </Typography>

            <Typography sx={{ fontSize: 12, fontWeight: 900 }}>
              {candidate.match}%
            </Typography>
          </Stack>

          <LinearProgress
            value={candidate.match}
            variant="determinate"
            sx={{
              height: 8,
              borderRadius: 99,
            }}
          />
        </Box>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
          {candidate.skills.slice(0, 5).map((skill: any) => (
            <Chip key={skill} label={skill} size="small" variant="outlined" />
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1.2}
          sx={{ flexWrap: "wrap" }}
          useFlexGap
        >
          <Chip label={candidate.experience} size="small" />
          <Chip label={candidate.expectedSalary} size="small" />
          <Chip label={candidate.availability} size="small" />
        </Stack>

        <Typography
          color="text.secondary"
          sx={{
            fontSize: 14,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {candidate.summary}
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<Visibility />}
            onClick={() => onView(candidate)}
          >
            View Resume
          </Button>

          <Button
            fullWidth
            variant="contained"
            onClick={() => onShortlist(candidate.id)}
          >
            Shortlist
          </Button>

          <Button
            variant="outlined"
            onClick={() => onSave(candidate.id)}
            sx={{
              minWidth: { xs: "100%", sm: 44 },
            }}
          >
            {candidate.saved ? <Bookmark /> : <BookmarkBorder />}
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CandidateCard;