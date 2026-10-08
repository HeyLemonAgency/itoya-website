import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { Photo } from "@/content/media";
import { cx } from "@/lib/format";

const i = (n: number) => ({ "--i": n }) as CSSProperties;

/**
 * Dark opening band for inner pages: keeps the header treatment consistent
 * and gives each page a single, clear H1. Entrance is CSS-only (no wait on JS).
 */
export function PageHero({
  eyebrow,
  title,
  accent,
  lede,
  photo,
  children,
  align = "end",
}: {
  eyebrow: string;
  title: string;
  /** Optional second line, set in italic rose. */
  accent?: string;
  lede?: ReactNode;
  photo?: Photo;
  children?: ReactNode;
  align?: "end" | "center";
}) {
  return (
    <section
      className={cx(
        "grain relative isolate overflow-hidden bg-ink text-ivory",
        photo ? "min-h-[min(88svh,52rem)]" : "",
        "flex flex-col",
      )}
    >
      {photo ? (
        <div aria-hidden className="hero-media-in absolute inset-0 -z-10">
          <Image
            src={photo.src}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={78}
            className="object-cover"
            style={{ objectPosition: photo.position }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 via-40% to-ink/40" />
          <div className="absolute inset-0 bg-[radial-gradient(90%_80%_at_0%_100%,rgba(20,22,18,0.85),transparent_75%)]" />
        </div>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_0%,rgba(201,145,152,0.14),transparent_70%),radial-gradient(50%_60%_at_0%_100%,rgba(179,154,114,0.10),transparent_70%)]"
        />
      )}

      <div
        className={cx(
          "container-x relative flex flex-1 flex-col pt-36 pb-16 sm:pb-20 lg:pt-48 lg:pb-24",
          align === "end" ? "justify-end" : "justify-center",
        )}
      >
        <p className="eyebrow hero-fade flex items-center gap-4 text-ivory/80" style={i(0)}>
          <span aria-hidden className="h-px w-10 bg-sakura" />
          {eyebrow}
        </p>
        <h1 className="display-xl mt-6 max-w-[16ch] lg:mt-8">
          <span className="hero-line">
            <span style={i(0)}>{title}</span>
          </span>
          {accent ? (
            <span className="hero-line">
              <span style={i(1)} className="italic text-sakura-pale">
                {accent}
              </span>
            </span>
          ) : null}
        </h1>
        {lede ? (
          <div className="lede hero-fade mt-7 max-w-[36rem] text-ivory/80" style={i(2)}>
            {lede}
          </div>
        ) : null}
        {children ? (
          <div className="hero-fade mt-9" style={i(3)}>
            {children}
          </div>
        ) : null}
      </div>
    </section>
  );
}
