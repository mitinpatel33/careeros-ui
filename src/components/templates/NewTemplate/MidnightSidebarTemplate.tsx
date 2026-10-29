import { Box, Typography } from "@mui/material";
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

/** 2 · Black — dark sidebar with skill bars */
export default createTemplate("MidnightSidebarTemplate", "#1f2328", (r, t) => {
  const about = r.summary || r.objective;
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Box
        sx={{
          position: "relative",
          width: 250,
          flexShrink: 0,
          bgcolor: t.c,
          color: "#fff",
          p: "30px 22px",
          overflow: "hidden",
        }}
      >
        <NetworkBackdrop
          opacity={0.22}
          variant="b"
          sx={{ top: "auto", height: 280 }}
        />
        <Box sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <ProfileAvatar
              r={r}
              t={t}
              size={104}
              tone="light"
              border="3px solid rgba(255,255,255,.35)"
            />
          </Box>
          <Block
            title="Contact"
            t={t}
            variant="light"
            show={r.contact.length > 0}
          >
            <ContactList
              items={r.contact}
              dir="column"
              color="#e5e7eb"
              size={10}
            />
          </Block>
          <Block
            title="Skills"
            t={t}
            variant="light"
            show={r.skills.length > 0}
          >
            <Skills skills={r.skills} t={t} variant="bars" textColor="#fff" />
          </Block>
          <Block
            title="Languages"
            t={t}
            variant="light"
            show={r.languages.length > 0}
          >
            <Box sx={{ color: "#e5e7eb" }}>
              <LangList items={r.languages} t={t} variant="lines" />
            </Box>
          </Block>
        </Box>
      </Box>

      <Box sx={{ position: "relative", flex: 1, minWidth: 0, p: "34px 32px" }}>
        <FloatingTiles
          color={t.c}
          bg="#f1f3f5"
          size={30}
          tiles={[
            { icon: 1, top: 26, right: 28, rotate: 6 },
            { icon: 0, top: 24, right: 72, rotate: -6 },
          ]}
        />
        <Typography sx={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1 }}>
          {r.name}
        </Typography>
        {r.role && (
          <Typography
            sx={{
              fontSize: 12.5,
              letterSpacing: 2.5,
              textTransform: "uppercase",
              color: t.muted,
              mt: 0.6,
            }}
          >
            {r.role}
          </Typography>
        )}
        <Box sx={{ width: 46, height: 4, bgcolor: t.c, my: 2.2 }} />

        <Block title="Profile" t={t} variant="bar" show={!!about}>
          <P>{about}</P>
        </Block>
        <Block
          title="Experience"
          t={t}
          variant="bar"
          show={r.experience.length > 0}
        >
          <ExpList items={r.experience} t={t} dates="text" />
        </Block>
        <Block
          title="Education"
          t={t}
          variant="bar"
          show={r.education.length > 0}
        >
          <EduList items={r.education} t={t} />
        </Block>
        <Block
          title="Projects"
          t={t}
          variant="bar"
          show={r.projects.length > 0}
        >
          <ProjectList items={r.projects} t={t} />
        </Block>
        <Block
          title="Certifications"
          t={t}
          variant="bar"
          show={r.certs.length > 0}
        >
          <CertList items={r.certs} t={t} />
        </Block>
        <Block
          title="Achievements"
          t={t}
          variant="bar"
          show={r.achievements.length > 0}
        >
          <AchList items={r.achievements} />
        </Block>
      </Box>
    </Box>
  );
});
