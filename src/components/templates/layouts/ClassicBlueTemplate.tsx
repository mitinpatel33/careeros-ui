// ClassicBlueTemplate.tsx
import { Box, Typography, Paper, Avatar } from "@mui/material";
import type { TemplateRenderProps } from "../../../types/resumeTemplate.types";

const BLUE = "#3f8fd1";
const DARK = "#1f1f1f";
const MUTED = "#333";
const BAR_FILLED = "#3f8fd1";
const BAR_EMPTY = "#c9c9c9";
const TOTAL_SEGMENTS = 10;

/** Format a Date or string into "MM/YYYY" */
const formatDate = (d?: Date | string) => {
  if (!d) return "";
  const date = new Date(d);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${mm}/${date.getFullYear()}`;
};

const formatRange = (
  start?: Date | string,
  end?: Date | string,
  isCurrent?: boolean
) => {
  const startStr = formatDate(start);
  if (isCurrent || !end) return `${startStr} to Present`;
  return `${startStr} to ${formatDate(end)}`;
};

/** Map a proficiency label (or number) to a filled-segment count out of TOTAL_SEGMENTS */
const proficiencyToSegments = (proficiency?: string | number): number => {
  if (typeof proficiency === "number") {
    return Math.max(0, Math.min(TOTAL_SEGMENTS, Math.round(proficiency)));
  }
  switch ((proficiency ?? "").toLowerCase()) {
    case "beginner":
      return 3;
    case "intermediate":
      return 6;
    case "advanced":
      return 8;
    case "expert":
      return 10;
    default:
      return 7;
  }
};

/** Renders a name with the first letter of each word full-size and the rest as small-caps */
const SmallCapsWord = ({ word }: { word: string }) => (
  <>
    <Box component="span" sx={{ fontSize: "1em" }}>
      {word.charAt(0)}
    </Box>
    <Box component="span" sx={{ fontSize: "0.72em" }}>
      {word.slice(1)}
    </Box>
  </>
);

const ClassicBlueTemplate = ({
  data,
  config,
  settings,
}: TemplateRenderProps) => {
  const firstName = data.personal?.firstName ?? "";
  const lastName = data.personal?.lastName ?? "";

  const summaryText =
    data.summary?.professionalSummary || data.summary?.careerObjective || "";

  const addressLine = [data.contact?.city, data.contact?.state, data.contact?.zip]
    .filter(Boolean)
    .join(", ");
  const phoneEmailLine = [data.contact?.mobile, data.contact?.email]
    .filter(Boolean)
    .join(" - ");

  const photoUrl = data.personal?.photoUrl ?? data.personal?.profileImage;

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        p: 6,
        fontFamily: settings?.fontFamily ?? "Georgia, 'Times New Roman', serif",
        fontSize: settings?.fontSize ?? 12,
        border: "1px solid #e5e7eb",
        bgcolor: "#fff",
        color: DARK,
        position: "relative",
      }}
    >
      {/* ================= HEADER ================= */}
      <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
        {photoUrl && (
          <Avatar
            src={photoUrl}
            sx={{
              width: 84,
              height: 84,
              position: "absolute",
              top: 0,
              right: 0,
              border: "3px solid #fff",
              boxShadow: "0 0 0 1px #eee",
            }}
          />
        )}

        <Typography
          sx={{
            color: BLUE,
            fontWeight: 700,
            letterSpacing: "1px",
            fontSize: 26,
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <SmallCapsWord word={firstName.toUpperCase() || "FIRST"} />
          <SmallCapsWord word={lastName.toUpperCase() || "LAST"} />
        </Typography>

        {(addressLine || phoneEmailLine) && (
          <Box sx={{ mt: 1.5 }}>
            {addressLine && (
              <Typography sx={{ fontSize: 12.5, color: MUTED }}>{addressLine}</Typography>
            )}
            {phoneEmailLine && (
              <Typography sx={{ fontSize: 12.5, color: MUTED }}>{phoneEmailLine}</Typography>
            )}
          </Box>
        )}
      </Box>

      {/* ================= RESUME OBJECTIVE ================= */}
      {summaryText && (
        <SectionHeading title="Resume Objective">
          <Box sx={{ pl: "150px" }}>
            <Typography sx={{ fontSize: 12.5, color: MUTED, textAlign: "justify" }}>
              {summaryText}
            </Typography>
          </Box>
        </SectionHeading>
      )}

      {/* ================= EDUCATION ================= */}
      {data.education && data.education.length > 0 && (
        <SectionHeading title="Education">
          {data.education.map((edu, i) => (
            <TwoColRow
              key={i}
              left={formatDate(edu.endDate ?? edu.startDate)}
              right={
                <>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {edu.degree}
                    {edu.fieldOfStudy ? `: ${edu.fieldOfStudy}` : ""}
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {edu.instituteName}
                    {edu.city ? ` - ${edu.city}` : ""}
                  </Typography>
                </>
              }
            />
          ))}
        </SectionHeading>
      )}

      {/* ================= SKILLS ================= */}
      {data.skills && data.skills.length > 0 && (
        <SectionHeading title="Skills">
          <Box sx={{ pl: "150px" }}>
            {chunk(data.skills, 2).map((pair, rowIdx) => (
              <Box key={rowIdx} sx={{ mb: 1.5 }}>
                <Typography sx={{ fontSize: 12.5, color: DARK }}>
                  {pair.map((s) => s.skillName).join("")}
                </Typography>
                <Box sx={{ display: "flex", gap: 2, mt: 0.5 }}>
                  {pair.map((skill, i) => (
                    <SkillBar key={i} filled={proficiencyToSegments(skill.proficiency)} />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </SectionHeading>
      )}

      {/* ================= WORK HISTORY ================= */}
      {data.experience && data.experience.length > 0 && (
        <SectionHeading title="Work History">
          {data.experience.map((exp, i) => (
            <TwoColRow
              key={i}
              left={formatRange(exp.startDate, exp.endDate, exp.isCurrentCompany)}
              right={
                <>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>
                    {exp.designation}
                  </Typography>
                  <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK, mb: 0.5 }}>
                    {exp.companyName}
                    {exp.city ? ` \u2013 ${exp.city}` : ""}
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
                            sx={{ fontSize: 12, color: MUTED }}
                          >
                            {line}
                          </Typography>
                        ))}
                    </Box>
                  )}
                </>
              }
            />
          ))}
        </SectionHeading>
      )}

      {/* ================= ACCOMPLISHMENTS ================= */}
      {data.achievements && data.achievements.length > 0 && (
        <SectionHeading title="Accomplishments" last>
          <Box sx={{ pl: "150px" }}>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {data.achievements.map((ach, i) => (
                <Typography component="li" key={i} sx={{ fontSize: 12.5, color: MUTED, mb: 0.5 }}>
                  {ach.title}
                  {ach.description ? ` \u2013 ${ach.description}` : ""}
                </Typography>
              ))}
            </Box>
          </Box>
        </SectionHeading>
      )}
    </Paper>
  );
};

/** Section heading: blue small-caps label + horizontal rule, with content below */
const SectionHeading = ({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) => (
  <Box sx={{ mb: last ? 0 : 3 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
      <Typography
        sx={{
          color: BLUE,
          fontWeight: 700,
          fontSize: 14,
          whiteSpace: "nowrap",
          display: "flex",
        }}
      >
        {title.split(" ").map((w, i) => (
          <Box key={i} sx={{ display: "flex", mr: "6px" }}>
            <SmallCapsWord word={w} />
          </Box>
        ))}
      </Typography>
      <Box sx={{ flex: 1, borderTop: `1px solid ${BLUE}` }} />
    </Box>
    {children}
  </Box>
);

/** Two column row: fixed-width date/label on the left, content on the right */
const TwoColRow = ({
  left,
  right,
}: {
  left: string;
  right: React.ReactNode;
}) => (
  <Box sx={{ display: "grid", gridTemplateColumns: "150px 1fr", mb: 2 }}>
    <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: DARK }}>{left}</Typography>
    <Box>{right}</Box>
  </Box>
);

/** Segmented skill proficiency bar */
const SkillBar = ({ filled }: { filled: number }) => (
  <Box sx={{ display: "flex", gap: "3px" }}>
    {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
      <Box
        key={i}
        sx={{
          width: 16,
          height: 6,
          bgcolor: i < filled ? BAR_FILLED : BAR_EMPTY,
        }}
      />
    ))}
  </Box>
);

/** Split an array into chunks of a given size */
function chunk<T>(arr: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export default ClassicBlueTemplate;
