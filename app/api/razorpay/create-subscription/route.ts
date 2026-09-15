import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getRazorpay,
  getRazorpayPlanId,
  isRazorpayConfigured,
  totalCountFor,
} from "@/lib/razorpay";
import { TIERS, type BillingInterval } from "@/lib/site";

export async function POST(request: Request) {
  if (!isRazorpayConfigured()) {
    return NextResponse.json(
      { error: "Payments aren't switched on yet — check back shortly." },
      { status: 503 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Log in first." }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const tierId = String(body.plan || user.user_metadata?.plan || "");
  const interval: BillingInterval = body.interval === "yearly" ? "yearly" : "monthly";
  const tier = TIERS.find((t) => t.id === tierId);

  if (!tier) {
    return NextResponse.json({ error: "Pick a plan first." }, { status: 400 });
  }

  const planId = getRazorpayPlanId(tier.id, interval);
  if (!planId) {
    return NextResponse.json(
      { error: `No Razorpay plan is configured yet for ${tier.name} (${interval}).` },
      { status: 503 }
    );
  }

  try {
    const razorpay = getRazorpay();
    const subscription = await razorpay.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      total_count: totalCountFor(interval),
      notes: {
        user_id: user.id,
        email: user.email || "",
        tier: tier.id,
        interval,
      },
    });

    // Record the attempt as "pending" so /account can show something
    // sensible even before the webhook confirms payment. Written with the
    // service-role client on purpose — regular users have no write access
    // to this table (see supabase/migrations/0001_init.sql); the webhook is
    // the only thing allowed to ever mark a row "active".
    const admin = createAdminClient();
    await admin.from("subscriptions").upsert(
      {
        user_id: user.id,
        tier: tier.id,
        interval,
        status: "pending",
        razorpay_subscription_id: subscription.id,
        razorpay_plan_id: planId,
      },
      { onConflict: "razorpay_subscription_id" }
    );

    return NextResponse.json({
      subscriptionId: subscription.id,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      tierName: tier.name,
      interval,
    });
  } catch (err) {
    console.error("Razorpay create-subscription failed", err);
    return NextResponse.json(
      { error: "Couldn't start checkout. Please try again." },
      { status: 502 }
    );
  }
}
