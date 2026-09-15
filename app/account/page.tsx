import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { logout } from "@/app/actions/auth";
import { SITE, TIERS } from "@/lib/site";
import { Checkout } from "@/components/Checkout";
import { BrandMark } from "@/components/BrandMark";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false },
};

export default async function AccountPage() {
  // Accounts aren't switched on yet — send visitors to pick a plan instead
  // of crashing on a Supabase client that has no URL/key to work with.
  if (!isSupabaseConfigured()) {
    redirect("/#pricing");
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/account");
  }

  const businessName =
    (user.user_metadata?.business_name as string | undefined) || "your business";

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("tier, interval, status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const isActive = subscription?.status === "active";

  // Fall back to whatever plan they picked at signup if there's no
  // subscription row yet (e.g. they haven't reached checkout).
  const pendingTierId = subscription?.tier || (user.user_metadata?.plan as string | undefined);
  const pendingInterval =
    (subscription?.interval as "monthly" | "yearly" | undefined) ||
    (user.user_metadata?.interval as "monthly" | "yearly" | undefined) ||
    "monthly";
  const pendingTier = TIERS.find((t) => t.id === pendingTierId);

  return (
    <div className="auth" style={{ alignItems: "flex-start", paddingTop: "6rem" }}>
      <div className="auth__card" style={{ maxWidth: 520 }}>
        <BrandMark />
        <h1>Welcome, {businessName}</h1>
        <p className="auth__sub">{user.email}</p>

        {isActive ? (
          <>
            <div className="auth__note">
              {pendingTier?.name} plan active
              {subscription?.interval ? ` · billed ${subscription.interval}` : ""}. Your WhatsApp AI
              product is ready.
            </div>
            <a className="btn btn--block btn--lg" href={SITE.portalUrl}>
              Open your dashboard &rarr;
            </a>
          </>
        ) : pendingTier ? (
          <>
            <div className="auth__note">
              One step left — pay for the {pendingTier.name} plan and your WhatsApp AI product
              unlocks immediately.
            </div>
            <Checkout
              tier={pendingTier}
              interval={pendingInterval}
              email={user.email}
              name={businessName}
            />
          </>
        ) : (
          <>
            <div className="auth__note">You haven&rsquo;t picked a plan yet.</div>
            <Link className="btn btn--block btn--lg" href="/#pricing">
              Choose a plan
            </Link>
          </>
        )}

        <form action={logout} style={{ marginTop: "1.4rem" }}>
          <button className="btn btn--ghost btn--block" type="submit">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
