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

/** 8 · Teal — soft left column, pill skills, dot headings */
export default createTemplate("TealPillsTemplate", "#0d9488", (r, t) => {
  const about = r.summary || r.objective;
  return (
    <Box sx={{ display: "flex", flex: 1 }}>
      <Box
        sx={{
          position: "relative",
          width: 262,
          flexShrink: 0,
          bgcolor: t.soft,
          p: "32px 22px",
          overflow: "hidden",
        }}
      >
        <NetworkBackdrop
          color={t.c}
          opacity={0.22}
          variant="a"
          sx={{ top: "auto", height: 260 }}
        />
        <Box sx={{ position: "relative" }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <ProfileAvatar r={r} t={t} size={108} border={`4px solid #fff`} />
          </Box>
          <Block
            title="Contact"
            t={t}
            variant="dot"
            show={r.contact.length > 0}
          >
            <ContactList
              items={r.contact}
              dir="column"
              iconColor={t.c}
              size={10}
            />
          </Block>
          <Block title="Skills" t={t} variant="dot" show={r.skills.length > 0}>
            <Skills skills={r.skills} t={t} variant="pill" />
          </Block>
          <Block
            title="Languages"
            t={t}
            variant="dot"
            show={r.languages.length > 0}
          >
            <LangList items={r.languages} t={t} variant="pills" />
          </Block>
        </Box>
      </Box>

      <Box sx={{ position: "relative", flex: 1, minWidth: 0, p: "34px 32px" }}>
        <FloatingTiles
          color={t.c}
          bg={t.soft}
          size={30}
          tiles={[
            { icon: 3, top: 26, right: 28, rotate: 6 },
            { icon: 2, top: 28, right: 72, rotate: -6 },
          ]}
        />
        <Typography
          sx={{ fontSize: 32, fontWeight: 800, lineHeight: 1.1, color: t.c }}
        >
          {r.name}
        </Typography>
        {r.role && (
          <Typography
            sx={{
              fontSize: 12.5,
              letterSpacing: 2.2,
              textTransform: "uppercase",
              color: t.muted,
              mt: 0.6,
              mb: 2.4,
            }}
          >
            {r.role}
          </Typography>
        )}
        <Block title="Profile" t={t} variant="dot" show={!!about}>
          <P>{about}</P>
        </Block>
        <Block
          title="Experience"
          t={t}
          variant="dot"
          show={r.experience.length > 0}
        >
          <ExpList items={r.experience} t={t} />
        </Block>
        <Block
          title="Education"
          t={t}
          variant="dot"
          show={r.education.length > 0}
        >
          <EduList items={r.education} t={t} />
        </Block>
        <Block
          title="Projects"
          t={t}
          variant="dot"
          show={r.projects.length > 0}
        >
          <ProjectList items={r.projects} t={t} />
        </Block>
        <Block
          title="Certifications"
          t={t}
          variant="dot"
          show={r.certs.length > 0}
        >
          <CertList items={r.certs} t={t} />
        </Block>
        <Block
          title="Achievements"
          t={t}
          variant="dot"
          show={r.achievements.length > 0}
        >
          <AchList items={r.achievements} />
        </Block>
      </Box>
    </Box>
  );
});
