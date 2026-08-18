import { Box, Chip, IconButton, Stack, Typography, alpha } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { motion } from "framer-motion";
import { TEMPLATE_TOTAL, type ResumeTemplate } from "../../../../types/templateData";

const CATEGORY_LABEL: Record<ResumeTemplate["category"], string> = {
  classic: "Classic",
  photo: "Photo",
  modern: "Modern",
};

interface TemplateCardProps {
  template: ResumeTemplate;
  selected: boolean;
  onSelect: (id: string) => void;
  onPreview: (id: string) => void;
}

const TemplateCard = ({ template, selected, onSelect, onPreview }: TemplateCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Box
        onClick={() => onSelect(template.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(template.id)}
        sx={{
          cursor: "pointer",
          borderRadius: 4,
          overflow: "hidden",
          bgcolor: "background.paper",
          border: "2px solid",
          borderColor: selected ? "primary.main" : "transparent",
          boxShadow: selected
            ? (theme) => `0 8px 24px ${alpha(theme.palette.primary.main, 0.25)}`
            : "0 2px 10px rgba(15, 23, 42, 0.06)",
          transition: "box-shadow .2s ease, border-color .2s ease",
          "&:hover": {
            boxShadow: (theme) => `0 10px 28px ${alpha(theme.palette.primary.main, 0.18)}`,
          },
          "&:focus-visible": {
            outline: (theme) => `2px solid ${theme.palette.primary.main}`,
            outlineOffset: 2,
          },
        }}
      >
        {/* Thumbnail */}
        <Box
          sx={{
            position: "relative",
            aspectRatio: "3 / 4",
            background: `linear-gradient(155deg, ${alpha(template.accent, 0.92)}, ${alpha(
              template.accent,
              0.6,
            )})`,
          }}
        >
          {/* Mock resume lines so the placeholder reads as a document, not a color swatch */}
          <Stack
            spacing={1.1}
            sx={{ position: "absolute", inset: 0, p: "12% 10%", opacity: 0.9 }}
          >
            <Box sx={{ width: "55%", height: 10, borderRadius: 1, bgcolor: "rgba(255,255,255,0.95)" }} />
            <Box sx={{ width: "35%", height: 6, borderRadius: 1, bgcolor: "rgba(255,255,255,0.6)" }} />
            <Box sx={{ pt: 1.5, display: "flex", flexDirection: "column", gap: 0.7 }}>
              {[100, 90, 95, 70, 100, 85, 92].map((w, i) => (
                <Box
                  key={i}
                  sx={{
                    width: `${w}%`,
                    height: 4,
                    borderRadius: 1,
                    bgcolor: "rgba(255,255,255,0.35)",
                  }}
                />
              ))}
            </Box>
          </Stack>

          <Chip
            label={`${template.rank}/${TEMPLATE_TOTAL}`}
            size="small"
            sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "rgba(15, 23, 42, 0.55)",
              color: "#fff",
              fontWeight: 700,
              backdropFilter: "blur(4px)",
            }}
          />

          <IconButton
            aria-label={`Preview ${template.name}`}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onPreview(template.id);
            }}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255,255,255,0.9)",
              "&:hover": { bgcolor: "#fff" },
            }}
          >
            <VisibilityRoundedIcon fontSize="small" />
          </IconButton>

          {selected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{ position: "absolute", bottom: 10, right: 10 }}
            >
              <CheckCircleRoundedIcon sx={{ color: "#fff", fontSize: 30, filter: "drop-shadow(0 1px 3px rgba(0,0,0,.35))" }} />
            </motion.div>
          )}
        </Box>

        {/* Meta */}
        <Box sx={{ p: 1.75 }}>
          <Stack direction="row" sx={{ mb: 0.5, alignItems: "center", justifyContent: "space-between" }}>
            <Typography sx={{ fontWeight: 800, fontSize: 15 }}>{template.name}</Typography>
            <Chip
              label={CATEGORY_LABEL[template.category]}
              size="small"
              sx={{
                height: 20,
                fontSize: 11,
                fontWeight: 600,
                bgcolor: alpha(template.accent, 0.12),
                color: template.accent,
              }}
            />
          </Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.6em",
              lineHeight: 1.3,
            }}
          >
            {template.tagline}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
};

export default TemplateCard;
