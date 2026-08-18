import { forwardRef } from "react";
import { Box, Typography, Chip, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageIcon from "@mui/icons-material/Language";
import ResumePage from "./ResumePage";

const ACCENT = "#2c5282"; // Classic deep blue color
const LIGHT_BG = "#ebf8ff"; // Contact header background blue tint
const TEXT_COLOR = "#2d3748";

const formatDate = (dateStr?: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

const SectionHeader = ({ title }: { title: string }) => (
  <Box sx={{ mb: 1.5, mt: 2 }}>
    <Typography
      sx={{
        fontSize: "15px",
        fontWeight: 600,
        color: ACCENT,
        mb: 0.5,
      }}
    >
      {title}
    </Typography>
    <Box sx={{ width: "100%", height: "1.5px", backgroundColor: ACCENT }} />
  </Box>
);

const ClassicBlueTemplate = forwardRef<HTMLDivElement, { data?: any }>(
  ({ data }, ref) => {
    const fullName =
      `${data.personal?.firstName || ""} ${data.personal?.lastName || ""}`.trim();

    // Address construction
    const locationText =
      [data.contact?.city, data.contact?.state, data.contact?.pincode]
        .filter(Boolean)
        .join(", ") ||
      data.contact?.address ||
      "";
    console.log('data =========================>', data)
    return (
      <ResumePage ref={ref}>
        <Box
          sx={{
            p: "36px 40px",
            color: TEXT_COLOR,
            fontFamily: "'Inter', 'Roboto', 'Helvetica', sans-serif",
            fontSize: "12px",
            lineHeight: 1.5,
            backgroundColor: "#ffffff",
          }}
        >
          {/* Name */}
          <Typography
            variant="h1"
            sx={{
              fontSize: "28px",
              fontWeight: 700,
              color: ACCENT,
              mb: 2,
              letterSpacing: "-0.5px",
            }}
          >
            {fullName}
          </Typography>

          {/* Contact Info Strip */}
          <Box
            sx={{
              backgroundColor: LIGHT_BG,
              py: 0.8,
              px: 2,
              borderRadius: "4px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            {data.contact?.mobile && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <PhoneIcon sx={{ fontSize: 13, color: ACCENT }} />
                <Typography
                  sx={{ fontSize: "11px", color: TEXT_COLOR, fontWeight: 500 }}
                >
                  {data.contact.mobile}
                </Typography>
              </Box>
            )}

            {data.contact?.email && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <EmailIcon sx={{ fontSize: 13, color: ACCENT }} />
                <Typography
                  sx={{ fontSize: "11px", color: TEXT_COLOR, fontWeight: 500 }}
                >
                  {data.contact.email}
                </Typography>
              </Box>
            )}

            {locationText && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LocationOnIcon sx={{ fontSize: 13, color: ACCENT }} />
                <Typography
                  sx={{ fontSize: "11px", color: TEXT_COLOR, fontWeight: 500 }}
                >
                  {locationText}
                </Typography>
              </Box>
            )}

            {data.social?.linkedInUrl && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LinkedInIcon sx={{ fontSize: 13, color: ACCENT }} />
                <Link
                  href={data.social.linkedInUrl}
                  underline="none"
                  target="_blank"
                  sx={{ fontSize: "11px", color: TEXT_COLOR, fontWeight: 500 }}
                >
                  LinkedIn
                </Link>
              </Box>
            )}

            {(data.social?.portfolioUrl || data.social?.websiteUrl) && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <LanguageIcon sx={{ fontSize: 13, color: ACCENT }} />
                <Link
                  href={data.social?.portfolioUrl || data.social?.websiteUrl}
                  underline="none"
                  target="_blank"
                  sx={{ fontSize: "11px", color: TEXT_COLOR, fontWeight: 500 }}
                >
                  Portfolio
                </Link>
              </Box>
            )}
          </Box>

          {/* Professional Summary */}
          {data.summary?.professionalSummary && (
            <Box sx={{ mb: 2 }}>
              <SectionHeader title="Professional Summary" />
              <Typography
                sx={{
                  fontSize: "11.5px",
                  color: "#334155",
                  textAlign: "justify",
                }}
              >
                {data.summary.professionalSummary}
              </Typography>
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
                      color: "#334155",
                      fontSize: "11px",
                      fontWeight: 500,
                      height: "24px",
                      backgroundColor: "#f8fafc",
                      "& .MuiChip-label": { px: 1.2 },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeader title="Education" />
              {data.education.map((edu: any, idx: any) => {
                const startDate = formatDate(edu.startDate);
                const endDate = formatDate(edu.endDate) || "Present";

                return (
                  <Box key={idx} sx={{ mb: 1.5 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#1e293b",
                          }}
                        >
                          {edu.instituteName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "11.5px",
                            fontWeight: 600,
                            color: "#475569",
                          }}
                        >
                          {edu.degree}{" "}
                          {edu.fieldOfStudy ? `- ${edu.fieldOfStudy}` : ""}
                          {edu.percentage
                            ? `, CGPA/Score: ${edu.percentage}%`
                            : ""}
                        </Typography>
                      </Box>
                      <Chip
                        label={`${startDate} - ${endDate}`}
                        size="small"
                        sx={{
                          backgroundColor: ACCENT,
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: "10px",
                          height: "20px",
                          borderRadius: "10px",
                        }}
                      />
                    </Box>
                    {edu.description && (
                      <Typography
                        sx={{
                          fontSize: "11px",
                          color: "#64748b",
                          fontStyle: "italic",
                          mt: 0.3,
                        }}
                      >
                        {edu.description}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeader title="Experience" />
              {data.experience.map((exp: any, idx: any) => {
                const startDate = formatDate(exp.startDate);
                const endDate = exp.isCurrentCompany
                  ? "Present"
                  : formatDate(exp.endDate);

                // Split description by periods or lines to render clean bullet points
                const points = exp.description
                  ? exp.description
                      .split(".")
                      .filter((pt: any) => pt.trim().length > 0)
                  : [];

                return (
                  <Box key={idx} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 700,
                            color: "#1e293b",
                          }}
                        >
                          {exp.companyName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "11.5px",
                            fontWeight: 600,
                            color: "#475569",
                          }}
                        >
                          {exp.designation}
                        </Typography>
                        {exp.location && (
                          <Typography
                            sx={{
                              fontSize: "10.5px",
                              color: ACCENT,
                              fontStyle: "italic",
                            }}
                          >
                            {exp.location}
                          </Typography>
                        )}
                      </Box>
                      <Chip
                        label={`${startDate} - ${endDate}`}
                        size="small"
                        sx={{
                          backgroundColor: ACCENT,
                          color: "#ffffff",
                          fontWeight: 600,
                          fontSize: "10px",
                          height: "20px",
                          borderRadius: "10px",
                        }}
                      />
                    </Box>

                    {points.length > 0 && (
                      <Box
                        component="ul"
                        sx={{ mt: 0.8, mb: 0, pl: 2, color: "#334155" }}
                      >
                        {points.map((point: any, pIdx: any) => (
                          <Typography
                            component="li"
                            key={pIdx}
                            sx={{ fontSize: "11px", lineHeight: 1.5, mb: 0.3 }}
                          >
                            {point.trim()}.
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
          {data.projects && data.projects.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeader title="Projects" />
              {data.projects.map((proj: any, idx: any) => (
                <Box key={idx} sx={{ mb: 1.5 }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      sx={{
                        fontSize: "12.5px",
                        fontWeight: 700,
                        color: "#1e293b",
                      }}
                    >
                      {proj.projectName} {proj.role ? `— (${proj.role})` : ""}
                    </Typography>
                    {proj.projectUrl && (
                      <Link
                        href={proj.projectUrl}
                        target="_blank"
                        sx={{
                          fontSize: "10.5px",
                          color: ACCENT,
                          textDecoration: "none",
                        }}
                      >
                        View Project
                      </Link>
                    )}
                  </Box>
                  <Typography
                    sx={{ fontSize: "11px", color: "#334155", mt: 0.3 }}
                  >
                    {proj.description}
                  </Typography>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <Typography
                      sx={{ fontSize: "10.5px", color: "#64748b", mt: 0.3 }}
                    >
                      <strong>Technologies:</strong>{" "}
                      {proj.technologies.join(", ")}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Certifications */}
          {data.certifications && data.certifications.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeader title="Certifications" />
              {data.certifications.map((cert: any, idx: any) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 0.8,
                  }}
                >
                  <Typography sx={{ fontSize: "11.5px", color: "#334155" }}>
                    <strong>{cert.certificateName}</strong> — {cert.issuedBy}
                  </Typography>
                  {cert.issuedDate && (
                    <Typography sx={{ fontSize: "10.5px", color: "#64748b" }}>
                      {formatDate(cert.issuedDate)}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Achievements */}
          {data.achievements && data.achievements.length > 0 && (
            <Box sx={{ mb: 2 }}>
              <SectionHeader title="Achievements" />
              {data.achievements.map((ach: any, idx: any) => (
                <Box key={idx} sx={{ mb: 0.8 }}>
                  <Typography
                    sx={{
                      fontSize: "11.5px",
                      fontWeight: 600,
                      color: "#1e293b",
                    }}
                  >
                    {ach.title}
                  </Typography>
                  <Typography sx={{ fontSize: "11px", color: "#334155" }}>
                    {ach.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <Box sx={{ mb: 1 }}>
              <SectionHeader title="Languages" />
              <Typography sx={{ fontSize: "11px", color: "#334155" }}>
                {data.languages
                  .map((l: any) => `${l.languageName} (${l.proficiencyLevel})`)
                  .join(" • ")}
              </Typography>
            </Box>
          )}
        </Box>
      </ResumePage>
    );
  },
);

ClassicBlueTemplate.displayName = "ClassicBlueTemplate";
export default ClassicBlueTemplate;
