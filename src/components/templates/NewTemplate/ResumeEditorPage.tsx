import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";

import { getTemplateById, TEMPLATE_REGISTRY } from "./registry";
import { useDownloadResumePdf } from "./useDownloadResumePdf";
import { A4_WIDTH_PX } from "./resume";
import type { ResumeData } from "../../../types/candidate/resume.types";
import { SAMPLE_RESUME_DATA } from "../../../utils/sampleResumeData";

interface ResumeEditorPageProps {
  initialTemplateId?: string;
  data?: ResumeData;
}

const ScaledResume = ({
  resumeRef,
  children,
}: {
  resumeRef: React.RefObject<HTMLDivElement | null>;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    const updateMeasurements = () => {
      if (!containerRef.current || !resumeRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      const nextScale = Math.min(containerWidth / A4_WIDTH_PX, 1);
      setScale(nextScale);
      setContentHeight(resumeRef.current.scrollHeight);
    };

    updateMeasurements();

    const resizeObserver = new ResizeObserver(updateMeasurements);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    if (resumeRef.current) resizeObserver.observe(resumeRef.current);

    return () => resizeObserver.disconnect();
  }, [children, resumeRef]);

  return (
    <Box ref={containerRef} sx={{ width: "100%", minWidth: 0 }}>
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

const ResumeEditorPage = ({
  initialTemplateId = "sidebar",
  data = SAMPLE_RESUME_DATA,
}: ResumeEditorPageProps) => {
  // 1. Manage current selected template / theme state locally
  const [selectedTemplateId, setSelectedTemplateId] =
    useState<string>(initialTemplateId);

  // 2. Fetch selected template entry from registry dynamically
  const entry = useMemo(
    () => getTemplateById(selectedTemplateId) ?? TEMPLATE_REGISTRY[0],
    [selectedTemplateId],
  );

  // 3. Fix Ref Type Definition
  const resumeRef = useRef<HTMLDivElement | null>(null);

  const fileName =
    `${data.personal?.firstName ?? "resume"}-${data.personal?.lastName ?? ""}`
      .trim()
      .replace(/\s+/g, "-")
      .toLowerCase() + `-${selectedTemplateId}-resume.pdf`;

  const { download, isDownloading, error } = useDownloadResumePdf(
    resumeRef,
    fileName,
  );

  const TemplateComponent = entry.Component;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#f1f5f9", minHeight: "100vh" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{
          mb: 3,
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", sm: "center" },
        }}
      >
        <Box>
          <Typography sx={{ fontSize: 22, fontWeight: 800 }}>
            {entry.name} Template
          </Typography>
          <Typography color="text.secondary" sx={{ fontSize: 13 }}>
            Review your resume layout, then download it as a PDF.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{alignItems: "center"}}>
          {/* Theme Switcher Selector */}
          <Select
            size="small"
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              fontSize: 14,
              minWidth: 160,
            }}
          >
            {TEMPLATE_REGISTRY.map((tpl) => (
              <MenuItem key={tpl.id} value={tpl.id}>
                {tpl.name}
              </MenuItem>
            ))}
          </Select>

          {/* Download PDF Trigger Button */}
          <Button
            variant="contained"
            startIcon={<DownloadRoundedIcon />}
            onClick={download}
            disabled={isDownloading}
            sx={{
              textTransform: "none",
              fontWeight: 700,
              px: 3,
              borderRadius: 2.5,
            }}
          >
            {isDownloading ? "Preparing PDF..." : "Download Resume"}
          </Button>
        </Stack>
      </Stack>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Renders and scales whatever template is actively selected */}
      <Box sx={{ py: 2 }}>
        <ScaledResume resumeRef={resumeRef}>
          <TemplateComponent ref={resumeRef} data={data} />
        </ScaledResume>
      </Box>
    </Box>
  );
};

export default ResumeEditorPage;
