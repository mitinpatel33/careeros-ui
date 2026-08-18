import { Box } from "@mui/material";
import { A4_HEIGHT_PX, A4_WIDTH_PX } from "./resume";
import { SAMPLE_RESUME_DATA } from "./sampleResumeData";
import type { TemplateRegistryEntry } from "./registry";

interface TemplateThumbnailProps {
  entry: TemplateRegistryEntry;
  /** Rendered thumbnail width in px — height follows the A4 ratio automatically. */
  width?: number;
}

/**
 * Renders the actual template at full A4 size, then scales the whole box
 * down with a CSS transform inside a matching, overflow-hidden frame. Since
 * the frame's aspect ratio is derived from the same A4 constants the
 * template itself uses, nothing is ever cropped or stretched — it's a true
 * miniature of what the user will download.
 */
const TemplateThumbnail = ({ entry, width = 240 }: TemplateThumbnailProps) => {
  const scale = width / A4_WIDTH_PX;
  const height = A4_HEIGHT_PX * scale;
  const TemplateComponent = entry.Component;

  return (
    <Box sx={{ width, height, overflow: "hidden", position: "relative", borderRadius: 2 }}>
      <Box
        sx={{
          width: A4_WIDTH_PX,
          height: A4_HEIGHT_PX,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          pointerEvents: "none",
        }}
      >
        <TemplateComponent data={SAMPLE_RESUME_DATA} />
      </Box>
    </Box>
  );
};

export default TemplateThumbnail;
