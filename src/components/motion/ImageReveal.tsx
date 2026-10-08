"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
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
 *
 * The in-view trigger sits on an unclipped wrapper and is passed down with
 * variants — an element whose own clip-path is fully closed is never reported
 * as intersecting by the browser, so observing it directly would never fire.
 * With reduced motion the image appears at once. Without JS the noscript rule
 * in the root layout removes the initial clip so images remain visible.
 */
export function ImageReveal({
  children,
  className,
  from = "bottom",
  delay = 0,
  as = "div",
}: ImageRevealProps) {
  const reduce = useReducedMotion();
  const Outer = as === "span" ? m.span : m.div;
  const Mid = as === "span" ? m.span : m.div;
  const Inner = as === "span" ? m.span : m.div;

  const curtain: Variants = {
    hidden: { clipPath: hidden[from] },
    shown: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: reduce ? { duration: 0 } : { duration: 1.15, delay, ease: [0.76, 0, 0.24, 1] },
    },
  };
  const settle: Variants = {
    hidden: { scale: 1.12 },
    shown: {
      scale: 1,
      transition: reduce ? { duration: 0 } : { duration: 1.6, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <Outer
      className={cx("relative block", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.15 }}
    >
      <Mid data-reveal="" variants={curtain} className="absolute inset-0 block overflow-hidden">
        <Inner variants={settle} className="absolute inset-0 block">
          {children}
        </Inner>
      </Mid>
    </Outer>
  );
}
