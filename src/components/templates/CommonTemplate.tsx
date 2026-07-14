import { Box, Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import type { ResumeData, ResumeTemplateId, ResumeThemeColor } from "../../types/candidate/resume.types";

const colors: Record<ResumeThemeColor, string> = {
  blue: "#1976d2",
  black: "#111827",
  green: "#16a34a",
  purple: "#7c3aed",
  orange: "#ea580c"
};

type Props = {
  data: ResumeData;
  template: ResumeTemplateId;
  themeColor: ResumeThemeColor;
};

const CommonTemplate = ({ data, template, themeColor }: Props) => {
  const primary = colors[themeColor];

  const isModern = (template as string) === "modern";
  const isMinimal = (template as string) === "minimal";
  const isAts = (template as string) === "ats";
  const isExecutive = (template as string) === "executive";
  const isTwoColumn = (template as string) === "twoColumn";
  const isElegant = (template as string) === "elegant";

  return (
    <Paper
      elevation={0}
      sx={{
        width: "794px",
        minHeight: "1123px",
        mx: "auto",
        bgcolor: "#fff",
        color: "#111827",
        border: "1px solid #e5e7eb",
        borderRadius: isAts || isMinimal ? 0 : 3,
        overflow: "hidden",
        fontFamily: isAts ? "Arial, sans-serif" : "Inter, Arial, sans-serif",
      }}
    >
      {isTwoColumn ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "1123px" }}>
          <Box sx={{ bgcolor: primary, color: "#fff", p: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 900 }}>
              {data.personal?.fullName}
            </Typography>
            <Typography sx={{ mt: 1 }}>{data.personal?.jobTitle}</Typography>

            <Divider sx={{ my: 3, borderColor: "rgba(255,255,255,0.35)" }} />

            <SmallTitle title="Contact" color="#fff" />
            <Typography sx={{ fontSize: 13 }}>{data.contact?.email}</Typography>
            <Typography sx={{ fontSize: 13 }}>{data.contact?.phone}</Typography>
            <Typography sx={{ fontSize: 13 }}>{data.personal?.location}</Typography>

            {data.skills?.length ? (
              <Box sx={{ mt: 3 }}>
                <SmallTitle title="Skills" color="#fff" />
                {data.skills.map((skill :any) => (
                  <Typography key={skill} sx={{ fontSize: 13 }}>• {skill}</Typography>
                ))}
              </Box>
            ) : null}
          </Box>

          <Box sx={{ p: 4 }}>
            <ResumeBody data={data} primary={primary} hideSkills />
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              p: 4,
              textAlign: isAts || isMinimal ? "left" : "center",
              bgcolor: isModern || isExecutive ? primary : "#fff",
              color: isModern || isExecutive ? "#fff" : "#111827",
              borderBottom: isElegant ? `5px solid ${primary}` : "none",
            }}
          >
            <Typography
              variant={isMinimal ? "h3" : "h4"}
              sx={{ fontWeight: isMinimal ? 300 : 900 }}
            >
              {data.personal?.fullName}
            </Typography>

            <Typography sx={{ fontWeight: 700 }}>{data.personal?.jobTitle}</Typography>
            <Typography sx={{ fontSize: 13 }}>
              {data.personal?.location}
            </Typography>

            {data.contact && (
              <Typography sx={{ fontSize: 13, mt: 1 }}>
                {data.contact.email} | {data.contact.phone}
              </Typography>
            )}
          </Box>

          <Box sx={{ p: 4 }}>
            <ResumeBody data={data} primary={primary} />
          </Box>
        </>
      )}
    </Paper>
  );
};

const ResumeBody = ({
  data,
  primary,
  hideSkills = false,
}: {
  data: ResumeData;
  primary: string;
  hideSkills?: boolean;
}) => (
  <>
    {data.summary && (
      <Section title="Summary" color={primary}>
        <Typography sx={{ fontSize: 14 }}>{data.summary}</Typography>
      </Section>
    )}

    {!hideSkills && data.skills?.length ? (
      <Section title="Skills" color={primary}>
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
          {data.skills.map((skill: any) => (
            <Chip key={skill} label={skill} size="small" />
          ))}
        </Stack>
      </Section>
    ) : null}

    {data.experience?.length ? (
      <Section title="Experience" color={primary}>
        {data.experience.map((item: any) => (
          <Box key={item.companyName} sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>
              {item.designation} - {item.companyName}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>
              {item.duration}
            </Typography>
            <Typography sx={{ fontSize: 14 }}>{item.description}</Typography>
          </Box>
        ))}
      </Section>
    ) : null}

    {data.education?.length ? (
      <Section title="Education" color={primary}>
        {data.education.map((item: any) => (
          <Box key={item.degree} sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>{item.degree}</Typography>
            <Typography sx={{ fontSize: 14 }}>{item.university}</Typography>
            <Typography sx={{ fontSize: 12 }}>{item.year}</Typography>
          </Box>
        ))}
      </Section>
    ) : null}

    {data.projects?.length ? (
      <Section title="Projects" color={primary}>
        {data.projects.map((item: any) => (
          <Box key={item.title} sx={{ mb: 2 }}>
            <Typography sx={{ fontWeight: 900 }}>{item.title}</Typography>
            <Typography sx={{ fontSize: 12 }}>{item.techStack}</Typography>
            <Typography sx={{ fontSize: 14 }}>{item.description}</Typography>
          </Box>
        ))}
      </Section>
    ) : null}

    {data.certifications?.length ? (
      <Section title="Certifications" color={primary}>
        {data.certifications.map((item: any) => (
          <Typography key={item} sx={{ fontSize: 14 }}>• {item}</Typography>
        ))}
      </Section>
    ) : null}

    {data.achievements?.length ? (
      <Section title="Achievements" color={primary}>
        {data.achievements.map((item: any) => (
          <Typography key={item} sx={{ fontSize: 14 }}>• {item}</Typography>
        ))}
      </Section>
    ) : null}

    {data.languages?.length ? (
      <Section title="Languages" color={primary}>
        <Typography sx={{ fontSize: 14 }}>{data.languages.join(", ")}</Typography>
      </Section>
    ) : null}
  </>
);

const Section = ({
  title,
  color,
  children,
}: {
  title: string;
  color: string;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 3 }}>
    <Typography
      
      sx={{
        mb: 1,
        color,
        textTransform: "uppercase",
        fontSize: 14,
        letterSpacing: 0.8,
        fontWeight: 900
      }}
    >
      {title}
    </Typography>
    {children}
  </Box>
);

const SmallTitle = ({ title, color }: { title: string; color: string }) => (
  <Typography sx={{ fontWeight: 900, mb: 1, color }}>
    {title}
  </Typography>
);

export default CommonTemplate;