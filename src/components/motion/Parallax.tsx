"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cx } from "@/lib/format";

/**
 * Gentle scroll-linked drift for large atmospheric images. The child should
 * fill an oversized box (we add 2 × amount of bleed) so edges never show.
 */
export function Parallax({
  children,
  amount = 8,
  className,
}: {
  children: ReactNode;
  /** Maximum travel, in % of the frame height. */
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={cx("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-x-0"
        style={{
          top: `-${amount}%`,
          bottom: `-${amount}%`,
          y: reduce ? 0 : y,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
