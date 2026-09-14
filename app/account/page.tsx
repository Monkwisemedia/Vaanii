import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { logout } from "@/app/actions/auth";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Your account",
  robots: { index: false },
};

export default async function AccountPage() {
  // Accounts aren't switched on yet — send visitors to sign up instead of
  // crashing on a Supabase client that has no URL/key to work with.
  if (!isSupabaseConfigured()) {
    redirect("/signup");
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

  return (
    <div className="auth" style={{ alignItems: "flex-start", paddingTop: "6rem" }}>
      <div className="auth__card" style={{ maxWidth: 520 }}>
        <Link href="/" className="brand">
          <span className="brand__dot" aria-hidden="true" />
          Vaanii
        </Link>
        <h1>Welcome, {businessName}</h1>
        <p className="auth__sub">{user.email}</p>

        <div className="auth__note">
          No active plan yet. Billing goes live shortly — once you subscribe, your plan and status
          will show here.
        </div>

        <div className="field">
          <label>Your WhatsApp AI product</label>
          {SITE.portalUrl ? (
            <a className="btn" href={SITE.portalUrl} target="_blank" rel="noopener noreferrer">
              Open dashboard &rarr;
            </a>
          ) : (
            <p style={{ color: "var(--ink-dim)", fontSize: ".9rem" }}>
              Not connected yet — this will turn into a button once it&rsquo;s ready.
            </p>
          )}
        </div>

        <form action={logout} style={{ marginTop: "1.4rem" }}>
          <button className="btn btn--ghost btn--block" type="submit">
            Log out
          </button>
        </form>
      </div>
    </div>
  );
}
