import { getImageProps } from "next/image";
import { menuImages } from "@/content/menu-images";
import { cx } from "@/lib/format";
import { BeltTrack } from "./BeltTrack";

/**
 * Dishes that are on the published lunch or evening formula lists
 * (src/content/formulas.ts), illustrated with the restaurant's own menu
 * photo of the same dish. Labels use the formula wording.
 */
const rows: Array<Array<{ id: string; label: string }>> = [
  [
    { id: "n61", label: "Maki saumon" },
    { id: "n51", label: "Nigiri saumon" },
    { id: "n35", label: "Spicy tuna gunkan" },
    { id: "n64", label: "Maki concombre" },
    { id: "n53", label: "Nigiri ebi" },
    { id: "n38", label: "Gunkan tobiko" },
    { id: "n66", label: "Maki saumon avocat" },
    { id: "n58", label: "Nigiri omelette" },
    { id: "n31", label: "Gunkan thon cuit" },
    { id: "n62", label: "Maki thon" },
    { id: "n56", label: "Nigiri avocat" },
    { id: "n33", label: "Gunkan surimi" },
    { id: "n55", label: "Nigiri hokki" },
    { id: "n63", label: "Maki shinko" },
  ],
  [
    { id: "n25", label: "Chawanmushi" },
    { id: "n19", label: "Soupe miso" },
    { id: "n129", label: "Nouilles sautées au poulet" },
    { id: "n2", label: "Salade d’avocat" },
    { id: "n11", label: "Edamame" },
    { id: "n22", label: "Rouleaux de printemps" },
    { id: "n122", label: "Udon au bœuf" },
    { id: "n7", label: "Salade de saumon" },
    { id: "n9", label: "Kimchi" },
    { id: "n23", label: "Pinces de crabe" },
    { id: "n131", label: "Nouilles sautées au bœuf" },
    { id: "n1", label: "Salade d’algues" },
    { id: "n3", label: "Salade de tofu" },
    { id: "n6", label: "Salade de bœuf" },
  ],
];

function Row({ items, index }: { items: (typeof rows)[number]; index: number }) {
  return (
    <ul className="flex shrink-0 items-end gap-8 pr-8 sm:gap-12 sm:pr-12 lg:gap-16 lg:pr-16">
      {items.map((dish) => {
        const image = menuImages[dish.id];
        if (!image) return null;
        return (
          <li
            key={`${index}-${dish.id}`}
            className="flex w-32 shrink-0 flex-col items-center sm:w-40 lg:w-48"
          >
            <div className="flex h-24 w-full items-end justify-center sm:h-28 lg:h-36">
              {/* Plain <img> rendered on the server: 56 of them, nothing to hydrate. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                {...getImageProps({
                  src: image.src,
                  alt: "",
                  width: image.width,
                  height: image.height,
                  sizes: "(min-width: 1024px) 192px, 160px",
                  quality: 80,
                }).props}
                alt=""
                className="max-h-full w-auto max-w-full object-contain [filter:drop-shadow(0_16px_14px_rgba(0,0,0,0.5))]"
              />
            </div>
            <span className="mt-3 text-center text-[0.75rem] leading-tight text-ivory/60">
              {dish.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * « Les plats arrivent par tours » — two rails of real dishes gliding past in
 * opposite directions as the page scrolls (scroll-linked transforms only; the
 * page scrolls normally). Static for reduced motion. Rendered on the server;
 * only the moving rail (BeltTrack) runs on the client.
 */
export function DishBelt({ className }: { className?: string }) {
  return (
    <div
      role="group"
      aria-label="Quelques plats au choix des menus dégustation"
      className={cx(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_9%,#000_91%,transparent)]",
        className,
      )}
    >
      {rows.map((items, i) => (
        <div key={i} className={cx("relative", i === 1 && "mt-10 sm:mt-14")}>
          {/* the rail */}
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-9 h-px bg-gradient-to-r from-transparent via-brass/35 to-transparent"
          />
          <BeltTrack reverse={i === 1}>
            {/* Two copies so the rail is always full, whatever the width. */}
            <Row items={items} index={0} />
            <div aria-hidden className="flex">
              <Row items={items} index={1} />
            </div>
          </BeltTrack>
        </div>
      ))}
    </div>
  );
}
