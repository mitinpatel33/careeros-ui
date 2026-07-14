import {
  Box,
  Button,
  Checkbox,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";
import type { CompanyUser, UserPermissions } from "../../../../types/companyUser.types";

type Props = {
  open: boolean;
  user: CompanyUser | null;
  onClose: () => void;
};

const defaultPermissions: UserPermissions = {
  jobs: { view: true, create: true, update: true, delete: false },
  candidates: { view: true, create: false, update: true, delete: false },
  interviews: { view: true, create: true, update: true, delete: false },
  emails: { view: true, create: true, update: false, delete: false },
  analytics: { view: true, create: false, update: false, delete: false },
};

const modules = Object.keys(defaultPermissions) as Array<
  Extract<keyof UserPermissions, string>
>;

const actions = ["view", "create", "update", "delete"] as const;

const PermissionsDrawer = ({ open, user, onClose }: Props) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            width: { xs: "100%", sm: 480 },
            p: 3,
          },
        },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 900 }}>
        Manage Permissions
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        {user ? `${user.firstName} ${user.lastName}` : "User"}
      </Typography>

      <Stack spacing={2}>
        {modules.map((module) => (
          <Box
            key={module}
            sx={{
              p: 2,
              borderRadius: 3,
              border: "1px solid #e5e7eb",
            }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                mb: 1.5,
                textTransform: "capitalize",
              }}
            >
              {String(module)}
            </Typography>

            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.5 }}>
              {actions.map((action) => (
                <Stack
                  key={action}
                  direction="row"
                  sx={{ alignItems: "center" }}
                  spacing={0.5}
                >
                  <Checkbox
                    defaultChecked={defaultPermissions[module][action]}
                    size="small"
                  />
                  <Typography sx={{ fontSize: 13, textTransform: "capitalize" }}>
                    {action}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button fullWidth variant="outlined" onClick={onClose}>
          Cancel
        </Button>

        <Button fullWidth variant="contained" onClick={onClose}>
          Save Permissions
        </Button>
      </Stack>
    </Drawer>
  );
};

export default PermissionsDrawer;