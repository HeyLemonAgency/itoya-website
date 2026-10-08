"use client";

import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/** One rail of the dish belt: slides sideways while it crosses the viewport. */
export function BeltTrack({
  reverse = false,
  children,
}: {
  reverse?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ["-38%", "-4%"] : ["-4%", "-38%"]);

  return (
    <m.div ref={ref} className="flex w-max" style={{ x: reduce ? "-4%" : x }}>
      {children}
    </m.div>
  );
}
