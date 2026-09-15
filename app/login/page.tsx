import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  robots: { index: false },
};

export default async function LoginPage({ searchParams }: PageProps<"/login">) {
  const params = await searchParams;
  const next = typeof params.next === "string" ? params.next : undefined;
  const checkEmail = params.checkEmail === "1";

  return (
    <div className="auth">
      <div className="auth__card">
        <Link href="/" className="brand">
          <span className="brand__dot" aria-hidden="true" />
          Vaanii
        </Link>
        <h1>Log in</h1>
        <p className="auth__sub">Welcome back. Pick up where your chats left off.</p>

        {checkEmail && (
          <div className="auth__note">
            Account created — check your email to confirm it, then log in below.
          </div>
        )}

        <LoginForm next={next} />

        <p className="auth__meta">
          New here? <Link href="/#pricing">Choose a plan</Link>
        </p>
      </div>
    </div>
  );
}
