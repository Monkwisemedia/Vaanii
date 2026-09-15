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

export interface Tier {
  id: "starter" | "growth" | "scale";
  name: string;
  featured?: boolean;
  badge?: string;
  desc: string;
  price: Record<BillingInterval, number>;
  features: string[];
  cta: string;
}

/**
 * Yearly = "2 months free" (10x the monthly price). Adjust freely — the
 * displayed number and the Razorpay plan must be kept in sync by hand.
 */
export const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    desc: "For a single shop or clinic testing the water.",
    price: { monthly: 2999, yearly: 29990 },
    features: [
      "1 WhatsApp number",
      "Up to 1,000 conversations / month",
      "Catalogue & FAQ replies",
      "Hindi + English",
      "Email support",
    ],
    cta: "Start free",
  },
  {
    id: "growth",
    name: "Growth",
    featured: true,
    badge: "Most chosen",
    desc: "For a business that runs real sales on WhatsApp.",
    price: { monthly: 7999, yearly: 79990 },
    features: [
      "Up to 5,000 conversations / month",
      "Appointment booking + calendar sync",
      "Lead scoring & smart human handoff",
      "Broadcasts & follow-ups",
      "6 regional languages",
      "CRM / Google Sheet sync",
      "Priority support",
    ],
    cta: "Start free",
  },
  {
    id: "scale",
    name: "Scale",
    desc: "For multi-branch teams and higher volume.",
    price: { monthly: 19999, yearly: 199990 },
    features: [
      "Unlimited conversations",
      "Multiple numbers & locations",
      "Custom workflows & API access",
      "Dedicated onboarding manager",
      "99.9% uptime SLA",
    ],
    cta: "Talk to us",
  },
];

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function signupHref(tier?: Tier["id"], interval: BillingInterval = "monthly"): string {
  if (!tier) return "/signup";
  return `/signup?plan=${tier}&interval=${interval}`;
}
