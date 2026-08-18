import { forwardRef } from "react";
import { Box, Typography, Stack } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ResumePage from "./ResumePage";
import type { ResumeData } from "../../../types/candidate/resume.types";

const SIDEBAR_HEADER_BG = "#f5e6e3";
const SIDEBAR_BG = "#faf3f0";
const SIDEBAR_TEXT = "#3a2b2b";
const MAIN_TEXT = "#2d3748";
const ACCENT_TEXT = "#1a202c";
const MUTED_TEXT = "#64748b";

interface Props {
  data: ResumeData;
}

// Helper: format ISO date to "MMM YYYY" or "YYYY"
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Section Header matching image style
const SectionHeader = ({ title }: { title: string }) => (
  <Typography
    sx={{
      fontSize: "14px",
      fontWeight: 700,
      color: ACCENT_TEXT,
      mb: 1.5,
      lineHeight: 1.2,
    }}
  >
    {title}
  </Typography>
);

const PinkSidebarTemplate = forwardRef<HTMLDivElement, Props>(
  ({ data }: Props, ref) => {
    // Personal Info
    const firstName = data.personal?.firstName || "";
    const lastName = data.personal?.lastName || "";
    const jobTitle = data.personal?.jobTitle || "";

    // Contact
    const phone = data.contact?.mobile || data.contact?.alternateMobile || "";
    const email = data.contact?.email || "";
    const locationParts = [
      data.contact?.city,
      data.contact?.state,
      data.contact?.pincode,
    ].filter(Boolean);
    const locationText = locationParts.join(", ") || data.contact?.address || "";

    // Summary
    const summaryText =
      data.summary?.professionalSummary || data.summary?.careerObjective || "";

    // Skills
    const skillsList = data.skills?.map((s) => s.skillName) || [];

    // Awards / Achievements
    const awards =
      data.achievements?.map((a) => a.title).filter(Boolean) || [];

    return (
      <ResumePage ref={ref}>
        <Box
          sx={{
            display: "flex",
            minHeight: "1123px",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            bgcolor: "#ffffff",
            fontFamily: "'Inter', 'Roboto', sans-serif",
            boxSizing: "border-box",
          }}
        >
          {/* ================= LEFT SIDEBAR (34%) ================= */}
          <Box
            sx={{
              width: "34%",
              bgcolor: SIDEBAR_BG,
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
            }}
          >
            {/* Sidebar Top Header Box */}
            <Box
              sx={{
                bgcolor: SIDEBAR_HEADER_BG,
                p: "36px 20px 24px 24px",
                borderBottom: "1px solid #e2d3ce",
              }}
            >
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: SIDEBAR_TEXT,
                  lineHeight: 1.1,
                  letterSpacing: 0.5,
                  textTransform: "uppercase",
                }}
              >
                {firstName}
                <br />
                {lastName}
              </Typography>

              {jobTitle && (
                <Typography
                  sx={{
                    fontSize: 11.5,
                    color: SIDEBAR_TEXT,
                    mt: 1,
                    mb: 2,
                    fontWeight: 500,
                  }}
                >
                  {jobTitle}
                </Typography>
              )}

              {/* Divider line */}
              <Box
                sx={{
                  width: "100%",
                  height: "1px",
                  bgcolor: "#3a2b2b",
                  opacity: 0.4,
                  mb: 2,
                }}
              />

              {/* Contact Information */}
              <Stack spacing={1}>
                {phone && (
                  <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PhoneIcon sx={{ fontSize: 10, color: SIDEBAR_TEXT }} />
                    </Box>
                    <Typography
                      sx={{ fontSize: 10.5, color: SIDEBAR_TEXT, fontWeight: 500 }}
                    >
                      {phone}
                    </Typography>
                  </Stack>
                )}

                {email && (
                  <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <EmailIcon sx={{ fontSize: 10, color: SIDEBAR_TEXT }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: SIDEBAR_TEXT,
                        fontWeight: 500,
                        wordBreak: "break-word",
                      }}
                    >
                      {email}
                    </Typography>
                  </Stack>
                )}

                {locationText && (
                  <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        bgcolor: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <LocationOnIcon sx={{ fontSize: 10, color: SIDEBAR_TEXT }} />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: 10,
                        color: SIDEBAR_TEXT,
                        fontWeight: 500,
                        wordBreak: "break-word",
                      }}
                    >
                      {locationText}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Box>

            {/* Sidebar Bottom Content */}
            <Box sx={{ p: "24px 20px 24px 24px" }}>
              {/* Skills */}
              {skillsList.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: SIDEBAR_TEXT,
                      mb: 1.2,
                    }}
                  >
                    Skills
                  </Typography>
                  <Stack spacing={0.6}>
                    {skillsList.map((skill, idx) => (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center" }}
                        spacing={1}
                        key={idx}
                      >
                        <Box
                          sx={{
                            width: 3.5,
                            height: 3.5,
                            borderRadius: "50%",
                            bgcolor: SIDEBAR_TEXT,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: 10.5,
                            color: SIDEBAR_TEXT,
                            fontWeight: 500,
                          }}
                        >
                          {skill}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Awards */}
              {awards.length > 0 && (
                <Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: SIDEBAR_TEXT,
                      mb: 1.2,
                    }}
                  >
                    Awards
                  </Typography>
                  <Stack spacing={0.8}>
                    {awards.map((award, idx) => (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "flex-start" }}
                        spacing={1}
                        key={idx}
                      >
                        <Box
                          sx={{
                            width: 3.5,
                            height: 3.5,
                            borderRadius: "50%",
                            bgcolor: SIDEBAR_TEXT,
                            mt: 0.8,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: 10.5,
                            color: SIDEBAR_TEXT,
                            lineHeight: 1.4,
                          }}
                        >
                          {award}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </Box>
          </Box>

          {/* ================= MAIN CONTENT (66%) ================= */}
          <Box sx={{ flex: 1, p: "36px 32px" }}>
            {/* Summary */}
            {summaryText && (
              <Box sx={{ mb: 3.5 }}>
                <SectionHeader title="Summary" />
                <Typography
                  sx={{
                    fontSize: 11,
                    lineHeight: 1.6,
                    color: MAIN_TEXT,
                    textAlign: "justify",
                  }}
                >
                  {summaryText}
                </Typography>
              </Box>
            )}

            {/* Education */}
            {data.education && data.education.length > 0 && (
              <Box sx={{ mb: 3.5 }}>
                <SectionHeader title="Education" />
                {data.education.map((edu: any, idx) => {
                  const endDateStr = formatDate(edu.endDate);
                  const location = data.contact?.city
                    ? `${data.contact?.city}, ${data.contact?.state || ""}`
                    : "";

                  return (
                    <Box key={idx} sx={{ position: "relative", pl: 2, mb: 1.5 }}>
                      <Box
                        sx={{
                          position: "absolute",
                          left: 0,
                          top: 5,
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          bgcolor: ACCENT_TEXT,
                        }}
                      />
                      <Stack
                        direction="row"
                        sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
                      >
                        <Typography
                          sx={{
                            fontSize: 11.5,
                            fontWeight: 700,
                            color: ACCENT_TEXT,
                          }}
                        >
                          {edu.instituteName}
                        </Typography>
                        {endDateStr && (
                          <Typography
                            sx={{
                              fontSize: 10,
                              color: MUTED_TEXT,
                              fontWeight: 500,
                            }}
                          >
                            {endDateStr}
                          </Typography>
                        )}
                      </Stack>

                      <Stack
                        direction="row"
                        sx={{ justifyContent: "space-between", alignItems: "center" }}
                      >
                        <Typography sx={{ fontSize: 10.5, color: MAIN_TEXT }}>
                          {edu.degree}
                          {edu.fieldOfStudy ? ` - ${edu.fieldOfStudy}` : ""}
                          {edu.percentage ? `, CGPA: ${(edu.percentage / 10).toFixed(1)}` : ""}
                        </Typography>
                        {location && (
                          <Typography
                            sx={{ fontSize: 10, color: MUTED_TEXT, fontStyle: "italic" }}
                          >
                            {location}
                          </Typography>
                        )}
                      </Stack>
                    </Box>
                  );
                })}
              </Box>
            )}

            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <Box sx={{ mb: 3 }}>
                <SectionHeader title="Experience" />
                <Stack spacing={2.5}>
                  {data.experience.map((exp: any, idx) => {
                    const startDate = formatDate(exp.startDate);
                    const endDate = exp.isCurrentCompany
                      ? "Present"
                      : formatDate(exp.endDate);

                    const bullets = exp.description
                      ? exp.description
                          .split(".")
                          .map((bullet: any) => bullet.trim())
                          .filter((bullet: any) => bullet.length > 0)
                      : [];

                    return (
                      <Box key={idx}>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
                        >
                          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                            <Box
                              sx={{
                                width: 4,
                                height: 4,
                                borderRadius: "50%",
                                bgcolor: ACCENT_TEXT,
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: 12,
                                fontWeight: 700,
                                color: ACCENT_TEXT,
                              }}
                            >
                              {exp.companyName}
                            </Typography>
                          </Stack>

                          {(startDate || endDate) && (
                            <Typography
                              sx={{
                                fontSize: 10,
                                color: MUTED_TEXT,
                                fontWeight: 500,
                              }}
                            >
                              {startDate} - {endDate}
                            </Typography>
                          )}
                        </Stack>

                        <Stack
                          direction="row"
                          
                          sx={{ pl: 2, mb: 1, justifyContent: "space-between", alignItems: "center" }}
                        >
                          <Typography
                            sx={{
                              fontSize: 10.5,
                              color: MUTED_TEXT,
                              fontWeight: 500,
                            }}
                          >
                            {exp.designation}
                          </Typography>
                          {exp.location && (
                            <Typography
                              sx={{
                                fontSize: 10,
                                color: MUTED_TEXT,
                                fontStyle: "italic",
                              }}
                            >
                              {exp.location}
                            </Typography>
                          )}
                        </Stack>

                        {/* Bullet Points */}
                        <Stack spacing={0.6} sx={{ pl: 2 }}>
                          {bullets.map((bullet: any, bIdx: any) => (
                            <Stack
                              direction="row"
                              sx={{ alignItems: "flex-start" }}
                              spacing={1}
                              key={bIdx}
                            >
                              <Box
                                sx={{
                                  width: 3.5,
                                  height: 3.5,
                                  borderRadius: "50%",
                                  bgcolor: MAIN_TEXT,
                                  mt: 0.8,
                                  flexShrink: 0,
                                }}
                              />
                              <Typography
                                sx={{
                                  fontSize: 10.5,
                                  lineHeight: 1.5,
                                  color: MAIN_TEXT,
                                }}
                              >
                                {bullet}.
                              </Typography>
                            </Stack>
                          ))}
                        </Stack>
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            )}
          </Box>
        </Box>
      </ResumePage>
    );
  }
);

PinkSidebarTemplate.displayName = "PinkSidebarTemplate";
export default PinkSidebarTemplate;