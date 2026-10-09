"use client";

import Image from "next/image";
import { useRef, useState, type ReactNode } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";
import { Floating, FloatingElement } from "@/components/motion/ParallaxFloating";
import { Lightbox } from "@/components/gallery/Lightbox";

export type FloatingPhoto = {
  photo: Photo;
  /** Depth: larger floats further (pointer and scroll). */
  depth: number;
  /** Position and width classes. */
  className: string;
  /** Hidden on phones to keep the centre clear. */
  wide?: boolean;
  /** Slight rotation, in degrees, like prints laid on a table. */
  tilt?: number;
};

/**
 * Details of the room floating at different depths around the title: they
 * drift with the pointer and with the scroll (adapted Parallax Floating).
 * Each one opens the lightbox, which holds every photo of the venue.
 */
export function FloatingDetails({
  items,
  photos,
  children,
}: {
  items: FloatingPhoto[];
  /** Every photo, in lightbox order. */
  photos: Photo[];
  children: ReactNode;
}) {
  const [index, setIndex] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  return (
    <>
      <Floating sensitivity={-0.9} easing={0.07} scrollDepth={60}>
        {items.map((item) => {
          const at = photos.indexOf(item.photo);
          return (
            <FloatingElement
              key={item.photo.src}
              depth={item.depth}
              className={cx(item.className, item.wide && "max-md:hidden")}
            >
              <button
                type="button"
                onClick={(e) => {
                  opener.current = e.currentTarget;
                  setIndex(at);
                }}
                className="group block w-full cursor-zoom-in overflow-hidden bg-parchment shadow-[0_30px_60px_-30px_rgba(20,22,18,0.55)] focus-visible:outline-offset-4"
                style={{
                  aspectRatio: `${item.photo.width} / ${item.photo.height}`,
                  rotate: `${item.tilt ?? 0}deg`,
                }}
              >
                <span className="relative block h-full w-full">
                  <Image
                    src={item.photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 22vw, 44vw"
                    quality={72}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    style={{ objectPosition: item.photo.position }}
                  />
                </span>
                <span className="sr-only">Agrandir : {item.photo.alt}</span>
              </button>
            </FloatingElement>
          );
        })}
      </Floating>

      <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center px-[var(--gutter)] text-center">
        {children}
        <button
          type="button"
          onClick={(e) => {
            opener.current = e.currentTarget;
            setIndex(0);
          }}
          className="pointer-events-auto mt-9 inline-flex min-h-12 items-center gap-3 rounded-full bg-ink px-6 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-forest"
        >
          Voir les {photos.length} photos
        </button>
      </div>

      <Lightbox photos={photos} index={index} onIndexChange={setIndex} returnFocus={opener} />
    </>
  );
}
