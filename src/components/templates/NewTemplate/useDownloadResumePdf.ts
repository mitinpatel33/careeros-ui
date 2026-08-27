import { useCallback, useState } from "react";
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export function useDownloadResumePdf(
  resumeRef: React.RefObject<HTMLElement | null>,
  fileName: string
) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(async () => {
    if (!resumeRef.current) return;
    setIsDownloading(true);
    setError(null);

    const element = resumeRef.current;

    const originalTransform = element.style.transform;
    const originalWidth = element.style.width;
    const originalMinHeight = element.style.minHeight;
    const originalBoxSizing = element.style.boxSizing;

    try {
      if (document.fonts) {
        await document.fonts.ready;
      }

      // @ts-ignore
      const html2pdf = (await import("html2pdf.js")).default;

      element.style.transform = "none";
      element.style.width = `${A4_WIDTH_PX}px`;
      element.style.minHeight = `${A4_HEIGHT_PX}px`;
      element.style.boxSizing = "border-box";

      await new Promise((resolve) => setTimeout(resolve, 150));

      // Add 'as const' at the end of the object declaration below
      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          windowWidth: A4_WIDTH_PX,
          width: A4_WIDTH_PX,
          scrollX: 0,
          scrollY: 0,
        },
        jsPDF: {
          unit: "px",
          format: [A4_WIDTH_PX, A4_HEIGHT_PX] as [number, number],
          orientation: "portrait",
          compress: true,
        },
      } as const; // <--- ADDED 'as const' HERE

      await html2pdf().set(opt).from(element).save();
    } catch (err) {
      console.error("Resume PDF export failed:", err);
      setError("Couldn't generate the PDF. Please try again.");
    } finally {
      element.style.transform = originalTransform;
      element.style.width = originalWidth;
      element.style.minHeight = originalMinHeight;
      element.style.boxSizing = originalBoxSizing;
      setIsDownloading(false);
    }
  }, [resumeRef, fileName]);

  return { download, isDownloading, error };
}
