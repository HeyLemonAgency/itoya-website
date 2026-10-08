"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cx } from "@/lib/format";

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  /** Direction the curtain opens towards. */
  from?: "bottom" | "top" | "left" | "right";
  delay?: number;
  /** Use "span" inside interactive elements such as buttons. */
  as?: "div" | "span";
};

const hidden = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

/**
 * Editorial image reveal: a clip-path curtain plus a slight scale settle.
 * With reduced motion the image appears at once (no wipe, no scale). Without JS the noscript
 * rule in the root layout removes the initial clip so images remain visible.
 */
export function ImageReveal({
  children,
  className,
  from = "bottom",
  delay = 0,
  as = "div",
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const Outer = as === "span" ? motion.span : motion.div;
  const Inner = as === "span" ? motion.span : motion.div;
  return (
    <Outer
      data-reveal=""
      className={cx("relative block overflow-hidden", className)}
      initial={{ clipPath: hidden[from] }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={reduce ? { duration: 0 } : { duration: 1.15, delay, ease: [0.76, 0, 0.24, 1] }}
    >
      <Inner
        className="absolute inset-0 block"
        initial={{ scale: 1.12 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </Inner>
    </Outer>
  );
}
