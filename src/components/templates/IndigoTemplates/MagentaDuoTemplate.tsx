import { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
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
  Heading,
  makeTheme,
  NetworkBackdrop,
  ProfileAvatar,
} from "../NewTemplate/Themeatoms";

const MagentaDuoTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#d61f7c");

    return (
      <Sheet ref={ref}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 246px",
            minHeight: 1123,
          }}
        >
          <Box sx={{ p: "40px 30px 30px 40px" }}>
            <Typography
              sx={{
                fontSize: 36,
                fontWeight: 800,
                color: t.ink,
                lineHeight: 1.05,
                letterSpacing: -0.8,
              }}
            >
              {r.name}
            </Typography>
            {r.role && (
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: t.c,
                  mt: 0.8,
                  mb: 2.6,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                }}
              >
                {r.role}
              </Typography>
            )}
            <SecSummary r={r} t={t} h="line" />
            <SecExp r={r} t={t} h="line" dates="tag" />
            <SecEdu r={r} t={t} h="line" />
            <SecProj r={r} t={t} h="line" />
            <SecCert r={r} t={t} h="line" />
            <SecAch r={r} t={t} h="line" />
          </Box>

          <Box
            sx={{
              position: "relative",
              color: "#fff",
              p: "40px 24px 30px",
              background: `linear-gradient(170deg, ${t.c} 0%, #8e1457 100%)`,
            }}
          >
            <NetworkBackdrop variant="c" color="#fff" opacity={0.16} />
            <Box sx={{ position: "relative" }}>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                <ProfileAvatar
                  r={r}
                  t={t}
                  size={104}
                  tone="light"
                  border="4px solid rgba(255,255,255,.55)"
                />
              </Box>

              {r.contact.length > 0 && (
                <Box sx={{ mb: 2.6 }}>
                  <Heading t={t} variant="light">
                    Contact
                  </Heading>
                  <ContactList
                    items={r.contact}
                    dir="column"
                    color="#fff"
                    size={10}
                  />
                </Box>
              )}

              {r.skills.length > 0 && (
                <SecSkills
                  r={r}
                  t={t}
                  h="light"
                  variant="bars"
                  textColor="#fff"
                  trackColor="rgba(255,255,255,.28)"
                  fillColor="#fff"
                />
              )}

              <SecLang r={r} t={t} h="light" variant="lines" color="#fff" />
            </Box>
          </Box>
        </Box>
      </Sheet>
    );
  },
);

MagentaDuoTemplate.displayName = "MagentaDuoTemplate";
export default MagentaDuoTemplate;
