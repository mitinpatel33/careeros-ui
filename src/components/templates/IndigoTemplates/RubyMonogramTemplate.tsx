import { forwardRef } from "react";
import { Box, Typography, alpha } from "@mui/material";
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
import { ContactList, makeTheme } from "../NewTemplate/Themeatoms";

const RubyMonogramTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#be123c");

    const head: HeadFn = (title) => (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.2, mb: 1.3 }}>
        <Box sx={{ flex: 1, height: "1px", bgcolor: t.mid }} />
        <Typography
          sx={{
            fontSize: 10.5,
            fontWeight: 800,
            letterSpacing: 2.2,
            textTransform: "uppercase",
            color: t.c,
          }}
        >
          {title}
        </Typography>
        <Box sx={{ flex: 1, height: "1px", bgcolor: t.mid }} />
      </Box>
    );

    return (
      <Sheet ref={ref}>
        <Typography
          aria-hidden
          sx={{
            position: "absolute",
            top: 170,
            left: 0,
            right: 0,
            textAlign: "center",
            pointerEvents: "none",
            fontSize: 430,
            fontWeight: 900,
            lineHeight: 1,
            color: alpha(t.c, 0.05),
            letterSpacing: -10,
          }}
        >
          {r.initials}
        </Typography>

        <Box sx={{ position: "relative", p: "44px 46px 30px" }}>
          <Box sx={{ textAlign: "center", mb: 2.4 }}>
            <Typography
              sx={{
                fontSize: 34,
                fontWeight: 300,
                letterSpacing: 9,
                textTransform: "uppercase",
                color: "#111827",
                lineHeight: 1.1,
              }}
            >
              {r.name}
            </Typography>
            {r.role && (
              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: t.c,
                  mt: 1.1,
                }}
              >
                {r.role}
              </Typography>
            )}

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1.2,
                my: 1.6,
              }}
            >
              <Box sx={{ width: 90, height: "1px", bgcolor: t.c }} />
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  bgcolor: t.c,
                  transform: "rotate(45deg)",
                }}
              />
              <Box sx={{ width: 90, height: "1px", bgcolor: t.c }} />
            </Box>
            <ContactList
              items={r.contact}
              showIcons={false}
              justify="center"
              size={10.5}
              color="#475569"
            />
          </Box>

          <SecSummary r={r} t={t} head={head} />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 232px",
              gap: "0 28px",
              alignItems: "start",
            }}
          >
            <Box>
              <SecExp r={r} t={t} head={head} dates="text" />
              <SecProj r={r} t={t} head={head} />
            </Box>
            <Box>
              <SecEdu r={r} t={t} head={head} />
              <SecSkills r={r} t={t} head={head} variant="text" sep="◆" />
              <SecLang r={r} t={t} head={head} variant="lines" />
              <SecCert r={r} t={t} head={head} />
              <SecAch r={r} t={t} head={head} />
            </Box>
          </Box>
        </Box>
      </Sheet>
    );
  },
);

RubyMonogramTemplate.displayName = "RubyMonogramTemplate";
export default RubyMonogramTemplate;
