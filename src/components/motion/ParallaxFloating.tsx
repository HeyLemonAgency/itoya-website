"use client";

/*
 * Adapted from « Parallax Floating » by Daniel Petho (fancy components,
 * listed on 21st.dev as @danielpetho/parallax-floating), MIT licence:
 * https://github.com/danielpetho/fancy — see docs/PROJECT_NOTES.md.
 *
 * Changes: elements also drift with the page scroll (so touch screens get
 * the depth too), the animation loop only runs while something is still
 * moving, mouse only for the pointer part, and nothing moves under reduced
 * motion.
 */

import { useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { cx } from "@/lib/format";

type Entry = { element: HTMLElement; depth: number; x: number; y: number };
type Registry = {
  register: (id: string, element: HTMLElement, depth: number) => void;
  unregister: (id: string) => void;
};

const FloatingContext = createContext<Registry | null>(null);

export function Floating({
  children,
  className,
  sensitivity = 1,
  easing = 0.06,
  scrollDepth = 70,
}: {
  children: ReactNode;
  className?: string;
  /** Pointer travel per unit of depth. */
  sensitivity?: number;
  /** 0–1: share of the remaining distance covered per frame. */
  easing?: number;
  /** Scroll travel (px) per unit of depth across the section. */
  scrollDepth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const entries = useRef(new Map<string, Entry>());
  const pointer = useRef({ x: 0, y: 0 });
  const frame = useRef(0);
  const reduce = useReducedMotion();

  const register = useCallback((id: string, element: HTMLElement, depth: number) => {
    entries.current.set(id, { element, depth, x: 0, y: 0 });
  }, []);
  const unregister = useCallback((id: string) => {
    entries.current.delete(id);
  }, []);
  const registry = useMemo(() => ({ register, unregister }), [register, unregister]);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduce) return;

    const scrollShift = () => {
      const rect = root.getBoundingClientRect();
      // -0.5 when the section enters at the bottom, +0.5 when it leaves at the top.
      return (
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) / (window.innerHeight + rect.height)
      );
    };

    const tick = () => {
      const shift = scrollShift();
      let moving = false;
      entries.current.forEach((entry) => {
        const strength = (entry.depth * sensitivity) / 20;
        const tx = pointer.current.x * strength;
        const ty = pointer.current.y * strength - shift * entry.depth * scrollDepth;
        entry.x += (tx - entry.x) * easing;
        entry.y += (ty - entry.y) * easing;
        if (Math.abs(tx - entry.x) > 0.1 || Math.abs(ty - entry.y) > 0.1) moving = true;
        entry.element.style.transform = `translate3d(${entry.x.toFixed(2)}px, ${entry.y.toFixed(2)}px, 0)`;
      });
      frame.current = moving ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      if (!frame.current) frame.current = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = root.getBoundingClientRect();
      pointer.current = {
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2,
      };
      wake();
    };
    const leave = () => {
      pointer.current = { x: 0, y: 0 };
      wake();
    };

    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) wake();
    });
    io.observe(root);
    const scroll = () => visible && wake();

    root.addEventListener("pointermove", move);
    root.addEventListener("pointerleave", leave);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      io.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
      window.removeEventListener("scroll", scroll);
    };
  }, [easing, reduce, scrollDepth, sensitivity]);

  return (
    <FloatingContext.Provider value={registry}>
      <div ref={ref} className={cx("absolute inset-0", className)}>
        {children}
      </div>
    </FloatingContext.Provider>
  );
}

export function FloatingElement({
  children,
  className,
  depth = 1,
}: {
  children: ReactNode;
  className?: string;
  depth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useRef<string | null>(null);
  const registry = useContext(FloatingContext);

  useEffect(() => {
    if (!ref.current || !registry) return;
    id.current ??= Math.random().toString(36).slice(2);
    const key = id.current;
    registry.register(key, ref.current, depth);
    return () => registry.unregister(key);
  }, [depth, registry]);

  return (
    <div ref={ref} className={cx("absolute will-change-transform", className)}>
      {children}
    </div>
  );
}
