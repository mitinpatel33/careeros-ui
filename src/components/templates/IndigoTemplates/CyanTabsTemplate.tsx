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
  type HeadFn,
  type TplProps,
} from "./sheet";
import { normalizeResume } from "../NewTemplate/resume";
import {
  ContactList,
  makeTheme,
  ProfileAvatar,
} from "../NewTemplate/Themeatoms";

const CyanTabsTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#0891b2");

    const head: HeadFn = (title) => (
      <Box sx={{ mb: 1.2, display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            bgcolor: t.c,
            color: "#fff",
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: 1.3,
            textTransform: "uppercase",
            py: 0.45,
            pl: 1.6,
            pr: 3.4,
            clipPath:
              "polygon(0 0, 100% 0, calc(100% - 12px) 50%, 100% 100%, 0 100%)",
          }}
        >
          {title}
        </Box>
        <Box sx={{ flex: 1, height: "2px", bgcolor: t.mid }} />
      </Box>
    );

    return (
      <Sheet ref={ref}>
        <Box sx={{ p: "36px 42px 22px" }}>
          <Stack
            direction="row"
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 34,
                  fontWeight: 800,
                  color: t.ink,
                  lineHeight: 1.05,
                  letterSpacing: -0.6,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: t.c,
                    mt: 0.7,
                    letterSpacing: 0.4,
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
              border={`4px solid ${t.soft}`}
            />
          </Stack>
          <Box
            sx={{
              display: "flex",
              mt: 2.2,
              height: 5,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Box sx={{ flex: 5, bgcolor: t.c }} />
            <Box sx={{ flex: 2, bgcolor: "#67e8f9" }} />
            <Box sx={{ flex: 1, bgcolor: "#155e75" }} />
          </Box>
          <Box sx={{ mt: 1.6 }}>
            <ContactList items={r.contact} iconColor={t.c} size={10.5} />
          </Box>
        </Box>

        <Box sx={{ px: "42px", pb: "30px" }}>
          <SecSummary r={r} t={t} head={head} />
          <SecExp r={r} t={t} head={head} dates="text" />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 30px",
            }}
          >
            <Box>
              <SecEdu r={r} t={t} head={head} />
              <SecCert r={r} t={t} head={head} />
            </Box>
            <Box>
              <SecProj r={r} t={t} head={head} />
            </Box>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr 1fr",
              gap: "0 24px",
            }}
          >
            <SecSkills r={r} t={t} head={head} variant="outline" />
            <SecLang r={r} t={t} head={head} variant="lines" />
            <SecAch r={r} t={t} head={head} />
          </Box>
        </Box>
      </Sheet>
    );
  },
);

CyanTabsTemplate.displayName = "CyanTabsTemplate";
export default CyanTabsTemplate;
