import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { statCards } from "../data";
import { cardSx } from "../styles";
import { IconBadge, MotionPaper } from "./shared";
import type { DashboardStats } from "../../../services/interviewApi";

const format = (value: number | string | undefined) =>
  value === undefined
    ? "—"
    : typeof value === "number"
      ? value.toLocaleString()
      : value;

export const StatsGrid: React.FC<{ stats?: DashboardStats }> = ({ stats }) => (
  <Grid
    container
    spacing={{ xs: 1.2, sm: 1.5, md: 2 }}
    sx={{ position: "relative", zIndex: 1 }}
  >
    {statCards.map((item, index) => (
      <Grid key={item.key} size={{ xs: 6, md: 3 }}>
        <MotionPaper
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.06 }}
          whileHover={{ y: -3 }}
          sx={{ ...cardSx, p: { xs: 1.5, sm: 2 }, height: "100%" }}
        >
          <Stack direction="row" spacing={1.2} sx={{ alignItems: "flex-start" }}>
            <IconBadge color={item.color} size={44}>
              {item.icon}
            </IconBadge>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                sx={{
                  color: "#7183a5",
                  fontSize: { xs: ".68rem", sm: ".78rem" },
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Typography>
              <Typography
                sx={{
                  color: "#20345e",
                  fontWeight: 850,
                  fontSize: { xs: "1.35rem", sm: "1.8rem" },
                  lineHeight: 1.3,
                  mt: 0.25,
                }}
              >
                {format(stats?.[item.key])}
              </Typography>
              <Typography
                sx={{ color: "#8293b2", fontSize: { xs: ".62rem", sm: ".7rem" } }}
              >
                {item.caption}
              </Typography>
            </Box>
          </Stack>
        </MotionPaper>
      </Grid>
    ))}
  </Grid>
);
