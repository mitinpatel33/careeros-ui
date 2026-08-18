import { forwardRef } from "react";
import { Box, Divider, Typography } from "@mui/material";
import type { ResumeData } from "../../../types/candidate/resume.types";
import ResumePage from "../NewTemplate/ResumePage";
import { BulletList, ContactList, DateBadge, EducationBlock, SectionTitle, SkillPills } from "../NewTemplate/atoms";

const ACCENT = "#1e40af";

interface Props {
  data: ResumeData;
}

const ClassicBlueTemplate = forwardRef<HTMLDivElement, Props>(({ data }, ref) => {
  const { personal, summary, skills, experience } = data;
  const summaryText =
    typeof summary === "string"
      ? summary
      : summary?.professionalSummary || summary?.careerObjective || "";
  const skillNames = (skills ?? []).map((skill) => skill.skillName);
  const formatDateLabel = (value?: string | Date) => {
    if (!value) return "";
    if (value instanceof Date) return value.toLocaleDateString();
    return value;
  };

  const formatDateRange = (start?: string | Date, end?: string | Date) => {
    const startLabel = formatDateLabel(start);
    const endLabel = formatDateLabel(end);
    return [startLabel, endLabel].filter(Boolean).join(" - ");
  };

  const contactInfo = {
    ...(personal ?? {}),
    fullName:
      `${personal?.firstName ?? ""} ${personal?.lastName ?? ""}`.trim(),
    firstName: personal?.firstName ?? "",
    lastName: personal?.lastName ?? "",
    jobTitle: personal?.jobTitle ?? "",
    email: data.contact?.email,
    phone: data.contact?.mobile ?? "",
    city: data.contact?.city ?? "",
    country: data.contact?.country ?? "",
    website: data.social?.websiteUrl ?? "",
    linkedIn: data.social?.linkedInUrl ?? "",
  };

  return (
    <ResumePage ref={ref}>
      <Box sx={{ p: "40px 44px" }}>
        <Typography sx={{ fontSize: 26, fontWeight: 800, color: ACCENT, mb: 1 }}>
          {personal?.firstName || ""}
        </Typography>
        <Box sx={{ pb: 1.5, mb: 2.5 }}>
          <ContactList info={contactInfo} color="#475569" iconColor={ACCENT} />
        </Box>
        <Divider sx={{ mb: 2.5 }} />

        <SectionTitle color={ACCENT}>Professional Summary</SectionTitle>
        <Typography sx={{ fontSize: 12, lineHeight: 1.7, color: "#334155", mb: 2.5 }}>{summaryText}</Typography>

        <SectionTitle color={ACCENT}>Skills</SectionTitle>
        <Box sx={{ mb: 2.5 }}>
          <SkillPills skills={skillNames} color={ACCENT} />
        </Box>

        <SectionTitle color={ACCENT}>Education</SectionTitle>
        <Box sx={{ mb: 2.5 }}>
          {(data.education ?? []).map((e, idx) => {
            const normalizedEntry = {
              ...e,
              id: `education-${idx}`,
              institution: e.instituteName ?? "",
              degree: e.degree ?? "",
              fieldOfStudy: e.fieldOfStudy ?? "",
              grade: e.grade ?? "",
              description: e.description ?? "",
              startDate: e.startDate ?? "",
              endDate: e.endDate ?? "",
              date:
                [e.startDate ? new Date(e.startDate).getFullYear() : "", e.endDate ? new Date(e.endDate).getFullYear() : ""]
                  .filter(Boolean)
                  .join(" - ") ||
                "",
            };

            return <EducationBlock key={normalizedEntry.id} entry={normalizedEntry} accent={ACCENT} />;
          })}
        </Box>

        <SectionTitle color={ACCENT}>Experience</SectionTitle>
        {experience && experience.map((exp, idx: any) => (
          <Box key={idx} sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 0.5 }}>
              <Box>
                <Typography sx={{ fontSize: 13.5, fontWeight: 800 }}>{exp.companyName}</Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: ACCENT }}>{exp.designation}</Typography>
                {exp.location && (
                  <Typography sx={{ fontSize: 10.5, fontStyle: "italic", color: "text.secondary" }}>
                    {exp.location}
                  </Typography>
                )}
              </Box>
              <DateBadge color={ACCENT} filled={false}>
                {formatDateRange(exp.startDate, exp.endDate)}
              </DateBadge>
            </Box>
            <BulletList items={(exp.description ? exp.description.split("\n").filter(Boolean) : [])} />
          </Box>
        ))}
      </Box>
    </ResumePage>
  );
});

ClassicBlueTemplate.displayName = "ClassicBlueTemplate";
export default ClassicBlueTemplate;
