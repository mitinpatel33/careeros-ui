import { Box, Typography } from "@mui/material";
import type { ResumeTemplateConfig } from "../../../types/resumeTemplate.types";
import type { ResumeData } from "../../../types/candidate/resume.types";

type Props = {
  data: ResumeData;
  config: ResumeTemplateConfig;
  settings?: any;
};

const ResumeHeader = ({ data, config, settings }: Props) => {
  const isSolid = config.headerStyle === "solid";
  const isCenter = config.headerStyle === "center";

  const { personal, contact } = data;

  const fullName = personal
    ? `${personal?.firstName || ""} ${personal?.lastName || ""}`.trim()
    : "";

  // Build location from available fields
  const locationParts = [
    contact?.address,
    contact?.city,
    contact?.state,
    contact?.pincode,
  ].filter(Boolean);
  const location = locationParts.join(", ");

  // Contact lines – only include what exists
  const contactLines: string[] = [];
  if (contact?.email) contactLines.push(contact.email);
  if (contact?.mobile) contactLines.push(contact.mobile);
  if (contact?.alternateMobile) contactLines.push(contact.alternateMobile);

  // If you have linkedIn/github in your data structure, add them here
  // For now, we assume they are not present.

  return (
    <Box
      sx={{
        p: 4,
        textAlign: isCenter ? "center" : "left",
        bgcolor: isSolid ? config.primaryColor : "#fff",
        color: isSolid ? "#fff" : config.textColor,
        borderBottom:
          config.headerStyle === "boxed"
            ? `6px solid ${config.primaryColor}`
            : "1px solid #e5e7eb",
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: 900 }}>
        {fullName}
      </Typography>

      {personal?.jobTitle && (
        <Typography sx={{ fontWeight: 700 }}>
          {personal.jobTitle}
        </Typography>
      )}

      {location && (
        <Typography sx={{ fontSize: settings?.fontSize ?? 13, mt: 0.5 }}>
          {location}
        </Typography>
      )}

      {contactLines.length > 0 && (
        <Typography sx={{ fontSize: settings?.fontSize ?? 13, mt: 1 }}>
          {contactLines.join(" | ")}
        </Typography>
      )}
    </Box>
  );
};

export default ResumeHeader;