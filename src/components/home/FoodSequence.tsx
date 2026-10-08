import Image from "next/image";
import { media, type Photo } from "@/content/media";
import { getDish, menuItemCount } from "@/content/menu-utils";
import { cx } from "@/lib/format";
import { ArrowLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Price, dishMeta } from "@/components/menu/Price";

type Feature = {
  dishId: string;
  kicker: string;
  photo: Photo;
  /** Grid placement and frame proportion on large screens. */
  layout: string;
  frame: string;
  sizes: string;
  /** Optional editorial summary when the menu lists a long composition. */
  summary?: string;
};

/**
 * Editorial selection from the real menu. Names, compositions and prices are
 * read from src/content/menu.ts so they can never drift from the full menu.
 */
const features: Feature[] = [
  {
    dishId: "n41",
    kicker: "Sashimis",
    photo: media.dishes.sashimi,
    layout: "lg:col-span-7",
    frame: "aspect-[4/3]",
    sizes: "(min-width: 1024px) 55vw, 100vw",
  },
  {
    dishId: "plateau-9-sushi-maki-mixtes",
    kicker: "À partager",
    photo: media.dishes.plateau,
    layout: "lg:col-span-4 lg:col-start-9 lg:mt-48",
    frame: "aspect-[4/5]",
    sizes: "(min-width: 1024px) 32vw, 100vw",
    summary: "Hosomaki, California, futo maki, gunkan et nigiris",
  },
  {
    dishId: "n96",
    kicker: "Spécialité Itoya",
    photo: media.dishes.volcan,
    layout: "lg:col-span-4 lg:col-start-2 lg:-mt-16",
    frame: "aspect-square",
    sizes: "(min-width: 1024px) 32vw, 100vw",
  },
  {
    dishId: "n100",
    kicker: "Teppan",
    photo: media.dishes.teppan,
    layout: "lg:col-span-5 lg:col-start-7 lg:mt-24",
    frame: "aspect-[5/4]",
    sizes: "(min-width: 1024px) 40vw, 100vw",
  },
];

export function FoodSequence() {
  return (
    <section aria-labelledby="food-title" className="on-light relative bg-paper py-24 sm:py-28 lg:py-40">
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
              Sushis et sashimis, plateaux à partager, teppan et spécialités de la maison : un
              avant-goût d’une carte qui compte plus de {Math.floor(menuItemCount / 10) * 10}{" "}
              plats.
            </p>
            <ArrowLink href="/la-carte" className="mt-5">
              Voir toute la carte
            </ArrowLink>
          </Reveal>
        </header>

        <ol className="mt-16 grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:mt-28 lg:grid-cols-12 lg:gap-y-24">
          {features.map((feature, i) => {
            const { item } = getDish(feature.dishId);
            const meta = dishMeta(item);
            return (
              <li key={feature.dishId} className={cx("group", feature.layout)}>
                <figure>
                  <ImageReveal className={cx("w-full bg-parchment", feature.frame)} delay={0.05}>
                    <Image
                      src={feature.photo.src}
                      alt={feature.photo.alt}
                      fill
                      sizes={feature.sizes}
                      quality={80}
                      className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.03]"
                      style={{ objectPosition: feature.photo.position }}
                    />
                  </ImageReveal>
                  <figcaption className="mt-6">
                    <Reveal index={i % 2} distance={12}>
                      <p className="eyebrow flex items-center gap-3 text-[0.6875rem] text-brass-deep">
                        {item.number ? <span className="tabular">N°{item.number}</span> : null}
                        {item.number ? <span aria-hidden className="h-px w-5 bg-current/50" /> : null}
                        <span>{feature.kicker}</span>
                      </p>
                      <div className="mt-3 flex items-baseline justify-between gap-6 border-b border-line pb-4">
                        <h3 className="display-md text-ink">{item.name}</h3>
                        <Price item={item} className="font-serif text-[1.5rem] text-ink" />
                      </div>
                      <p className="mt-3 text-[0.9375rem] text-muted">
                        {[feature.summary ?? item.description, ...meta].filter(Boolean).join(" · ")}
                      </p>
                    </Reveal>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
