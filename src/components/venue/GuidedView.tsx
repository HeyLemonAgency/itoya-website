"use client";

import Image from "next/image";
import { m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";

export type Stop = {
  id: string;
  title: string;
  text: string;
  /** Where the camera looks, in % of the photo, and how close (1 = whole frame). */
  focus: { x: number; y: number; zoom: number };
};

type Size = { fw: number; fh: number; cw: number; ch: number };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const EASE = [0.65, 0, 0.35, 1] as const;

/**
 * « La salle » as a guided look around: the photo stays in place (sticky)
 * while short chapters scroll past beside it; each one sends the camera,
 * slowly, to the detail it describes. No labels on the picture, no
 * scrubbing: one deliberate move per chapter (the « Sticky Scroll Reveal »
 * pattern from 21st.dev, @manuarora700, rebuilt as a camera).
 *
 * Phones: the photo sticks under the header and the chapters pass below it.
 * Reduced motion: the camera cuts instead of travelling (MotionConfig).
 */
export function GuidedView({ photo, stops }: { photo: Photo; stops: Stop[] }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<Size | null>(null);

  // The photo is laid out at its own proportions, large enough to cover the frame.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const ratio = photo.width / photo.height;
    const measure = () => {
      const fw = frame.clientWidth;
      const fh = frame.clientHeight;
      const ch = Math.max(fh, fw / ratio);
      setSize({ fw, fh, cw: ch * ratio, ch });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [photo.width, photo.height]);

  // The chapter crossing the reading line is the active one.
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = Array.from(list.children) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * (window.innerWidth >= 1024 ? 0.55 : 0.78);
      let next = 0;
      items.forEach((item, i) => {
        if (item.getBoundingClientRect().top < line) next = i;
      });
      setActive(next);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Camera: scale about the photo's centre, then shift so the focus point
  // sits in the middle of the frame, never showing past the photo's edges.
  const { x: fx, y: fy, zoom } = stops[active].focus;
  let camera = { x: 0, y: 0, scale: zoom };
  if (size) {
    const maxX = (size.cw * zoom - size.fw) / 2;
    const maxY = (size.ch * zoom - size.fh) / 2;
    camera = {
      scale: zoom,
      x: clamp(-zoom * (fx / 100 - 0.5) * size.cw, -maxX, maxX),
      y: clamp(-zoom * (fy / 100 - 0.5) * size.ch, -maxY, maxY),
    };
  }

  return (
    <div className="grid lg:grid-cols-12 lg:gap-x-10">
      <div className="sticky top-16 z-10 -mx-[var(--gutter)] h-[52svh] bg-ink lg:top-24 lg:order-2 lg:col-span-7 lg:col-start-6 lg:mx-0 lg:h-[calc(100svh-8rem)]">
        <div ref={frameRef} className="relative h-full w-full overflow-hidden">
          <m.div
            className="absolute top-1/2 left-1/2"
            style={{
              width: size?.cw ?? "100%",
              height: size?.ch ?? "100%",
              translateX: "-50%",
              translateY: "-50%",
            }}
          >
            <m.div
              className="absolute inset-0 origin-center"
              initial={false}
              animate={camera}
              transition={{ duration: 1.6, ease: EASE }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 110vw, 220vw"
                quality={80}
                className="object-cover"
              />
            </m.div>
          </m.div>
          {/* A quiet counter in the corner, nothing on the picture itself. */}
          <p
            aria-hidden
            className="absolute right-4 bottom-4 text-[0.6875rem] font-semibold tracking-[0.2em] text-ivory/80 tabular [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] lg:right-6 lg:bottom-5"
          >
            {String(active + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
          </p>
        </div>
      </div>

      <ol ref={listRef} className="lg:order-1 lg:col-span-4">
        {stops.map((stop, i) => (
          <li
            key={stop.id}
            className="flex min-h-[56svh] items-center py-12 lg:min-h-[78svh] lg:py-0"
          >
            <div>
              <p className="text-[0.75rem] font-semibold tracking-[0.16em] text-brass-deep tabular">
                {String(i + 1).padStart(2, "0")}
              </p>
              {/* The chapter being shown is inked; the others stay legible (≥ 3:1). */}
              <h3
                className={cx(
                  "mt-3 font-serif text-[clamp(1.875rem,1.4rem+1.4vw,2.75rem)] leading-[1.08] transition-colors duration-700",
                  i === active ? "text-ink" : "text-[#868070]",
                )}
              >
                {stop.title}
              </h3>
              <p className="mt-4 max-w-sm text-[1rem] leading-relaxed text-muted">{stop.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
