import { Chip, Paper, Stack, Typography } from "@mui/material";

const AISkillGapCard = () => {
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
        AI Skill Gap
      </Typography>

      <Typography sx={{ fontWeight: 800, mb: 1 }}>
        Matched Skills
      </Typography>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
        {["React", "Node.js", "SQL"].map((skill) => (
          <Chip key={skill} label={skill} color="success" />
        ))}
      </Stack>

      <Typography sx={{ fontWeight: 800, mt: 3, mb: 1 }}>
        Missing Skills
      </Typography>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
        {["AWS", "Docker", "Redis"].map((skill) => (
          <Chip key={skill} label={skill} color="warning" variant="outlined" />
        ))}
      </Stack>
    </Paper>
  );
};

export default AISkillGapCard;