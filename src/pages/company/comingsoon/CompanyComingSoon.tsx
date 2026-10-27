import { useState } from "react";
import { Box, Typography, Stack, Button, TextField, Chip, LinearProgress } from "@mui/material";
import { CheckCircleRounded, ArrowBackRounded, BarChartRounded } from "@mui/icons-material";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LegalFooterLinks } from "../../legal-pages/LegalLinks";

const VIOLET_GLOW = {
    height: { xs: 46, sm: 52 },
    borderRadius: "14px",
    fontWeight: 700,
    fontSize: "0.95rem",
    fontFamily: "'Inter', -apple-system, sans-serif",
    textTransform: "none",
    color: "#fff",
    px: 3.5,
    whiteSpace: "nowrap",
    background: "linear-gradient(180deg, #b36bff 0%, #9333ea 55%, #7e22ce 100%)",
    boxShadow: `
    0 0 0 1px #fff,
    0 0 0 2.5px #e9d5ff,
    0 0 12px 2px rgba(168, 85, 247, 0.55),
    0 0 25px 6px rgba(168, 85, 247, 0.3),
    0 6px 18px rgba(126, 34, 206, 0.3)
  `,
    transition: "all 0.25s ease-in-out",
    "&:hover": {
        background: "linear-gradient(180deg, #c084fc 0%, #a24bf0 55%, #8b2bd8 100%)",
        transform: "translateY(-1px)",
    },
    "&:active": { transform: "translateY(1px)" },
    "&.Mui-disabled": { color: "#fff", opacity: 0.7 },
} as const;

const FEATURES = ["Job Posting System", "Candidate Search", "AI Match Engine", "Hiring Pipeline"];
const BUILD_PROGRESS = 72; // placeholder, set a real value or remove the block

const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};
const item: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CompanyComingSoon = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!EMAIL_RE.test(email.trim())) {
            setError("Please enter a valid email address.");
            return;
        }
        setError(null);
        setLoading(true);
        try {
            // TODO: connect your API, e.g.
            // await joinCompanyWaitlist({ email: email.trim() }).unwrap();
            await new Promise((r) => setTimeout(r, 600));
            setDone(true);
            setEmail("");
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            sx={{ width: "100%", maxWidth: 640, mx: "auto", px: { xs: 2, sm: 0 }, py: { xs: 2, sm: 4 } }}
        >
            <Box
                component={motion.div}
                variants={container}
                initial="hidden"
                animate="show"
                sx={{
                    textAlign: "center",
                    p: { xs: 2.5, sm: 5 },
                    borderRadius: { xs: "24px", sm: "32px" },
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(20px)",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 20px 50px -10px rgba(124,58,237,0.22), 0 10px 30px -15px rgba(56,189,248,0.25)",
                }}
            >
                {/* Brand */}
                <motion.div variants={item}>
                    <Typography
                        sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", sm: "1.6rem" }, color: "#2563eb", letterSpacing: "-0.5px" }}
                    >
                        Career OS{" "}
                        <Box
                            component={motion.span}
                            animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            sx={{ display: "inline-block", ml: 0.5 }}
                        >
                            🚀
                        </Box>
                    </Typography>
                </motion.div>

                {/* Status badge with pulsing dot */}
                <motion.div variants={item}>
                    <Chip
                        label="Company Portal"
                        icon={
                            <Box
                                component={motion.span}
                                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                                transition={{ duration: 1.6, repeat: Infinity }}
                                sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: "#a855f7", ml: "10px !important" }}
                            />
                        }
                        sx={{ mt: 2, bgcolor: "#f3e8ff", color: "#6d28d9", fontWeight: 700, border: "1px solid #e9d5ff" }}
                    />
                </motion.div>

                {/* Floating icon tile */}
                <motion.div variants={item}>
                    <Box
                        component={motion.div}
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        sx={{
                            width: 80, height: 80, mx: "auto", my: 3, borderRadius: "24px", display: "grid", placeItems: "center",
                            background: "linear-gradient(135deg,#f3e8ff,#ede9fe)",
                            boxShadow: "0 14px 30px rgba(124,58,237,0.22)",
                        }}
                    >
                        <BarChartRounded sx={{ fontSize: 42, color: "#7c3aed" }} />
                    </Box>
                </motion.div>

                {/* Heading */}
                <motion.div variants={item}>
                    <Typography
                        component="h1"
                        sx={{
                            fontFamily: '"Arial Black", Impact, sans-serif',
                            fontSize: { xs: "2rem", sm: "3rem" },
                            lineHeight: 1.12,
                            color: "#1e3a8a",
                        }}
                    >
                        Coming{" "}
                        <Box
                            component="span"
                            sx={{
                                background: "linear-gradient(135deg,#7c3aed,#2563eb)",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                color: "transparent",
                            }}
                        >
                            Soon
                        </Box>
                    </Typography>
                    <Typography sx={{ color: "#64748b", mt: 1.5, mx: "auto", maxWidth: 480, fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                        We&apos;re building a smarter way to hire. Post jobs, discover talent and manage your pipeline, all in one place.
                    </Typography>
                </motion.div>

                {/* Features */}
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 1.5,
                        mt: 3.5,
                        mx: "auto",
                        maxWidth: 500,
                        textAlign: "left",
                    }}
                >
                    {FEATURES.map((f) => (
                        <motion.div key={f} variants={item} whileHover={{ y: -2 }}>
                            <Stack
                                direction="row"
                                spacing={1.25}
                                sx={{
                                    alignItems: "center", p: 1.5, borderRadius: "14px", bgcolor: "#faf5ff", border: "1px solid #f0e6ff",
                                }}
                            >
                                <CheckCircleRounded sx={{ color: "#16a34a", fontSize: 20 }} />
                                <Typography sx={{ fontWeight: 700, fontSize: "0.9rem", color: "#334155" }}>{f}</Typography>
                            </Stack>
                        </motion.div>
                    ))}
                </Box>

                {/* Progress */}
                <motion.div variants={item}>
                    <Box sx={{ maxWidth: 500, mx: "auto", mt: 3.5, textAlign: "left" }}>
                        <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.75 }}>
                            <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>Build progress</Typography>
                            <Typography sx={{ fontSize: "0.8rem", fontWeight: 700, color: "#64748b" }}>{BUILD_PROGRESS}%</Typography>
                        </Stack>
                        <LinearProgress
                            variant="determinate"
                            value={BUILD_PROGRESS}
                            sx={{
                                height: 10, borderRadius: 999, bgcolor: "#ede9fe",
                                "& .MuiLinearProgress-bar": { borderRadius: 999, background: "linear-gradient(90deg,#a855f7,#3b82f6)", transition: "transform 1.4s ease-out" },
                            }}
                        />
                    </Box>
                </motion.div>

                {/* Notify form */}
                <motion.div variants={item}>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: "auto", mt: 3.5 }}>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Work email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value); if (error) setError(null); if (done) setDone(false); }}
                                error={Boolean(error)}
                                disabled={loading}
                                sx={{
                                    "& .MuiInputLabel-root": { color: "#64748b", fontSize: "0.85rem", "&.Mui-focused": { color: "#7c3aed" } },
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: "14px", bgcolor: "#fff", height: { xs: 46, sm: 52 },
                                        "& fieldset": { borderColor: "#e2e8f0" },
                                        "&:hover fieldset": { borderColor: "#cbd5e1" },
                                        "&.Mui-focused fieldset": { borderColor: "#a855f7", borderWidth: "1.5px" },
                                    },
                                }}
                            />
                            <Button type="submit" disabled={loading} sx={VIOLET_GLOW}>
                                {loading ? "Saving..." : "Notify Me"}
                            </Button>
                        </Stack>
                        <Box sx={{ minHeight: 24, mt: 1.25 }} role="status" aria-live="polite">
                            {error && <Typography sx={{ color: "#ef4444", fontSize: "0.85rem", fontWeight: 600 }}>{error}</Typography>}
                            {done && (
                                <Typography
                                    component={motion.p}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    sx={{ color: "#16a34a", fontSize: "0.85rem", fontWeight: 600 }}
                                >
                                    You&apos;re on the list! We&apos;ll email you when the Company Portal launches.
                                </Typography>
                            )}
                        </Box>
                    </Box>
                </motion.div>

                {/* Links */}
                <motion.div variants={item}>
                    <Stack direction="row" spacing={1} sx={{ justifyContent: "center", alignItems: "center", flexWrap: "wrap", mt: 1.5 }}>
                        <Button
                            startIcon={<ArrowBackRounded />}
                            onClick={() => navigate("/register")}
                            sx={{ textTransform: "none", fontWeight: 700, color: "#2563eb", borderRadius: "12px" }}
                        >
                            Back to Sign Up
                        </Button>
                    </Stack>
                    <Box sx={{ mt: 1.5 }}>
                        <LegalFooterLinks />
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
};

export default CompanyComingSoon;