import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="16 September 2026">
      <p>
        Vaanii (&ldquo;Vaanii&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is owned and operated by
        Monk Wise Media. This policy explains what we collect when you use vaanii.in and the
        Vaanii service, why we collect it, and how it&rsquo;s handled.
      </p>

      <h2>What we collect</h2>
      <p>When you sign up, subscribe, or contact us, we collect:</p>
      <ul>
        <li>Account details — name, business name, email address, phone number.</li>
        <li>
          Billing details — handled directly by our payment processor, Razorpay. We receive your
          subscription status and plan, never your full card or bank details.
        </li>
        <li>
          WhatsApp/Instagram business data you connect — your catalogue, price list, and the
          conversations Vaanii has with your customers on your behalf, so it can reply
          accurately and you can review chat history.
        </li>
        <li>Usage data — pages visited, device/browser type, and basic analytics.</li>
        <li>
          Demo request details — business name, business type, channel and phone number, if you
          submit the &ldquo;get a live demo&rdquo; form.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To provide and operate the Vaanii service you&rsquo;ve subscribed to.</li>
        <li>To process payments and manage your subscription.</li>
        <li>To respond to demo requests and support queries.</li>
        <li>To send service-related communication (billing, account, product updates).</li>
        <li>To improve reliability, security, and the product itself.</li>
      </ul>

      <h2>Who we share it with</h2>
      <p>We don&rsquo;t sell your data. We share it only with:</p>
      <ul>
        <li>
          <strong>Razorpay</strong>, to process subscription payments.
        </li>
        <li>
          <strong>Supabase</strong>, our database and authentication infrastructure provider.
        </li>
        <li>
          <strong>Meta&rsquo;s WhatsApp Business Platform and Instagram Graph API</strong>, to
          send and receive the messages Vaanii handles on your behalf.
        </li>
        <li>
          Our technology and AI infrastructure partners who power the underlying automation, under
          confidentiality obligations, and only to deliver the service to you.
        </li>
        <li>Law enforcement or regulators, only when legally required.</li>
      </ul>

      <h2>Data retention</h2>
      <p>
        We keep account and conversation data for as long as your account is active, plus a
        reasonable period afterward for legal, billing, and dispute-resolution purposes. You can
        request deletion at any time — see Your rights below.
      </p>

      <h2>Security</h2>
      <p>
        We use industry-standard measures — encrypted connections, access controls, and a managed
        database provider — to protect your data. No method of transmission or storage is 100%
        secure, and we can&rsquo;t guarantee absolute security.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct, or delete your personal data, or to cancel your
        subscription, at any time by emailing{" "}
        <a href="mailto:monkwisemedia@gmail.com">monkwisemedia@gmail.com</a>.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this policy from time to time. We&rsquo;ll change the &ldquo;last
        updated&rdquo; date above when we do. Continued use of Vaanii after a change means you
        accept the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href="mailto:monkwisemedia@gmail.com">monkwisemedia@gmail.com</a>.
      </p>
    </LegalLayout>
  );
}
