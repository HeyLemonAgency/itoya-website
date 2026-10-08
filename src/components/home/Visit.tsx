import { fullAddress, mailtoBooking, site } from "@/content/site";
import { formatService } from "@/lib/format";
import { ButtonLink } from "@/components/ui/Button";
import {
  BusIcon,
  ClockIcon,
  MailIcon,
  ParkingIcon,
  PhoneIcon,
  PinIcon,
} from "@/components/ui/Icons";
import { BrushReveal } from "@/components/motion/BrushReveal";
import { Reveal } from "@/components/motion/Reveal";

/** Practical information block, shared by the homepage and /contact. */
export function PracticalInfo({ tone = "light" }: { tone?: "light" | "dark" }) {
  const muted = tone === "light" ? "text-muted" : "text-ivory/70";
  const strong = tone === "light" ? "text-ink" : "text-ivory";
  const rule = tone === "light" ? "border-line" : "border-ivory/12";
  const label = tone === "light" ? "text-brass-deep" : "text-brass";
  const link = tone === "light" ? "hover:text-sakura-deep" : "hover:text-sakura-pale";

  return (
    <dl
      className={`divide-y ${tone === "light" ? "divide-line" : "divide-ivory/12"} border-y ${rule}`}
    >
      <div className="relative py-6 pl-11">
        <ClockIcon className={`absolute top-7 left-0 ${label}`} />
        <dt className={`eyebrow text-[0.6875rem] ${label}`}>Horaires</dt>
        <dd className={`mt-2 ${strong}`}>{site.hours.summary}</dd>
        {site.hours.services.map((s) => (
          <dd key={s.label} className={`flex justify-between gap-6 tabular ${muted}`}>
            <span>{s.label}</span>
            <span>{formatService(s.open, s.close)}</span>
          </dd>
        ))}
      </div>
      <div className="relative py-6 pl-11">
        <PinIcon className={`absolute top-7 left-0 ${label}`} />
        <dt className={`eyebrow text-[0.6875rem] ${label}`}>Adresse</dt>
        <dd className={`mt-2 ${strong}`}>
          <address className="not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.locality}, {site.address.country}
          </address>
        </dd>
        <dd className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[0.875rem]">
          <a
            href={site.maps.directions}
            target="_blank"
            rel="noopener noreferrer"
            className={`link-underline ${strong} ${link}`}
          >
            Itinéraire Google Maps
            <span className="sr-only"> vers {fullAddress} (nouvel onglet)</span>
          </a>
          <a
            href={site.maps.apple}
            target="_blank"
            rel="noopener noreferrer"
            className={`link-underline ${strong} ${link}`}
          >
            Plans (Apple)
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
        </dd>
      </div>
      <div className="relative py-6 pl-11">
        <BusIcon className={`absolute top-7 left-0 ${label}`} />
        <dt className={`eyebrow text-[0.6875rem] ${label}`}>Accès</dt>
        <dd className={`mt-2 ${strong}`}>{site.access.bus}</dd>
        <dd className={`mt-1 flex items-center gap-2 ${muted}`}>
          <ParkingIcon size={16} className="shrink-0" />
          {site.access.parking}
          {site.access.showParkingConditions
            ? ` — ${site.access.parkingFreeHours} h de parking gratuit`
            : null}
        </dd>
      </div>
      <div className="relative py-6 pl-11">
        <PhoneIcon className={`absolute top-7 left-0 ${label}`} />
        <dt className={`eyebrow text-[0.6875rem] ${label}`}>Téléphone & e-mail</dt>
        <dd className="mt-2">
          <a href={site.phone.href} className={`link-quiet tabular ${strong}`}>
            {site.phone.display}
          </a>
        </dd>
        <dd>
          <a href={site.mobile.href} className={`link-quiet tabular ${muted}`}>
            {site.mobile.display}
          </a>
        </dd>
        <dd className="mt-1">
          <a href={`mailto:${site.email}`} className={`link-quiet ${muted}`}>
            {site.email}
          </a>
        </dd>
      </div>
    </dl>
  );
}

export function Visit() {
  return (
    <section
      id="visite"
      aria-labelledby="visit-title"
      className="on-light relative overflow-hidden bg-ivory py-24 sm:py-28 lg:py-40"
    >
      <div className="container-x relative grid gap-16 lg:grid-cols-12 lg:gap-x-10">
        <BrushReveal className="pointer-events-none absolute -top-10 left-[calc(var(--gutter)-0.75rem)] w-[min(94vw,40rem)] text-sakura/24 sm:-top-14 lg:-top-20 lg:w-[min(56vw,52rem)]" />
        <div className="relative lg:col-span-7">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-sakura-deep">
              <span aria-hidden className="h-px w-10 bg-sakura-deep/60" />
              Réservation
            </p>
          </Reveal>
          <Reveal index={1}>
            <h2 id="visit-title" className="display-xl mt-7 max-w-[11ch] text-ink">
              Réservez votre table.
            </h2>
          </Reveal>
          <Reveal index={2}>
            <p className="lede mt-7 max-w-[30rem] text-muted">
              Un appel suffit. Pour une date précise, un groupe ou une question, l’équipe d’Itoya
              vous répond.
            </p>
          </Reveal>
          <Reveal index={3}>
            <a
              href={site.phone.href}
              className="group mt-10 inline-flex flex-col font-serif text-[clamp(2.5rem,1.6rem+3.6vw,5rem)] leading-none text-ink tabular"
            >
              <span className="sr-only">Appeler le </span>
              <span className="link-quiet transition-colors duration-200 group-hover:text-sakura-deep">
                {site.phone.display}
              </span>
            </a>
          </Reveal>
          <Reveal index={4}>
            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink
                href={site.phone.href}
                variant="ink"
                size="lg"
                icon={<PhoneIcon size={16} />}
              >
                Réserver par téléphone
              </ButtonLink>
              <ButtonLink
                href={mailtoBooking}
                variant="ghost-dark"
                size="lg"
                icon={<MailIcon size={16} />}
              >
                Écrire un e-mail
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal index={2} className="relative lg:col-span-4 lg:col-start-9 lg:pt-3">
          <PracticalInfo />
        </Reveal>
      </div>
    </section>
  );
}
