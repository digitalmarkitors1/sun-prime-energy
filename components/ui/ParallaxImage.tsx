"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

type Props = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** translate amount in pixels; image moves opposite to scroll */
  translate?: number;
  /** end scale (e.g. 1.12) */
  scale?: number;
  children?: React.ReactNode;
};

export function ParallaxImage({
  src,
  alt,
  sizes,
  priority,
  className,
  translate = 80,
  scale = 1.12,
  children,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [translate, -translate]);
  const s = useTransform(scrollYProgress, [0, 1], [1, scale]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y, scale: s }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
      {children}
    </div>
  );
}
