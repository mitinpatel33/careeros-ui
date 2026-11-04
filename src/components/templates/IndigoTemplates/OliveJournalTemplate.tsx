import { forwardRef, type ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Sheet,
  SecAch,
  SecCert,
  SecLang,
  SecProj,
  type TplProps,
} from "./sheet";
import { normalizeResume } from "../NewTemplate/resume";
import {
  Bullets,
  ContactList,
  Heading,
  makeTheme,
  Skills,
} from "../NewTemplate/Themeatoms";

const SERIF = "Georgia, 'Times New Roman', serif";

const OliveJournalTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#4d6b2f");
    const text = r.summary || r.objective;

    const Row = ({
      left,
      sub,
      children,
    }: {
      left?: string;
      sub?: string;
      children: ReactNode;
    }) => (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "116px 1fr",
          gap: 2,
          mb: 1.9,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: 10.5,
              fontWeight: 800,
              color: t.c,
              letterSpacing: 0.3,
            }}
          >
            {left}
          </Typography>
          {sub && (
            <Typography
              sx={{
                fontSize: 10,
                color: t.muted,
                fontStyle: "italic",
                mt: 0.3,
              }}
            >
              {sub}
            </Typography>
          )}
        </Box>
        <Box>{children}</Box>
      </Box>
    );

    return (
      <Sheet ref={ref} sx={{ "& .MuiTypography-root": { fontFamily: SERIF } }}>
        <Box sx={{ p: "44px 48px 30px" }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 3,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 40,
                  fontWeight: 700,
                  color: t.ink,
                  lineHeight: 1.0,
                  letterSpacing: -0.8,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography
                  sx={{ fontSize: 15, fontStyle: "italic", color: t.c, mt: 1 }}
                >
                  {r.role}
                </Typography>
              )}
            </Box>
            <ContactList
              items={r.contact}
              dir="column"
              justify="flex-end"
              showIcons={false}
              size={10.5}
              color="#475569"
            />
          </Stack>

          <Box sx={{ mt: 2.2, borderTop: `4px solid ${t.c}`, pt: "3px" }}>
            <Box sx={{ borderTop: `1px solid ${t.c}` }} />
          </Box>

          {text && (
            <Typography
              sx={{
                fontSize: 13,
                lineHeight: 1.75,
                fontStyle: "italic",
                color: "#3f3f46",
                my: 2.4,
              }}
            >
              {text}
            </Typography>
          )}

          {r.experience.length > 0 && (
            <Box sx={{ mb: 2.2 }}>
              <Heading t={t} variant="serif">
                Experience
              </Heading>
              {r.experience.map((e, i) => (
                <Row key={i} left={e.period} sub={e.location}>
                  <Typography
                    sx={{ fontSize: 13, fontWeight: 700, color: t.ink }}
                  >
                    {e.company}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11.5, fontStyle: "italic", color: t.c }}
                  >
                    {e.role}
                  </Typography>
                  <Bullets items={e.bullets} t={t} />
                </Row>
              ))}
            </Box>
          )}

          {r.education.length > 0 && (
            <Box sx={{ mb: 2.2 }}>
              <Heading t={t} variant="serif">
                Education
              </Heading>
              {r.education.map((e, i) => (
                <Row key={i} left={e.period}>
                  <Typography
                    sx={{ fontSize: 12.5, fontWeight: 700, color: t.ink }}
                  >
                    {e.school}
                  </Typography>
                  <Typography
                    sx={{ fontSize: 11, fontStyle: "italic", color: t.c }}
                  >
                    {e.degree}
                    {e.score ? `  ·  ${e.score}` : ""}
                  </Typography>
                </Row>
              ))}
            </Box>
          )}

          <SecProj r={r} t={t} h="serif" />

          {r.skills.length > 0 && (
            <Box sx={{ mb: 2.2 }}>
              <Heading t={t} variant="serif">
                Skills
              </Heading>
              <Skills skills={r.skills} t={t} variant="text" sep="◆" />
            </Box>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0 24px",
            }}
          >
            <SecLang r={r} t={t} h="serif" variant="lines" />
            <SecCert r={r} t={t} h="serif" />
            <SecAch r={r} t={t} h="serif" />
          </Box>
        </Box>
      </Sheet>
    );
  },
);

OliveJournalTemplate.displayName = "OliveJournalTemplate";
export default OliveJournalTemplate;
