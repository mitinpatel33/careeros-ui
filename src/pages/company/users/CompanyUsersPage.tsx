import { useMemo, useState } from "react";

import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  People,
  CheckCircle,
  HourglassTop,
  AdminPanelSettings,
} from "@mui/icons-material";

import CompanyStatCard from "../components/CompanyStatCard";
import CompanyUserCard from "./card/CompanyUserCard";
import InviteUserDialog from "./dialog/InviteUserDialog";
import PermissionsDrawer from "./drawer/PermissionsDrawer";

import type { CompanyUser } from "../../../types/companyUser.types";

const initialUsers: CompanyUser[] = [
  {
    id: "1",
    firstName: "Amit",
    lastName: "HR",
    email: "amit@company.com",
    mobile: "9876543210",
    role: "HR Admin",
    department: "HR",
    status: "Active",
    joinedDate: "Jan 2026",
    lastLogin: "2 hours ago",
    jobsManaged: 15,
    candidatesReviewed: 240,
    interviews: 35,
    hires: 12,
  },
  {
    id: "2",
    firstName: "Neha",
    lastName: "Recruiter",
    email: "neha@company.com",
    mobile: "9876543211",
    role: "Recruiter",
    department: "Engineering",
    status: "Active",
    joinedDate: "Feb 2026",
    lastLogin: "Today",
    jobsManaged: 8,
    candidatesReviewed: 130,
    interviews: 22,
    hires: 7,
  },
  {
    id: "3",
    firstName: "Raj",
    lastName: "Manager",
    email: "raj@company.com",
    mobile: "9876543212",
    role: "Hiring Manager",
    department: "Engineering",
    status: "Pending",
    joinedDate: "-",
    lastLogin: "Invitation sent",
    jobsManaged: 0,
    candidatesReviewed: 0,
    interviews: 0,
    hires: 0,
  },
];

const CompanyUsersPage = () => {
  const [users, setUsers] = useState<CompanyUser[]>(initialUsers);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [permissionUser, setPermissionUser] = useState<CompanyUser | null>(null);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState("All");
  const [status, setStatus] = useState("All");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();

      const matchSearch =
        fullName.includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchRole = role === "All" || user.role === role;
      const matchStatus = status === "All" || user.status === status;

      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, role, status]);

  const handleInvite = (user: CompanyUser) => {
    setUsers((prev) => [user, ...prev]);
  };

  const handleDeactivate = (id: string) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: "Inactive" } : user
      )
    );
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", md: "center" }, mb: 3 }}
        spacing={2}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            Recruiter Users 👥
          </Typography>

          <Typography color="text.secondary">
            Manage HR users, hiring managers and permissions.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setInviteOpen(true)}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 800,
            px: 2.5,
            py: 1.2,
          }}
        >
          Invite User
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard
            title="Total Users"
            subtitle="Company members"
            value={users.length}
            icon={<People />}
            trend="+3"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard
            title="Active Users"
            subtitle="Currently active"
            value={users.filter((x) => x.status === "Active").length}
            icon={<CheckCircle />}
            trend="+2"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard
            title="Pending Invites"
            subtitle="Waiting response"
            value={users.filter((x) => x.status === "Pending").length}
            icon={<HourglassTop />}
            trend="+1"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard
            title="Managers"
            subtitle="Hiring managers"
            value={users.filter((x) => x.role === "Hiring Manager").length}
            icon={<AdminPanelSettings />}
            trend="+1"
          />
        </Grid>
      </Grid>

      <Paper
        elevation={0}
        sx={{
          p: 2.5,
          mb: 3,
          borderRadius: 5,
          border: "1px solid #e5e7eb",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Search name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              select
              fullWidth
              label="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="HR Admin">HR Admin</MenuItem>
              <MenuItem value="Recruiter">Recruiter</MenuItem>
              <MenuItem value="Hiring Manager">Hiring Manager</MenuItem>
              <MenuItem value="Interviewer">Interviewer</MenuItem>
            </TextField>
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              select
              fullWidth
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredUsers.map((user) => (
          <Grid key={user.id} size={{ xs: 12, md: 6, xl: 4 }}>
            <CompanyUserCard
              user={user}
              onPermission={(selectedUser: any) => setPermissionUser(selectedUser)}
              onDeactivate={handleDeactivate}
            />
          </Grid>
        ))}
      </Grid>

      <InviteUserDialog
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={handleInvite}
      />

      <PermissionsDrawer
        open={!!permissionUser}
        user={permissionUser}
        onClose={() => setPermissionUser(null)}
      />
    </Box>
  );
};

export default CompanyUsersPage;