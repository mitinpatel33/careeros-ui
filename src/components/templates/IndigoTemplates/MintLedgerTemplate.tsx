import { forwardRef, type ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Sheet,
  SecAch,
  SecCert,
  SecLang,
  SecProj,
  SecSkills,
  type TplProps,
} from "./sheet";
import { normalizeResume } from "../NewTemplate/resume";
import {
  Bullets,
  ContactList,
  DateTag,
  Heading,
  makeTheme,
  P,
  ProfileAvatar,
} from "../NewTemplate/Themeatoms";

const MintLedgerTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#059669");
    const text = r.summary || r.objective;

    const Card = ({ children }: { children: ReactNode }) => (
      <Box
        sx={{
          bgcolor: "#fff",
          borderLeft: `4px solid ${t.c}`,
          borderRadius: "0 10px 10px 0",
          p: "10px 14px",
          mb: 1.2,
          boxShadow: "0 1px 6px rgba(5,150,105,.12)",
        }}
      >
        {children}
      </Box>
    );

    return (
      <Sheet ref={ref} sx={{ bgcolor: "#f1faf6" }}>
        <Box sx={{ p: "38px 40px 0" }}>
          <Stack direction="row" spacing={2.4} sx={{ alignItems: "center" }}>
            <ProfileAvatar r={r} t={t} size={80} border="4px solid #fff" />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: "#064e3b",
                  lineHeight: 1.05,
                  letterSpacing: -0.5,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Box
                  sx={{
                    display: "inline-block",
                    mt: 0.9,
                    bgcolor: t.c,
                    color: "#fff",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 0.6,
                    px: 1.5,
                    py: 0.3,
                    borderRadius: "20px",
                  }}
                >
                  {r.role}
                </Box>
              )}
            </Box>
          </Stack>
          <Box
            sx={{
              mt: 2,
              bgcolor: "#fff",
              borderRadius: "10px",
              p: "9px 14px",
              boxShadow: "0 1px 6px rgba(5,150,105,.10)",
            }}
          >
            <ContactList items={r.contact} iconColor={t.c} size={10.5} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 208px",
            gap: "0 24px",
            p: "22px 40px 30px",
            alignItems: "start",
          }}
        >
          <Box>
            {text && (
              <Box sx={{ mb: 2.2 }}>
                <Heading t={t} variant="plain">
                  Profile
                </Heading>
                <Card>
                  <P size={11.3}>{text}</P>
                </Card>
              </Box>
            )}
            {r.experience.length > 0 && (
              <Box sx={{ mb: 2.2 }}>
                <Heading t={t} variant="plain">
                  Experience
                </Heading>
                {r.experience.map((e, i) => (
                  <Card key={i}>
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "space-between", gap: 1 }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Typography
                          sx={{ fontSize: 12.5, fontWeight: 800, color: t.ink }}
                        >
                          {e.company}
                        </Typography>
                        <Typography
                          sx={{ fontSize: 11.2, fontWeight: 600, color: t.c }}
                        >
                          {e.role}
                        </Typography>
                      </Box>
                      <DateTag t={t}>{e.period}</DateTag>
                    </Stack>
                    <Bullets items={e.bullets} t={t} />
                  </Card>
                ))}
              </Box>
            )}
            <SecProj r={r} t={t} h="plain" />
          </Box>

          <Box>
            <SecSkills r={r} t={t} h="plain" variant="chip" />
            {r.education.length > 0 && (
              <Box sx={{ mb: 2.2 }}>
                <Heading t={t} variant="plain">
                  Education
                </Heading>
                {r.education.map((e, i) => (
                  <Card key={i}>
                    <Typography
                      sx={{ fontSize: 11.5, fontWeight: 800, color: t.ink }}
                    >
                      {e.school}
                    </Typography>
                    <Typography
                      sx={{ fontSize: 10.5, color: t.c, fontWeight: 600 }}
                    >
                      {e.degree}
                      {e.score ? ` · ${e.score}` : ""}
                    </Typography>
                    <Typography sx={{ fontSize: 10, color: t.muted }}>
                      {e.period}
                    </Typography>
                  </Card>
                ))}
              </Box>
            )}
            <SecLang r={r} t={t} h="plain" variant="lines" />
            <SecCert r={r} t={t} h="plain" />
            <SecAch r={r} t={t} h="plain" />
          </Box>
        </Box>
      </Sheet>
    );
  },
);

MintLedgerTemplate.displayName = "MintLedgerTemplate";
export default MintLedgerTemplate;
