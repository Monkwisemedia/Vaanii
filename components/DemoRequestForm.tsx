"use client";

import { useState } from "react";
import { CHANNELS, type Channel } from "@/lib/site";

const BUSINESS_TYPES = [
  "D2C brand",
  "Clinic or salon",
  "Real estate",
  "Coaching / edtech",
  "Restaurant",
  "Local service",
  "Other",
];

export function DemoRequestForm() {
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setError("");

    try {
      const res = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessName, businessType, channel, phone }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setError(data.error || "Couldn't send your request.");
        return;
      }

      setState("sent");
    } catch {
      setState("error");
      setError("Something went wrong. Please try again.");
    }
  };

  if (state === "sent") {
    return (
      <div className="demo-card">
        <p className="demo__success">
          <b>Got it.</b> We&rsquo;ll reach out on WhatsApp within a few hours to set up a live demo
          for {businessName || "your business"}.
        </p>
      </div>
    );
  }

  return (
    <form className="demo-card" onSubmit={submit}>
      {error && <p className="auth__error">{error}</p>}

      <div className="demo-grid">
        <div className="field field--wide">
          <label htmlFor="demo-business">Business name</label>
          <input
            id="demo-business"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
          />
        </div>

        <fieldset className="chip-group" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend>What kind of business?</legend>
          {BUSINESS_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              className="chip"
              data-active={businessType === t}
              onClick={() => setBusinessType(t)}
            >
              {t}
            </button>
          ))}
        </fieldset>

        <fieldset className="chip-group" style={{ border: 0, padding: 0, margin: 0 }}>
          <legend>Which channel do you want to test?</legend>
          {CHANNELS.map((c) => (
            <button
              key={c.id}
              type="button"
              className="chip"
              data-active={channel === c.id}
              onClick={() => setChannel(c.id)}
            >
              {c.label}
            </button>
          ))}
        </fieldset>

        <div className="field field--wide">
          <label htmlFor="demo-phone">Your WhatsApp number</label>
          <input
            id="demo-phone"
            type="tel"
            placeholder="+91 98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
      </div>

      <button className="btn btn--lg" type="submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Get my live demo"}
      </button>
    </form>
  );
}
