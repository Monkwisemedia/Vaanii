"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { SITE, formatINR, type BillingInterval, type Channel, type Tier } from "@/lib/site";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function Checkout({
  channel,
  tier,
  interval,
  email,
  name,
}: {
  channel: Channel;
  tier: Tier;
  interval: BillingInterval;
  email?: string;
  name?: string;
}) {
  const [state, setState] = useState<"idle" | "starting" | "paying" | "confirming" | "error">(
    "idle"
  );
  const [error, setError] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const autoStarted = useRef(false);

  const pay = async () => {
    setState("starting");
    setError("");

    try {
      const res = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel, plan: tier.id, interval }),
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
          // moment, then send them straight into the portal.
          setTimeout(() => {
            window.location.href = SITE.portalUrl;
          }, 1200);
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

  // Jump straight into Razorpay the moment the page is ready, instead of
  // making them click a "Pay" button first. If they dismiss the modal, the
  // button below stays as a manual retry — this effect only fires once.
  useEffect(() => {
    if (scriptReady && !autoStarted.current) {
      autoStarted.current = true;
      pay();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scriptReady]);

  return (
    <div>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      {error && <p className="auth__error">{error}</p>}

      {state === "confirming" ? (
        <p style={{ color: "var(--ink-mid)", fontSize: ".92rem" }}>
          Payment received — taking you to your dashboard&hellip;
        </p>
      ) : (
        <button
          className="btn btn--block btn--lg"
          type="button"
          onClick={pay}
          disabled={state === "starting" || state === "paying"}
        >
          {state === "starting" || state === "paying"
            ? "Opening checkout…"
            : `Pay ${formatINR(tier.price[interval])} / ${interval === "monthly" ? "month" : "year"}`}
        </button>
      )}
    </div>
  );
}
