/** Swiss-French price style: 29.– / 2.50 */
export function formatPrice(amount: number): string {
  if (Number.isInteger(amount)) return `${amount}.–`;
  return amount.toFixed(2);
}

/** "CHF 29.–" */
export function formatCHF(amount: number): string {
  return `CHF ${formatPrice(amount)}`;
}

/** Supplements read "+ 2.50" */
export function formatSupplement(amount: number): string {
  return `+ ${formatPrice(amount)}`;
}

/** 11:30 → 11 h 30 for screen readers would be overkill; keep the clock form. */
export function formatService(open: string, close: string): string {
  return `${open} – ${close}`;
}

export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Lowercase, accent-free text for client-side menu search. */
export function normalizeSearch(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, " ").toLowerCase().trim();
}
