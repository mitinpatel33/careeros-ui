import { forwardRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import {
  Sheet,
  SecAch,
  SecCert,
  SecEdu,
  SecExp,
  SecLang,
  SecProj,
  SecSkills,
  type TplProps,
} from "./sheet";
import { normalizeResume } from "../NewTemplate/resume";
import {
  ContactList,
  makeTheme,
  NetworkBackdrop,
  ProfileAvatar,
} from "../NewTemplate/Themeatoms";

const PlumOverlapTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#86198f");
    const text = r.summary || r.objective;

    return (
      <Sheet ref={ref}>
        <Box
          sx={{
            position: "relative",
            color: "#fff",
            height: 186,
            background:
              "linear-gradient(120deg, #581c87 0%, #86198f 55%, #db2777 100%)",
            clipPath: "polygon(0 0, 100% 0, 100% 82%, 0 100%)",
          }}
        >
          <NetworkBackdrop variant="a" opacity={0.18} />
          <Stack
            direction="row"
            sx={{
              position: "relative",
              p: "34px 42px 0",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 34,
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: -0.5,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography
                  sx={{
                    fontSize: 13,
                    mt: 0.8,
                    letterSpacing: 2.4,
                    textTransform: "uppercase",
                    opacity: 0.88,
                  }}
                >
                  {r.role}
                </Typography>
              )}
            </Box>
            <ProfileAvatar
              r={r}
              t={t}
              size={86}
              tone="light"
              border="4px solid rgba(255,255,255,.6)"
            />
          </Stack>
        </Box>

        {text && (
          <Box
            sx={{
              mx: "42px",
              mt: "-34px",
              position: "relative",
              bgcolor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(88,28,135,.16)",
              p: "14px 18px",
              borderLeft: `5px solid ${t.c}`,
            }}
          >
            <Typography
              sx={{ fontSize: 11.5, lineHeight: 1.65, color: "#334155" }}
            >
              {text}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "218px 1fr",
            gap: "0 28px",
            p: "24px 42px 30px",
            alignItems: "start",
          }}
        >
          <Box>
            {r.contact.length > 0 && (
              <Box sx={{ mb: 2.4 }}>
                <ContactList
                  items={r.contact}
                  dir="column"
                  iconColor={t.c}
                  size={10}
                />
              </Box>
            )}
            <SecSkills r={r} t={t} h="pill" variant="chip" />
            <SecLang r={r} t={t} h="pill" variant="lines" />
            <SecCert r={r} t={t} h="pill" />
            <SecAch r={r} t={t} h="pill" />
          </Box>
          <Box>
            <SecExp r={r} t={t} h="rule" timeline />
            <SecEdu r={r} t={t} h="rule" timeline />
            <SecProj r={r} t={t} h="rule" />
          </Box>
        </Box>
      </Sheet>
    );
  },
);

PlumOverlapTemplate.displayName = "PlumOverlapTemplate";
export default PlumOverlapTemplate;
