import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

import {
  Business,
  Verified,
  UploadFile,
} from "@mui/icons-material";

const CompanyProfilePage = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        Company Profile 🏢
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Manage company details and verification.
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Paper sx={{ p: 3, borderRadius: 5 }}>
            <Stack sx={{ alignItems: "center" }} spacing={2}>
              <Avatar sx={{ width: 110, height: 110, bgcolor: "primary.main" }}>
                <Business fontSize="large" />
              </Avatar>

              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                ABC Technologies
              </Typography>

              <Chip
                icon={<Verified />}
                label="Verification Pending"
                color="warning"
                sx={{ fontWeight: 800 }}
              />

              <Button variant="outlined" startIcon={<UploadFile />}>
                Upload Logo
              </Button>
            </Stack>
          </Paper>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Paper sx={{ p: 3, borderRadius: 5 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Company Name" />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Website" />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Industry" />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Company Size" />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Company Email" />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField fullWidth label="Location" />
              </Grid>

              <Grid size={{ xs: 12 }}>
                <TextField fullWidth label="About Company" multiline rows={5} />
              </Grid>
            </Grid>

            <Stack direction="row" sx={{ justifyContent: "flex-end", mt: 3 }}>
              <Button variant="contained">Save Company Profile</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyProfilePage;