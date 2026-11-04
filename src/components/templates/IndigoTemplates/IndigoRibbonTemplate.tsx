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
  ProfileAvatar,
} from "../NewTemplate/Themeatoms";

const IndigoRibbonTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#4f46e5");

    return (
      <Sheet ref={ref}>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: 16,
            background: `linear-gradient(180deg, ${t.c}, #818cf8)`,
          }}
        />

        <Box sx={{ pl: "52px", pr: "38px", pt: "38px", pb: "30px" }}>
          <Stack
            direction="row"
            spacing={2.5}
            sx={{ alignItems: "center", mb: 2 }}
          >
            <ProfileAvatar r={r} t={t} size={88} shape="rounded" />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 32,
                  fontWeight: 800,
                  color: t.ink,
                  lineHeight: 1.1,
                  letterSpacing: -0.5,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, color: t.c, mt: 0.6 }}
                >
                  {r.role}
                </Typography>
              )}
              <Box
                sx={{
                  mt: 1.2,
                  height: 3,
                  width: 48,
                  bgcolor: t.c,
                  borderRadius: 2,
                }}
              />
            </Box>
          </Stack>

          <Box
            sx={{
              bgcolor: t.soft,
              borderRadius: "10px",
              p: "10px 14px",
              mb: 2.6,
            }}
          >
            <ContactList items={r.contact} iconColor={t.c} size={10.5} />
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 224px",
              gap: "0 28px",
              alignItems: "start",
            }}
          >
            <Box>
              <SecSummary r={r} t={t} h="bar" />
              <SecExp r={r} t={t} h="bar" timeline />
              <SecProj r={r} t={t} h="bar" />
            </Box>
            <Box sx={{ borderLeft: `1px dashed ${t.mid}`, pl: "20px" }}>
              <SecSkills r={r} t={t} h="bar" variant="chip" />
              <SecEdu r={r} t={t} h="bar" />
              <SecLang r={r} t={t} h="bar" variant="lines" />
              <SecCert r={r} t={t} h="bar" />
              <SecAch r={r} t={t} h="bar" />
            </Box>
          </Box>
        </Box>
      </Sheet>
    );
  },
);

IndigoRibbonTemplate.displayName = "IndigoRibbonTemplate";
export default IndigoRibbonTemplate;
