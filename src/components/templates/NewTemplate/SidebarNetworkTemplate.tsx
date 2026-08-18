import React, { forwardRef } from "react";
import { Box, Typography, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PollIcon from "@mui/icons-material/Poll";
import TranslateIcon from "@mui/icons-material/Translate";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ResumePage from "./ResumePage";
import type { ResumeData } from "../../../types/candidate/resume.types";

// Design Tokens
const PRIMARY_BLUE = "#3b63b5";
const TEXT_DARK = "#2d3748";
const TEXT_MUTED = "#64748b";

interface Props {
  data: ResumeData;
}

// Helpers
const formatDate = (dateStr?: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? dateStr
    : date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const cleanUrl = (url?: string): string =>
  url ? url.replace(/^https?:\/\//, "") : "";

// Shared Section Title Component
const SectionTitle = ({
  icon,
  title,
  marginTop = 2.5,
}: {
  icon: React.ReactNode;
  title: string;
  marginTop?: number;
}) => (
  <Box sx={{ mb: 1.5, mt: marginTop }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.5 }}>
      {icon}
      <Typography
        sx={{ fontSize: "14px", fontWeight: 700, color: PRIMARY_BLUE }}
      >
        {title}
      </Typography>
    </Box>
    <Box sx={{ width: "100%", height: "1px", backgroundColor: "#cbd5e1" }} />
  </Box>
);

// Date Badge Component
const DateBadge = ({
  startDate,
  endDate,
}: {
  startDate?: string;
  endDate?: string;
}) => (
  <Box
    sx={{
      backgroundColor: PRIMARY_BLUE,
      color: "#ffffff",
      fontSize: "9.5px",
      fontWeight: 600,
      px: 1.2,
      py: 0.3,
      borderRadius: "12px",
      whiteSpace: "nowrap",
    }}
  >
    {formatDate(startDate)} - {endDate || formatDate(endDate) || "Present"}
  </Box>
);

// Main Component
const SidebarNetworkTemplate = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    const fullName = `${data.personal?.firstName || ""} ${data.personal?.lastName || ""}`.trim();
    const jobTitle = data.personal?.jobTitle || "";
    const locationText =
      [data.contact?.city, data.contact?.state, data.contact?.pincode]
        .filter(Boolean)
        .join(", ") || data.contact?.address || "";
    const summaryText =
      data.summary?.professionalSummary || data.summary?.careerObjective || "";

    return (
      <ResumePage ref={ref}>
        <Box
          sx={{
            minHeight: "1123px",
            color: TEXT_DARK,
            fontFamily: "'Inter', 'Roboto', sans-serif",
            fontSize: "11px",
            lineHeight: 1.5,
            backgroundColor: "#ffffff",
            position: "relative",
            backgroundImage: `radial-gradient(${PRIMARY_BLUE}22 1.2px, transparent 1.2px)`,
            backgroundSize: "24px 24px",
          }}
        >
          <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            
            {/* LEFT COLUMN */}
            <Box
              sx={{
                width: { xs: "100%", md: "35%" },
                p: "28px 20px 28px 28px",
                boxSizing: "border-box",
              }}
            >
              {/* Profile Card */}
              <Box
                sx={{
                  backgroundColor: PRIMARY_BLUE,
                  color: "#ffffff",
                  p: "20px 16px",
                  borderRadius: "8px",
                  mb: 2.5,
                  boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "22px",
                    fontWeight: 800,
                    lineHeight: 1.2,
                    mb: 0.5,
                  }}
                >
                  {fullName}
                </Typography>
                {jobTitle && (
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 500, opacity: 0.9 }}
                  >
                    {jobTitle}
                  </Typography>
                )}
              </Box>

              {/* Contact Information */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2, mb: 2 }}>
                {data.contact?.mobile && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneIcon sx={{ fontSize: 14, color: PRIMARY_BLUE }} />
                    <Typography sx={{ fontSize: "11px", color: TEXT_DARK }}>
                      {data.contact.mobile}
                    </Typography>
                  </Box>
                )}

                {data.contact?.email && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmailIcon sx={{ fontSize: 14, color: PRIMARY_BLUE }} />
                    <Typography sx={{ fontSize: "11px", color: TEXT_DARK }}>
                      {data.contact.email}
                    </Typography>
                  </Box>
                )}

                {data.social?.linkedInUrl && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LinkedInIcon sx={{ fontSize: 14, color: PRIMARY_BLUE }} />
                    <Link
                      href={data.social.linkedInUrl}
                      target="_blank"
                      underline="none"
                      sx={{ fontSize: "11px", color: TEXT_DARK }}
                    >
                      {cleanUrl(data.social.linkedInUrl)}
                    </Link>
                  </Box>
                )}

                {(data.social?.portfolioUrl || data.social?.websiteUrl) && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LanguageIcon sx={{ fontSize: 14, color: PRIMARY_BLUE }} />
                    <Link
                      href={data.social?.portfolioUrl || data.social?.websiteUrl}
                      target="_blank"
                      underline="none"
                      sx={{ fontSize: "11px", color: TEXT_DARK }}
                    >
                      {cleanUrl(data.social?.portfolioUrl || data.social?.websiteUrl)}
                    </Link>
                  </Box>
                )}

                {locationText && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <LocationOnIcon sx={{ fontSize: 14, color: PRIMARY_BLUE }} />
                    <Typography sx={{ fontSize: "11px", color: TEXT_DARK }}>
                      {locationText}
                    </Typography>
                  </Box>
                )}
              </Box>

              {/* Skills */}
              {!!data.skills?.length && (
                <Box>
                  <SectionTitle
                    marginTop={2}
                    icon={<PollIcon sx={{ fontSize: 16, color: PRIMARY_BLUE }} />}
                    title="Skills"
                  />
                  <Box component="ul" sx={{ m: 0, pl: 2, color: TEXT_DARK, display: "flex", flexDirection: "column", gap: 0.4 }}>
                    {data.skills.map((skill, idx) => (
                      <Typography component="li" key={idx} sx={{ fontSize: "11px", lineHeight: 1.4 }}>
                        {skill.skillName}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Languages */}
              {!!data.languages?.length && (
                <Box>
                  <SectionTitle
                    marginTop={2}
                    icon={<TranslateIcon sx={{ fontSize: 16, color: PRIMARY_BLUE }} />}
                    title="Languages"
                  />
                  <Box component="ul" sx={{ m: 0, pl: 2, color: TEXT_DARK, display: "flex", flexDirection: "column", gap: 0.4 }}>
                    {data.languages.map((lang, idx) => (
                      <Typography component="li" key={idx} sx={{ fontSize: "11px", lineHeight: 1.4 }}>
                        {lang.languageName}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            {/* RIGHT COLUMN */}
            <Box
              sx={{
                width: { xs: "100%", md: "65%" },
                p: "28px 28px 28px 12px",
                boxSizing: "border-box",
              }}
            >
              {/* Professional Summary */}
              {summaryText && (
                <Box
                  sx={{
                    backgroundColor: PRIMARY_BLUE,
                    color: "#ffffff",
                    p: "18px 20px",
                    borderRadius: "12px",
                    mb: 2.5,
                    boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <PersonIcon sx={{ fontSize: 18 }} />
                    <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                      Professional Summary
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      fontSize: "11px",
                      lineHeight: 1.5,
                      fontWeight: 400,
                      opacity: 0.95,
                      textAlign: "justify",
                    }}
                  >
                    {summaryText}
                  </Typography>
                </Box>
              )}

              {/* Education */}
              {!!data.education?.length && (
                <Box sx={{ mb: 2 }}>
                  <SectionTitle
                    icon={<SchoolIcon sx={{ fontSize: 18, color: PRIMARY_BLUE }} />}
                    title="Education"
                  />
                  {data.education.map((edu, idx) => (
                    <Box key={idx} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                        <Box sx={{ flex: 1 }}>
                          <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#1e293b" }}>
                            {edu.instituteName}
                          </Typography>
                          <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}>
                            {edu.degree}
                            {edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ""}
                            {edu.percentage ? `, CGPA: ${(edu.percentage / 10).toFixed(1)}` : ""}
                          </Typography>
                        </Box>
                        <DateBadge startDate={edu.startDate} endDate={edu.endDate} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Experience */}
              {!!data.experience?.length && (
                <Box sx={{ mb: 2 }}>
                  <SectionTitle
                    icon={<WorkIcon sx={{ fontSize: 18, color: PRIMARY_BLUE }} />}
                    title="Experience"
                  />
                  {data.experience.map((exp, idx) => {
                    const points = exp.description
                      ?.split(".")
                      .map((p) => p.trim())
                      .filter(Boolean) || [];

                    return (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: "12.5px", fontWeight: 700, color: "#1e293b" }}>
                              {exp.companyName}
                            </Typography>
                            <Typography sx={{ fontSize: "11px", fontWeight: 600, color: "#475569" }}>
                              {exp.designation}
                            </Typography>
                            {exp.location && (
                              <Typography sx={{ fontSize: "10px", color: TEXT_MUTED, fontStyle: "italic" }}>
                                {exp.location}
                              </Typography>
                            )}
                          </Box>
                          <DateBadge
                            startDate={exp.startDate}
                            endDate={exp.isCurrentCompany ? "Present" : exp.endDate}
                          />
                        </Box>

                        {points.length > 0 && (
                          <Box
                            component="ul"
                            sx={{ m: 0, mt: 0.8, pl: 2, color: TEXT_DARK, display: "flex", flexDirection: "column", gap: 0.3 }}
                          >
                            {points.map((point, pIdx) => (
                              <Typography component="li" key={pIdx} sx={{ fontSize: "10.5px", lineHeight: 1.45 }}>
                                {point}.
                              </Typography>
                            ))}
                          </Box>
                        )}
                      </Box>
                    );
                  })}
                </Box>
              )}

              {/* Projects */}
              {!!data.projects?.length && (
                <Box sx={{ mb: 2 }}>
                  <SectionTitle
                    icon={<WorkIcon sx={{ fontSize: 18, color: PRIMARY_BLUE }} />}
                    title="Projects"
                  />
                  {data.projects.map((proj, idx) => (
                    <Box key={idx} sx={{ mb: 1.5 }}>
                      <Typography sx={{ fontSize: "11.5px", fontWeight: 700, color: "#1e293b" }}>
                        {proj.projectName} {proj.role ? `(${proj.role})` : ""}
                      </Typography>
                      <Typography sx={{ fontSize: "10.5px", color: TEXT_DARK, mt: 0.2 }}>
                        {proj.description}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              {/* Awards / Achievements */}
              {!!data.achievements?.length && (
                <Box sx={{ mb: 1 }}>
                  <SectionTitle
                    icon={<EmojiEventsIcon sx={{ fontSize: 18, color: PRIMARY_BLUE }} />}
                    title="Awards"
                  />
                  <Box component="ul" sx={{ m: 0, pl: 2, color: TEXT_DARK, display: "flex", flexDirection: "column", gap: 0.4 }}>
                    {data.achievements.map((ach, idx) => (
                      <Typography component="li" key={idx} sx={{ fontSize: "10.5px" }}>
                        <strong>{ach.title}</strong>
                        {ach.achievementDate ? `, ${formatDate(ach.achievementDate)}` : ""}
                        {ach.description ? ` — ${ach.description}` : ""}
                      </Typography>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </ResumePage>
    );
  }
);

SidebarNetworkTemplate.displayName = "SidebarNetworkTemplate";
export default SidebarNetworkTemplate;