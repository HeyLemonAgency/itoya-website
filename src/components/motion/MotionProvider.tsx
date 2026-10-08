"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Site-wide motion policy: Motion honours the visitor's reduced-motion
 * preference (transforms are dropped, opacity fades remain). Media autoplay,
 * pointer parallax and the ambient hero drift are disabled separately with
 * useReducedMotion() / CSS where they are implemented.
 *
 * Components use the lightweight `m` elements; LazyMotion loads the animation
 * features after hydration (`strict` flags any accidental full `motion` use).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user" transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
