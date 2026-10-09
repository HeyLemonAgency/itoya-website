"use client";

import Image from "next/image";
import {
  animate,
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type PanInfo,
} from "motion/react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";
import { ChevronLeft, ChevronRight } from "@/components/ui/Icons";

export type Spot = {
  id: string;
  /** Position on the photo, in % of its width and height. */
  x: number;
  y: number;
  title: string;
  text: string;
};

type Geometry = { fw: number; fh: number; lw: number; lh: number };

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * « La salle » — the room as a panorama wider than the screen. It travels
 * from left to right as the page scrolls past (no pinning), and can be
 * dragged or swiped, or moved with the arrow buttons. Points of interest
 * open a short caption on hover, focus or tap; focusing one brings it into
 * view. Reduced motion: no scroll travel (dragging and buttons still work).
 */
export function RoomPanorama({
  photo,
  spots,
  className,
}: {
  photo: Photo;
  spots: Spot[];
  className?: string;
}) {
  const frameRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [geo, setGeo] = useState<Geometry | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const uid = useId();

  // Measure: the photo is shown at least 1.45× the frame width so there is
  // always something to explore.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const ratio = photo.width / photo.height;
    const measure = () => {
      const fw = frame.clientWidth;
      const fh = frame.clientHeight;
      const lh = Math.max(fh, (fw * 1.45) / ratio);
      setGeo({ fw, fh, lw: lh * ratio, lh });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => ro.disconnect();
  }, [photo.width, photo.height]);

  // Motion values (not closures) so scroll-driven updates always see the
  // current geometry and motion preference.
  const range = useMotionValue(0); // how far left the photo can go (≤ 0)
  useEffect(() => range.set(geo ? geo.fw - geo.lw : 0), [geo, range]);

  // Travel with the page…
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const travel = useTransform(() =>
    reduce ? range.get() / 2 : clamp((scrollYProgress.get() - 0.12) / 0.76, 0, 1) * range.get(),
  );
  // …plus whatever the reader drags, kept within the photo.
  const offset = useMotionValue(0);
  // While a point has keyboard focus the photo holds it in view, whatever
  // the page scroll does.
  const anchored = useMotionValue(0);
  const anchorX = useMotionValue(0);
  const x = useTransform(() =>
    clamp(anchored.get() ? anchorX.get() : travel.get() + offset.get(), range.get(), 0),
  );

  const nudge = useCallback(
    (target: number, instant = false) => {
      const next = clamp(target, range.get(), 0) - travel.get();
      if (instant) offset.set(next);
      else animate(offset, next, { type: "spring", stiffness: 160, damping: 26 });
    },
    [offset, range, travel],
  );

  const onPan = (_: PointerEvent, info: PanInfo) => {
    nudge(x.get() + info.delta.x, true);
  };
  const onPanEnd = (_: PointerEvent, info: PanInfo) => {
    // A little momentum.
    nudge(x.get() + info.velocity.x * 0.25);
  };

  const step = (direction: 1 | -1) => nudge(x.get() - direction * (geo?.fw ?? 0) * 0.5);

  const focusSpot = (spot: Spot) => {
    if (!geo) return;
    const target = clamp(geo.fw / 2 - (spot.x / 100) * geo.lw, range.get(), 0);
    anchorX.set(x.get());
    anchored.set(1);
    animate(anchorX, target, { type: "spring", stiffness: 160, damping: 26 });
  };
  const releaseSpot = () => {
    if (!anchored.get()) return;
    offset.set(x.get() - travel.get());
    anchored.set(0);
  };

  return (
    <div className={className}>
      <div
        ref={frameRef}
        className="relative h-[clamp(26rem,74svh,48rem)] cursor-grab touch-pan-y overflow-hidden bg-ink select-none active:cursor-grabbing"
      >
        <m.div
          className={cx("absolute left-0", geo ? "" : "inset-y-0 w-[160%]")}
          style={geo ? { x, width: geo.lw, height: geo.lh, top: (geo.fh - geo.lh) / 2 } : { x }}
          onPan={onPan}
          onPanEnd={onPanEnd}
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            draggable={false}
            sizes="(min-width: 1024px) 160vw, 300vw"
            quality={76}
            className="pointer-events-none object-cover"
          />
          {geo
            ? spots.map((spot) => (
                <Hotspot
                  key={spot.id}
                  spot={spot}
                  id={`${uid}-${spot.id}`}
                  open={active === spot.id}
                  onOpen={() => setActive(spot.id)}
                  onClose={() => setActive((a) => (a === spot.id ? null : a))}
                  onToggle={() => setActive((a) => (a === spot.id ? null : spot.id))}
                  onFocusSpot={() => focusSpot(spot)}
                  onBlurSpot={releaseSpot}
                />
              ))
            : null}
        </m.div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(20,22,18,0.35),transparent_12%,transparent_88%,rgba(20,22,18,0.35))]"
        />
      </div>

      <div className="container-x mt-6 flex items-center justify-between gap-6">
        <p className="text-[0.875rem] text-muted">
          <span className="hidden sm:inline">
            Faites glisser la photo, ou utilisez les flèches.{" "}
          </span>
          <span className="sm:hidden">Faites glisser la photo. </span>
          Touchez les points pour découvrir la salle.
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => step(-1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-line ring-inset transition-colors hover:ring-ink"
          >
            <ChevronLeft size={18} />
            <span className="sr-only">Voir la partie gauche de la salle</span>
          </button>
          <button
            type="button"
            onClick={() => step(1)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ink ring-1 ring-line ring-inset transition-colors hover:ring-ink"
          >
            <ChevronRight size={18} />
            <span className="sr-only">Voir la partie droite de la salle</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Hotspot({
  spot,
  id,
  open,
  onOpen,
  onClose,
  onToggle,
  onFocusSpot,
  onBlurSpot,
}: {
  spot: Spot;
  id: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  onFocusSpot: () => void;
  onBlurSpot: () => void;
}) {
  // Label and caption sit on the side with more photo.
  const toLeft = spot.x > 62;
  const below = spot.y < 35;
  return (
    <div
      className="absolute z-10"
      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
      // A real mouse movement, not the photo sliding under a still cursor.
      onPointerMove={(e) => e.pointerType === "mouse" && (e.movementX || e.movementY) && onOpen()}
      onPointerLeave={(e) => e.pointerType === "mouse" && onClose()}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        onFocus={() => {
          onFocusSpot();
          onOpen();
        }}
        onBlur={() => {
          onBlurSpot();
          onClose();
        }}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        onPointerDown={(e) => e.stopPropagation()}
        className={cx(
          "group absolute top-0 flex -translate-y-1/2 cursor-pointer items-center gap-1",
          toLeft
            ? "right-0 flex-row-reverse translate-x-[1.375rem]"
            : "left-0 -translate-x-[1.375rem]",
        )}
      >
        <span aria-hidden className="relative flex h-11 w-11 shrink-0 items-center justify-center">
          <span className="hotspot-ring absolute inset-1 rounded-full border border-ivory/80" />
          <span
            className={cx(
              "relative h-3.5 w-3.5 rounded-full shadow-[0_0_0_4px_rgba(20,22,18,0.35)] transition-[transform,background-color] duration-300",
              open ? "scale-125 bg-sakura-pale" : "bg-ivory group-hover:scale-125",
            )}
          />
        </span>
        <span
          className={cx(
            "rounded-full px-3 py-1.5 text-[0.6875rem] font-semibold whitespace-nowrap uppercase tracking-[0.14em] backdrop-blur-md transition-colors duration-300",
            open ? "bg-ivory text-ink" : "bg-ink/65 text-ivory",
          )}
        >
          {spot.title}
        </span>
      </button>
      <p
        id={id}
        className={cx(
          "pointer-events-none absolute w-[min(16rem,70vw)] rounded-sm bg-ink/85 px-4 py-3 text-[0.875rem] leading-relaxed text-ivory/90 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md transition-[opacity,transform] duration-300",
          toLeft ? "right-0" : "left-0",
          below ? "top-7" : "bottom-7",
          open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        )}
      >
        {spot.text}
      </p>
    </div>
  );
}
