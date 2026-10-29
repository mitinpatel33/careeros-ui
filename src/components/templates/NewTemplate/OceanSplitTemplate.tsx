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

/** 6 · Blue — diagonal header, tinted right column */
export default createTemplate("OceanSplitTemplate", "#2563eb", (r, t) => {
  const about = r.summary || r.objective;
  return (
    <>
      <Box
        sx={{
          background: `linear-gradient(to right, #fff 62%, ${t.soft} 62%)`,
        }}
      >
        <Box
          sx={{
            position: "relative",
            bgcolor: t.c,
            color: "#fff",
            px: "36px",
            pt: "28px",
            pb: "64px",
            clipPath: "polygon(0 0, 100% 0, 100% 80%, 0 100%)",
          }}
        >
          <NetworkBackdrop opacity={0.26} variant="b" />
          <FloatingTiles
            color={t.c}
            tiles={[
              { icon: 1, top: 24, right: 34, rotate: 7 },
              { icon: 2, top: 66, right: 98, rotate: -5 },
              { icon: 0, top: 22, right: 150, rotate: 4 },
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
              size={84}
              tone="light"
              border="3px solid rgba(255,255,255,.75)"
            />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{ fontSize: 31, fontWeight: 800, lineHeight: 1.1 }}
              >
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
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "62% 38%",
          mt: "-20px",
        }}
      >
        <Box sx={{ p: "30px 28px 26px 36px", minWidth: 0 }}>
          <Block title="Profile" t={t} variant="short" show={!!about}>
            <P>{about}</P>
          </Block>
          <Block
            title="Experience"
            t={t}
            variant="short"
            show={r.experience.length > 0}
          >
            <ExpList items={r.experience} t={t} />
          </Block>
          <Block
            title="Projects"
            t={t}
            variant="short"
            show={r.projects.length > 0}
          >
            <ProjectList items={r.projects} t={t} />
          </Block>
          <Block
            title="Achievements"
            t={t}
            variant="short"
            show={r.achievements.length > 0}
          >
            <AchList items={r.achievements} />
          </Block>
        </Box>
        <Box sx={{ bgcolor: t.soft, p: "30px 30px 26px 24px", minWidth: 0 }}>
          <Block
            title="Contact"
            t={t}
            variant="short"
            show={r.contact.length > 0}
          >
            <ContactList
              items={r.contact}
              dir="column"
              iconColor={t.c}
              size={10.5}
            />
          </Block>
          <Block
            title="Skills"
            t={t}
            variant="short"
            show={r.skills.length > 0}
          >
            <Skills skills={r.skills} t={t} variant="outline" />
          </Block>
          <Block
            title="Education"
            t={t}
            variant="short"
            show={r.education.length > 0}
          >
            <EduList items={r.education} t={t} />
          </Block>
          <Block
            title="Certifications"
            t={t}
            variant="short"
            show={r.certs.length > 0}
          >
            <CertList items={r.certs} t={t} />
          </Block>
          <Block
            title="Languages"
            t={t}
            variant="short"
            show={r.languages.length > 0}
          >
            <LangList items={r.languages} t={t} />
          </Block>
        </Box>
      </Box>
    </>
  );
});
