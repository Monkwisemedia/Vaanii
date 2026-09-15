import Link from "next/link";
import { BrandMark } from "@/components/BrandMark";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <BrandMark />
          <nav className="footer__links" aria-label="Footer">
            <a href="/#how">How it works</a>
            <a href="/#features">Features</a>
            <a href="/#pricing">Pricing</a>
            <a href="/#faq">FAQ</a>
            <Link href="/login">Log in</Link>
            <a href="/#pricing">Choose plan</a>
          </nav>
        </div>
        <p className="footer__fine">
          Vaanii is an independent product built on the WhatsApp Business Platform. Not affiliated
          with, endorsed by, or sponsored by WhatsApp LLC or Meta Platforms, Inc. &ldquo;WhatsApp&rdquo;
          is a trademark of its respective owner.
          <br />
          &copy; {new Date().getFullYear()} Vaanii — all rights reserved.
        </p>
      </div>
    </footer>
  );
}
