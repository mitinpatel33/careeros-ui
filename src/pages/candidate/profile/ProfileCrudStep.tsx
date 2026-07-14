import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import ProfileItemList from "./ProfileItemList";
import AppFormField from "../../../components/common/AppFormField";


export type FieldConfig<T> = {
  name: keyof T;
  label: string;
  type?: "text" | "number" | "date" | "select" | "radio" | "checkbox" | "textarea" | "url";
  rows?: number;
  options?: { label: string; value: string | boolean }[];
};

type BaseItem = {
  id?: string;
  displayOrder?: number;
};

type Props<T extends BaseItem> = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  items: T[];
  defaultItem: T;
  fields: FieldConfig<T>[];
  loading?: boolean;
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
  onChange: (items: T[]) => void;
  onSaveStep: () => void;
};

const ProfileCrudStep = <T extends BaseItem>({
  title,
  subtitle,
  icon,
  items,
  defaultItem,
  fields,
  loading,
  getTitle,
  getSubtitle,
  onChange,
  onSaveStep,
}: Props<T>) => {
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const { control, handleSubmit, reset } = useForm<T>({
    defaultValues: defaultItem as any,
  });

  const openAdd = () => {
    setEditingItem(null);
    reset(defaultItem as any);
    setOpen(true);
  };

  const openEdit = (item: T) => {
    setEditingItem(item);
    reset(item as any);
    setOpen(true);
  };

  const saveItem = (values: T) => {
    if (editingItem?.id) {
      onChange(
        items.map((x) =>
          x.id === editingItem.id ? { ...x, ...values, id: editingItem.id } : x
        )
      );
    } else {
      onChange([
        ...items,
        {
          ...values,
          id: crypto.randomUUID(),
          displayOrder: items.length + 1,
        },
      ]);
    }

    setOpen(false);
  };

  return (
    <>
      <ProfileItemList
        title={title}
        subtitle={subtitle}
        icon={icon}
        items={items}
        getTitle={getTitle}
        getSubtitle={getSubtitle}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={(item: any) => onChange(items.filter((x) => x.id !== item.id))}
        loading={loading}
        onSaveStep={onSaveStep}
      />

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 900 }}>
          {editingItem ? `Edit ${title}` : `Add ${title}`}
        </DialogTitle>

        <form onSubmit={handleSubmit(saveItem)}>
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              {fields.map((field) => (
                <Grid key={String(field.name)} size={{ xs: 12 }}>
                  <AppFormField<T>
                    name={field.name as any}
                    control={control}
                    label={field.label}
                    type={field.type}
                    rows={field.rows}
                    options={field.options}
                  />
                </Grid>
              ))}
            </Grid>
          </DialogContent>

          <DialogActions sx={{ p: 2.5 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ProfileCrudStep;