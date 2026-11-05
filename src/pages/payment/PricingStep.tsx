import { useState } from "react";
import { Box, Button, Chip, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

import { PLANS, TIER_RANK, formatINR, yearlySavingPct, type Billing, type Plan, type PlanId } from "../../types/plans";
import { TIER_THEME, glass } from "./glass";
import { useRazorpay } from "../../hooks/usePayment";
import { useSubscription } from "../../hooks/useSubscription";
import CheckoutDialog from "./CheckoutDialog";

interface Props {
    user: { name: string; email: string; phone?: string };
    /** plan to emphasise, e.g. the tier of a locked template the user just tapped */
    highlight?: PlanId;
    onBack?: () => void;
    onDone?: () => void;
}

/* The layout adapts to the width of the panel it sits in (container queries), not the screen:
   < 520px  -> stacked cards (phones)
   520-899  -> one wide row per plan (info left, features right)
   >= 900   -> three equal columns */
const ROW = "@container (min-width: 520px) and (max-width: 899.98px)";
const WIDE = "@container (min-width: 900px)";

const PricingStep = ({ user, highlight, onBack, onDone }: Props) => {
    const { sub, plan: current } = useSubscription();
    const [billing, setBilling] = useState<Billing>("monthly");
    const [selected, setSelected] = useState<Plan | null>(null);
    const { pay, status, error, result, reset } = useRazorpay(user);

    const [picked, setPicked] = useState<PlanId>(highlight ?? "pro");

    const closeDialog = () => {
        const wasSuccess = status === "success";
        setSelected(null);
        reset();
        if (wasSuccess) onDone?.();
    };

    const gradientOn = "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)";

    return (
        <Box
            sx={{
                width: "100%",
                p: { xs: 1.5, sm: 2.5, md: 3.5 },
                bgcolor: glass.containerBg,
                backdropFilter: glass.backdropFilter,
                WebkitBackdropFilter: glass.backdropFilter,
                border: glass.border,
                borderRadius: { xs: "18px", md: "24px" },
                boxShadow: "0 10px 30px -5px rgba(37, 99, 235, 0.05)",
            }}
        >
            <Typography align="center" sx={{ fontWeight: 800, color: "#1e3a8a", fontFamily: glass.fontFamily, fontSize: { xs: 22, md: 28 }, letterSpacing: "-0.01em" }}>
                Choose your plan
            </Typography>
            <Typography align="center" sx={{ color: "#3b82f6", mb: 2.5, fontFamily: glass.fontFamily, fontWeight: 600, fontSize: { xs: 13, md: 14 } }}>
                Unlock every template and publish your profile with your own link.
            </Typography>

            {/* billing toggle */}
            <Stack sx={{ alignItems: "center", mb: { xs: 2.5, md: 3.5 } }}>
                <ToggleButtonGroup
                    exclusive
                    value={billing}
                    onChange={(_, v: Billing | null) => v && setBilling(v)}
                    sx={{ bgcolor: "rgba(255,255,255,.75)", borderRadius: "999px", p: 0.5, width: { xs: "100%", sm: "auto" }, maxWidth: 360, boxShadow: "inset 0 0 0 1px rgba(148,163,184,.25)" }}
                >
                    {(["monthly", "yearly"] as const).map((b) => (
                        <ToggleButton
                            key={b}
                            value={b}
                            sx={{
                                flex: 1, border: 0, borderRadius: "999px !important", textTransform: "none", fontWeight: 700, px: 3, fontFamily: glass.fontFamily, gap: 1,
                                "&.Mui-selected": { color: "#fff", background: gradientOn, boxShadow: "0 4px 12px rgba(37,99,235,.35)" },
                                "&.Mui-selected:hover": { background: gradientOn },
                            }}
                        >
                            {b === "monthly" ? "Monthly" : "Yearly"}
                            {b === "yearly" && <Chip size="small" label="Save 17%" sx={{ height: 20, fontSize: 11, fontWeight: 700, bgcolor: "#dcfce7", color: "#15803d" }} />}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            </Stack>

            {/* plans – the wrapper is the query container */}
            <Box sx={{ containerType: "inline-size" }}>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: 2,
                        alignItems: "stretch",
                        [WIDE]: { gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 2.5 },
                    }}
                >
                    {PLANS.map((p) => {
                        const t = TIER_THEME[p.id];
                        const owned = TIER_RANK[current] >= TIER_RANK[p.id];
                        const isCurrent = current === p.id;
                        const emphasised = picked === p.id; // selected card
                        const badge = highlight === p.id ? "Needed" : p.popular ? "Popular" : null;
                        const price = p.price[billing];

                        const sub2 =
                            price === 0
                                ? "No card needed"
                                : billing === "yearly"
                                    ? `≈ ${formatINR(Math.round(price / 12))}/month · ${yearlySavingPct(p)}% off`
                                    : "Billed monthly";

                        return (
                            <Box
                                key={p.id}
                                onClick={() => setPicked(p.id)}
                                aria-pressed={emphasised}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr",
                                    gridTemplateRows: "auto 1fr",
                                    boxSizing: "border-box",
                                    p: { xs: 2, md: 2.5 },
                                    borderRadius: "20px",
                                    border: `2px solid ${emphasised ? t.c : "rgba(255,255,255,.95)"}`,
                                    background: emphasised ? `linear-gradient(180deg, ${t.soft} 0%, rgba(255,255,255,.82) 45%)` : glass.cardBg,
                                    backdropFilter: glass.backdropFilter,
                                    boxShadow: emphasised ? `0 14px 30px ${t.soft}` : "0 4px 14px rgba(15,23,42,.04)",
                                    transition: "box-shadow .2s, transform .2s",
                                    "&:hover": { boxShadow: `0 16px 32px ${t.soft}`, transform: "translateY(-2px)" },
                                    [ROW]: { gridTemplateColumns: "minmax(210px, 250px) 1fr", gridTemplateRows: "auto", columnGap: 3, alignItems: "center" },
                                }}
                            >
                                {/* info: name, price, button – identical structure in every card so everything lines up */}
                                <Box sx={{ display: "flex", flexDirection: "column" }}>
                                    <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
                                        {badge && (
                                            <Chip
                                                size="small"
                                                label={badge}
                                                sx={{ height: 22, background: t.gradient, color: "#fff", fontWeight: 800, fontSize: 11 }}
                                            />
                                        )}
                                        {/* radio-style selected indicator */}
                                        <Box
                                            sx={{
                                                width: 20, height: 20, borderRadius: "50%", display: "grid", placeItems: "center", transition: "all .2s",
                                                border: `2px solid ${emphasised ? t.c : "rgba(148,163,184,.6)"}`, bgcolor: emphasised ? t.c : "transparent", color: "#fff",
                                            }}
                                        >
                                            {emphasised && <CheckRoundedIcon sx={{ fontSize: 13 }} />}
                                        </Box>
                                    </Stack>

                                    <Typography sx={{ color: "#64748b", fontSize: 13, lineHeight: 1.45, fontFamily: glass.fontFamily, [WIDE]: { minHeight: 38 } }}>{p.tagline}</Typography>

                                    <Stack direction="row" sx={{ alignItems: "baseline", columnGap: 0.75, mt: 1.5 }}>
                                        <Typography sx={{ fontWeight: 800, fontSize: { xs: 32, md: 36 }, color: t.c, fontFamily: glass.fontFamily, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                                            {price === 0 ? "₹0" : formatINR(price)}
                                        </Typography>
                                        <Typography sx={{ color: "#64748b", fontSize: 13 }}>{price === 0 ? "forever" : billing === "monthly" ? "/ month" : "/ year"}</Typography>
                                    </Stack>
                                    <Typography sx={{ color: price === 0 ? "#64748b" : "#15803d", fontSize: 12, fontWeight: 700, minHeight: 18, mt: 0.25, mb: 1.75 }}>{sub2}</Typography>

                                    <Button
                                        fullWidth
                                        variant={owned ? "outlined" : "contained"}
                                        disabled={owned}
                                        onClick={() => setSelected(p)}
                                        startIcon={owned ? undefined : <LockRoundedIcon sx={{ fontSize: 16 }} />}
                                        sx={{
                                            height: 44, borderRadius: "12px", textTransform: "none", fontWeight: 800, fontFamily: glass.fontFamily,
                                            ...(owned ? {} : { background: t.gradient, boxShadow: `0 8px 18px ${t.soft}` }),
                                        }}
                                    >
                                        {isCurrent ? "Current plan" : owned ? "Included" : `Get ${p.name}`}
                                    </Button>
                                </Box>

                                {/* features */}
                                <Stack
                                    spacing={1.1}
                                    sx={{
                                        mt: 2, pt: 2, borderTop: "1px dashed rgba(100,116,139,.35)",
                                        [ROW]: { mt: 0, pt: 0, borderTop: "none", pl: 3, borderLeft: "1px dashed rgba(100,116,139,.35)", alignSelf: "stretch", justifyContent: "center" },
                                    }}
                                >
                                    {p.features.map((f) => (
                                        <Stack key={f} direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
                                            <Box sx={{ width: 18, height: 18, borderRadius: "50%", bgcolor: t.soft, color: t.c, display: "grid", placeItems: "center", flexShrink: 0, mt: "1px" }}>
                                                <CheckRoundedIcon sx={{ fontSize: 13 }} />
                                            </Box>
                                            <Typography sx={{ fontSize: 13.5, lineHeight: 1.4, color: "#334155", fontFamily: glass.fontFamily }}>{f}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            {/* trust strip */}
            <Typography align="center" sx={{ mt: 3, fontSize: 12.5, color: "#64748b", fontFamily: glass.fontFamily, lineHeight: 1.6 }}>
                <LockRoundedIcon sx={{ fontSize: 14, mr: 0.75, verticalAlign: "-2px" }} />
                Secure payments by Razorpay · UPI, cards &amp; netbanking · One-time payment, no auto-renewal
            </Typography>

            {sub?.expiresAt && current !== "free" && (
                <Typography align="center" sx={{ mt: 1, fontSize: 12.5, color: "#475569", fontFamily: glass.fontFamily }}>
                    Your {current} plan is active until {new Date(sub.expiresAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}.
                </Typography>
            )}

            {onBack && (
                <Stack direction="row" sx={{ mt: { xs: 2.5, md: 3.5 }, justifyContent: "flex-start" }}>
                    <Button
                        variant="outlined"
                        onClick={onBack}
                        sx={{ minWidth: 100, borderRadius: "12px", textTransform: "none", fontWeight: 700, color: "#1d4ed8", borderColor: "rgba(147,197,253,.8)", bgcolor: "rgba(255,255,255,.6)" }}
                    >
                        Back
                    </Button>
                </Stack>
            )}

            <CheckoutDialog
                open={!!selected}
                plan={selected}
                billing={billing}
                status={status}
                error={error}
                expiresAt={result?.expiresAt}
                onPay={() => selected && void pay(selected.id, billing)}
                onClose={closeDialog}
            />
        </Box>
    );
};

export default PricingStep;