"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";
import { ChevronLeft, ChevronRight, CloseIcon } from "@/components/ui/Icons";
import { ImageReveal } from "@/components/motion/ImageReveal";

/**
 * Editorial photo grid + accessible lightbox (Radix Dialog: focus trap,
 * Escape, focus return). Arrow keys and buttons navigate; nothing depends on
 * hover or drag.
 */
export function Gallery({ photos, className }: { photos: Photo[]; className?: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i === null ? i : (i + delta + photos.length) % photos.length));
    },
    [photos.length],
  );

  // Varied proportions keep the grid editorial rather than uniform.
  const frames = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]", "aspect-[4/5]"];

  return (
    <>
      <ul className={cx("columns-2 gap-4 sm:gap-6 lg:columns-3 lg:gap-8", className)}>
        {photos.map((photo, i) => (
          <li key={photo.src} className="mb-4 break-inside-avoid sm:mb-6 lg:mb-8">
            <button
              type="button"
              onClick={() => {
                setDirection(0);
                setIndex(i);
              }}
              className="group relative block w-full cursor-zoom-in overflow-hidden focus-visible:outline-offset-4"
            >
              <ImageReveal
                as="span"
                className={cx("w-full", frames[i % frames.length])}
                delay={(i % 3) * 0.08}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 30vw, 50vw"
                  quality={72}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  style={{ objectPosition: photo.position }}
                />
              </ImageReveal>
              <span className="sr-only">Agrandir : {photo.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      <Dialog.Root open={open} onOpenChange={(o) => !o && setIndex(null)}>
        <AnimatePresence>
          {open ? (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <motion.div
                  className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              </Dialog.Overlay>
              <Dialog.Content
                forceMount
                aria-describedby={undefined}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") go(1);
                  if (e.key === "ArrowLeft") go(-1);
                }}
                className="fixed inset-0 z-[90] flex flex-col text-ivory outline-none"
              >
                <div className="container-x flex h-20 shrink-0 items-center justify-between">
                  <Dialog.Title className="eyebrow text-ivory/70 tabular">
                    Photo {index! + 1} sur {photos.length}
                  </Dialog.Title>
                  <Dialog.Close className="inline-flex min-h-11 items-center gap-2 px-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em]">
                    Fermer
                    <CloseIcon size={20} />
                  </Dialog.Close>
                </div>

                <div className="relative flex min-h-0 flex-1 items-center justify-center px-[var(--gutter)]">
                  <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.figure
                      key={index}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -40 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="relative flex h-full w-full flex-col items-center justify-center"
                    >
                      <div className="relative h-full max-h-[calc(100svh-12rem)] w-full">
                        <Image
                          src={photos[index!].src}
                          alt={photos[index!].alt}
                          fill
                          sizes="100vw"
                          quality={82}
                          className="object-contain"
                        />
                      </div>
                      <figcaption className="mt-4 max-w-xl text-center text-[0.875rem] text-ivory/75">
                        {photos[index!].alt}
                      </figcaption>
                    </motion.figure>
                  </AnimatePresence>
                </div>

                <div className="container-x flex h-24 shrink-0 items-center justify-center gap-4 pb-[env(safe-area-inset-bottom)]">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-inset ring-ivory/30 transition-colors hover:ring-ivory"
                  >
                    <ChevronLeft size={20} />
                    <span className="sr-only">Photo précédente</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    className="inline-flex h-12 w-12 items-center justify-center rounded-full ring-1 ring-inset ring-ivory/30 transition-colors hover:ring-ivory"
                  >
                    <ChevronRight size={20} />
                    <span className="sr-only">Photo suivante</span>
                  </button>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          ) : null}
        </AnimatePresence>
      </Dialog.Root>
    </>
  );
}
