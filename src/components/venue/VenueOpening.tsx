"use client";

import { getImageProps } from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { media } from "@/content/media";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * The room seen through a narrow opening that widens to the full screen as
 * the page scrolls, while the two halves of the title draw apart (the
 * « Scroll Expansion Hero » pattern from 21st.dev, @arunachalam, rebuilt).
 *
 * A single motion value, `--e` (0 → 1), drives everything through CSS
 * (`.venue-opening` in globals.css): the clip of the photo, its counter-zoom,
 * the title and the closing caption. One extra screen of sticky stage; the
 * title is in the page from the first frame. Reduced motion: the photo is
 * shown whole with the title over it, and nothing moves.
 */
export function VenueOpening({
  before,
  after,
  eyebrow,
  caption,
}: {
  /** First half of the title (left of the opening, or above it on phones). */
  before: ReactNode;
  /** Second half (right of the opening, or below it). */
  after: ReactNode;
  eyebrow: ReactNode;
  /** Shown over the photo once it is fully open. */
  caption: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const e = useTransform(() => (reduce ? 1 : easeInOut(clamp01(scrollYProgress.get() / 0.82))));

  const desktop = media.room.canopyWide;
  const mobile = media.intro.canopy;
  const shared = { alt: desktop.alt, sizes: "100vw", quality: 80 };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...shared, src: desktop.src, width: desktop.width, height: desktop.height });
  const {
    props: { srcSet: mobileSrcSet, ...imgProps },
  } = getImageProps({
    ...shared,
    src: mobile.src,
    width: mobile.width,
    height: mobile.height,
    fetchPriority: "high",
    loading: "eager",
  });

  return (
    <section
      ref={ref}
      aria-labelledby="venue-title"
      className="venue-opening relative bg-ink text-ivory"
    >
      <m.div className="vo-stage" style={{ "--e": e } as unknown as CSSProperties}>
        <div className="vo-frame">
          <div className="vo-photo">
            <picture>
              <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
              <img
                {...imgProps}
                srcSet={mobileSrcSet}
                alt={desktop.alt}
                className="absolute inset-0 h-full w-full object-cover object-[50%_45%] md:object-[50%_38%]"
              />
            </picture>
          </div>
          <div aria-hidden className="vo-shade" />
        </div>

        <p className="vo-eyebrow eyebrow text-sakura">{eyebrow}</p>
        <h1 id="venue-title" className="vo-title">
          <span className="vo-before">{before}</span> <span className="vo-after">{after}</span>
        </h1>
        <div className="vo-caption container-x">{caption}</div>
        <p aria-hidden className="vo-cue">
          Défiler
        </p>
      </m.div>
    </section>
  );
}
