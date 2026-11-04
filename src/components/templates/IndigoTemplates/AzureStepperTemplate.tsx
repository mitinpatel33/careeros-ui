import { forwardRef, type ReactNode } from "react";
import { Box, Stack, Typography } from "@mui/material";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";

import { Sheet, type TplProps } from "./sheet";
import { normalizeResume } from "../NewTemplate/resume";
import {
  AchList,
  CertList,
  ContactList,
  EduList,
  ExpList,
  LangList,
  makeTheme,
  P,
  ProfileAvatar,
  ProjectList,
  Skills,
} from "../NewTemplate/Themeatoms";

interface Step {
  key: string;
  icon: typeof WorkOutlineRoundedIcon;
  title: string;
  show: boolean;
  body: ReactNode;
}

const AzureStepperTemplate = forwardRef<HTMLDivElement, TplProps>(
  ({ data }, ref) => {
    const r = normalizeResume(data);
    const t = makeTheme("#0369a1");
    const text = r.summary || r.objective;

    const steps: Step[] = [
      {
        key: "profile",
        icon: PersonOutlineRoundedIcon,
        title: "Profile",
        show: !!text,
        body: <P size={11.3}>{text}</P>,
      },
      {
        key: "exp",
        icon: WorkOutlineRoundedIcon,
        title: "Experience",
        show: r.experience.length > 0,
        body: <ExpList items={r.experience} t={t} dates="text" />,
      },
      {
        key: "edu",
        icon: SchoolRoundedIcon,
        title: "Education",
        show: r.education.length > 0,
        body: <EduList items={r.education} t={t} />,
      },
      {
        key: "proj",
        icon: CodeRoundedIcon,
        title: "Projects",
        show: r.projects.length > 0,
        body: <ProjectList items={r.projects} t={t} />,
      },
      {
        key: "skills",
        icon: BoltRoundedIcon,
        title: "Skills",
        show: r.skills.length > 0,
        body: <Skills skills={r.skills} t={t} variant="chip" />,
      },
      {
        key: "extra",
        icon: WorkspacePremiumRoundedIcon,
        title: "Certificates, Awards & Languages",
        show: r.certs.length + r.achievements.length + r.languages.length > 0,
        body: (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0 24px",
            }}
          >
            <Box>
              <CertList items={r.certs} t={t} />
              <AchList items={r.achievements} />
            </Box>
            <LangList items={r.languages} t={t} variant="lines" />
          </Box>
        ),
      },
    ].filter((s) => s.show);

    return (
      <Sheet ref={ref}>
        <Box sx={{ bgcolor: t.c, color: "#fff", p: "34px 42px 22px" }}>
          <Stack direction="row" spacing={2.4} sx={{ alignItems: "center" }}>
            <ProfileAvatar
              r={r}
              t={t}
              size={80}
              tone="light"
              border="4px solid rgba(255,255,255,.5)"
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontSize: 32,
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: -0.4,
                }}
              >
                {r.name}
              </Typography>
              {r.role && (
                <Typography
                  sx={{
                    fontSize: 13,
                    mt: 0.7,
                    opacity: 0.9,
                    letterSpacing: 1.6,
                    textTransform: "uppercase",
                  }}
                >
                  {r.role}
                </Typography>
              )}
            </Box>
          </Stack>
          <Box
            sx={{
              mt: 1.8,
              pt: 1.4,
              borderTop: "1px solid rgba(255,255,255,.35)",
            }}
          >
            <ContactList items={r.contact} color="#fff" size={10.5} />
          </Box>
        </Box>

        <Box sx={{ p: "26px 42px 30px" }}>
          {steps.map((s, i) => {
            const Icon = s.icon;
            const last = i === steps.length - 1;
            return (
              <Box
                key={s.key}
                sx={{ position: "relative", pl: "54px", pb: last ? 0 : 2.4 }}
              >
                {!last && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: 15,
                      top: 34,
                      bottom: 4,
                      width: 2,
                      bgcolor: t.mid,
                    }}
                  />
                )}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    bgcolor: t.c,
                    color: "#fff",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: `0 0 0 4px ${t.soft}`,
                  }}
                >
                  <Icon sx={{ fontSize: 17 }} />
                </Box>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 1.3,
                    textTransform: "uppercase",
                    color: t.c,
                    lineHeight: "32px",
                    mb: 0.8,
                  }}
                >
                  {s.title}
                </Typography>
                {s.body}
              </Box>
            );
          })}
        </Box>
      </Sheet>
    );
  },
);

AzureStepperTemplate.displayName = "AzureStepperTemplate";
export default AzureStepperTemplate;
