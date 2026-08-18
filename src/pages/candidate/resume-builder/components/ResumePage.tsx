import { forwardRef } from "react";
import { Box } from "@mui/material";

interface ResumePageProps {
  children: React.ReactNode;
  background?: string;
}

export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;

/**
 * Fixed-width A4 canvas (794px @ 96dpi). Height grows naturally with content
 * instead of being clipped — the download hook slices whatever height is
 * produced into as many PDF pages as needed, so nothing is ever cut off or
 * squeezed to fit.
 */
const ResumePage = forwardRef<HTMLDivElement, ResumePageProps>(({ children, background = "#ffffff" }, ref) => (
  <Box
    ref={ref}
    sx={{
      width: `${A4_WIDTH_PX}px`,
      minHeight: "1123px",
      bgcolor: background,
      color: "#0f172a",
      fontFamily: `"Inter","Roboto","Helvetica","Arial",sans-serif`,
      boxShadow: "0 4px 24px rgba(15,23,42,0.12)",
      overflow: "hidden",
      mx: "auto",
    }}
  >
    {children}
  </Box>
));

ResumePage.displayName = "ResumePage";
export default ResumePage;
