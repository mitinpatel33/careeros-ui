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
  ProjectList,
  Skills,
} from "./Themeatoms";

/** 12 · Brown — left colour bar, muted small-caps headings, minimal */
export default createTemplate("CocoaMinimalTemplate", "#7c4a2d", (r, t) => {
  const about = r.summary || r.objective;
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 12,
          bgcolor: t.c,
        }}
      />
      <NetworkBackdrop
        color={t.c}
        opacity={0.1}
        variant="c"
        sx={{ top: "auto", left: "40%", height: 300 }}
      />

      <Box
        sx={{
          position: "relative",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          p: "40px 38px 28px 52px",
        }}
      >
        <FloatingTiles
          color={t.c}
          bg={t.soft}
          size={30}
          tiles={[
            { icon: 0, top: 34, right: 38, rotate: 6 },
            { icon: 2, top: 36, right: 82, rotate: -6 },
          ]}
        />
        <Typography
          sx={{
            fontSize: 34,
            fontWeight: 300,
            letterSpacing: 1,
            lineHeight: 1.1,
          }}
        >
          {r.name}
        </Typography>
        {r.role && (
          <Typography
            sx={{
              fontSize: 12.5,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: t.c,
              mt: 0.8,
            }}
          >
            {r.role}
          </Typography>
        )}
        <Box sx={{ mt: 1.8, mb: 3, color: t.muted }}>
          <ContactList
            items={r.contact}
            iconColor={t.c}
            color={t.muted}
            size={10.5}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "grid",
            gap: "30px",
            gridTemplateColumns: "minmax(0,1.8fr) minmax(0,1fr)",
          }}
        >
          <Box>
            <Block title="Profile" t={t} variant="muted" show={!!about}>
              <P>{about}</P>
            </Block>
            <Block
              title="Experience"
              t={t}
              variant="muted"
              show={r.experience.length > 0}
            >
              <ExpList items={r.experience} t={t} dates="text" />
            </Block>
            <Block
              title="Projects"
              t={t}
              variant="muted"
              show={r.projects.length > 0}
            >
              <ProjectList items={r.projects} t={t} />
            </Block>
            <Block
              title="Achievements"
              t={t}
              variant="muted"
              show={r.achievements.length > 0}
            >
              <AchList items={r.achievements} />
            </Block>
          </Box>
          <Box sx={{ borderLeft: `1px solid ${t.mid}`, pl: "22px" }}>
            <Block
              title="Skills"
              t={t}
              variant="muted"
              show={r.skills.length > 0}
            >
              <Skills skills={r.skills} t={t} variant="text" sep="·" />
            </Block>
            <Block
              title="Education"
              t={t}
              variant="muted"
              show={r.education.length > 0}
            >
              <EduList items={r.education} t={t} />
            </Block>
            <Block
              title="Certifications"
              t={t}
              variant="muted"
              show={r.certs.length > 0}
            >
              <CertList items={r.certs} t={t} />
            </Block>
            <Block
              title="Languages"
              t={t}
              variant="muted"
              show={r.languages.length > 0}
            >
              <LangList items={r.languages} t={t} />
            </Block>
          </Box>
        </Box>
      </Box>
    </>
  );
});
