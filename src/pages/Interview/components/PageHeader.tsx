import React from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { SmartToy } from "@mui/icons-material";
import { cardSx } from "../styles";

export const PageHeader: React.FC<{ initials?: string }> = ({
  initials = "MP",
}) => (
  <Paper
    elevation={0}
    sx={{
      ...cardSx,
      px: { xs: 1.5, sm: 2.5 },
      py: 1.25,
      borderRadius: "16px",
      background: "rgba(226,241,255,.82)",
      position: "relative",
      zIndex: 1,
    }}
  >
    <Stack
      direction="row"
      spacing={1.5}
      sx={{ alignItems: "center", justifyContent: "space-between" }}
    >
      <Stack
        direction="row"
        spacing={1.25}
        sx={{ alignItems: "center", minWidth: 0 }}
      >
        <Avatar
          sx={{ bgcolor: "#e5e9ff", color: "#3564f5", width: 40, height: 40 }}
        >
          <SmartToy />
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            sx={{
              color: "#2455df",
              fontWeight: 850,
              fontSize: { xs: "1rem", sm: "1.15rem" },
            }}
          >
            AI Interview Assistant
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: "#57739e", display: "block" }}
          >
            Get job title wise interview questions, answers and practice mock
            tests
          </Typography>
        </Box>
      </Stack>
      <Avatar
        sx={{
          width: 34,
          height: 34,
          bgcolor: "#3266e9",
          fontSize: 12,
          fontWeight: 800,
          border: "2px solid white",
        }}
      >
        {initials}
      </Avatar>
    </Stack>
  </Paper>
);
