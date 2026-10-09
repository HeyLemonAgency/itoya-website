"use client";

import { m, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { cx } from "@/lib/format";

/**
 * A sentence that lights up word by word as it is read (the « Text Scroll
 * Read » pattern from 21st.dev, @youcefbnm, rebuilt here with Motion).
 * The full text is always in the page and always legible; only the ink
 * deepens. Words wrapped in *asterisks* are set in the accent colour.
 * Reduced motion: fully inked.
 */
export function ScrollRead({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  const words: { word: string; accent: boolean }[] = [];
  let inAccent = false;
  for (const raw of text.split(" ")) {
    if (raw.startsWith("*")) inAccent = true;
    words.push({ word: raw.replace(/\*/g, ""), accent: inAccent });
    if (/\*[,.;:!?]?$/.test(raw)) inAccent = false;
  }

  return (
    <p ref={ref} className={className}>
      {words.map(({ word, accent }, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={accent}
          still={!!reduce}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

/**
 * Unread words are a warm grey that still meets the 3:1 contrast required
 * for large text on ivory; read words take the full ink (or the accent).
 */
const INK = { from: "#868070", to: "#141612" };
const ACCENT = { from: "#966972", to: "#8c4a55" };

function Word({
  children,
  progress,
  range,
  accent,
  still,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  still: boolean;
}) {
  const tone = accent ? ACCENT : INK;
  const color = useTransform(progress, range, [tone.from, tone.to]);
  // Real spaces between words, so the sentence reads and copies normally.
  return (
    <>
      <m.span
        style={{ color: still ? tone.to : color }}
        className={cx(
          accent ? "italic motion-reduce:!text-sakura-deep" : "motion-reduce:!text-ink",
        )}
      >
        {children}
      </m.span>{" "}
    </>
  );
}
