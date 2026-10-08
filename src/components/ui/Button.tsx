import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cx } from "@/lib/format";
import { ArrowRight } from "./Icons";

type Variant = "ivory" | "ghost-light" | "ink" | "ghost-dark";

const variants: Record<Variant, string> = {
  // Primary on dark surfaces
  ivory:
    "bg-ivory text-ink hover:bg-paper shadow-[0_1px_0_rgba(255,255,255,0.25)_inset,0_18px_40px_-18px_rgba(0,0,0,0.6)]",
  // Secondary on dark surfaces
  "ghost-light":
    "text-ivory ring-1 ring-inset ring-ivory/45 hover:ring-ivory hover:bg-ivory/[0.07] backdrop-blur-[2px]",
  // Primary on light surfaces
  ink: "bg-ink text-ivory hover:bg-forest",
  // Secondary on light surfaces
  "ghost-dark": "text-ink ring-1 ring-inset ring-ink/30 hover:ring-ink hover:bg-ink/[0.04]",
};

type BaseProps = {
  variant?: Variant;
  children: ReactNode;
  icon?: ReactNode;
  /** Show the trailing arrow (default for internal links). */
  arrow?: boolean;
  size?: "md" | "lg";
  className?: string;
};

type ButtonLinkProps = BaseProps &
  Omit<ComponentProps<"a">, "className" | "children"> & { href: string };

const isInternal = (href: string) => href.startsWith("/") || href.startsWith("#");

export function ButtonLink({
  variant = "ivory",
  children,
  icon,
  arrow,
  size = "md",
  className,
  href,
  ...rest
}: ButtonLinkProps) {
  const showArrow = arrow ?? false;
  const classes = cx(
    "group/btn relative inline-flex items-center justify-center gap-3 rounded-[2px] font-sans font-semibold uppercase tracking-[0.16em] whitespace-nowrap",
    "transition-[background-color,color,box-shadow] duration-200 ease-out",
    size === "lg" ? "min-h-14 px-7 text-[0.8125rem]" : "min-h-12 px-5 text-[0.75rem]",
    variants[variant],
    className,
  );
  const content = (
    <>
      {icon ? <span className="-ml-0.5 shrink-0">{icon}</span> : null}
      <span>{children}</span>
      {showArrow ? (
        <ArrowRight
          size={16}
          className="-mr-1 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-1"
        />
      ) : null}
    </>
  );

  if (isInternal(href)) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}

/** Understated text link with an arrow, for "see the full menu" style routes. */
export function ArrowLink({
  href,
  children,
  className,
  tone = "dark",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  tone?: "dark" | "light";
}) {
  const classes = cx(
    "group/link inline-flex items-center gap-3 py-2 font-sans text-[0.8125rem] font-semibold uppercase tracking-[0.16em]",
    tone === "dark" ? "text-ink" : "text-ivory",
    className,
  );
  const inner = (
    <>
      <span className="link-underline">{children}</span>
      <ArrowRight
        size={16}
        className="transition-transform duration-200 ease-out group-hover/link:translate-x-1"
      />
    </>
  );
  return isInternal(href) ? (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  ) : (
    <a href={href} className={classes}>
      {inner}
    </a>
  );
}
