import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
  Avatar,
} from "@mui/material";
import {
  Edit,
  Email,
  Phone,
  LocationOn,
  Work,
  School,
  Psychology,
  WorkspacePremium,
  FolderSpecial,
  Person,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionCard = motion(Card);

const candidate = {
  firstName: "Mitin",
  lastName: "Patel",
  jobTitle: "Full Stack Developer",
  summary:
    "Experienced Full Stack Developer specialized in React.js, Node.js, .NET Core, SQL Server, and modern web applications.",
  email: "mitinpatel@gmail.com",
  mobile: "+91 98765 43210",
  city: "Surat",
  state: "Gujarat",
  skills: ["React.js", "Node.js", ".NET Core", "SQL Server", "MongoDB"],
  educations: [
    {
      degree: "BCA",
      university: "XYZ University",
      year: "2021",
    },
  ],
  experience: [
    {
      role: "Full Stack Developer",
      company: "ABC Infotech",
      duration: "2023 - Present",
    },
  ],
  projects: ["Resume Builder", "CelestialVeils", "Job Portal"],
  certificates: ["React Developer Certificate", ".NET Core API Certificate"],
};

const sectionAnimation = {
  hidden: { opacity: 0, y: 35 },
  visible: { opacity: 1, y: 0 },
};

const InfoCard = ({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <MotionCard
      variants={sectionAnimation}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ duration: 0.3 }}
      sx={{
        p: 3,
        borderRadius: 5,
        height: "100%",
        boxShadow: "0 20px 45px rgba(15,23,42,0.08)",
        border: "1px solid rgba(226,232,240,0.9)",
      }}
    >
      <Stack direction="row" sx={{ alignItems: "center",  mb:2 }} spacing={1.5}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: "14px",
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg,#667eea,#764ba2)",
            color: "#fff",
          }}
        >
          {icon}
        </Box>

        <Typography sx={{ fontWeight: 800, fontSize: 18 }}>
          {title}
        </Typography>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {children}
    </MotionCard>
  );
};

export default function CandidateProfileView() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, sm: 3, md: 4 },
        background:
          "linear-gradient(135deg, #eef5ff 0%, #f7f3ff 45%, #ffffff 100%)",
      }}
    >
      <MotionBox
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        sx={{
          maxWidth: 1200,
          mx: "auto",
        }}
      >
        {/* Profile Hero */}
        <Box
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 6,
            color: "#fff",
            background:
              "linear-gradient(135deg, #111827 0%, #1e293b 60%, #312e81 100%)",
            boxShadow: "0 25px 60px rgba(15,23,42,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              right: -60,
              top: -60,
            }}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            sx={{
              alignItems: { xs: "center", sm: "flex-start" },
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              sx={{ alignItems: "center" }}
              spacing={3}
            >
              <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: 36,
                    fontWeight: 800,
                    bgcolor: "rgba(255,255,255,0.18)",
                    border: "3px solid rgba(255,255,255,0.45)",
                  }}
                >
                  MP
                </Avatar>
              </motion.div>

              <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                <Typography sx={{ fontSize: { xs: 28, md: 42 }, fontWeight: 900 }}>
                  {candidate.firstName} {candidate.lastName}
                </Typography>

                <Typography sx={{ color: "rgba(255,255,255,0.75)", fontSize: 18 }}>
                  {candidate.jobTitle}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flexWrap: "wrap", mt: 2, justifyContent: { xs: "center", sm: "flex-start" } }}
                >
                  <Chip label="Open to Work" color="success" />
                  <Chip label="ATS Ready" color="primary" />
                </Stack>
              </Box>
            </Stack>

            <Button
              startIcon={<Edit />}
              variant="contained"
              onClick={() => navigate("/candidate/profile")}
              sx={{
                borderRadius: 3,
                px: 3,
                py: 1.2,
                fontWeight: 800,
                bgcolor: "#fff",
                color: "#111827",
                "&:hover": {
                  bgcolor: "#f1f5f9",
                },
              }}
            >
              Edit Profile
            </Button>
          </Stack>
        </Box>

        {/* Details Sections */}
        <MotionBox
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          initial="hidden"
          animate="visible"
          sx={{ mt: 4 }}
        >
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard icon={<Person />} title="Personal Details">
                <Typography sx={{ fontWeight: 700 }}>Full Name</Typography>
                <Typography sx={{ mb: 2 }}>
                  {candidate.firstName} {candidate.lastName}
                </Typography>

                <Typography sx={{ fontWeight: 700 }}>Job Title</Typography>
                <Typography>{candidate.jobTitle}</Typography>
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard icon={<Email />} title="Contact Details">
                <Stack spacing={1.5}>
                  <Stack direction="row" spacing={1}>
                    <Email fontSize="small" />
                    <Typography>{candidate.email}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <Phone fontSize="small" />
                    <Typography>{candidate.mobile}</Typography>
                  </Stack>

                  <Stack direction="row" spacing={1}>
                    <LocationOn fontSize="small" />
                    <Typography>
                      {candidate.city}, {candidate.state}
                    </Typography>
                  </Stack>
                </Stack>
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InfoCard icon={<Psychology />} title="Professional Summary">
                <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>
                  {candidate.summary}
                </Typography>
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard icon={<Psychology />} title="Skills">
                <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                  {candidate.skills.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      sx={{
                        fontWeight: 700,
                        borderRadius: 2,
                        bgcolor: "#eef2ff",
                        color: "#4338ca",
                      }}
                    />
                  ))}
                </Stack>
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard icon={<School />} title="Education">
                {candidate.educations.map((edu, index) => (
                  <Box key={index}>
                    <Typography sx={{ fontWeight: 800 }}>{edu.degree}</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {edu.university} • {edu.year}
                    </Typography>
                  </Box>
                ))}
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard icon={<Work />} title="Experience">
                {candidate.experience.map((exp, index) => (
                  <Box key={index}>
                    <Typography sx={{ fontWeight: 800 }}>{exp.role}</Typography>
                    <Typography sx={{ color: "text.secondary" }}>
                      {exp.company} • {exp.duration}
                    </Typography>
                  </Box>
                ))}
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <InfoCard icon={<FolderSpecial />} title="Projects">
                <Stack spacing={1}>
                  {candidate.projects.map((project) => (
                    <Typography key={project}>🚀 {project}</Typography>
                  ))}
                </Stack>
              </InfoCard>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InfoCard icon={<WorkspacePremium />} title="Certificates">
                <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
                  {candidate.certificates.map((cert) => (
                    <Chip key={cert} label={cert} variant="outlined" />
                  ))}
                </Stack>
              </InfoCard>
            </Grid>
          </Grid>
        </MotionBox>
      </MotionBox>
    </Box>
  );
}