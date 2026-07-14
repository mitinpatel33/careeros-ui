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

import { Close, Send } from "@mui/icons-material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { EmailTemplate } from "../../../types/email.types";
import {
  sendEmailSchema,
  type SendEmailFormType,
} from "../../../validation/email.validation";

type Props = {
  open: boolean;
  template: EmailTemplate | null;
  onClose: () => void;
  onSend: (data: SendEmailFormType) => void;
};

const replaceVariables = (
  text: string,
  candidateName: string
) => {
  return text
    .replaceAll("{{candidateName}}", candidateName || "Candidate")
    .replaceAll("{{companyName}}", "ABC Technologies")
    .replaceAll("{{jobTitle}}", "Full Stack Developer")
    .replaceAll("{{interviewDate}}", "25 Jun 2026")
    .replaceAll("{{interviewTime}}", "11:00 AM");
};

const SendEmailDialog = ({
  open,
  template,
  onClose,
  onSend,
}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SendEmailFormType>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      to: "",
      candidateName: "",
      subject: "",
      body: "",
    },
  });

  const candidateName = watch("candidateName");

  useEffect(() => {
    if (template) {
      setValue("subject", template.subject);
      setValue("body", replaceVariables(template.body, candidateName));
    }
  }, [template, setValue]);

  useEffect(() => {
    if (template) {
      setValue("body", replaceVariables(template.body, candidateName));
    }
  }, [candidateName, template, setValue]);

  const handleClose = () => {
    reset();
    onClose();
  };

  const onSubmit = (data: SendEmailFormType) => {
    onSend(data);
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
              <Send />
            </Box>

            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900 }}>
                Send Email
              </Typography>

              <Typography color="text.secondary" sx={{ fontSize: 13 }}>
                {template?.title}
              </Typography>
            </Box>
          </Stack>

          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>
      </DialogTitle>

      <DialogContent sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Candidate Name"
                {...register("candidateName")}
                error={!!errors.candidateName}
                helperText={errors.candidateName?.message}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="To Email"
                {...register("to")}
                error={!!errors.to}
                helperText={errors.to?.message}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Subject"
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
                {...register("body")}
                error={!!errors.body}
                helperText={errors.body?.message}
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ justifyContent: "flex-end", mt: 3 }}
          >
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>

            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Send Email
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SendEmailDialog;