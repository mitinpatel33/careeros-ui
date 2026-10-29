import { Box, Stack, Typography } from "@mui/material";
import { createTemplate } from "./createTemplate";
import {
  AchList,
  Block,
  CertList,
  ContactList,
  EduList,
  ExpList,
  FloatingTiles,
  LangList,
  NetworkBackdrop,
  P,
  ProfileAvatar,
  ProjectList,
  Skills,
} from "./Themeatoms";

/** 1 · Red — full-width header band, two-column body */
export default createTemplate("CrimsonHeaderTemplate", "#d92d3a", (r, t) => {
  const about = r.summary || r.objective;
  return (
    <>
      <Box
        sx={{
          position: "relative",
          bgcolor: t.c,
          color: "#fff",
          px: "36px",
          py: "28px",
        }}
      >
        <NetworkBackdrop opacity={0.28} variant="a" />
        <FloatingTiles color={t.c} />
        <Stack
          direction="row"
          spacing={2.5}
          sx={{ alignItems: "center", position: "relative" }}
        >
          <ProfileAvatar
            r={r}
            t={t}
            size={86}
            tone="light"
            border="3px solid rgba(255,255,255,.75)"
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontSize: 30, fontWeight: 800, lineHeight: 1.1 }}>
              {r.name}
            </Typography>
            {r.role && (
              <Typography
                sx={{
                  fontSize: 13,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  opacity: 0.92,
                  mt: 0.6,
                }}
              >
                {r.role}
              </Typography>
            )}
          </Box>
        </Stack>
        <Box sx={{ position: "relative", mt: 2 }}>
          <ContactList items={r.contact} color="#fff" size={10.5} />
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "grid",
          gap: "28px",
          px: "36px",
          py: "26px",
          gridTemplateColumns: "minmax(0,1.75fr) minmax(0,1fr)",
        }}
      >
        <Box>
          <Block title="Profile" t={t} show={!!about}>
            <P>{about}</P>
          </Block>
          <Block title="Experience" t={t} show={r.experience.length > 0}>
            <ExpList items={r.experience} t={t} />
          </Block>
          <Block title="Projects" t={t} show={r.projects.length > 0}>
            <ProjectList items={r.projects} t={t} />
          </Block>
          <Block title="Achievements" t={t} show={r.achievements.length > 0}>
            <AchList items={r.achievements} />
          </Block>
        </Box>
        <Box>
          <Block title="Skills" t={t} show={r.skills.length > 0}>
            <Skills skills={r.skills} t={t} variant="chip" />
          </Block>
          <Block title="Education" t={t} show={r.education.length > 0}>
            <EduList items={r.education} t={t} />
          </Block>
          <Block title="Certifications" t={t} show={r.certs.length > 0}>
            <CertList items={r.certs} t={t} />
          </Block>
          <Block title="Languages" t={t} show={r.languages.length > 0}>
            <LangList items={r.languages} t={t} />
          </Block>
        </Box>
      </Box>
    </>
  );
});
