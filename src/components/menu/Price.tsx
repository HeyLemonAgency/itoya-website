import type { MenuItem } from "@/content/types";
import { cx, formatPrice } from "@/lib/format";

/** Price display shared by the menu and the homepage selection. */
export function Price({ item, className }: { item: MenuItem; className?: string }) {
  if (item.prices?.length) {
    return (
      <span className={cx("tabular inline-flex flex-col items-end gap-0.5 text-right", className)}>
        {item.prices.map((p) => (
          <span key={p.label} className="whitespace-nowrap">
            <span className="mr-2 text-[0.8125rem] font-normal opacity-70">{p.label}</span>
            {formatPrice(p.amount)}
          </span>
        ))}
      </span>
    );
  }
  if (item.price == null) {
    return (
      <span className={cx("whitespace-nowrap text-[0.8125rem] font-normal opacity-70", className)}>
        Sur demande
      </span>
    );
  }
  return (
    <span className={cx("tabular whitespace-nowrap", className)}>
      <span className="sr-only">CHF </span>
      {formatPrice(item.price)}
    </span>
  );
}

/** "8 pièces · Végétarien" style metadata line. */
export function dishMeta(item: MenuItem): string[] {
  const meta: string[] = [];
  if (item.pieces) meta.push(`${item.pieces} pièce${item.pieces > 1 ? "s" : ""}`);
  if (item.portion) meta.push(item.portion);
  return meta;
}
