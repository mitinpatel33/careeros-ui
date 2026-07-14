import {
  Avatar,
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import type { ReactNode } from "react";

type Props = {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  subtitle?: string;
};

const CompanyStatCard = ({
  title,
  value,
  icon,
  trend,
  subtitle,
}: Props) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.2, md: 2.6 },
        minHeight: 150,
        borderRadius: 5,
        position: "relative",
        overflow: "hidden",
        color: "#fff",
        background:
          "linear-gradient(135deg,#2563eb 0%,#4f46e5 100%)",
        boxShadow:
          "0 18px 45px rgba(79,70,229,.25)",

        "&::before": {
          content: '""',
          position: "absolute",
          right: -35,
          top: -35,
          width: 120,
          height: 120,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.12)",
        },

        "&::after": {
          content: '""',
          position: "absolute",
          right: 20,
          bottom: -55,
          width: 130,
          height: 130,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,.08)",
        },
      }}
    >
      <Stack
        spacing={2}
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            alignItems: "flex-start",
            spacing: 2,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                opacity: 0.9,
              }}
            >
              {title}
            </Typography>

            {subtitle && (
              <Typography
                sx={{
                  fontSize: 12,
                  opacity: 0.75,
                  mt: 0.3,
                }}
              >
                {subtitle}
              </Typography>
            )}
          </Box>

          <Avatar
            sx={{
              width: 48,
              height: 48,
              bgcolor: "rgba(255,255,255,.18)",
              backdropFilter: "blur(10px)",
              flexShrink: 0,
            }}
          >
            {icon}
          </Avatar>
        </Stack>

        <Stack
          direction="row"
          sx={{
            alignItems: "flex-end",
            justifyContent: "space-between",
            spacing: 1,
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 34, md: 38 },
              fontWeight: 900,
              lineHeight: 1,
              letterSpacing: "-1px",
            }}
          >
            {value}
          </Typography>

          {trend && (
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 800,
                px: 1.1,
                py: 0.5,
                borderRadius: 99,
                bgcolor: "rgba(255,255,255,.18)",
                whiteSpace: "nowrap",
              }}
            >
              {trend}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default CompanyStatCard;