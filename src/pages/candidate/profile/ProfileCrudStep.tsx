import { useState, useEffect } from "react";
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
  type?:
    | "text"
    | "number"
    | "date"
    | "select"
    | "radio"
    | "checkbox"
    | "textarea"
    | "url"
    | "autocomplete"; // Added autocomplete
  rows?: number;
  options?: { label: string; value: string | boolean }[];
  onSearch?: (term: string) => void; // Pass search callback
  loading?: boolean; // Pass loading indicator
  freeSolo?: boolean; // Pass freeSolo setting
};

// BaseItem supports both 'id' and '_id'
type BaseItem = {
  id?: string;
  _id?: string;
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
  isFirst?: boolean;
  isLast?: boolean;
  onBack?: () => void;
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
  onSave: (items: T[]) => Promise<void>;
  onDeleteItem?: (item: T) => Promise<void>;
};

const ProfileCrudStep = <T extends BaseItem>({
  title,
  subtitle,
  icon,
  items,
  defaultItem,
  fields,
  loading,
  isFirst,
  isLast,
  onBack,
  getTitle,
  getSubtitle,
  onSave,
  onDeleteItem,
}: Props<T>) => {
  const [localItems, setLocalItems] = useState<T[]>(items);
  const [saving, setSaving] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const { control, handleSubmit, reset } = useForm<T>({
    defaultValues: defaultItem as any,
  });

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

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

  const getItemId = (item: T): string | undefined => item.id || item._id;

  const saveItem = (values: T) => {
    const editingId = editingItem ? getItemId(editingItem) : undefined;
    if (editingId) {
      setLocalItems(
        localItems.map((x) => {
          const currentId = getItemId(x);
          return currentId === editingId
            ? { ...x, ...values, id: currentId }
            : x;
        }),
      );
    } else {
      setLocalItems([
        ...localItems,
        {
          ...values,
          id: crypto.randomUUID(),
          displayOrder: localItems.length + 1,
        },
      ]);
    }
    setOpen(false);
  };

  const handleDelete = async (item: T) => {
    if (onDeleteItem) {
      await onDeleteItem(item);
    } else {
      const idToDelete = getItemId(item);
      if (idToDelete) {
        setLocalItems(localItems.filter((x) => getItemId(x) !== idToDelete));
      }
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await onSave(localItems);
    } catch (error) {
      // Handled by parent
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <ProfileItemList
        title={title}
        subtitle={subtitle}
        icon={icon}
        items={localItems}
        getTitle={getTitle}
        getSubtitle={getSubtitle}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
        onBack={onBack}
        isFirst={isFirst}
        isLast={isLast}
        onSave={handleSave}
        loading={loading}
        saving={saving}
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
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
                    onSearch={field.onSearch}
                    loading={field.loading}
                    freeSolo={field.freeSolo}
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
