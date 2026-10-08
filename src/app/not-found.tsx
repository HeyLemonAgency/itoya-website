import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-end overflow-hidden bg-ink text-ivory">
      <div className="container-x relative z-10 pt-40 pb-20 lg:pb-28">
        <p className="eyebrow text-brass">Page introuvable</p>
        <h1 className="display-xl mt-6 max-w-[14ch]">
          Cette page s’est <em className="text-sakura-pale">envolée.</em>
        </h1>
        <p className="lede mt-6 max-w-lg text-ivory/75">
          Le lien est peut-être incomplet. La carte, les formules et les réservations restent à
          portée de main.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="ivory">
            Retour à l’accueil
          </ButtonLink>
          <ButtonLink href="/la-carte" variant="ghost-light" arrow>
            La carte
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
