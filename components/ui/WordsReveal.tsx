"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Splits text into words, each rendered inside an overflow-hidden mask.
 * Each word slides up into view on scroll-enter. Premium editorial reveal.
 */
export function WordsReveal({ text, className, delay = 0, stagger = 0.05 }: Props) {
  const reduce = useReducedMotion();
  const words = text.split(/\s+/);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-flex overflow-hidden align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              delay: delay + i * stagger,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
