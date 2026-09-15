"use client";

import Script from "next/script";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { formatINR, type BillingInterval, type Tier } from "@/lib/site";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function Checkout({
  tier,
  interval,
  email,
  name,
}: {
  tier: Tier;
  interval: BillingInterval;
  email?: string;
  name?: string;
}) {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "starting" | "paying" | "confirming" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  const pay = async () => {
    setState("starting");
    setError("");

    try {
      const res = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: tier.id, interval }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setError(data.error || "Couldn't start checkout.");
        return;
      }

      if (typeof window.Razorpay !== "function") {
        setState("error");
        setError("Payment couldn't load. Refresh the page and try again.");
        return;
      }

      setState("paying");
      const rzp = new window.Razorpay({
        key: data.keyId,
        subscription_id: data.subscriptionId,
        name: "Vaanii",
        description: `${data.tierName} — ${data.interval}`,
        prefill: { email, name },
        theme: { color: "#24d3ea" },
        handler: () => {
          setState("confirming");
          // The webhook usually lands within a second or two; give it a
          // moment, then re-fetch this page from the server.
          setTimeout(() => router.refresh(), 1800);
        },
        modal: {
          ondismiss: () => setState("idle"),
        },
      });
      rzp.open();
    } catch {
      setState("error");
      setError("Something went wrong starting checkout. Please try again.");
    }
  };

  return (
    <div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />

      {error && <p className="auth__error">{error}</p>}

      {state === "confirming" ? (
        <p style={{ color: "var(--ink-mid)", fontSize: ".92rem" }}>
          Payment received — activating your account&hellip;
        </p>
      ) : (
        <button
          className="btn btn--block btn--lg"
          type="button"
          onClick={pay}
          disabled={state === "starting" || state === "paying"}
        >
          {state === "starting"
            ? "Starting checkout…"
            : `Pay ${formatINR(tier.price[interval])} / ${interval === "monthly" ? "month" : "year"}`}
        </button>
      )}
    </div>
  );
}
