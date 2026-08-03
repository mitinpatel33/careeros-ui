import { Box, Chip, Stack, Typography } from "@mui/material";
import ResumeSection from "./ResumeSection";
import type { ResumeData } from "../../../types/candidate/resume.types";
import type { ResumeTemplateConfig } from "../../../types/resumeTemplate.types";

type Props = {
  data: ResumeData;
  config: ResumeTemplateConfig;
  hideSidebarData?: boolean;
  settings?: any;
};

const ResumeBody = ({ data, config, hideSidebarData = false, settings }: Props) => {
  // Helper to format date string (assumes ISO date)
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  // Build duration string from start/end dates
  const getDuration = (start?: string, end?: string, isCurrent?: boolean) => {
    const startFormatted = formatDate(start);
    const endFormatted = isCurrent ? "Present" : formatDate(end);
    if (!startFormatted && !endFormatted) return "";
    return `${startFormatted} – ${endFormatted}`;
  };

  return (
    <>
      {/* Summary */}
      {data.summary && (
        <ResumeSection sectionKey="summary" title="Summary" config={config}>
          {data.summary.careerObjective && (
            <Typography sx={{ fontSize: settings?.fontSize ?? 14, mb: 1 }}>
              {data.summary.careerObjective}
            </Typography>
          )}
          {data.summary.professionalSummary && (
            <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
              {data.summary.professionalSummary}
            </Typography>
          )}
        </ResumeSection>
      )}

      {/* Skills – now an array of objects */}
      {!hideSidebarData && data.skills?.length ? (
        <ResumeSection title="Skills" config={config} sectionKey="skills">
          <Stack direction="row" sx={{ gap: 1, flexWrap: "wrap" }}>
            {data.skills.map((skill: any) => (
              <Chip
                key={skill._id || skill.skillName}
                label={`${skill.skillName}${skill.proficiency ? ` (${skill.proficiency})` : ""}`}
                size="small"
              />
            ))}
          </Stack>
        </ResumeSection>
      ) : null}

      {/* Experience – use 'experiences' */}
      {data.experience?.length ? (
        <ResumeSection title="Experience" config={config} sectionKey="experience">
          {data.experience.map((item: any) => (
            <Box key={item._id || item.companyName} sx={{ mb: 1.8 }}>
              <Typography sx={{ fontWeight: 900 }}>
                {item.designation} – {item.companyName}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
                {getDuration(item.startDate, item.endDate, item.isCurrentCompany)}
                {item.location ? ` | ${item.location}` : ""}
              </Typography>
              {item.description && (
                <Typography sx={{ fontSize: settings?.fontSize ?? 14, mt: 0.5 }}>
                  {item.description}
                </Typography>
              )}
            </Box>
          ))}
        </ResumeSection>
      ) : null}

      {/* Education – use 'educations' */}
      {data.education?.length ? (
        <ResumeSection title="Education" config={config} sectionKey="education">
          {data.education.map((item: any) => (
            <Box key={item._id || item.degree} sx={{ mb: 1.5 }}>
              <Typography sx={{ fontWeight: 900 }}>
                {item.degree} {item.fieldOfStudy ? `in ${item.fieldOfStudy}` : ""}
              </Typography>
              <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
                {item.instituteName}
              </Typography>
              <Typography sx={{ fontSize: settings?.fontSize ?? 12, color: "text.secondary" }}>
                {getDuration(item.startDate, item.endDate)}
                {item.percentage ? ` | ${item.percentage}%` : ""}
                {item.grade ? ` | ${item.grade}` : ""}
              </Typography>
              {item.description && (
                <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
                  {item.description}
                </Typography>
              )}
            </Box>
          ))}
        </ResumeSection>
      ) : null}

      {/* Projects – fields: projectName, role, technologies, description, projectUrl */}
      {data.projects?.length ? (
        <ResumeSection title="Projects" config={config} sectionKey="projects">
          {data.projects.map((item: any) => (
            <Box key={item._id || item.projectName} sx={{ mb: 1.8 }}>
              <Typography sx={{ fontWeight: 900 }}>
                {item.projectName}
                {item.role ? ` – ${item.role}` : ""}
              </Typography>
              {item.technologies?.length && (
                <Typography sx={{ fontSize: settings?.fontSize ?? 12, color: "text.secondary" }}>
                  {item.technologies.join(", ")}
                </Typography>
              )}
              {item.description && (
                <Typography sx={{ fontSize: settings?.fontSize ?? 14, mt: 0.5 }}>
                  {item.description}
                </Typography>
              )}
              {item.projectUrl && (
                <Typography sx={{ fontSize: settings?.fontSize ?? 12, color: "primary.main" }}>
                  <a href={item.projectUrl} target="_blank" rel="noopener noreferrer">
                    {item.projectUrl}
                  </a>
                </Typography>
              )}
            </Box>
          ))}
        </ResumeSection>
      ) : null}

      {/* Certifications – keep as is if present */}
      {data.certifications?.length ? (
        <ResumeSection title="Certifications" config={config} sectionKey="certifications">
          {data.certifications.map((item: any, idx: number) => (
            <Typography key={idx} sx={{ fontSize: settings?.fontSize ?? 14 }}>
              • {typeof item === "string" ? item : item.name || item}
            </Typography>
          ))}
        </ResumeSection>
      ) : null}

      {/* Achievements – keep as is */}
      {data?.achievements?.length ? (
        <ResumeSection title="Achievements" config={config} sectionKey="achievements">
          {data?.achievements.map((item: any, idx: number) => (
            <Typography key={idx} sx={{ fontSize: settings?.fontSize ?? 14 }}>
              • {typeof item === "string" ? item : item?.title || item}
            </Typography>
          ))}
        </ResumeSection>
      ) : null}

      {/* Languages – array of strings */}
      {data?.languages?.length ? (
        <ResumeSection title="Languages" config={config} sectionKey="languages">
          <Typography sx={{ fontSize: settings?.fontSize ?? 14 }}>
            {data.languages.join(", ")}
          </Typography>
        </ResumeSection>
      ) : null}
    </>
  );
};

export default ResumeBody;