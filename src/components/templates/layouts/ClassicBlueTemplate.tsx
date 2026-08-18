import { forwardRef } from "react";
import { Box, Divider, Typography } from "@mui/material";
import ResumePage from "../shared/ResumePage";
import { BulletList, ContactList, DateBadge, EducationBlock, SectionTitle, SkillPills } from "../shared/atoms";
import type { ResumeData } from "../types/resume";

const ACCENT = "#1e40af";

interface Props {
  data: ResumeData;
}

const ClassicBlueTemplate = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personalInfo, summary, skills, education, experience } = data;
  return (
    <ResumePage ref={ref}>
      <Box sx={{ p: "40px 44px" }}>
        <Typography sx={{ fontSize: 26, fontWeight: 800, color: ACCENT, mb: 1 }}>
          {personalInfo.fullName}
        </Typography>
        <Box sx={{ pb: 1.5, mb: 2.5 }}>
          <ContactList info={personalInfo} color="#475569" iconColor={ACCENT} />
        </Box>
        <Divider sx={{ mb: 2.5 }} />

        <SectionTitle color={ACCENT}>Professional Summary</SectionTitle>
        <Typography sx={{ fontSize: 12, lineHeight: 1.7, color: "#334155", mb: 2.5 }}>{summary}</Typography>

        <SectionTitle color={ACCENT}>Skills</SectionTitle>
        <Box sx={{ mb: 2.5 }}>
          <SkillPills skills={skills} color={ACCENT} />
        </Box>

        <SectionTitle color={ACCENT}>Education</SectionTitle>
        <Box sx={{ mb: 2.5 }}>
          {education.map((e) => (
            <EducationBlock key={e.id} entry={e} accent={ACCENT} />
          ))}
        </Box>

        <SectionTitle color={ACCENT}>Experience</SectionTitle>
        {experience.map((exp) => (
          <Box key={exp.id} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 0.5 }}>
              <Box>
                <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>{exp.company}</Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>{exp.role}</Typography>
                {exp.location && (
                  <Typography sx={{ fontSize: 10.5, fontStyle: "italic", color: "text.secondary" }}>
                    {exp.location}
                  </Typography>
                )}
              </Box>
              <DateBadge color={ACCENT} filled={false}>
                {exp.startDate} - {exp.endDate}
              </DateBadge>
            </Box>
            <BulletList items={exp.bullets} />
          </Box>
        ))}
      </Box>
    </ResumePage>
  );
});

ClassicBlueTemplate.displayName = "ClassicBlueTemplate";
export default ClassicBlueTemplate;
