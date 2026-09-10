"use client";

import { useEffect, useReducer, useRef } from "react";

type Line = { side: "in" | "out"; text: string; t: string };

const SCRIPT: Line[] = [
  { side: "in", text: "Hi, aapke pas bridal lehenga hai? Budget 15k tak", t: "23:58" },
  { side: "out", text: "Ji haan! 👗 ₹12k–18k range mein 6 designs hain. 2 abhi bhejti hoon —", t: "23:58" },
  { side: "out", text: "A · ₹13,999 — wine, georgette\nB · ₹16,499 — teal, raw silk", t: "23:58" },
  { side: "in", text: "B pasand aaya. Trial ho sakta hai kal?", t: "23:59" },
  { side: "out", text: "Bilkul. Kal 4:00 PM slot free hai, Andheri store. Book kar doon?", t: "23:59" },
  { side: "in", text: "Haan book kar do 🙌", t: "23:59" },
  { side: "out", text: "Done ✅ Kal 4 PM, Andheri. Reminder kal bhej dungi.", t: "23:59" },
];

type State = { count: number; typing: boolean; read: boolean; caption: boolean };
type Action =
  | { type: "next" }
  | { type: "typing"; on: boolean }
  | { type: "read" }
  | { type: "caption" }
  | { type: "all" }
  | { type: "reset" };

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case "next":
      return { ...s, count: Math.min(s.count + 1, SCRIPT.length), typing: false };
    case "typing":
      return { ...s, typing: a.on };
    case "read":
      return { ...s, read: true };
    case "caption":
      return { ...s, caption: true };
    case "all":
      return { count: SCRIPT.length, typing: false, read: true, caption: true };
    case "reset":
      return { count: 0, typing: false, read: false, caption: false };
  }
}

export function ChatDemo() {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    typing: false,
    read: false,
    caption: false,
  });
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [state.count, state.typing]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      dispatch({ type: "all" });
      return;
    }

    let cancelled = false;
    const timers = new Set<number>();
    const after = (ms: number, fn: () => void) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        if (!cancelled) fn();
      }, ms);
      timers.add(id);
    };

    const play = (i: number, delay: number) => {
      after(delay, () => {
        if (i >= SCRIPT.length) {
          after(500, () => dispatch({ type: "read" }));
          after(1100, () => dispatch({ type: "caption" }));
          after(6800, () => {
            dispatch({ type: "reset" });
            play(0, 700);
          });
          return;
        }
        if (SCRIPT[i].side === "out") {
          dispatch({ type: "typing", on: true });
          after(850, () => {
            dispatch({ type: "next" });
            play(i + 1, 560);
          });
        } else {
          dispatch({ type: "next" });
          play(i + 1, 900);
        }
      });
    };

    let started = false;
    const start = () => {
      if (started || cancelled) return;
      started = true;
      play(0, 400);
    };

    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            start();
            io?.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      io.observe(root);
      after(2000, start);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      io?.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const shown = SCRIPT.slice(0, state.count);

  return (
    <div className="phone" ref={rootRef} aria-label="Example WhatsApp conversation handled by Vaanii">
      <div className="phone__screen">
        <div className="wa-head">
          <div className="wa-head__avatar" aria-hidden="true">
            K
          </div>
          <div>
            <div className="wa-head__name">Kanchi Bridal</div>
            <div className="wa-head__status">
              <b>online</b> · replies instantly
            </div>
          </div>
        </div>
        <div className="wa-body" ref={bodyRef}>
          {shown.map((m, i) => (
            <div
              key={i}
              className={`msg msg--${m.side}${
                m.side === "out" && state.read ? " msg--read" : ""
              }`}
            >
              {m.text}
              <span className="msg__meta">
                {m.t}
                {m.side === "out" && <span className="ticks"> ✓✓</span>}
              </span>
            </div>
          ))}
          {state.typing && (
            <div className="typing" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
          )}
        </div>
        <div className="wa-compose">
          <div className="wa-compose__field">Message</div>
          <div className="wa-compose__send" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M2 21l21-9L2 3v7l15 2-15 2z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="phone__caption" data-show={state.caption}>
        Booked in <b>90 seconds</b> · 23:59 · no human involved
      </div>
    </div>
  );
}
