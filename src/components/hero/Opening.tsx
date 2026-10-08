"use client";

import Image, { getImageProps } from "next/image";
import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { formatService } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { PauseIcon, PlayIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { Petals } from "./Petals";

const line = (i: number) => ({ "--i": i }) as CSSProperties;

type Geometry = { w: number; h: number; wide: boolean };

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** How far the scene has closed into the round window (0 = full screen). */
function closing(p: number, g: Geometry) {
  return easeInOut(clamp01((p - 0.04) / (g.wide ? 0.72 : 0.66)));
}

/** Circle geometry for a given closing amount, in px inside the scene box. */
function windowShape(e: number, g: Geometry) {
  const target = g.wide
    ? { cx: g.w * 0.735, cy: g.h * 0.53, r: Math.min(g.w * 0.205, g.h * 0.355, 360) }
    : { cx: g.w * 0.5, cy: g.h * 0.8, r: Math.min(g.w * 0.42, g.h * 0.22, 240) };
  const full = Math.hypot(g.w, g.h) / 2 + 4;
  return {
    cx: lerp(g.w / 2, target.cx, e),
    cy: lerp(g.h / 2, target.cy, e),
    r: lerp(full, target.r, e),
  };
}

/** Position and size of a frame ring drawn `inset` px outside the window. */
function useRing(amount: MotionValue<number>, geo: MotionValue<Geometry>, inset: number) {
  const left = useTransform(() => {
    const s = windowShape(amount.get(), geo.get());
    return s.cx - s.r - inset;
  });
  const top = useTransform(() => {
    const s = windowShape(amount.get(), geo.get());
    return s.cy - s.r - inset;
  });
  const size = useTransform(() => 2 * (windowShape(amount.get(), geo.get()).r + inset));
  return { left, top, size };
}

function useShape(progress: MotionValue<number>, geo: MotionValue<Geometry>) {
  const amount = useTransform(() => closing(progress.get(), geo.get()));
  const clipPath = useTransform(() => {
    const e = amount.get();
    if (e <= 0) return "none";
    const { cx, cy, r } = windowShape(e, geo.get());
    return `circle(${r.toFixed(1)}px at ${cx.toFixed(1)}px ${cy.toFixed(1)}px)`;
  });
  const outer = useRing(amount, geo, 22);
  const inner = useRing(amount, geo, 11);
  return { amount, clipPath, outer, inner };
}

/**
 * The homepage opening: « Le Japon, sous les fleurs ».
 *
 * 1. First paint — the restaurant's own night photo of the blossom ceiling,
 *    art-directed per device, with the headline and booking action as live
 *    HTML (CSS entrance, no wait for hydration). Petals drift on the right.
 * 2. First scroll — the full-screen scene closes into a round marumado
 *    window, the circular window found in the restaurant's own decor, and
 *    settles beside the welcome text (large screens: the scene layer is
 *    sticky; phones: the window closes as the hero leaves the screen).
 *    Native scrolling throughout: no hijacking and no extra scroll length.
 * 3. Ambient — slow compositor-only drift, pointer depth on fine pointers,
 *    a visible Pause control; paused off screen or when the tab is hidden.
 *
 * Reduced motion: no drift, petals, depth or window transition; the hero
 * stays full-bleed and the welcome section shows a static round window.
 */
export function Opening() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const inView = useInView(wrapRef, { amount: 0.02 });
  const running = !reduce && !paused && inView && pageVisible;

  /* ── Scene geometry (measured, so the circle is exact in px) ────────── */
  const geo = useMotionValue<Geometry>({ w: 1440, h: 900, wide: true });
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const wideQuery = window.matchMedia("(min-width: 64rem)");
    const update = () => {
      const r = el.getBoundingClientRect();
      geo.set({ w: r.width, h: r.height, wide: wideQuery.matches });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    wideQuery.addEventListener("change", update);
    return () => {
      observer.disconnect();
      wideQuery.removeEventListener("change", update);
    };
  }, [geo]);

  /* ── Scroll: hero copy lifts away, the scene closes into the window ─── */
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const shape = useShape(scrollYProgress, geo);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-14%"]);
  const imageZoom = useTransform(shape.amount, [0, 1], [1, 1.16]);
  const overlayOpacity = useTransform(shape.amount, [0, 0.85], [1, 0.12]);
  const frameOpacity = useTransform(shape.amount, [0.78, 1], [0, 1]);
  // Large screens: the welcome text arrives with the window, never over the photo.
  const welcomeOpacity = useTransform(shape.amount, [0.42, 0.8], [0, 1]);

  /* ── Pointer depth (fine pointers only) ─────────────────────────────── */
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 35, damping: 18, mass: 0.8 });
  const springY = useSpring(pointerY, { stiffness: 35, damping: 18, mass: 0.8 });
  const copyPX = useTransform(springX, (v) => v * -0.3);
  const copyPY = useTransform(springY, (v) => v * -0.3);

  useEffect(() => {
    if (reduce || paused) {
      pointerX.set(0);
      pointerY.set(0);
      return;
    }
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const onMove = (e: PointerEvent) => {
      pointerX.set((e.clientX / window.innerWidth - 0.5) * 22);
      pointerY.set((e.clientY / window.innerHeight - 0.5) * 14);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, paused, pointerX, pointerY]);

  /* ── Page visibility ────────────────────────────────────────────────── */
  useEffect(() => {
    const onChange = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);

  /* ── Optional film layer (see media.hero.video) ─────────────────────── */
  const video = media.hero.video;
  useEffect(() => {
    if (!video || reduce) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    const id = window.setTimeout(() => setLoadVideo(true), 1200);
    return () => window.clearTimeout(id);
  }, [video, reduce]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !loadVideo) return;
    if (running) el.play().catch(() => {});
    else el.pause();
  }, [running, loadVideo]);

  /* ── Art-directed still ─────────────────────────────────────────────── */
  const { desktop, mobile } = media.hero;
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

  const sceneHeight = "h-[max(100svh,38rem)]";
  const facts = [
    {
      title: "Midi & soir",
      text: `Tous les jours, ${site.hours.services
        .map((s) => formatService(s.open, s.close))
        .join(" et ")}.`,
    },
    {
      title: "Commande à table",
      text: "Les menus dégustation se commandent sur tablette, directement à votre table.",
    },
    { title: "Trois salles tatami", text: "Des salles privées, pour un repas plus au calme." },
  ];

  return (
    <div
      ref={wrapRef}
      data-ambient={running ? "playing" : "paused"}
      className="relative isolate bg-ivory"
    >
      {/* ── Scene layer ─────────────────────────────────────────────────
          Phones: covers the hero only. Large screens: a track spanning the
          whole opening, with the scene sticky inside it, so the window stays
          beside the welcome text and leaves with it.                       */}
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-0 ${sceneHeight} lg:motion-safe:bottom-0 lg:motion-safe:h-auto`}
      >
        <div
          ref={sceneRef}
          className={`relative ${sceneHeight} lg:motion-safe:sticky lg:motion-safe:top-0`}
        >
          <m.div
            className="absolute inset-0 overflow-hidden bg-ink"
            style={{ clipPath: reduce ? "none" : shape.clipPath }}
          >
            <m.div
              className="absolute inset-0 origin-[50%_55%] lg:origin-[73.5%_53%]"
              style={{ scale: reduce ? 1 : imageZoom }}
            >
              <m.div className="absolute -inset-[3%]" style={{ x: springX, y: springY }}>
                <div className="hero-drift absolute inset-0">
                  <picture>
                    <source media="(min-width: 768px)" srcSet={desktopSrcSet} sizes="100vw" />
                    <img
                      {...imgProps}
                      srcSet={mobileSrcSet}
                      alt={desktop.alt}
                      className="absolute inset-0 h-full w-full object-cover [object-position:var(--pos-m)] md:[object-position:var(--pos-d)]"
                      style={
                        {
                          "--pos-d": desktop.position ?? "50% 50%",
                          "--pos-m": mobile.position ?? "50% 50%",
                        } as CSSProperties
                      }
                    />
                  </picture>
                  {video && loadVideo ? (
                    <video
                      ref={videoRef}
                      aria-hidden
                      tabIndex={-1}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onPlaying={() => setVideoPlaying(true)}
                      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms] ease-out"
                      style={{ opacity: videoPlaying ? 1 : 0 }}
                    >
                      <source src={video.mp4} type="video/mp4" />
                    </video>
                  ) : null}
                </div>
              </m.div>
            </m.div>

            {/* Light & legibility for the headline; fades as the window closes. */}
            <m.div
              aria-hidden
              className="absolute inset-0"
              style={{ opacity: reduce ? 1 : overlayOpacity }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_68%_28%,rgba(255,196,150,0.16),transparent_70%)] mix-blend-soft-light" />
              <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/80 via-50% to-ink/0 to-[80%] md:from-ink md:from-0% md:via-ink/35 md:via-35% md:to-75%" />
              <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/80 via-ink/40 via-45% to-transparent to-70% md:block" />
              <div className="absolute inset-0 hidden bg-[radial-gradient(85%_80%_at_0%_100%,rgba(20,22,18,0.8),rgba(20,22,18,0.2)_55%,transparent_80%)] md:block" />
              <div className="absolute inset-0 shadow-[inset_0_0_180px_40px_rgba(10,11,9,0.55)]" />
            </m.div>
            <div aria-hidden className="grain absolute inset-0" />
            <Petals />
          </m.div>

          {/* Marumado frame: two fine brass rings around the closed window. */}
          {(["outer", "inner"] as const).map((ring) => (
            <m.span
              key={ring}
              aria-hidden
              className="absolute hidden rounded-full border border-brass lg:motion-safe:block"
              style={{
                left: shape[ring].left,
                top: shape[ring].top,
                width: shape[ring].size,
                height: shape[ring].size,
                opacity: frameOpacity,
                borderColor: ring === "outer" ? "rgba(179,154,114,0.35)" : "rgba(179,154,114,0.75)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Hero copy ─────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        aria-labelledby="hero-title"
        className={`relative z-10 flex ${sceneHeight} flex-col text-ivory`}
      >
        <m.div
          className="container-x relative flex flex-1 flex-col justify-end pt-36 pb-28 sm:pb-32 lg:pb-40"
          style={{ y: reduce ? 0 : copyY, opacity: copyOpacity }}
        >
          <m.div style={{ x: copyPX, y: copyPY }} className="max-w-[64rem]">
            <p className="eyebrow hero-fade flex items-center gap-4 text-ivory/85" style={line(0)}>
              <span aria-hidden className="hidden h-px w-10 bg-sakura xs:block" />
              Restaurant japonais · Crissier
            </p>
            <h1
              id="hero-title"
              className="display-hero mt-6 [text-shadow:0_2px_30px_rgba(10,11,9,0.35)] lg:mt-8"
            >
              <span className="hero-line">
                <span style={line(0)}>Le Japon,</span>
              </span>
              <span className="hero-line">
                <span style={line(1)} className="italic text-sakura-pale">
                  sous les fleurs.
                </span>
              </span>
            </h1>
            <p className="lede hero-fade mt-7 max-w-[30rem] text-ivory/85 lg:mt-9" style={line(2)}>
              Sushis, teppanyaki et instants à partager, dans une atmosphère singulière à Crissier.
            </p>
            <div className="hero-fade mt-9 flex flex-wrap gap-3 lg:mt-11" style={line(3)}>
              <ButtonLink href="/reservation" size="lg" variant="ivory" className="max-sm:w-full">
                Réserver une table
              </ButtonLink>
              <ButtonLink
                href="/la-carte"
                size="lg"
                variant="ghost-light"
                arrow
                className="max-sm:w-full"
              >
                Découvrir la carte
              </ButtonLink>
            </div>
          </m.div>
        </m.div>

        <m.div
          className="hero-fade absolute inset-x-0 bottom-0 z-10"
          style={{ ...line(5), opacity: copyOpacity }}
        >
          <div className="container-x">
            <div className="flex items-center justify-between gap-4 border-t border-ivory/15 py-4 text-[0.8125rem] text-ivory/75 sm:py-5">
              <p className="flex flex-wrap items-center gap-x-6 gap-y-1">
                <span>
                  <span className="text-ivory">{site.hours.summary}</span>
                  <span className="tabular">
                    {" · "}
                    {site.hours.services.map((s) => formatService(s.open, s.close)).join(" · ")}
                  </span>
                </span>
                <span className="hidden md:inline">
                  {site.address.street}, {site.address.locality}
                </span>
              </p>
              <div className="flex items-center gap-5">
                <button
                  type="button"
                  onClick={() => setPaused((v) => !v)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ivory/75 ring-1 ring-inset ring-ivory/20 transition-colors hover:text-ivory hover:ring-ivory/50 motion-reduce:hidden"
                >
                  {paused ? <PlayIcon size={14} /> : <PauseIcon size={14} />}
                  <span aria-hidden>{paused ? "Reprendre" : "Pause"}</span>
                  <span className="sr-only">
                    {paused ? "Reprendre" : "Mettre en pause"} l’animation d’ambiance
                  </span>
                </button>
                <span
                  aria-hidden
                  className="scroll-cue relative hidden h-10 w-px overflow-hidden bg-ivory/20 text-ivory md:block"
                />
              </div>
            </div>
          </div>
        </m.div>
      </section>

      {/* ── Welcome ───────────────────────────────────────────────────── */}
      <section
        aria-labelledby="intro-title"
        className="on-light relative z-10 lg:motion-safe:min-h-[max(100svh,38rem)]"
      >
        <div className="container-x grid gap-14 py-24 sm:py-28 lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:py-36 lg:motion-safe:min-h-[max(100svh,38rem)]">
          <m.div
            className="lg:col-span-6 xl:col-span-5 lg:motion-safe:opacity-(--welcome)"
            style={{ "--welcome": welcomeOpacity } as unknown as CSSProperties}
          >
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-sakura-deep">
                <span aria-hidden className="h-px w-10 bg-sakura-deep/60" />
                Bienvenue chez Itoya
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 id="intro-title" className="display-xl mt-7 max-w-[18ch] text-ink">
                Du premier regard <em className="text-sakura-deep">à la dernière bouchée.</em>
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="lede mt-8 max-w-[33rem] text-muted">
                Chez Itoya, la cuisine japonaise se découvre autant qu’elle se partage. Sous les
                fleurs, autour d’un plateau ou le temps d’un dîner, prenez place et savourez
                l’instant.
              </p>
            </Reveal>
            <dl className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 sm:gap-6">
              {facts.map((fact, i) => (
                <Reveal key={fact.title} index={i} delay={0.15}>
                  <dt className="font-serif text-[1.375rem] leading-tight text-ink">
                    {fact.title}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{fact.text}</dd>
                </Reveal>
              ))}
            </dl>
          </m.div>

          {/* Reduced motion only: a static round window (otherwise the scene
              itself has just closed into one). */}
          <figure className="hidden motion-reduce:block lg:col-span-5 lg:col-start-8">
            <Reveal distance={16}>
              <div className="relative mx-auto aspect-square w-full max-w-[26rem]">
                <span
                  aria-hidden
                  className="absolute -inset-[5.5%] rounded-full border border-brass/35"
                />
                <span
                  aria-hidden
                  className="absolute -inset-[2.75%] rounded-full border border-brass/75"
                />
                <div className="absolute inset-0 overflow-hidden rounded-full bg-forest">
                  <Image
                    src={media.intro.canopy.src}
                    alt={media.intro.canopy.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 90vw"
                    quality={78}
                    className="object-cover"
                    style={{ objectPosition: "50% 30%" }}
                  />
                </div>
              </div>
            </Reveal>
            <figcaption className="mx-auto mt-8 max-w-[22rem] text-center text-[0.8125rem] leading-relaxed text-muted">
              La salle principale, sous sa canopée de fleurs de cerisier et ses lanternes en bambou.
            </figcaption>
          </figure>
        </div>
      </section>
    </div>
  );
}
