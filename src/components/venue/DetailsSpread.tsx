"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, useState, type ReactNode } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Lightbox } from "@/components/gallery/Lightbox";

export type Figure = {
  photo: Photo;
  caption: string;
  /** Grid placement (columns, offsets). */
  className: string;
  /** Aspect ratio class of the frame. */
  aspect: string;
  /** Vertical drift with the scroll, in px either side (0 = none). */
  drift?: number;
};

/**
 * Details of the room laid out like a magazine spread: numbered figures on
 * a precise grid, each revealed by a curtain and drifting very slightly at
 * its own pace, which gives the page depth without any gimmick. Every
 * figure opens the lightbox (all the venue photos).
 */
export function DetailsSpread({
  figures,
  photos,
  heading,
}: {
  figures: Figure[];
  /** Every photo, in lightbox order. */
  photos: Photo[];
  /** Eyebrow and title, shown beside the « all photos » link. */
  heading: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = (i: number, from: HTMLElement) => {
    opener.current = from;
    setIndex(i);
  };

  return (
    <>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div>{heading}</div>
        <button
          type="button"
          onClick={(e) => open(0, e.currentTarget)}
          className="link-underline self-start text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ink lg:self-auto"
        >
          Voir les {photos.length} photos
        </button>
      </div>
      <div className="mt-16 grid grid-cols-6 gap-x-4 gap-y-14 lg:mt-24 lg:grid-cols-12 lg:gap-x-8 lg:gap-y-0">
        {figures.map((figure, i) => (
          <Drift key={figure.photo.src} amount={figure.drift ?? 0} className={figure.className}>
            <figure>
              <button
                type="button"
                onClick={(e) => open(photos.indexOf(figure.photo), e.currentTarget)}
                className="group block w-full cursor-zoom-in focus-visible:outline-offset-4"
              >
                <ImageReveal
                  as="span"
                  className={cx("w-full", figure.aspect)}
                  delay={(i % 3) * 0.1}
                >
                  <Image
                    src={figure.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 40vw, 60vw"
                    quality={78}
                    className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    style={{ objectPosition: figure.photo.position }}
                  />
                </ImageReveal>
                <span className="sr-only">Agrandir : {figure.photo.alt}</span>
              </button>
              <figcaption className="mt-4 flex items-baseline gap-3 border-t border-line pt-3 text-[0.8125rem] text-muted">
                <span className="text-[0.6875rem] font-semibold tracking-[0.16em] text-brass-deep tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {figure.caption}
              </figcaption>
            </figure>
          </Drift>
        ))}
      </div>
      <Lightbox photos={photos} index={index} onIndexChange={setIndex} returnFocus={opener} />
    </>
  );
}

function Drift({
  amount,
  className,
  children,
}: {
  amount: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <m.div ref={ref} className={className} style={{ y: reduce || !amount ? 0 : y }}>
      {children}
    </m.div>
  );
}
