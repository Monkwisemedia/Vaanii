import type { Metadata } from "next";
import { Bricolage_Grotesque, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vaanii.in"),
  title: {
    default: "Vaanii — WhatsApp AI Agent that answers and closes sales",
    template: "%s · Vaanii",
  },
  description:
    "Vaanii reads, answers, qualifies and books on your own WhatsApp number — in Hindi and English, around the clock — so no customer waits and no enquiry is lost.",
  openGraph: {
    title: "Vaanii — WhatsApp AI Agent",
    description:
      "Every customer replied to in 3 seconds. Even at 2 AM. Vaanii runs on your WhatsApp number and closes sales while your team sleeps.",
    url: "https://vaanii.in",
    siteName: "Vaanii",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaanii — WhatsApp AI Agent",
    description:
      "Every customer replied to in 3 seconds. Even at 2 AM. Vaanii runs on your WhatsApp number and closes sales while your team sleeps.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
