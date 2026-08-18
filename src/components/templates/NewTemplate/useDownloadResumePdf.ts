import { useCallback, useState, type RefObject } from "react";

// Standard A4 Dimensions in Pixels (at 96 DPI)
const A4_WIDTH_PX = 794;
const A4_HEIGHT_PX = 1123;

export function useDownloadResumePdf(nodeRef: RefObject<HTMLElement>, fileName = "resume.pdf") {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const download = useCallback(async () => {
    if (!nodeRef.current) return;
    setIsDownloading(true);
    setError(null);

    let cloneContainer: HTMLDivElement | null = null;

    try {
      // 1. Wait for web fonts to load to avoid text overlaps
      if (document.fonts) {
        await document.fonts.ready;
      }

      // @ts-ignore - html2pdf.js standard import
      const html2pdf = (await import("html2pdf.js")).default;
      const sourceElement = nodeRef.current;

      // 2. Clone the element to an isolated off-screen container.
      // This prevents UI zoom/scale or parent layout flex constraints from collapsing the columns.
      cloneContainer = document.createElement("div");
      cloneContainer.style.position = "fixed";
      cloneContainer.style.top = "-9999px";
      cloneContainer.style.left = "-9999px";
      cloneContainer.style.width = `${A4_WIDTH_PX}px`;
      cloneContainer.style.minHeight = `${A4_HEIGHT_PX}px`;
      cloneContainer.style.backgroundColor = "#ffffff";
      cloneContainer.style.boxSizing = "border-box";

      const clonedNode = sourceElement.cloneNode(true) as HTMLElement;

      // Reset transform/scale applied by preview components
      clonedNode.style.transform = "none";
      clonedNode.style.width = "100%";
      clonedNode.style.minWidth = "100%";
      clonedNode.style.height = "auto";
      clonedNode.style.margin = "0";

      // 3. Force letter-spacing normal and ensure flexbox items maintain row layout
      const elements = clonedNode.querySelectorAll<HTMLElement>("*");
      elements.forEach((el) => {
        el.style.letterSpacing = "normal";
      });

      cloneContainer.appendChild(clonedNode);
      document.body.appendChild(cloneContainer);

      // Brief pause to allow browser layout reflow
      await new Promise((resolve) => setTimeout(resolve, 100));

      // 4. Configure html2pdf options
      const opt = {
        margin: 0,
        filename: fileName,
        image: { type: "png" as const, quality: 1.0 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollX: 0,
          scrollY: 0,
          windowWidth: A4_WIDTH_PX,
          width: A4_WIDTH_PX,
        },
        jsPDF: {
          unit: "px",
          format: [A4_WIDTH_PX, A4_HEIGHT_PX] as [number, number],
          orientation: "portrait" as const,
          compress: true,
        },
      };

      // Generate PDF
      await html2pdf().set(opt).from(clonedNode).save();
    } catch (err) {
      console.error("Resume PDF export failed:", err);
      setError("Couldn't generate the PDF. Please try again.");
    } finally {
      if (cloneContainer && document.body.contains(cloneContainer)) {
        document.body.removeChild(cloneContainer);
      }
      setIsDownloading(false);
    }
  }, [nodeRef, fileName]);

  return { download, isDownloading, error };
}