import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

import {
  Download,
  Event,
  Star,
} from "@mui/icons-material";


type Props = {
  open: boolean;
  candidate: any | null;
  onClose: () => void;
  onShortlist: (id: string) => void;
};

const CandidateDetailsDrawer = ({
  open,
  candidate,
  onClose,
  onShortlist,
}: Props) => {
  if (!candidate) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: 520 },
          p: 3,
        },
      }}
    >
      <Stack spacing={2.5}>
        <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
          <Avatar sx={{ width: 64, height: 64, bgcolor: "primary.main" }}>
            {candidate.name[0]}
          </Avatar>

          <Box>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              {candidate.name}
            </Typography>

            <Typography color="text.secondary">
              {candidate.role} • {candidate.location}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
          <Chip
            icon={<Star />}
            label={`${candidate.match}% Match`}
            color="success"
            sx={{ fontWeight: 800 }}
          />
          <Chip label={`ATS ${candidate.atsScore}%`} color="primary" />
          <Chip label={candidate.status} />
        </Stack>

        <Box>
          <Typography sx={{ fontWeight: 900, mb: 1 }}>
            Match Score
          </Typography>

          <LinearProgress
            value={candidate.match}
            variant="determinate"
            sx={{
              height: 10,
              borderRadius: 99,
            }}
          />
        </Box>

        <Divider />

        <Section title="Contact">
          <Typography>Email: {candidate.email}</Typography>
          <Typography>Phone: {candidate.phone}</Typography>
        </Section>

        <Section title="Profile Summary">
          <Typography color="text.secondary">
            {candidate.summary}
          </Typography>
        </Section>

        <Section title="Skills">
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
            {candidate.skills.map((skill: any) => (
              <Chip key={skill} label={skill} variant="outlined" />
            ))}
          </Stack>
        </Section>

        <Section title="AI Matched Skills">
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
            {candidate.matchedSkills.map((skill: any) => (
              <Chip
                key={skill}
                label={skill}
                color="success"
                variant="outlined"
              />
            ))}
          </Stack>
        </Section>

        <Section title="Missing Skills">
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
            {candidate.missingSkills.map((skill: any) => (
              <Chip
                key={skill}
                label={skill}
                color="warning"
                variant="outlined"
              />
            ))}
          </Stack>
        </Section>

        <Section title="Other Details">
          <Typography>Experience: {candidate.experience}</Typography>
          <Typography>Expected Salary: {candidate.expectedSalary}</Typography>
          <Typography>Availability: {candidate.availability}</Typography>
          <Typography>Education: {candidate.education}</Typography>
        </Section>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
          <Button fullWidth variant="outlined" startIcon={<Download />}>
            Download Resume
          </Button>

          <Button fullWidth variant="outlined" startIcon={<Event />}>
            Schedule Interview
          </Button>
        </Stack>

        <Button
          fullWidth
          variant="contained"
          onClick={() => onShortlist(candidate.id)}
        >
          Shortlist Candidate
        </Button>
      </Stack>
    </Drawer>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box>
    <Typography sx={{ fontWeight: 900, mb: 1 }}>
      {title}
    </Typography>
    {children}
  </Box>
);

export default CandidateDetailsDrawer;