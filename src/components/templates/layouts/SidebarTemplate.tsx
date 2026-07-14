import { Box, Paper, Typography } from "@mui/material";
import ResumeBody from "../components/ResumeBody";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const SidebarTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        display: "grid",
        gridTemplateColumns: "255px 1fr",
        bgcolor: "#fff",
        color: config.textColor,
        border: "1px solid #e5e7eb",
        borderRadius: `${config.borderRadius}px`,
        overflow: "hidden",
        fontFamily: settings?.fontFamily ?? config.fontFamily,
        fontSize: settings?.fontSize ?? 12,
      }}
    >
      <Box sx={{ bgcolor: config.primaryColor, color: "#fff", p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {data.personal?.fullName}
        </Typography>

        <Typography sx={{ mt: 1 }}>{data.personal?.jobTitle}</Typography>

        <Box sx={{ mt: 3 }}>
          <SidebarTitle title="Contact" />
          <Typography sx={{ fontSize: 13 }}>{data.contact?.email}</Typography>
          <Typography sx={{ fontSize: 13 }}>{data.contact?.phone}</Typography>
          <Typography sx={{ fontSize: 13 }}>
            {data.personal?.location}
          </Typography>
        </Box>

        {data.skills?.length ? (
          <Box sx={{ mt: 3 }}>
            <SidebarTitle title="Skills" />
            {data.skills.map((skill: any) => (
              <Typography key={skill} sx={{ fontSize: 13 }}>
                • {skill}
              </Typography>
            ))}
          </Box>
        ) : null}

        {data.languages?.length ? (
          <Box sx={{ mt: 3 }}>
            <SidebarTitle title="Languages" />
            {data.languages.map((lang: any) => (
              <Typography key={lang} sx={{ fontSize: 13 }}>
                • {lang}
              </Typography>
            ))}
          </Box>
        ) : null}
      </Box>

      <Box sx={{ p: 4 }}>
        <ResumeBody data={data} config={config} hideSidebarData />
      </Box>
    </Paper>
  );
};

const SidebarTitle = ({ title }: { title: string }) => (
  <Typography sx={{ fontWeight: 900, mb: 1, textTransform: "uppercase" }}>
    {title}
  </Typography>
);

export default SidebarTemplate;
