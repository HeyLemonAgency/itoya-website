import type { Metadata } from "next";
import { menu } from "@/content/menu";
import { menuItemCount } from "@/content/menu-utils";
import { PageHero } from "@/components/ui/PageHero";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { MenuBrowser } from "@/components/menu/MenuBrowser";
import { DishPlate } from "@/components/motion/DishPlate";
import { media } from "@/content/media";

export const metadata: Metadata = {
  title: "La carte",
  description:
    "La carte d’Itoya à Crissier : gunkan, sashimis, nigiris, maki, California rolls, plateaux, teppan, udon, bento et desserts, avec les prix.",
  alternates: { canonical: "/la-carte" },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="La carte"
        title="La carte,"
        accent="du nigiri au teppan."
        aside={
          <DishPlate
            photo={media.dishes.plateau9}
            sizes="46vw"
            turnWithScroll
            shadow="none"
            imageClassName="[filter:drop-shadow(0_40px_50px_rgba(0,0,0,0.55))]"
          />
        }
        lede={
          <p>
            Sushis et sashimis, plateaux à partager, spécialités, teppan, udon, bento et desserts :
            les {menuItemCount} plats de la carte, avec leurs prix en francs suisses.
          </p>
        }
      >
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href="/reservation" variant="ivory">
            Réserver une table
          </ButtonLink>
          <ArrowLink href="/formules" tone="light">
            Menus dégustation midi et soir
          </ArrowLink>
        </div>
      </PageHero>

      <div className="bg-ivory">
        <MenuBrowser menu={menu} />
        <div className="container-x pb-24 lg:pb-32">
          <p className="max-w-2xl border-t border-line pt-8 text-[0.875rem] text-muted">
            Prix en CHF. Les mentions « Végétarien » et « Végétalien » sont celles indiquées par le
            restaurant. Pour toute question sur la composition d’un plat ou les allergènes,
            renseignez-vous auprès de l’équipe.
          </p>
        </div>
      </div>
    </>
  );
}
