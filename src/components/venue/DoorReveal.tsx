"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * A photograph that opens from its centre, like two sliding doors, as it
 * scrolls into view: a fine brass seam first, then the room. The doors are
 * only suggested (a clip), nothing is drawn. Driven by one custom property,
 * `--e`, see `.door-reveal` in globals.css. Reduced motion: shown open.
 */
export function DoorReveal({
  photo,
  sizes,
  className,
}: {
  photo: Photo;
  sizes: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "center 0.5"] });
  const e = useTransform(() => (reduce ? 1 : easeInOut(clamp01(scrollYProgress.get()))));

  return (
    <m.div
      ref={ref}
      className={cx("door-reveal relative", className)}
      style={{ "--e": e } as unknown as CSSProperties}
    >
      <div className="door-photo absolute inset-0 overflow-hidden">
        <div className="door-zoom absolute inset-0">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes={sizes}
            quality={80}
            className="object-cover"
            style={{ objectPosition: photo.position }}
          />
        </div>
      </div>
      <span aria-hidden className="door-seam" />
    </m.div>
  );
}
