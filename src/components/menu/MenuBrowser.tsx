"use client";

import { AnimatePresence, motion } from "motion/react";
import { useDeferredValue, useEffect, useId, useMemo, useRef, useState } from "react";
import type { MenuCategory, MenuItem } from "@/content/types";
import { cx, normalizeSearch } from "@/lib/format";
import { CloseIcon, SearchIcon } from "@/components/ui/Icons";
import { Price, dishMeta } from "./Price";

function haystack(item: MenuItem, section: string, category: string) {
  return normalizeSearch(
    [
      item.number ? `n${item.number} ${item.number}` : "",
      item.name,
      item.japanese ?? "",
      item.description ?? "",
      ...(item.lines ?? []),
      item.labels?.join(" ") ?? "",
      section,
      category,
    ].join(" "),
  );
}

function DishRow({ item }: { item: MenuItem }) {
  const meta = dishMeta(item);
  return (
    <li className="grid grid-cols-[2.75rem_1fr_auto] items-baseline gap-x-3 border-b border-line/80 py-5 sm:grid-cols-[3.25rem_1fr_auto] sm:gap-x-4">
      <span className="text-[0.75rem] font-semibold tracking-[0.06em] text-brass-deep tabular">
        {item.number ? (
          <>
            <span className="sr-only">Numéro </span>
            {item.number}
          </>
        ) : null}
      </span>
      <div className="min-w-0">
        <h4 className="font-serif text-[1.375rem] font-semibold leading-tight text-ink">
          {item.name}
          {item.japanese ? (
            <span lang="ja" className="jp ml-2 text-[1rem] text-muted">
              {item.japanese}
            </span>
          ) : null}
        </h4>
        {item.description || meta.length ? (
          <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">
            {[item.description, ...meta].filter(Boolean).join(" · ")}
          </p>
        ) : null}
        {item.lines?.length ? (
          <ul className="mt-2 space-y-0.5 text-[0.9375rem] leading-relaxed text-muted">
            {item.lines.map((line) => (
              <li key={line} className="flex gap-2.5">
                <span aria-hidden className="mt-[0.75em] h-px w-2 shrink-0 bg-brass" />
                {line}
              </li>
            ))}
          </ul>
        ) : null}
        {item.featured || item.labels?.length ? (
          <p className="mt-2 flex flex-wrap gap-2">
            {item.featured ? (
              <span className="rounded-full bg-sakura-deep/10 px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-sakura-deep">
                À l’affiche
              </span>
            ) : null}
            {item.labels?.map((label) => (
              <span
                key={label}
                className="rounded-full px-2.5 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-forest ring-1 ring-inset ring-forest/25"
              >
                {label}
              </span>
            ))}
          </p>
        ) : null}
      </div>
      <Price item={item} className="text-right font-serif text-[1.375rem] font-semibold text-ink" />
    </li>
  );
}

export function MenuBrowser({ menu }: { menu: MenuCategory[] }) {
  const [query, setQuery] = useState("");
  const deferred = useDeferredValue(query);
  const [active, setActive] = useState(menu[0]?.id);
  const inputId = useId();
  const navRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const indexed = useMemo(
    () =>
      menu.map((category) => ({
        ...category,
        sections: category.sections.map((section) => ({
          ...section,
          items: section.items.map((item) => ({
            item,
            text: haystack(item, section.title, category.title),
          })),
        })),
      })),
    [menu],
  );

  const termKey = normalizeSearch(deferred).replace(/\s+/g, " ");
  const searching = termKey.length > 0;
  // On phones the field stays open while it holds a query.
  const searchShown = searchOpen || query.length > 0;

  const filtered = useMemo(() => {
    const terms = termKey.split(" ").filter(Boolean);
    return indexed
      .map((category) => ({
        ...category,
        sections: category.sections
          .map((section) => ({
            ...section,
            items: section.items
              .filter(({ text }) => terms.every((t) => text.includes(t)))
              .map(({ item }) => item),
          }))
          .filter((section) => section.items.length > 0),
      }))
      .filter((category) => category.sections.length > 0);
  }, [indexed, termKey]);

  const resultCount = filtered.reduce(
    (n, c) => n + c.sections.reduce((m, s) => m + s.items.length, 0),
    0,
  );

  // Scroll-spy: highlight the category currently being read.
  useEffect(() => {
    if (searching) return;
    const sections = menu
      .map((c) => document.getElementById(c.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [menu, searching]);

  // Keep the active chip visible inside the horizontal rail on phones.
  useEffect(() => {
    const rail = navRef.current;
    const chip = rail?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (!rail || !chip) return;
    const left = chip.offsetLeft - rail.clientWidth / 2 + chip.clientWidth / 2;
    rail.scrollTo({ left, behavior: "smooth" });
  }, [active]);

  return (
    <div className="on-light">
      {/* ── Sticky tools ─────────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 border-b border-line bg-ivory/95 backdrop-blur-md">
        <div className="container-x flex flex-col gap-0 py-2 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-3">
          <div className="flex items-center gap-2">
            <nav aria-label="Catégories de la carte" className="-ml-[var(--gutter)] min-w-0 flex-1 lg:ml-0">
              <div
                ref={navRef}
                className="no-scrollbar flex gap-1 overflow-x-auto pl-[var(--gutter)] [mask-image:linear-gradient(to_right,black_85%,transparent)] lg:pl-0 lg:[mask-image:none]"
              >
                {menu.map((category) => {
                  const isActive = !searching && active === category.id;
                  return (
                    <a
                      key={category.id}
                      href={`#${category.id}`}
                      data-cat={category.id}
                      aria-current={isActive ? "true" : undefined}
                      onClick={() => setQuery("")}
                      className={cx(
                        "relative inline-flex min-h-11 shrink-0 items-center rounded-full px-4 text-[0.75rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200",
                        isActive ? "text-ivory" : "text-ink/70 hover:text-ink",
                      )}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="menu-cat"
                          aria-hidden
                          className="absolute inset-0 -z-10 rounded-full bg-ink"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                        />
                      ) : null}
                      {category.title}
                    </a>
                  );
                })}
              </div>
            </nav>
            {/* Phones: search lives behind a button to keep the sticky bar slim. */}
            <button
              type="button"
              onClick={() => {
                if (searchShown) {
                  setSearchOpen(false);
                  setQuery("");
                } else {
                  setSearchOpen(true);
                  requestAnimationFrame(() => inputRef.current?.focus());
                }
              }}
              aria-expanded={searchShown}
              aria-controls={`${inputId}-panel`}
              className={cx(
                "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-1 ring-inset transition-colors lg:hidden",
                searchShown ? "bg-ink text-ivory ring-ink" : "text-ink ring-line hover:ring-ink",
              )}
            >
              {searchShown ? <CloseIcon size={18} /> : <SearchIcon size={18} />}
              <span className="sr-only">{searchShown ? "Fermer la recherche" : "Rechercher un plat"}</span>
            </button>
          </div>

          <div
            id={`${inputId}-panel`}
            role="search"
            className={cx(
              "relative w-full lg:block lg:max-w-sm",
              searchShown ? "block pt-2 pb-1" : "hidden",
            )}
          >
            <label htmlFor={inputId} className="sr-only">
              Rechercher un plat
            </label>
            <SearchIcon
              size={18}
              className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted max-lg:mt-0.5"
            />
            <input
              ref={inputRef}
              id={inputId}
              type="search"
              inputMode="search"
              autoComplete="off"
              enterKeyHint="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Saumon, tempura, bento…"
              className="h-12 w-full rounded-full border border-line bg-paper pr-12 pl-11 text-[1rem] text-ink placeholder:text-muted/80 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sakura-deep [&::-webkit-search-cancel-button]:hidden"
            />
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="absolute top-1/2 right-1.5 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-muted hover:bg-ink/5 hover:text-ink max-lg:mt-0.5"
              >
                <CloseIcon size={16} />
                <span className="sr-only">Effacer la recherche</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {searching
          ? resultCount === 0
            ? "Aucun plat ne correspond à votre recherche."
            : `${resultCount} plat${resultCount > 1 ? "s" : ""} trouvé${resultCount > 1 ? "s" : ""}.`
          : ""}
      </p>

      {/* ── Menu ─────────────────────────────────────────────────────── */}
      <div className="container-x pb-24 lg:pb-32">
        <AnimatePresence initial={false}>
          {searching ? (
            <motion.p
              key="results"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pt-8 text-[0.9375rem] text-muted"
            >
              {resultCount === 0 ? (
                <>
                  Aucun plat ne correspond à « {query.trim()} ».{" "}
                  <button type="button" onClick={() => setQuery("")} className="link-underline text-ink">
                    Afficher toute la carte
                  </button>
                </>
              ) : (
                <>
                  {resultCount} plat{resultCount > 1 ? "s" : ""} pour « {query.trim()} »
                </>
              )}
            </motion.p>
          ) : null}
        </AnimatePresence>

        {filtered.map((category) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-title`}
            className="scroll-mt-48 pt-16 lg:scroll-mt-40 lg:pt-24"
          >
            <header className="grid gap-4 border-b border-ink pb-6 lg:grid-cols-12 lg:items-end">
              <h2 id={`${category.id}-title`} className="display-lg text-ink lg:col-span-6">
                {category.title}
              </h2>
              <p className="max-w-md text-muted lg:col-span-5 lg:col-start-8 lg:justify-self-end lg:text-right">
                {category.intro}
              </p>
            </header>

            <div className="mt-4 lg:columns-2 lg:gap-x-16">
              {category.sections.map((section) => (
                <section
                  key={section.id}
                  id={`${category.id}-${section.id}`}
                  aria-labelledby={`${category.id}-${section.id}-title`}
                  className="break-inside-avoid pt-10"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      id={`${category.id}-${section.id}-title`}
                      className="eyebrow text-[0.8125rem] text-sakura-deep"
                    >
                      {section.title}
                    </h3>
                    {section.note ? (
                      <p className="text-[0.8125rem] text-muted">{section.note}</p>
                    ) : null}
                  </div>
                  <ul className="mt-2">
                    {section.items.map((item) => (
                      <DishRow key={item.id} item={item} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
