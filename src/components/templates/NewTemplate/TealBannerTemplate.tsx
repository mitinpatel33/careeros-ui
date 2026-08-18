import { forwardRef } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ResumePage from "./ResumePage";
import type { ResumeData } from "../../../types/candidate/resume.types";

const TEAL = "#14b8a6";
const TEAL_DARK = "#0d9488";
const TEXT_DARK = "#1e293b";
const TEXT_MUTED = "#64748b";

interface Props {
  data: ResumeData;
}

// Helper: format ISO date to "MMM YYYY"
const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

// Section Title with standard circular bullet icon matching the image template
const SectionHeader = ({ title }: { title: string }) => (
  <Stack direction="row" spacing={1} sx={{ mb: 1.5, alignItems: "center" }}>
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        bgcolor: TEAL,
        flexShrink: 0,
      }}
    />
    <Typography
      sx={{
        fontSize: "15px",
        fontWeight: 700,
        color: TEAL_DARK,
        letterSpacing: 0.2,
      }}
    >
      {title}
    </Typography>
  </Stack>
);

const TealBannerTemplate = forwardRef<HTMLDivElement, Props>(
  ({ data }: Props, ref) => {
    // --- Data Normalization ---
    const fullName =
      `${data.personal?.firstName || ""} ${data.personal?.lastName || ""}`.trim();
    const jobTitle = data.personal?.jobTitle || "";

    const phone = data.contact?.mobile || data.contact?.alternateMobile || "";
    const email = data.contact?.email || "";
    const linkedin = data.social?.linkedInUrl || "";
    const locationText =
      [data.contact?.city, data.contact?.state, data.contact?.pincode]
        .filter(Boolean)
        .join(", ") ||
      data.contact?.address ||
      "";

    const summaryText =
      data.summary?.professionalSummary || data.summary?.careerObjective || "";

    return (
      <ResumePage ref={ref}>
        <Box
          sx={{
            p: { xs: "20px 24px", sm: "32px 36px", md: "36px 40px" },
            bgcolor: "#ffffff",
            color: TEXT_DARK,
            minHeight: "1123px",
            boxSizing: "border-box",
            width: "100%",
            maxWidth: "800px",
            margin: "0 auto",
            fontFamily: "'Inter', 'Roboto', sans-serif",
          }}
        >
          {/* Header Section: Name + Job Title Left | Contact Info Right */}
          <Stack
            direction="row"
            sx={{
              mb: 2.5,
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ pr: 2 }}>
              <Typography
                sx={{
                  fontSize: { xs: 24, sm: 28 },
                  fontWeight: 700,
                  color: "#1e293b",
                  lineHeight: 1.2,
                }}
              >
                {fullName}
              </Typography>
              {jobTitle && (
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: TEAL_DARK,
                    mt: 0.5,
                  }}
                >
                  {jobTitle}
                </Typography>
              )}
            </Box>

            {/* Contact details aligned to right */}
            <Stack spacing={0.6} sx={{ alignItems: "flex-end" }}>
              {phone && (
                <Stack
                  direction="row"
                  sx={{ alignItems: "center" }}
                  spacing={1}
                >
                  <Typography
                    sx={{ fontSize: 11, color: TEXT_DARK, fontWeight: 500 }}
                  >
                    {phone}
                  </Typography>
                  <PhoneIcon sx={{ fontSize: 14, color: TEAL_DARK }} />
                </Stack>
              )}
              {email && (
                <Stack
                  direction="row"
                  sx={{ alignItems: "center" }}
                  spacing={1}
                >
                  <Typography
                    sx={{ fontSize: 11, color: TEXT_DARK, fontWeight: 500 }}
                  >
                    {email}
                  </Typography>
                  <EmailIcon sx={{ fontSize: 14, color: TEAL_DARK }} />
                </Stack>
              )}
              {linkedin && (
                <Stack
                  direction="row"
                  sx={{ alignItems: "center" }}
                  spacing={1}
                >
                  <Typography
                    sx={{ fontSize: 11, color: TEXT_DARK, fontWeight: 500 }}
                  >
                    {linkedin.replace(/^https?:\/\//, "")}
                  </Typography>
                  <LinkedInIcon sx={{ fontSize: 14, color: TEAL_DARK }} />
                </Stack>
              )}
              {locationText && (
                <Stack
                  direction="row"
                  sx={{ alignItems: "center" }}
                  spacing={1}
                >
                  <Typography
                    sx={{ fontSize: 11, color: TEXT_DARK, fontWeight: 500 }}
                  >
                    {locationText}
                  </Typography>
                  <LocationOnIcon sx={{ fontSize: 14, color: TEAL_DARK }} />
                </Stack>
              )}
            </Stack>
          </Stack>

          {/* Teal Banner Professional Summary */}
          {summaryText && (
            <Box
              sx={{
                bgcolor: TEAL_DARK,
                color: "#ffffff",
                borderRadius: "4px",
                p: "14px 18px",
                mb: 3,
              }}
            >
              <Typography sx={{ fontSize: 11.5, lineHeight: 1.6 }}>
                {summaryText}
              </Typography>
            </Box>
          )}

          {/* Two-Column Grid Layout */}
          <Grid container spacing={3}>
            {/* LEFT COLUMN: Experience, Education, Achievements */}
            <Grid size={{ xs: 12, sm: 7 }}>
              {/* Experience */}
              {data.experience && data.experience.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionHeader title="Experience" />
                  {data.experience.map((exp: any, idx: number) => {
                    const startDate = formatDate(exp.startDate);
                    const endDate = exp.isCurrentCompany
                      ? "Present"
                      : formatDate(exp.endDate);

                    const bullets = exp.description
                      ? exp.description
                          .split(".")
                          .map((bullet: string) => bullet.trim())
                          .filter((bullet: string) => bullet.length > 0)
                      : [];

                    return (
                      <Box key={idx} sx={{ mb: 2.5 }}>
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 13,
                                fontWeight: 700,
                                color: TEXT_DARK,
                              }}
                            >
                              {exp.companyName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11.5,
                                fontWeight: 600,
                                color: TEXT_MUTED,
                              }}
                            >
                              {exp.designation}
                            </Typography>
                            {exp.location && (
                              <Typography
                                sx={{
                                  fontSize: 10.5,
                                  color: TEAL_DARK,
                                  fontStyle: "italic",
                                  mb: 0.8,
                                }}
                              >
                                {exp.location}
                              </Typography>
                            )}
                          </Box>

                          {(startDate || endDate) && (
                            <Box
                              sx={{
                                bgcolor: TEAL,
                                color: "#ffffff",
                                px: 1,
                                py: 0.3,
                                borderRadius: "3px",
                                fontSize: 9.5,
                                fontWeight: 600,
                                lineHeight: 1,
                                flexShrink: 0,
                                ml: 1,
                              }}
                            >
                              {startDate} - {endDate}
                            </Box>
                          )}
                        </Stack>

                        {/* Bullet points */}
                        <Stack spacing={0.6} sx={{ mt: 0.8 }}>
                          {bullets.map((bullet: string, bIdx: number) => (
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
                      </Box>
                    );
                  })}
                </Box>
              )}

              {/* Education */}
              {data.education && data.education.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionHeader title="Education" />
                  {data.education.map((edu: any, idx: number) => {
                    const startDate = formatDate(edu.startDate);
                    const endDate = formatDate(edu.endDate) || "Present";

                    return (
                      <Box key={idx} sx={{ mb: 2 }}>
                        <Stack
                          direction="row"
                          sx={{
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                          }}
                        >
                          <Box>
                            <Typography
                              sx={{
                                fontSize: 12.5,
                                fontWeight: 700,
                                color: TEXT_DARK,
                              }}
                            >
                              {edu.instituteName}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 11,
                                color: TEXT_DARK,
                                mt: 0.2,
                              }}
                            >
                              {edu.degree}
                              {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                              {edu.percentage
                                ? `, Score: ${edu.percentage}%`
                                : ""}
                            </Typography>
                          </Box>

                          {(startDate || endDate) && (
                            <Box
                              sx={{
                                bgcolor: TEAL,
                                color: "#ffffff",
                                px: 1,
                                py: 0.3,
                                borderRadius: "3px",
                                fontSize: 9.5,
                                fontWeight: 600,
                                lineHeight: 1,
                                flexShrink: 0,
                                ml: 1,
                              }}
                            >
                              {startDate
                                ? `${startDate} - ${endDate}`
                                : endDate}
                            </Box>
                          )}
                        </Stack>
                      </Box>
                    );
                  })}
                </Box>
              )}

              {/* Awards / Achievements */}
              {data.achievements && data.achievements.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <SectionHeader title="Awards" />
                  <Stack spacing={0.6}>
                    {data.achievements.map((ach: any, idx: number) => {
                      const achDate = formatDate(ach.achievementDate);
                      return (
                        <Stack
                          direction="row"
                          sx={{ alignItems: "flex-start" }}
                          spacing={1}
                          key={idx}
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
                            <Box component="span" sx={{ fontWeight: 600 }}>
                              {ach.title}
                            </Box>
                            {achDate ? `, ${achDate}` : ""}
                            {ach.description ? `: ${ach.description}` : ""}
                          </Typography>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Box>
              )}
            </Grid>

            {/* RIGHT COLUMN: Skills, Languages, Certifications */}
            <Grid size={{ xs: 12, sm: 5 }}>
              {/* Skills List */}
              {data.skills && data.skills.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionHeader title="Skills" />
                  <Stack spacing={0.6}>
                    {data.skills.map((skill: any, idx: number) => (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center" }}
                        spacing={1}
                        key={idx}
                      >
                        <Box
                          sx={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            bgcolor: TEXT_DARK,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: 11,
                            fontWeight: 500,
                            color: TEXT_DARK,
                          }}
                        >
                          {skill.skillName}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Languages */}
              {data.languages && data.languages.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  <SectionHeader title="Language" />
                  <Stack spacing={0.6}>
                    {data.languages.map((lang, idx) => (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "center" }}
                        spacing={1}
                        key={idx}
                      >
                        <Box
                          sx={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            bgcolor: TEXT_DARK,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: 11,
                            fontWeight: 500,
                            color: TEXT_DARK,
                          }}
                        >
                          {lang.languageName}
                          {lang.proficiencyLevel
                            ? ` (${lang.proficiencyLevel})`
                            : ""}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}

              {/* Certifications */}
              {data.certifications && data.certifications.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <SectionHeader title="Certifications" />
                  <Stack spacing={0.8}>
                    {data.certifications.map((cert, idx) => (
                      <Stack
                        direction="row"
                        sx={{ alignItems: "flex-start" }}
                        spacing={1}
                        key={idx}
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
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 10.5,
                              fontWeight: 600,
                              color: TEXT_DARK,
                            }}
                          >
                            {cert.certificateName}
                          </Typography>
                          {cert.issuedBy && (
                            <Typography
                              sx={{ fontSize: 9.5, color: TEXT_MUTED }}
                            >
                              {cert.issuedBy}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </ResumePage>
    );
  },
);

TealBannerTemplate.displayName = "TealBannerTemplate";
export default TealBannerTemplate;
