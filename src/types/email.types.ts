export type EmailTemplateType =
  | "Application Received"
  | "Interview Invite"
  | "Shortlisted"
  | "Rejected"
  | "Selected"
  | "Offer Letter"
  | string;

export type EmailTemplate = {
  id: string;
  title: EmailTemplateType;
  subject: string;
  body: string;
  category: string;
};