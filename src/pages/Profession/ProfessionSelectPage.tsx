import { useMemo, useState } from "react";
import {
    Box,
    Button,
    Chip,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
    alpha,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import WorkspacePremiumRoundedIcon from "@mui/icons-material/WorkspacePremiumRounded";
import LayersRoundedIcon from "@mui/icons-material/LayersRounded";
import { motion, type Variants } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useProfession } from "./UseProfession";
import { getProfession, PROFESSIONS, type ProfessionId } from "./ProfessionConfig";

const themeStyles = {
    titleColor: "#1d4ed8",
    subtitleColor: "#3b82f6",
    iconColor: "#2563eb",
    activeGradient: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
    activeShadow: "0 8px 20px rgba(37, 99, 235, 0.35)",
    glassBg: "rgba(255, 255, 255, 0.65)",
    glassBorder: "1px solid rgba(255, 255, 255, 0.8)",
    glassFilter: "blur(16px)",
    softShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.08)",
};
const FONT = "'Plus Jakarta Sans', sans-serif";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.05, when: "beforeChildren" },
    },
};
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const glass = {
    bgcolor: themeStyles.glassBg,
    backdropFilter: themeStyles.glassFilter,
    WebkitBackdropFilter: themeStyles.glassFilter,
    border: themeStyles.glassBorder,
};

const ProfessionSelectPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { profession, setProfession } = useProfession();

    // Ignore stale/legacy ids (e.g. a previously saved "other")
    const [selected, setSelected] = useState<ProfessionId | null>(
        getProfession(profession)?.id ?? null,
    );
    const [query, setQuery] = useState("");

    // Opened from profile ("change profession") vs first time after signup
    const isChange = Boolean(location.state?.change);

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return PROFESSIONS;
        return PROFESSIONS.filter((p) =>
            `${p.title} ${p.description}`.toLowerCase().includes(q),
        );
    }, [query]);

    const selectedDef = getProfession(selected);

    const handleContinue = () => {
        if (!selected) return;
        setProfession(selected);
        navigate("/candidate/profile", { replace: true });
    };

    return (
        <Box sx={{ width: "100%", minHeight: "100%", overflowX: "hidden" }}>
            <motion.div variants={containerVariants} initial="hidden" animate="visible">
                {/* ───────── Header ───────── */}
                <motion.div variants={itemVariants}>
                    <Paper
                        elevation={0}
                        sx={{
                            ...glass,
                            p: { xs: 2, sm: 2.5, md: 3 },
                            mb: { xs: 2, md: 3 },
                            borderRadius: { xs: "20px", md: "24px" },
                            boxShadow: themeStyles.softShadow,
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 2, md: 3 }}
                            sx={{
                                justifyContent: "space-between",
                                alignItems: { xs: "stretch", md: "center" },
                            }}
                        >
                            <Stack direction="row" spacing={{ xs: 1.5, sm: 2 }} sx={{ alignItems: "center", minWidth: 0 }}>
                                <Box
                                    sx={{
                                        flexShrink: 0,
                                        width: { xs: 44, sm: 52 },
                                        height: { xs: 44, sm: 52 },
                                        borderRadius: "16px",
                                        display: "grid",
                                        placeItems: "center",
                                        color: "#fff",
                                        background: themeStyles.activeGradient,
                                        boxShadow: themeStyles.activeShadow,
                                    }}
                                >
                                    <WorkspacePremiumRoundedIcon sx={{ fontSize: { xs: 24, sm: 28 } }} />
                                </Box>
                                <Box sx={{ minWidth: 0 }}>
                                    <Typography
                                        component="h1"
                                        sx={{
                                            fontSize: { xs: 20, sm: 26, md: 30 },
                                            lineHeight: 1.2,
                                            fontWeight: 800,
                                            color: themeStyles.titleColor,
                                            fontFamily: FONT,
                                        }}
                                    >
                                        Choose your profession
                                    </Typography>
                                    <Typography
                                        sx={{
                                            mt: 0.5,
                                            color: themeStyles.subtitleColor,
                                            fontFamily: FONT,
                                            fontWeight: 600,
                                            fontSize: { xs: 12.5, sm: 14 },
                                        }}
                                    >
                                        We'll tailor your profile steps and resume sections to your field.
                                    </Typography>
                                </Box>
                            </Stack>

                            <TextField
                                size="small"
                                placeholder="Search profession…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                aria-label="Search profession"
                                sx={{
                                    width: { xs: "100%", md: 300 },
                                    flexShrink: 0,
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "14px",
                                        bgcolor: "rgba(255,255,255,0.75)",
                                        fontFamily: FONT,
                                    },
                                }}
                                slotProps={{
                                    input: {
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchRoundedIcon sx={{ color: themeStyles.iconColor }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: query ? (
                                            <InputAdornment position="end">
                                                <IconButton size="small" aria-label="Clear search" onClick={() => setQuery("")}>
                                                    <CloseRoundedIcon fontSize="small" />
                                                </IconButton>
                                            </InputAdornment>
                                        ) : null,
                                    },
                                }}
                            />
                        </Stack>
                    </Paper>
                </motion.div>

                {/* ───────── Profession cards ───────── */}
                <Box
                    role="radiogroup"
                    aria-label="Profession"
                    sx={{
                        display: "grid",
                        gap: { xs: 1.25, sm: 2, md: 2.25 },
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, minmax(0, 1fr))",
                            lg: "repeat(3, minmax(0, 1fr))",
                            xl: "repeat(4, minmax(0, 1fr))",
                        },
                    }}
                >
                    {filtered.map((p) => {
                        const active = selected === p.id;
                        const Icon = p.icon;
                        return (
                            <motion.div key={p.id} variants={itemVariants} style={{ height: "100%" }}>
                                <Paper
                                    elevation={0}
                                    role="radio"
                                    aria-checked={active}
                                    tabIndex={0}
                                    onClick={() => setSelected(p.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setSelected(p.id);
                                        }
                                    }}
                                    sx={{
                                        position: "relative",
                                        height: "100%",
                                        boxSizing: "border-box",
                                        p: { xs: 1.75, sm: 2.25 },
                                        WebkitTapHighlightColor: "transparent",
                                        userSelect: "none",
                                        willChange: "transform",
                                        cursor: "pointer",
                                        borderRadius: "20px",
                                        outline: "none",
                                        overflow: "hidden",
                                        bgcolor: active ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.78)",
                                        border: active
                                            ? `1.5px solid ${p.accent}`
                                            : "1.5px solid rgba(255,255,255,0.8)",
                                        boxShadow: active
                                            ? `0 12px 28px -6px ${alpha(p.accent, 0.35)}`
                                            : themeStyles.softShadow,
                                        transition:
                                            "transform .2s cubic-bezier(.2,.8,.2,1), border-color .2s, box-shadow .2s, background-color .2s",
                                        "&:hover": {
                                            transform: "translateY(-2px)",
                                            boxShadow: `0 14px 30px -8px ${alpha(p.accent, 0.3)}`,
                                        },
                                        "&:active": { transform: "translateY(0)" },
                                        "&:focus-visible": {
                                            boxShadow: `0 0 0 3px ${alpha(p.accent, 0.4)}`,
                                        },
                                        // soft accent wash in the corner
                                        "&::before": {
                                            content: '""',
                                            position: "absolute",
                                            top: -50,
                                            right: -50,
                                            width: 140,
                                            height: 140,
                                            borderRadius: "50%",
                                            background: `radial-gradient(circle, ${alpha(p.accent, active ? 0.18 : 0.09)} 0%, transparent 70%)`,
                                            pointerEvents: "none",
                                            transition: "background .2s",
                                        },
                                    }}
                                >
                                    <Stack direction="row" spacing={1.75} sx={{ alignItems: "flex-start", position: "relative" }}>
                                        <Box
                                            sx={{
                                                flexShrink: 0,
                                                width: { xs: 46, sm: 52 },
                                                height: { xs: 46, sm: 52 },
                                                borderRadius: "15px",
                                                display: "grid",
                                                placeItems: "center",
                                                color: active ? "#fff" : p.accent,
                                                bgcolor: active ? p.accent : alpha(p.accent, 0.12),
                                                border: `1px solid ${alpha(p.accent, active ? 0 : 0.2)}`,
                                                boxShadow: active ? `0 8px 18px ${alpha(p.accent, 0.4)}` : "none",
                                                transition: "background-color .2s, color .2s, box-shadow .2s, border-color .2s",
                                            }}
                                        >
                                            <Icon sx={{ fontSize: { xs: 24, sm: 26 } }} />
                                        </Box>

                                        <Box sx={{ minWidth: 0, flex: 1, pr: 3.5 }}>
                                            <Typography
                                                sx={{
                                                    fontFamily: FONT,
                                                    fontWeight: 800,
                                                    fontSize: { xs: 15, sm: 16 },
                                                    lineHeight: 1.3,
                                                    color: themeStyles.titleColor,
                                                }}
                                            >
                                                {p.title}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: FONT,
                                                    fontWeight: 500,
                                                    fontSize: 13,
                                                    lineHeight: 1.5,
                                                    color: "text.secondary",
                                                    mt: 0.5,
                                                }}
                                            >
                                                {p.description}
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                spacing={0.5}
                                                sx={{ mt: 1.25, alignItems: "center", color: alpha("#0f172a", 0.55) }}
                                            >
                                                <LayersRoundedIcon sx={{ fontSize: 15 }} />
                                                <Typography sx={{ fontFamily: FONT, fontSize: 12, fontWeight: 600 }}>
                                                    +{p.extraSteps.length} specialised sections
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>

                                    {/* selection indicator (radio-style) */}
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: { xs: 14, sm: 16 },
                                            right: { xs: 14, sm: 16 },
                                            width: 22,
                                            height: 22,
                                            borderRadius: "50%",
                                            display: "grid",
                                            placeItems: "center",
                                            color: "#fff",
                                            bgcolor: active ? p.accent : "transparent",
                                            border: `2px solid ${active ? p.accent : alpha("#64748b", 0.35)}`,
                                            transition: "background-color .2s, border-color .2s",
                                        }}
                                    >
                                        {active && <CheckRoundedIcon sx={{ fontSize: 15 }} />}
                                    </Box>
                                </Paper>
                            </motion.div>
                        );
                    })}
                </Box>

                {filtered.length === 0 && (
                    <Paper
                        elevation={0}
                        sx={{ ...glass, borderRadius: "20px", py: 6, px: 2, textAlign: "center", boxShadow: themeStyles.softShadow }}
                    >
                        <SearchRoundedIcon sx={{ fontSize: 36, color: alpha(themeStyles.iconColor, 0.5) }} />
                        <Typography sx={{ fontFamily: FONT, fontWeight: 700, color: themeStyles.titleColor, mt: 1 }}>
                            No profession found
                        </Typography>
                        <Typography sx={{ fontFamily: FONT, fontSize: 13, color: "text.secondary", mt: 0.5 }}>
                            Try a different keyword, like "software" or "law".
                        </Typography>
                        <Button onClick={() => setQuery("")} sx={{ mt: 1.5, textTransform: "none", fontFamily: FONT, fontWeight: 700 }}>
                            Clear search
                        </Button>
                    </Paper>
                )}

                {/* ───────── Selected summary + action bar ───────── */}
                <motion.div
                    variants={itemVariants}
                    style={{ position: "sticky", bottom: 12, zIndex: 10, marginTop: 24 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            ...glass,
                            p: { xs: 1.5, sm: 2, md: 2.5 },
                            borderRadius: { xs: "18px", md: "20px" },
                            boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.18)",
                        }}
                    >
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            spacing={{ xs: 1.5, md: 2 }}
                            sx={{
                                justifyContent: "space-between",
                                alignItems: { xs: "stretch", md: "center" },
                            }}
                        >
                            <Box sx={{ minWidth: 0, flex: 1 }}>
                                <Typography
                                    noWrap
                                    sx={{ fontFamily: FONT, fontWeight: 700, fontSize: { xs: 13, sm: 14 }, color: themeStyles.titleColor }}
                                >
                                    {selectedDef
                                        ? `${selectedDef.title} — profile includes:`
                                        : "Select a profession to continue"}
                                </Typography>
                                {/* Fixed-height single row: selecting a card can never resize the bar */}
                                <Stack
                                    direction="row"
                                    sx={{
                                        gap: 0.75,
                                        mt: 1,
                                        height: 26,
                                        alignItems: "center",
                                        flexWrap: "nowrap",
                                        overflowX: "auto",
                                        overflowY: "hidden",
                                        scrollbarWidth: "none",
                                        "&::-webkit-scrollbar": { display: "none" },
                                    }}
                                >
                                    {selectedDef ? (
                                        <>
                                            <Chip
                                                size="small"
                                                label="Common steps"
                                                sx={{
                                                    flexShrink: 0,
                                                    fontWeight: 600,
                                                    bgcolor: alpha(themeStyles.iconColor, 0.1),
                                                    color: themeStyles.titleColor,
                                                }}
                                            />
                                            {selectedDef.extraSteps.map((st) => (
                                                <Chip
                                                    key={st.key + st.title}
                                                    size="small"
                                                    label={st.title}
                                                    sx={{
                                                        flexShrink: 0,
                                                        fontWeight: 600,
                                                        background: themeStyles.activeGradient,
                                                        color: "#fff",
                                                    }}
                                                />
                                            ))}
                                        </>
                                    ) : (
                                        <Typography sx={{ fontFamily: FONT, fontSize: 12, color: "text.secondary" }}>
                                            Your profession-specific sections will appear here.
                                        </Typography>
                                    )}
                                </Stack>
                            </Box>

                            <Stack direction="row" spacing={1.25} sx={{ flexShrink: 0 }}>
                                {isChange && (
                                    <Button
                                        variant="outlined"
                                        onClick={() => navigate(-1)}
                                        sx={{
                                            flex: { xs: 1, md: "none" },
                                            borderRadius: "14px",
                                            textTransform: "none",
                                            fontFamily: FONT,
                                            fontWeight: 700,
                                            color: themeStyles.titleColor,
                                            borderColor: "rgba(59, 130, 246, 0.4)",
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                )}
                                <Button
                                    variant="contained"
                                    disabled={!selected}
                                    onClick={handleContinue}
                                    endIcon={<ArrowForwardRoundedIcon />}
                                    sx={{
                                        flex: { xs: 1, md: "none" },
                                        background: themeStyles.activeGradient,
                                        boxShadow: themeStyles.activeShadow,
                                        borderRadius: "14px",
                                        textTransform: "none",
                                        fontFamily: FONT,
                                        fontWeight: 700,
                                        px: 3.5,
                                        py: 1.1,
                                        "&.Mui-disabled": {
                                            background: "rgba(148,163,184,0.35)",
                                            boxShadow: "none",
                                            color: "#fff",
                                        },
                                    }}
                                >
                                    Continue
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                </motion.div>
            </motion.div>
        </Box>
    );
};

export default ProfessionSelectPage;