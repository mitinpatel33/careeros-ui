import React from "react";
import { Avatar, Box, Chip, Grid, Stack, Typography } from "@mui/material";
import { AutoAwesome, SmartToy } from "@mui/icons-material";
import { heroFeatures } from "../data";
import { MotionPaper } from "./shared";

const ring = (right: string, top: string, size: number, dashed = false) => ({
  position: "absolute",
  right,
  top,
  width: size,
  height: size,
  border: `1px ${dashed ? "dashed" : "solid"} rgba(145,130,255,${dashed ? 0.45 : 0.25})`,
  borderRadius: "50%",
  display: { xs: "none", sm: "block" },
});

export const HeroBanner: React.FC = () => (
  <MotionPaper
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    sx={{
      position: "relative",
      zIndex: 1,
      overflow: "hidden",
      borderRadius: { xs: "18px", md: "20px" },
      p: { xs: 2.25, sm: 3, md: 3.5 },
      color: "white",
      background:
        "radial-gradient(circle at 85% 40%, rgba(82,79,230,.42), transparent 28%), linear-gradient(110deg,#111b3e 0%,#18275c 55%,#111c49 100%)",
      border: "1px solid rgba(156,173,255,.3)",
      boxShadow: "0 15px 35px rgba(31,52,112,.18)",
    }}
  >
    <Box sx={ring("16%", "20%", 150)} />
    <Box sx={ring("11%", "32%", 95, true)} />
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      sx={{
        position: "relative",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ maxWidth: 720 }}>
        <Chip
          icon={
            <AutoAwesome
              sx={{ color: "#fff !important", fontSize: "15px !important" }}
            />
          }
          label="AI POWERED"
          size="small"
          sx={{
            mb: 1.4,
            bgcolor: "rgba(92,103,255,.5)",
            color: "#fff",
            border: "1px solid rgba(190,195,255,.25)",
            fontWeight: 800,
            letterSpacing: ".3px",
          }}
        />
        <Typography
          sx={{
            fontWeight: 850,
            lineHeight: 1.18,
            fontSize: { xs: "1.45rem", sm: "1.8rem", md: "2rem" },
            letterSpacing: "-.5px",
          }}
        >
          AI for Interview Questions/Answers
        </Typography>
        <Typography
          sx={{
            mt: 1,
            color: "#e1e9ff",
            fontSize: { xs: ".85rem", sm: ".98rem" },
          }}
        >
          Get job title wise questions, model answers and practice with AI.
        </Typography>
        <Grid
          container
          spacing={1.2}
          sx={{ mt: { xs: 2, sm: 2.5 }, maxWidth: 790 }}
        >
          {heroFeatures.map((item) => (
            <Grid key={item.title} size={{ xs: 6, sm: 3 }}>
              <Stack
                direction="row"
                spacing={1}
                sx={{ height: "100%", alignItems: "center" }}
              >
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 38,
                    height: 38,
                    bgcolor: "rgba(117,105,255,.32)",
                    color: "#fff",
                    border: "1px solid rgba(190,190,255,.18)",
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontSize: { xs: ".68rem", sm: ".75rem" },
                      fontWeight: 800,
                      lineHeight: 1.25,
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: ".62rem", sm: ".68rem" },
                      color: "#c8d5ff",
                      lineHeight: 1.3,
                    }}
                  >
                    {item.sub}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          alignItems: "center",
          justifyContent: "center",
          minWidth: 145,
          pr: 1,
        }}
      >
        <Box
          sx={{
            width: 112,
            height: 112,
            borderRadius: "30px",
            background: "linear-gradient(145deg,#7e9aff,#4b51df)",
            boxShadow: "0 0 35px rgba(103,111,255,.4)",
            display: "grid",
            placeItems: "center",
            border: "2px solid rgba(255,255,255,.35)",
          }}
        >
          <SmartToy sx={{ fontSize: 72, color: "#fff" }} />
        </Box>
      </Box>
    </Stack>
  </MotionPaper>
);
