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
  SecSummary,
  type HeadFn,
  type TplProps,
} from "./sheet";
import { normalizeResume } from "../NewTemplate/resume";
import { ContactList, makeTheme } from "../NewTemplate/Themeatoms";

const ForestFrameTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#166534");

    const head: HeadFn = (title) => (
      <Box sx={{ textAlign: "center", mb: 1.3 }}>
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 2.6,
            textTransform: "uppercase",
            color: t.c,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            mx: "auto",
            mt: 0.6,
            width: 36,
            height: 2,
            bgcolor: t.c,
            borderRadius: 1,
          }}
        />
      </Box>
    );

    return (
      <Sheet ref={ref}>
        <Box
          sx={{
            position: "absolute",
            inset: 14,
            border: `1px solid ${t.c}`,
            pointerEvents: "none",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 20,
            border: `3px double ${t.c}`,
            pointerEvents: "none",
          }}
        />

        <Box sx={{ position: "relative", p: "56px 58px 44px" }}>
          <Box sx={{ textAlign: "center", mb: 2.6 }}>
            <Typography
              sx={{
                fontSize: 31,
                fontWeight: 700,
                letterSpacing: 5,
                textTransform: "uppercase",
                color: "#14301f",
                lineHeight: 1.15,
              }}
            >
              {r.name}
            </Typography>
            {r.role && (
              <Typography
                sx={{ fontSize: 13, fontStyle: "italic", color: t.c, mt: 0.8 }}
              >
                {r.role}
              </Typography>
            )}
            <Typography
              sx={{ color: t.c, fontSize: 14, my: 0.8, letterSpacing: 6 }}
            >
              ◆ ◆ ◆
            </Typography>
            <ContactList
              items={r.contact}
              showIcons={false}
              justify="center"
              size={10.5}
              color="#475569"
            />
          </Box>

          <Box sx={{ textAlign: "center" }}>
            <SecSummary r={r} t={t} head={head} sx={{ textAlign: "center" }} />
          </Box>

          <SecExp r={r} t={t} head={head} dates="text" />

          {r.skills.length > 0 && (
            <Box sx={{ mb: 2.2 }}>
              {head("Skills")}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "5px 16px",
                }}
              >
                {r.skills.map((s) => (
                  <Typography
                    key={s.name}
                    sx={{ fontSize: 10.8, color: "#334155" }}
                  >
                    <Box component="span" sx={{ color: t.c, mr: 0.8 }}>
                      ▸
                    </Box>
                    {s.name}
                  </Typography>
                ))}
              </Box>
            </Box>
          )}

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 30px",
            }}
          >
            <Box>
              <SecEdu r={r} t={t} head={head} />
              <SecLang r={r} t={t} head={head} variant="lines" />
            </Box>
            <Box>
              <SecProj r={r} t={t} head={head} />
              <SecCert r={r} t={t} head={head} />
              <SecAch r={r} t={t} head={head} />
            </Box>
          </Box>
        </Box>
      </Sheet>
    );
  },
);

ForestFrameTemplate.displayName = "ForestFrameTemplate";
export default ForestFrameTemplate;
