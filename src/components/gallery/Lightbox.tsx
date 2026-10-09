"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useState, type RefObject } from "react";
import type { Photo } from "@/content/media";
import { ChevronLeft, ChevronRight, CloseIcon } from "@/components/ui/Icons";

/**
 * Accessible photo lightbox (Radix Dialog: focus trap, Escape, focus return
 * to the element that opened it). Arrow keys and buttons navigate; nothing
 * depends on hover or drag. Controlled: `index` is the photo shown, `null`
 * when closed.
 */
export function Lightbox({
  photos,
  index,
  onIndexChange,
  returnFocus,
}: {
  photos: Photo[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  /** Element to focus again on close (the one that opened the lightbox). */
  returnFocus?: RefObject<HTMLElement | null>;
}) {
  const [direction, setDirection] = useState(0);
  const open = index !== null;

  const go = useCallback(
    (delta: number) => {
      if (index === null) return;
      setDirection(delta);
      onIndexChange((index + delta + photos.length) % photos.length);
    },
    [index, onIndexChange, photos.length],
  );

  return (
    <>
      <Dialog.Root
        open={open}
        onOpenChange={(o) => {
          if (!o) onIndexChange(null);
          setDirection(0);
        }}
      >
        <AnimatePresence>
          {open ? (
            <Dialog.Portal forceMount>
              <Dialog.Overlay asChild forceMount>
                <m.div
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
                onCloseAutoFocus={(e) => {
                  if (!returnFocus?.current) return;
                  e.preventDefault();
                  returnFocus.current.focus();
                }}
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
                    <m.figure
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
                          loading="eager"
                          className="object-contain"
                        />
                      </div>
                      <figcaption className="mt-4 max-w-xl text-center text-[0.875rem] text-ivory/75">
                        {photos[index!].alt}
                      </figcaption>
                    </m.figure>
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
