import Link from "next/link";
import { fullAddress, mailtoContact, navigation, site } from "@/content/site";
import { formatService } from "@/lib/format";
import { socialIcons } from "@/components/ui/Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-ink text-ivory">
      <div className="container-x relative z-10 pt-20 pb-10 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-brass">Itoya · Crissier</p>
            <p className="mt-5 max-w-sm font-serif text-[2rem] leading-[1.1] text-ivory/90">
              Le Japon, sous les fleurs — midi et soir, tous les jours.
            </p>
            <Link
              href="/reservation"
              className="group mt-8 inline-flex min-h-12 items-center gap-3 rounded-[2px] bg-ivory px-6 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-paper"
            >
              Réserver une table
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="eyebrow font-sans text-ivory/50">Horaires</h2>
              <p className="mt-4 text-ivory/85">{site.hours.summary}</p>
              <ul className="mt-1 space-y-0.5 text-ivory/85 tabular">
                {site.hours.services.map((s) => (
                  <li key={s.label}>
                    <span className="sr-only">{s.label} : </span>
                    {formatService(s.open, s.close)}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="eyebrow font-sans text-ivory/50">Nous trouver</h2>
              <address className="mt-4 not-italic text-ivory/85">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.locality}
              </address>
              <a
                href={site.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline mt-3 inline-block text-[0.875rem] text-ivory/85 hover:text-ivory"
              >
                Itinéraire<span className="sr-only"> vers {fullAddress} (nouvel onglet)</span>
              </a>
            </div>
            <div>
              <h2 className="eyebrow font-sans text-ivory/50">Contact</h2>
              <ul className="mt-4 space-y-1 text-ivory/85">
                <li>
                  <a href={site.phone.href} className="link-quiet tabular hover:text-ivory">
                    {site.phone.display}
                  </a>
                </li>
                <li>
                  <a href={site.mobile.href} className="link-quiet tabular hover:text-ivory">
                    {site.mobile.display}
                  </a>
                </li>
                <li>
                  <a href={mailtoContact} className="link-quiet hover:text-ivory">
                    {site.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p
          aria-hidden
          className="pointer-events-none mt-20 select-none text-center font-serif text-[clamp(4.5rem,21vw,19rem)] leading-[0.8] tracking-[0.12em] text-ivory/[0.07] lg:mt-24"
        >
          ITOYA
        </p>

        <div className="mt-8 flex flex-col gap-6 border-t border-ivory/10 pt-8 text-[0.8125rem] text-ivory/55 lg:flex-row lg:items-center lg:justify-between">
          <nav aria-label="Pied de page">
            <ul className="flex flex-wrap gap-x-7 gap-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-quiet hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/reservation" className="link-quiet hover:text-ivory">
                  Réservation
                </Link>
              </li>
            </ul>
          </nav>
          <div className="flex items-center justify-between gap-6 lg:justify-end">
            <ul className="flex gap-2" aria-label="Réseaux sociaux">
              {site.social.map((s) => {
                const Icon = socialIcons[s.label as keyof typeof socialIcons];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full text-ivory/70 ring-1 ring-inset ring-ivory/15 transition-colors hover:text-ivory hover:ring-ivory/50"
                    >
                      <Icon size={18} />
                      <span className="sr-only">{s.label} (nouvel onglet)</span>
                    </a>
                  </li>
                );
              })}
            </ul>
            <p>
              © {year} {site.businessName}
              {site.agencyCredit ? (
                <>
                  {" · "}
                  <a href={site.agencyCredit.href} className="link-quiet">
                    {site.agencyCredit.label}
                  </a>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
