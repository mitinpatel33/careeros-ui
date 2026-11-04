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
  ProfileAvatar,
} from "../NewTemplate/Themeatoms";

const SlateSplitTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#334155");
    const text = r.summary || r.objective;

    return (
      <Sheet ref={ref}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1.25fr 1fr",
            minHeight: 168,
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            sx={{
              bgcolor: t.c,
              color: "#fff",
              p: "30px 30px 30px 40px",
              alignItems: "center",
            }}
          >
            <ProfileAvatar r={r} t={t} size={78} tone="light" shape="rounded" />
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: -0.4,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography
                  sx={{
                    fontSize: 12,
                    mt: 0.8,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    opacity: 0.8,
                  }}
                >
                  {r.role}
                </Typography>
              )}
            </Box>
          </Stack>
          <Box
            sx={{
              bgcolor: "#e2e8f0",
              p: "26px 34px 26px 28px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ContactList
              items={r.contact}
              dir="column"
              iconColor={t.c}
              size={10.5}
            />
          </Box>
        </Box>

        {text && (
          <Box sx={{ px: "40px", pt: 3, pb: 0.5, position: "relative" }}>
            <Typography
              sx={{
                position: "absolute",
                left: 34,
                top: 8,
                fontSize: 56,
                lineHeight: 1,
                color: t.mid,
                fontFamily: "Georgia, serif",
              }}
            >
              “
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                lineHeight: 1.7,
                color: "#475569",
                fontStyle: "italic",
                pl: 4.5,
              }}
            >
              {text}
            </Typography>
          </Box>
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 214px",
            gap: "0 30px",
            p: "22px 40px 30px",
            alignItems: "start",
          }}
        >
          <Box>
            <SecExp r={r} t={t} h="num" n="01" dates="text" />
            <SecProj r={r} t={t} h="num" n="02" />
          </Box>
          <Box sx={{ bgcolor: "#f8fafc", p: "14px 16px", borderRadius: "4px" }}>
            <SecSkills r={r} t={t} h="num" n="03" variant="outline" />
            <SecEdu r={r} t={t} h="num" n="04" />
            <SecLang r={r} t={t} h="num" n="05" variant="lines" />
            <SecCert r={r} t={t} h="num" n="06" />
            <SecAch r={r} t={t} h="num" n="07" />
          </Box>
        </Box>
      </Sheet>
    );
  },
);

SlateSplitTemplate.displayName = "SlateSplitTemplate";
export default SlateSplitTemplate;
