import { Box, Stack, Typography } from "@mui/material";
import { createTemplate } from "./createTemplate";
import {
  AchList,
  CertList,
  ContactList,
  EduList,
  ExpList,
  FloatingTiles,
  LabelRow,
  LangList,
  NetworkBackdrop,
  P,
  ProfileAvatar,
  ProjectList,
  Skills,
} from "./Themeatoms";

/** 11 · Maroon — letter-spaced name, label | content rows */
export default createTemplate("MaroonLabelsTemplate", "#9b1c31", (r, t) => {
  const about = r.summary || r.objective;
  return (
    <Box sx={{ flex: 1, px: "40px", py: "34px" }}>
      <Box
        sx={{
          position: "relative",
          pb: 2.2,
          borderBottom: `3px solid ${t.c}`,
          overflow: "hidden",
        }}
      >
        <NetworkBackdrop
          color={t.c}
          opacity={0.14}
          variant="b"
          sx={{ left: "50%" }}
        />
        <FloatingTiles
          color={t.c}
          bg={t.soft}
          size={30}
          tiles={[
            { icon: 1, top: 4, right: 120, rotate: -6 },
            { icon: 0, top: 54, right: 150, rotate: 6 },
          ]}
        />
        <Stack
          direction="row"
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: t.c,
                lineHeight: 1.15,
              }}
            >
              {r.name}
            </Typography>
            {r.role && (
              <Typography
                sx={{
                  fontSize: 12.5,
                  letterSpacing: 2.4,
                  textTransform: "uppercase",
                  color: t.muted,
                  mt: 0.6,
                }}
              >
                {r.role}
              </Typography>
            )}
          </Box>
          <ProfileAvatar r={r} t={t} size={84} shape="square" />
        </Stack>
        <Box sx={{ position: "relative", mt: 1.8 }}>
          <ContactList items={r.contact} iconColor={t.c} size={10.5} />
        </Box>
      </Box>

      <Box sx={{ mt: 0.5 }}>
        <LabelRow title="Profile" t={t} show={!!about}>
          <P>{about}</P>
        </LabelRow>
        <LabelRow title="Experience" t={t} show={r.experience.length > 0}>
          <ExpList items={r.experience} t={t} dates="text" />
        </LabelRow>
        <LabelRow title="Education" t={t} show={r.education.length > 0}>
          <EduList items={r.education} t={t} />
        </LabelRow>
        <LabelRow title="Skills" t={t} show={r.skills.length > 0}>
          <Skills skills={r.skills} t={t} variant="outline" />
        </LabelRow>
        <LabelRow title="Projects" t={t} show={r.projects.length > 0}>
          <ProjectList items={r.projects} t={t} />
        </LabelRow>
        <LabelRow title="Certificates" t={t} show={r.certs.length > 0}>
          <CertList items={r.certs} t={t} />
        </LabelRow>
        <LabelRow title="Awards" t={t} show={r.achievements.length > 0}>
          <AchList items={r.achievements} />
        </LabelRow>
        <LabelRow title="Languages" t={t} show={r.languages.length > 0}>
          <LangList items={r.languages} t={t} />
        </LabelRow>
      </Box>
    </Box>
  );
});
