import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { TIERS, formatINR, type BillingInterval } from "@/lib/site";
import { SignupForm } from "@/components/SignupForm";

export const metadata: Metadata = {
  title: "Start free",
  robots: { index: false },
};

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const params = await searchParams;
  const planParam = typeof params.plan === "string" ? params.plan : undefined;
  const intervalParam: BillingInterval = params.interval === "yearly" ? "yearly" : "monthly";
  const tier = TIERS.find((t) => t.id === planParam);

  // A plan is chosen first, on the pricing section — signing up without one
  // isn't a supported path, so send visitors there instead of showing a
  // half-finished form.
  if (!tier) {
    redirect("/#pricing");
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <Link href="/" className="brand">
          <span className="brand__dot" aria-hidden="true" />
          Vaanii
        </Link>
        <h1>Create your account</h1>
        <p className="auth__sub">
          {tier.name} plan — {formatINR(tier.price[intervalParam])} /{" "}
          {intervalParam === "monthly" ? "month" : "year"}. You&rsquo;ll pay after this step,
          and can change plans any time.
        </p>

        <SignupForm plan={tier.id} interval={intervalParam} />

        <p className="auth__meta">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
