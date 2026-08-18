import { forwardRef } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ResumePage from "./ResumePage";
import type { ResumeData } from "../../../types/candidate/resume.types";

const TEAL = "#2dd4bf"; // Bright teal color for accents
const TEAL_TEXT = "#0d9488"; // Dark teal for titles
const TEXT_DARK = "#334155"; // Dark slate for primary body text
const TEXT_MUTED = "#64748b"; // Light slate for secondary text

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

// Section Header with Underline Rule matching the image exact style
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography
      sx={{
        fontSize: "13px",
        fontWeight: 800,
        color: TEAL_TEXT,
        textTransform: "uppercase",
        letterSpacing: 0.8,
      }}
    >
      {children}
    </Typography>
    <Box
      sx={{
        width: "100%",
        height: "1px",
        bgcolor: "#cbd5e1",
        mt: 0.5,
      }}
    />
  </Box>
);

const TealDottedTemplate = forwardRef<HTMLDivElement, Props>(
  ({ data }: Props, ref) => {
    // ─── Extract Data ──────────────────────────────────────────────────────
    const fullName = `${data.personal?.firstName || ""} ${data.personal?.lastName || ""}`.trim();

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
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* ─── Light Teal Bubble/Dotted Header Pattern ───────────────── */}
          <Box
            sx={{
              position: "absolute",
              top: -40,
              left: -40,
              right: -40,
              height: 140,
              opacity: 0.15,
              pointerEvents: "none",
              background: `radial-gradient(circle at 20% 30%, ${TEAL} 25px, transparent 26px),
                           radial-gradient(circle at 45% 60%, ${TEAL} 35px, transparent 36px),
                           radial-gradient(circle at 75% 20%, ${TEAL} 30px, transparent 31px),
                           radial-gradient(circle at 90% 70%, ${TEAL} 20px, transparent 21px)`,
            }}
          />

          {/* ─── Header Section (Name + Top-Right Contact Info) ────────── */}
          <Box sx={{ p: "32px 40px 16px", position: "relative", zIndex: 1 }}>
            <Grid container sx={{ alignItems: "flex-start" }} spacing={2}>
              <Grid size={{ xs: 7 }}>
                <Typography
                  sx={{
                    fontSize: 28,
                    fontWeight: 800,
                    color: "#0f172a",
                    letterSpacing: -0.5,
                    lineHeight: 1.1,
                  }}
                >
                  {fullName}
                </Typography>
              </Grid>

              <Grid size={{ xs: 5 }}>
                <Stack spacing={0.6} sx={{ alignItems: "flex-end" }}>
                  {phone && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.8}>
                      <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                        {phone}
                      </Typography>
                      <PhoneIcon sx={{ fontSize: 13, color: TEAL_TEXT }} />
                    </Stack>
                  )}
                  {email && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.8}>
                      <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                        {email}
                      </Typography>
                      <EmailIcon sx={{ fontSize: 13, color: TEAL_TEXT }} />
                    </Stack>
                  )}
                  {website && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.8}>
                      <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                        {website}
                      </Typography>
                      <LanguageIcon sx={{ fontSize: 13, color: TEAL_TEXT }} />
                    </Stack>
                  )}
                  {location && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.8}>
                      <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                        {location}
                      </Typography>
                      <LocationOnIcon sx={{ fontSize: 13, color: TEAL_TEXT }} />
                    </Stack>
                  )}
                </Stack>
              </Grid>
            </Grid>

            {/* Summary */}
            {summaryText && (
              <Typography
                sx={{
                  fontSize: 11,
                  lineHeight: 1.6,
                  color: TEXT_DARK,
                  mt: 2.5,
                  maxWidth: "92%",
                  textAlign: "justify",
                }}
              >
                {summaryText}
              </Typography>
            )}
          </Box>

          {/* ─── Two-Column Layout ───────────────────────────────────────── */}
          <Grid container sx={{ px: 5, py: 2 }} spacing={4}>
            {/* ─── Left Sidebar (Skills, Awards, Languages) ───────────────── */}
            <Grid size={{ xs: 12, sm: 4 }}>
              {/* Skills */}
              {data.skills && data.skills.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionTitle>Skills</SectionTitle>
                  <Stack spacing={0.7}>
                    {data.skills.map((s, idx) => (
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
                          {s.skillName}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Awards / Achievements */}
              {data.achievements && data.achievements.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionTitle>Awards</SectionTitle>
                  <Stack spacing={1}>
                    {data.achievements.map((ach: any, idx) => (
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
                        <Box>
                          <Typography sx={{ fontSize: 10.5, fontWeight: 600, color: TEXT_DARK }}>
                            {ach.title}
                          </Typography>
                          {ach.achievementDate && (
                            <Typography sx={{ fontSize: 9.5, color: TEXT_MUTED }}>
                              {formatDate(ach.achievementDate)}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Languages */}
              {data.languages && data.languages.length > 0 && (
                <Box>
                  <SectionTitle>Language</SectionTitle>
                  <Stack spacing={0.7}>
                    {data.languages.map((lang: any, idx: any) => (
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

            {/* ─── Right Column (Education & Experience Timeline) ──────────── */}
            <Grid size={{ xs: 12, sm: 8 }}>
              {/* Education */}
              {data.education && data.education.length > 0 && (
                <Box sx={{ mb: 3.5 }}>
                  <SectionTitle>Education</SectionTitle>
                  <Stack spacing={2}>
                    {data.education.map((edu: any, idx: any) => {
                      const startDate = formatDate(edu.startDate);
                      const endDate = formatDate(edu.endDate);
                      const dateRange =
                        startDate && endDate
                          ? `${startDate} - ${endDate}`
                          : startDate || endDate;

                      return (
                        <Box key={idx} sx={{ position: "relative", pl: 2.5 }}>
                          {/* Timeline Green Dot */}
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              top: 4,
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: TEAL,
                            }}
                          />

                          {/* Date Pill Badge */}
                          {dateRange && (
                            <Box
                              sx={{
                                display: "inline-block",
                                bgcolor: TEAL,
                                color: "#ffffff",
                                px: 1,
                                py: 0.2,
                                borderRadius: "10px",
                                fontSize: 9.5,
                                fontWeight: 700,
                                mb: 0.5,
                              }}
                            >
                              {dateRange}
                            </Box>
                          )}

                          <Grid container sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
                            <Grid size={{ xs: 12, sm: 8 }}>
                              <Typography sx={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
                                {edu.instituteName}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Typography sx={{ fontSize: 11, color: TEXT_MUTED }}>
                            {edu.degree}
                            {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ""}
                            {edu.percentage !== undefined
                              ? `, Grade: ${edu.percentage}%`
                              : ""}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              )}

              {/* Experience */}
              {data.experience && data.experience.length > 0 && (
                <Box>
                  <SectionTitle>Experience</SectionTitle>
                  <Stack spacing={2.5}>
                    {data.experience.map((exp: any, idx: any) => {
                      const startDate = formatDate(exp.startDate);
                      const endDate = exp.isCurrentCompany
                        ? "Present"
                        : formatDate(exp.endDate);
                      const dateRange =
                        startDate && endDate
                          ? `${startDate} - ${endDate}`
                          : startDate || endDate;

                      // Sentence bullet splitting
                      const bullets = exp.description
                        ? exp.description
                            .split(".")
                            .map((b: string) => b.trim())
                            .filter((b: string) => b.length > 0)
                        : [];

                      return (
                        <Box key={idx} sx={{ position: "relative", pl: 2.5 }}>
                          {/* Timeline Green Dot */}
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              top: 4,
                              width: 6,
                              height: 6,
                              borderRadius: "50%",
                              bgcolor: TEAL,
                            }}
                          />

                          <Grid container sx={{ justifyContent: "space-between", alignItems: "center", mb: 0.3 }}>
                            <Grid size={{ xs: 12, sm: 8 }}>
                              {/* Date Pill Badge */}
                              {dateRange && (
                                <Box
                                  sx={{
                                    display: "inline-block",
                                    bgcolor: TEAL,
                                    color: "#ffffff",
                                    px: 1,
                                    py: 0.2,
                                    borderRadius: "10px",
                                    fontSize: 9.5,
                                    fontWeight: 700,
                                  }}
                                >
                                  {dateRange}
                                </Box>
                              )}
                            </Grid>
                            {exp.location && (
                              <Grid size={{ xs: 12, sm: 4 }}>
                                <Typography sx={{ fontSize: 10, color: TEAL_TEXT, fontWeight: 500 }}>
                                  {exp.location}
                                </Typography>
                              </Grid>
                            )}
                          </Grid>

                          {/* Company Name */}
                          <Typography
                            sx={{
                              fontSize: 12.5,
                              fontWeight: 800,
                              color: "#0f172a",
                              lineHeight: 1.2,
                            }}
                          >
                            {exp.companyName}
                          </Typography>

                          {/* Designation */}
                          <Typography
                            sx={{
                              fontSize: 11,
                              fontWeight: 600,
                              color: TEXT_MUTED,
                              mb: 0.8,
                            }}
                          >
                            {exp.designation}
                          </Typography>

                          {/* Description Bullets */}
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
                                      mt: 0.8,
                                      flexShrink: 0,
                                    }}
                                  />
                                  <Typography sx={{ fontSize: 10.5, lineHeight: 1.5, color: TEXT_DARK }}>
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
          </Grid>
        </Box>
      </ResumePage>
    );
  }
);

TealDottedTemplate.displayName = "TealDottedTemplate";
export default TealDottedTemplate;