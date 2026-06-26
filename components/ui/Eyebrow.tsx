"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  tone?: "ink" | "mist" | "amber";
  className?: string;
};

const tones = {
  ink: "text-ink/60",
  mist: "text-mist/60",
  amber: "text-amber",
};

export function Eyebrow({ children, tone = "ink", className }: Props) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-3 text-[11px] font-medium uppercase",
        tones[tone],
        className,
      )}
      style={{ letterSpacing: "var(--tracking-eyebrow)" }}
    >
      <motion.span
        aria-hidden
        className="block h-px w-6 origin-left bg-current opacity-50"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={reduce ? undefined : { scaleX: 1 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      />
      <span>{children}</span>
    </div>
  );
}
