import { Box, Paper, Typography } from "@mui/material";
import ResumeBody from "../components/ResumeBody";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const SidebarTemplate = ({ data, config, settings }: TemplateRenderProps) => {
  const { personal, contact, skills, languages } = data;

  const fullName = personal
    ? `${personal?.firstName || ""} ${personal?.lastName || ""}`.trim()
    : "";

  // Build location string from the new contact fields
  const location = contact
    ? [contact.address, contact.city, contact.state, contact.pincode]
        .filter(Boolean)
        .join(", ")
    : "";

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
      {/* Sidebar */}
      <Box sx={{ bgcolor: config.primaryColor, color: "#fff", p: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900 }}>
          {fullName}
        </Typography>

        <Typography sx={{ mt: 1 }}>{data.personal?.jobTitle}</Typography>

        <Box sx={{ mt: 3 }}>
          <SidebarTitle title="Contact" />
          <Typography sx={{ fontSize: 13 }}>{contact?.email}</Typography>
          {/* Changed from phone to mobile to match new schema */}
          <Typography sx={{ fontSize: 13 }}>{contact?.mobile}</Typography>
          <Typography sx={{ fontSize: 13 }}>{location}</Typography>
        </Box>

        {skills && skills.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <SidebarTitle title="Skills" />
            {skills.map((skill, index) => (
              <Typography key={index} sx={{ fontSize: 13 }}>
                • {skill.skillName}
                {skill.proficiency ? ` (${skill.proficiency})` : ""}
                {skill.experienceInYears
                  ? ` - ${skill.experienceInYears} yr${
                      skill.experienceInYears > 1 ? "s" : ""
                    }`
                  : ""}
              </Typography>
            ))}
          </Box>
        )}

        {/* Languages – updated to handle the new object structure */}
        {languages && languages.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <SidebarTitle title="Languages" />
            {languages.map((lang, index) => (
              <Typography key={index} sx={{ fontSize: 13 }}>
                • {lang.languageName}
                {lang.proficiencyLevel
                  ? ` (${lang.proficiencyLevel})`
                  : ""}
              </Typography>
            ))}
          </Box>
        )}
      </Box>

      {/* Main content area */}
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