import { forwardRef } from "react";
import { Box, Typography } from "@mui/material";
import {
  Sheet,
  SecAch,
  SecCert,
  SecEdu,
  SecExp,
  SecLang,
  SecProj,
  SecSkills,
  SecSummary,
  type TplProps,
} from "./sheet";
import { normalizeResume } from "../NewTemplate/resume";
import {
  ContactList,
  makeTheme,
  NetworkBackdrop,
  ProfileAvatar,
} from "../NewTemplate/Themeatoms";

const CoralWaveTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#f2634f");

    return (
      <Sheet ref={ref}>
        <Box
          sx={{
            position: "relative",
            bgcolor: t.c,
            height: 186,
            color: "#fff",
          }}
        >
          <NetworkBackdrop variant="b" opacity={0.2} />
          <Box sx={{ position: "relative", textAlign: "center", pt: "34px" }}>
            <Typography
              sx={{
                fontSize: 33,
                fontWeight: 800,
                letterSpacing: -0.4,
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
                  mt: 0.9,
                  opacity: 0.92,
                }}
              >
                {r.role}
              </Typography>
            )}
          </Box>
          <svg
            viewBox="0 0 794 60"
            preserveAspectRatio="none"
            width="100%"
            height="54"
            style={{ position: "absolute", bottom: -1, left: 0 }}
          >
            <path
              d="M0 34 C 130 74, 270 -8, 420 30 S 690 62, 794 18 L794 60 L0 60 Z"
              fill="#fff"
            />
          </svg>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              bottom: -36,
              transform: "translateX(-50%)",
              zIndex: 2,
            }}
          >
            <ProfileAvatar r={r} t={t} size={80} border="4px solid #fff" />
          </Box>
        </Box>

        <Box sx={{ pt: "52px", px: "40px", pb: "28px" }}>
          <Box sx={{ mb: 2.6 }}>
            <ContactList
              items={r.contact}
              iconColor={t.c}
              size={10.5}
              justify="center"
            />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 36px",
              alignItems: "start",
            }}
          >
            <Box sx={{ borderRight: `1px dotted ${t.mid}`, pr: "18px" }}>
              <SecSummary r={r} t={t} h="short" />
              <SecExp r={r} t={t} h="short" dates="text" />
            </Box>
            <Box>
              <SecEdu r={r} t={t} h="short" />
              <SecSkills r={r} t={t} h="short" variant="pill" />
              <Box sx={{ mt: 2.2 }}>
                <SecProj r={r} t={t} h="short" />
                <SecLang r={r} t={t} h="short" variant="pills" />
                <SecCert r={r} t={t} h="short" />
                <SecAch r={r} t={t} h="short" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Sheet>
    );
  },
);

CoralWaveTemplate.displayName = "CoralWaveTemplate";
export default CoralWaveTemplate;
