"use client";

import { m } from "motion/react";
import { cx } from "@/lib/format";

/**
 * 伊藤屋 — the restaurant's own brush lettering (traced from its logo, see
 * public/brand/itoya-kanji.svg), laid down from left to right like a stroke
 * of ink when it scrolls into view.
 *
 * A CSS mask (the lettering intersected with a soft-edged gradient, see
 * `.brush-kanji` in globals.css) does the drawing; Motion only moves the
 * gradient. Reduced motion and no-JS show the lettering complete. Decorative:
 * the name is already given in text everywhere it matters.
 */
export function BrushReveal({ className }: { className?: string }) {
  return (
    <m.div
      aria-hidden
      className={cx("brush-kanji", className)}
      initial={{ "--brush": "100%" }}
      whileInView={{ "--brush": "0%" }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 2.4, ease: [0.55, 0.05, 0.25, 1] }}
    />
  );
}
