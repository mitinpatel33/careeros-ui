import { Box, Stack, Typography } from "@mui/material";
import { createTemplate } from "./createTemplate";
import {
  AchList,
  CertList,
  ContactList,
  EduList,
  ExpList,
  FloatingTiles,
  LangList,
  NetworkBackdrop,
  P,
  Panel,
  ProfileAvatar,
  ProjectList,
  Skills,
} from "./Themeatoms";

/** 3 · Purple — tinted page, white rounded cards, pill headings */
export default createTemplate(
  "VioletCardsTemplate",
  "#7c3aed",
  (r, t) => {
    const about = r.summary || r.objective;
    return (
      <>
        <Box
          sx={{
            position: "relative",
            m: "24px 24px 0",
            borderRadius: "18px",
            bgcolor: t.c,
            color: "#fff",
            p: "26px 28px",
            overflow: "hidden",
          }}
        >
          <NetworkBackdrop opacity={0.26} variant="c" />
          <FloatingTiles
            color={t.c}
            tiles={[
              { icon: 2, top: 18, right: 26, rotate: 7 },
              { icon: 0, top: 62, right: 84, rotate: -7 },
              { icon: 1, top: 20, right: 142, rotate: 4 },
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
              size={82}
              shape="rounded"
              tone="light"
              border="3px solid rgba(255,255,255,.7)"
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{ fontSize: 29, fontWeight: 800, lineHeight: 1.1 }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography sx={{ fontSize: 13, opacity: 0.92, mt: 0.5 }}>
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
            gap: "18px",
            p: "18px 24px 24px",
            gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)",
            alignContent: "start",
          }}
        >
          <Box>
            <Panel title="About" t={t} show={!!about}>
              <P>{about}</P>
            </Panel>
            <Panel title="Experience" t={t} show={r.experience.length > 0}>
              <ExpList items={r.experience} t={t} />
            </Panel>
            <Panel title="Projects" t={t} show={r.projects.length > 0}>
              <ProjectList items={r.projects} t={t} />
            </Panel>
            <Panel title="Achievements" t={t} show={r.achievements.length > 0}>
              <AchList items={r.achievements} />
            </Panel>
          </Box>
          <Box>
            <Panel title="Skills" t={t} show={r.skills.length > 0}>
              <Skills skills={r.skills} t={t} variant="pill" />
            </Panel>
            <Panel title="Education" t={t} show={r.education.length > 0}>
              <EduList items={r.education} t={t} />
            </Panel>
            <Panel title="Certifications" t={t} show={r.certs.length > 0}>
              <CertList items={r.certs} t={t} />
            </Panel>
            <Panel title="Languages" t={t} show={r.languages.length > 0}>
              <LangList items={r.languages} t={t} variant="pills" />
            </Panel>
          </Box>
        </Box>
      </>
    );
  },
  { bg: "#f6f2ff" },
);
