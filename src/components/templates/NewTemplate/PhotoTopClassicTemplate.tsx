import { forwardRef } from "react";
import { Avatar, Box, Chip, Divider, Stack, Typography } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import ResumePage from "./ResumePage";
import type { ResumeData } from "../../../types/candidate/resume.types";

const PRIMARY_BLUE = "#3b69c5";
const LIGHT_BLUE_BG = "#eef4ff";
const TEXT_DARK = "#1e293b";
const TEXT_MUTED = "#64748b";

interface Props {
  data: ResumeData;
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const SectionHeader = ({ title }: { title: string }) => (
  <Box sx={{ mb: 1.5 }}>
    <Typography
      sx={{
        fontSize: "14px",
        fontWeight: 700,
        color: PRIMARY_BLUE,
        mb: 0.5,
      }}
    >
      {title}
    </Typography>
    <Divider
      sx={{ borderColor: PRIMARY_BLUE, borderBottomWidth: 1.5, mb: 1.5 }}
    />
  </Box>
);

const PhotoTopClassicTemplate = forwardRef<HTMLDivElement, Props>(
  ({ data }: Props, ref) => {
    // --- Data Normalization ---
    const fullName = `${data.personal?.firstName || ""} ${data.personal?.lastName || ""}`.trim();
    const photoUrl = data.personal?.photoUrl || "";

    const phone =
      data.contact?.mobile || data.contact?.alternateMobile || "";
    const email = data.contact?.email || "";
    const locationText =
      [data.contact?.city, data.contact?.state, data.contact?.country]
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
            p: { xs: "20px 24px", sm: "32px 36px", md: "40px 48px" },
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
          {/* Header Section: Avatar + Name */}
          <Stack
            direction="row"
            spacing={3}
            sx={{ mb: 2.5, alignItems: "center" }}
          >
            <Avatar
              src={photoUrl || undefined}
              variant="rounded"
              sx={{
                width: { xs: 70, sm: 84 },
                height: { xs: 70, sm: 84 },
                bgcolor: PRIMARY_BLUE,
                fontSize: 32,
                fontWeight: 700,
                borderRadius: "8px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {fullName.charAt(0) || "M"}
            </Avatar>
            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 24, sm: 28 },
                  fontWeight: 700,
                  color: PRIMARY_BLUE,
                  letterSpacing: -0.3,
                  lineHeight: 1.2,
                }}
              >
                {fullName}
              </Typography>
              {data.personal?.jobTitle && (
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: TEXT_MUTED,
                    mt: 0.5,
                  }}
                >
                  {data.personal.jobTitle}
                </Typography>
              )}
            </Box>
          </Stack>

          {/* Contact Details Bar */}
          {(phone || email || locationText) && (
            <Box
              sx={{
                bgcolor: LIGHT_BLUE_BG,
                borderRadius: "6px",
                py: 1,
                px: 2,
                mb: 3,
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  justify: "space-evenly",
                  flexWrap: "wrap",
                }}
                spacing={{ xs: 1.5, sm: 2 }}
                useFlexGap
              >
                {phone && (
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center" }}
                    spacing={0.8}
                  >
                    <PhoneIcon sx={{ fontSize: 14, color: PRIMARY_BLUE }} />
                    <Typography
                      sx={{ fontSize: 11, fontWeight: 500, color: TEXT_DARK }}
                    >
                      {phone}
                    </Typography>
                  </Stack>
                )}
                {email && (
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center" }}
                    spacing={0.8}
                  >
                    <EmailIcon sx={{ fontSize: 14, color: PRIMARY_BLUE }} />
                    <Typography
                      sx={{ fontSize: 11, fontWeight: 500, color: TEXT_DARK }}
                    >
                      {email}
                    </Typography>
                  </Stack>
                )}
                {locationText && (
                  <Stack
                    direction="row"
                    sx={{ alignItems: "center" }}
                    spacing={0.8}
                  >
                    <LocationOnIcon
                      sx={{ fontSize: 14, color: PRIMARY_BLUE }}
                    />
                    <Typography
                      sx={{ fontSize: 11, fontWeight: 500, color: TEXT_DARK }}
                    >
                      {locationText}
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Box>
          )}

          {/* Professional Summary */}
          {summaryText && (
            <Box sx={{ mb: 3 }}>
              <SectionHeader title="Professional Summary" />
              <Typography
                sx={{
                  fontSize: 11,
                  lineHeight: 1.6,
                  color: TEXT_DARK,
                }}
              >
                {summaryText}
              </Typography>
            </Box>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <SectionHeader title="Education" />
              {data.education.map((edu: any, idx: any) => {
                const startDate = formatDate(edu.startDate);
                const endDate = formatDate(edu.endDate) || "Present";

                return (
                  <Box key={idx} sx={{ mb: 1.5 }}>
                    <Stack
                      direction="row"
                      sx={{
                        justify: "space-between",
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
                          sx={{ fontSize: 11, color: TEXT_DARK, mt: 0.2 }}
                        >
                          {edu.degree}
                          {edu.fieldOfStudy ? `, ${edu.fieldOfStudy}` : ""}
                          {edu.percentage
                            ? `, CGPA: ${(edu.percentage / 10).toFixed(1)}`
                            : ""}
                        </Typography>
                        {(data.contact?.city || data.contact?.state) && (
                          <Typography
                            sx={{
                              fontSize: 10,
                              color: PRIMARY_BLUE,
                              fontStyle: "italic",
                              mt: 0.2,
                            }}
                          >
                            {[data.contact?.city, data.contact?.state]
                              .filter(Boolean)
                              .join(", ")}
                          </Typography>
                        )}
                      </Box>

                      {(startDate || endDate) && (
                        <Box
                          sx={{
                            bgcolor: PRIMARY_BLUE,
                            color: "#ffffff",
                            px: 1.2,
                            py: 0.3,
                            borderRadius: "12px",
                            fontSize: 9.5,
                            fontWeight: 600,
                            lineHeight: 1,
                            flexShrink: 0,
                            ml: 1,
                          }}
                        >
                          {startDate ? `${startDate} - ${endDate}` : endDate}
                        </Box>
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
              {data.experience.map((exp: any, idx: any) => {
                const startDate = formatDate(exp.startDate);
                const endDate = exp.isCurrentCompany
                  ? "Present"
                  : formatDate(exp.endDate);

                const bullets = exp.description
                  ? exp.description
                      .split(".")
                      .map((p: string) => p.trim())
                      .filter((p: string) => p.length > 0)
                  : [];

                return (
                  <Box key={idx} sx={{ mb: 2.5 }}>
                    <Stack
                      direction="row"
                      sx={{
                        justify: "space-between",
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
                              fontSize: 10,
                              color: PRIMARY_BLUE,
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
                            bgcolor: PRIMARY_BLUE,
                            color: "#ffffff",
                            px: 1.2,
                            py: 0.3,
                            borderRadius: "12px",
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

                    {/* Bullet Points */}
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
                              bgcolor: PRIMARY_BLUE,
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

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <SectionHeader title="Projects" />
              {data.projects.map((proj: any, idx: any) => (
                <Box key={idx} sx={{ mb: 1.5 }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: TEXT_DARK,
                    }}
                  >
                    {proj.projectName} {proj.role ? `— ${proj.role}` : ""}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 10.5, color: TEXT_DARK, mt: 0.3 }}
                  >
                    {proj.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeader title="Skills" />
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {data.skills.map((skill: any, idx: any) => (
                  <Chip
                    key={idx}
                    label={skill.skillName}
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: "6px",
                      borderColor: "#cbd5e1",
                      color: TEXT_DARK,
                      fontSize: "10.5px",
                      fontWeight: 500,
                      height: "24px",
                      px: 0.5,
                      bgcolor: "#ffffff",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </ResumePage>
    );
  }
);

PhotoTopClassicTemplate.displayName = "PhotoTopClassicTemplate";
export default PhotoTopClassicTemplate;