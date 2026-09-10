import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="auth">
      <div className="auth__card">
        <Link href="/" className="brand">
          <span className="brand__dot" aria-hidden="true" />
          Vaanii
        </Link>
        <h1>Log in</h1>
        <p className="auth__sub">Welcome back. Pick up where your chats left off.</p>

        <div className="auth__note">
          Accounts open shortly. We&rsquo;re finishing the secure sign-in and billing setup — the
          marketing site and pricing are live now.
        </div>

        <form>
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
              autoComplete="current-password"
              disabled
            />
          </div>
          <button className="btn btn--block btn--lg" type="submit" disabled>
            Log in
          </button>
        </form>

        <p className="auth__meta">
          New here? <Link href="/signup">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
