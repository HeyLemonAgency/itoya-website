"use client";

/*
 * The light-follows-the-pointer idea comes from « Spotlight » by ibelick
 * (motion-primitives, listed on 21st.dev), MIT licence — see
 * docs/PROJECT_NOTES.md. Here it reveals a photo instead of tinting a card.
 */

import Image from "next/image";
import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import type { Photo } from "@/content/media";

/**
 * The night canopy in near darkness; a warm pool of lantern light follows the
 * pointer (or the finger), revealing the blossoms. Without a pointer the
 * light drifts slowly across the room as the page scrolls. Reduced motion:
 * the light rests in one place.
 */
export function LanternLight({ photo, children }: { photo: Photo; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Position in % of the section.
  const pointerX = useMotionValue<number | null>(null);
  const pointerY = useMotionValue<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const targetX = useTransform(() =>
    reduce ? 62 : (pointerX.get() ?? 28 + scrollYProgress.get() * 44),
  );
  // Kept in the upper part of the scene, above the text.
  const targetY = useTransform(() =>
    reduce ? 38 : Math.min(68, Math.max(8, pointerY.get() ?? 36)),
  );
  const x = useSpring(targetX, { stiffness: 70, damping: 18 });
  const y = useSpring(targetY, { stiffness: 70, damping: 18 });

  const mask = useMotionTemplate`radial-gradient(circle clamp(10rem, 26vw, 22rem) at ${x}% ${y}%, #000 0%, #000 30%, rgb(0 0 0 / 0.55) 62%, transparent 100%)`;
  const glow = useMotionTemplate`radial-gradient(circle clamp(12rem, 30vw, 26rem) at ${x}% ${y}%, rgb(255 190 120 / 0.3), rgb(255 190 120 / 0.08) 45%, transparent 72%)`;

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const move = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointerX.set(((e.clientX - rect.left) / rect.width) * 100);
      pointerY.set(((e.clientY - rect.top) / rect.height) * 100);
    };
    const leave = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      pointerX.set(null);
      pointerY.set(null);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerdown", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerdown", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [pointerX, pointerY, reduce]);

  return (
    <section
      ref={ref}
      aria-labelledby="close-title"
      className="relative isolate flex min-h-[clamp(36rem,92svh,54rem)] items-end overflow-hidden bg-ink text-ivory"
    >
      {/* The room in the dark… */}
      <Image
        src={photo.src}
        alt=""
        fill
        sizes="100vw"
        quality={70}
        className="object-cover brightness-[0.2] saturate-[0.6]"
        style={{ objectPosition: photo.position }}
      />
      {/* …and where the lantern shines. */}
      <m.div
        aria-hidden
        className="absolute inset-0"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="100vw"
          quality={70}
          className="object-cover brightness-[1.12] saturate-[1.1]"
          style={{ objectPosition: photo.position }}
        />
      </m.div>
      <m.div
        aria-hidden
        className="absolute inset-0 mix-blend-screen"
        style={{ backgroundImage: glow }}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,22,18,0.94)_0%,rgba(20,22,18,0.5)_30%,transparent_58%)]"
      />
      <div aria-hidden className="grain absolute inset-0" />

      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
