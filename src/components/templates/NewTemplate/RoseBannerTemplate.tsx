import { Box, Typography } from "@mui/material";
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

/** 5 · Pink — curved banner, outlined boxes */
export default createTemplate("RoseBannerTemplate", "#e0408c", (r, t) => {
  const about = r.summary || r.objective;
  return (
    <>
      <Box
        sx={{
          position: "relative",
          bgcolor: t.c,
          color: "#fff",
          textAlign: "center",
          px: "36px",
          pt: "28px",
          pb: "40px",
          borderBottomLeftRadius: "50% 38px",
          borderBottomRightRadius: "50% 38px",
        }}
      >
        <NetworkBackdrop opacity={0.26} variant="a" />
        <FloatingTiles
          color={t.c}
          size={32}
          tiles={[
            { icon: 0, top: 24, left: 34, rotate: -8 },
            { icon: 2, top: 70, left: 92, rotate: 6 },
            { icon: 1, top: 24, right: 34, rotate: 8 },
            { icon: 3, top: 70, right: 92, rotate: -6 },
          ]}
        />
        <Box
          sx={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ProfileAvatar
            r={r}
            t={t}
            size={84}
            tone="light"
            border="3px solid rgba(255,255,255,.8)"
          />
          <Typography
            sx={{ fontSize: 30, fontWeight: 800, lineHeight: 1.1, mt: 1.4 }}
          >
            {r.name}
          </Typography>
          {r.role && (
            <Typography
              sx={{
                fontSize: 12.5,
                letterSpacing: 2.2,
                textTransform: "uppercase",
                opacity: 0.92,
                mt: 0.5,
              }}
            >
              {r.role}
            </Typography>
          )}
          <Box sx={{ mt: 1.8 }}>
            <ContactList
              items={r.contact}
              color="#fff"
              size={10.5}
              justify="center"
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ flex: 1, px: "34px", pt: "20px", pb: "26px" }}>
        <Panel
          title="Profile"
          t={t}
          tone="outline"
          heading="plain"
          show={!!about}
        >
          <P>{about}</P>
        </Panel>
        <Box
          sx={{
            display: "grid",
            gap: "16px",
            gridTemplateColumns: "minmax(0,1.6fr) minmax(0,1fr)",
            alignItems: "start",
          }}
        >
          <Box>
            <Panel
              title="Experience"
              t={t}
              tone="outline"
              heading="plain"
              show={r.experience.length > 0}
            >
              <ExpList items={r.experience} t={t} />
            </Panel>
            <Panel
              title="Projects"
              t={t}
              tone="outline"
              heading="plain"
              show={r.projects.length > 0}
            >
              <ProjectList items={r.projects} t={t} />
            </Panel>
            <Panel
              title="Achievements"
              t={t}
              tone="outline"
              heading="plain"
              show={r.achievements.length > 0}
            >
              <AchList items={r.achievements} />
            </Panel>
          </Box>
          <Box>
            <Panel
              title="Skills"
              t={t}
              tone="outline"
              heading="plain"
              show={r.skills.length > 0}
            >
              <Skills skills={r.skills} t={t} variant="chip" />
            </Panel>
            <Panel
              title="Education"
              t={t}
              tone="outline"
              heading="plain"
              show={r.education.length > 0}
            >
              <EduList items={r.education} t={t} />
            </Panel>
            <Panel
              title="Certifications"
              t={t}
              tone="outline"
              heading="plain"
              show={r.certs.length > 0}
            >
              <CertList items={r.certs} t={t} />
            </Panel>
            <Panel
              title="Languages"
              t={t}
              tone="outline"
              heading="plain"
              show={r.languages.length > 0}
            >
              <LangList items={r.languages} t={t} />
            </Panel>
          </Box>
        </Box>
      </Box>
    </>
  );
});
