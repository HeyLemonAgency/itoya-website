import type { Metadata } from "next";
import Image from "next/image";
import { fullAddress, mailtoContact, site } from "@/content/site";
import { media } from "@/content/media";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowUpRight, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { PracticalInfo } from "@/components/home/Visit";

export const metadata: Metadata = {
  title: "Nous trouver",
  description:
    "Itoya, Chemin des Lentillières 7A, 1023 Crissier. Ouvert tous les jours, 11:30–15:00 et 18:00–23:00. Bus 36, arrêt Lentillières ; parking public Oassis. Tél. +41 21 697 88 88.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Nous trouver"
        title="À Crissier,"
        accent="tous les jours."
        lede={
          <p>
            {fullAddress}. Ouvert midi et soir, sept jours sur sept. En bus, ligne 36 jusqu’à
            l’arrêt Lentillières ; en voiture, parking public Oassis.
          </p>
        }
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink
            href={site.maps.directions}
            target="_blank"
            rel="noopener noreferrer"
            variant="ivory"
            icon={<ArrowUpRight size={16} />}
          >
            Itinéraire
            <span className="sr-only"> (Google Maps, nouvel onglet)</span>
          </ButtonLink>
          <ButtonLink href={site.phone.href} variant="ghost-light" icon={<PhoneIcon size={16} />}>
            {site.phone.display}
          </ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="infos-title" className="on-light bg-ivory py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 id="infos-title" className="display-lg text-ink">
                Informations pratiques
              </h2>
            </Reveal>
            <Reveal index={1}>
              <p className="mt-5 max-w-md text-muted">{site.hours.note}</p>
            </Reveal>

            {/* Understated static location card — no heavy map on page load. */}
            <Reveal index={2}>
              <figure className="relative mt-10 overflow-hidden bg-ink text-ivory">
                <div className="relative aspect-[4/5] sm:aspect-[4/3] lg:aspect-[4/5]">
                  <Image
                    src={media.room.entrance.src}
                    alt={media.room.entrance.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    quality={78}
                    className="object-cover"
                    style={{ objectPosition: "50% 30%" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 via-35% to-transparent to-60%"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <p className="eyebrow text-brass">L’entrée · Crissier</p>
                  <p className="mt-3 font-serif text-[1.875rem] leading-tight">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.locality}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                    <li>
                      <a
                        href={site.maps.place}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ivory/90 hover:text-ivory"
                      >
                        <ArrowUpRight size={16} />
                        <span className="link-underline">Google Maps</span>
                        <span className="sr-only"> (nouvel onglet)</span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={site.maps.apple}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-ivory/90 hover:text-ivory"
                      >
                        <ArrowUpRight size={16} />
                        <span className="link-underline">Plans</span>
                        <span className="sr-only"> (Apple, nouvel onglet)</span>
                      </a>
                    </li>
                  </ul>
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal index={1} className="lg:col-span-6 lg:col-start-7">
            <PracticalInfo />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="write-title" className="bg-forest py-20 text-ivory lg:py-28">
        <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 id="write-title" className="display-lg max-w-[18ch]">
              Une question, une réservation&nbsp;?
            </h2>
            <p className="mt-4 max-w-lg text-ivory/75">
              Le plus simple est de nous appeler. Vous pouvez aussi écrire à{" "}
              <a href={mailtoContact} className="link-underline text-ivory">
                {site.email}
              </a>
              .
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/reservation" variant="ivory" size="lg">
              Réserver une table
            </ButtonLink>
            <ButtonLink href={mailtoContact} variant="ghost-light" size="lg" icon={<MailIcon size={16} />}>
              Écrire un e-mail
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
