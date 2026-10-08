"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";

/**
 * A dish cut-out "set down" on the page: it settles into place once, rests on
 * a soft contact shadow, and (for round, top-down platters only) turns very
 * slightly with the scroll, as a plate would on a lazy Susan. Nothing loops.
 */
export function DishPlate({
  photo,
  sizes,
  className,
  imageClassName,
  turnWithScroll = false,
  shadow = "md",
  delay = 0,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
  imageClassName?: string;
  /** Only for round platters photographed from above. */
  turnWithScroll?: boolean;
  shadow?: "sm" | "md" | "lg" | "none";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  const contact = {
    sm: "h-[9%] w-[70%] blur-[14px] opacity-35",
    md: "h-[10%] w-[78%] blur-[18px] opacity-40",
    lg: "h-[9%] w-[86%] blur-[24px] opacity-45",
    none: "hidden",
  }[shadow];

  return (
    <div ref={ref} className={cx("relative", className)}>
      <span
        aria-hidden
        className={cx(
          "absolute bottom-[1%] left-1/2 -translate-x-1/2 rounded-[50%] bg-[#3a2f22]",
          contact,
        )}
      />
      <motion.div
        data-reveal=""
        className="relative"
        initial={{ opacity: 0, y: 36, rotate: -5, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div style={{ rotate: turnWithScroll && !reduce ? rotate : 0 }}>
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            sizes={sizes}
            quality={82}
            className={cx(
              "h-auto w-full select-none [filter:drop-shadow(0_18px_22px_rgba(58,47,34,0.18))]",
              imageClassName,
            )}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
