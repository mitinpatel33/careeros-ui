import { forwardRef, type ReactNode } from "react";
import { Box } from "@mui/material";
import ResumePage from "../NewTemplate/ResumePage";
import { A4_HEIGHT_PX, A4_WIDTH_PX, type NResume } from "../NewTemplate/resume";
import {
  AchList,
  CertList,
  EduList,
  ExpList,
  FONT,
  Heading,
  LangList,
  P,
  ProjectList,
  Skills,
  type HeadingVariant,
  type ResumeTheme,
  type SkillVariant,
} from "../NewTemplate/Themeatoms";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TplProps {
  data: any;
}

export const Sheet = forwardRef<
  HTMLDivElement,
  { children: ReactNode; sx?: object }
>(({ children, sx }, ref) => (
  <ResumePage ref={ref}>
    <Box
      sx={{
        width: A4_WIDTH_PX,
        minHeight: A4_HEIGHT_PX,
        bgcolor: "#fff",
        fontFamily: FONT,
        color: "#1f2937",
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
        ...sx,
      }}
    >
      {children}
    </Box>
  </ResumePage>
));
Sheet.displayName = "Sheet";

export type HeadFn = (title: string) => ReactNode;

interface Base {
  r: NResume;
  t: ResumeTheme;
  h?: HeadingVariant;
  head?: HeadFn;
  title?: string;
  mb?: number;
  n?: string;
}

const Wrap = ({
  title,
  t,
  h = "line",
  head,
  show,
  mb = 2.2,
  n,
  children,
}: {
  title: string;
  t: ResumeTheme;
  h?: HeadingVariant;
  head?: HeadFn;
  show: boolean;
  mb?: number;
  n?: string;
  children: ReactNode;
}) =>
  show ? (
    <Box sx={{ mb }}>
      {head ? (
        head(title)
      ) : (
        <Heading t={t} variant={h} n={n}>
          {title}
        </Heading>
      )}
      {children}
    </Box>
  ) : null;

export const SecSummary = ({
  r,
  t,
  h,
  head,
  mb,
  n,
  title = "Profile",
  size,
  color,
  sx,
}: Base & { size?: number; color?: string; sx?: object }) => {
  const text = r.summary || r.objective;
  return (
    <Wrap title={title} t={t} h={h} head={head} mb={mb} n={n} show={!!text}>
      <P size={size} color={color} sx={sx}>
        {text}
      </P>
    </Wrap>
  );
};

export const SecExp = ({
  r,
  t,
  h,
  head,
  mb,
  n,
  title = "Experience",
  timeline,
  dates,
}: Base & { timeline?: boolean; dates?: "tag" | "text" }) => (
  <Wrap
    title={title}
    t={t}
    h={h}
    head={head}
    mb={mb}
    n={n}
    show={r.experience.length > 0}
  >
    <ExpList items={r.experience} t={t} timeline={timeline} dates={dates} />
  </Wrap>
);

export const SecEdu = ({
  r,
  t,
  h,
  head,
  mb,
  n,
  title = "Education",
  timeline,
  dates,
}: Base & { timeline?: boolean; dates?: "tag" | "text" }) => (
  <Wrap
    title={title}
    t={t}
    h={h}
    head={head}
    mb={mb}
    n={n}
    show={r.education.length > 0}
  >
    <EduList items={r.education} t={t} timeline={timeline} dates={dates} />
  </Wrap>
);

export const SecProj = ({ r, t, h, head, mb, n, title = "Projects" }: Base) => (
  <Wrap
    title={title}
    t={t}
    h={h}
    head={head}
    mb={mb}
    n={n}
    show={r.projects.length > 0}
  >
    <ProjectList items={r.projects} t={t} />
  </Wrap>
);

export const SecCert = ({
  r,
  t,
  h,
  head,
  mb,
  n,
  title = "Certifications",
}: Base) => (
  <Wrap
    title={title}
    t={t}
    h={h}
    head={head}
    mb={mb}
    n={n}
    show={r.certs.length > 0}
  >
    <CertList items={r.certs} t={t} />
  </Wrap>
);

export const SecAch = ({
  r,
  t,
  h,
  head,
  mb,
  n,
  title = "Achievements",
}: Base) => (
  <Wrap
    title={title}
    t={t}
    h={h}
    head={head}
    mb={mb}
    n={n}
    show={r.achievements.length > 0}
  >
    <AchList items={r.achievements} />
  </Wrap>
);

export const SecLang = ({
  r,
  t,
  h,
  head,
  mb,
  n,
  title = "Languages",
  variant,
  color,
}: Base & { variant?: "text" | "pills" | "lines"; color?: string }) => (
  <Wrap
    title={title}
    t={t}
    h={h}
    head={head}
    mb={mb}
    n={n}
    show={r.languages.length > 0}
  >
    <Box sx={{ color }}>
      <LangList items={r.languages} t={t} variant={variant} />
    </Box>
  </Wrap>
);

export const SecSkills = ({
  r,
  t,
  h,
  head,
  mb,
  n,
  title = "Skills",
  variant = "chip",
  sep,
  textColor,
  trackColor,
  fillColor,
}: Base & {
  variant?: SkillVariant;
  sep?: string;
  textColor?: string;
  trackColor?: string;
  fillColor?: string;
}) => (
  <Wrap
    title={title}
    t={t}
    h={h}
    head={head}
    mb={mb}
    n={n}
    show={r.skills.length > 0}
  >
    <Skills
      skills={r.skills}
      t={t}
      variant={variant}
      sep={sep}
      textColor={textColor}
      trackColor={trackColor}
      fillColor={fillColor}
    />
  </Wrap>
);
