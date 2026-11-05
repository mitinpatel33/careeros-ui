import { useEffect, useRef, type ReactNode } from "react";
import { Box, ButtonBase, LinearProgress, Stack, Typography } from "@mui/material";
import { glass } from "./glass";

export interface StepItem {
    key: string;
    label: string;
    icon: ReactNode;
}

interface Props {
    steps: StepItem[];
    active: string;
    onChange: (key: string) => void;
    /** 0-100 profile completion */
    completion?: number;
}

const StepNavMobile = ({ steps, active, onChange, completion }: Props) => {
    const activeRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        activeRef.current?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    }, [active]);

    return (
        <Box sx={{ bgcolor: glass.cardBg, backdropFilter: glass.backdropFilter, WebkitBackdropFilter: glass.backdropFilter, border: glass.border, borderRadius: "16px", p: 1.25, mb: 1.5 }}>
            {completion !== undefined && (
                <Box sx={{ mb: 1, px: 0.5 }}>
                    <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.5 }}>
                        <Typography sx={{ fontSize: 12, fontWeight: 700 }}>Completion</Typography>
                        <Typography sx={{ fontSize: 12, fontWeight: 800, color: "#2563eb" }}>{completion}%</Typography>
                    </Stack>
                    <LinearProgress variant="determinate" value={completion} sx={{ height: 6, borderRadius: 3 }} />
                </Box>
            )}

            <Stack
                direction="row"
                spacing={1}
                role="tablist"
                sx={{ overflowX: "auto", scrollSnapType: "x proximity", pb: 0.5, scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
            >
                {steps.map((s) => {
                    const on = s.key === active;
                    return (
                        <ButtonBase
                            key={s.key}
                            ref={on ? activeRef : undefined}
                            role="tab"
                            aria-selected={on}
                            onClick={() => onChange(s.key)}
                            sx={{
                                flexShrink: 0, scrollSnapAlign: "center", gap: 0.75, px: 1.5, py: 1, minHeight: 40, borderRadius: "999px",
                                fontSize: 13, fontWeight: 700, fontFamily: glass.fontFamily,
                                color: on ? "#fff" : "#1e3a8a",
                                background: on ? "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)" : "rgba(255,255,255,.8)",
                                border: on ? "none" : "1px solid rgba(148,163,184,.4)",
                                "& svg": { fontSize: 18 },
                            }}
                        >
                            {s.icon}
                            {s.label}
                        </ButtonBase>
                    );
                })}
            </Stack>
        </Box>
    );
};

export default StepNavMobile;