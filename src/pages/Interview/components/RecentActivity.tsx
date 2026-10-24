import React from "react";
import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material";
import { AccessTime, ArrowRightAlt, ChevronRight, Quiz } from "@mui/icons-material";
import { IconBadge, SectionCard } from "./shared";
import { useGetRecentActivityQuery } from "../../../services/interviewApi";
import { getErrorMessage, statusColor, timeAgo } from "../../../utils/intervireUtils";

export const RecentActivity: React.FC<{ userId?: string }> = ({ userId }) => {
  const { data: activity = [], isLoading, error } = useGetRecentActivityQuery(
    userId!,
    { skip: !userId },
  );

  const emptyMessage = !userId
    ? "Sign in to see your recent activity."
    : isLoading
      ? "Loading activity..."
      : error
        ? getErrorMessage(error)
        : activity.length === 0
          ? "No activity yet. Start a mock test to see it here."
          : null;

  return (
    <SectionCard>
      <Stack
        direction="row"
        sx={{ mb: 1.5, justifyContent: "space-between", alignItems: "center" }}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <IconBadge color="#3569f6">
            <AccessTime />
          </IconBadge>
          <Box>
            <Typography sx={{ color: "#20345e", fontWeight: 850 }}>
              Recent Activity
            </Typography>
            <Typography variant="caption" sx={{ color: "#7b8eaf" }}>
              Your latest interview practice and mock test attempts.
            </Typography>
          </Box>
        </Stack>
        <Button
          size="small"
          endIcon={<ArrowRightAlt />}
          sx={{
            color: "#4c65ed",
            textTransform: "none",
            fontWeight: 750,
            display: { xs: "none", sm: "inline-flex" },
          }}
        >
          View All
        </Button>
      </Stack>

      {emptyMessage ? (
        <Typography
          sx={{
            p: 2,
            textAlign: "center",
            fontSize: ".8rem",
            color: error ? "#d33" : "#7588aa",
          }}
        >
          {emptyMessage}
        </Typography>
      ) : (
        <Stack spacing={0.8}>
          {activity.map((item) => {
            const color = statusColor(item.status);
            return (
              <Paper
                key={item._id}
                elevation={0}
                sx={{
                  p: { xs: 1, sm: 1.25 },
                  border: "1px solid #e8eef9",
                  borderRadius: "12px",
                  bgcolor: "#fcfdff",
                }}
              >
                <Stack direction="row" spacing={1.2} sx={{ alignItems: "center" }}>
                  <IconBadge color={color} size={34}>
                    <Quiz sx={{ fontSize: 18 }} />
                  </IconBadge>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography
                      sx={{ color: "#314568", fontSize: ".78rem", fontWeight: 750 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography sx={{ color: "#8494b0", fontSize: ".68rem", mt: 0.25 }}>
                      {[item.category, timeAgo(item.createdAt)]
                        .filter(Boolean)
                        .join("  ·  ")}
                    </Typography>
                  </Box>
                  <Chip
                    label={item.status}
                    size="small"
                    sx={{
                      display: { xs: "none", sm: "inline-flex" },
                      bgcolor: `${color}18`,
                      color,
                      fontSize: ".64rem",
                      fontWeight: 800,
                    }}
                  />
                  <ChevronRight sx={{ color: "#7f91b2", fontSize: 20 }} />
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      )}
    </SectionCard>
  );
};
