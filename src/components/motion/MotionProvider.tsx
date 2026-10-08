"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Site-wide motion policy: Motion honours the visitor's reduced-motion
 * preference (transforms are dropped, opacity fades remain). Media autoplay,
 * pointer parallax and the ambient hero drift are disabled separately with
 * useReducedMotion() where they are implemented.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionConfig>
  );
}
