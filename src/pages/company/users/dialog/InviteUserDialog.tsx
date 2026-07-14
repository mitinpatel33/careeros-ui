import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Close, PersonAdd } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { CompanyUser } from "../../../../types/companyUser.types";
import { inviteCompanyUserSchema, type InviteCompanyUserFormType } from "../../../../validation/companyUser.validation";

type Props = {
  open: boolean;
  onClose: () => void;
  onInvite: (user: CompanyUser) => void;
};

const InviteUserDialog = ({ open, onClose, onInvite }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteCompanyUserFormType>({
    resolver: zodResolver(inviteCompanyUserSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      department: "",
      role: "",
    },
  });

  const onSubmit = (data: InviteCompanyUserFormType) => {
    const newUser: CompanyUser = {
      id: crypto.randomUUID(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      role: data.role as CompanyUser["role"],
      department: data.department,
      status: "Pending",
      joinedDate: "-",
      lastLogin: "Invitation sent",
      jobsManaged: 0,
      candidatesReviewed: 0,
      interviews: 0,
      hires: 0,
    };

    onInvite(newUser);
    reset();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ p: 3 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: 3,
                bgcolor: "primary.main",
                color: "#fff",
                display: "grid",
                placeItems: "center",
              }}
            >
              <PersonAdd />
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                Invite Recruiter 👥
              </Typography>
              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                Send invitation to HR, recruiter or hiring manager.
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                {...register("firstName")}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                {...register("lastName")}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Mobile"
                {...register("mobile")}
                error={!!errors.mobile}
                helperText={errors.mobile?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Role"
                {...register("role")}
                error={!!errors.role}
                helperText={errors.role?.message}
              >
                <MenuItem value="HR Admin">HR Admin</MenuItem>
                <MenuItem value="Recruiter">Recruiter</MenuItem>
                <MenuItem value="Hiring Manager">Hiring Manager</MenuItem>
                <MenuItem value="Interviewer">Interviewer</MenuItem>
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Department"
                {...register("department")}
                error={!!errors.department}
                helperText={errors.department?.message}
              >
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            sx={{ justifyContent: "flex-end", mt: 3 }}
            spacing={2}
          >
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Send Invitation
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserDialog;