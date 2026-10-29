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

/** 4 · Green — name header + dotted timeline */
export default createTemplate("EmeraldTimelineTemplate", "#0f9d6b", (r, t) => {
  const about = r.summary || r.objective;
  return (
    <>
      <Box
        sx={{
          position: "relative",
          px: "38px",
          pt: "32px",
          pb: "22px",
          borderBottom: `4px solid ${t.c}`,
          bgcolor: t.soft,
        }}
      >
        <NetworkBackdrop
          color={t.c}
          opacity={0.22}
          variant="b"
          sx={{ left: "45%" }}
        />
        <FloatingTiles
          color={t.c}
          bg="#fff"
          size={32}
          tiles={[
            { icon: 0, top: 20, right: 34, rotate: -6 },
            { icon: 1, top: 66, right: 92, rotate: 6 },
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
            size={88}
            shape="rounded"
            border={`3px solid ${t.c}`}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 31,
                fontWeight: 800,
                lineHeight: 1.1,
                color: t.c,
              }}
            >
              {r.name}
            </Typography>
            {r.role && (
              <Typography
                sx={{
                  fontSize: 13,
                  letterSpacing: 1.8,
                  textTransform: "uppercase",
                  color: t.muted,
                  mt: 0.6,
                }}
              >
                {r.role}
              </Typography>
            )}
          </Box>
        </Stack>
        <Box sx={{ position: "relative", mt: 2 }}>
          <ContactList items={r.contact} iconColor={t.c} size={10.5} />
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "grid",
          gap: "28px",
          px: "38px",
          py: "26px",
          gridTemplateColumns: "minmax(0,1.65fr) minmax(0,1fr)",
        }}
      >
        <Box>
          <Block title="Summary" t={t} variant="rule" show={!!about}>
            <P>{about}</P>
          </Block>
          <Block
            title="Experience"
            t={t}
            variant="rule"
            show={r.experience.length > 0}
          >
            <ExpList items={r.experience} t={t} timeline dates="text" />
          </Block>
          <Block
            title="Projects"
            t={t}
            variant="rule"
            show={r.projects.length > 0}
          >
            <ProjectList items={r.projects} t={t} />
          </Block>
          <Block
            title="Achievements"
            t={t}
            variant="rule"
            show={r.achievements.length > 0}
          >
            <AchList items={r.achievements} />
          </Block>
        </Box>
        <Box>
          <Block title="Skills" t={t} variant="rule" show={r.skills.length > 0}>
            <Skills skills={r.skills} t={t} variant="chip" />
          </Block>
          <Block
            title="Education"
            t={t}
            variant="rule"
            show={r.education.length > 0}
          >
            <EduList items={r.education} t={t} timeline />
          </Block>
          <Block
            title="Certifications"
            t={t}
            variant="rule"
            show={r.certs.length > 0}
          >
            <CertList items={r.certs} t={t} />
          </Block>
          <Block
            title="Languages"
            t={t}
            variant="rule"
            show={r.languages.length > 0}
          >
            <LangList items={r.languages} t={t} />
          </Block>
        </Box>
      </Box>
    </>
  );
});
