import { forwardRef } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";

import ResumePage from "./ResumePage";
import type { ResumeData } from "../../../types/candidate/resume.types";

const HEADER_BG = "#737373"; // Slate / Warm Gray header background
const SIDEBAR_BG = "#f3f4f6"; // Soft gray sidebar background
const TEXT_DARK = "#1f2937";
const TEXT_MUTED = "#6b7280";
const ACCENT = "#111827";

interface Props {
  data: ResumeData;
}

// Helper function to format ISO date to "MMM YYYY"
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Section Header Component matching the clean bold typography in the image
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography
    sx={{
      fontSize: "15px",
      fontWeight: 800,
      color: ACCENT,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      mb: 1.5,
    }}
  >
    {children}
  </Typography>
);

const DarkHeaderTemplate = forwardRef<HTMLDivElement, Props>(
  ({ data }: Props, ref) => {
    // ─── Data Normalization ──────────────────────────────────────────
    const fullName =
      `${data.personal?.firstName || ""} ${data.personal?.lastName || ""}`.trim();
    const jobTitle = data.personal?.jobTitle || "";

    const phone = data.contact?.mobile || data.contact?.alternateMobile || "";
    const email = data.contact?.email || "";
    const locationText =
      [data.contact?.city, data.contact?.state, data.contact?.pincode]
        .filter(Boolean)
        .join(", ") ||
      data.contact?.address ||
      "";
    const linkedin = data.social?.linkedInUrl
      ? data.social.linkedInUrl.replace(/^https?:\/\/(www\.)?/, "")
      : "";
    const website =
      data.social?.portfolioUrl || data.social?.websiteUrl
        ? (data.social?.portfolioUrl || data.social?.websiteUrl)?.replace(
            /^https?:\/\/(www\.)?/,
            "",
          )
        : "";

    const summaryText =
      data.summary?.professionalSummary || data.summary?.careerObjective || "";

    return (
      <ResumePage ref={ref}>
        <Box
          sx={{
            minHeight: "1123px",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            bgcolor: "#ffffff",
            fontFamily: "'Inter', 'Roboto', sans-serif",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* ─── Top Banner / Dark Header ─────────────────────────── */}
          <Box
            sx={{
              bgcolor: HEADER_BG,
              color: "#ffffff",
              pt: 5,
              pb: 4,
              px: 4,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: 1.5,
                lineHeight: 1.2,
                textTransform: "uppercase",
              }}
            >
              {fullName}
            </Typography>
            {jobTitle && (
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 500,
                  opacity: 0.9,
                  mt: 0.8,
                  letterSpacing: 0.5,
                }}
              >
                {jobTitle}
              </Typography>
            )}
          </Box>

          {/* ─── Main Content Body (Two-Column Layout) ────────────── */}
          <Grid container sx={{ flex: 1, p: "32px 36px" }} spacing={4}>
            {/* ─── Left Column (Experience & Summary) ───────────── */}
            <Grid size={{ xs: 12, sm: 7.5 }}>
              {/* Summary */}
              {summaryText && (
                <Box sx={{ mb: 3.5 }}>
                  <Typography
                    sx={{
                      fontSize: 11.5,
                      lineHeight: 1.65,
                      color: TEXT_DARK,
                      textAlign: "justify",
                    }}
                  >
                    {summaryText}
                  </Typography>
                </Box>
              )}

              {/* Experience */}
              {data.experience && data.experience.length > 0 && (
                <Box>
                  <SectionTitle>Experience</SectionTitle>

                  <Stack spacing={3}>
                    {data.experience.map((exp: any, idx: any) => {
                      const startDate = formatDate(exp.startDate);
                      const endDate = exp.isCurrentCompany
                        ? "Present"
                        : formatDate(exp.endDate);

                      // Split description sentences into discrete bullet points
                      const bullets = exp.description
                        ? exp.description
                            .split(".")
                            .map((bullet: any) => bullet.trim())
                            .filter((bullet: any) => bullet.length > 0)
                        : [];

                      return (
                        <Box key={idx} sx={{ position: "relative" }}>
                          {/* Timeline dot matching the design layout */}
                          <Box
                            sx={{
                              position: "absolute",
                              left: "-16px",
                              top: "5px",
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              bgcolor: "#cbd5e1",
                            }}
                          />

                          {/* Date Range */}
                          {(startDate || endDate) && (
                            <Typography
                              sx={{
                                fontSize: 10.5,
                                fontWeight: 700,
                                color: TEXT_MUTED,
                                mb: 0.3,
                              }}
                            >
                              {startDate} - {endDate}
                            </Typography>
                          )}

                          {/* Designation */}
                          <Typography
                            sx={{
                              fontSize: 13,
                              fontWeight: 700,
                              color: ACCENT,
                              lineHeight: 1.2,
                            }}
                          >
                            {exp.designation}
                          </Typography>

                          {/* Company Name & Location */}
                          <Typography
                            sx={{
                              fontSize: 11.5,
                              fontWeight: 700,
                              color: TEXT_DARK,
                              mb: 1,
                            }}
                          >
                            {exp.companyName}
                            {exp.location ? ` | ${exp.location}` : ""}
                          </Typography>

                          {/* Bullet Points */}
                          {bullets.length > 0 && (
                            <Stack spacing={0.6} sx={{ pl: 0.5 }}>
                              {bullets.map((bullet: any, bIdx: any) => (
                                <Stack
                                  direction="row"
                                  sx={{ alignItems: "flex-start" }}
                                  spacing={1}
                                  key={bIdx}
                                >
                                  <Box
                                    sx={{
                                      width: 4,
                                      height: 4,
                                      borderRadius: "50%",
                                      bgcolor: TEXT_DARK,
                                      mt: 0.8,
                                      flexShrink: 0,
                                    }}
                                  />
                                  <Typography
                                    sx={{
                                      fontSize: 10.5,
                                      lineHeight: 1.5,
                                      color: TEXT_DARK,
                                    }}
                                  >
                                    {bullet}.
                                  </Typography>
                                </Stack>
                              ))}
                            </Stack>
                          )}
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              )}
            </Grid>

            {/* ─── Right Column Sidebar (Contact, Skills, Languages, Awards) ─ */}
            <Grid size={{ xs: 12, sm: 4.5 }}>
              <Box
                sx={{
                  bgcolor: SIDEBAR_BG,
                  borderRadius: 2,
                  p: "20px 20px",
                }}
              >
                {/* Contact Section */}
                <Box sx={{ mb: 3 }}>
                  <SectionTitle>Contact</SectionTitle>
                  <Stack spacing={1.2}>
                    {phone && (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center" }}
                        spacing={1.2}
                      >
                        <PhoneIcon sx={{ fontSize: 13, color: ACCENT }} />
                        <Typography
                          sx={{
                            fontSize: 10.5,
                            color: TEXT_DARK,
                            fontWeight: 500,
                          }}
                        >
                          {phone}
                        </Typography>
                      </Stack>
                    )}
                    {email && (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center" }}
                        spacing={1.2}
                      >
                        <EmailIcon sx={{ fontSize: 13, color: ACCENT }} />
                        <Typography
                          sx={{
                            fontSize: 10.5,
                            color: TEXT_DARK,
                            fontWeight: 500,
                            wordBreak: "break-all",
                          }}
                        >
                          {email}
                        </Typography>
                      </Stack>
                    )}
                    {locationText && (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center" }}
                        spacing={1.2}
                      >
                        <LocationOnIcon sx={{ fontSize: 13, color: ACCENT }} />
                        <Typography
                          sx={{
                            fontSize: 10.5,
                            color: TEXT_DARK,
                            fontWeight: 500,
                          }}
                        >
                          {locationText}
                        </Typography>
                      </Stack>
                    )}
                    {linkedin && (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center" }}
                        spacing={1.2}
                      >
                        <LinkedInIcon sx={{ fontSize: 13, color: ACCENT }} />
                        <Typography
                          sx={{
                            fontSize: 10.5,
                            color: TEXT_DARK,
                            fontWeight: 500,
                            wordBreak: "break-all",
                          }}
                        >
                          {linkedin}
                        </Typography>
                      </Stack>
                    )}
                    {website && (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center" }}
                        spacing={1.2}
                      >
                        <LanguageIcon sx={{ fontSize: 13, color: ACCENT }} />
                        <Typography
                          sx={{
                            fontSize: 10.5,
                            color: TEXT_DARK,
                            fontWeight: 500,
                            wordBreak: "break-all",
                          }}
                        >
                          {website}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>
                </Box>

                {/* Skills Section */}
                {data.skills && data.skills.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <SectionTitle>Skills</SectionTitle>
                    <Stack spacing={0.6}>
                      {data.skills.map((skill: any, idx: any) => (
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
                              bgcolor: TEXT_DARK,
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            sx={{
                              fontSize: 10.5,
                              color: TEXT_DARK,
                              fontWeight: 500,
                            }}
                          >
                            {skill.skillName}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Languages Section */}
                {data.languages && data.languages.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <SectionTitle>Languages</SectionTitle>
                    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.8 }}>
                      {data.languages.map((lang, idx) => (
                        <Box
                          key={idx}
                          sx={{
                            bgcolor: "#e5e7eb",
                            px: 1.2,
                            py: 0.4,
                            borderRadius: "12px",
                            fontSize: 10,
                            fontWeight: 600,
                            color: TEXT_DARK,
                          }}
                        >
                          {lang.languageName}
                        </Box>
                      ))}
                    </Stack>
                  </Box>
                )}

                {/* Awards / Achievements Section */}
                {data.achievements && data.achievements.length > 0 && (
                  <Box>
                    <SectionTitle>Awards</SectionTitle>
                    <Stack spacing={1}>
                      {data.achievements.map((ach, idx) => (
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
                              bgcolor: TEXT_DARK,
                              mt: 0.8,
                              flexShrink: 0,
                            }}
                          />
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 10.5,
                                fontWeight: 700,
                                color: TEXT_DARK,
                                lineHeight: 1.3,
                              }}
                            >
                              {ach.title}
                            </Typography>
                            {ach.description && (
                              <Typography
                                sx={{
                                  fontSize: 9.5,
                                  color: TEXT_MUTED,
                                  lineHeight: 1.3,
                                  mt: 0.2,
                                }}
                              >
                                {ach.description}
                              </Typography>
                            )}
                          </Box>
                        </Stack>
                      ))}
                    </Stack>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </ResumePage>
    );
  },
);

DarkHeaderTemplate.displayName = "DarkHeaderTemplate";
export default DarkHeaderTemplate;
