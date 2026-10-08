import { formulas } from "@/content/formulas";
import { media } from "@/content/media";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { FormulaPanel } from "./FormulaPanel";

export const tabletSteps = [
  {
    title: "Choisissez à table",
    text: "La tablette présente les plats au choix. Vous composez votre tour en quelques gestes.",
  },
  {
    title: "Savourez",
    text: "Les plats sont préparés et servis à votre table.",
  },
  {
    title: "Le tour suivant",
    text: "Trois tours au total, espacés de quinze minutes.",
  },
];

export function Formulas() {
  return (
    <section
      id="formules"
      aria-labelledby="formulas-title"
      className="grain relative overflow-hidden bg-ink py-24 text-ivory sm:py-28 lg:py-40"
    >
      <div className="container-x relative z-10">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="eyebrow flex items-center gap-4 text-brass">
                <span aria-hidden className="h-px w-10 bg-brass/60" />
                Nos formules
              </p>
            </Reveal>
            <Reveal index={1}>
              <h2 id="formulas-title" className="display-xl mt-7 max-w-[12ch]">
                Le menu dégustation, <em className="text-sakura-pale">en trois tours.</em>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <Reveal index={2}>
              <p className="lede text-ivory/80">
                Midi et soir, Itoya propose un menu dégustation commandé sur tablette, directement à
                votre table : trois tours de plats japonais, à quinze minutes d’intervalle.
              </p>
            </Reveal>
            <ol className="mt-10 grid gap-6 border-t border-ivory/12 pt-8 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {tabletSteps.map((step, i) => (
                <Reveal as="li" key={step.title} index={i} delay={0.1}>
                  <p className="font-serif text-[1.125rem] text-sakura tabular" aria-hidden>
                    0{i + 1}
                  </p>
                  <h3 className="mt-1 font-serif text-[1.375rem] leading-tight">{step.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ivory/70">{step.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:mt-24 lg:grid-cols-2 lg:gap-8">
          {formulas.map((formula, i) => (
            <Reveal key={formula.id} index={i} distance={24} className="flex">
              <FormulaPanel
                formula={formula}
                photo={formula.id === "midi" ? media.formulas.midi : media.formulas.soir}
                className="w-full"
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[0.9375rem] text-ivory/65">
            Les plats au choix, les suppléments et les conditions sont détaillés sur la page des
            formules.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/formules" variant="ghost-light" arrow>
              Détails des formules
            </ButtonLink>
            <ButtonLink href="/reservation" variant="ivory">
              Réserver une table
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
