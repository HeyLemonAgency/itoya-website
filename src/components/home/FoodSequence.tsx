import { media, type Photo } from "@/content/media";
import { getDish, menuItemCount } from "@/content/menu-utils";
import { cx } from "@/lib/format";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { DishPlate } from "@/components/motion/DishPlate";
import { Price, dishMeta } from "@/components/menu/Price";

type Feature = {
  dishId: string;
  kicker: string;
  photo: Photo;
  /** Width of the plate inside its frame, to balance different dish shapes. */
  plateWidth?: string;
  /** Optional editorial summary when the menu lists a long composition. */
  summary?: string;
};

/**
 * Editorial selection from the real menu, photographed by the restaurant.
 * Names, compositions and prices are read from src/content/menu.ts, so they
 * can never drift from the full menu.
 */
const leads: (Feature & { turn?: boolean })[] = [
  { dishId: "n41", kicker: "Sashimis", photo: media.dishes.sashimis },
  {
    dishId: "plateau-9-sushi-maki-mixtes",
    kicker: "À partager",
    photo: media.dishes.plateau9,
    summary: "Hosomaki, California, futo maki, gunkan et nigiris",
    turn: true,
  },
];

const trio: Feature[] = [
  { dishId: "n95", kicker: "Spécialité Itoya", photo: media.dishes.dragon, plateWidth: "w-[92%]" },
  { dishId: "n108", kicker: "Teppan", photo: media.dishes.teppanStJacques, plateWidth: "w-[78%]" },
  { dishId: "n29", kicker: "Entrée", photo: media.dishes.tempura, plateWidth: "w-[66%]" },
];

function Caption({ feature, size }: { feature: Feature; size: "lg" | "sm" }) {
  const { item } = getDish(feature.dishId);
  const meta = dishMeta(item);
  const details = feature.summary ?? item.description;
  return (
    <>
      <p className="eyebrow flex flex-wrap items-center gap-3 text-[0.6875rem] text-brass-deep">
        {item.number ? <span className="tabular">N°{item.number}</span> : null}
        {item.number ? <span aria-hidden className="h-px w-5 bg-current/50" /> : null}
        <span>{feature.kicker}</span>
        {item.featured ? (
          <span className="rounded-full bg-sakura-deep/10 px-2.5 py-0.5 text-sakura-deep">
            À l’affiche
          </span>
        ) : null}
      </p>
      <h3 className={cx("mt-4 text-ink", size === "lg" ? "display-lg" : "display-md")}>
        {item.name}
      </h3>
      {details ? (
        <p className={cx("mt-3 text-muted", size === "lg" ? "lede max-w-[26rem]" : "text-[0.9375rem]")}>
          {details}
        </p>
      ) : null}
      {meta.length ? (
        <p className="mt-2 text-[0.8125rem] font-medium tracking-[0.04em] text-brass-deep">
          {meta.join(" · ")}
        </p>
      ) : null}
      <p
        className={cx(
          "mt-5 flex items-baseline gap-2 border-t border-line pt-4 font-serif text-ink",
          size === "lg" ? "text-[2.25rem] leading-none" : "text-[1.625rem] leading-none",
        )}
      >
        <span className="font-sans text-[0.6875rem] font-semibold tracking-[0.14em] text-muted" aria-hidden>
          CHF
        </span>
        <Price item={item} />
      </p>
    </>
  );
}

export function FoodSequence() {
  return (
    <section
      aria-labelledby="food-title"
      className="on-light relative overflow-hidden bg-paper py-24 sm:py-28 lg:py-40"
    >
      <div className="container-x">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-sakura-deep">
                <span aria-hidden className="h-px w-10 bg-sakura-deep/60" />
                Une sélection de notre carte
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 id="food-title" className="display-xl mt-7 text-ink">
                Ce qui arrive <em className="text-sakura-deep">à table.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal index={2} className="lg:col-span-4 lg:col-start-9">
            <p className="text-muted">
              Sashimis, plateaux à partager, teppan et spécialités de la maison : un avant-goût
              d’une carte de plus de {Math.floor(menuItemCount / 10) * 10} plats.
            </p>
            <ArrowLink href="/la-carte" className="mt-5">
              Voir toute la carte
            </ArrowLink>
          </Reveal>
        </header>

        {/* Two lead dishes, alternating sides */}
        <ol className="mt-16 space-y-20 lg:mt-24 lg:space-y-8">
          {leads.map((feature, i) => (
            <li
              key={feature.dishId}
              className="grid items-center gap-8 lg:grid-cols-12 lg:gap-x-10"
            >
              <DishPlate
                photo={feature.photo}
                sizes="(min-width: 1024px) 42vw, 90vw"
                turnWithScroll={feature.turn}
                shadow="lg"
                className={cx(
                  "mx-auto w-full max-w-[34rem]",
                  i % 2 === 0 ? "lg:col-span-6" : "lg:order-2 lg:col-span-6 lg:col-start-7",
                )}
              />
              <Reveal
                distance={16}
                className={cx(
                  i % 2 === 0 ? "lg:col-span-5 lg:col-start-8" : "lg:order-1 lg:col-span-5 lg:col-start-1",
                )}
              >
                <Caption feature={feature} size="lg" />
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Three more, in a quieter row */}
        <ol className="mt-24 grid gap-16 border-t border-line pt-16 sm:grid-cols-2 lg:mt-32 lg:grid-cols-3 lg:items-start lg:gap-12 lg:pt-20">
          {trio.map((feature, i) => (
            <li key={feature.dishId} className="flex flex-col">
              <div className="flex aspect-[5/4] items-center justify-center overflow-visible [&>*]:max-h-full">
                <DishPlate
                  photo={feature.photo}
                  sizes="(min-width: 1024px) 26vw, (min-width: 640px) 44vw, 80vw"
                  shadow="sm"
                  delay={i * 0.08}
                  className={feature.plateWidth ?? "w-[86%]"}
                />
              </div>
              <Reveal index={i} distance={12} className="mt-6">
                <Caption feature={feature} size="sm" />
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
