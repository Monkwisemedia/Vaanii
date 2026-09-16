import "server-only";
import Razorpay from "razorpay";
import type { Channel, TierId, BillingInterval } from "@/lib/site";

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
 * Maps a (channel, tier, interval) triple to the Razorpay Plan ID created
 * in the dashboard (Subscriptions → Plans). Keep these env vars in sync
 * with the prices in lib/site.ts — Razorpay is the actual source of truth
 * for what gets charged. Naming: RAZORPAY_PLAN_<CHANNEL>_<TIER>_<INTERVAL>.
 */
function envKeyFor(channel: Channel, tier: TierId, interval: BillingInterval): string {
  return `RAZORPAY_PLAN_${channel.toUpperCase()}_${tier.toUpperCase()}_${interval.toUpperCase()}`;
}

export function getRazorpayPlanId(
  channel: Channel,
  tier: TierId,
  interval: BillingInterval
): string | null {
  return process.env[envKeyFor(channel, tier, interval)] || null;
}

/** 10 years of billing cycles — Razorpay requires a total_count, this is "effectively forever". */
export function totalCountFor(interval: BillingInterval): number {
  return interval === "monthly" ? 120 : 10;
}
