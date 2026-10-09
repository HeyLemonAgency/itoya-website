import type { Metadata } from "next";
import Image from "next/image";
import { media, venueGallery } from "@/content/media";
import { site } from "@/content/site";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { NorenHero } from "@/components/venue/NorenHero";
import { ScrollRead } from "@/components/venue/ScrollRead";
import { RoomPanorama, type Spot } from "@/components/venue/RoomPanorama";
import { Spaces, type Space } from "@/components/venue/Spaces";
import { ShojiReveal } from "@/components/venue/ShojiReveal";
import { FloatingDetails, type FloatingPhoto } from "@/components/venue/FloatingDetails";
import { LanternLight } from "@/components/venue/LanternLight";

export const metadata: Metadata = {
  title: "Le lieu",
  description:
    "Passez le noren : une salle sous une canopée de fleurs de cerisier, des lanternes en bambou, un comptoir sushi et teppanyaki et trois salles tatami privées. Visitez Itoya, à Crissier.",
  alternates: { canonical: "/le-lieu" },
};

/** Points of interest on the room panorama (media.room.wide): what the photo shows. */
const spots: Spot[] = [
  {
    id: "canopee",
    x: 58,
    y: 20,
    title: "La canopée",
    text: "Des branches de cerisier en fleurs forment un ciel rose au-dessus des tables.",
  },
  {
    id: "lanternes",
    x: 67,
    y: 40,
    title: "Les lanternes",
    text: "Des lanternes en bambou, suspendues parmi les fleurs, éclairent la salle.",
  },
  {
    id: "claustras",
    x: 37,
    y: 56,
    title: "Les claustras",
    text: "Des cloisons de bois ajouré aux motifs géométriques dessinent la salle.",
  },
  {
    id: "fenetre",
    x: 7,
    y: 69,
    title: "La fenêtre ronde",
    text: "Une ouverture ronde, cerclée de lumière bleue, encadre une peinture.",
  },
  {
    id: "tables",
    x: 76,
    y: 79,
    title: "Les tables",
    text: "Tables en bois et banquettes, séparées par des cloisons basses.",
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
    id: "vitrine",
    title: "La vitrine",
    text: "Saumon, thon et autres poissons, en vitrine au comptoir sushi.",
    photo: media.room.vitrine,
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
  },
];

const details: FloatingPhoto[] = [
  {
    photo: media.room.kokeshi,
    depth: 1.4,
    tilt: -3,
    className: "left-[4%] top-[6%] w-[30vw] md:left-[5%] md:w-[15vw]",
  },
  {
    photo: media.room.dollRed,
    depth: 0.7,
    tilt: 2,
    className: "left-[29%] top-[4%] w-[10vw]",
    wide: true,
  },
  {
    photo: media.room.sign,
    depth: 1.9,
    tilt: 2.5,
    className: "right-[4%] top-[8%] w-[32vw] md:right-[5%] md:w-[17vw]",
  },
  {
    photo: media.intro.canopy,
    depth: 0.9,
    tilt: -2,
    className: "right-[27%] top-[3%] w-[9.5vw]",
    wide: true,
  },
  {
    photo: media.room.doll,
    depth: 2.8,
    tilt: 3,
    className: "left-[6%] bottom-[7%] w-[28vw] md:left-[15%] md:bottom-[8%] md:w-[12vw]",
  },
  {
    photo: media.room.vitrine,
    depth: 3.2,
    tilt: -2,
    className: "right-[5%] bottom-[9%] w-[48vw] md:right-[11%] md:bottom-[9%] md:w-[23vw]",
  },
  {
    photo: media.room.noren,
    depth: 2.2,
    tilt: 2,
    className: "left-[2%] top-[42%] w-[10vw]",
    wide: true,
  },
  {
    photo: media.room.entrance,
    depth: 1.6,
    tilt: -3,
    className: "right-[2%] top-[44%] w-[10.5vw]",
    wide: true,
  },
];

export default function PlacePage() {
  const { room } = media;
  return (
    <>
      {/* ── I. Passer le noren ─────────────────────────────────────── */}
      <NorenHero>
        <p className="eyebrow flex items-center gap-4 text-sakura">
          <span aria-hidden className="h-px w-10 bg-sakura/70" />
          Le lieu · Crissier
        </p>
        <h1
          id="venue-title"
          className="display-hero mt-6 max-w-[11ch] [text-shadow:0_2px_30px_rgba(0,0,0,0.45)]"
        >
          Prenez place <em className="text-sakura-pale">sous les fleurs.</em>
        </h1>
        <p className="lede mt-6 max-w-[34rem] text-ivory/85">
          Au Japon, on écarte le noren pour entrer. Derrière celui d’Itoya, une salle sous une
          canopée de fleurs de cerisier.
        </p>
      </NorenHero>

      {/* ── II. La salle ───────────────────────────────────────────── */}
      <section aria-labelledby="room-title" className="on-light bg-ivory pb-24 lg:pb-36">
        <div className="container-x py-28 lg:py-44">
          <ScrollRead
            text="Une *canopée de cerisiers en fleurs,* la lumière des *lanternes en bambou,* le bois sombre des *claustras* : chez Itoya, le décor fait partie du repas."
            className="mx-auto max-w-[24ch] text-center font-serif text-[clamp(2rem,1.2rem+3.4vw,4.5rem)] leading-[1.12] text-ink"
          />
        </div>

        <div className="container-x grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-sakura-deep">
                <span aria-hidden className="h-px w-10 bg-sakura-deep/60" />
                La salle
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 id="room-title" className="display-xl mt-7 max-w-[13ch] text-ink">
                Les yeux levés vers les fleurs.
              </h2>
            </Reveal>
          </div>
        </div>
        <RoomPanorama photo={room.wide} spots={spots} className="mt-12 lg:mt-16" />
      </section>

      {/* ── III. Au fil de la visite ───────────────────────────────── */}
      <section aria-labelledby="spaces-title" className="on-light bg-paper py-24 lg:py-36">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="eyebrow flex items-center gap-4 text-sakura-deep">
                  <span aria-hidden className="h-px w-10 bg-sakura-deep/60" />
                  Au fil de la visite
                </p>
              </Reveal>
              <Reveal index={1}>
                <h2 id="spaces-title" className="display-xl mt-7 max-w-[13ch] text-ink">
                  De l’entrée au comptoir.
                </h2>
              </Reveal>
            </div>
            <Reveal index={2} className="lg:col-span-4 lg:col-start-9">
              <p className="text-muted">Survolez ou touchez chaque espace pour l’ouvrir.</p>
            </Reveal>
          </div>
          <Reveal index={1} distance={24}>
            <Spaces spaces={spaces} className="mt-12 lg:mt-16" />
          </Reveal>
        </div>
      </section>

      {/* ── IV. Salles privées ─────────────────────────────────────── */}
      <section
        aria-labelledby="tatami-title"
        className="grain relative bg-ink py-24 text-ivory lg:py-36"
      >
        <div className="container-x relative z-10 grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <ShojiReveal
            photo={room.privateRoom}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/5] lg:col-span-6"
          />
          <div className="lg:col-span-5 lg:col-start-8">
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
            <ImageReveal className="mt-14 hidden aspect-[16/10] w-full sm:block" delay={0.2}>
              <Image
                src={room.privateRoomLong.src}
                alt={room.privateRoomLong.alt}
                fill
                sizes="(min-width: 1024px) 36vw, 90vw"
                quality={74}
                className="object-cover"
                style={{ objectPosition: "50% 60%" }}
              />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* ── V. Les détails ─────────────────────────────────────────── */}
      <section
        aria-labelledby="details-title"
        className="on-light relative h-[clamp(44rem,118svh,64rem)] overflow-hidden bg-ivory"
      >
        <FloatingDetails items={details} photos={venueGallery}>
          <p className="eyebrow flex items-center gap-4 text-sakura-deep">
            <span aria-hidden className="h-px w-10 bg-sakura-deep/60" />
            Les détails
            <span aria-hidden className="h-px w-10 bg-sakura-deep/60" />
          </p>
          <h2 id="details-title" className="display-xl mt-7 max-w-[12ch] text-ink">
            Un détail à chaque regard.
          </h2>
          <p className="lede mt-6 max-w-[26rem] text-muted">
            Kokeshi en bois, poupées traditionnelles, enseigne en relief, rideaux noren : la salle
            se découvre peu à peu.
          </p>
        </FloatingDetails>
      </section>

      {/* ── VI. À la lumière des lanternes ─────────────────────────── */}
      <LanternLight photo={media.hero.desktop}>
        <div className="container-x flex flex-col gap-10 pb-16 lg:flex-row lg:items-end lg:justify-between lg:pb-24">
          <div>
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-sakura">
                <span aria-hidden className="h-px w-10 bg-sakura/70" />À la lumière des lanternes
              </p>
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
