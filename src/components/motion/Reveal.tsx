"use client";

import { m, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Order within a group, for a light 80 ms stagger. */
  index?: number;
  delay?: number;
  /** Travel distance in px (brief: 12–24). */
  distance?: number;
  as?: "div" | "li" | "p" | "span" | "figure" | "header";
  className?: string;
} & Omit<HTMLMotionProps<"div">, "children">;

/** Small, once-only section reveal. Content stays visible without JS (see layout noscript). */
export function Reveal({
  children,
  index = 0,
  delay = 0,
  distance = 18,
  as = "div",
  className,
  ...rest
}: RevealProps) {
  const Component = m[as] as typeof m.div;
  return (
    <Component
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -8% 0px" }}
      transition={{
        duration: 0.8,
        delay: delay + index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...rest}
    >
      {children}
    </Component>
  );
}
