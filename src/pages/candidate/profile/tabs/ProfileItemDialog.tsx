import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";

export type DialogField<T> = {
  name: keyof T;
  label: string;
  type?: "text" | "number" | "date" | "checkbox";
  multiline?: boolean;
  rows?: number;
};

type Props<T> = {
  open: boolean;
  title: string;
  fields: DialogField<T>[];
  initialValues: T;
  onClose: () => void;
  onSave: (values: T) => void;
};

const ProfileItemDialog = <T extends Record<string, any>>({
  open,
  title,
  fields,
  initialValues,
  onClose,
  onSave,
}: Props<T>) => {
  const [form, setForm] = useState<T>(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, [initialValues, open]);

  const handleChange = (name: keyof T, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 900 }}>{title}</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          {fields.map((field) => (
            <Grid size={{ xs: 12 }} key={String(field.name)}>
              <TextField
                fullWidth
                label={field.label}
                type={field.type ?? "text"}
                multiline={field.multiline}
                rows={field.rows}
                value={form[field.name] ?? ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2.5 }}>
        <Button onClick={onClose} sx={{ textTransform: "none" }}>
          Cancel
        </Button>

        <Button
          variant="contained"
          onClick={() => onSave(form)}
          sx={{ borderRadius: 2, textTransform: "none", fontWeight: 800 }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileItemDialog;