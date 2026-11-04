import { forwardRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Sheet,
  SecAch,
  SecCert,
  SecEdu,
  SecExp,
  SecLang,
  SecProj,
  SecSkills,
  SecSummary,
  type TplProps,
} from "./sheet";
import { normalizeResume } from "../NewTemplate/resume";
import {
  ContactList,
  makeTheme,
  ProfileAvatar,
} from "../NewTemplate/Themeatoms";

const AmberStatsTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#d97706");

    const stats = [
      { n: r.experience.length, label: "Roles" },
      { n: r.projects.length, label: "Projects" },
      { n: r.skills.length, label: "Skills" },
      { n: r.certs.length + r.achievements.length, label: "Awards & Certs" },
      { n: r.education.length, label: "Degrees" },
    ]
      .filter((s) => s.n > 0)
      .slice(0, 4);

    return (
      <Sheet ref={ref}>
        <Box sx={{ p: "38px 42px 0" }}>
          <Stack direction="row" spacing={2.5} sx={{ alignItems: "center" }}>
            <Box
              sx={{
                boxShadow: `6px 6px 0 ${t.mid}`,
                borderRadius: "14px",
                lineHeight: 0,
              }}
            >
              <ProfileAvatar r={r} t={t} size={92} shape="rounded" />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: t.ink,
                  lineHeight: 1.05,
                  letterSpacing: -0.6,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography
                  sx={{ fontSize: 14, fontWeight: 700, color: t.c, mt: 0.7 }}
                >
                  {r.role}
                </Typography>
              )}
            </Box>
          </Stack>
          <Box sx={{ mt: 2 }}>
            <ContactList items={r.contact} iconColor={t.c} size={10.5} />
          </Box>
        </Box>

        {stats.length > 0 && (
          <Box
            sx={{
              mx: "42px",
              mt: 2.6,
              display: "grid",
              gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
              border: `1.5px solid ${t.c}`,
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            {stats.map((s, i) => (
              <Box
                key={s.label}
                sx={{
                  textAlign: "center",
                  py: 1.3,
                  bgcolor: i % 2 ? "#fff" : t.soft,
                  borderLeft: i ? `1px solid ${t.mid}` : "none",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 24,
                    fontWeight: 800,
                    color: t.c,
                    lineHeight: 1,
                  }}
                >
                  {s.n}
                </Typography>
                <Typography
                  sx={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    color: t.muted,
                    mt: 0.5,
                  }}
                >
                  {s.label}
                </Typography>
              </Box>
            ))}
          </Box>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 218px",
            gap: "0 28px",
            p: "26px 42px 30px",
            alignItems: "start",
          }}
        >
          <Box>
            <SecSummary r={r} t={t} h="dot" />
            <SecExp r={r} t={t} h="dot" dates="tag" />
            <SecProj r={r} t={t} h="dot" />
          </Box>
          <Box>
            <SecSkills
              r={r}
              t={t}
              h="dot"
              variant="bars"
              trackColor={t.soft}
              fillColor={t.c}
            />
            <SecEdu r={r} t={t} h="dot" />
            <SecLang r={r} t={t} h="dot" variant="lines" />
            <SecCert r={r} t={t} h="dot" />
            <SecAch r={r} t={t} h="dot" />
          </Box>
        </Box>
      </Sheet>
    );
  },
);

AmberStatsTemplate.displayName = "AmberStatsTemplate";
export default AmberStatsTemplate;
