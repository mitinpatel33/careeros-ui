import { Box, Stack, Typography } from "@mui/material";
import { createTemplate } from "./createTemplate";
import {
  AchList,
  CertList,
  ContactList,
  EduList,
  ExpList,
  FloatingTiles,
  Frame,
  LangList,
  NetworkBackdrop,
  P,
  ProfileAvatar,
  ProjectList,
  Skills,
} from "./Themeatoms";

/** 7 · Orange — cut-in label frames, offset-shadow name box */
export default createTemplate("SunsetBoxesTemplate", "#f06a1a", (r, t) => {
  const about = r.summary || r.objective;
  return (
    <>
      <Box
        sx={{
          position: "relative",
          px: "34px",
          pt: "30px",
          pb: "10px",
          overflow: "hidden",
        }}
      >
        <NetworkBackdrop
          color={t.c}
          opacity={0.2}
          variant="c"
          sx={{ left: "40%", bottom: "20%" }}
        />
        <FloatingTiles
          color={t.c}
          bg="#fff"
          size={32}
          tiles={[
            { icon: 0, top: 22, right: 38, rotate: -7 },
            { icon: 2, top: 70, right: 100, rotate: 6 },
          ]}
        />
        <Stack
          direction="row"
          spacing={2.5}
          sx={{ alignItems: "center", position: "relative" }}
        >
          <ProfileAvatar
            r={r}
            t={t}
            size={92}
            shape="square"
            border={`3px solid ${t.c}`}
          />
          <Box
            sx={{
              border: `2.5px solid ${t.c}`,
              boxShadow: `5px 5px 0 ${t.c}`,
              bgcolor: "#fff",
              px: 2,
              py: 1.2,
              minWidth: 0,
            }}
          >
            <Typography sx={{ fontSize: 28, fontWeight: 800, lineHeight: 1.1 }}>
              {r.name}
            </Typography>
            {r.role && (
              <Typography
                sx={{
                  fontSize: 12,
                  letterSpacing: 1.8,
                  textTransform: "uppercase",
                  color: t.c,
                  fontWeight: 700,
                  mt: 0.4,
                }}
              >
                {r.role}
              </Typography>
            )}
          </Box>
        </Stack>
        <Box
          sx={{
            position: "relative",
            mt: 2.2,
            pt: 1.2,
            borderTop: `2px dashed ${t.mid}`,
          }}
        >
          <ContactList items={r.contact} iconColor={t.c} size={10.5} />
        </Box>
      </Box>

      <Box sx={{ flex: 1, px: "34px", pt: "14px", pb: "26px" }}>
        <Frame title="Profile" t={t} show={!!about}>
          <P>{about}</P>
        </Frame>
        <Box
          sx={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)",
            alignItems: "start",
          }}
        >
          <Box>
            <Frame title="Experience" t={t} show={r.experience.length > 0}>
              <ExpList items={r.experience} t={t} dates="text" />
            </Frame>
            <Frame title="Projects" t={t} show={r.projects.length > 0}>
              <ProjectList items={r.projects} t={t} />
            </Frame>
            <Frame title="Achievements" t={t} show={r.achievements.length > 0}>
              <AchList items={r.achievements} />
            </Frame>
          </Box>
          <Box>
            <Frame title="Skills" t={t} show={r.skills.length > 0}>
              <Skills skills={r.skills} t={t} variant="outline" />
            </Frame>
            <Frame title="Education" t={t} show={r.education.length > 0}>
              <EduList items={r.education} t={t} />
            </Frame>
            <Frame title="Certifications" t={t} show={r.certs.length > 0}>
              <CertList items={r.certs} t={t} />
            </Frame>
            <Frame title="Languages" t={t} show={r.languages.length > 0}>
              <LangList items={r.languages} t={t} />
            </Frame>
          </Box>
        </Box>
      </Box>
    </>
  );
});
