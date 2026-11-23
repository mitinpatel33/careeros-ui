import { useEffect, useState } from "react";
import { Box, Typography, keyframes } from "@mui/material";

/**
 * Career OS loader – new logo + fully responsive.
 *
 *  Mark   : a gradient "resume tile" with three text lines that fill in one after
 *           another, while a small dot orbits around the tile.
 *  Status : a line of text that cross-fades through short messages (wraps on mobile).
 *  Wash   : a soft blurred striped glow behind the content (optional).
 *
 *  <Loader variant="page" messages={["Career OS is loading for you…"]} />
 *  <Loader variant="status" messages={["Thinking…", "Finalising…"]} />
 *  <Loader variant="overlay" />
 */

const FONT = "'Plus Jakarta Sans', sans-serif";
const C1 = "#7dd3fc";
const C2 = "#2563eb";
const C3 = "#6366f1";

const orbit = keyframes`
  to { transform: rotate(360deg); }
`;
const lineFill = keyframes`
  0%, 100% { transform: scaleX(.35); opacity: .55; }
  45%, 70% { transform: scaleX(1);   opacity: 1; }
`;
const tileFloat = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50%      { transform: translateY(-6%) scale(1.04); }
`;
const halo = keyframes`
  0%, 100% { opacity: .35; transform: scale(.9); }
  50%      { opacity: .8;  transform: scale(1.15); }
`;
const swap = keyframes`
  0%   { opacity: 0; transform: translateY(5px); }
  16%  { opacity: 1; transform: translateY(0); }
  84%  { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(-5px); }
`;
const washDrift = keyframes`
  0%, 100% { transform: translate3d(-4%, 0, 0) scale(1);    opacity: .55; }
  50%      { transform: translate3d(4%, -3%, 0) scale(1.06); opacity: .9; }
`;

/* ───────── the logo mark ───────── */
const LINES = [
  { w: "56%", delay: "0s" },
  { w: "72%", delay: ".25s" },
  { w: "42%", delay: ".5s" },
];

export const LoaderMark = ({ size = 56 }: { size?: number }) => {
  const dot = Math.max(4, size * 0.14);
  const lineH = Math.max(2, size * 0.07);
  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        flexShrink: 0,
        // keeps the orbit from being clipped by parents with overflow hidden
        m: `${size * 0.16}px`,
      }}
    >
      {/* soft glow */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: -size * 0.3,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${C1} 0%, rgba(125,211,252,0) 65%)`,
          filter: `blur(${Math.max(4, size * 0.14)}px)`,
          willChange: "transform, opacity",
          animation: `${halo} 2.4s ease-in-out infinite`,
        }}
      />

      {/* orbiting dot */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: -size * 0.16,
          borderRadius: "50%",
          border: `${Math.max(1, size * 0.03)}px solid rgba(37,99,235,.15)`,
          willChange: "transform",
          animation: `${orbit} 1.8s linear infinite`,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: -dot / 2,
            left: "50%",
            ml: `${-dot / 2}px`,
            width: dot,
            height: dot,
            borderRadius: "50%",
            background: `linear-gradient(135deg, ${C1}, ${C3})`,
            boxShadow: `0 0 ${dot * 1.5}px rgba(99,102,241,.7)`,
          }}
        />
      </Box>

      {/* tile */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "30%",
          background: `linear-gradient(135deg, ${C1} 0%, ${C2} 55%, ${C3} 100%)`,
          boxShadow:
            "0 6px 18px rgba(37,99,235,.35), inset 0 1px 0 rgba(255,255,255,.45)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: `${Math.max(2, size * 0.09)}px`,
          px: `${size * 0.2}px`,
          willChange: "transform",
          animation: `${tileFloat} 2.4s ease-in-out infinite`,
        }}
      >
        {LINES.map((l, i) => (
          <Box
            key={i}
            sx={{
              width: l.w,
              height: lineH,
              borderRadius: 99,
              bgcolor: "rgba(255,255,255,.95)",
              transformOrigin: "left center",
              willChange: "transform, opacity",
              animation: `${lineFill} 1.8s ease-in-out ${l.delay} infinite`,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

/* ───────── cross-fading status text ───────── */
const INTERVAL = 2000;

const useRotating = (list: string[]) => {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    if (list.length < 2) return;
    const id = window.setInterval(
      () => setI((n) => (n + 1) % list.length),
      INTERVAL,
    );
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.join("|")]);
  return i;
};

/* ───────── component ───────── */
export interface CareerLoaderProps {
  label?: string;
  messages?: string[];
  /**
   * page    – big centred mark + text (route / screen load)
   * inline  – sized to its parent (default; for tabs & cards)
   * status  – compact: small mark left of the text
   * overlay – full-viewport white veil
   */
  variant?: "page" | "inline" | "status" | "overlay";
  /** number | string | responsive object, e.g. { xs: 220, md: 320 } */
  minHeight?: number | string | Record<string, number | string>;
  wash?: boolean;
}

const DEFAULTS = ["Career OS is loading for you…"];

const Loader = ({
  label,
  messages,
  variant = "inline",
  minHeight,
  wash,
}: CareerLoaderProps) => {
  const list = messages?.length ? messages : label ? [label] : DEFAULTS;
  const i = useRotating(list);
  const showWash = wash ?? variant !== "status";

  const reduced = {
    "@media (prefers-reduced-motion: reduce)": {
      "& *": { animationDuration: "10s !important" },
    },
  };

  /* compact status line (single line) */
  if (variant === "status") {
    return (
      <Box
        role="status"
        aria-live="polite"
        aria-busy="true"
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
          maxWidth: "100%",
          ...reduced,
        }}
      >
        <LoaderMark size={16} />
        <Typography
          key={i}
          noWrap
          sx={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 13,
            color: "#1d4ed8",
            animation:
              list.length > 1
                ? `${swap} ${INTERVAL}ms ease-in-out both`
                : undefined,
          }}
        >
          {list[i]}
        </Typography>
      </Box>
    );
  }

  const isFull = variant === "page" || variant === "overlay";

  const content = (
    <Box
      role="status"
      aria-live="polite"
      aria-busy="true"
      sx={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: { xs: 1.5, sm: 2.5 },
        boxSizing: "border-box",
        width: "100%",
        maxWidth: "100%",
        minWidth: 0,
        px: 2,
        py: { xs: 3, sm: 4 },
        minHeight:
          variant === "overlay"
            ? "auto"
            : (minHeight ??
              (isFull ? { xs: "50dvh", sm: "60dvh" } : { xs: 220, sm: 260 })),
        ...reduced,
      }}
    >
      {showWash && (
        <Box
          aria-hidden
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "-12%",
            width: "min(560px, 100%)",
            height: "55%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              background:
                "repeating-linear-gradient(115deg, rgba(125,211,252,0) 0 14px, rgba(125,211,252,.75) 14px 22px, rgba(99,102,241,.35) 22px 28px)",
              WebkitMaskImage:
                "radial-gradient(ellipse at 60% 70%, #000 0%, transparent 68%)",
              maskImage:
                "radial-gradient(ellipse at 60% 70%, #000 0%, transparent 68%)",
              filter: "blur(10px)",
              willChange: "transform, opacity",
              animation: `${washDrift} 6s ease-in-out infinite`,
            }}
          />
        </Box>
      )}

      <LoaderMark size={variant === "inline" ? 44 : 52} />

      {/* text wraps + stays centred on narrow screens */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          maxWidth: 360,
          minHeight: { xs: 40, sm: 24 },
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Typography
          key={i}
          sx={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: { xs: 13, sm: 13.5 },
            lineHeight: 1.5,
            textAlign: "center",
            color: "#64748b",
            overflowWrap: "anywhere",
            animation:
              list.length > 1
                ? `${swap} ${INTERVAL}ms ease-in-out both`
                : undefined,
          }}
        >
          {list[i]}
        </Typography>
      </Box>
    </Box>
  );

  if (variant === "overlay") {
    return (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          zIndex: 1600,
          display: "grid",
          placeItems: "center",
          height: "100dvh",
          bgcolor: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        {content}
      </Box>
    );
  }
  return content;
};

export default Loader;
export { Loader };
