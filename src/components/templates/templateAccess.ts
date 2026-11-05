import { TIER_RANK, type PlanId } from "../../types/plans";

/** Which plan unlocks which template. Anything not listed defaults to "pro". */
export const TEMPLATE_TIER: Record<string, PlanId> = {
  // free
  "crimson-header": "free",
  "midnight-sidebar": "free",
  "navy-classic": "free",
  // premium (creative styles)
  "violet-cards": "premium",
  "rose-banner": "premium",
  "sunset-boxes": "premium",
  "magenta-duo": "premium",
  "mint-ledger": "premium",
  "plum-overlap": "premium",
  "charcoal-terminal": "premium",
  "ruby-monogram": "premium",
  // legacy templates (hidden from the picker) – keep working for already-saved resumes
  "classic-blue": "free",
  "sidebar-network": "free",
  "photo-top-classic": "free",
  "teal-banner": "free",
  "pink-sidebar": "free",
  "dark-header": "free",
  "teal-dotted": "free",
  "blue-sidebar": "free",
  "coral-header": "free",
};

export const tierOf = (templateId: string): PlanId =>
  TEMPLATE_TIER[templateId] ?? "pro";

export const canUseTemplate = (userPlan: PlanId, templateId: string) =>
  TIER_RANK[userPlan] >= TIER_RANK[tierOf(templateId)];
