import { forwardRef } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ResumePage from "./ResumePage";
import type { ResumeData } from "../../../types/candidate/resume.types";

// Design Palette matching the provided Coral template image
const CORAL_PRIMARY = "#eb5e52"; // Coral Red accent
const CORAL_LIGHT_BG = "#fceae6"; // Light coral background tint for contact box
const TEXT_DARK = "#1e293b"; // Primary dark body text
const TEXT_MUTED = "#64748b"; // Secondary text color
const BORDER_COLOR = "#e2e8f0"; // Divider line color

interface Props {
  data: ResumeData;
}

// Helper to format ISO dates to "MMM YYYY"
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Section Header with Horizontal Line Divider
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ mb: 1.5 }}>
    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.5}>
      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: 800,
          color: TEXT_DARK,
          textTransform: "uppercase",
          letterSpacing: 0.8,
        }}
      >
        {children}
      </Typography>
      <Box
        sx={{
          flexGrow: 1,
          height: "1px",
          bgcolor: BORDER_COLOR,
        }}
      />
    </Stack>
  </Box>
);

const CoralHeaderTemplate = forwardRef<HTMLDivElement, Props>(
  ({ data }: Props, ref) => {
    // ─── Data Extraction ───────────────────────────────────────────────────
    const fullName = `${data.personal?.firstName || ""} ${data.personal?.lastName || ""}`.trim();
    const jobTitle = data.personal?.jobTitle || "";

    const summaryText =
      data.summary?.professionalSummary || data.summary?.careerObjective || "";

    const phone = data.contact?.mobile || data.contact?.alternateMobile || "";
    const email = data.contact?.email || "";
    const website = data.social?.portfolioUrl || data.social?.websiteUrl
      ? (data.social?.portfolioUrl || data.social?.websiteUrl)?.replace(/^https?:\/\/(www\.)?/, "")
      : "";
    const location =
      [data.contact?.city, data.contact?.state, data.contact?.pincode]
        .filter(Boolean)
        .join(", ") || data.contact?.address || "";

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
          {/* ─── 1. SPLIT TOP HEADER ────────────────────────────────────── */}
          <Grid container sx={{ minHeight: "90px" }}>
            {/* Left Header Info (Name & Title) */}
            <Grid size={{ xs: 7 }} sx={{ p: "28px 32px 16px 32px" }}>
              <Typography
                sx={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: TEXT_DARK,
                  letterSpacing: -0.3,
                  lineHeight: 1.1,
                }}
              >
                {fullName}
              </Typography>
              {jobTitle && (
                <Typography
                  sx={{
                    fontSize: 12.5,
                    fontWeight: 500,
                    color: TEXT_MUTED,
                    mt: 0.5,
                  }}
                >
                  {jobTitle}
                </Typography>
              )}
            </Grid>

            {/* Right Header Solid Coral Block */}
            <Grid
              size={{ xs: 5 }}
              sx={{
                bgcolor: CORAL_PRIMARY,
                borderBottomLeftRadius: 0,
              }}
            />
          </Grid>

          {/* ─── 2. SUMMARY SECTION ─────────────────────────────────────── */}
          {summaryText && (
            <Box sx={{ px: 4, pt: 1, pb: 2 }}>
              <SectionTitle>SUMMARY</SectionTitle>
              <Typography
                sx={{
                  fontSize: 10.5,
                  lineHeight: 1.6,
                  color: TEXT_DARK,
                  textAlign: "justify",
                }}
              >
                {summaryText}
              </Typography>
            </Box>
          )}

          {/* ─── 3. TWO COLUMN BODY LAYOUT ──────────────────────────────── */}
          <Grid container sx={{ px: 4, py: 1, flexGrow: 1 }} spacing={3.5}>
            {/* ─── LEFT COLUMN ────────────────────────────────────────── */}
            <Grid size={{ xs: 4.2 }}>
              {/* CONTACT BOX (Coral Tinted Card with Icon Badges) */}
              <Box
                sx={{
                  bgcolor: CORAL_LIGHT_BG,
                  borderRadius: "12px",
                  p: 2,
                  mb: 3,
                }}
              >
                <Stack spacing={1.2}>
                  {phone && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.2}>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: "6px",
                          bgcolor: CORAL_PRIMARY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <PhoneIcon sx={{ fontSize: 12, color: "#ffffff" }} />
                      </Box>
                      <Typography sx={{ fontSize: 10, color: TEXT_DARK, fontWeight: 500 }}>
                        {phone}
                      </Typography>
                    </Stack>
                  )}

                  {email && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.2}>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: "6px",
                          bgcolor: CORAL_PRIMARY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <EmailIcon sx={{ fontSize: 12, color: "#ffffff" }} />
                      </Box>
                      <Typography sx={{ fontSize: 10, color: TEXT_DARK, fontWeight: 500, wordBreak: "break-all" }}>
                        {email}
                      </Typography>
                    </Stack>
                  )}

                  {website && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.2}>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: "6px",
                          bgcolor: CORAL_PRIMARY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <LanguageIcon sx={{ fontSize: 12, color: "#ffffff" }} />
                      </Box>
                      <Typography sx={{ fontSize: 10, color: TEXT_DARK, fontWeight: 500 }}>
                        {website}
                      </Typography>
                    </Stack>
                  )}

                  {location && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1.2}>
                      <Box
                        sx={{
                          width: 22,
                          height: 22,
                          borderRadius: "6px",
                          bgcolor: CORAL_PRIMARY,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <LocationOnIcon sx={{ fontSize: 12, color: "#ffffff" }} />
                      </Box>
                      <Typography sx={{ fontSize: 10, color: TEXT_DARK, fontWeight: 500 }}>
                        {location}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>

              {/* SKILLS SECTION */}
              {data.skills && data.skills.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionTitle>SKILLS</SectionTitle>
                  <Stack spacing={0.6}>
                    {data.skills.map((skill, idx) => (
                      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1} key={idx}>
                        <Box
                          sx={{
                            width: 3.5,
                            height: 3.5,
                            borderRadius: "50%",
                            bgcolor: TEXT_DARK,
                            flexShrink: 0,
                          }}
                        />
                        <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                          {skill.skillName}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* AWARDS SECTION */}
              {data.achievements && data.achievements.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionTitle>AWARDS</SectionTitle>
                  <Stack spacing={0.8}>
                    {data.achievements.map((ach, idx) => (
                      <Stack direction="row" sx={{ alignItems: "flex-start" }} spacing={1} key={idx}>
                        <Box
                          sx={{
                            width: 3.5,
                            height: 3.5,
                            borderRadius: "50%",
                            bgcolor: TEXT_DARK,
                            mt: 0.7,
                            flexShrink: 0,
                          }}
                        />
                        <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                          {ach.title}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* LANGUAGES SECTION */}
              {data.languages && data.languages.length > 0 && (
                <Box>
                  <SectionTitle>LANGUAGES</SectionTitle>
                  <Stack spacing={0.6}>
                    {data.languages.map((lang, idx) => (
                      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1} key={idx}>
                        <Box
                          sx={{
                            width: 3.5,
                            height: 3.5,
                            borderRadius: "50%",
                            bgcolor: TEXT_DARK,
                            flexShrink: 0,
                          }}
                        />
                        <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                          {lang.languageName}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </Grid>

            {/* ─── RIGHT COLUMN ───────────────────────────────────────── */}
            <Grid size={{ xs: 7.8 }}>
              {/* EDUCATION SECTION */}
              {data.education && data.education.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionTitle>EDUCATION</SectionTitle>
                  <Stack spacing={2}>
                    {data.education.map((edu: any, idx: number) => {
                      const startDate = formatDate(edu.startDate);
                      const endDate = formatDate(edu.endDate);
                      const dateRange =
                        startDate && endDate
                          ? `${startDate} - ${endDate}`
                          : startDate || endDate;

                      return (
                        <Box key={idx} sx={{ position: "relative", pl: 2.5 }}>
                          {/* Circle Ring Timeline Node */}
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              top: 3,
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              border: `1.5px solid ${BORDER_COLOR}`,
                              bgcolor: "#ffffff",
                            }}
                          />

                          <Grid container sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
                            <Grid size={{ xs: 7 }}>
                              <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: TEXT_DARK }}>
                                {edu.instituteName}
                              </Typography>
                            </Grid>
                            <Grid size={{ xs: 5 }} sx={{ textAlign: "right" }}>
                              <Typography sx={{ fontSize: 10, color: TEXT_MUTED }}>
                                {dateRange}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Grid container sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
                            <Grid size={{ xs: 8 }}>
                              <Typography sx={{ fontSize: 10.5, color: TEXT_MUTED }}>
                                {edu.degree}
                                {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                                {edu.percentage !== undefined
                                  ? `, CGPA: ${edu.percentage / 10}`
                                  : ""}
                              </Typography>
                            </Grid>
                            {location && (
                              <Grid size={{ xs: 4 }} sx={{ textAlign: "right" }}>
                                <Typography sx={{ fontSize: 10, color: TEXT_MUTED }}>
                                  {data.contact?.city}, {data.contact?.state}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              )}

              {/* EXPERIENCE SECTION WITH TIMELINE LINE */}
              {data.experience && data.experience.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionTitle>EXPERIENCE</SectionTitle>

                  <Box sx={{ position: "relative" }}>
                    {/* Thin Vertical Timeline Line */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: 3.5,
                        top: 6,
                        bottom: 12,
                        width: "1px",
                        bgcolor: BORDER_COLOR,
                        zIndex: 0,
                      }}
                    />

                    <Stack spacing={2.5}>
                      {data.experience.map((exp: any, idx: number) => {
                        const startDate = formatDate(exp.startDate);
                        const endDate = exp.isCurrentCompany
                          ? "Present"
                          : formatDate(exp.endDate);
                        const dateRange =
                          startDate && endDate
                            ? `${startDate} - ${endDate}`
                            : startDate || endDate;

                        // Sentence splitting for description bullets
                        const bullets = exp.description
                          ? exp.description
                              .split(".")
                              .map((b: string) => b.trim())
                              .filter((b: string) => b.length > 0)
                          : [];

                        return (
                          <Box key={idx} sx={{ position: "relative", pl: 2.5, zIndex: 1 }}>
                            {/* Circle Ring Timeline Node */}
                            <Box
                              sx={{
                                position: "absolute",
                                left: 0,
                                top: 4,
                                width: 7,
                                height: 7,
                                borderRadius: "50%",
                                border: `1.5px solid ${BORDER_COLOR}`,
                                bgcolor: "#ffffff",
                              }}
                            />

                            <Grid container sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
                              <Grid size={{ xs: 7 }}>
                                <Typography
                                  sx={{
                                    fontSize: 12,
                                    fontWeight: 700,
                                    color: TEXT_DARK,
                                  }}
                                >
                                  {exp.companyName}
                                </Typography>
                              </Grid>
                              <Grid size={{ xs: 5 }} sx={{ textAlign: "right" }}>
                                <Typography sx={{ fontSize: 10, color: TEXT_MUTED }}>
                                  {dateRange}
                                </Typography>
                              </Grid>
                            </Grid>

                            <Grid container sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 0.8 }}>
                              <Grid size={{ xs: 8 }}>
                                <Typography
                                  sx={{
                                    fontSize: 10.5,
                                    fontWeight: 500,
                                    color: TEXT_MUTED,
                                  }}
                                >
                                  {exp.designation}
                                </Typography>
                              </Grid>
                              {exp.location && (
                                <Grid size={{ xs: 4 }} sx={{ textAlign: "right" }}>
                                  <Typography sx={{ fontSize: 10, color: TEXT_MUTED }}>
                                    {exp.location}
                                  </Typography>
                                </Grid>
                              )}
                            </Grid>

                            {/* Description Bullet List */}
                            {bullets.length > 0 && (
                              <Stack spacing={0.5}>
                                {bullets.map((bullet: string, bIdx: number) => (
                                  <Stack direction="row" sx={{ alignItems: "flex-start" }} spacing={0.8} key={bIdx}>
                                    <Box
                                      sx={{
                                        width: 3.5,
                                        height: 3.5,
                                        borderRadius: "50%",
                                        bgcolor: TEXT_DARK,
                                        mt: 0.7,
                                        flexShrink: 0,
                                      }}
                                    />
                                    <Typography
                                      sx={{
                                        fontSize: 10,
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
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </ResumePage>
    );
  }
);

CoralHeaderTemplate.displayName = "CoralHeaderTemplate";
export default CoralHeaderTemplate;