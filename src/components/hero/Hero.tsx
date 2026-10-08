"use client";

import { getImageProps } from "next/image";
import {
  m,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { formatService } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import { PauseIcon, PlayIcon } from "@/components/ui/Icons";

const line = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * "Sous les fleurs" — the opening scene.
 *
 * First paint: a sharp, art-directed still (separate desktop / phone crops)
 * with the headline and booking action as live HTML. The text entrance is
 * pure CSS so nothing waits for hydration.
 *
 * Then Motion adds, in layers:
 *   1. a very slow push-in / drift through the blossom canopy (pausable;
 *      compositor-only CSS, so it costs no main-thread work),
 *   2. a small pointer depth response on fine-pointer desktops,
 *   3. on scroll, the scene sinks behind the next section while the copy lifts.
 * All of it is disabled for reduced motion; the drift also stops when the hero
 * is off screen or the tab is hidden. An optional film layer (media.hero.video)
 * only loads on desktop, never with Save-Data or reduced motion, and fails
 * back silently to the still if autoplay is blocked.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  const [paused, setPaused] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [loadVideo, setLoadVideo] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const inView = useInView(sectionRef, { amount: 0.05 });
  const running = !reduce && !paused && inView && pageVisible;

  /* ── Scroll hand-off ─────────────────────────────────────────────────── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const veil = useTransform(scrollYProgress, [0, 1], [0, 0.65]);

  /* ── Ambient drift ───────────────────────────────────────────────────
     The slow push into the canopy is a compositor-only CSS animation
     (.hero-drift in globals.css). It pauses through data-ambient below —
     pause button, hero off screen, tab hidden — and is off for reduced
     motion. No JavaScript runs per frame for it.                         */

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

  /* ── Optional film layer ────────────────────────────────────────────── */
  const video = media.hero.video;
  useEffect(() => {
    if (!video || reduce) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    if (connection?.saveData) return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    // Let the poster and the rest of the page settle first.
    const id = window.setTimeout(() => setLoadVideo(true), 1200);
    return () => window.clearTimeout(id);
  }, [video, reduce]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !loadVideo) return;
    if (running) {
      el.play().catch(() => {
        // Autoplay blocked: the still image remains, nothing else to do.
      });
    } else {
      el.pause();
    }
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

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      data-ambient={running ? "playing" : "paused"}
      className="relative isolate flex min-h-[max(100svh,38rem)] flex-col overflow-hidden bg-ink text-ivory"
    >
      {/* ── Scene ─────────────────────────────────────────────────────── */}
      <m.div
        className="absolute inset-0 -z-20 origin-top"
        style={{ y: reduce ? 0 : sceneY, scale: reduce ? 1 : sceneScale }}
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

      {/* ── Light & legibility ────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* warm lantern bloom, very soft */}
        <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_68%_28%,rgba(255,196,150,0.16),transparent_70%)] mix-blend-soft-light" />
        {/* top shade for the header */}
        <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-ink/70 to-transparent" />
        {/* reading area: bottom-left on desktop, bottom on phones */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink from-10% via-ink/80 via-50% to-ink/0 to-[80%] md:from-ink md:from-0% md:via-ink/35 md:via-35% md:to-75%" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-ink/80 via-ink/40 via-45% to-transparent to-70% md:block" />
        <div className="absolute inset-0 hidden bg-[radial-gradient(85%_80%_at_0%_100%,rgba(20,22,18,0.8),rgba(20,22,18,0.2)_55%,transparent_80%)] md:block" />
        {/* vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_180px_40px_rgba(10,11,9,0.55)]" />
        {/* deepen as the next section arrives */}
        <m.div className="absolute inset-0 bg-ink" style={{ opacity: reduce ? 0 : veil }} />
      </div>
      <div aria-hidden className="grain pointer-events-none absolute inset-0 -z-10" />

      {/* ── Copy ──────────────────────────────────────────────────────── */}
      <m.div
        className="container-x relative flex flex-1 flex-col justify-end pt-36 pb-28 sm:pb-32 lg:pb-40"
        style={{ y: reduce ? 0 : copyY, opacity: copyOpacity }}
      >
        <m.div style={{ x: copyPX, y: copyPY }} className="max-w-[64rem]">
          <p className="eyebrow hero-fade flex items-center gap-4 text-ivory/85" style={line(0)}>
            <span aria-hidden className="h-px w-10 bg-sakura" />
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

      {/* ── Practical strip ───────────────────────────────────────────── */}
      <div className="hero-fade absolute inset-x-0 bottom-0 z-10" style={line(5)}>
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
      </div>
    </section>
  );
}
