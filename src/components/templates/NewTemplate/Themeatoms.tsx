import React, { type ReactNode } from "react";
import { Box, Link, Stack, Typography, alpha } from "@mui/material";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import type { NResume, NContact, NSkill, NLanguage, NExperience, NEducation, NProject, ContactKind, NCert, NAchievement } from "./resume";

/* ====================================================================== */
/* Theme                                                                  */
/* ====================================================================== */
export const FONT = "'Inter','Roboto','Helvetica',sans-serif";

export interface ResumeTheme {
    /** main accent colour */
    c: string;
    /** very light tint of the accent (backgrounds) */
    soft: string;
    /** medium tint (borders, rules) */
    mid: string;
    ink: string;
    muted: string;
}

export const makeTheme = (c: string): ResumeTheme => ({
    c,
    soft: alpha(c, 0.08),
    mid: alpha(c, 0.28),
    ink: "#1f2937",
    muted: "#64748b",
});

/* ====================================================================== */
/* Career OS decor: network lines + floating icon tiles                   */
/* ====================================================================== */
type Pt = [number, number];
interface Net {
    nodes: Pt[];
    edges: [number, number][];
    rings: number[];
}

// viewBox is 400 x 200
const NETS: Record<"a" | "b" | "c", Net> = {
    a: {
        nodes: [[18, 150], [70, 60], [135, 120], [95, 180], [190, 40], [250, 100], [320, 30], [372, 96], [300, 165], [215, 175]],
        edges: [[0, 1], [1, 2], [2, 3], [3, 0], [1, 4], [4, 5], [5, 6], [6, 7], [5, 8], [8, 9], [9, 2], [7, 8]],
        rings: [2, 5, 8],
    },
    b: {
        nodes: [[30, 30], [110, 80], [60, 140], [170, 20], [230, 110], [300, 55], [360, 150], [270, 175], [150, 170]],
        edges: [[0, 1], [1, 2], [1, 3], [3, 4], [4, 5], [5, 6], [4, 7], [7, 8], [8, 2], [1, 4]],
        rings: [1, 4, 7],
    },
    c: {
        nodes: [[40, 100], [105, 40], [165, 105], [235, 35], [290, 120], [355, 60], [330, 175], [200, 170], [90, 165]],
        edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [2, 7], [7, 8], [8, 0], [3, 5]],
        rings: [2, 4, 7],
    },
};

/** Faint connected-dots pattern from the Career OS login/dashboard theme. */
export const NetworkBackdrop = ({
    color = "#fff",
    opacity = 0.25,
    variant = "a",
    sx,
}: {
    color?: string;
    opacity?: number;
    variant?: "a" | "b" | "c";
    sx?: object;
}) => {
    const net = NETS[variant];
    return (
        <Box
            aria-hidden
            sx={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", opacity, ...sx }}
        >
            <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" width="100%" height="100%">
                {net.edges.map(([a, b], i) => (
                    <line
                        key={i}
                        x1={net.nodes[a][0]}
                        y1={net.nodes[a][1]}
                        x2={net.nodes[b][0]}
                        y2={net.nodes[b][1]}
                        stroke={color}
                        strokeWidth={1.2}
                    />
                ))}
                {net.nodes.map(([x, y], i) =>
                    net.rings.includes(i) ? (
                        <circle key={i} cx={x} cy={y} r={5.5} fill="none" stroke={color} strokeWidth={1.6} />
                    ) : (
                        <circle key={i} cx={x} cy={y} r={3.2} fill={color} />
                    ),
                )}
            </svg>
        </Box>
    );
};

const TILE_ICONS = [DescriptionOutlinedIcon, CodeRoundedIcon, WorkOutlineRoundedIcon, BadgeOutlinedIcon];

interface Tile {
    icon: 0 | 1 | 2 | 3;
    top?: number | string;
    right?: number | string;
    bottom?: number | string;
    left?: number | string;
    rotate?: number;
}

const DEFAULT_TILES: Tile[] = [
    { icon: 0, top: 22, right: 30, rotate: -8 },
    { icon: 1, top: 70, right: 96, rotate: 6 },
    { icon: 2, top: 28, right: 160, rotate: -4 },
];

/** Soft rounded tiles holding the document / code / briefcase / profile icons. */
export const FloatingTiles = ({
    color,
    bg = "rgba(255,255,255,.88)",
    size = 34,
    tiles = DEFAULT_TILES,
    opacity = 1,
}: {
    color: string;
    bg?: string;
    size?: number;
    tiles?: Tile[];
    opacity?: number;
}) => (
    <>
        {tiles.map((t, i) => {
            const Icon = TILE_ICONS[t.icon];
            const { icon: _icon, rotate = 0, ...pos } = t;
            return (
                <Box
                    key={i}
                    aria-hidden
                    sx={{
                        position: "absolute",
                        width: size,
                        height: size,
                        borderRadius: "10px",
                        bgcolor: bg,
                        color,
                        opacity,
                        display: "grid",
                        placeItems: "center",
                        boxShadow: "0 4px 12px rgba(0,0,0,.12)",
                        transform: `rotate(${rotate}deg)`,
                        ...pos,
                    }}
                >
                    <Icon sx={{ fontSize: size * 0.55 }} />
                </Box>
            );
        })}
    </>
);

/* ====================================================================== */
/* Avatar                                                                 */
/* ====================================================================== */
export const ProfileAvatar = ({
    r,
    t,
    size = 84,
    shape = "circle",
    tone = "solid",
    border,
}: {
    r: NResume;
    t: ResumeTheme;
    size?: number;
    shape?: "circle" | "rounded" | "square";
    /** solid = accent background, light = white background */
    tone?: "solid" | "light";
    border?: string;
}) => {
    const radius = shape === "circle" ? "50%" : shape === "rounded" ? `${Math.round(size * 0.26)}px` : 0;
    const common = { width: size, height: size, borderRadius: radius, border, flexShrink: 0 };
    if (r.photo) {
        return <Box component="img" src={r.photo} alt={r.name} sx={{ ...common, objectFit: "cover" }} />;
    }
    return (
        <Box
            sx={{
                ...common,
                display: "grid",
                placeItems: "center",
                fontWeight: 800,
                fontSize: size * 0.32,
                bgcolor: tone === "solid" ? t.c : "#fff",
                color: tone === "solid" ? "#fff" : t.c,
            }}
        >
            {r.initials}
        </Box>
    );
};

/* ====================================================================== */
/* Text                                                                   */
/* ====================================================================== */
export const P = ({
    children,
    size = 11.5,
    color,
    sx,
}: {
    children: ReactNode;
    size?: number;
    color?: string;
    sx?: object;
}) => (
    <Typography sx={{ fontSize: size, lineHeight: 1.6, color: color ?? "#334155", ...sx }}>{children}</Typography>
);

/* ====================================================================== */
/* Headings + section wrappers                                            */
/* ====================================================================== */
export type HeadingVariant =
    | "line" | "short" | "pill" | "bar" | "dot" | "rule" | "serif" | "light" | "plain" | "muted" | "num";

export const Heading = ({
    children,
    t,
    variant = "line",
    n,
}: {
    children: ReactNode;
    t: ResumeTheme;
    variant?: HeadingVariant;
    n?: string;
}) => {
    const base = { fontSize: 11.5, fontWeight: 800, letterSpacing: 1.3, textTransform: "uppercase" as const };

    switch (variant) {
        case "pill":
            return (
                <Box sx={{ mb: 1.2 }}>
                    <Typography
                        component="span"
                        sx={{ ...base, fontSize: 10, display: "inline-block", bgcolor: t.c, color: "#fff", px: 1.5, py: 0.35, borderRadius: "20px" }}
                    >
                        {children}
                    </Typography>
                </Box>
            );
        case "bar":
            return <Typography sx={{ ...base, color: t.ink, borderLeft: `4px solid ${t.c}`, pl: 1, mb: 1.2 }}>{children}</Typography>;
        case "dot":
            return (
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.2 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: "3px", bgcolor: t.c }} />
                    <Typography sx={{ ...base, color: t.ink }}>{children}</Typography>
                </Stack>
            );
        case "rule":
            return (
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.2 }}>
                    <Typography sx={{ ...base, color: t.c }}>{children}</Typography>
                    <Box sx={{ flex: 1, height: "1px", bgcolor: "#d5d9e0" }} />
                </Stack>
            );
        case "serif":
            return (
                <Typography sx={{ ...base, letterSpacing: 2, color: t.c, borderBottom: `1px solid ${t.mid}`, pb: 0.4, mb: 1.2 }}>
                    {children}
                </Typography>
            );
        case "light":
            return (
                <Typography sx={{ ...base, fontSize: 10.5, color: "#fff", borderBottom: "1px solid rgba(255,255,255,.35)", pb: 0.5, mb: 1.2 }}>
                    {children}
                </Typography>
            );
        case "plain":
            return <Typography sx={{ ...base, color: t.c, mb: 1 }}>{children}</Typography>;
        case "muted":
            return <Typography sx={{ ...base, fontSize: 10, letterSpacing: 2.2, color: "#8a8f99", mb: 0.8 }}>{children}</Typography>;
        case "num":
            return (
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1.2 }}>
                    {n && (
                        <Box sx={{ bgcolor: t.c, color: "#fff", fontSize: 9.5, fontWeight: 800, px: 0.8, py: 0.1, lineHeight: "16px" }}>{n}</Box>
                    )}
                    <Typography sx={{ ...base, color: t.ink }}>{children}</Typography>
                </Stack>
            );
        case "short":
            return (
                <Box sx={{ mb: 1.2 }}>
                    <Typography sx={{ ...base, color: t.c }}>{children}</Typography>
                    <Box sx={{ mt: 0.5, height: 2, width: 34, bgcolor: t.c, borderRadius: 1 }} />
                </Box>
            );
        default: // "line"
            return <Typography sx={{ ...base, color: t.c, borderBottom: `2px solid ${t.c}`, pb: 0.4, mb: 1.2 }}>{children}</Typography>;
    }
};

/** Heading + content. Renders nothing when `show` is false (empty section). */
export const Block = ({
    title,
    t,
    variant = "line",
    n,
    show = true,
    sx,
    children,
}: {
    title: string;
    t: ResumeTheme;
    variant?: HeadingVariant;
    n?: string;
    show?: boolean;
    sx?: object;
    children: ReactNode;
}) =>
    show ? (
        <Box sx={{ mb: 2.2, ...sx }}>
            <Heading t={t} variant={variant} n={n}>
                {title}
            </Heading>
            {children}
        </Box>
    ) : null;

/** Outlined box with the title cut into the border. */
export const Frame = ({
    title, t, show = true, children, sx,
}: { title: string; t: ResumeTheme; show?: boolean; children: ReactNode; sx?: object }) =>
    show ? (
        <Box sx={{ position: "relative", border: `1.5px solid ${t.c}`, p: "17px 14px 8px", mb: 2.4, ...sx }}>
            <Typography
                sx={{
                    position: "absolute", top: -9, left: 12, bgcolor: "#fff", color: t.c, px: 1,
                    fontSize: 10.5, fontWeight: 800, letterSpacing: 1.3, textTransform: "uppercase", lineHeight: "18px",
                }}
            >
                {title}
            </Typography>
            {children}
        </Box>
    ) : null;

/** Rounded panel: white card with shadow, or soft outline. */
export const Panel = ({
    title, t, show = true, tone = "card", heading = "pill", children, sx,
}: {
    title?: string;
    t: ResumeTheme;
    show?: boolean;
    tone?: "card" | "outline";
    heading?: HeadingVariant;
    children: ReactNode;
    sx?: object;
}) =>
    show ? (
        <Box
            sx={{
                borderRadius: tone === "card" ? "14px" : "12px",
                p: "14px 16px",
                mb: 1.8,
                bgcolor: "#fff",
                ...(tone === "card"
                    ? { boxShadow: "0 2px 10px rgba(0,0,0,.06)" }
                    : { border: `1.5px solid ${t.mid}`, p: "12px 14px" }),
                ...sx,
            }}
        >
            {title && (
                <Heading t={t} variant={heading}>
                    {title}
                </Heading>
            )}
            {children}
        </Box>
    ) : null;

/** "Label | content" row used by the labelled-grid layout. */
export const LabelRow = ({
    title, t, show = true, children,
}: { title: string; t: ResumeTheme; show?: boolean; children: ReactNode }) =>
    show ? (
        <Box sx={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 2, py: 1.5, borderTop: `1px solid ${t.mid}` }}>
            <Typography sx={{ color: t.c, fontSize: 10.5, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase" }}>
                {title}
            </Typography>
            <Box>{children}</Box>
        </Box>
    ) : null;

/* ====================================================================== */
/* Contact                                                                */
/* ====================================================================== */
const CONTACT_ICONS: Record<ContactKind, typeof PhoneRoundedIcon> = {
    phone: PhoneRoundedIcon,
    email: EmailRoundedIcon,
    location: PlaceRoundedIcon,
    linkedin: LinkedInIcon,
    github: GitHubIcon,
    web: LanguageRoundedIcon,
};

export const ContactList = ({
    items,
    color = "#334155",
    iconColor,
    dir = "row",
    size = 11,
    justify = "flex-start",
    showIcons = true,
}: {
    items: NContact[];
    color?: string;
    iconColor?: string;
    dir?: "row" | "column";
    size?: number;
    justify?: "flex-start" | "center" | "flex-end";
    showIcons?: boolean;
}) => (
    <Stack
        direction={dir}
        sx={{
            color,
            flexWrap: dir === "row" ? "wrap" : undefined,
            columnGap: 2,
            rowGap: dir === "row" ? 0.5 : 0.9,
            justifyContent: justify,
            alignItems: dir === "column" ? (justify === "flex-end" ? "flex-end" : "flex-start") : "center",
        }}
    >
        {items.map((it, i) => {
            const Icon = CONTACT_ICONS[it.kind];
            return (
                <Stack key={i} direction="row" spacing={0.6} sx={{ alignItems: "center", minWidth: 0 }}>
                    {showIcons && <Icon sx={{ fontSize: size + 3, color: iconColor ?? color, flexShrink: 0 }} />}
                    <Typography sx={{ fontSize: size, color: "inherit", wordBreak: "break-word", lineHeight: 1.4 }}>{it.label}</Typography>
                </Stack>
            );
        })}
    </Stack>
);

/* ====================================================================== */
/* Skills / languages                                                     */
/* ====================================================================== */
export type SkillVariant = "chip" | "pill" | "outline" | "solid" | "bars" | "text";

export const Skills = ({
    skills,
    t,
    variant = "chip",
    sep = "·",
    textColor,
    trackColor = "rgba(255,255,255,.25)",
    fillColor = "#fff",
}: {
    skills: NSkill[];
    t: ResumeTheme;
    variant?: SkillVariant;
    sep?: string;
    textColor?: string;
    trackColor?: string;
    fillColor?: string;
}) => {
    if (variant === "bars") {
        return (
            <Stack spacing={1}>
                {skills.map((s) => (
                    <Box key={s.name}>
                        <Typography sx={{ fontSize: 10.5, color: textColor ?? t.ink, mb: 0.4 }}>{s.name}</Typography>
                        <Box sx={{ height: 4, borderRadius: 2, bgcolor: trackColor }}>
                            <Box sx={{ height: "100%", width: `${s.level}%`, borderRadius: 2, bgcolor: fillColor }} />
                        </Box>
                    </Box>
                ))}
            </Stack>
        );
    }
    if (variant === "text") {
        return (
            <Typography sx={{ fontSize: 11.5, lineHeight: 1.8, color: textColor ?? "#444" }}>
                {skills.map((s, i) => (
                    <React.Fragment key={s.name}>
                        {i > 0 && (
                            <>
                                <Box component="span" sx={{ color: t.c, fontWeight: 800 }}>{`\u00A0${sep}`}</Box>{" "}
                            </>
                        )}
                        {s.name}
                    </React.Fragment>
                ))}
            </Typography>
        );
    }

    const look = {
        chip: { bgcolor: t.soft, color: t.c, borderRadius: "4px", fontWeight: 700 },
        pill: { bgcolor: t.c, color: "#fff", borderRadius: "20px", fontWeight: 700 },
        outline: { bgcolor: "#f8fafc", color: "#334155", borderRadius: "6px", border: "1px solid #cbd5e1", fontWeight: 600 },
        solid: { bgcolor: "rgba(255,255,255,.14)", color: "#fff", borderRadius: "4px", fontWeight: 600 },
    }[variant];

    return (
        <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.7 }}>
            {skills.map((s) => (
                <Box key={s.name} sx={{ fontSize: 10.5, px: 1.1, py: 0.3, lineHeight: 1.5, ...look }}>
                    {s.name}
                </Box>
            ))}
        </Stack>
    );
};

export const LangList = ({
    items, t, variant = "text",
}: { items: NLanguage[]; t: ResumeTheme; variant?: "text" | "pills" | "lines"; }) => {
    if (variant === "pills") {
        return (
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.7 }}>
                {items.map((l) => (
                    <Box key={l.name} sx={{ bgcolor: t.c, color: "#fff", borderRadius: "20px", fontSize: 10.5, fontWeight: 700, px: 1.2, py: 0.3 }}>
                        {l.name}
                    </Box>
                ))}
            </Stack>
        );
    }
    if (variant === "lines") {
        return (
            <Stack spacing={0.4}>
                {items.map((l) => (
                    <Typography key={l.name} sx={{ fontSize: 10.5, color: "inherit" }}>
                        {l.name}
                        {l.level ? ` · ${l.level}` : ""}
                    </Typography>
                ))}
            </Stack>
        );
    }
    return (
        <P>
            {items.map((l) => (l.level ? `${l.name} (${l.level})` : l.name)).join("  •  ")}
        </P>
    );
};

/* ====================================================================== */
/* Dates + bullets                                                        */
/* ====================================================================== */
export const DateTag = ({
    children, t, tone = "tag",
}: { children: ReactNode; t: ResumeTheme; tone?: "tag" | "text" }) =>
    children ? (
        tone === "tag" ? (
            <Box sx={{ bgcolor: t.c, color: "#fff", fontSize: 10, fontWeight: 700, px: 1.1, py: 0.25, borderRadius: "10px", whiteSpace: "nowrap" }}>
                {children}
            </Box>
        ) : (
            <Typography sx={{ fontSize: 10.5, color: "#7b8496", whiteSpace: "nowrap" }}>{children}</Typography>
        )
    ) : null;

export const Bullets = ({ items, t, color = "#334155" }: { items: string[]; t: ResumeTheme; color?: string }) =>
    items.length ? (
        <Box component="ul" sx={{ m: 0, mt: 0.6, pl: 2.2, color, "& li::marker": { color: t.c } }}>
            {items.map((b, i) => (
                <Typography key={i} component="li" sx={{ fontSize: 11, lineHeight: 1.55, mb: 0.3, color: "inherit" }}>
                    {b}
                </Typography>
            ))}
        </Box>
    ) : null;

/* ====================================================================== */
/* Entry lists                                                            */
/* ====================================================================== */
/** Vertical rail used by timeline layouts. */
const Rail = ({ on, t, children }: { on?: boolean; t: ResumeTheme; children: ReactNode }) =>
    on ? <Box sx={{ borderLeft: `2px solid ${t.mid}`, pl: "20px", ml: "6px" }}>{children}</Box> : <>{children}</>;

const RailDot = ({ t }: { t: ResumeTheme }) => (
    <Box sx={{ position: "absolute", left: -27, top: 3, width: 12, height: 12, borderRadius: "50%", bgcolor: "#fff", border: `3px solid ${t.c}` }} />
);

interface ListProps<T> {
    items: T[];
    t: ResumeTheme;
    timeline?: boolean;
    dates?: "tag" | "text";
}

export const ExpList = ({ items, t, timeline, dates = "tag" }: ListProps<NExperience>) => (
    <Rail on={timeline} t={t}>
        {items.map((e, i) => (
            <Box key={i} sx={{ mb: 1.9, position: "relative" }}>
                {timeline && <RailDot t={t} />}
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: 12.5, fontWeight: 800, color: t.ink }}>{e.company}</Typography>
                        <Typography sx={{ fontSize: 11.5, fontWeight: 600, color: t.c }}>{e.role}</Typography>
                        {e.location && <Typography sx={{ fontSize: 10.5, color: t.muted, fontStyle: "italic" }}>{e.location}</Typography>}
                    </Box>
                    <DateTag t={t} tone={dates}>{e.period}</DateTag>
                </Stack>
                <Bullets items={e.bullets} t={t} />
            </Box>
        ))}
    </Rail>
);

export const EduList = ({ items, t, timeline, dates = "text" }: ListProps<NEducation>) => (
    <Rail on={timeline} t={t}>
        {items.map((e, i) => (
            <Box key={i} sx={{ mb: 1.4, position: "relative" }}>
                {timeline && <RailDot t={t} />}
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "flex-start", gap: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 800, color: t.ink }}>{e.school}</Typography>
                    <DateTag t={t} tone={dates}>{e.period}</DateTag>
                </Stack>
                <Typography sx={{ fontSize: 11, color: t.c, fontWeight: 600 }}>
                    {e.degree}
                    {e.score ? `  ·  ${e.score}` : ""}
                </Typography>
                {e.note && <Typography sx={{ fontSize: 10.5, color: t.muted, fontStyle: "italic", mt: 0.2 }}>{e.note}</Typography>}
            </Box>
        ))}
    </Rail>
);

export const ProjectList = ({ items, t }: { items: NProject[]; t: ResumeTheme }) => (
    <>
        {items.map((p, i) => (
            <Box key={i} sx={{ mb: 1.5 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", gap: 1 }}>
                    <Typography sx={{ fontSize: 12, fontWeight: 800, color: t.ink }}>
                        {p.name}
                        {p.role ? ` — ${p.role}` : ""}
                    </Typography>
                    {p.url && (
                        <Link href={p.url} target="_blank" underline="none" sx={{ fontSize: 10.5, color: t.c, whiteSpace: "nowrap" }}>
                            View Project
                        </Link>
                    )}
                </Stack>
                {p.description && <P size={11} sx={{ mt: 0.2 }}>{p.description}</P>}
                {p.tech.length > 0 && (
                    <Typography sx={{ fontSize: 10.5, color: t.muted, mt: 0.2 }}>
                        <strong>Tech:</strong> {p.tech.join(", ")}
                    </Typography>
                )}
            </Box>
        ))}
    </>
);

export const CertList = ({ items, t }: { items: NCert[]; t: ResumeTheme }) => (
    <>
        {items.map((c, i) => (
            <Stack key={i} direction="row" sx={{ justifyContent: "space-between", gap: 1, mb: 0.8 }}>
                <Typography sx={{ fontSize: 11, color: "#334155" }}>
                    <strong>{c.name}</strong>
                    {c.issuer ? ` — ${c.issuer}` : ""}
                </Typography>
                {c.date && <Typography sx={{ fontSize: 10, color: t.muted, whiteSpace: "nowrap" }}>{c.date}</Typography>}
            </Stack>
        ))}
    </>
);

export const AchList = ({ items }: { items: NAchievement[]; t?: ResumeTheme }) => (
    <>
        {items.map((a, i) => (
            <Box key={i} sx={{ mb: 0.9 }}>
                <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: "#1e293b" }}>{a.title}</Typography>
                {a.description && <P size={10.5} color="#475569">{a.description}</P>}
            </Box>
        ))}
    </>
);