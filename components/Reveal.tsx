"use client";

import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

type Tag = "div" | "ul" | "section";

/**
 * Scroll-reveal wrapper. The hidden state lives behind `html.js-anim` (added
 * here on mount), so if JS never runs the content stays visible. A 2.6s
 * safety timer reveals anything the IntersectionObserver misses.
 */
export function Reveal({
  as = "div",
  group = false,
  className = "",
  children,
  id,
}: {
  as?: Tag;
  group?: boolean;
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    document.documentElement.classList.add("js-anim");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    const safety = window.setTimeout(() => setShown(true), 2600);

    return () => {
      io.disconnect();
      window.clearTimeout(safety);
    };
  }, []);

  return createElement(
    as,
    {
      ref,
      id,
      className: shown ? `${className} in`.trim() : className,
      [group ? "data-reveal-group" : "data-reveal"]: "",
    },
    children
  );
}
