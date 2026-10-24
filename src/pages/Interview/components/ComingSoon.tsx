import React from "react";
import { Avatar, Box, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import {
    AutoAwesome,
    BusinessCenter,
    Code,
    DataObject,
    Gavel,
    LocalHospital,
    MenuBook,
    Psychology,
    Quiz,
    School,
    SmartToy,
    TipsAndUpdates,
} from "@mui/icons-material";
import { keyframes } from "@mui/system";
import { cardSx, pageBackgroundSx } from "../styles";
import { PageHeader } from "./PageHeader";

const float = keyframes`0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}`;
const spin = keyframes`to{transform:rotate(360deg)}`;
const blink = keyframes`0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.7)}`;

// users who prefer less motion get a static page
const still = { "@media (prefers-reduced-motion: reduce)": { animation: "none" } };

const features = [
    { icon: <Quiz />, title: "Role-Based Q&A", text: "Questions and model answers for your job, course or class.", color: "#3475f6" },
    { icon: <Psychology />, title: "Mock Tests", text: "Timed multiple-choice tests with real scenarios.", color: "#7955e9" },
    { icon: <DataObject />, title: "Topic-Wise Practice", text: "Pick a skill or subject and practice just that.", color: "#0e9c72" },
    { icon: <TipsAndUpdates />, title: "Instant AI Feedback", text: "Explanations and tips to improve after every answer.", color: "#f59e0b" },
];

const audiences = [
    { label: "IT & Software", icon: <Code fontSize="small" /> },
    { label: "Law", icon: <Gavel fontSize="small" /> },
    { label: "School", icon: <School fontSize="small" /> },
    { label: "College", icon: <MenuBook fontSize="small" /> },
    { label: "Medical", icon: <LocalHospital fontSize="small" /> },
    { label: "Commerce & Finance", icon: <BusinessCenter fontSize="small" /> },
];

const Ring: React.FC<{ size: number; dashed?: boolean; reverse?: boolean }> = ({ size, dashed, reverse }) => (
    <Box
        sx={{
            position: "absolute",
            inset: "50% auto auto 50%",
            width: size,
            height: size,
            ml: `-${size / 2}px`,
            mt: `-${size / 2}px`,
            borderRadius: "50%",
            border: `1px ${dashed ? "dashed" : "solid"} rgba(145,130,255,${dashed ? 0.5 : 0.28})`,
            animation: `${spin} ${dashed ? 18 : 28}s linear infinite ${reverse ? "reverse" : ""}`,
            ...still,
        }}
    />
);

const Orb: React.FC = () => (
    <Box
        sx={{
            position: "relative",
            flexShrink: 0,
            width: { xs: 150, sm: 190, md: 230 },
            height: { xs: 150, sm: 190, md: 230 },
            animation: `${float} 4.5s ease-in-out infinite`,
            ...still,
        }}
    >
        <Ring size={230} />
        <Ring size={165} dashed reverse />
        <Box
            sx={{
                position: "absolute",
                inset: "50% auto auto 50%",
                width: { xs: 84, md: 118 },
                height: { xs: 84, md: 118 },
                transform: "translate(-50%,-50%)",
                borderRadius: "30px",
                background: "linear-gradient(145deg,#7e9aff,#4b51df)",
                boxShadow: "0 0 40px rgba(103,111,255,.5)",
                border: "2px solid rgba(255,255,255,.35)",
                display: "grid",
                placeItems: "center",
            }}
        >
            <SmartToy sx={{ fontSize: { xs: 52, md: 74 }, color: "#fff" }} />
        </Box>
    </Box>
);

export const ComingSoon: React.FC = () => (
    <Box sx={pageBackgroundSx}>
        <Box sx={{ maxWidth: "xl", mx: "auto" }}>
            <Stack spacing={{ xs: 1.5, sm: 2 }} sx={{ position: "relative", zIndex: 1 }}>
                <PageHeader />

                {/* hero */}
                <Paper
                    elevation={0}
                    sx={{
                        position: "relative",
                        overflow: "hidden",
                        color: "#fff",
                        borderRadius: { xs: "18px", md: "22px" },
                        p: { xs: 2.5, sm: 4, md: 5 },
                        background:
                            "radial-gradient(circle at 85% 40%, rgba(82,79,230,.45), transparent 32%), linear-gradient(110deg,#111b3e 0%,#18275c 55%,#111c49 100%)",
                        border: "1px solid rgba(156,173,255,.3)",
                        boxShadow: "0 15px 35px rgba(31,52,112,.18)",
                    }}
                >
                    <Stack
                        direction={{ xs: "column-reverse", md: "row" }}
                        spacing={{ xs: 2.5, md: 4 }}
                        sx={{ alignItems: "center", justifyContent: "space-between" }}
                    >
                        <Box sx={{ maxWidth: 660, textAlign: { xs: "center", md: "left" } }}>
                            <Chip
                                size="small"
                                icon={
                                    <Box
                                        component="span"
                                        sx={{
                                            width: 8,
                                            height: 8,
                                            ml: "10px !important",
                                            borderRadius: "50%",
                                            bgcolor: "#7cf0b0",
                                            animation: `${blink} 1.6s ease-in-out infinite`,
                                            ...still,
                                        }}
                                    />
                                }
                                label="COMING SOON"
                                sx={{
                                    mb: 1.6,
                                    bgcolor: "rgba(92,103,255,.5)",
                                    color: "#fff",
                                    border: "1px solid rgba(190,195,255,.25)",
                                    fontWeight: 800,
                                    letterSpacing: ".6px",
                                }}
                            />
                            <Typography
                                component="h1"
                                sx={{
                                    fontWeight: 850,
                                    lineHeight: 1.15,
                                    letterSpacing: "-.5px",
                                    fontSize: { xs: "1.6rem", sm: "2.1rem", md: "2.5rem" },
                                }}
                            >
                                AI Interview Assistant is on its way
                            </Typography>
                            <Typography
                                sx={{
                                    mt: 1.4,
                                    color: "#e1e9ff",
                                    fontSize: { xs: ".88rem", sm: "1rem" },
                                    lineHeight: 1.65,
                                }}
                            >
                                Practice role-wise questions, model answers and mock tests, for jobs, school,
                                college and competitive exams. We're putting the finishing touches on it.
                            </Typography>

                            <Stack
                                direction="row"
                                spacing={0.8}
                                useFlexGap
                                sx={{ mt: 2.5, flexWrap: "wrap", justifyContent: { xs: "center", md: "flex-start" } }}
                            >
                                {audiences.map((a) => (
                                    <Chip
                                        key={a.label}
                                        size="small"
                                        icon={a.icon}
                                        label={a.label}
                                        sx={{
                                            bgcolor: "rgba(255,255,255,.1)",
                                            color: "#e6ecff",
                                            border: "1px solid rgba(190,195,255,.2)",
                                            fontWeight: 650,
                                            "& .MuiChip-icon": { color: "#bcc8ff" },
                                        }}
                                    />
                                ))}
                            </Stack>
                        </Box>
                        <Orb />
                    </Stack>
                </Paper>

                {/* what's coming */}
                <Paper sx={{ ...cardSx, p: { xs: 1.75, sm: 2.5, md: 3 } }}>
                    <Stack direction="row" spacing={1} sx={{ mb: 2, alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "#edf2ff", color: "#3569f6", width: 36, height: 36 }}>
                            <AutoAwesome fontSize="small" />
                        </Avatar>
                        <Box>
                            <Typography sx={{ color: "#20345e", fontWeight: 850, fontSize: "1.05rem" }}>
                                What's coming
                            </Typography>
                            <Typography variant="caption" sx={{ color: "#7588aa" }}>
                                Everything you need to prepare, in one place.
                            </Typography>
                        </Box>
                    </Stack>

                    <Grid container spacing={{ xs: 1.2, sm: 1.5 }}>
                        {features.map((f) => (
                            <Grid key={f.title} size={{ xs: 12, sm: 6, lg: 3 }}>
                                <Box
                                    sx={{
                                        height: "100%",
                                        p: 2,
                                        borderRadius: "14px",
                                        border: "1px solid #e8eef9",
                                        bgcolor: "#fbfdff",
                                        transition: "transform .2s ease, box-shadow .2s ease",
                                        "&:hover": { transform: "translateY(-3px)", boxShadow: "0 10px 24px rgba(47,89,153,.1)" },
                                    }}
                                >
                                    <Avatar
                                        variant="rounded"
                                        sx={{ width: 42, height: 42, mb: 1.4, bgcolor: `${f.color}18`, color: f.color, borderRadius: "12px" }}
                                    >
                                        {f.icon}
                                    </Avatar>
                                    <Typography sx={{ color: "#263a60", fontWeight: 800, fontSize: ".92rem", mb: 0.5 }}>
                                        {f.title}
                                    </Typography>
                                    <Typography sx={{ color: "#6b7fa3", fontSize: ".8rem", lineHeight: 1.6 }}>
                                        {f.text}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
            </Stack>
        </Box>
    </Box>
);

export default ComingSoon;