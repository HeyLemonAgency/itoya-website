"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { navigation, site } from "@/content/site";
import { cx } from "@/lib/format";
import { PhoneIcon } from "@/components/ui/Icons";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  // Only re-render when crossing the threshold, never per frame.
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 24;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <header
      className={cx(
        "fixed inset-x-0 top-0 z-50 text-ivory",
        "transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out",
        scrolled
          ? "bg-ink/[0.97] shadow-[0_1px_0_rgba(242,235,221,0.08)] backdrop-blur-md supports-[backdrop-filter]:bg-ink/[0.92]"
          : "bg-transparent",
      )}
    >
      {/* Soft top shade keeps the transparent header legible over any photo. */}
      <div
        aria-hidden
        className={cx(
          "pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 bg-gradient-to-b from-ink/70 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-0" : "opacity-100",
        )}
      />
      <div
        className={cx(
          "container-x flex items-center justify-between gap-6 transition-[height] duration-500 ease-out",
          scrolled ? "h-16" : "h-[4.75rem] lg:h-24",
        )}
      >
        <Link
          href="/"
          className="relative -m-2 p-2"
          aria-label="Itoya, restaurant japonais — accueil"
        >
          <Logo
            priority
            className={cx(
              "transition-[width] duration-500 ease-out",
              scrolled ? "w-[78px]" : "w-[92px] lg:w-[112px]",
            )}
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {navigation.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cx(
                      "relative py-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-200",
                      active ? "text-ivory" : "text-ivory/75 hover:text-ivory",
                    )}
                  >
                    {item.label}
                    {active ? (
                      <motion.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-sakura"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 px-2 py-2 text-[0.8125rem] font-medium tracking-[0.04em] text-ivory/80 transition-colors hover:text-ivory xl:inline-flex"
          >
            <PhoneIcon size={16} />
            <span className="tabular">{site.phone.display}</span>
          </a>
          <Link
            href="/reservation"
            className={cx(
              "hidden min-h-11 items-center rounded-[2px] px-5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] sm:inline-flex",
              "bg-ivory text-ink transition-colors duration-200 hover:bg-paper",
            )}
          >
            Réserver
          </Link>
          <MobileMenu pathname={pathname} />
        </div>
      </div>
    </header>
  );
}
