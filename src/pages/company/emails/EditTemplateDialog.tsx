import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Close, Edit } from "@mui/icons-material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { EmailTemplate } from "../../../types/email.types";
import {
  editTemplateSchema,
  type EditTemplateFormType,
} from "../../../validation/email.validation";

type Props = {
  open: boolean;
  template: EmailTemplate | null;
  onClose: () => void;
  onSave: (template: EmailTemplate) => void;
};

const EditTemplateDialog = ({
  open,
  template,
  onClose,
  onSave,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditTemplateFormType>({
    resolver: zodResolver(editTemplateSchema),
    defaultValues: {
      subject: "",
      body: "",
    },
  });

  useEffect(() => {
    if (template) {
      reset({
        subject: template.subject,
        body: template.body,
      });
    }
  }, [template, reset]);

  const onSubmit = (data: EditTemplateFormType) => {
    if (!template) return;

    onSave({
      ...template,
      subject: data.subject,
      body: data.body,
    });

    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
              <Edit />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                Edit Template
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                {template?.title}
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2.5}>
            <TextField
              fullWidth
              label="Subject"
              {...register("subject")}
              error={!!errors.subject}
              helperText={errors.subject?.message}
            />

            <TextField
              fullWidth
              multiline
              rows={10}
              label="Email Body"
              {...register("body")}
              error={!!errors.body}
              helperText={
                errors.body?.message ||
                "Use variables: {{candidateName}}, {{companyName}}, {{jobTitle}}, {{interviewDate}}, {{interviewTime}}"
              }
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>

              <Button type="submit" variant="contained">
                Save Template
              </Button>
            </Stack>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default EditTemplateDialog;