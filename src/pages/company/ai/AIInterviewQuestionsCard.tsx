import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

const questions = [
  "Explain React hooks with a real project example.",
  "How do you optimize SQL stored procedures?",
  "How do you handle authentication in Node.js?",
  "Explain your experience with API integration.",
];

const AIInterviewQuestionsCard = () => {
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
        AI Interview Questions
      </Typography>

      <Stack spacing={1.5}>
        {questions.map((question, index) => (
          <Box key={question}>
            <Typography sx={{ fontSize: 14 }}>
              {index + 1}. {question}
            </Typography>

            {index !== questions.length - 1 && <Divider sx={{ mt: 1.5 }} />}
          </Box>
        ))}
      </Stack>

      <Button
        fullWidth
        variant="contained"
        sx={{ mt: 3, borderRadius: 3, textTransform: "none" }}
      >
        Generate More Questions
      </Button>
    </Paper>
  );
};

export default AIInterviewQuestionsCard;