import type { Metadata } from "next";
import { formulas } from "@/content/formulas";
import { site } from "@/content/site";
import { formatPrice } from "@/lib/format";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/Button";
import { PhoneIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/motion/Reveal";
import { FormulaPanel } from "@/components/home/FormulaPanel";
import { DishPlate } from "@/components/motion/DishPlate";
import { media } from "@/content/media";
import { formulaDishes, tabletSteps } from "@/components/home/Formulas";

export const metadata: Metadata = {
  title: "Nos formules",
  description:
    "Menus dégustation chez Itoya : le midi, CHF 29 en semaine et CHF 35 le week-end, trois tours de quatre plats ; le soir, CHF 49, trois tours de cinq plats. Commande sur tablette.",
  alternates: { canonical: "/formules" },
};

export default function FormulasPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos formules"
        title="Midi et soir,"
        accent="le menu dégustation."
        aside={
          <div className="mx-auto flex w-[86%] items-end justify-between gap-6">
            {[
              media.dishes.nigiriSaumon,
              media.dishes.temakiCalifornia,
              media.dishes.spicyTunaGunkan,
            ].map((photo, i) => (
              <DishPlate
                key={photo.src}
                photo={photo}
                sizes="14vw"
                shadow="none"
                delay={i * 0.12}
                className="w-1/3"
                imageClassName="[filter:drop-shadow(0_26px_26px_rgba(0,0,0,0.6))]"
              />
            ))}
          </div>
        }
        lede={
          <p>
            Trois tours de plats japonais, commandés sur tablette directement à votre table, à
            quinze minutes d’intervalle. Quatre plats par tour le midi, cinq le soir.
          </p>
        }
      >
        <ButtonLink href="/reservation" variant="ivory">
          Réserver une table
        </ButtonLink>
      </PageHero>

      {/* ── How it works ───────────────────────────────────────────── */}
      <section aria-labelledby="how-title" className="on-light bg-ivory py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="how-title" className="display-lg text-ink">
              Comment ça se passe&nbsp;?
            </h2>
          </Reveal>
          <ol className="grid gap-10 sm:grid-cols-3 lg:col-span-7 lg:col-start-6">
            {tabletSteps.map((step, i) => (
              <Reveal as="li" key={step.title} index={i} className="border-t border-ink pt-5">
                <p
                  aria-hidden
                  className="font-serif text-[2.5rem] leading-none text-sakura-deep tabular"
                >
                  0{i + 1}
                </p>
                <h3 className="mt-4 font-serif text-[1.5rem] leading-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-muted">{step.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ── The two formulas, in detail ────────────────────────────── */}
      {formulas.map((formula, index) => {
        const dishCount = formula.groups.reduce((n, g) => n + g.dishes.length, 0);
        return (
          <section
            key={formula.id}
            id={formula.id}
            aria-labelledby={`formula-${formula.id}`}
            className={index % 2 === 0 ? "bg-ink text-ivory" : "bg-forest text-ivory"}
          >
            <div className="container-x grid gap-12 py-20 lg:grid-cols-12 lg:gap-x-12 lg:py-28">
              <div className="lg:col-span-5">
                <div className="lg:sticky lg:top-28">
                  <FormulaPanel
                    formula={formula}
                    dishes={formulaDishes[formula.id]}
                    headingLevel={2}
                    className={index % 2 === 0 ? "" : "bg-ink"}
                  />
                </div>
              </div>

              <div className="lg:col-span-7">
                <Reveal>
                  <h3 className="display-md">{formula.highlight ?? "Les plats au choix"}</h3>
                  <p className="mt-3 max-w-xl text-ivory/70">
                    {formula.partialList
                      ? `Une sélection de ${dishCount} plats proposés pour la formule du soir.`
                      : `Les ${dishCount} plats publiés pour la formule du midi.`}
                  </p>
                </Reveal>

                <div className="mt-10 grid gap-10 sm:grid-cols-2">
                  {formula.groups.map((group, i) => (
                    <Reveal key={group.title} index={i % 2}>
                      <h4 className="eyebrow border-b border-ivory/15 pb-3 text-[0.75rem] text-brass">
                        {group.title}
                      </h4>
                      <ul className="mt-4 space-y-1.5 text-[0.9375rem] text-ivory/85">
                        {group.dishes.map((dish) => (
                          <li key={dish} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[0.75em] h-px w-2.5 shrink-0 bg-sakura/70"
                            />
                            {dish}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  ))}
                </div>

                <Reveal className="mt-14">
                  <h3 className="display-md">Hors menu, avec supplément</h3>
                  <p className="mt-3 max-w-xl text-ivory/70">
                    Ces plats peuvent s’ajouter à la formule, avec le supplément indiqué.
                  </p>
                  <table className="mt-6 w-full text-[0.9375rem]">
                    <caption className="sr-only">
                      Suppléments de la formule « {formula.title} », en CHF
                    </caption>
                    <thead className="sr-only">
                      <tr>
                        <th scope="col">Plat</th>
                        <th scope="col">Supplément (CHF)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ivory/10 border-y border-ivory/15">
                      {formula.supplements.map((s) => (
                        <tr key={s.name}>
                          <th scope="row" className="py-3 pr-6 text-left font-normal text-ivory/85">
                            {s.name}
                          </th>
                          <td className="py-3 text-right font-serif text-[1.25rem] whitespace-nowrap tabular">
                            + {formatPrice(s.amount)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Close ──────────────────────────────────────────────────── */}
      <section className="on-light bg-ivory py-20 lg:py-28">
        <div className="container-x flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="display-lg max-w-[16ch] text-ink">
              Une table pour le midi ou pour le soir&nbsp;?
            </h2>
            <p className="mt-4 max-w-lg text-muted">
              Une question sur les formules ou les tarifs des jours fériés&nbsp;? Appelez-nous au{" "}
              <a href={site.phone.href} className="link-underline text-ink tabular">
                {site.phone.display}
              </a>
              .
            </p>
          </Reveal>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/reservation" variant="ink" size="lg">
              Réserver une table
            </ButtonLink>
            <ButtonLink
              href={site.phone.href}
              variant="ghost-dark"
              size="lg"
              icon={<PhoneIcon size={16} />}
            >
              Appeler
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
