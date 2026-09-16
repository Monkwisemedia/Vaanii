import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PLANS, CHANNELS, formatINR, type BillingInterval, type Channel } from "@/lib/site";
import { SignupForm } from "@/components/SignupForm";
import { BrandMark } from "@/components/BrandMark";

export const metadata: Metadata = {
  title: "Choose plan",
  robots: { index: false },
};

export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const params = await searchParams;
  const planParam = typeof params.plan === "string" ? params.plan : undefined;
  const channelParam: Channel = CHANNELS.some((c) => c.id === params.channel)
    ? (params.channel as Channel)
    : "whatsapp";
  const intervalParam: BillingInterval = params.interval === "yearly" ? "yearly" : "monthly";
  const tier = PLANS[channelParam].find((t) => t.id === planParam);
  const channelLabel = CHANNELS.find((c) => c.id === channelParam)?.label;

  // A plan is chosen first, on the pricing section — signing up without one
  // isn't a supported path, so send visitors there instead of showing a
  // half-finished form.
  if (!tier) {
    redirect("/#pricing");
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <BrandMark />
        <h1>Create your account</h1>
        <p className="auth__sub">
          {channelLabel} · {tier.name} plan — {formatINR(tier.price[intervalParam])} /{" "}
          {intervalParam === "monthly" ? "month" : "year"}. You&rsquo;ll pay after this step,
          and can change plans any time.
        </p>

        <SignupForm channel={channelParam} plan={tier.id} interval={intervalParam} />

        <p className="auth__meta">
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
