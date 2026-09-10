"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav" data-scrolled={scrolled}>
      <div className="wrap nav__inner">
        <Link href="/" className="brand">
          <span className="brand__dot" aria-hidden="true" />
          Vaanii
        </Link>
        <div className="nav__links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="nav__cta">
          <Link className="btn btn--ghost" href="/login">
            Log in
          </Link>
          <Link className="btn" href="/signup">
            Start free{" "}
            <span className="btn__arrow" aria-hidden="true">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
