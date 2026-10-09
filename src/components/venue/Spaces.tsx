"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";

export type Space = { id: string; title: string; text: string; photo: Photo };

/**
 * The spaces of the restaurant as panels that open out (the « Hover Expand »
 * / « Expanding Cards » pattern from 21st.dev, @educalvolpz and @vaib215,
 * rebuilt here with CSS flex transitions). Side by side on large screens,
 * stacked on phones. Opens on hover (mouse), keyboard focus or tap; every
 * caption stays in the page for screen readers.
 */
export function Spaces({ spaces, className }: { spaces: Space[]; className?: string }) {
  const [active, setActive] = useState(0);
  const uid = useId();

  // Panels sliding under a still cursor while the page scrolls do not open:
  // only a real mouse movement does.
  const quietUntil = useRef(0);
  useEffect(() => {
    const scroll = () => (quietUntil.current = performance.now() + 200);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);

  return (
    <ul
      className={cx(
        "flex h-[46rem] flex-col gap-2 sm:h-[52rem] lg:h-[clamp(32rem,72svh,42rem)] lg:flex-row lg:gap-3",
        className,
      )}
    >
      {spaces.map((space, i) => {
        const on = i === active;
        const captionId = `${uid}-${space.id}`;
        return (
          <li
            key={space.id}
            onPointerMove={(e) => {
              if (e.pointerType !== "mouse" || i === active) return;
              if (!e.movementX && !e.movementY) return;
              if (performance.now() < quietUntil.current) return;
              setActive(i);
            }}
            className={cx(
              "relative min-h-[4.25rem] basis-0 overflow-hidden bg-ink text-ivory transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none lg:min-w-[4.5rem]",
              on ? "grow-[6]" : "grow",
            )}
          >
            <Image
              src={space.photo.src}
              alt={space.photo.alt}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              quality={74}
              className={cx(
                "object-cover transition-[transform,filter] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                on ? "scale-100" : "scale-110 brightness-[0.5] saturate-[0.75]",
              )}
              style={{ objectPosition: space.photo.position }}
            />
            <div
              aria-hidden
              className={cx(
                "absolute inset-0 transition-opacity duration-700",
                "bg-[linear-gradient(to_top,rgba(20,22,18,0.9),rgba(20,22,18,0.35)_45%,transparent_75%)]",
                on ? "opacity-100" : "opacity-60",
              )}
            />

            <button
              type="button"
              aria-expanded={on}
              aria-controls={captionId}
              onClick={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="absolute inset-0 z-10 cursor-pointer text-left focus-visible:outline-offset-[-4px]"
            >
              {/* Collapsed label: vertical on large screens, a row on phones. */}
              <span
                aria-hidden
                className={cx(
                  "absolute flex items-center gap-4 transition-opacity duration-300",
                  "inset-x-5 top-1/2 -translate-y-1/2 lg:inset-x-auto lg:top-8 lg:bottom-8 lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0 lg:flex-col",
                  on ? "opacity-0" : "opacity-100 delay-200",
                )}
              >
                <span className="text-[0.75rem] font-semibold tracking-[0.14em] text-brass tabular">
                  0{i + 1}
                </span>
                <span className="font-serif text-[1.375rem] leading-none whitespace-nowrap lg:[writing-mode:vertical-rl]">
                  {space.title}
                </span>
              </span>
              <span className="sr-only">Découvrir : {space.title}</span>
            </button>

            <div
              id={captionId}
              className={cx(
                "pointer-events-none absolute inset-x-0 bottom-0 z-10 p-6 transition-[opacity,transform] duration-500 sm:p-8 lg:p-10 motion-reduce:transition-none",
                on ? "translate-y-0 opacity-100 delay-200" : "translate-y-4 opacity-0",
              )}
            >
              <p className="text-[0.75rem] font-semibold tracking-[0.14em] text-brass tabular">
                0{i + 1}
              </p>
              <h3 className="mt-2 font-serif text-[clamp(1.75rem,1.2rem+1.6vw,2.75rem)] leading-[1.05]">
                {space.title}
              </h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-ivory/80">
                {space.text}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
