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
import { ContactList, makeTheme } from "../NewTemplate/Themeatoms";

const SteelCompactTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#475569");

    return (
      <Sheet ref={ref}>
        <Box sx={{ p: "34px 44px 28px" }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 3,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 30,
                  fontWeight: 800,
                  color: "#0f172a",
                  lineHeight: 1.05,
                  letterSpacing: -0.5,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography
                  sx={{ fontSize: 13, fontWeight: 600, color: t.c, mt: 0.6 }}
                >
                  {r.role}
                </Typography>
              )}
            </Box>
            <ContactList
              items={r.contact}
              dir="column"
              justify="flex-end"
              showIcons={false}
              size={10}
              color="#475569"
            />
          </Stack>
          <Box sx={{ height: 3, bgcolor: "#0f172a", mt: 1.6, mb: 0.4 }} />
          <Box sx={{ height: 1, bgcolor: "#94a3b8", mb: 2 }} />

          <SecSummary r={r} t={t} h="rule" size={11} mb={1.6} />
          <SecSkills r={r} t={t} h="rule" variant="text" sep="|" mb={1.6} />
          <SecExp r={r} t={t} h="rule" dates="text" mb={1.6} />
          <SecProj r={r} t={t} h="rule" mb={1.6} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr 1fr",
              gap: "0 24px",
            }}
          >
            <SecEdu r={r} t={t} h="rule" />
            <Box>
              <SecCert r={r} t={t} h="rule" />
              <SecLang r={r} t={t} h="rule" variant="lines" />
            </Box>
            <SecAch r={r} t={t} h="rule" />
          </Box>
        </Box>
      </Sheet>
    );
  },
);

SteelCompactTemplate.displayName = "SteelCompactTemplate";
export default SteelCompactTemplate;
