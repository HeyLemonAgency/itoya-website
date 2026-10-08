import Image from "next/image";
import { media } from "@/content/media";
import { site } from "@/content/site";
import { formatService } from "@/lib/format";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";

const facts = [
  {
    title: "Midi & soir",
    text: `Tous les jours, ${site.hours.services
      .map((s) => formatService(s.open, s.close))
      .join(" et ")}.`,
  },
  {
    title: "Commande à table",
    text: "Les menus dégustation se commandent sur tablette, directement à votre table.",
  },
  {
    title: "Trois salles tatami",
    text: "Des salles privées, pour un repas plus au calme.",
  },
];

export function Intro() {
  const photo = media.intro;
  return (
    <section
      aria-labelledby="intro-title"
      className="on-light relative z-10 overflow-hidden bg-ivory"
    >
      <div className="container-x grid gap-16 py-24 sm:py-28 lg:grid-cols-12 lg:gap-x-10 lg:py-40">
        <div className="lg:col-span-6 lg:self-center">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-sakura-deep">
              <span aria-hidden className="h-px w-10 bg-sakura-deep/60" />
              Bienvenue chez Itoya
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 id="intro-title" className="display-xl mt-7 max-w-[13ch] text-ink">
              Du premier regard à la dernière bouchée.
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="lede mt-8 max-w-[33rem] text-muted">
              Chez Itoya, la cuisine japonaise se découvre autant qu’elle se partage. Sous les
              fleurs, autour d’un plateau ou le temps d’un dîner, prenez place et savourez
              l’instant.
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-8 border-t border-line pt-8 sm:grid-cols-3 sm:gap-6">
            {facts.map((fact, i) => (
              <Reveal key={fact.title} index={i} delay={0.15}>
                <dt className="font-serif text-[1.375rem] leading-tight text-ink">{fact.title}</dt>
                <dd className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{fact.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <figure className="relative lg:col-span-5 lg:col-start-8">
          <ImageReveal className="aspect-[4/5] w-full bg-parchment">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              quality={80}
              className="object-cover"
              style={{ objectPosition: photo.position }}
            />
          </ImageReveal>
          <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-[0.8125rem] text-muted">
            <span>Sashimis · saumon, thon, crevettes, loup de mer</span>
            <span className="eyebrow text-[0.625rem] text-brass-deep">N°41</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
