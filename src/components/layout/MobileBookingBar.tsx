"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { m, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { PhoneIcon } from "@/components/ui/Icons";

/**
 * Discreet fixed booking bar for phones and small tablets. It appears once
 * the visitor has scrolled past the opening screen, hides while a text field
 * has focus (so it never sits on top of the on-screen keyboard) and respects
 * the safe-area inset. Body padding for it is reserved in globals.css.
 */
export function MobileBookingBar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [pastFold, setPastFold] = useState(false);
  const [typing, setTyping] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > window.innerHeight * 0.55;
    if (next !== pastFold) setPastFold(next);
  });

  useEffect(() => {
    const isField = (el: EventTarget | null) =>
      el instanceof HTMLElement && el.matches("input, textarea, select, [contenteditable]");
    const onIn = (e: FocusEvent) => isField(e.target) && setTyping(true);
    const onOut = (e: FocusEvent) => isField(e.target) && setTyping(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  if (pathname === "/reservation") return null;
  const visible = pastFold && !typing;

  return (
    <m.div
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden"
      initial={false}
      animate={{ y: visible ? "0%" : "110%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden={!visible}
      inert={!visible}
    >
      <div className="border-t border-ivory/10 bg-ink/92 px-[var(--gutter)] pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-md">
        <div className="mx-auto flex max-w-xl gap-3">
          <a
            href={site.phone.href}
            className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-[2px] text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ivory ring-1 ring-inset ring-ivory/35"
          >
            <PhoneIcon size={16} />
            Appeler
          </a>
          <Link
            href="/reservation"
            className="inline-flex min-h-12 flex-[1.4] items-center justify-center rounded-[2px] bg-ivory text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink"
          >
            Réserver une table
          </Link>
        </div>
      </div>
    </m.div>
  );
}
