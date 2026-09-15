import "server-only";
import Razorpay from "razorpay";
import type { Tier, BillingInterval } from "@/lib/site";

export function isRazorpayConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
  );
}

let client: Razorpay | null = null;

export function getRazorpay(): Razorpay {
  if (!isRazorpayConfigured()) {
    throw new Error("Razorpay isn't configured — missing key id/secret.");
  }
  if (!client) {
    client = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
  }
  return client;
}

/**
 * Maps a (tier, interval) pair to the Razorpay Plan ID created in the
 * dashboard (Subscriptions → Plans). Keep these env vars in sync with the
 * prices in lib/site.ts — Razorpay is the actual source of truth for what
 * gets charged.
 */
const PLAN_ENV_KEYS: Record<Tier["id"], Record<BillingInterval, string>> = {
  starter: {
    monthly: "RAZORPAY_PLAN_STARTER_MONTHLY",
    yearly: "RAZORPAY_PLAN_STARTER_YEARLY",
  },
  growth: {
    monthly: "RAZORPAY_PLAN_GROWTH_MONTHLY",
    yearly: "RAZORPAY_PLAN_GROWTH_YEARLY",
  },
  scale: {
    monthly: "RAZORPAY_PLAN_SCALE_MONTHLY",
    yearly: "RAZORPAY_PLAN_SCALE_YEARLY",
  },
};

export function getRazorpayPlanId(tier: Tier["id"], interval: BillingInterval): string | null {
  const envKey = PLAN_ENV_KEYS[tier][interval];
  return process.env[envKey] || null;
}

/** 10 years of billing cycles — Razorpay requires a total_count, this is "effectively forever". */
export function totalCountFor(interval: BillingInterval): number {
  return interval === "monthly" ? 120 : 10;
}
