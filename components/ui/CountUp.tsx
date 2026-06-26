"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Props = {
  value: string;
  className?: string;
  duration?: number;
};

/**
 * Animates numeric strings (e.g. "2,000+", "150") from 0 to the target on
 * scroll-in. Non-numeric values (e.g. "ISO 9001", "Pan-India") render as-is.
 *
 * Robustness: if the IntersectionObserver hasn't fired within 1500 ms of mount,
 * the final value is shown anyway so the number is never stuck at 0.
 */
export function CountUp({ value, className, duration = 1500 }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();

  const match = value.match(/^([\d,]+)(.*)$/);
  const numeric = match && /^\d/.test(match[1]) ? match[1].replace(/,/g, "") : null;
  const target = numeric ? parseInt(numeric, 10) : null;
  const suffix = target !== null && match ? match[2] : "";

  const formatted = target !== null ? target.toLocaleString("en-IN") : value;
  const [display, setDisplay] = useState<string>(formatted);
  const animatedRef = useRef(false);

  useEffect(() => {
    if (target === null) return;
    if (animatedRef.current) return;

    if (reduce) {
      setDisplay(formatted);
      animatedRef.current = true;
      return;
    }

    // Failsafe: if observer hasn't triggered within 1.5s, just show the target
    const failsafe = setTimeout(() => {
      if (!animatedRef.current) {
        setDisplay(formatted);
        animatedRef.current = true;
      }
    }, 1500);

    if (!inView) return () => clearTimeout(failsafe);

    clearTimeout(failsafe);
    animatedRef.current = true;
    setDisplay("0");

    let raf: number;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(target * eased).toLocaleString("en-IN"));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(formatted);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, [inView, target, duration, reduce, formatted]);

  if (target === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
