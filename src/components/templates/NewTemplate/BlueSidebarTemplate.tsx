import { forwardRef } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LanguageIcon from "@mui/icons-material/Language";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ResumePage from "./ResumePage";
import type { ResumeData } from "../../../types/candidate/resume.types";

// Design Palette matching the provided template image
const PRIMARY_BLUE = "#4169e1"; // Classic Royal / Steel Blue Header
const BG_LEFT_SIDEBAR = "#f3f6fc"; // Light blue Tinted Background for Left Column
const TEXT_DARK = "#2c3e50"; // Dark Slate Body Text
const TEXT_MUTED = "#64748b"; // Secondary Text Color
const BORDER_COLOR = "#cbd5e1"; // Section divider lines

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

// Section Header with Accent Bar
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ mb: 1.5, position: "relative" }}>
    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
      <Typography
        sx={{
          fontSize: "13px",
          fontWeight: 800,
          color: PRIMARY_BLUE,
          textTransform: "UPPERCASE",
          letterSpacing: 0.8,
        }}
      >
        {children}
      </Typography>
      <Box
        sx={{
          width: 28,
          height: 3,
          bgcolor: PRIMARY_BLUE,
          borderRadius: "1px",
        }}
      />
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

const BlueHeaderTemplate = forwardRef<HTMLDivElement, Props>(
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
          {/* ─── 1. TOP BLUE HEADER ─────────────────────────────────────── */}
          <Box
            sx={{
              bgcolor: PRIMARY_BLUE,
              color: "#ffffff",
              p: "28px 24px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {/* White Outlined Box around Name & Subtitle */}
            <Box
              sx={{
                border: "1.5px solid rgba(255, 255, 255, 0.6)",
                px: 4,
                py: 1.5,
                textAlign: "center",
                minWidth: "280px",
              }}
            >
              <Typography
                sx={{
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  lineHeight: 1.2,
                }}
              >
                {fullName}
              </Typography>
              {jobTitle && (
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 400,
                    letterSpacing: 0.5,
                    opacity: 0.9,
                    mt: 0.5,
                  }}
                >
                  {jobTitle}
                </Typography>
              )}
            </Box>
          </Box>

          {/* ─── 2. TWO COLUMN BODY LAYOUT ──────────────────────────────── */}
          <Grid container sx={{ flexGrow: 1 }}>
            {/* ─── LEFT COLUMN (Light Blue Tint) ────────────────────────── */}
            <Grid
              size={{ xs: 4 }}
              sx={{
                bgcolor: BG_LEFT_SIDEBAR,
                p: "24px 20px",
                borderRight: `1px solid ${BORDER_COLOR}`,
              }}
            >
              {/* CONTACT SECTION */}
              <Box sx={{ mb: 3.5 }}>
                <SectionTitle>CONTACT</SectionTitle>
                <Stack spacing={1.2}>
                  {phone && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                      <PhoneIcon sx={{ fontSize: 13, color: PRIMARY_BLUE }} />
                      <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                        {phone}
                      </Typography>
                    </Stack>
                  )}
                  {email && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                      <EmailIcon sx={{ fontSize: 13, color: PRIMARY_BLUE }} />
                      <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500, wordBreak: "break-all" }}>
                        {email}
                      </Typography>
                    </Stack>
                  )}
                  {website && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                      <LanguageIcon sx={{ fontSize: 13, color: PRIMARY_BLUE }} />
                      <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                        {website}
                      </Typography>
                    </Stack>
                  )}
                  {location && (
                    <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                      <LocationOnIcon sx={{ fontSize: 13, color: PRIMARY_BLUE }} />
                      <Typography sx={{ fontSize: 10.5, color: TEXT_DARK, fontWeight: 500 }}>
                        {location}
                      </Typography>
                    </Stack>
                  )}
                </Stack>
              </Box>

              {/* SKILLS SECTION */}
              {data.skills && data.skills.length > 0 && (
                <Box sx={{ mb: 3.5 }}>
                  <SectionTitle>SKILLS</SectionTitle>
                  <Stack spacing={0.6}>
                    {data.skills.map((skill, idx) => (
                      <Stack direction="row" sx={{ alignItems: "center" }} spacing={1} key={idx}>
                        <Box
                          sx={{
                            width: 4,
                            height: 4,
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
                <Box sx={{ mb: 3.5 }}>
                  <SectionTitle>AWARDS</SectionTitle>
                  <Stack spacing={0.8}>
                    {data.achievements.map((ach, idx) => (
                      <Stack direction="row" sx={{ alignItems: "flex-start" }} spacing={1} key={idx}>
                        <Box
                          sx={{
                            width: 4,
                            height: 4,
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
                            width: 4,
                            height: 4,
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

            {/* ─── RIGHT COLUMN (Main Content) ──────────────────────────── */}
            <Grid size={{ xs: 8 }} sx={{ p: "24px 28px" }}>
              {/* SUMMARY SECTION */}
              {summaryText && (
                <Box sx={{ mb: 3 }}>
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

              {/* EDUCATION SECTION */}
              {data.education && data.education.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionTitle>EDUCATION</SectionTitle>
                  <Stack spacing={2}>
                    {data.education.map((edu: any, idx) => {
                      const startDate = formatDate(edu.startDate);
                      const endDate = formatDate(edu.endDate);
                      const dateRange =
                        startDate && endDate
                          ? `${startDate} - ${endDate}`
                          : startDate || endDate;

                      return (
                        <Box key={idx} sx={{ position: "relative", pl: 2.5 }}>
                          {/* Diamond Node Marker */}
                          <Box
                            sx={{
                              position: "absolute",
                              left: 0,
                              top: 2,
                              width: 7,
                              height: 7,
                              border: `1.5px solid ${PRIMARY_BLUE}`,
                              bgcolor: "#ffffff",
                              transform: "rotate(45deg)",
                            }}
                          />

                          <Grid container sx={{ justifyContent: "space-between", alignItems: "baseline" }}>
                            <Grid size={{ xs: 8 }}>
                              <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: TEXT_DARK }}>
                                {edu.instituteName}
                              </Typography>
                            </Grid>
                            <Grid size={{ xs: 4 }} sx={{ textAlign: "right" }}>
                              <Typography sx={{ fontSize: 10, color: TEXT_MUTED }}>
                                {dateRange}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Typography sx={{ fontSize: 10.5, color: TEXT_MUTED }}>
                            {edu.degree}
                            {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                            {edu.percentage !== undefined
                              ? ` | CGPA/Percentage: ${edu.percentage}%`
                              : ""}
                          </Typography>
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
                    {/* Continuous Vertical Timeline Line */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: 3.5,
                        top: 6,
                        bottom: 12,
                        width: "1.5px",
                        bgcolor: PRIMARY_BLUE,
                        zIndex: 0,
                      }}
                    />

                    <Stack spacing={2.5}>
                      {data.experience.map((exp: any, idx) => {
                        const startDate = formatDate(exp.startDate);
                        const endDate = exp.isCurrentCompany
                          ? "Present"
                          : formatDate(exp.endDate);
                        const dateRange =
                          startDate && endDate
                            ? `${startDate} - ${endDate}`
                            : startDate || endDate;

                        // Sentence splitting for bullet points
                        const bullets = exp.description
                          ? exp.description
                              .split(".")
                              .map((b: string) => b.trim())
                              .filter((b: string) => b.length > 0)
                          : [];

                        return (
                          <Box key={idx} sx={{ position: "relative", pl: 2.5, zIndex: 1 }}>
                            {/* Hollow Diamond Timeline Node */}
                            <Box
                              sx={{
                                position: "absolute",
                                left: 0,
                                top: 4,
                                width: 7,
                                height: 7,
                                border: `1.5px solid ${PRIMARY_BLUE}`,
                                bgcolor: "#ffffff",
                                transform: "rotate(45deg)",
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
                                    fontSize: 11,
                                    fontWeight: 500,
                                    fontStyle: "italic",
                                    color: TEXT_DARK,
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

BlueHeaderTemplate.displayName = "BlueHeaderTemplate";
export default BlueHeaderTemplate;