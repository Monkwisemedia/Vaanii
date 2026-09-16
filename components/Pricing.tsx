"use client";

import Link from "next/link";
import { useState } from "react";
import {
  PLANS,
  CHANNELS,
  formatINR,
  signupHref,
  type BillingInterval,
  type Channel,
} from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Pricing() {
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [interval, setInterval] = useState<BillingInterval>("monthly");
  const tiers = PLANS[channel];

  return (
    <>
      <div className="channel-toggle" role="group" aria-label="Choose a channel">
        {CHANNELS.map((c) => (
          <button
            key={c.id}
            type="button"
            data-active={channel === c.id}
            onClick={() => setChannel(c.id)}
          >
            {c.label}
            {c.badge && <span className="save">{c.badge}</span>}
          </button>
        ))}
      </div>

      <div className="billing-toggle" role="group" aria-label="Billing interval">
        <button
          type="button"
          data-active={interval === "monthly"}
          onClick={() => setInterval("monthly")}
        >
          Monthly
        </button>
        <button
          type="button"
          data-active={interval === "yearly"}
          onClick={() => setInterval("yearly")}
        >
          Yearly <span className="save">2 months free</span>
        </button>
      </div>

      <Reveal className="tiers" group key={channel}>
        {tiers.map((tier) => (
          <div key={tier.id} className={`tier${tier.featured ? " tier--feat" : ""}`}>
            {tier.badge && <span className="tier__badge">{tier.badge}</span>}
            <h3>{tier.name}</h3>
            <div className="tier__price">
              {formatINR(tier.price[interval])}
              <span> / {interval === "monthly" ? "month" : "year"}</span>
            </div>
            <p className="tier__desc">{tier.desc}</p>
            <ul>
              {tier.features.map((f) =>
                f.endsWith(", plus:") ? (
                  <li key={f} className="tier__plus">
                    {f}
                  </li>
                ) : (
                  <li key={f}>{f}</li>
                )
              )}
            </ul>
            <Link className="btn" href={signupHref(channel, tier.id, interval)}>
              {tier.cta}
            </Link>
          </div>
        ))}
      </Reveal>
    </>
  );
}
