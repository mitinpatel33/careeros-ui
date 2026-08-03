// ElegantClassicTemplate.tsx
import { Box, Typography, Paper } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const DARK = "#3a3a3a";
const MUTED = "#4d4d4d";
const RULE = "#3a3a3a";
const BADGE_BG = "#d9d9d9";

/** Format a Date or string into "YYYY" (design uses year-only ranges) */
const formatYear = (d?: Date | string) => {
  if (!d) return "";
  return new Date(d).getFullYear().toString();
};

const formatRange = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
) => {
  const startStr = formatYear(start);
  if (isCurrent || !end) return `${startStr} - PRESENT`;
  return `${startStr} - ${formatYear(end)}`;
};

const ElegantClassicTemplate = ({
  data,
  config,
  settings,
}: TemplateRenderProps) => {
  const fullName = `${data.personal?.firstName ?? ""} ${
    data.personal?.lastName ?? ""
  }`.trim();

  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        fontFamily: settings?.fontFamily ?? "'Poppins', Arial, sans-serif",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
        bgcolor: "#fff",
        color: DARK,
      }}
    >
      {/* ================= HEADER ================= */}
      <Box sx={{ borderTop: `1px solid ${RULE}`, mx: 6, mt: 3 }} />
      <Box
        sx={{
          textAlign: "center",
          pt: 5,
          pb: 4,
          position: "relative",
        }}
      >
        {/* decorative faint monogram behind the name */}
        <Typography
          aria-hidden
          sx={{
            position: "absolute",
            top: "8%",
            left: "50%",
            transform: "translateX(-50%)",
            fontFamily: "'Brush Script MT', cursive",
            fontSize: 90,
            color: "#ececec",
            zIndex: 0,
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          {(data.personal?.firstName?.[0] ?? "") +
            (data.personal?.lastName?.[0] ?? "")}
        </Typography>

        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            fontSize: 42,
            fontWeight: 400,
            letterSpacing: "10px",
            color: DARK,
            mb: 1.5,
          }}
        >
          {fullName.toUpperCase()}
        </Typography>

        {data.personal?.jobTitle && (
          <Typography
            sx={{
              position: "relative",
              zIndex: 1,
              fontSize: 14,
              letterSpacing: "4px",
              color: "#666",
            }}
          >
            {data.personal.jobTitle.toUpperCase()}
          </Typography>
        )}
      </Box>
      <Box sx={{ borderTop: `1px solid ${RULE}`, mx: 6 }} />

      {/* ================= BODY ================= */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          position: "relative",
        }}
      >
        {/* vertical divider */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: "1px",
            bgcolor: "#ccc",
          }}
        />

        {/* -------- LEFT COLUMN -------- */}
        <Box sx={{ pl: 6, pr: 4 }}>
          {/* Contact */}
          <ColumnBlock title="Contact">
            <ContactRow icon={<PhoneIcon sx={{ fontSize: 16 }} />} text={data.contact?.mobile} />
            <ContactRow icon={<EmailIcon sx={{ fontSize: 16 }} />} text={data.contact?.email} />
            <ContactRow
              icon={<PlaceIcon sx={{ fontSize: 16 }} />}
              text={[data.contact?.address, data.contact?.city].filter(Boolean).join(", ")}
            />
            <ContactRow icon={<LanguageIcon sx={{ fontSize: 16 }} />} text={data.contact?.website} />
          </ColumnBlock>

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <ColumnBlock title="Education">
              {data.education.map((edu, i) => (
                <Box key={i} sx={{ mb: 2.5 }}>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {formatRange(edu.startDate, edu.endDate)}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: DARK,
                      textTransform: "uppercase",
                      mb: 0.5,
                    }}
                  >
                    {edu.instituteName}
                  </Typography>
                  <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                    <Typography component="li" sx={{ fontSize: 12, color: MUTED }}>
                      {edu.degree}
                      {edu.fieldOfStudy ? ` of ${edu.fieldOfStudy}` : ""}
                    </Typography>
                    {edu.grade && (
                      <Typography component="li" sx={{ fontSize: 12, color: MUTED }}>
                        GPA: {edu.grade}
                      </Typography>
                    )}
                  </Box>
                </Box>
              ))}
            </ColumnBlock>
          )}

          {/* Skills */}
          {data.skills && data.skills.length > 0 && (
            <ColumnBlock title="Skills">
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                {data.skills.map((skill, i) => (
                  <Typography
                    component="li"
                    key={i}
                    sx={{ fontSize: 12.5, color: MUTED, mb: 0.75 }}
                  >
                    {skill.skillName}
                  </Typography>
                ))}
              </Box>
            </ColumnBlock>
          )}

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <ColumnBlock title="Languages" last>
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                {data.languages.map((lang, i) => (
                  <Typography
                    component="li"
                    key={i}
                    sx={{ fontSize: 12.5, color: MUTED, mb: 0.75 }}
                  >
                    {lang.languageName}
                    {lang.proficiencyLevel ? `: ${lang.proficiencyLevel}` : ""}
                  </Typography>
                ))}
              </Box>
            </ColumnBlock>
          )}
        </Box>

        {/* -------- RIGHT COLUMN -------- */}
        <Box sx={{ pl: 4, pr: 6 }}>
          {/* Profile Summary */}
          <ColumnBlock title="Profile Summary">
            <Typography sx={{ fontSize: 12.5, color: MUTED, textAlign: "justify" }}>
              {summaryText}
            </Typography>
          </ColumnBlock>

          {/* Work Experience */}
          {data.experience && data.experience.length > 0 && (
            <ColumnBlock title="Work Experience" last>
              {data.experience.map((exp, i) => (
                <Box key={i} sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: DARK }}>
                      {exp.companyName}
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: "#666" }}>
                      {formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: 12.5, color: MUTED, mb: 1 }}>
                    {exp.designation}
                  </Typography>
                  {exp.description && (
                    <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                      {exp.description
                        .split(/\n+/)
                        .filter(Boolean)
                        .map((line, j) => (
                          <Typography
                            component="li"
                            key={j}
                            sx={{
                              fontSize: 12.5,
                              color: MUTED,
                              mb: 0.75,
                              textAlign: "justify",
                            }}
                          >
                            {line}
                          </Typography>
                        ))}
                    </Box>
                  )}
                </Box>
              ))}
            </ColumnBlock>
          )}
        </Box>
      </Box>

      <Box sx={{ borderTop: `1px solid ${RULE}`, mx: 6, mb: 3 }} />
    </Paper>
  );
};

/** A titled block within a column, with circular badge heading and bottom divider */
const ColumnBlock = ({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) => (
  <Box
    sx={{
      pt: 3,
      pb: 3,
      borderBottom: last ? "none" : "1px solid #ccc",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 0, mb: 2 }}>
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: "50%",
          bgcolor: BADGE_BG,
          flexShrink: 0,
          mr: -2,
          zIndex: 0,
        }}
      />
      <Typography
        sx={{
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "3px",
          color: DARK,
          textTransform: "uppercase",
          position: "relative",
          zIndex: 1,
          pl: 1,
        }}
      >
        {title}
      </Typography>
    </Box>
    {children}
  </Box>
);

/** Contact row with icon + text */
const ContactRow = ({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text?: string;
}) => {
  if (!text) return null;
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.25 }}>
      <Box sx={{ color: DARK, display: "flex" }}>{icon}</Box>
      <Typography sx={{ fontSize: 12.5, color: MUTED }}>{text}</Typography>
    </Box>
  );
};

export default ElegantClassicTemplate;
