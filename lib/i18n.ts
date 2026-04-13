// Locale configuration and currency formatting utilities for claudje i18n.
// Keeps amounts identical across currencies (EUR 49 -> USD 49) — only the symbol changes.

export type LocaleCode = "en-US" | "en-GB" | "nl" | "it" | "es";

export interface LocaleConfig {
  code: LocaleCode;
  flag: string;
  label: string;
  currency: "EUR" | "USD" | "GBP";
  symbol: string;
}

export const LOCALES: LocaleConfig[] = [
  { code: "en-US", flag: "\u{1F1FA}\u{1F1F8}", label: "English (US)", currency: "USD", symbol: "$" },
  { code: "en-GB", flag: "\u{1F1EC}\u{1F1E7}", label: "English (UK)", currency: "GBP", symbol: "\u00A3" },
  { code: "nl",    flag: "\u{1F1F3}\u{1F1F1}", label: "Nederlands",   currency: "EUR", symbol: "\u20AC" },
  { code: "it",    flag: "\u{1F1EE}\u{1F1F9}", label: "Italiano",     currency: "EUR", symbol: "\u20AC" },
  { code: "es",    flag: "\u{1F1EA}\u{1F1F8}", label: "Espa\u00F1ol",      currency: "EUR", symbol: "\u20AC" },
];

/** Detect the best matching locale from the browser language setting. */
export function detectLocale(): LocaleCode {
  if (typeof navigator === "undefined") return "nl";
  const lang = navigator.language || "nl";
  const match = LOCALES.find(
    (l) => l.code === lang || lang.startsWith(l.code.split("-")[0])
  );
  return match ? match.code : "nl";
}

/** Look up the full config for a locale code. Falls back to NL. */
export function getLocaleConfig(code: LocaleCode): LocaleConfig {
  return LOCALES.find((l) => l.code === code) || LOCALES[2]; // NL fallback
}

/**
 * Format a price amount using the currency for the given locale.
 * Amounts stay the same across currencies (49 EUR -> 49 USD).
 *
 * @param amount  - numeric price (e.g. 49)
 * @param locale  - current locale code
 * @returns formatted string like "$49" or "\u20AC99"
 */
export function formatPrice(amount: number, locale: LocaleCode): string {
  const config = getLocaleConfig(locale);
  return `${config.symbol}${amount}`;
}

/** localStorage key used to persist the user's locale choice. */
export const LOCALE_STORAGE_KEY = "claudje-locale";
