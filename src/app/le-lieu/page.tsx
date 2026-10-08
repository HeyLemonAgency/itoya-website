import type { Metadata } from "next";
import Image from "next/image";
import { media, venueGallery } from "@/content/media";
import { site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Gallery } from "@/components/gallery/Gallery";

export const metadata: Metadata = {
  title: "Le lieu",
  description:
    "Une salle sous une canopée de fleurs de cerisier, des lanternes et du bois sombre, et trois salles tatami privées : découvrez le restaurant Itoya à Crissier.",
  alternates: { canonical: "/le-lieu" },
};

export default function PlacePage() {
  const { room } = media;
  const canopy = media.intro.canopy;
  return (
    <>
      <PageHero
        eyebrow="Le lieu"
        title="Prenez place"
        accent="sous les fleurs."
        photo={room.wide}
        lede={
          <p>
            Une canopée de fleurs de cerisier, la lumière des lanternes, le bois sombre des
            claustras : chez Itoya, le décor fait partie du repas.
          </p>
        }
      />

      {/* ── The canopy ─────────────────────────────────────────────── */}
      <section aria-labelledby="canopy-title" className="on-light bg-ivory py-24 lg:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-sakura-deep">
                <span aria-hidden className="h-px w-10 bg-sakura-deep/60" />
                La salle
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 id="canopy-title" className="display-xl mt-7 max-w-[12ch] text-ink">
                Les yeux levés vers les fleurs.
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="lede mt-7 max-w-[30rem] text-muted">
                Au-dessus des tables, des branches de cerisier en fleurs forment un ciel rose. Les
                lanternes diffusent une lumière chaude ; les claustras de bois sombre dessinent la
                salle.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <ImageReveal className="aspect-[4/5] w-full">
              <Image
                src={canopy.src}
                alt={canopy.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                quality={78}
                className="object-cover"
                style={{ objectPosition: canopy.position }}
              />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* ── Tatami rooms ───────────────────────────────────────────── */}
      <section aria-labelledby="tatami-title" className="relative bg-ink text-ivory">
        <div className="grid lg:grid-cols-2">
          <Parallax
            amount={7}
            className="aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:min-h-[44rem]"
          >
            <Image
              src={room.privateRoom.src}
              alt={room.privateRoom.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              quality={78}
              className="object-cover"
              style={{ objectPosition: room.privateRoom.position }}
            />
          </Parallax>
          <div className="grain relative flex items-center">
            <div className="relative z-10 px-[var(--gutter)] py-20 lg:px-20 lg:py-28">
              <Reveal>
                <p className="eyebrow flex items-center gap-4 text-sakura">
                  <span aria-hidden className="h-px w-10 bg-sakura/70" />
                  Salles privées
                </p>
              </Reveal>
              <Reveal index={1}>
                <h2 id="tatami-title" className="display-xl mt-7 max-w-[12ch]">
                  Trois salles <em className="text-sakura-pale">tatami.</em>
                </h2>
              </Reveal>
              <Reveal index={2}>
                <p className="lede mt-7 max-w-[30rem] text-ivory/80">
                  Pour un repas plus au calme, Itoya dispose de trois salles tatami privées.
                  Renseignements et disponibilités par téléphone.
                </p>
              </Reveal>
              <Reveal index={3}>
                <div className="mt-10 flex flex-wrap gap-3">
                  <ButtonLink href={site.phone.href} variant="ivory" icon={<PhoneIcon size={16} />}>
                    {site.phone.display}
                  </ButtonLink>
                  <ButtonLink href="/reservation" variant="ghost-light" arrow>
                    Réserver
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ────────────────────────────────────────────────── */}
      {venueGallery.length > 1 ? (
        <section aria-labelledby="gallery-title" className="on-light bg-paper py-24 lg:py-36">
          <div className="container-x">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <Reveal>
                <h2 id="gallery-title" className="display-lg text-ink">
                  En images
                </h2>
              </Reveal>
              <Reveal index={1}>
                <p className="max-w-sm text-muted">
                  Touchez une photo pour l’agrandir. Les flèches du clavier permettent de passer
                  d’une image à l’autre.
                </p>
              </Reveal>
            </div>
            <Gallery photos={venueGallery} className="mt-12 lg:mt-16" />
          </div>
        </section>
      ) : null}

      {/* ── Close ──────────────────────────────────────────────────── */}
      <section className="on-light bg-ivory py-20 lg:py-28">
        <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="display-lg max-w-[16ch] text-ink">Une table sous les fleurs&nbsp;?</h2>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/reservation" variant="ink" size="lg">
              Réserver une table
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghost-dark" size="lg" arrow>
              Nous trouver
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
