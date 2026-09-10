"use client";

import Link from "next/link";
import { useState } from "react";
import { TIERS, formatINR, signupHref, type BillingInterval } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

export function Pricing() {
  const [interval, setInterval] = useState<BillingInterval>("monthly");

  return (
    <>
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

      <Reveal className="tiers" group>
        {TIERS.map((tier) => (
          <div key={tier.id} className={`tier${tier.featured ? " tier--feat" : ""}`}>
            {tier.badge && <span className="tier__badge">{tier.badge}</span>}
            <h3>{tier.name}</h3>
            <div className="tier__price">
              {formatINR(tier.price[interval])}
              <span> / {interval === "monthly" ? "month" : "year"}</span>
            </div>
            <p className="tier__desc">{tier.desc}</p>
            <ul>
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link className="btn" href={signupHref(tier.id, interval)}>
              {tier.cta}
            </Link>
          </div>
        ))}
      </Reveal>
    </>
  );
}
