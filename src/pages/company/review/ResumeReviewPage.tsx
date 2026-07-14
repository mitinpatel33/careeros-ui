import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

const ResumeReviewPage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Resume Review 📄
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Review candidate resume, add notes, rating and update status.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 5 }}>
            <Stack sx={{ alignItems: "center", spacing: 2 }}>
              <Avatar sx={{ width: 90, height: 90, bgcolor: "primary.main" }}>
                M
              </Avatar>

              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                Mitin Patel
              </Typography>

              <Typography color="text.secondary">
                Full Stack Developer
              </Typography>

              <Chip label="94% Job Match" color="success" />
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 5 }}>
            <Typography sx={{ fontWeight: 900, mb: 2 }}>
              Review Notes
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={5}
              label="Add recruiter notes"
            />

            <Typography sx={{ fontWeight: 900, mt: 3, mb: 1 }}>
              Candidate Rating
            </Typography>

            <Rating defaultValue={4} />

            <Stack direction="row" sx={{ spacing: 2, mt: 3 }}>
              <Button variant="contained">Shortlist</Button>
              <Button variant="outlined">Schedule Interview</Button>
              <Button color="error" variant="outlined">Reject</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ResumeReviewPage;