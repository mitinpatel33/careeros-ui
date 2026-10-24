import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { AutoAwesome } from "@mui/icons-material";
import { keyframes } from "@mui/system";

const spin = keyframes`to { transform: rotate(360deg); }`;
const pulse = keyframes`
  0%, 100% { transform: scale(1);    box-shadow: 0 0 0 0 rgba(88,86,245,.35); }
  50%      { transform: scale(1.06); box-shadow: 0 0 0 14px rgba(88,86,245,0); }
`;
const shimmer = keyframes`
  0%   { background-position: -420px 0; }
  100% { background-position: 420px 0; }
`;
const fadeIn = keyframes`from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; }`;

const GRADIENT = "linear-gradient(100deg,#3769ff,#6858f5)";

interface Props {
    messages?: string[];
    /** number of skeleton lines to show under the orb */
    lines?: number;
}

export const AiLoader: React.FC<Props> = ({
    messages = [
        "AI is reading your role…",
        "Writing questions…",
        "Preparing model answers…",
        "Adding examples & tips…",
    ],
    lines = 3,
}) => {
    const [i, setI] = useState(0);

    useEffect(() => {
        const id = setInterval(() => setI((v) => (v + 1) % messages.length), 2200);
        return () => clearInterval(id);
    }, [messages.length]);

    return (
        <Stack spacing={2} sx={{ alignItems: "center", py: 2.5 }} role="status" aria-live="polite">
            {/* orb */}
            <Box sx={{ position: "relative", width: 64, height: 64 }}>
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "conic-gradient(from 0deg, #3769ff, #8b4de8, rgba(255,255,255,0) 70%)",
                        WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
                        mask: "radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 3px))",
                        animation: `${spin} 1.1s linear infinite`,
                    }}
                />
                <Box
                    sx={{
                        position: "absolute",
                        inset: 9,
                        borderRadius: "50%",
                        background: GRADIENT,
                        display: "grid",
                        placeItems: "center",
                        color: "#fff",
                        animation: `${pulse} 1.8s ease-in-out infinite`,
                    }}
                >
                    <AutoAwesome sx={{ fontSize: 22 }} />
                </Box>
            </Box>

            {/* rotating status text */}
            <Typography
                key={i}
                sx={{
                    color: "#4a5f8a",
                    fontWeight: 750,
                    fontSize: ".8rem",
                    animation: `${fadeIn} .35s ease`,
                }}
            >
                {messages[i]}
            </Typography>

            {/* skeleton lines */}
            <Stack spacing={1} sx={{ width: "100%", maxWidth: 460 }}>
                {Array.from({ length: lines }).map((_, n) => (
                    <Box
                        key={n}
                        sx={{
                            height: 10,
                            width: `${100 - n * 14}%`,
                            borderRadius: "6px",
                            background:
                                "linear-gradient(90deg,#eef2fb 0%,#dfe7ff 40%,#eef2fb 80%)",
                            backgroundSize: "840px 100%",
                            animation: `${shimmer} 1.4s linear infinite`,
                            animationDelay: `${n * 0.12}s`,
                        }}
                    />
                ))}
            </Stack>

            <Typography sx={{ color: "#8aa0c4", fontSize: ".68rem" }}>
                First time for this topic can take up to 10 seconds
            </Typography>
        </Stack>
    );
};