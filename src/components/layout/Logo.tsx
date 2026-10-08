import Image from "next/image";
import { cx } from "@/lib/format";

/**
 * The official Itoya logo (伊藤屋 · いとうや · ITOYA), vectorised from the
 * raster artwork on itoya.ch (public/brand/*.svg). Replace with the original
 * vector file from the owners when available — see docs/PROJECT_NOTES.md.
 */
export function Logo({
  tone = "ivory",
  className,
  priority = false,
}: {
  tone?: "ivory" | "ink";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "ivory" ? "/brand/itoya-logo-ivory.svg" : "/brand/itoya-logo-ink.svg"}
      alt="Itoya 伊藤屋"
      width={1340}
      height={650}
      priority={priority}
      unoptimized
      className={cx("h-auto select-none", className)}
    />
  );
}
