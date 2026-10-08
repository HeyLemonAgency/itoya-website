import { cx } from "@/lib/format";

/**
 * Temporary typographic wordmark. The official logo on itoya.ch is only
 * available as a small raster crop; replace this with the original vector
 * artwork once supplied (see docs/PROJECT_NOTES.md → "Logo").
 */
export function Wordmark({
  className,
  size = "md",
  withDescriptor = true,
}: {
  className?: string;
  size?: "md" | "lg" | "xl";
  withDescriptor?: boolean;
}) {
  return (
    <span className={cx("inline-flex flex-col items-start leading-none", className)}>
      <span
        className={cx(
          "font-serif font-medium uppercase tracking-[0.3em]",
          size === "md" && "text-[1.45rem]",
          size === "lg" && "text-[2rem]",
          size === "xl" && "text-[clamp(3.5rem,13vw,11rem)] tracking-[0.18em]",
        )}
      >
        Itoya
      </span>
      {withDescriptor ? (
        <span
          className={cx(
            "mt-1.5 font-sans font-semibold uppercase text-current/65",
            size === "md" ? "text-[0.5625rem] tracking-[0.34em]" : "text-[0.6875rem] tracking-[0.36em]",
          )}
        >
          Restaurant japonais
        </span>
      ) : null}
    </span>
  );
}
