import Image from "next/image";
import { media } from "@/content/media";
import { ArrowLink } from "@/components/ui/Button";
import { Parallax } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { ImageReveal } from "@/components/motion/ImageReveal";

export function Room() {
  const wide = media.room.wide;
  const details = media.room.gallery.slice(0, 3);
  return (
    <section aria-labelledby="room-title" className="relative bg-ink text-ivory">
      <div className="relative">
        <Parallax amount={9} className="h-[88svh] min-h-[34rem] max-h-[64rem]">
          <Image
            src={wide.src}
            alt={wide.alt}
            fill
            sizes="100vw"
            quality={78}
            className="object-cover"
            style={{ objectPosition: wide.position }}
          />
        </Parallax>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 via-40% to-ink/20" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_70%_at_0%_100%,rgba(20,22,18,0.8),transparent_70%)]" />
        </div>
        <div className="grain pointer-events-none absolute inset-0" aria-hidden />

        <div className="absolute inset-x-0 bottom-0 z-10">
          <div className="container-x pb-16 sm:pb-20 lg:pb-28">
            <div className="max-w-[40rem]">
              <Reveal>
                <p className="eyebrow flex items-center gap-4 text-sakura">
                  <span aria-hidden className="h-px w-10 bg-sakura/70" />
                  Le lieu
                </p>
              </Reveal>
              <Reveal index={1}>
                <h2 id="room-title" className="display-xl mt-7">
                  Prenez place <em className="text-sakura-pale">sous les fleurs.</em>
                </h2>
              </Reveal>
              <Reveal index={2}>
                <p className="lede mt-7 max-w-[34rem] text-ivory/80">
                  Une canopée de fleurs de cerisier, la lumière douce des lanternes, le bois sombre
                  des claustras. Et pour se retrouver plus au calme, trois salles tatami privées.
                </p>
              </Reveal>
              <Reveal index={3}>
                <ArrowLink href="/le-lieu" tone="light" className="mt-6">
                  Découvrir le lieu
                </ArrowLink>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      {details.length ? (
        <div className="container-x pb-24 lg:pb-32">
          <ul className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {details.map((photo, i) => (
              <li key={photo.src} className={i === 2 ? "col-span-2 lg:col-span-1" : undefined}>
                <ImageReveal
                  className={i === 2 ? "aspect-[16/9] lg:aspect-[3/4]" : "aspect-[3/4]"}
                  delay={i * 0.1}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 30vw, 50vw"
                    quality={75}
                    className="object-cover"
                    style={{ objectPosition: photo.position }}
                  />
                </ImageReveal>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
