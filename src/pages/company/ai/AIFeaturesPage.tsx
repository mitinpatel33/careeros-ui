import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  AutoAwesome,
  Psychology,
  QueryStats,
  RecordVoiceOver,
} from "@mui/icons-material";

import AIResumeMatchCard from "./AIResumeMatchCard";
import AISkillGapCard from "./AISkillGapCard";
import AIInterviewQuestionsCard from "./AIInterviewQuestionsCard";

const AIFeaturesPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        AI Hiring Assistant 🤖
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Match candidates, analyze skill gaps, generate interview questions and summarize resumes.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 5,
          border: "1px solid #e5e7eb",
          mb: 3,
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h6" sx={{ fontWeight: 900 }}>
            AI Job Match
          </Typography>

          <TextField
            fullWidth
            multiline
            rows={5}
            label="Paste Job Description"
            placeholder="Example: We need React developer with Node.js, MongoDB, Docker..."
          />

          <Button
            variant="contained"
            startIcon={<AutoAwesome />}
            sx={{
              alignSelf: "flex-start",
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 800,
            }}
          >
            Analyze Candidates
          </Button>
        </Stack>
      </Paper>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6, xl: 4 }}>
          <AIResumeMatchCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 4 }}>
          <AISkillGapCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6, xl: 4 }}>
          <AIInterviewQuestionsCard />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FeatureCard
            icon={<Psychology />}
            title="AI Candidate Summary"
            description="Generate quick recruiter-friendly resume summary with strengths and risks."
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FeatureCard
            icon={<QueryStats />}
            title="AI ATS Score"
            description="Analyze resume quality, keywords, formatting and job relevance."
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <FeatureCard
            icon={<RecordVoiceOver />}
            title="AI Mock Interview"
            description="Generate mock interview questions based on resume and job role."
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
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
      <Stack direction="row" spacing={2}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 3,
            bgcolor: "primary.main",
            color: "#fff",
            display: "grid",
            placeItems: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </Box>

        <Box>
          <Typography sx={{ fontWeight: 900, fontSize: 18 }}>
            {title}
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {description}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
};

export default AIFeaturesPage;