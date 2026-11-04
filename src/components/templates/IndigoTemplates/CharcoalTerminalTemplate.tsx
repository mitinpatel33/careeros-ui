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
  type HeadFn,
  type TplProps,
} from "./sheet";
import { normalizeResume } from "../NewTemplate/resume";
import { ContactList, makeTheme } from "../NewTemplate/Themeatoms";

const MONO = "'JetBrains Mono','Fira Code','SFMono-Regular',Consolas,monospace";

const CharcoalTerminalTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#050505");
    const text = r.summary || r.objective;

    const head: HeadFn = (title) => (
      <Typography
        sx={{
          fontSize: 12,
          fontWeight: 700,
          color: "#111827",
          mb: 1.1,
          letterSpacing: 0.3,
        }}
      >
        <Box component="span" sx={{ color: t.c }}>
          {"// "}
        </Box>
        {title.toLowerCase()}
      </Typography>
    );

    return (
      <Sheet ref={ref} sx={{ "& .MuiTypography-root": { fontFamily: MONO } }}>
        <Box
          sx={{
            bgcolor: "#111827",
            px: 2,
            py: 1.1,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
            <Box
              key={c}
              sx={{ width: 10, height: 10, borderRadius: "50%", bgcolor: c }}
            />
          ))}
          <Typography sx={{ ml: 1.5, fontSize: 10.5, color: "#9ca3af" }}>
            ~/resume/{r.name.toLowerCase().replace(/\s+/g, "-")}.tsx
          </Typography>
        </Box>

        <Box sx={{ p: "30px 42px 28px" }}>
          <Typography sx={{ fontSize: 11, color: "#9ca3af" }}>
            $ whoami
          </Typography>
          <Typography
            sx={{
              fontSize: 30,
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.15,
              mt: 0.5,
              letterSpacing: -0.5,
            }}
          >
            {r.name}
          </Typography>
          {r.role && (
            <Typography
              sx={{ fontSize: 13, color: t.c, fontWeight: 700, mt: 0.6 }}
            >
              {"> "}
              {r.role}
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  width: 8,
                  height: 14,
                  bgcolor: t.c,
                  ml: 0.8,
                  verticalAlign: "middle",
                }}
              />
            </Typography>
          )}

          <Box
            sx={{
              my: 2,
              py: 1.2,
              borderTop: "1px dashed #d1d5db",
              borderBottom: "1px dashed #d1d5db",
            }}
          >
            <ContactList items={r.contact} iconColor={t.c} size={10} />
          </Box>

          {text && (
            <Box
              sx={{
                mb: 2.4,
                p: "10px 14px",
                bgcolor: "#f3f4f6",
                borderLeft: `3px solid ${t.c}`,
                borderRadius: "0 6px 6px 0",
              }}
            >
              <Typography
                sx={{ fontSize: 10.5, lineHeight: 1.7, color: "#4b5563" }}
              >
                {"/* "}
                {text}
                {" */"}
              </Typography>
            </Box>
          )}

          <SecExp r={r} t={t} head={head} dates="text" />
          <SecSkills r={r} t={t} head={head} variant="outline" />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 30px",
            }}
          >
            <Box>
              <SecProj r={r} t={t} head={head} />
            </Box>
            <Box>
              <SecEdu r={r} t={t} head={head} />
              <SecCert r={r} t={t} head={head} />
              <SecLang r={r} t={t} head={head} variant="lines" />
              <SecAch r={r} t={t} head={head} />
            </Box>
          </Box>
        </Box>
      </Sheet>
    );
  },
);

CharcoalTerminalTemplate.displayName = "CharcoalTerminalTemplate";
export default CharcoalTerminalTemplate;
