import {
  Avatar,
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
  Shield,
  Work,
  Visibility,
  Event,
  EmojiEvents,
} from "@mui/icons-material";

import { useState } from "react";
import type { CompanyUser } from "../../../../types/companyUser.types";

type Props = {
  user: CompanyUser;
  onPermission: (user: CompanyUser) => void;
  onDeactivate: (id: string) => void;
};

const CompanyUserCard = ({
  user,
  onPermission,
  onDeactivate,
}: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const fullName = `${user.firstName} ${user.lastName}`;

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
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
          <Stack direction="row" spacing={1.5}>
            <Avatar sx={{ bgcolor: "primary.main", fontWeight: 900 }}>
              {user.firstName[0]}
            </Avatar>

            <Box>
              <Typography sx={{ fontWeight: 900 }}>{fullName}</Typography>
              <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                {user.email}
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap"}} useFlexGap>
          <Chip label={user.role} color="primary" variant="outlined" />
          <Chip
            label={user.status}
            color={
              user.status === "Active"
                ? "success"
                : user.status === "Pending"
                ? "warning"
                : "default"
            }
          />
          <Chip label={user.department} />
        </Stack>

        <Box
          sx={{
            p: 2,
            borderRadius: 4,
            bgcolor: "#f8fafc",
            border: "1px solid #e5e7eb",
          }}
        >
          <Stack spacing={1}>
            <Info icon={<Work />} label="Jobs Managed" value={user.jobsManaged} />
            <Info icon={<Visibility />} label="Reviewed" value={user.candidatesReviewed} />
            <Info icon={<Event />} label="Interviews" value={user.interviews} />
            <Info icon={<EmojiEvents />} label="Hires" value={user.hires} />
          </Stack>
        </Box>

        <Typography color="text.secondary" sx={{ fontSize: 13 }}>
          Last Login: {user.lastLogin}
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Shield />}
          onClick={() => onPermission(user)}
        >
          Manage Permissions
        </Button>
      </Stack>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Edit User</MenuItem>
        <MenuItem onClick={() => onPermission(user)}>Permissions</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Reset Password</MenuItem>
        <MenuItem
          onClick={() => {
            onDeactivate(user.id);
            setAnchorEl(null);
          }}
        >
          Deactivate
        </MenuItem>
      </Menu>
    </Paper>
  );
};

const Info = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) => (
  <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Box sx={{ color: "primary.main", display: "flex" }}>{icon}</Box>
      <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{label}</Typography>
    </Stack>

    <Typography sx={{ fontWeight: 900 }}>{value}</Typography>
  </Stack>
);

export default CompanyUserCard;