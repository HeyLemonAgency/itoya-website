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
  const { canopy, sign } = media.intro;
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
            <h2 id="intro-title" className="display-xl mt-7 max-w-[18ch] text-ink">
              Du premier regard <em className="text-sakura-deep">à la dernière bouchée.</em>
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

        <div className="relative lg:col-span-5 lg:col-start-8">
          <figure>
            <ImageReveal className="aspect-[4/5] w-full">
              <Image
                src={canopy.src}
                alt={canopy.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                quality={80}
                className="object-cover"
                style={{ objectPosition: canopy.position }}
              />
            </ImageReveal>
            <figcaption className="mt-4 max-w-[19rem] text-[0.8125rem] leading-relaxed text-muted sm:ml-auto sm:text-right">
              Le plafond de fleurs de cerisier et les lanternes en bambou de la salle principale.
            </figcaption>
          </figure>
          <div className="absolute -bottom-12 -left-6 hidden w-[42%] bg-ivory p-2 shadow-[0_40px_60px_-30px_rgba(20,22,18,0.55)] sm:block lg:-bottom-20 lg:-left-24">
            <ImageReveal from="top" delay={0.35} className="aspect-[5/6] w-full">
              <Image
                src={sign.src}
                alt={sign.alt}
                fill
                sizes="(min-width: 1024px) 18vw, 40vw"
                quality={78}
                className="object-cover"
                style={{ objectPosition: sign.position }}
              />
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
