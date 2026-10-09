"use client";

import { getImageProps } from "next/image";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { media } from "@/content/media";

/** One character of the restaurant's lettering per panel, as on a real noren. */
const PANELS = ["i", "to", "ya"] as const;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/**
 * « Passer le noren » — the page opens in front of three indigo noren
 * carrying 伊 · 藤 · 屋. As the reader scrolls, the side panels are drawn
 * aside and the middle one swings away, and the room appears behind them.
 * A breeze (pointer movement, scroll speed) makes the fabric sway.
 *
 * The headline is in the page from the first frame, below the curtains.
 * Short sticky stage (one extra screen), never intercepts scrolling. Reduced
 * motion: no stage, the curtains are shown already drawn aside.
 */
export function NorenHero({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // 0 = closed, 1 = drawn aside. Reduced motion: half drawn, still (the same
  // pose is also set in CSS, so it holds from the first paint).
  const open = useTransform(() =>
    reduce ? 0.55 : easeInOut(clamp01(scrollYProgress.get() / 0.85)),
  );

  // Breeze: pointer movement and scroll speed push the fabric, a soft spring
  // lets it swing back.
  const push = useMotionValue(0);
  const breeze = useSpring(push, { stiffness: 55, damping: 7, mass: 0.9 });
  const scrollSpeed = useVelocity(scrollY);
  useEffect(() => {
    if (reduce) return;
    let settle: ReturnType<typeof setTimeout> | undefined;
    const nudge = (v: number) => {
      push.set(Math.max(-6, Math.min(6, v)));
      clearTimeout(settle);
      settle = setTimeout(() => push.set(0), 140);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType === "mouse") nudge(e.movementX * 0.22);
    };
    const el = ref.current;
    el?.addEventListener("pointermove", onPointer);
    const unsubscribe = scrollSpeed.on("change", (v) => nudge(v * 0.0025));
    return () => {
      clearTimeout(settle);
      el?.removeEventListener("pointermove", onPointer);
      unsubscribe();
    };
  }, [push, reduce, scrollSpeed]);

  const photoScale = useTransform(open, [0, 1], [1.16, 1]);
  const veil = useTransform(open, [0, 1], [0.5, 0.15]);
  const cue = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const { desktop, mobile } = { desktop: media.room.canopyWide, mobile: media.intro.canopy };
  const shared = { alt: desktop.alt, sizes: "100vw", quality: 78 };
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
      className="relative h-[190svh] bg-ink text-ivory motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-[100svh] min-h-[36rem] overflow-hidden motion-reduce:relative">
        {/* The room, behind the curtains */}
        <m.div className="absolute inset-0" style={{ scale: reduce ? 1 : photoScale }}>
          <picture>
            <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
            <img
              {...imgProps}
              srcSet={mobileSrcSet}
              alt={desktop.alt}
              className="absolute inset-0 h-full w-full object-cover [object-position:var(--pos-m)] md:[object-position:var(--pos-d)]"
              style={
                {
                  "--pos-d": "50% 40%",
                  "--pos-m": mobile.position ?? "50% 50%",
                } as CSSProperties
              }
            />
          </picture>
        </m.div>
        <m.div aria-hidden className="absolute inset-0 bg-ink" style={{ opacity: veil }} />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(20,22,18,0.92)_0%,rgba(20,22,18,0.55)_30%,transparent_60%)]"
        />
        <div aria-hidden className="grain absolute inset-0" />

        {/* The noren */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-16 flex justify-center [perspective:1400px]"
        >
          <div className="relative w-[min(94vw,62rem)]">
            <span className="noren-rod absolute -inset-x-[4%] top-0 h-2.5 rounded-full" />
            <div className="flex justify-center gap-[0.6%] pt-1.5">
              {PANELS.map((char, i) => (
                <Panel key={char} char={char} index={i} open={open} breeze={breeze} />
              ))}
            </div>
          </div>
        </div>

        {/* Headline, present from the first frame */}
        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-x pb-10 sm:pb-14 lg:pb-16">{children}</div>
        </div>

        <m.p
          aria-hidden
          style={{ opacity: cue }}
          className="noren-cue absolute right-[var(--gutter)] bottom-10 z-10 hidden items-center gap-3 text-[0.6875rem] font-semibold uppercase tracking-[0.2em] text-ivory/75 md:flex motion-reduce:hidden"
        >
          Faites défiler pour entrer
          <span className="relative block h-10 w-px overflow-hidden bg-ivory/25" />
        </m.p>
      </div>
    </section>
  );
}

function Panel({
  char,
  index,
  open,
  breeze,
}: {
  char: (typeof PANELS)[number];
  index: number;
  open: MotionValue<number>;
  breeze: MotionValue<number>;
}) {
  const side = index - 1; // -1 left, 0 middle, 1 right
  const sway = [1.15, 0.8, 1.3][index];

  // Side panels are drawn aside and swing; the middle one is lifted away.
  const x = useTransform(open, (e) => `${side * e * 150}%`);
  const y = useTransform(open, (e) => (side === 0 ? `${-e * 118}%` : "0%"));
  const rotate = useTransform(() => side * open.get() * 11 + breeze.get() * sway);
  const rotateX = useTransform(open, (e) => (side === 0 ? e * 38 : 0));
  const scaleY = useTransform(open, (e) => (side === 0 ? 1 : 1 - e * 0.08));

  return (
    <m.div
      className="noren-panel relative h-[34svh] w-[32.6%] origin-top sm:h-[38svh] lg:h-[40svh]"
      style={{ x, y, rotate, rotateX, scaleY }}
    >
      <span
        className="noren-kanji absolute inset-x-[16%] top-[26%] bottom-[14%]"
        style={{ "--kanji": `url(/brand/kanji-${char}.svg)` } as CSSProperties}
      />
    </m.div>
  );
}
