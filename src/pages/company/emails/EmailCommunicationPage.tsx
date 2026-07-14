import {
  Box,
  Button,
  Grid,
  MenuItem,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import {
  Add,
  Email,
  MarkEmailRead,
  Send,
  Drafts,
} from "@mui/icons-material";

import { useMemo, useState } from "react";

import CompanyStatCard from "../components/CompanyStatCard";
import EmailTemplateCard from "./EmailTemplateCard";
import EditTemplateDialog from "./EditTemplateDialog";
import SendEmailDialog from "./SendEmailDialog";
import EmailPreviewDrawer from "./EmailPreviewDrawer";

import type { EmailTemplate } from "../../../types/email.types";
import type { SendEmailFormType } from "../../../validation/email.validation";
import CreateTemplateDialog from "./CreateTemplateDialog";

const initialTemplates: EmailTemplate[] = [
  {
    id: "1",
    title: "Application Received",
    category: "Application",
    subject: "Application received for {{jobTitle}}",
    body:
      "Hi {{candidateName}},\n\nThank you for applying to {{companyName}} for the {{jobTitle}} role. Our recruitment team will review your profile and get back to you soon.\n\nRegards,\nHR Team",
  },
  {
    id: "2",
    title: "Interview Invite",
    category: "Interview",
    subject: "Interview invitation - {{jobTitle}}",
    body:
      "Hi {{candidateName}},\n\nYou are invited for an interview with {{companyName}}.\n\nDate: {{interviewDate}}\nTime: {{interviewTime}}\n\nPlease be available on time.\n\nRegards,\nHR Team",
  },
  {
    id: "3",
    title: "Shortlisted",
    category: "Pipeline",
    subject: "You are shortlisted for {{jobTitle}}",
    body:
      "Hi {{candidateName}},\n\nCongratulations! You have been shortlisted for the {{jobTitle}} role at {{companyName}}. Our team will contact you for the next step.\n\nRegards,\nHR Team",
  },
  {
    id: "4",
    title: "Rejected",
    category: "Pipeline",
    subject: "Update on your application",
    body:
      "Hi {{candidateName}},\n\nThank you for your interest in {{companyName}}. After reviewing your application, we have decided to move forward with other candidates at this time.\n\nWe wish you all the best.\n\nRegards,\nHR Team",
  },
  {
    id: "5",
    title: "Selected",
    category: "Selection",
    subject: "Congratulations! You are selected",
    body:
      "Hi {{candidateName}},\n\nCongratulations! We are happy to inform you that you have been selected for the {{jobTitle}} role at {{companyName}}.\n\nOur HR team will connect with you for the next process.\n\nRegards,\nHR Team",
  },
  {
    id: "6",
    title: "Offer Letter",
    category: "Offer",
    subject: "Offer letter for {{jobTitle}}",
    body:
      "Hi {{candidateName}},\n\nWe are pleased to share your offer for the {{jobTitle}} role at {{companyName}}. Please review the offer details and confirm your acceptance.\n\nRegards,\nHR Team",
  },
];

const EmailCommunicationPage = () => {
  const [createOpen, setCreateOpen] = useState(false);
  const [templates, setTemplates] =
    useState<EmailTemplate[]>(initialTemplates);

  const [editTemplate, setEditTemplate] =
    useState<EmailTemplate | null>(null);

  const [sendTemplate, setSendTemplate] =
    useState<EmailTemplate | null>(null);

  const [previewTemplate, setPreviewTemplate] =
    useState<EmailTemplate | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sentCount, setSentCount] = useState(0);
  const [message, setMessage] = useState("");

  const categories = useMemo(() => {
    return ["All", ...Array.from(new Set(templates.map((x) => x.category)))];
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    return templates.filter((template) => {
      const query = search.toLowerCase();

      const matchSearch =
        template.title.toLowerCase().includes(query) ||
        template.subject.toLowerCase().includes(query) ||
        template.category.toLowerCase().includes(query);

      const matchCategory =
        category === "All" || template.category === category;

      return matchSearch && matchCategory;
    });
  }, [templates, search, category]);

  const handleCreateTemplate = (template: EmailTemplate) => {
  setTemplates((prev) => [template, ...prev]);
  setMessage("New template created successfully.");
};

  const handleSaveTemplate = (updated: EmailTemplate) => {
    setTemplates((prev) =>
      prev.map((template) =>
        template.id === updated.id ? updated : template
      )
    );

    setMessage("Template updated successfully.");
  };

  const handleSendEmail = (data: SendEmailFormType) => {
    console.log("Send email payload:", data);

    setSentCount((prev) => prev + 1);
    setMessage(`Email sent to ${data.to}`);
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, fontSize: { xs: 28, md: 36 } }}
          >
            Email Communication ✉️
          </Typography>

          <Typography color="text.secondary">
            Send emails using templates and notify candidates.
          </Typography>
        </Box>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateOpen(true)}
          sx={{
            borderRadius: 3,
            textTransform: "none",
            fontWeight: 800,
            px: 2.5,
            py: 1.2,
            width: { xs: "100%", sm: "auto" },
          }}
        >
          New Template
        </Button>
      </Stack>

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard
            title="Templates"
            subtitle="Ready emails"
            value={templates.length}
            icon={<Email />}
            trend="+6"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard
            title="Sent Emails"
            subtitle="Current session"
            value={sentCount}
            icon={<Send />}
            trend="+1"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard
            title="Categories"
            subtitle="Template groups"
            value={categories.length - 1}
            icon={<Drafts />}
            trend="+4"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <CompanyStatCard
            title="Success Rate"
            subtitle="Delivery tracking"
            value="98%"
            icon={<MarkEmailRead />}
            trend="+2%"
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
          bgcolor: "rgba(255,255,255,.9)",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            <TextField
              fullWidth
              label="Search template, subject or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              select
              fullWidth
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid key={template.id} size={{ xs: 12, md: 6, xl: 4 }}>
            <EmailTemplateCard
              template={template}
              onEdit={setEditTemplate}
              onSend={setSendTemplate}
              onPreview={setPreviewTemplate}
            />
          </Grid>
        ))}
      </Grid>

      <CreateTemplateDialog
  open={createOpen}
  onClose={() => setCreateOpen(false)}
  onCreate={handleCreateTemplate}
/>

      <EditTemplateDialog
        open={Boolean(editTemplate)}
        template={editTemplate}
        onClose={() => setEditTemplate(null)}
        onSave={handleSaveTemplate}
      />

      <SendEmailDialog
        open={Boolean(sendTemplate)}
        template={sendTemplate}
        onClose={() => setSendTemplate(null)}
        onSend={handleSendEmail}
      />

      <EmailPreviewDrawer
        open={Boolean(previewTemplate)}
        template={previewTemplate}
        onClose={() => setPreviewTemplate(null)}
        onSend={(template) => {
          setPreviewTemplate(null);
          setSendTemplate(template);
        }}
      />

      <Snackbar
        open={Boolean(message)}
        autoHideDuration={2500}
        message={message}
        onClose={() => setMessage("")}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
    </Box>
  );
};

export default EmailCommunicationPage;