import { Box, Paper } from "@mui/material";
import ResumeHeader from "../components/ResumeHeader";
import ResumeBody from "../components/ResumeBody";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const OneColumnTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        bgcolor: config.backgroundColor,
        color: config.textColor,
        border: "1px solid #e5e7eb",
        borderRadius: `${config.borderRadius}px`,
        overflow: "hidden",
        fontFamily: settings?.fontFamily ?? config.fontFamily,
        fontSize: settings?.fontSize ?? 12,
      }}
    >
      <ResumeHeader data={data} config={config} settings={settings} />

      <Box sx={{ p: 4 }}>
        <ResumeBody data={data} config={config} settings={settings} />
      </Box>
    </Paper>
  );
};

export default OneColumnTemplate;