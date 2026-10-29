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

/** 10 · Gold — big photo/initials block, numbered headings */
export default createTemplate("GoldBlockTemplate", "#c98a00", (r, t) => {
  const about = r.summary || r.objective;

  // numbered headings, only counting sections that are actually shown
  let count = 0;
  const sec = (show: boolean) =>
    show ? String(++count).padStart(2, "0") : undefined;
  const nAbout = sec(!!about);
  const nExp = sec(r.experience.length > 0);
  const nProj = sec(r.projects.length > 0);
  const nSkill = sec(r.skills.length > 0);
  const nEdu = sec(r.education.length > 0);
  const nCert = sec(
    r.certs.length > 0 || r.languages.length > 0 || r.achievements.length > 0,
  );

  return (
    <>
      <Box sx={{ display: "flex", borderBottom: `6px solid ${t.c}` }}>
        <Box
          sx={{
            position: "relative",
            width: 186,
            flexShrink: 0,
            bgcolor: t.c,
            display: "grid",
            placeItems: "center",
            p: "24px",
            overflow: "hidden",
          }}
        >
          <NetworkBackdrop opacity={0.3} variant="c" />
          <Box sx={{ position: "relative" }}>
            <ProfileAvatar
              r={r}
              t={t}
              size={138}
              shape="square"
              tone="light"
              border="4px solid #fff"
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "relative",
            flex: 1,
            minWidth: 0,
            p: "28px 32px",
            bgcolor: t.soft,
          }}
        >
          <FloatingTiles
            color={t.c}
            bg="#fff"
            size={30}
            tiles={[
              { icon: 0, top: 18, right: 26, rotate: 6 },
              { icon: 2, top: 18, right: 70, rotate: -6 },
            ]}
          />
          <Typography
            sx={{
              fontSize: 34,
              fontWeight: 800,
              lineHeight: 1.08,
              textTransform: "uppercase",
            }}
          >
            {r.name}
          </Typography>
          {r.role && (
            <Typography
              sx={{
                fontSize: 13,
                letterSpacing: 2.4,
                textTransform: "uppercase",
                color: t.c,
                fontWeight: 700,
                mt: 0.6,
                mb: 1.6,
              }}
            >
              {r.role}
            </Typography>
          )}
          <ContactList items={r.contact} iconColor={t.c} size={10.5} />
        </Box>
      </Box>

      <Box sx={{ flex: 1, px: "36px", pt: "24px", pb: "26px" }}>
        <Block title="Profile" t={t} variant="num" n={nAbout} show={!!about}>
          <P>{about}</P>
        </Block>
        <Block
          title="Experience"
          t={t}
          variant="num"
          n={nExp}
          show={r.experience.length > 0}
        >
          <ExpList items={r.experience} t={t} dates="text" />
        </Block>
        <Block
          title="Projects"
          t={t}
          variant="num"
          n={nProj}
          show={r.projects.length > 0}
        >
          <ProjectList items={r.projects} t={t} />
        </Block>

        <Box
          sx={{
            display: "grid",
            gap: "24px",
            gridTemplateColumns: "repeat(3, minmax(0,1fr))",
            alignItems: "start",
          }}
        >
          <Block
            title="Skills"
            t={t}
            variant="num"
            n={nSkill}
            show={r.skills.length > 0}
          >
            <Skills skills={r.skills} t={t} variant="outline" />
          </Block>
          <Block
            title="Education"
            t={t}
            variant="num"
            n={nEdu}
            show={r.education.length > 0}
          >
            <EduList items={r.education} t={t} />
          </Block>
          <Box>
            <Block
              title="More"
              t={t}
              variant="num"
              n={nCert}
              show={
                r.certs.length > 0 ||
                r.languages.length > 0 ||
                r.achievements.length > 0
              }
            >
              <CertList items={r.certs} t={t} />
              <AchList items={r.achievements} />
              {r.languages.length > 0 && <LangList items={r.languages} t={t} />}
            </Block>
          </Box>
        </Box>
      </Box>
    </>
  );
});
