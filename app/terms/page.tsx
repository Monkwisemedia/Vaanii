import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" updated="16 September 2026">
      <p>
        These terms govern your use of Vaanii, a WhatsApp and Instagram AI automation service
        owned and operated by Monk Wise Media (&ldquo;we&rdquo;, &ldquo;us&rdquo;). By creating an
        account or subscribing, you agree to them.
      </p>

      <h2>The service</h2>
      <p>
        Vaanii connects to your own WhatsApp Business number and/or Instagram account and uses AI
        to read, answer, qualify, and book conversations with your customers, based on the
        catalogue, pricing, and information you provide us.
      </p>

      <h2>Your account</h2>
      <ul>
        <li>You must provide accurate business and contact information when signing up.</li>
        <li>You&rsquo;re responsible for activity that happens under your account.</li>
        <li>
          You must have the right to connect the WhatsApp number or Instagram account you link to
          Vaanii, and to authorize an AI agent to converse with your customers through it.
        </li>
      </ul>

      <h2>Plans and billing</h2>
      <ul>
        <li>
          Vaanii is billed as a recurring subscription (monthly or yearly, as chosen at
          checkout) through Razorpay.
        </li>
        <li>
          Subscriptions renew automatically at the end of each billing cycle until cancelled.
        </li>
        <li>Prices shown on vaanii.in are in INR and may change with notice on this page.</li>
        <li>
          See our <a href="/refund-policy">Refund &amp; Cancellation Policy</a> for how
          cancellations and refunds work.
        </li>
      </ul>

      <h2>Acceptable use</h2>
      <p>You agree not to use Vaanii to:</p>
      <ul>
        <li>Send unsolicited bulk messages, spam, or content that violates WhatsApp&rsquo;s or Meta&rsquo;s policies.</li>
        <li>Send unlawful, harassing, fraudulent, or misleading content to your customers.</li>
        <li>Attempt to disrupt, reverse-engineer, or gain unauthorized access to the service.</li>
      </ul>
      <p>
        Your use of WhatsApp and Instagram through Vaanii also remains subject to Meta&rsquo;s own
        platform policies. We may suspend accounts that violate this section or put our ability to
        operate on those platforms at risk.
      </p>

      <h2>Content and data you provide</h2>
      <p>
        You own the catalogue, pricing, and business information you give us. You grant us a
        licence to use it solely to operate Vaanii for your account — to generate replies, train
        the agent on your business, and provide the service to you.
      </p>

      <h2>Availability</h2>
      <p>
        We aim to keep Vaanii available and responsive around the clock, but we don&rsquo;t
        guarantee uninterrupted service. Vaanii also depends on WhatsApp and Instagram&rsquo;s own
        platforms and APIs, which are outside our control.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        Vaanii is provided on an &ldquo;as is&rdquo; basis. To the extent permitted by law, we
        aren&rsquo;t liable for indirect, incidental, or consequential damages — including lost
        sales or lost messages — arising from your use of the service. Our total liability for
        any claim is limited to the amount you paid us in the 3 months before the claim.
      </p>

      <h2>Termination</h2>
      <p>
        You can cancel your subscription at any time (see our{" "}
        <a href="/refund-policy">Refund &amp; Cancellation Policy</a>). We may suspend or
        terminate accounts that breach these terms, misuse the platform, or put our WhatsApp/Meta
        access at risk.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these terms from time to time. We&rsquo;ll update the &ldquo;last
        updated&rdquo; date above when we do. Continuing to use Vaanii after a change means you
        accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href="mailto:monkwisemedia@gmail.com">monkwisemedia@gmail.com</a>.
      </p>
    </LegalLayout>
  );
}
