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

const SkyTripleTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#0284c7");

    return (
      <Sheet ref={ref}>
        <Box
          sx={{ position: "relative", bgcolor: "#e0f2fe", p: "36px 42px 26px" }}
        >
          <NetworkBackdrop variant="a" color={t.c} opacity={0.22} />
          <Stack
            direction="row"
            sx={{
              position: "relative",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 33,
                  fontWeight: 800,
                  color: "#0c4a6e",
                  lineHeight: 1.05,
                  letterSpacing: -0.6,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography
                  sx={{ fontSize: 13.5, fontWeight: 600, color: t.c, mt: 0.7 }}
                >
                  {r.role}
                </Typography>
              )}
              <Box sx={{ mt: 1.6 }}>
                <ContactList items={r.contact} iconColor={t.c} size={10.5} />
              </Box>
            </Box>
            <ProfileAvatar
              r={r}
              t={t}
              size={90}
              shape="rounded"
              border="4px solid #fff"
            />
          </Stack>
        </Box>

        <Box sx={{ p: "24px 42px 28px" }}>
          <SecSummary r={r} t={t} h="short" />
          <SecExp r={r} t={t} h="short" timeline dates="text" />

          <Box
            sx={{
              borderTop: `2px solid ${t.mid}`,
              pt: 2.2,
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "0 26px",
              alignItems: "start",
            }}
          >
            <Box>
              <SecEdu r={r} t={t} h="short" />
              <SecCert r={r} t={t} h="short" />
            </Box>
            <Box>
              <SecSkills r={r} t={t} h="short" variant="chip" />
              <SecLang r={r} t={t} h="short" variant="lines" />
            </Box>
            <Box>
              <SecProj r={r} t={t} h="short" />
              <SecAch r={r} t={t} h="short" />
            </Box>
          </Box>
        </Box>
      </Sheet>
    );
  },
);

SkyTripleTemplate.displayName = "SkyTripleTemplate";
export default SkyTripleTemplate;
