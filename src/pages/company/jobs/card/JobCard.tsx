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
  onDuplicate: (job: JobItem) => void;
  onToggleStatus: (job: JobItem) => void;
  onDelete: (id: string) => void;
};

const JobCard = ({
  job,
  onView,
  onEdit,
  onDuplicate,
  onToggleStatus,
  onDelete,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

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
              {job.title}
            </Typography>

            <Typography color="text.secondary" sx={{ fontSize: 14 }}>
              {job.department} • {job.employmentType}
            </Typography>
          </Box>

          <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
            <Chip
              label={job.status}
              color={job.status === "Open" ? "success" : "default"}
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
          {job.skills.map((skill: any) => (
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
          <Info icon={<LocationOn />} label={job.location} />
          <Info icon={<Work />} label={`${job.experience} • ${job.workMode}`} />
          <Info
            icon={<Payments />}
            label={`₹${job.salaryMin} - ₹${job.salaryMax}`}
          />
          <Info icon={<Groups />} label={`${job.applications} Applications`} />
        </Box>

        <Typography color="text.secondary" sx={{ fontSize: 14 }}>
          {job.description}
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
            onDuplicate(job);
            setAnchorEl(null);
          }}
        >
          Duplicate Job
        </MenuItem>

        <MenuItem
          onClick={() => {
            onToggleStatus(job);
            setAnchorEl(null);
          }}
        >
          {job.status === "Open" ? "Close Job" : "Reopen Job"}
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete(job.id);
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
