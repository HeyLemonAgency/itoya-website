"use client";

import Image from "next/image";
import { m, useReducedMotion } from "motion/react";
import { useEffect, useId, useRef, useState } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";

export type Space = { id: string; title: string; text: string; photo: Photo; position?: string };

const INTENT_MS = 140;

/**
 * The spaces of the restaurant as an index beside one large photograph, in
 * the manner of the menu's dish stage: pointing at a name (or focusing or
 * tapping it) opens its short description and draws its photo over the
 * previous one with a slow curtain. Calm by design: a short hover intent,
 * and nothing changes because the page scrolled under a still cursor.
 */
export function SpacesIndex({ spaces }: { spaces: Space[] }) {
  const reduce = useReducedMotion();
  const uid = useId();
  const [view, setView] = useState({ current: 0, previous: -1 });
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const quietUntil = useRef(0);

  useEffect(() => {
    const scroll = () => {
      quietUntil.current = performance.now() + 200;
      clearTimeout(timer.current);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      clearTimeout(timer.current);
    };
  }, []);

  const show = (i: number) =>
    setView((v) => (v.current === i ? v : { current: i, previous: v.current }));

  const current = spaces[view.current];
  const previous = view.previous >= 0 ? spaces[view.previous] : null;
  const curtain = reduce ? { duration: 0 } : { duration: 1.15, ease: [0.76, 0, 0.24, 1] as const };
  const settle = reduce ? { duration: 0 } : { duration: 1.7, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-10">
      {/* The stage */}
      <div className="relative z-10 h-[min(40svh,76vw)] overflow-hidden bg-forest max-lg:sticky max-lg:top-20 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:h-auto lg:aspect-[4/5]">
        {previous ? <StagePhoto space={previous} decorative /> : null}
        <m.div
          key={current.id}
          className="absolute inset-0"
          initial={previous ? { clipPath: "inset(100% 0% 0% 0%)" } : false}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={curtain}
        >
          <m.div
            className="absolute inset-0"
            initial={previous ? { scale: 1.1 } : false}
            animate={{ scale: 1 }}
            transition={settle}
          >
            <StagePhoto space={current} />
          </m.div>
        </m.div>
        <p
          aria-hidden
          className="absolute right-4 bottom-4 text-[0.6875rem] font-semibold tracking-[0.2em] text-ivory/85 tabular [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]"
        >
          {String(view.current + 1).padStart(2, "0")} / {String(spaces.length).padStart(2, "0")}
        </p>
      </div>

      {/* The index */}
      <ol className="border-t border-ivory/15 lg:col-span-5 lg:col-start-1 lg:row-start-1">
        {spaces.map((space, i) => {
          const on = i === view.current;
          const textId = `${uid}-${space.id}`;
          return (
            <li key={space.id} className="border-b border-ivory/15">
              <button
                type="button"
                aria-expanded={on}
                aria-controls={textId}
                onClick={() => show(i)}
                onFocus={() => show(i)}
                onPointerMove={(e) => {
                  if (e.pointerType !== "mouse" || on) return;
                  if (!e.movementX && !e.movementY) return;
                  if (performance.now() < quietUntil.current) return;
                  clearTimeout(timer.current);
                  timer.current = setTimeout(() => show(i), INTENT_MS);
                }}
                onPointerLeave={() => clearTimeout(timer.current)}
                className="group flex w-full items-baseline gap-5 py-5 text-left lg:gap-7 lg:py-6"
              >
                <span className="w-7 shrink-0 text-[0.75rem] font-semibold tracking-[0.14em] text-brass tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cx(
                    "font-serif text-[clamp(1.75rem,1.15rem+1.9vw,3.1rem)] leading-none transition-colors duration-500",
                    on ? "text-ivory" : "text-ivory/45 group-hover:text-ivory/75",
                  )}
                >
                  {space.title}
                </span>
                <span
                  aria-hidden
                  className={cx(
                    "ml-auto h-px self-center bg-brass transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    on ? "w-10 lg:w-16" : "w-0",
                  )}
                />
              </button>
              <div
                id={textId}
                className={cx(
                  "grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                  on ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                )}
              >
                <div className="overflow-hidden">
                  <p className="max-w-md pb-6 pl-12 text-[0.9375rem] leading-relaxed text-ivory/75 lg:pl-14">
                    {space.text}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StagePhoto({ space, decorative = false }: { space: Space; decorative?: boolean }) {
  return (
    <Image
      src={space.photo.src}
      alt={decorative ? "" : space.photo.alt}
      fill
      sizes="(min-width: 1024px) 45vw, 100vw"
      quality={78}
      className="object-cover"
      style={{ objectPosition: space.position ?? space.photo.position }}
    />
  );
}
