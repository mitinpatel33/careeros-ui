export type PlanId = "free" | "pro" | "premium";
export type Billing = "monthly" | "yearly";

export interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  /** INR, whole rupees. Display only – the server holds the real prices. */
  price: Record<Billing, number>;
  features: string[];
  popular?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Start building your profile",
    price: { monthly: 0, yearly: 0 },
    features: [
      "3 starter templates",
      "Public profile link",
      "PDF export with watermark",
      "1 AI resume import / month",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Everything you need to get hired",
    price: { monthly: 299, yearly: 2999 },
    popular: true,
    features: [
      "All classic & modern templates",
      "PDF export, no watermark",
      "Custom profile URL",
      "10 AI resume imports / month",
      "Email support",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    tagline: "Stand out with every style",
    price: { monthly: 799, yearly: 7999 },
    features: [
      "Every template, incl. creative",
      "Unlimited AI resume imports",
      "Profile view analytics",
      "Priority support",
      "Early access to new templates",
    ],
  },
];

export const TIER_RANK: Record<PlanId, number> = {
  free: 0,
  pro: 1,
  premium: 2,
};

export const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);

export const yearlySavingPct = (p: Plan) =>
  p.price.monthly
    ? Math.round((1 - p.price.yearly / (p.price.monthly * 12)) * 100)
    : 0;

export const getPlan = (id: PlanId) => PLANS.find((p) => p.id === id)!;
