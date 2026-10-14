import type { CSSProperties } from "react";

/**
 * A few cherry blossom petals drifting through the opening scene, with the
 * odd whole flower among them (public/images/petals/*.svg).
 *
 * Pure CSS (compositor-only transforms): no JavaScript runs per frame. They
 * fall on the right-hand side, away from the headline and the booking action,
 * pause with the scene (data-ambient="paused") and are removed entirely for
 * reduced motion. On phones only half of them render and they fade out above
 * the text. Positions are fixed (not random) so server and client agree.
 */
type Kind = "flat" | "cupped" | "blossom";

const PETALS: Array<{
  x: number; // start, % of width
  size: number; // px
  duration: number; // s
  delay: number; // s (negative = already falling on first paint)
  drift: number; // horizontal travel, vw
  blur: number; // px — depth of field
  opacity: number;
  kind: Kind;
  phone?: boolean;
}> = [
  {
    x: 62,
    size: 34,
    duration: 19,
    delay: -4,
    drift: -16,
    blur: 0.0,
    opacity: 1,
    phone: true,
    kind: "flat",
  },
  {
    x: 78,
    size: 23,
    duration: 24,
    delay: -11,
    drift: -12,
    blur: 0.2,
    opacity: 0.93,
    kind: "cupped",
  },
  {
    x: 88,
    size: 46,
    duration: 16,
    delay: -2,
    drift: -22,
    blur: 1.3,
    opacity: 0.78,
    phone: true,
    kind: "blossom",
  },
  { x: 70, size: 19, duration: 27, delay: -18, drift: -10, blur: 0.5, opacity: 0.83, kind: "flat" },
  {
    x: 95,
    size: 28,
    duration: 21,
    delay: -8,
    drift: -18,
    blur: 0.0,
    opacity: 0.98,
    phone: true,
    kind: "cupped",
  },
  { x: 56, size: 56, duration: 15, delay: -12, drift: -14, blur: 1.9, opacity: 0.63, kind: "flat" },
  {
    x: 83,
    size: 22,
    duration: 26,
    delay: -21,
    drift: -9,
    blur: 0.2,
    opacity: 0.88,
    phone: true,
    kind: "flat",
  },
  {
    x: 67,
    size: 31,
    duration: 22,
    delay: -15,
    drift: -20,
    blur: 0.7,
    opacity: 0.88,
    kind: "blossom",
  },
  {
    x: 92,
    size: 17,
    duration: 29,
    delay: -26,
    drift: -8,
    blur: 0.4,
    opacity: 0.78,
    phone: true,
    kind: "cupped",
  },
  {
    x: 74,
    size: 40,
    duration: 18,
    delay: -6,
    drift: -17,
    blur: 1.1,
    opacity: 0.73,
    kind: "cupped",
  },
];

export function Petals() {
  return (
    <div aria-hidden className="petals pointer-events-none absolute inset-0 overflow-hidden">
      {PETALS.map((p, i) => (
        <span
          key={i}
          data-kind={p.kind}
          className={p.phone ? "petal" : "petal max-md:hidden"}
          style={
            {
              "--x": `${p.x}%`,
              "--s": `${p.size}px`,
              "--d": `${p.duration}s`,
              "--delay": `${p.delay}s`,
              "--dx": `${p.drift}vw`,
              "--b": `${p.blur}px`,
              "--o": p.opacity,
            } as CSSProperties
          }
        >
          <span className="petal-sway">
            <span className="petal-tumble" />
          </span>
        </span>
      ))}
    </div>
  );
}
