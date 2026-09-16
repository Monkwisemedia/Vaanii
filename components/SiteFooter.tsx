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
        <nav className="footer__links footer__links--legal" aria-label="Legal">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/refund-policy">Refund &amp; Cancellation</Link>
        </nav>
        <p className="footer__fine">
          Vaanii is an independent product built on the WhatsApp Business Platform and the
          Instagram Graph API. Not affiliated with, endorsed by, or sponsored by WhatsApp LLC,
          Instagram, or Meta Platforms, Inc. &ldquo;WhatsApp&rdquo; and &ldquo;Instagram&rdquo; are
          trademarks of their respective owners.
          <br />
          Vaanii — the platform, technology and all associated rights and copyright — is owned by
          Monk Wise Media.
          <br />
          &copy; {new Date().getFullYear()} Vaanii — all rights reserved.
        </p>
      </div>
    </footer>
  );
}
