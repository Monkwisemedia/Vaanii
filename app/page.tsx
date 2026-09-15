import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Reveal } from "@/components/Reveal";
import { ChatDemo } from "@/components/ChatDemo";
import { StatCounter } from "@/components/StatCounter";
import { RoiCalculator } from "@/components/RoiCalculator";
import { Pricing } from "@/components/Pricing";
import { SiteFooter } from "@/components/SiteFooter";

const FEATURES = [
  {
    cls: "f--wide f--feat",
    icon: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    title: "Instant replies, 24/7",
    body: "Vaanii first response under 3 seconds — at midnight, on Holi, during your team’s lunch break. Nobody waits.",
  },
  {
    cls: "f--reg",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="m19 8 2 2 4-4" />
      </>
    ),
    title: "Lead qualification",
    body: "Asks budget, location, timeline — scores the lead and pushes hot ones to your team.",
  },
  {
    cls: "f--tall",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </>
    ),
    title: "Books appointments",
    body: "Offers real open slots from your Google or Calendly calendar, confirms, and sends the reminder the day before.",
  },
  {
    cls: "f--tall",
    icon: (
      <>
        <path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
        <path d="M14 2v6h6M9 13l2 2 4-4" />
      </>
    ),
    title: "Catalogue & payment links",
    body: "Shares product cards, prices and a UPI or Razorpay link right in the thread — the sale closes without leaving WhatsApp.",
  },
  {
    cls: "f--reg",
    icon: (
      <>
        <path d="M5 8h14M5 8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2M5 8v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8" />
        <path d="M10 12h4" />
      </>
    ),
    title: "Smart human handoff",
    body: "Your rules: high value, angry tone, or “talk to someone” — it steps aside and briefs the human.",
  },
  {
    cls: "f--reg",
    icon: (
      <>
        <path d="M3 3v18h18" />
        <path d="m7 14 4-4 4 4 5-6" />
      </>
    ),
    title: "Broadcasts & follow-ups",
    body: "Nudges the ones who went quiet, announces a drop or an offer — within WhatsApp policy.",
  },
  {
    cls: "f--reg",
    icon: (
      <>
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
      </>
    ),
    title: "Everything, on the Vaanii platform",
    body: "Every contact, chat, tag and outcome lives in your Vaanii dashboard — full history, charts and requirements, all in one place.",
  },
  {
    cls: "f--reg",
    icon: (
      <>
        <path d="M12 2v20M2 12h20" />
        <circle cx="12" cy="12" r="9" />
      </>
    ),
    title: "Analytics dashboard",
    body: "Reply times, resolution rate, revenue attributed, and the questions customers ask most.",
  },
];

const CASES = [
  {
    tag: "D2C brands",
    title: "Turns enquiries into checkouts",
    body: "Answers “price?” and “COD available?”, shares the product, drops the payment link, recovers the abandoned cart.",
  },
  {
    tag: "Clinics & salons",
    title: "Fills the appointment book",
    body: "Shares services and prices, offers open slots, confirms, and cuts no-shows with a day-before reminder.",
  },
  {
    tag: "Real estate",
    title: "Qualifies before you call",
    body: "Captures budget, location and possession timeline, sends the brochure, books the site visit.",
  },
  {
    tag: "Coaching & edtech",
    title: "Never misses an admission lead",
    body: "Answers fee, batch and syllabus questions instantly, books a counselling call, follows up the fence-sitters.",
  },
  {
    tag: "Restaurants & cloud kitchens",
    title: "Takes the order and the booking",
    body: "Shares the menu, takes reservations and catering enquiries, answers timings and location on repeat.",
  },
  {
    tag: "Local services",
    title: "Quotes and schedules the job",
    body: "Electricians, packers, tutors, event teams — collects the detail, gives a ballpark, locks the slot.",
  },
];

const FAQ = [
  {
    q: "Does it use my own WhatsApp number?",
    a: "Yes. Vaanii runs on your existing business number. Your customers see your brand and your name — never ours.",
  },
  {
    q: "Do my customers need to install anything?",
    a: "No. It’s the same WhatsApp they already have on their phone. Nothing to download, no new app, no link to click.",
  },
  {
    q: "Which languages does it handle?",
    a: "Hindi and English, on every plan.",
  },
  {
    q: "How long until it’s live?",
    a: "Usually within a day once your number is verified with Meta. We help you through the setup and review your first replies before switching it on.",
  },
  {
    q: "When does a human take over?",
    a: "On your rules — an order above a value you set, a frustrated tone, specific keywords, or a customer asking for a person. The chat hands over to your team with the full context attached.",
  },
  {
    q: "Can I cancel?",
    a: "Any time, month to month. No annual contract, no exit fee.",
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main id="top" className="thread">
        {/* HERO */}
        <section className="wrap hero" id="hero">
          <div className="hero__grid">
            <div>
              <span className="hero__time">23:58 &nbsp;·&nbsp; shop is shut</span>
              <h1>
                Every customer replied to in <span className="accent">3 seconds</span>. Even at 2 AM.
              </h1>
              <p className="hero__sub">
                Vaanii reads, answers, qualifies and books — on your own WhatsApp number, in Hindi
                and English, while your team sleeps.
              </p>
              <div className="hero__actions">
                <a className="btn btn--lg" href="#pricing">
                  Choose plan{" "}
                  <span className="btn__arrow" aria-hidden="true">
                    &rarr;
                  </span>
                </a>
                <a className="btn btn--ghost btn--lg" href="#how">
                  See how it works
                </a>
              </div>
              <p className="hero__micro">
                <span>No app for your customers</span>
                <span>Works on your existing number</span>
                <span>Live in a day</span>
              </p>
            </div>
            <ChatDemo />
          </div>
        </section>

        {/* PROOF */}
        <section className="proof">
          <Reveal as="div" className="wrap proof__inner">
            <p className="proof__label">
              Handling WhatsApp conversations for 200+ Indian businesses.
            </p>
            <StatCounter value={3} suffix="s" caption="median first reply" />
            <StatCounter value={90} suffix="%" caption="chats resolved with no human" />
            <StatCounter value={24} suffix="/7" caption="nights, Sundays, festivals" />
          </Reveal>
        </section>

        {/* PROBLEM */}
        <section className="wrap beat" id="problem">
          <span className="beat__time">02:14 &nbsp;·&nbsp; a customer is still awake</span>
          <Reveal>
            <div className="chatblock chatblock--them">
              <div className="chatblock__from">Customer · 02:14</div>
              <p>&ldquo;Hi, price kya hai? Kal chahiye tha&hellip;&rdquo;</p>
            </div>
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: "1.8rem" }}>A missed message is missed money.</h2>
          </Reveal>
          <Reveal as="ul" className="painlist" group>
            <li>
              <span>
                <b>5 minutes.</b> That&rsquo;s how fast an enquiry goes cold. After that, they&rsquo;ve
                messaged three competitors too.
              </span>
            </li>
            <li>
              <span>
                <b>4 in 10</b> WhatsApp enquiries to small businesses never get a reply at all.
              </span>
            </li>
            <li>
              <span>
                <b>Nights &amp; Sundays</b> are when people actually have time to shop — and when
                nobody&rsquo;s at the phone.
              </span>
            </li>
          </Reveal>
        </section>

        {/* HOW */}
        <section className="wrap beat" id="how">
          <span className="beat__time">02:15 &nbsp;·&nbsp; Vaanii is already typing</span>
          <Reveal>
            <div className="chatblock chatblock--us">
              <div className="chatblock__from">Vaanii · 02:15</div>
              <p>
                &ldquo;Namaste! 3 options aapke budget mein — pehla ₹13,999&hellip; trial kal 4 PM
                free hai, book kar doon?&rdquo;
              </p>
            </div>
          </Reveal>
          <Reveal>
            <h2 style={{ marginTop: "1.8rem" }}>Set it up once. It works every shift after that.</h2>
          </Reveal>
          <Reveal>
            <p className="beat__lead">
              Vaanii connects to the WhatsApp Business Platform and answers from your number — your
              name, your tone, your catalogue.
            </p>
          </Reveal>
          <Reveal as="div" className="steps" group>
            <div className="step">
              <span className="step__n" />
              <h3>Connect your number</h3>
              <p>
                Link your existing WhatsApp business number through Vaanii. Keep your chat history.
              </p>
            </div>
            <div className="step">
              <span className="step__n" />
              <h3>Feed it your business</h3>
              <p>
                Upload your catalogue, price list, FAQs and calendar. Vaanii learns what to say and
                what to never say.
              </p>
            </div>
            <div className="step">
              <span className="step__n" />
              <h3>Go live — and watch</h3>
              <p>
                It replies, qualifies, shares links, books slots, and hands the tricky ones to a
                human with full context.
              </p>
            </div>
          </Reveal>
        </section>

        {/* FEATURES */}
        <section className="wrap beat" id="features">
          <span className="beat__time">09:30 &nbsp;·&nbsp; morning rush</span>
          <Reveal>
            <h2>Everything a good salesperson does — on every chat at once.</h2>
          </Reveal>
          <Reveal as="div" className="bento" group>
            {FEATURES.map((f) => (
              <div key={f.title} className={`f ${f.cls}`}>
                <div className="f__ic" aria-hidden="true">
                  <svg viewBox="0 0 24 24">{f.icon}</svg>
                </div>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* USE CASES */}
        <section className="wrap beat" id="cases">
          <span className="beat__time">13:00 &nbsp;·&nbsp; between customers</span>
          <Reveal>
            <h2>Built for the businesses that live on WhatsApp.</h2>
          </Reveal>
          <Reveal as="div" className="cases" group>
            {CASES.map((c) => (
              <div key={c.tag} className="case">
                <span className="case__tag">{c.tag}</span>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ROI */}
        <section className="wrap beat" id="roi">
          <span className="beat__time">18:45 &nbsp;·&nbsp; the after-work message spike</span>
          <Reveal>
            <h2>What are the missed chats actually costing you?</h2>
          </Reveal>
          <Reveal>
            <p className="beat__lead">
              Move the sliders. This is a rough estimate, not a promise — it assumes Vaanii recovers
              about 60% of missed enquiries and 22% of those convert.
            </p>
          </Reveal>
          <Reveal>
            <RoiCalculator />
          </Reveal>
        </section>

        {/* PRICING */}
        <section className="wrap beat" id="pricing">
          <span className="beat__time">21:00 &nbsp;·&nbsp; still open for business</span>
          <Reveal>
            <h2>Simple pricing. No lock-in.</h2>
          </Reveal>
          <Pricing />
          <p className="pricing__foot">
            WhatsApp charges Meta a fee per 24-hour conversation window. We pass those through at cost
            and show them in your dashboard.
          </p>
        </section>

        {/* TESTIMONIALS */}
        <section className="wrap beat" id="stories">
          <span className="beat__time">21:40 &nbsp;·&nbsp; wrapping up the day</span>
          <Reveal>
            <h2>The chats kept selling after closing time.</h2>
          </Reveal>
          <Reveal as="div" className="quotes" group>
            <figure className="quote">
              <p>
                &ldquo;We were losing every weekend enquiry. Last month Vaanii booked 34 bridal
                trials while the store was shut.&rdquo;
              </p>
              <figcaption>
                <span className="quote__av" aria-hidden="true">
                  PN
                </span>
                <span>
                  <b>Priya Nair</b>
                  <br />
                  Founder, Kanchi Bridal — Mumbai
                </span>
              </figcaption>
            </figure>
            <figure className="quote">
              <p>
                &ldquo;Patients message at midnight. Now they get a real answer and a slot straight
                away, not at 10 the next morning.&rdquo;
              </p>
              <figcaption>
                <span className="quote__av quote__av--b" aria-hidden="true">
                  RM
                </span>
                <span>
                  <b>Dr. Rohit Menon</b>
                  <br />
                  Smile Studio Dental — Kochi
                </span>
              </figcaption>
            </figure>
            <figure className="quote">
              <p>
                &ldquo;Our team stopped copy-pasting the price list forty times a day. Response time
                went from four hours to seconds.&rdquo;
              </p>
              <figcaption>
                <span className="quote__av quote__av--c" aria-hidden="true">
                  AR
                </span>
                <span>
                  <b>Aditya Rao</b>
                  <br />
                  Growth Lead, FitFuel — Bengaluru
                </span>
              </figcaption>
            </figure>
          </Reveal>
        </section>

        {/* FAQ */}
        <section className="wrap beat" id="faq">
          <span className="beat__time">23:10 &nbsp;·&nbsp; last questions of the night</span>
          <Reveal>
            <h2>Questions people ask before starting.</h2>
          </Reveal>
          <Reveal as="div" className="faq">
            {FAQ.map((item) => (
              <details key={item.q}>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </Reveal>
        </section>

        {/* FINAL CTA */}
        <section className="wrap final">
          <span className="beat__time" style={{ justifyContent: "center" }}>
            23:59 &nbsp;·&nbsp; the next message is coming
          </span>
          <h2>Start a conversation that sells itself.</h2>
          <p className="final__sub">
            Connect your number tonight. Wake up to answered chats and booked slots.
          </p>
          <div className="compose">
            <span className="compose__ghost">Type a message&hellip;</span>
            <a className="btn btn--lg" href="#pricing">
              Choose plan{" "}
              <span className="btn__arrow" aria-hidden="true">
                &rarr;
              </span>
            </a>
          </div>
          <p className="final__micro">Setup in a day · Cancel anytime · No card to start</p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
