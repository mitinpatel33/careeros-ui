import { useCallback, useState } from "react";
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

// Must be >= the widest MUI breakpoint any template uses (default md = 900, lg = 1200).
// Setting it generously high is safe — it only affects media-query evaluation,
// not the actual captured/output size.
const RENDER_WINDOW_WIDTH = 1440;

export function useDownloadResumePdf(
  resumeRef: React.RefObject<HTMLElement | null>,
  fileName: string,
) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    setError(null);

    const element = resumeRef.current;

    try {
      if (document.fonts) {
        await document.fonts.ready;
      }

      // @ts-ignore
      const html2pdf = (await import("html2pdf.js")).default;

      await new Promise((resolve) => setTimeout(resolve, 150));

      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          // KEY FIX: iframe "sees" a wide desktop viewport so md/lg
          // breakpoints still match, but only a 794px-wide region is captured.
          windowWidth: RENDER_WINDOW_WIDTH,
          windowHeight: Math.max(
            RENDER_WINDOW_WIDTH,
            element.scrollHeight || A4_HEIGHT_PX,
          ),
          width: A4_WIDTH_PX,
          height: element.scrollHeight || A4_HEIGHT_PX,
          x: 0,
          y: 0,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: "px",
          format: [A4_WIDTH_PX, A4_HEIGHT_PX] as [number, number],
          orientation: "portrait",
          compress: true,
        },
      } as const;

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("Resume PDF export failed:", err);
      setError("Couldn't generate the PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  }, [resumeRef, fileName]);

  return { download, isDownloading, error };
}
