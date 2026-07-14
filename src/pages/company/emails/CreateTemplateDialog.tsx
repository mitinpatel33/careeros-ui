import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Close, Add } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { EmailTemplate } from "../../../types/email.types";
import {
  editTemplateSchema,
  type EditTemplateFormType,
} from "../../../validation/email.validation";

type CreateTemplateFormType = EditTemplateFormType & {
  title: string;
  category: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (template: EmailTemplate) => void;
};

const CreateTemplateDialog = ({ open, onClose, onCreate }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateTemplateFormType>({
    resolver: zodResolver(
      editTemplateSchema.extend({
        title: editTemplateSchema.shape.subject.min(2, "Template title is required"),
        category: editTemplateSchema.shape.subject.min(2, "Category is required"),
      })
    ),
    defaultValues: {
      title: "",
      category: "",
      subject: "",
      body: "",
    },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: CreateTemplateFormType) => {
    onCreate({
      id: crypto.randomUUID(),
      title: data.title,
      category: data.category,
      subject: data.subject,
      body: data.body,
    });

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ p: 3 }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }}>
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
              <Add />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                New Email Template ✨
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                Create custom email template.
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" sx={{ p: 3 }} onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Template Title"
                placeholder="Follow Up Email"
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Category"
                placeholder="Follow Up"
                {...register("category")}
                error={!!errors.category}
                helperText={errors.category?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Subject"
                placeholder="Update regarding your application"
                {...register("subject")}
                error={!!errors.subject}
                helperText={errors.subject?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                multiline
                rows={10}
                label="Email Body"
                placeholder="Hi {{candidateName}}, ..."
                {...register("body")}
                error={!!errors.body}
                helperText={
                  errors.body?.message ||
                  "Variables: {{candidateName}}, {{companyName}}, {{jobTitle}}"
                }
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 3, justifyContent: "flex-end" }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" variant="contained">
              Create Template
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTemplateDialog;