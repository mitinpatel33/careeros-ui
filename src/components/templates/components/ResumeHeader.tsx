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
        {data.personal?.fullName}
      </Typography>

      <Typography sx={{ fontWeight: 700 }}>
        {data.personal?.jobTitle}
      </Typography>

      <Typography sx={{ fontSize: settings?.fontSize ?? 13, mt: 0.5 }}>
        {data.personal?.location}
      </Typography>

      <Typography sx={{ fontSize: settings?.fontSize ?? 13, mt: 1 }}>
        {data.contact?.email} {data.contact?.phone ? ` | ${data.contact.phone}` : ""}
      </Typography>

      <Typography sx={{ fontSize: settings?.fontSize ?? 13 }}>
        {data.contact?.linkedIn} {data.contact?.github ? ` | ${data.contact.github}` : ""}
      </Typography>
    </Box>
  );
};

export default ResumeHeader;