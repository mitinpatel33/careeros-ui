import type { PlanId } from "../../types/plans";


/** Same glass tokens as TemplateSelectionStep so payment screens match the portal. */
export const glass = {
  containerBg: "rgba(255, 255, 255, 0.45)",
  cardBg: "rgba(255, 255, 255, 0.7)",
  border: "1px solid rgba(255, 255, 255, 0.8)",
  backdropFilter: "blur(16px)",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
};

/** One accent per plan: slate = Free, portal blue = Pro, network purple = Premium. */
export const TIER_THEME: Record<
  PlanId,
  { c: string; soft: string; gradient: string }
> = {
  free: {
    c: "#64748b",
    soft: "rgba(100,116,139,.12)",
    gradient: "linear-gradient(135deg,#94a3b8 0%,#475569 100%)",
  },
  pro: {
    c: "#2563eb",
    soft: "rgba(37,99,235,.10)",
    gradient: "linear-gradient(135deg,#3b82f6 0%,#1d4ed8 100%)",
  },
  premium: {
    c: "#7c3aed",
    soft: "rgba(124,58,237,.10)",
    gradient: "linear-gradient(135deg,#8b5cf6 0%,#6d28d9 100%)",
  },
};
