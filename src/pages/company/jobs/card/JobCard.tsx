import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {
  MoreVert,
  LocationOn,
  Work,
  Payments,
  Groups,
} from "@mui/icons-material";
import { useState } from "react";
import type { JobItem } from "../../../../types/company.types";

type Props = {
  job: JobItem;
  onView: (job: JobItem) => void;
  onEdit: (job: JobItem) => void;
  onToggleStatus: (job: JobItem) => void;
  onDelete: (id: string) => void;
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active":
      return "success";
    case "Draft":
      return "warning";
    case "Closed":
      return "error";
    case "Archived":
      return "default";
    default:
      return "default";
  }
};

const JobCard = ({
  job,
  onView,
  onEdit,
  onToggleStatus,
  onDelete,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const salaryDisplay =
    job.minimumSalary || job.maximumSalary
      ? `${job.salaryCurrency || "$"} ${job.minimumSalary?.toLocaleString() || 0} - ${job.maximumSalary?.toLocaleString() || 0} / ${job.salaryPeriod || "yr"}`
      : "Not disclosed";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 5,
        border: "1px solid #e5e7eb",
        boxShadow: "0 18px 45px rgba(15,23,42,.08)",
        height: "100%",
      }}
    >
      <Stack spacing={2}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }} spacing={2}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 900 }}>
              {job.jobTitle}
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: 14 }}>
              {job.department || "General"} • {job.jobType}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
            <Chip
              label={job.status}
              color={getStatusColor(job.status)}
              sx={{ fontWeight: 800 }}
            />

            <IconButton
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <MoreVert />
            </IconButton>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }} useFlexGap>
          {job.skills?.map((skill: string) => (
            <Chip key={skill} label={skill} size="small" variant="outlined" />
          ))}
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.5,
          }}
        >
          <Info icon={<LocationOn />} label={job.location || "Remote / Undefined"} />
          <Info icon={<Work />} label={`${job.experience || "N/A"} • ${job.workplaceType}`} />
          <Info icon={<Payments />} label={salaryDisplay} />
          <Info icon={<Groups />} label={`${job.applicationsCount || 0} Applications`} />
        </Box>

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
          {job.jobDescription}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Button fullWidth variant="outlined" onClick={() => onView(job)}>
            View
          </Button>

          <Button fullWidth variant="contained" onClick={() => onEdit(job)}>
            Edit
          </Button>
        </Stack>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={() => {
            onView(job);
            setAnchorEl(null);
          }}
        >
          View Details
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEdit(job);
            setAnchorEl(null);
          }}
        >
          Edit Job
        </MenuItem>

        <MenuItem
          onClick={() => {
            onToggleStatus(job);
            setAnchorEl(null);
          }}
        >
          {job.status === "Active" ? "Close Job" : "Activate Job"}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete(job._id);
            setAnchorEl(null);
          }}
          sx={{ color: "error.main" }}
        >
          Delete Job
        </MenuItem>
      </Menu>
    </Paper>
  );
};

const Info = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <Stack
    direction="row"
    spacing={0.8}
    sx={{
      p: 1.2,
      borderRadius: 3,
      bgcolor: "#f8fafc",
      border: "1px solid #e5e7eb",
      minHeight: 44,
      alignItems: "center",
    }}
  >
    <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>

    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{label}</Typography>
  </Stack>
);

export default JobCard;
