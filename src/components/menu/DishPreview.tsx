"use client";

import Image from "next/image";
import {
  AnimatePresence,
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useEffect, useState, type RefObject } from "react";
import type { DishImage } from "@/content/menu-images";

/** Same condition as the `desk` variant in globals.css. */
const QUERY = "(min-width: 64rem) and (hover: hover) and (pointer: fine)";
const BOX = 220;
const GAP = 28;

/**
 * Desktop only: hovering a dish on the menu shows the restaurant's own photo
 * of it, floating just above the cursor and leaning slightly with its
 * movement. One delegated listener on the list (no per-row state), so the
 * menu itself never re-renders. Decorative: every dish keeps its name, and
 * touch screens get thumbnails in the rows instead.
 */
export function DishPreview({
  root,
  images,
}: {
  root: RefObject<HTMLElement | null>;
  images: Record<string, DishImage>;
}) {
  const [id, setId] = useState<string | null>(null);
  const reduce = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  // Which side of the cursor the photo sits on (flips near the edges).
  const offsetX = useMotionValue(GAP);
  const offsetY = useMotionValue(-(GAP + BOX));
  const follow = { stiffness: 420, damping: 36, mass: 0.6 };
  const flip = { stiffness: 260, damping: 30 };
  const sx = useSpring(x, follow);
  const sy = useSpring(y, follow);
  const sox = useSpring(offsetX, flip);
  const soy = useSpring(offsetY, flip);

  const left = useTransform(() => (reduce ? x.get() + offsetX.get() : sx.get() + sox.get()));
  const top = useTransform(() => (reduce ? y.get() + offsetY.get() : sy.get() + soy.get()));
  const lean = useTransform(useVelocity(sx), [-1800, 1800], [-10, 10], { clamp: true });

  useEffect(() => {
    const list = root.current;
    if (!list) return;
    const mq = window.matchMedia(QUERY);
    let pointer: { x: number; y: number } | null = null;
    let current: string | null = null;

    const show = (target: Element | null) => {
      const next = target?.closest<HTMLElement>("[data-dish]")?.dataset.dish ?? null;
      if (next && !current) {
        // Appear at the cursor rather than flying in from the last position.
        sx.jump(x.get());
        sy.jump(y.get());
        sox.jump(offsetX.get());
        soy.jump(offsetY.get());
      }
      current = next;
      setId(next);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !mq.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      x.set(event.clientX);
      y.set(event.clientY);
      offsetX.set(event.clientX + GAP + BOX > window.innerWidth - 24 ? -(GAP + BOX) : GAP);
      offsetY.set(event.clientY - GAP - BOX < 150 ? GAP : -(GAP + BOX));
      show(event.target as Element);
    };
    const hide = () => {
      pointer = null;
      current = null;
      setId(null);
    };
    // Scrolling moves the rows under a still cursor.
    const scroll = () => {
      if (pointer) show(document.elementFromPoint(pointer.x, pointer.y));
    };

    list.addEventListener("pointermove", move);
    list.addEventListener("pointerleave", hide);
    window.addEventListener("scroll", scroll, { passive: true });
    mq.addEventListener("change", hide);
    return () => {
      list.removeEventListener("pointermove", move);
      list.removeEventListener("pointerleave", hide);
      window.removeEventListener("scroll", scroll);
      mq.removeEventListener("change", hide);
    };
  }, [root, x, y, offsetX, offsetY, sx, sy, sox, soy]);

  const image = id ? images[id] : undefined;

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-40 hidden desk:block"
      style={{ x: left, y: top, rotate: reduce ? 0 : lean, width: BOX, height: BOX }}
    >
      <AnimatePresence>
        {image ? (
          <m.div
            key={id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.18 } }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
          >
            <Image
              src={image.src}
              alt=""
              width={image.width}
              height={image.height}
              sizes={`${BOX}px`}
              quality={80}
              loading="eager"
              className="h-full w-full object-contain [filter:drop-shadow(0_22px_24px_rgba(20,22,18,0.32))]"
            />
          </m.div>
        ) : null}
      </AnimatePresence>
    </m.div>
  );
}
