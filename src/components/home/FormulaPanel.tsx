import Image from "next/image";
import type { Photo } from "@/content/media";
import { supplementRange, type Formula } from "@/content/formulas";
import { cx, formatPrice } from "@/lib/format";

const words = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six"];

export type PanelDish = { photo: Photo; label: string };

/**
 * One tasting formula, presented as an editorial panel rather than a pricing
 * tier: the round structure is the hero, prices and conditions stay legible.
 */
export function FormulaPanel({
  formula,
  dishes,
  headingLevel = 3,
  className,
}: {
  formula: Formula;
  /** A few dishes that are part of this formula, shown as cut-outs. */
  dishes?: PanelDish[];
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
      {dishes?.length ? (
        <ul
          aria-label={`Exemples de plats de la formule « ${formula.title} »`}
          className="grid grid-cols-3 items-end gap-3 border-b border-ivory/10 px-6 pt-8 pb-5 sm:px-10 lg:px-12"
        >
          {dishes.map((dish) => (
            <li key={dish.label} className="flex flex-col items-center text-center">
              <div className="flex h-24 w-full items-end justify-center sm:h-28">
                <Image
                  src={dish.photo.src}
                  alt=""
                  width={dish.photo.width}
                  height={dish.photo.height}
                  sizes="(min-width: 1024px) 10vw, 28vw"
                  quality={80}
                  className="max-h-full w-auto max-w-full object-contain [filter:drop-shadow(0_14px_14px_rgba(0,0,0,0.45))]"
                />
              </div>
              <span className="mt-3 text-[0.75rem] leading-tight text-ivory/65">{dish.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="relative flex flex-1 flex-col p-7 sm:p-10 lg:p-12">
        <p className="eyebrow flex flex-wrap gap-x-3 text-brass">
          <span>Menu dégustation</span>
          <span aria-hidden>·</span>
          <span className="tabular whitespace-nowrap">{formula.hours}</span>
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
