import {
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Add, Delete, Edit, Save } from "@mui/icons-material";
import { motion } from "framer-motion";

type Props<T> = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: T[];
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
  onAdd: () => void;
  onEdit: (item: T) => void;
  onDelete: (item: T) => void;
  onSaveStep: () => void;
  loading?: boolean;
};

const ProfileItemList = <T,>({
  title,
  subtitle,
  icon,
  items,
  getTitle,
  getSubtitle,
  onAdd,
  onEdit,
  onDelete,
  onSaveStep,
  loading = false,
}: Props<T>) => {
  return (
    <Card
      sx={{
        p: { xs: 2, md: 3 },
        borderRadius: 5,
        boxShadow: "0 22px 70px rgba(31,81,255,.12)",
      }}
    >
      <Stack spacing={3}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ justifyContent: "space-between", alignItems: { sm: "center" } }}
        >
          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                width: 46,
                height: 46,
                borderRadius: 3,
                display: "grid",
                placeItems: "center",
                bgcolor: "primary.main",
                color: "#fff",
              }}
            >
              {icon}
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                {title}
              </Typography>
              <Typography color="text.secondary">{subtitle}</Typography>
            </Box>
          </Stack>

          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={onAdd}
            sx={{ borderRadius: 3, textTransform: "none", fontWeight: 800 }}
          >
            Add
          </Button>
        </Stack>

        <Stack spacing={1.5}>
          {items.length === 0 && (
            <Typography color="text.secondary">No records added yet.</Typography>
          )}

          {items?.map((item, index) => (
            <motion.div
              key={(item as any).id ?? index}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Box
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  bgcolor: "#fff",
                  gap: 2,
                }}
              >
                <Box>
                  <Typography sx={{ fontWeight: 900 }}>
                    {getTitle(item)}
                  </Typography>

                  {getSubtitle && (
                    <Typography color="text.secondary" sx={{ fontSize: 14 }}>
                      {getSubtitle(item)}
                    </Typography>
                  )}
                </Box>

                <Stack direction="row">
                  <IconButton onClick={() => onEdit(item)}>
                    <Edit />
                  </IconButton>

                  <IconButton color="error" onClick={() => onDelete(item)}>
                    <Delete />
                  </IconButton>
                </Stack>
              </Box>
            </motion.div>
          ))}
        </Stack>

        <Stack direction="row" sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            disabled={loading}
            onClick={onSaveStep}
            sx={{
              borderRadius: 3,
              textTransform: "none",
              fontWeight: 900,
              px: 4,
            }}
          >
            {loading ? "Saving..." : "Save & Continue"}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};

export default ProfileItemList;