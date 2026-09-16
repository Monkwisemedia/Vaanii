/**
 * Central config for the marketing site + signup funnel.
 * Prices are the source of truth for what's shown on the page; the actual
 * charge is driven by the Razorpay Plan IDs in the env vars (see .env.example).
 */

export const SITE = {
  name: "Vaanii",
  domain: "vaanii.in",
  url: "https://vaanii.in",
  // Where a paid-up, logged-in customer is sent to use the actual product.
  // Override with NEXT_PUBLIC_PORTAL_URL in the environment if it ever moves.
  portalUrl: process.env.NEXT_PUBLIC_PORTAL_URL || "https://portal.vaanii.in",
};

export const NAV_LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
];

export type BillingInterval = "monthly" | "yearly";
export type Channel = "whatsapp" | "instagram" | "both";
export type TierId = "starter" | "growth" | "scale";

export const CHANNELS: { id: Channel; label: string; badge?: string }[] = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "instagram", label: "Instagram" },
  { id: "both", label: "Both", badge: "Save 15%" },
];

export interface Tier {
  id: TierId;
  name: string;
  featured?: boolean;
  badge?: string;
  desc: string;
  price: Record<BillingInterval, number>;
  features: string[];
  cta: string;
}

/**
 * Yearly = "2 months free" (10x the monthly price) for every plan, on every
 * channel — keep this rule the same everywhere so the pricing page reads as
 * one consistent system. The Razorpay plan for each (channel, tier,
 * interval) combination must be kept in sync by hand — see lib/razorpay.ts.
 */
function withYearly(monthly: number): Record<BillingInterval, number> {
  return { monthly, yearly: monthly * 10 };
}

// The three prices you set — unchanged. Same price whether a business picks
// WhatsApp-only or Instagram-only (matches how Siraa Labs prices their two
// single-channel tracks identically per tier too).
const BASE_MONTHLY: Record<TierId, number> = {
  starter: 3499,
  growth: 7500,
  scale: 12999,
};

// "Both" = WhatsApp + Instagram at once, priced at 15% off buying the two
// single-channel plans separately.
function bothMonthly(tier: TierId): number {
  return Math.round(BASE_MONTHLY[tier] * 2 * 0.85);
}

const TIER_META: Record<TierId, { name: string; desc: string; featured?: boolean; badge?: string; cta: string }> = {
  starter: {
    name: "Starter",
    desc: "For a single shop or clinic testing the water.",
    cta: "Choose plan",
  },
  growth: {
    name: "Growth",
    desc: "For a business that runs real sales on WhatsApp.",
    featured: true,
    badge: "Most chosen",
    cta: "Choose plan",
  },
  scale: {
    name: "Scale",
    desc: "For multi-branch teams and higher volume.",
    cta: "Talk to us",
  },
};

export const PLANS: Record<Channel, Tier[]> = {
  whatsapp: [
    {
      id: "starter",
      ...TIER_META.starter,
      price: withYearly(BASE_MONTHLY.starter),
      features: [
        "Unlimited AI messages (inbound)",
        "Out-of-window follow-ups: 50 / month",
        "AI reports: 50 / month",
        "Hindi + English",
        "Email support",
      ],
    },
    {
      id: "growth",
      ...TIER_META.growth,
      price: withYearly(BASE_MONTHLY.growth),
      features: [
        "Everything in Starter, plus:",
        "Outbound campaigns: 10 campaigns",
        "Out-of-window follow-ups: 3,000 / month",
        "Quick follow-ups: 10,000 / month",
        "AI reports: 250 / month",
        "Product catalogue: 50 products",
        "Share quotations on WhatsApp: 250 / month",
        "Priority support",
      ],
    },
    {
      id: "scale",
      ...TIER_META.scale,
      price: withYearly(BASE_MONTHLY.scale),
      features: [
        "Everything in Growth, plus:",
        "Connect up to 3 numbers (extra ₹1,000/mo each)",
        "Outbound campaigns: 100 campaigns",
        "Out-of-window follow-ups: 20,000 / month",
        "Quick follow-ups: 100,000 / month",
        "AI reports: 2,500 / month",
        "Product catalogue: 250 products",
        "Dedicated onboarding manager",
      ],
    },
  ],
  instagram: [
    {
      id: "starter",
      ...TIER_META.starter,
      desc: "For a single store or studio testing the water.",
      price: withYearly(BASE_MONTHLY.starter),
      features: [
        "Unlimited AI messages (inbound)",
        "AI reports: 50 / month",
        "Hindi + English",
        "Email support",
      ],
    },
    {
      id: "growth",
      ...TIER_META.growth,
      desc: "For a business that runs real sales on Instagram DMs.",
      price: withYearly(BASE_MONTHLY.growth),
      features: [
        "Everything in Starter, plus:",
        "Comments-to-DM: unlimited",
        "Quick follow-ups: 10,000 / month",
        "AI reports: 250 / month",
        "Product catalogue: 50 products",
        "Share quotations on Instagram: 500 / month",
        "Instagram post analytics",
        "Priority support",
      ],
    },
    {
      id: "scale",
      ...TIER_META.scale,
      price: withYearly(BASE_MONTHLY.scale),
      features: [
        "Everything in Growth, plus:",
        "Connect up to 3 accounts (extra ₹1,000/mo each)",
        "Comments-to-DM: unlimited",
        "Quick follow-ups: 100,000 / month",
        "AI reports: 2,500 / month",
        "Product catalogue: 250 products",
        "Share quotations on Instagram: 2,500 / month",
        "Dedicated onboarding manager",
      ],
    },
  ],
  both: [
    {
      id: "starter",
      ...TIER_META.starter,
      desc: "WhatsApp + Instagram together, for one shop testing the water.",
      price: withYearly(bothMonthly("starter")),
      features: [
        "Unlimited AI messages (inbound) — WhatsApp & Instagram",
        "Out-of-window follow-ups: 50 / month (WhatsApp)",
        "AI reports: 50 / month",
        "Hindi + English",
        "Email support",
      ],
    },
    {
      id: "growth",
      ...TIER_META.growth,
      desc: "WhatsApp + Instagram together, for a business that runs real sales.",
      price: withYearly(bothMonthly("growth")),
      features: [
        "Everything in Starter, plus:",
        "Outbound campaigns: 10 campaigns",
        "Comments-to-DM: unlimited",
        "Out-of-window follow-ups: 3,000 / month (WhatsApp)",
        "Quick follow-ups: 10,000 / month",
        "AI reports: 250 / month",
        "Product catalogue: 50 products",
        "Share quotations (WhatsApp & Instagram): 500 / month",
        "Instagram post analytics",
        "Priority support",
      ],
    },
    {
      id: "scale",
      ...TIER_META.scale,
      desc: "WhatsApp + Instagram together, for multi-branch teams and higher volume.",
      price: withYearly(bothMonthly("scale")),
      features: [
        "Everything in Growth, plus:",
        "Connect up to 3 numbers/accounts (extra ₹1,000/mo each)",
        "Outbound campaigns: 100 campaigns",
        "Out-of-window follow-ups: 20,000 / month (WhatsApp)",
        "Quick follow-ups: 100,000 / month",
        "AI reports: 2,500 / month",
        "Product catalogue: 250 products",
        "Dedicated onboarding manager",
      ],
    },
  ],
};

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function signupHref(channel: Channel, tier?: TierId, interval: BillingInterval = "monthly"): string {
  if (!tier) return "/signup";
  return `/signup?channel=${channel}&plan=${tier}&interval=${interval}`;
}
