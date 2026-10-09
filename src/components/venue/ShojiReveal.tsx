"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;

/**
 * A photo behind two shoji screens — translucent paper on a wooden lattice —
 * that slide open as the frame scrolls into view. The room shows faintly
 * through the paper before they part. Reduced motion: shown open.
 */
export function ShojiReveal({
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

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "center 0.42"] });
  const open = useTransform(() => (reduce ? 1 : easeOut(clamp01(scrollYProgress.get()))));
  const left = useTransform(open, (e) => `${-e * 101}%`);
  const right = useTransform(open, (e) => `${e * 101}%`);
  const zoom = useTransform(open, [0, 1], [1.12, 1]);

  return (
    <div ref={ref} className={cx("relative overflow-hidden bg-ink", className)}>
      <m.div className="absolute inset-0" style={{ scale: zoom }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          quality={78}
          className="object-cover"
          style={{ objectPosition: photo.position }}
        />
      </m.div>
      <m.div aria-hidden className="shoji absolute inset-y-0 left-0 w-1/2" style={{ x: left }} />
      <m.div aria-hidden className="shoji absolute inset-y-0 right-0 w-1/2" style={{ x: right }} />
    </div>
  );
}
