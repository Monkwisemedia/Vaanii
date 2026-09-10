"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders the final value on the server, so the correct number is always
 * visible even if JS never runs. When it scrolls into view the client
 * resets to 0 and counts up as a pure enhancement; a setTimeout floor
 * guarantees it lands back on the exact target.
 */
export function StatCounter({
  value,
  suffix = "",
  caption,
}: {
  value: number;
  suffix?: string;
  caption: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const animate = () => {
      if (started.current) return;
      started.current = true;

      const duration = 1100;
      let start: number | null = null;
      setDisplay(0);
      const tick = (ts: number) => {
        if (start === null) start = ts;
        const p = Math.min((ts - start) / duration, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      window.setTimeout(() => setDisplay(value), duration + 500);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <div className="stat" ref={ref}>
      <div className="stat__num">
        {display}
        <span className="unit">{suffix}</span>
      </div>
      <div className="stat__cap">{caption}</div>
    </div>
  );
}
