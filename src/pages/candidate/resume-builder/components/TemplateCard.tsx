import { motion } from "framer-motion";
import { Box, Chip, Paper, Stack, Typography } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import type { ResumeTemplateConfig } from "../../../../types/resumeTemplate.types";

type Props = {
  template: ResumeTemplateConfig;
  selected: boolean;
  onClick: () => void;
};

const TemplateCard = ({ template, selected, onClick }: Props) => {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
      <Paper
        onClick={onClick}
        sx={{
          p: 1.2,
          cursor: "pointer",
          borderRadius: 3.5,
          position: "relative",
          bgcolor: selected ? "#eff6ff" : "#fff",
          border: selected ? "2px solid #2563eb" : "1px solid #e5e7eb",
          boxShadow: selected
            ? "0 12px 26px rgba(37,99,235,0.14)"
            : "0 8px 20px rgba(15,23,42,0.06)",
          transition: "0.25s ease",
          "&:hover": {
            boxShadow: "0 14px 30px rgba(15,23,42,0.12)",
          },
        }}
      >
        {selected && (
          <CheckCircleRoundedIcon
            color="primary"
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              bgcolor: "#fff",
              borderRadius: "50%",
              fontSize: 23,
            }}
          />
        )}

        <Stack direction="row" spacing={1.3} sx={{ alignItems: "center" }}>
          <Box
            sx={{
              width: 104,
              height: 72,
              flexShrink: 0,
              borderRadius: 2.5,
              background:
                template.id === "modernGradient"
                  ? "linear-gradient(135deg,#2563eb,#9333ea)"
                  : template.primaryColor,
              p: 1.1,
            }}
          >
            <Box
              sx={{
                height: 6,
                width: "65%",
                bgcolor: "#fff",
                borderRadius: 5,
                mb: 0.8,
              }}
            />

            <Box
              sx={{
                height: 5,
                width: "88%",
                bgcolor: "rgba(255,255,255,.62)",
                borderRadius: 5,
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0, pr: selected ? 2.5 : 0 }}>
            <Typography sx={{ fontWeight: 950, fontSize: 14 }} noWrap>
              {template.name}
            </Typography>

            <Stack direction="row" spacing={0.7} sx={{ my: 0.6, flexWrap: "wrap" }} >
              <Chip
                size="small"
                label={template.category}
                sx={{
                  height: 21,
                  fontSize: 11,
                  bgcolor: "#f1f5f9",
                }}
              />

              {template.category === "ATS" && (
                <Chip
                  size="small"
                  color="success"
                  variant="outlined"
                  label="ATS"
                  sx={{ height: 21, fontSize: 11 }}
                />
              )}
            </Stack>

            <Typography
              color="text.secondary"
              sx={{
                lineHeight: 1.35,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                fontSize: 12
              }}
            >
              {template.description}
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </motion.div>
  );
};

export default TemplateCard;