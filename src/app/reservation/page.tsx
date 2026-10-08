import type { Metadata } from "next";
import Link from "next/link";
import { mailtoBooking, site } from "@/content/site";
import { formulas } from "@/content/formulas";
import { formatPrice, formatService } from "@/lib/format";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { ArrowRight, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "Réserver une table",
  description:
    "Réservez votre table chez Itoya à Crissier par téléphone au +41 21 697 88 88, ou par e-mail à info@itoya.ch.",
  alternates: { canonical: "/reservation" },
};

const checklist = ["La date", "L’heure, midi ou soir", "Le nombre de personnes", "Votre nom et votre téléphone"];

export default function ReservationPage() {
  return (
    <>
      <PageHero
        eyebrow="Réservation"
        title="Réserver"
        accent="une table."
        lede={
          <p>
            Les réservations se prennent par téléphone. Vous pouvez aussi nous écrire : votre table
            est réservée dès que l’équipe vous l’a confirmée.
          </p>
        }
      />

      <section aria-label="Moyens de réserver" className="on-light bg-ivory">
        <div className="container-x grid gap-6 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
          {/* Primary channel */}
          <Reveal className="lg:col-span-7">
            <div className="grain relative flex h-full flex-col overflow-hidden bg-ink p-8 text-ivory sm:p-12 lg:p-14">
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(80%_80%_at_100%_0%,rgba(201,145,152,0.2),transparent_70%)]"
              />
              <div className="relative z-10 flex h-full flex-col">
                <p className="eyebrow flex items-center gap-3 text-brass">
                  <PhoneIcon size={16} />
                  Par téléphone
                </p>
                <h2 className="display-lg mt-6">Appelez-nous.</h2>
                <a
                  href={site.phone.href}
                  className="mt-8 block font-serif text-[clamp(2.4rem,1.5rem+3.8vw,4.75rem)] leading-none tabular text-ivory transition-colors hover:text-sakura-pale"
                >
                  <span className="sr-only">Appeler le </span>
                  {site.phone.display}
                </a>
                <p className="mt-4 text-ivory/70">
                  ou au{" "}
                  <a href={site.mobile.href} className="link-underline text-ivory tabular">
                    {site.mobile.display}
                  </a>
                </p>
                <div className="mt-auto pt-10">
                  <ButtonLink
                    href={site.phone.href}
                    variant="ivory"
                    size="lg"
                    icon={<PhoneIcon size={16} />}
                    className="w-full sm:w-auto"
                  >
                    Réserver par téléphone
                  </ButtonLink>
                  <p className="mt-5 text-[0.875rem] text-ivory/60">
                    {site.hours.summary},{" "}
                    {site.hours.services.map((s) => formatService(s.open, s.close)).join(" et ")}.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Secondary channel */}
          <Reveal index={1} className="lg:col-span-5">
            <div className="flex h-full flex-col border border-line bg-paper p-8 sm:p-12 lg:p-14">
              <p className="eyebrow flex items-center gap-3 text-brass-deep">
                <MailIcon size={16} />
                Par e-mail
              </p>
              <h2 className="display-md mt-6 text-ink">Écrivez-nous.</h2>
              <p className="mt-4 text-muted">
                Le bouton ouvre votre messagerie avec un modèle à compléter. Pensez à indiquer&nbsp;:
              </p>
              <ul className="mt-5 space-y-2 text-ink">
                {checklist.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden className="mt-[0.75em] h-px w-3 shrink-0 bg-sakura-deep" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-10">
                <ButtonLink
                  href={mailtoBooking}
                  variant="ghost-dark"
                  size="lg"
                  icon={<MailIcon size={16} />}
                  className="w-full sm:w-auto"
                >
                  Écrire un e-mail
                </ButtonLink>
                <p className="mt-5 text-[0.875rem] text-muted">
                  {site.email} — la réservation est confirmée par la réponse de l’équipe.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="before-title" className="on-light bg-paper py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="before-title" className="display-lg text-ink">
              Avant de venir
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
            {formulas.map((f, i) => (
              <Reveal key={f.id} index={i}>
                <Link
                  href={`/formules#${f.id}`}
                  className="group flex h-full flex-col border-t border-ink pt-6"
                >
                  <p className="eyebrow text-brass-deep">{f.service}</p>
                  <p className="mt-3 font-serif text-[1.75rem] leading-tight text-ink">
                    {f.title} · {f.rounds} × {f.dishesPerRound} plats
                  </p>
                  <p className="mt-2 text-muted tabular">
                    {f.prices.map((p) => `CHF ${formatPrice(p.amount)} ${p.label.toLowerCase()}`).join(" · ")}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink">
                    Détails
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
            <Reveal index={2} className="sm:col-span-2">
              <p className="border-t border-line pt-6 text-muted">
                Accès&nbsp;: {site.access.bus} · {site.access.parking}.{" "}
                <Link href="/contact" className="link-underline text-ink">
                  Plan et itinéraire
                </Link>
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
