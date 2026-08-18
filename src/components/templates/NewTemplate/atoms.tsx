import { Box, Chip, Stack, Typography, alpha } from "@mui/material";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import type { EducationEntry, ExperienceEntry, PersonalInfo } from "./resume";

/* ---------------------------------------------------------------------- */
/* Section heading                                                        */
/* ---------------------------------------------------------------------- */
interface SectionTitleProps {
  children: React.ReactNode;
  color?: string;
  variant?: "underline" | "bar" | "plain";
  sx?: object;
}

export const SectionTitle = ({ children, color = "#1e40af", variant = "underline", sx }: SectionTitleProps) => (
  <Box sx={{ mb: 1.25, ...sx }}>
    <Typography
      sx={{
        fontSize: 13,
        fontWeight: 800,
        letterSpacing: 0.6,
        textTransform: "uppercase",
        color: variant === "bar" ? "#fff" : color,
        pl: variant === "bar" ? 1.25 : 0,
        borderLeft: variant === "bar" ? `4px solid ${color}` : "none",
      }}
    >
      {children}
    </Typography>
    {variant === "underline" && (
      <Box sx={{ mt: 0.5, height: 2, width: 34, bgcolor: color, borderRadius: 1 }} />
    )}
  </Box>
);

/* ---------------------------------------------------------------------- */
/* Contact row — icon + text, reused in headers and sidebars              */
/* ---------------------------------------------------------------------- */
interface ContactListProps {
  info: PersonalInfo;
  color?: string;
  direction?: "row" | "column";
  iconColor?: string;
}

export const ContactList = ({ info, color = "#334155", direction = "row", iconColor }: ContactListProps) => {
  const items = [
    info?.phone && { icon: <PhoneRoundedIcon sx={{ fontSize: 15 }} />, label: info?.phone },
    info?.email && { icon: <EmailRoundedIcon sx={{ fontSize: 15 }} />, label: info?.email },
    info?.location && { icon: <PlaceRoundedIcon sx={{ fontSize: 15 }} />, label: info?.location },
    info?.linkedin && { icon: <LinkedInIcon sx={{ fontSize: 15 }} />, label: info?.linkedin },
    info?.website && { icon: <LanguageRoundedIcon sx={{ fontSize: 15 }} />, label: info?.website },
  ].filter(Boolean) as { icon: React.ReactNode; label: string }[];

  return (
    <Stack
      direction={direction === "row" ? "row" : "column"}
      spacing={direction === "row" ? 2 : 0.9}
      sx={{
        color,
        rowGap: 0.5,
        flexWrap: direction === "row" ? "wrap" : undefined,
      }}
    >
      {items?.map((item: any, i: any) => (
        <Stack key={i} direction="row" spacing={0.6} sx={{ alignItems: "center" }}>
          <Box sx={{ color: iconColor ?? color, display: "flex" }}>{item?.icon}</Box>
          <Typography sx={{ fontSize: 11.5, wordBreak: "break-word" }}>{item?.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );
};

/* ---------------------------------------------------------------------- */
/* Skill pill list                                                        */
/* ---------------------------------------------------------------------- */
interface SkillPillsProps {
  skills: string[];
  color?: string;
  bg?: string;
  variant?: "pill" | "list";
}

export const SkillPills = ({ skills, color = "#1e40af", bg, variant = "pill" }: SkillPillsProps) => {
  if (variant === "list") {
    return (
      <Stack spacing={0.6}>
        {skills?.map((s: any) => (
          <Typography key={s} sx={{ fontSize: 12, color }}>
            {s}
          </Typography>
        ))}
      </Stack>
    );
  }
  return (
    <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75 }}>
      {skills?.map((s) => (
        <Chip
          key={s}
          label={s}
          size="small"
          sx={{
            fontSize: 11,
            height: 24,
            fontWeight: 600,
            bgcolor: bg ?? alpha(color, 0.1),
            color,
          }}
        />
      ))}
    </Stack>
  );
};

/* ---------------------------------------------------------------------- */
/* Date badge                                                              */
/* ---------------------------------------------------------------------- */
export const DateBadge = ({
  children,
  color = "#1e40af",
  filled = true,
}: {
  children: React.ReactNode;
  color?: string;
  filled?: boolean;
}) => (
  <Box
    sx={{
      fontSize: 10.5,
      fontWeight: 700,
      px: 1,
      py: 0.25,
      borderRadius: "4px",
      whiteSpace: "nowrap",
      bgcolor: filled ? color : "transparent",
      color: filled ? "#fff" : color,
      border: filled ? "none" : `1px solid ${color}`,
    }}
  >
    {children}
  </Box>
);

/* ---------------------------------------------------------------------- */
/* Bullet list                                                            */
/* ---------------------------------------------------------------------- */
export const BulletList = ({ items, color = "#334155" }: { items: string[]; color?: string }) => (
  <Box component="ul" sx={{ m: 0, mt: 0.5, pl: 2.2, color }}>
    {items?.map((b: any, i: any) => (
      <Typography key={i} component="li" sx={{ fontSize: 11.5, lineHeight: 1.55, mb: 0.3 }}>
        {b}
      </Typography>
    ))}
  </Box>
);

/* ---------------------------------------------------------------------- */
/* Experience item                                                        */
/* ---------------------------------------------------------------------- */
interface ExperienceBlockProps {
  entry: ExperienceEntry;
  accent?: string;
  textColor?: string;
  showDot?: boolean;
}

export const ExperienceBlock = ({ entry, accent = "#1e40af", textColor = "#0f172a", showDot }: ExperienceBlockProps) => (
  <Box sx={{ mb: 2, position: "relative", pl: showDot ? 2 : 0 }}>
    {showDot && (
      <Box
        sx={{
          position: "absolute",
          left: -4,
          top: 6,
          width: 9,
          height: 9,
          borderRadius: "50%",
          bgcolor: accent,
        }}
      />
    )}
    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 0.5 }}>
      <Box>
        <Typography sx={{ fontSize: 13.5, fontWeight: 800, color: textColor }}>{entry?.company}</Typography>
        <Typography sx={{ fontSize: 12, fontWeight: 600, color: accent }}>{entry?.role}</Typography>
        {entry?.location && (
          <Typography sx={{ fontSize: 10.5, color: "text.secondary", fontStyle: "italic" }}>
            {entry?.location}
          </Typography>
        )}
      </Box>
      <DateBadge color={accent}>
        {entry?.startDate} - {entry?.endDate}
      </DateBadge>
    </Stack>
    <BulletList items={entry?.bullets} />
  </Box>
);

/* ---------------------------------------------------------------------- */
/* Education item                                                         */
/* ---------------------------------------------------------------------- */
export const EducationBlock = ({ entry, accent = "#1e40af", textColor = "#0f172a" }: { entry: EducationEntry; accent?: string; textColor?: string }) => (
  <Box sx={{ mb: 1.25 }}>
    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 0.5 }}>
      <Typography sx={{ fontSize: 13, fontWeight: 800, color: textColor }}>{entry?.institution}</Typography>
      <DateBadge color={accent}>{entry?.date}</DateBadge>
    </Stack>
    <Typography sx={{ fontSize: 11.5, color: textColor }}>
      {entry?.degree}
      {entry?.gpa ? `, CGPA: ${entry?.gpa}` : ""}
    </Typography>
    {entry?.location && (
      <Typography sx={{ fontSize: 10.5, color: accent, fontStyle: "italic" }}>{entry?.location}</Typography>
    )}
  </Box>
);

/* ---------------------------------------------------------------------- */
/* Simple tag list (awards / certifications)                              */
/* ---------------------------------------------------------------------- */
export const TagList = ({ items, color = "#0f172a" }: { items: string[]; color?: string }) => (
  <Box component="ul" sx={{ m: 0, pl: 2, color }}>
    {items?.map((item: any, i: any) => (
      <Typography key={i} component="li" sx={{ fontSize: 11.5, lineHeight: 1.5, mb: 0.3 }}>
        {item}
      </Typography>
    ))}
  </Box>
);
