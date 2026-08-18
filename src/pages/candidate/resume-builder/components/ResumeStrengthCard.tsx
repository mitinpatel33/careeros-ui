import { Box, LinearProgress, Paper, Stack, Typography } from "@mui/material";
import AutoGraphRoundedIcon from "@mui/icons-material/AutoGraphRounded";
import type { ResumeData } from "../../../../types/candidate/resume.types";

type Props = {
  data: ResumeData;
};

const ResumeStrengthCard = ({ data }: Props) => {
  const score =
    20 +
    (data.summary ? 15 : 0) +
    (data.skills?.length ? 15 : 0) +
    (data.experience?.length ? 20 : 0) +
    (data.education?.length ? 10 : 0) +
    (data.projects?.length ? 10 : 0)
    // (data.contact?.linkedIn ? 5 : 0) +
    // (data.contact?.github ? 5 : 0);

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 4,
        border: "1px solid #e5e7eb",
        boxShadow: "0 12px 35px rgba(15,23,42,0.08)",
      }}
    >
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 3,
            bgcolor: "#eff6ff",
            display: "grid",
            placeItems: "center",
          }}
        >
          <AutoGraphRoundedIcon color="primary" />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Stack direction="row" sx={{ justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 950 }}>Resume Strength</Typography>
            <Typography sx={{ fontWeight: 950, color: "primary" }}>
              {score}%
            </Typography>
          </Stack>

          <LinearProgress
            value={score}
            variant="determinate"
            sx={{ height: 8, borderRadius: 10, mt: 1 }}
          />

          <Typography color="text.secondary" sx={{ mt: 0.8, fontSize: 12 }}>
            {score >= 80
              ? "Strong resume. Ready to download ✨"
              : "Add more sections to improve your resume."}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default ResumeStrengthCard;