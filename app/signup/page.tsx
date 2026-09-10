import type { Metadata } from "next";
import Link from "next/link";
import { TIERS, formatINR, type BillingInterval } from "@/lib/site";

export const metadata: Metadata = {
  title: "Start free",
  robots: { index: false },
};

export default async function SignupPage({
  searchParams,
}: PageProps<"/signup">) {
  const params = await searchParams;
  const planParam = typeof params.plan === "string" ? params.plan : undefined;
  const intervalParam: BillingInterval =
    params.interval === "yearly" ? "yearly" : "monthly";
  const tier = TIERS.find((t) => t.id === planParam);

  return (
    <div className="auth">
      <div className="auth__card">
        <Link href="/" className="brand">
          <span className="brand__dot" aria-hidden="true" />
          Vaanii
        </Link>
        <h1>Create your account</h1>
        <p className="auth__sub">
          {tier
            ? `${tier.name} plan — ${formatINR(tier.price[intervalParam])} / ${
                intervalParam === "monthly" ? "month" : "year"
              }. Change it any time.`
            : "Start free. Add a plan when you're ready to go live."}
        </p>

        <div className="auth__note">
          Sign-up and payment are being wired up now. The site, pricing and this flow are in place —
          secure accounts (Supabase) and Razorpay checkout come online next.
        </div>

        <form>
          <div className="field">
            <label htmlFor="business">Business name</label>
            <input id="business" name="business" type="text" autoComplete="organization" disabled />
          </div>
          <div className="field">
            <label htmlFor="email">Work email</label>
            <input id="email" name="email" type="email" autoComplete="email" disabled />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              disabled
            />
          </div>
          <button className="btn btn--block btn--lg" type="submit" disabled>
            Create account
          </button>
        </form>

        <p className="auth__meta">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
