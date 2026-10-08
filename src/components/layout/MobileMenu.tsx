"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";
import { fullAddress, navigation, site } from "@/content/site";
import { cx, formatService } from "@/lib/format";
import { CloseIcon, PhoneIcon, socialIcons } from "@/components/ui/Icons";
import { Logo } from "./Logo";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Full-screen mobile navigation built on Radix Dialog (focus trap, Escape,
 * scroll lock, aria-modal, focus return) with Motion for enter/exit.
 */
export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close when the route changes (e.g. browser back while open).
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  const links = [{ label: "Accueil", href: "/" }, ...navigation];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="group -mr-2 inline-flex min-h-11 items-center gap-3 px-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-ivory lg:hidden"
        >
          <span>Menu</span>
          <span aria-hidden className="flex w-6 flex-col gap-[5px]">
            <span className="h-px w-full bg-current transition-transform duration-200 group-hover:translate-x-0.5" />
            <span className="h-px w-4 self-end bg-current" />
          </span>
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <m.div
                className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <m.div
                className="grain fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink text-ivory"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease }}
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="container-x flex h-[4.75rem] shrink-0 items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    aria-label="Accueil"
                    className="-m-2 p-2"
                  >
                    <Logo className="w-[92px]" />
                  </Link>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="-mr-2 inline-flex min-h-11 items-center gap-2 px-2 text-[0.75rem] font-semibold uppercase tracking-[0.18em]"
                    >
                      Fermer
                      <CloseIcon size={20} />
                    </button>
                  </Dialog.Close>
                </div>

                <nav
                  aria-label="Navigation mobile"
                  className="container-x relative z-10 flex-1 pt-6"
                >
                  <ul className="border-t border-ivory/12">
                    {links.map((item, i) => {
                      const active = pathname === item.href;
                      return (
                        <m.li
                          key={item.href}
                          className="border-b border-ivory/12"
                          initial={{ opacity: 0, y: 14 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={active ? "page" : undefined}
                            className="flex items-baseline justify-between py-4 font-serif text-[2.35rem] leading-none"
                          >
                            <span className={cx(active && "italic text-sakura")}>{item.label}</span>
                            <span aria-hidden className="eyebrow text-ivory/40 tabular">
                              0{i + 1}
                            </span>
                          </Link>
                        </m.li>
                      );
                    })}
                  </ul>
                </nav>

                <m.div
                  className="container-x relative z-10 shrink-0 pb-[calc(1.75rem+env(safe-area-inset-bottom))] pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.35 }}
                >
                  <div className="grid gap-3 xs:grid-cols-2">
                    <Link
                      href="/reservation"
                      onClick={() => setOpen(false)}
                      className="inline-flex min-h-13 items-center justify-center rounded-[2px] bg-ivory px-5 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink"
                    >
                      Réserver une table
                    </Link>
                    <a
                      href={site.phone.href}
                      className="inline-flex min-h-13 items-center justify-center gap-2 rounded-[2px] px-5 text-[0.8125rem] font-semibold tracking-[0.04em] text-ivory ring-1 ring-inset ring-ivory/40"
                    >
                      <PhoneIcon size={16} />
                      <span className="tabular">{site.phone.display}</span>
                    </a>
                  </div>
                  <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 text-[0.875rem] text-ivory/70">
                    <div>
                      <dt className="eyebrow mb-1 text-[0.625rem] text-brass">
                        {site.hours.summary}
                      </dt>
                      {site.hours.services.map((s) => (
                        <dd key={s.label} className="tabular">
                          {formatService(s.open, s.close)}
                        </dd>
                      ))}
                    </div>
                    <div>
                      <dt className="eyebrow mb-1 text-[0.625rem] text-brass">Adresse</dt>
                      <dd>{fullAddress}</dd>
                    </div>
                  </dl>
                  <ul className="mt-6 flex gap-2" aria-label="Réseaux sociaux">
                    {site.social.map((s) => {
                      const Icon = socialIcons[s.label as keyof typeof socialIcons];
                      return (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset ring-ivory/20 transition-colors hover:ring-ivory/60"
                          >
                            <Icon size={18} />
                            <span className="sr-only">{s.label} (nouvel onglet)</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </m.div>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
}
