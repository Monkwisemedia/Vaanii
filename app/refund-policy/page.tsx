import type { Metadata } from "next";
import { LegalLayout } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Refund & Cancellation Policy" updated="16 September 2026">
      <p>
        Vaanii is a subscription service billed monthly or yearly through Razorpay. This page
        explains how cancellations and refunds work.
      </p>

      <h2>Cancelling your subscription</h2>
      <p>
        You can cancel anytime by emailing{" "}
        <a href="mailto:monkwisemedia@gmail.com">monkwisemedia@gmail.com</a> from your account
        email. Cancellation stops future billing — you keep access to Vaanii until the end of the
        billing period you&rsquo;ve already paid for, and you won&rsquo;t be charged again after
        that.
      </p>

      <h2>Refunds</h2>
      <ul>
        <li>
          <strong>First-time subscribers:</strong> if Vaanii isn&rsquo;t working for your
          business, you can request a full refund within 7 days of your first payment, by
          emailing us with your account details.
        </li>
        <li>
          <strong>Renewals:</strong> once a monthly or yearly renewal has been charged, that
          period is non-refundable — you can still cancel to stop future renewals.
        </li>
        <li>
          <strong>Duplicate or failed-service charges:</strong> if you were charged in error, or
          double-charged due to a payment issue, email us and we&rsquo;ll refund the incorrect
          charge in full.
        </li>
      </ul>

      <h2>How refunds are processed</h2>
      <p>
        Approved refunds are issued to your original payment method through Razorpay, typically
        within 5–7 business days of approval, depending on your bank.
      </p>

      <h2>Contact</h2>
      <p>
        To cancel a subscription or request a refund, email{" "}
        <a href="mailto:monkwisemedia@gmail.com">monkwisemedia@gmail.com</a> with your registered
        business name and email.
      </p>
    </LegalLayout>
  );
}
