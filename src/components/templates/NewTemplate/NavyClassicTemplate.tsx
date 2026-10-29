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

/** 9 · Navy — classic serif, double-rule header, single column */
export default createTemplate(
  "NavyClassicTemplate",
  "#1e3a8a",
  (r, t) => {
    const about = r.summary || r.objective;
    return (
      <>
        <Box
          sx={{
            position: "relative",
            mx: "40px",
            mt: "30px",
            py: 2.4,
            textAlign: "center",
            borderTop: `4px double ${t.c}`,
            borderBottom: `4px double ${t.c}`,
          }}
        >
          <NetworkBackdrop color={t.c} opacity={0.1} variant="a" />
          <FloatingTiles
            color={t.c}
            bg={t.soft}
            size={28}
            tiles={[
              { icon: 0, top: 12, left: 14, rotate: -6 },
              { icon: 2, top: 12, left: 54, rotate: 5 },
              { icon: 1, top: 12, right: 14, rotate: 6 },
              { icon: 3, top: 12, right: 54, rotate: -5 },
            ]}
          />
          <Box sx={{ position: "relative" }}>
            <Typography
              sx={{
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: 4,
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
                  fontSize: 13.5,
                  fontStyle: "italic",
                  color: t.muted,
                  mt: 0.5,
                }}
              >
                {r.role}
              </Typography>
            )}
            <Box sx={{ mt: 1.4 }}>
              <ContactList
                items={r.contact}
                color="#444"
                iconColor={t.c}
                size={10.5}
                justify="center"
              />
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex: 1, px: "40px", pt: "22px", pb: "28px" }}>
          <Block
            title="Professional Summary"
            t={t}
            variant="serif"
            show={!!about}
          >
            <P>{about}</P>
          </Block>
          <Block
            title="Experience"
            t={t}
            variant="serif"
            show={r.experience.length > 0}
          >
            <ExpList items={r.experience} t={t} dates="text" />
          </Block>
          <Block
            title="Education"
            t={t}
            variant="serif"
            show={r.education.length > 0}
          >
            <EduList items={r.education} t={t} />
          </Block>
          <Block
            title="Skills"
            t={t}
            variant="serif"
            show={r.skills.length > 0}
          >
            <Skills skills={r.skills} t={t} variant="text" sep="|" />
          </Block>
          <Block
            title="Projects"
            t={t}
            variant="serif"
            show={r.projects.length > 0}
          >
            <ProjectList items={r.projects} t={t} />
          </Block>
          <Block
            title="Certifications"
            t={t}
            variant="serif"
            show={r.certs.length > 0}
          >
            <CertList items={r.certs} t={t} />
          </Block>
          <Block
            title="Achievements"
            t={t}
            variant="serif"
            show={r.achievements.length > 0}
          >
            <AchList items={r.achievements} />
          </Block>
          <Block
            title="Languages"
            t={t}
            variant="serif"
            show={r.languages.length > 0}
          >
            <LangList items={r.languages} t={t} />
          </Block>
        </Box>
      </>
    );
  },
  { font: "Georgia,'Times New Roman',serif" },
);
