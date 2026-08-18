import { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Box, Button, Stack, Typography } from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import { getTemplateById, TEMPLATE_REGISTRY } from "./registry";
import { useDownloadResumePdf } from "./useDownloadResumePdf";
import { A4_WIDTH_PX } from "./resume";
import type { ResumeData } from "../../../types/candidate/resume.types";
import { SAMPLE_RESUME_DATA } from "../../../utils/sampleResumeData";

interface ResumeEditorPageProps {
  templateId: string;
  data?: ResumeData;
}

/**
 * Scales the fixed-width A4 template down to fit whatever width its
 * container actually has, instead of letting it overflow and get clipped
 * (the old `overflowX: auto` wrapper only revealed the cut-off content via
 * a scrollbar).
 *
 * The DOM node passed to the download hook (`resumeRef`) stays at its
 * natural, un-scaled 794px size — only the *display* wrapper around it is
 * scaled with CSS transform. That way the PDF export always captures the
 * full-resolution layout regardless of how small the on-screen preview
 * currently renders.
 */
const ScaledResume = ({
  resumeRef,
  children,
}: {
  resumeRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (!containerRef.current || !resumeRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      // Never scale up past 1 — a wide container shouldn't blow up the
      // resume beyond its real A4 size, just center it.
      const nextScale = Math.min(containerWidth / A4_WIDTH_PX, 1);
      setScale(nextScale);
      setContentHeight(resumeRef.current.scrollHeight);
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (resumeRef.current) resizeObserver.observe(resumeRef.current);

    return () => resizeObserver.disconnect();
    // resumeRef is a stable ref object, safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // `minWidth: 0` is the key line here — without it, a flex/grid child
    // defaults to `min-width: auto`, which lets it grow to fit its content
    // (the 794px-wide resume) instead of shrinking to the space its parent
    // actually has. That was silently making `clientWidth` report ~794px
    // regardless of the real panel width, so `scale` always came out ~1
    // and nothing visually shrank.
    <Box ref={containerRef} sx={{ width: "100%", minWidth: 0 }}>
      {/* Reserve exactly the scaled height so the page below doesn't jump
          or leave a gap once the transform shrinks the visual box. */}
      <Box
        sx={{
          height: contentHeight ? contentHeight * scale : "auto",
          overflow: "hidden",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            width: `${A4_WIDTH_PX}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

/**
 * Renders the chosen template full-size and wires up "Download PDF".
 * Drop this in as the step that runs right after template selection —
 * pass the `selectedTemplate` id you already save from
 * TemplateSelectionStep as `templateId`.
 */
const ResumeEditorPage = ({ templateId, data = SAMPLE_RESUME_DATA }: ResumeEditorPageProps) => {
  const entry = useMemo(() => getTemplateById(templateId) ?? TEMPLATE_REGISTRY[0], [templateId]);
  const resumeRef: any = useRef<HTMLDivElement>(null);
  const fileName = `${data.personal?.firstName} ${data.personal?.lastName}`.trim().replace(/\s+/g, "-").toLowerCase() + "-resume.pdf";
  const { download, isDownloading, error } = useDownloadResumePdf(resumeRef, fileName);

  const TemplateComponent = entry.Component;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f1f5f9", minHeight: "100vh" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 3, justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}
      >
        <Box>
          <Typography sx={{ fontSize: 22, fontWeight: 800 }}>{entry.name} Template</Typography>
          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            Review your resume, then download it as a PDF.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<DownloadRoundedIcon />}
          onClick={download}
          disabled={isDownloading}
          sx={{ textTransform: "none", fontWeight: 700, px: 3, borderRadius: 2.5 }}
        >
          {isDownloading ? "Preparing PDF..." : "Download Resume"}
        </Button>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Scales the A4 page down to fit the panel instead of clipping it. */}
      <Box sx={{ py: 2 }}>
        <ScaledResume resumeRef={resumeRef}>
          <TemplateComponent ref={resumeRef} data={data} />
        </ScaledResume>
      </Box>
    </Box>
  );
};

export default ResumeEditorPage;
