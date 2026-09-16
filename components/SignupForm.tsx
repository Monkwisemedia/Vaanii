"use client";

import { useActionState } from "react";
import { signup, type AuthState } from "@/app/actions/auth";

export function SignupForm({
  channel,
  plan,
  interval,
}: {
  channel: string;
  plan?: string;
  interval: "monthly" | "yearly";
}) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(
    signup,
    undefined
  );

  return (
    <form action={formAction}>
      <input type="hidden" name="channel" value={channel} />
      {plan && <input type="hidden" name="plan" value={plan} />}
      <input type="hidden" name="interval" value={interval} />

      {state?.error && <p className="auth__error">{state.error}</p>}

      <div className="field">
        <label htmlFor="business">Business name</label>
        <input id="business" name="business" type="text" autoComplete="organization" required />
      </div>
      <div className="field">
        <label htmlFor="email">Work email</label>
        <input id="email" name="email" type="email" autoComplete="email" required />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>
      <button className="btn btn--block btn--lg" type="submit" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
