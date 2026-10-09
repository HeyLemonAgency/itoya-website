"use client";

import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { getImageProps } from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import type { DishImage } from "@/content/menu-images";
import type { MenuCategory, MenuItem } from "@/content/types";
import { cx } from "@/lib/format";
import { Price, dishMeta } from "./Price";

/** Same condition as the `desk` variant in globals.css. */
const DESK = "(min-width: 64rem) and (hover: hover) and (pointer: fine)";
/** Pointer must rest this long on a row before the stage changes. */
const INTENT_MS = 90;
/** Rows sliding under a still cursor while scrolling are ignored. */
const SCROLL_QUIET_MS = 180;
const EASE = [0.22, 1, 0.36, 1] as const;

function stageImage(image: DishImage) {
  const { src, srcSet, sizes, width, height } = getImageProps({
    src: image.src,
    alt: "",
    width: image.width,
    height: image.height,
    sizes: "416px",
    quality: 80,
  }).props;
  return { src, srcSet, sizes, width, height };
}

/** Loads and decodes a photo before it is shown, so a dish never appears half drawn. */
const ready = new Map<string, Promise<void>>();
function preload(id: string, image: DishImage) {
  let promise = ready.get(id);
  if (!promise) {
    const props = stageImage(image);
    const img = new window.Image();
    if (props.sizes) img.sizes = props.sizes;
    if (props.srcSet) img.srcset = props.srcSet;
    img.src = props.src;
    promise = Promise.race([
      img.decode().catch(() => undefined),
      new Promise<void>((resolve) => setTimeout(resolve, 1500)),
    ]);
    ready.set(id, promise);
  }
  return promise;
}

type Located = { item: MenuItem; section: string };

/**
 * Desktop menu « vitrine »: a round window beside the list, in the spirit of
 * the opening scene, that shows the dish the pointer rests on, with its card
 * below. It stays put while the page scrolls (sticky) and changes calmly:
 * a short hover intent, no reaction to rows sliding under a still cursor, and
 * each photo is loaded before the swap. When the reader scrolls into a new
 * category it shows that category's signature dish.
 *
 * Decorative (aria-hidden): every dish keeps its name, description and price
 * in the list itself. Touch screens get thumbnails in the rows instead.
 */
export function DishStage({
  root,
  menu,
  images,
  fallback,
  className,
}: {
  /** The list whose rows carry `data-dish` attributes. */
  root: RefObject<HTMLElement | null>;
  menu: MenuCategory[];
  images: Record<string, DishImage>;
  /** Dish to show when the reader has not pointed at one (category lead, first result). */
  fallback?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const [current, setCurrent] = useState(fallback);
  const [pointed, setPointed] = useState(false);
  const wanted = useRef(fallback);
  const pickedAt = useRef(-Infinity);

  const dishes = useMemo(() => {
    const map = new Map<string, Located>();
    for (const category of menu)
      for (const section of category.sections)
        for (const item of section.items) map.set(item.id, { item, section: section.title });
    return map;
  }, [menu]);

  const show = useCallback(
    (id: string) => {
      const image = images[id];
      if (!image) return;
      wanted.current = id;
      preload(id, image).then(() => {
        if (wanted.current === id) setCurrent(id);
      });
    },
    [images],
  );

  // Hover intent, delegated on the list.
  useEffect(() => {
    const list = root.current;
    if (!list) return;
    const desk = window.matchMedia(DESK);
    let timer: ReturnType<typeof setTimeout> | undefined;
    let candidate: string | undefined;
    let quietUntil = 0;

    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || !desk.matches) return;
      if (performance.now() < quietUntil) return;
      const id = (event.target as Element).closest<HTMLElement>("[data-dish]")?.dataset.dish;
      if (!id || id === candidate) return;
      candidate = id;
      clearTimeout(timer);
      timer = setTimeout(() => {
        pickedAt.current = performance.now();
        setPointed(true);
        show(id);
      }, INTENT_MS);
    };
    const settle = () => {
      clearTimeout(timer);
      candidate = undefined;
    };
    const scroll = () => {
      quietUntil = performance.now() + SCROLL_QUIET_MS;
      settle();
    };

    list.addEventListener("pointermove", move);
    list.addEventListener("pointerleave", settle);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      clearTimeout(timer);
      list.removeEventListener("pointermove", move);
      list.removeEventListener("pointerleave", settle);
      window.removeEventListener("scroll", scroll);
    };
  }, [root, show]);

  // New category in view (or new search results): show its lead dish, unless
  // the reader has just pointed at something.
  useEffect(() => {
    if (!fallback || performance.now() - pickedAt.current < 800) return;
    show(fallback);
  }, [fallback, show]);

  const located = current ? dishes.get(current) : undefined;
  const image = current ? images[current] : undefined;
  if (!located || !image) return <div aria-hidden className={className} />;

  const { item, section } = located;
  const meta = [item.description, ...dishMeta(item)].filter(Boolean).join(" · ");
  const selector = `[data-dish="${current?.replace(/[^\w-]/g, "")}"]`;

  const enter = image.cutout
    ? reduce
      ? { opacity: 0 }
      : { opacity: 0, y: 22, scale: 0.94, rotate: -4, filter: "blur(6px)" }
    : reduce
      ? { opacity: 0 }
      : { opacity: 0, scale: 1.08 };
  const leave = reduce
    ? { opacity: 0 }
    : { opacity: 0, scale: image.cutout ? 1.03 : 1, filter: "blur(4px)" };

  return (
    <aside aria-hidden className={cx("pt-16 lg:pt-24", className)}>
      {/* The row on show is marked in the list (desktop only). */}
      <style>{`@media ${DESK}{${selector} .dish-name,${selector} .dish-number{color:var(--color-sakura-deep)}${selector}::before{transform:scaleY(1)}}`}</style>

      <div className="sticky top-[10.5rem] pb-12">
        <figure className="mx-auto w-full max-w-[min(26rem,calc(100svh-25rem))]">
          <div className="relative aspect-square">
            {/* brass rings, as on the opening window */}
            <span className="absolute -inset-5 rounded-full border border-brass/35" />
            <span className="absolute -inset-2.5 rounded-full border border-brass/20" />

            <div className="absolute inset-0 overflow-hidden rounded-full bg-ink shadow-[0_50px_90px_-40px_rgba(20,22,18,0.6)]">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,#334036_0%,#1d241f_46%,#141612_76%)]" />
              {/* Full-frame photos are seen through the window. */}
              <AnimatePresence initial={false}>
                {!image.cutout ? (
                  <m.img
                    key={current}
                    {...stageImage(image)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                    initial={enter}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={leave}
                    transition={{ duration: 0.7, ease: EASE }}
                  />
                ) : null}
              </AnimatePresence>
              <div className="grain absolute inset-0" />
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_70px_rgba(0,0,0,0.5)]" />
            </div>

            {/* Cut-outs sit in the window and may overlap its rim. */}
            <AnimatePresence initial={false}>
              {image.cutout ? (
                <m.img
                  key={current}
                  {...stageImage(image)}
                  alt=""
                  className="absolute inset-[7%] h-[86%] w-[86%] object-contain [filter:drop-shadow(0_30px_28px_rgba(0,0,0,0.55))]"
                  initial={enter}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: "blur(0px)" }}
                  exit={leave}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              ) : null}
            </AnimatePresence>
          </div>

          <figcaption className="relative mt-14 min-h-[11rem] text-center">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={current}
                initial={{ opacity: 0, y: reduce ? 0 : 8 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } }}
                exit={{ opacity: 0, y: reduce ? 0 : -6, transition: { duration: 0.15 } }}
              >
                <p className="eyebrow text-[0.6875rem] text-brass-deep">
                  {item.number ? `N° ${item.number} · ` : null}
                  {section}
                </p>
                <p className="mt-3 font-serif text-[2rem] font-semibold leading-[1.1] text-ink">
                  {item.name}
                  {item.japanese ? (
                    <span lang="ja" className="jp ml-2 text-[1.125rem] text-muted">
                      {item.japanese}
                    </span>
                  ) : null}
                </p>
                {meta ? (
                  <p className="mx-auto mt-2 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
                    {meta}
                  </p>
                ) : null}
                <Price
                  item={item}
                  className={cx(
                    "mt-4 font-serif text-[1.5rem] font-semibold text-ink",
                    !!item.prices?.length && "mx-auto items-center",
                  )}
                />
              </m.div>
            </AnimatePresence>
            <p
              className={cx(
                "mt-6 text-[0.8125rem] text-muted transition-opacity duration-500",
                pointed && "opacity-0",
              )}
            >
              Survolez la carte pour voir chaque plat.
            </p>
          </figcaption>
        </figure>
      </div>
    </aside>
  );
}
