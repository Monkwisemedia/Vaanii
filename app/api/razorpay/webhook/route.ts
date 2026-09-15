import { NextResponse } from "next/server";
import crypto from "node:crypto";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Razorpay calls this after every subscription event. This is the only
 * thing allowed to write "active" into the subscriptions table — never
 * trust the browser for that. Configure the same URL + secret in
 * Razorpay Dashboard → Settings → Webhooks:
 *   URL:    https://vaanii.in/api/razorpay/webhook
 *   Events: subscription.activated, subscription.charged,
 *           subscription.halted, subscription.cancelled,
 *           subscription.completed
 */
export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret) {
    // Not configured yet — acknowledge with 200 so Razorpay doesn't retry
    // forever, but do nothing. Nothing to verify against anyway.
    return NextResponse.json({ ok: true, skipped: "not configured" });
  }

  const rawBody = await request.text();
  const signature = request.headers.get("x-razorpay-signature") || "";

  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  const valid =
    signature.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!valid) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);
  const subscriptionEntity = event?.payload?.subscription?.entity;
  if (!subscriptionEntity) {
    // Some events (e.g. plain payment events) don't carry a subscription —
    // nothing for us to reconcile.
    return NextResponse.json({ ok: true });
  }

  const statusMap: Record<string, string> = {
    active: "active",
    authenticated: "active",
    charged: "active",
    completed: "active",
    pending: "pending",
    created: "pending",
    halted: "past_due",
    cancelled: "cancelled",
    expired: "cancelled",
  };

  const status = statusMap[subscriptionEntity.status] || "pending";
  const currentPeriodEnd = subscriptionEntity.current_end
    ? new Date(subscriptionEntity.current_end * 1000).toISOString()
    : null;

  const admin = createAdminClient();
  const { error } = await admin
    .from("subscriptions")
    .update({
      status,
      current_period_end: currentPeriodEnd,
      updated_at: new Date().toISOString(),
    })
    .eq("razorpay_subscription_id", subscriptionEntity.id);

  if (error) {
    console.error("Failed to update subscription from webhook", error);
    return NextResponse.json({ error: "DB update failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
