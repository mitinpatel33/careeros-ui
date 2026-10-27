import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, Button, Chip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import type { Block, LegalDoc } from "./LegalContent";

const BLUE = "#1d4ed8";
const NAVY = "#1e3a8a";
const HEADING_FONT = '"Arial Black", Impact, sans-serif';

/** Same floating rocket as the Login page */
const AnimatedRocket = () => (
    <Box
        component={motion.span}
        animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        sx={{ display: "inline-block", ml: 0.5 }}
    >
        🚀
    </Box>
);

const linkStyle = { color: "#2563eb", fontWeight: 700 } as const;
const InternalLink = styled(RouterLink)(linkStyle);
const ExternalLink = styled("a")(linkStyle);

/** Renders **bold** and [text](url) inside a string. Internal links use the router. */
const Inline = ({ text }: { text: string }) => {
    const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
    return (
        <>
            {parts.map((p, i) => {
                const bold = p.match(/^\*\*([^*]+)\*\*$/);
                if (bold) return <strong key={i}>{bold[1]}</strong>;
                const link = p.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
                if (link) {
                    const [, label, href] = link;
                    return href.startsWith("/") ? (
                        <InternalLink key={i} to={href}>
                            {label}
                        </InternalLink>
                    ) : (
                        <ExternalLink key={i} href={href} target="_blank" rel="noopener noreferrer">
                            {label}
                        </ExternalLink>
                    );
                }
                return <span key={i}>{p}</span>;
            })}
        </>
    );
};

const Blocks = ({ blocks }: { blocks: Block[] }) => (
    <>
        {blocks.map((b, i) => {
            if (b.t === "h3")
                return (
                    <Typography key={i} variant="subtitle1" sx={{ fontWeight: 800, color: NAVY, mt: 2, mb: 0.75 }}>
                        {b.text}
                    </Typography>
                );
            if (b.t === "p")
                return (
                    <Typography key={i} sx={{ color: "#334155", lineHeight: 1.75, mb: 1.5, whiteSpace: "pre-line" }}>
                        <Inline text={b.text} />
                    </Typography>
                );
            return (
                <Box
                    key={i}
                    component={b.t}
                    sx={{ pl: 3, m: 0, mb: 1.5, "& li": { mb: 1, color: "#334155", lineHeight: 1.7 }, "& li::marker": { color: "#3b82f6", fontWeight: 700 } }}
                >
                    {b.items.map((it, j) => (
                        <li key={j}>
                            <Inline text={it} />
                        </li>
                    ))}
                </Box>
            );
        })}
    </>
);

const TABS = [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms & Conditions", to: "/terms-and-conditions" },
];

const LegalPage = ({ doc }: { doc: LegalDoc }) => {
    const { pathname, hash } = useLocation();
    const scrollRef = useRef<HTMLDivElement>(null);

    // reset scroll when switching pages; jump to #section when a hash is present
    useEffect(() => {
        if (hash) {
            scrollRef.current?.querySelector(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            scrollRef.current?.scrollTo({ top: 0 });
        }
    }, [pathname, hash]);

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            sx={{
                width: "100%",
                maxWidth: 860,
                // card scrolls internally so AuthLayout (overflow hidden, 100dvh) needs no change
                maxHeight: { xs: "calc(100dvh - 24px)", sm: "calc(100dvh - 48px)" },
                display: "flex",
                flexDirection: "column",
                borderRadius: { xs: "24px", sm: "32px" },
                bgcolor: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(16px)",
                border: "1px solid #fff",
                boxShadow: "0 24px 70px rgba(59,130,246,0.18), 0 0 0 1px #dbe7fb",
                overflow: "hidden",
            }}
        >
            {/* Sticky header */}
            <Box
                sx={{
                    px: { xs: 2, sm: 4 },
                    py: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1.5,
                    flexWrap: "wrap",
                    borderBottom: "1px solid #e5edff",
                    bgcolor: "rgba(224,242,254,0.6)",
                }}
            >
                <Typography sx={{ fontFamily: HEADING_FONT, fontSize: { xs: 18, sm: 22 }, color: BLUE }}>
                    Career OS <AnimatedRocket />
                </Typography>
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {TABS.map((t) => {
                        const active = pathname === t.to;
                        return (
                            <Button
                                key={t.to}
                                component={RouterLink}
                                to={t.to}
                                size="small"
                                sx={{
                                    borderRadius: "12px",
                                    textTransform: "none",
                                    fontWeight: 700,
                                    px: 2,
                                    color: active ? "#fff" : BLUE,
                                    bgcolor: active ? undefined : "#fff",
                                    border: "1px solid #dbe7fb",
                                    background: active ? "linear-gradient(135deg,#3b82f6,#1d4ed8)" : undefined,
                                    boxShadow: active ? "0 8px 18px rgba(37,99,235,0.3)" : "none",
                                    "&:hover": { bgcolor: active ? undefined : "#eff6ff" },
                                }}
                            >
                                {t.label}
                            </Button>
                        );
                    })}
                </Box>
            </Box>

            {/* Scrollable body */}
            <Box ref={scrollRef} sx={{ overflowY: "auto", px: { xs: 2, sm: 5 }, py: { xs: 3, sm: 4 }, scrollBehavior: "smooth" }}>
                <Box sx={{ textAlign: "center", mb: 3 }}>
                    <Typography
                        component="h1"
                        sx={{ fontFamily: HEADING_FONT, fontSize: { xs: 28, sm: 40 }, lineHeight: 1.15, color: BLUE }}
                    >
                        {doc.title}
                    </Typography>
                    <Typography sx={{ color: "#64748b", mt: 1.5 }}>{doc.subtitle}</Typography>
                    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap", mt: 2 }}>
                        <Chip label={`Effective: ${doc.effective}`} size="small" sx={{ bgcolor: "#fff", border: "1px solid #dbe7fb", fontWeight: 600, color: BLUE }} />
                        <Chip label={`Last updated: ${doc.updated}`} size="small" sx={{ bgcolor: "#fff", border: "1px solid #dbe7fb", fontWeight: 600, color: BLUE }} />
                    </Box>
                </Box>

                <Box sx={{ p: { xs: 2, sm: 3 }, borderRadius: "20px", bgcolor: "#f8fbff", border: "1px solid #e5edff", mb: 2.5 }}>
                    <Blocks blocks={doc.intro} />
                </Box>

                {/* Quick links */}
                <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 3 }}>
                    {doc.sections.map((s) => (
                        <Chip
                            key={s.id}
                            component="a"
                            href={`#${s.id}`}
                            clickable
                            size="small"
                            label={`${s.num}. ${s.title}`}
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                scrollRef.current?.querySelector(`#${s.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
                            }}
                            sx={{ bgcolor: "#eff6ff", color: BLUE, fontWeight: 600, "&:hover": { bgcolor: "#dbeafe" } }}
                        />
                    ))}
                </Box>

                {doc.sections.map((s) => (
                    <Box
                        id={s.id}
                        key={s.id}
                        component={motion.div}
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ root: scrollRef, once: true, amount: 0.15 }}
                        transition={{ duration: 0.45, ease: "easeOut" }}
                        sx={{ mb: 2.5, p: { xs: 2, sm: 3 }, borderRadius: "22px", bgcolor: "#fff", border: "1px solid #e5edff", boxShadow: "0 8px 24px rgba(59,130,246,0.07)", scrollMarginTop: 8 }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
                            <Box
                                sx={{
                                    flex: "none", width: 36, height: 36, borderRadius: "11px", display: "grid", placeItems: "center",
                                    color: "#fff", fontWeight: 800, fontSize: 15,
                                    background: "linear-gradient(135deg,#3b82f6,#6366f1)", boxShadow: "0 6px 14px rgba(79,70,229,0.3)",
                                }}
                            >
                                {s.num}
                            </Box>
                            <Typography component="h2" sx={{ fontFamily: HEADING_FONT, fontSize: { xs: 16, sm: 19 }, color: BLUE }}>
                                {s.title}
                            </Typography>
                        </Box>
                        <Blocks blocks={s.blocks} />
                    </Box>
                ))}

                <Box sx={{ textAlign: "center", pt: 1, pb: 1 }}>
                    <Button
                        component={RouterLink}
                        to="/login"
                        startIcon={<ArrowBackIcon />}
                        sx={{
                            textTransform: "none", fontWeight: 800, color: "#fff", px: 4, py: 1.25, borderRadius: "14px",
                            background: "linear-gradient(180deg,#3b8bff,#1d63f0)", boxShadow: "0 10px 26px rgba(37,99,235,0.35)",
                        }}
                    >
                        Back to Login
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default LegalPage;