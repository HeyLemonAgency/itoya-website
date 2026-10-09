import type { Metadata } from "next";
import Image from "next/image";
import { media, venueGallery } from "@/content/media";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { VenueOpening } from "@/components/venue/VenueOpening";
import { ScrollRead } from "@/components/venue/ScrollRead";
import { GuidedView, type Stop } from "@/components/venue/GuidedView";
import { SpacesIndex, type Space } from "@/components/venue/SpacesIndex";
import { DoorReveal } from "@/components/venue/DoorReveal";
import { DetailsSpread, type Figure } from "@/components/venue/DetailsSpread";
import { LanternLight } from "@/components/venue/LanternLight";

export const metadata: Metadata = {
  title: "Le lieu",
  description:
    "Une salle sous une canopée de fleurs de cerisier, des lanternes en bambou, un comptoir sushi et teppanyaki et trois salles tatami privées : visitez Itoya, à Crissier.",
  alternates: { canonical: "/le-lieu" },
};

/** The guided look around media.room.wide: only what the photo shows. */
const stops: Stop[] = [
  {
    id: "salle",
    title: "La salle",
    text: "Du bois sombre, une lumière douce et, au plafond, un ciel de fleurs de cerisier.",
    focus: { x: 50, y: 50, zoom: 1 },
  },
  {
    id: "canopee",
    title: "La canopée",
    text: "Des branches de cerisier en fleurs couvrent le plafond et forment un ciel rose au-dessus des tables.",
    focus: { x: 60, y: 20, zoom: 1.55 },
  },
  {
    id: "lanternes",
    title: "Les lanternes",
    text: "Des lanternes en bambou, suspendues parmi les fleurs, diffusent une lumière chaude.",
    focus: { x: 67, y: 41, zoom: 1.9 },
  },
  {
    id: "claustras",
    title: "Les claustras",
    text: "Des cloisons de bois ajouré aux motifs géométriques dessinent la salle et séparent les tables.",
    focus: { x: 36, y: 57, zoom: 1.75 },
  },
  {
    id: "fenetre",
    title: "La fenêtre ronde",
    text: "Une ouverture ronde, cerclée de lumière bleue, encadre une peinture.",
    focus: { x: 8, y: 70, zoom: 1.9 },
  },
];

const spaces: Space[] = [
  {
    id: "entree",
    title: "L’entrée",
    text: "Une petite cascade entre rochers et plantes, sous l’enseigne d’Itoya, accueille les clients.",
    photo: media.room.entrance,
  },
  {
    id: "comptoir",
    title: "Le comptoir",
    text: "Derrière les branches de cerisier, le comptoir sushi et teppanyaki.",
    photo: media.room.counter,
  },
  {
    id: "noren",
    title: "Les noren",
    text: "Des rideaux noren illustrés et des cloisons ajourées séparent les espaces de la salle.",
    photo: media.room.noren,
  },
  {
    id: "enseigne",
    title: "L’enseigne",
    text: "伊藤屋 · いとうや · ITOYA : l’enseigne en relief, éclairée de bleu.",
    photo: media.room.sign,
    position: "55% 50%",
  },
];

const figures: Figure[] = [
  {
    photo: media.room.kokeshi,
    caption: "Kokeshi en bois",
    aspect: "aspect-[4/5]",
    className: "col-span-4 lg:col-span-5",
  },
  {
    photo: media.room.dollRed,
    caption: "Poupée en kimono",
    aspect: "aspect-[3/4]",
    className: "col-span-2 self-end lg:col-span-3 lg:col-start-7 lg:mt-[18vh] lg:self-start",
    drift: 36,
  },
  {
    photo: media.intro.canopy,
    caption: "Lanternes en bambou",
    aspect: "aspect-[3/4]",
    className: "col-span-3 lg:col-span-3 lg:col-start-10 lg:mt-[4vh]",
    drift: 18,
  },
  {
    photo: media.room.doll,
    caption: "Poupée traditionnelle",
    aspect: "aspect-[3/4]",
    className: "col-span-3 mt-16 lg:col-span-3 lg:col-start-2 lg:mt-[8vh]",
    drift: 28,
  },
  {
    photo: media.room.vitrine,
    caption: "La vitrine du comptoir sushi",
    aspect: "aspect-[5/2]",
    className: "col-span-6 lg:col-span-7 lg:col-start-6 lg:mt-[16vh]",
    drift: 12,
  },
];

const facts = [
  { label: "La salle", value: "Sous une canopée de cerisiers" },
  { label: "Le comptoir", value: "Sushi et teppanyaki" },
  { label: "Les salons", value: "Trois salles tatami privées" },
];

function Eyebrow({ children, tone = "dark" }: { children: string; tone?: "dark" | "light" }) {
  return (
    <p
      className={`eyebrow flex items-center gap-4 ${tone === "dark" ? "text-sakura-deep" : "text-sakura"}`}
    >
      <span
        aria-hidden
        className={`h-px w-10 ${tone === "dark" ? "bg-sakura-deep/60" : "bg-sakura/70"}`}
      />
      {children}
    </p>
  );
}

export default function PlacePage() {
  const { room } = media;
  return (
    <>
      {/* ── I. L’ouverture ─────────────────────────────────────────── */}
      <VenueOpening
        eyebrow="Le lieu · Crissier"
        before="Prenez place"
        after="sous les fleurs."
        caption={
          <p className="lede max-w-[32rem] text-ivory/90 [text-shadow:0_1px_20px_rgba(0,0,0,0.5)]">
            Une salle sous les fleurs de cerisier, un comptoir sushi et teppanyaki, trois salles
            tatami : bienvenue chez Itoya, à Crissier.
          </p>
        }
      />

      {/* ── II. Le décor ───────────────────────────────────────────── */}
      <section aria-label="Le décor" className="on-light bg-ivory pt-28 pb-8 lg:pt-44">
        <div className="container-x">
          <ScrollRead
            text="Une *canopée de cerisiers en fleurs,* la lumière des *lanternes en bambou,* le bois sombre des *claustras* : chez Itoya, le décor fait partie du repas."
            className="mx-auto max-w-[24ch] text-center font-serif text-[clamp(2rem,1.2rem+3.4vw,4.5rem)] leading-[1.12]"
          />
          <dl className="mx-auto mt-20 grid max-w-5xl gap-8 border-t border-line pt-8 sm:grid-cols-3 lg:mt-28">
            {facts.map((fact, i) => (
              <Reveal key={fact.label} index={i}>
                <dt className="text-[0.6875rem] font-semibold tracking-[0.18em] text-brass-deep uppercase">
                  {fact.label}
                </dt>
                <dd className="mt-3 font-serif text-[1.5rem] leading-snug text-ink">
                  {fact.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      {/* ── III. La salle, du regard ───────────────────────────────── */}
      <section
        aria-labelledby="room-title"
        className="on-light bg-ivory pt-24 pb-24 lg:pt-36 lg:pb-36"
      >
        <div className="container-x">
          <Reveal>
            <Eyebrow>La salle</Eyebrow>
          </Reveal>
          <Reveal index={1}>
            <h2 id="room-title" className="display-xl mt-7 max-w-[13ch] text-ink">
              Les yeux levés vers les fleurs.
            </h2>
          </Reveal>
          <div className="mt-12 lg:mt-4">
            <GuidedView photo={room.wide} stops={stops} />
          </div>
        </div>
      </section>

      {/* ── IV. Les espaces ────────────────────────────────────────── */}
      <section
        aria-labelledby="spaces-title"
        className="grain relative bg-ink py-24 text-ivory lg:py-36"
      >
        <div className="container-x relative z-10">
          <div className="mb-14 lg:mb-20">
            <Reveal>
              <Eyebrow tone="light">Au fil de la visite</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 id="spaces-title" className="display-xl mt-7 max-w-[14ch]">
                De l’entrée <em className="text-sakura-pale">au comptoir.</em>
              </h2>
            </Reveal>
          </div>
          <SpacesIndex spaces={spaces} />
        </div>
      </section>

      {/* ── V. Salles privées ──────────────────────────────────────── */}
      <section aria-labelledby="tatami-title" className="on-light bg-paper py-24 lg:py-36">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <DoorReveal
            photo={room.privateRoom}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] lg:col-span-6"
          />
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <Eyebrow>Salles privées</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2 id="tatami-title" className="display-xl mt-7 max-w-[12ch] text-ink">
                Trois salles <em className="text-sakura-deep">tatami.</em>
              </h2>
            </Reveal>
            <Reveal index={2}>
              <p className="lede mt-7 max-w-[30rem] text-muted">
                Pour un repas plus au calme, Itoya dispose de trois salles tatami privées.
                Renseignements et disponibilités par téléphone.
              </p>
            </Reveal>
            <Reveal index={3}>
              <div className="mt-10 flex flex-wrap gap-3">
                <ButtonLink href={site.phone.href} variant="ink" icon={<PhoneIcon size={16} />}>
                  {site.phone.display}
                </ButtonLink>
                <ButtonLink href="/reservation" variant="ghost-dark" arrow>
                  Réserver
                </ButtonLink>
              </div>
            </Reveal>
            <ImageReveal className="mt-14 hidden aspect-[16/10] w-full sm:block" delay={0.15}>
              <Image
                src={room.privateRoomLong.src}
                alt={room.privateRoomLong.alt}
                fill
                sizes="(min-width: 1024px) 36vw, 90vw"
                quality={76}
                className="object-cover"
                style={{ objectPosition: "50% 60%" }}
              />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* ── VI. Les détails ────────────────────────────────────────── */}
      <section aria-labelledby="details-title" className="on-light bg-ivory py-24 lg:py-36">
        <div className="container-x">
          <DetailsSpread
            figures={figures}
            photos={venueGallery}
            heading={
              <>
                <Reveal>
                  <Eyebrow>Les détails</Eyebrow>
                </Reveal>
                <Reveal index={1}>
                  <h2 id="details-title" className="display-xl mt-7 max-w-[13ch] text-ink">
                    Un détail à chaque regard.
                  </h2>
                </Reveal>
              </>
            }
          />
        </div>
      </section>

      {/* ── VII. À la lumière des lanternes ────────────────────────── */}
      <LanternLight photo={media.hero.desktop}>
        <div className="container-x flex flex-col gap-10 pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-24">
          <div>
            <Reveal>
              <Eyebrow tone="light">À la lumière des lanternes</Eyebrow>
            </Reveal>
            <Reveal index={1}>
              <h2
                id="close-title"
                className="display-xl mt-7 max-w-[12ch] [text-shadow:0_2px_30px_rgba(0,0,0,0.6)]"
              >
                Une table <em className="text-sakura-pale">sous les fleurs&nbsp;?</em>
              </h2>
            </Reveal>
          </div>
          <Reveal index={2}>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/reservation" variant="ivory" size="lg">
                Réserver une table
              </ButtonLink>
              <ButtonLink href="/contact" variant="ghost-light" size="lg" arrow>
                Nous trouver
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </LanternLight>
    </>
  );
}
