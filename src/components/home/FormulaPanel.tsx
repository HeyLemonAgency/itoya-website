import Image from "next/image";
import type { Photo } from "@/content/media";
import { supplementRange, type Formula } from "@/content/formulas";
import { cx, formatPrice } from "@/lib/format";

const words = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six"];

/**
 * One tasting formula, presented as an editorial panel rather than a pricing
 * tier: the round structure is the hero, prices and conditions stay legible.
 */
export function FormulaPanel({
  formula,
  photo,
  headingLevel = 3,
  className,
}: {
  formula: Formula;
  photo?: Photo;
  headingLevel?: 2 | 3;
  className?: string;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const range = supplementRange(formula);

  return (
    <article
      aria-labelledby={`formula-${formula.id}`}
      className={cx("relative flex flex-col bg-forest text-ivory", className)}
    >
      {photo ? (
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            quality={75}
            className="object-cover"
            style={{ objectPosition: photo.position }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
        </div>
      ) : null}

      <div className={cx("relative flex flex-1 flex-col p-7 sm:p-10 lg:p-12", photo && "-mt-24")}>
        <p className="eyebrow text-brass">
          {formula.service} · <span className="tabular">{formula.hours}</span>
        </p>
        <Heading id={`formula-${formula.id}`} className="display-lg mt-4">
          {formula.title}
        </Heading>

        <div className="mt-8 flex items-end gap-6 border-b border-ivory/12 pb-8">
          <p
            aria-hidden
            className="font-serif text-[clamp(4.5rem,3rem+5vw,7.5rem)] leading-[0.8] text-sakura-pale tabular"
          >
            {formula.rounds}
            <span className="mx-2 text-[0.5em] align-middle text-ivory/40">×</span>
            {formula.dishesPerRound}
          </p>
          <p className="pb-1 text-[0.9375rem] leading-snug text-ivory/80">
            {words[formula.rounds]} tours
            <br />
            de {words[formula.dishesPerRound]} plats,
            <br />
            toutes les {formula.intervalMinutes} minutes
          </p>
        </div>

        <dl className="mt-6 divide-y divide-ivory/10">
          {formula.prices.map((price) => (
            <div key={price.label} className="flex items-baseline justify-between gap-6 py-3">
              <dt className="text-ivory/80">{price.label}</dt>
              <dd className="font-serif text-[1.75rem] leading-none tabular">
                <span className="mr-1.5 font-sans text-[0.75rem] font-semibold tracking-[0.12em] text-ivory/60">
                  CHF
                </span>
                {formatPrice(price.amount)}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 space-y-2 text-[0.9375rem] text-ivory/75">
          {formula.highlight ? (
            <li className="flex gap-3">
              <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-sakura" />
              {formula.highlight}
            </li>
          ) : null}
          <li className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-sakura" />
            Commande sur tablette, à votre table
          </li>
          <li className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-sakura" />
            <span>
              Plats « hors menu » avec supplément, de{" "}
              <span className="tabular whitespace-nowrap">CHF {formatPrice(range.min)}</span> à{" "}
              <span className="tabular whitespace-nowrap">CHF {formatPrice(range.max)}</span>
            </span>
          </li>
        </ul>
      </div>
    </article>
  );
}
