// Locale -> Messages map. Each per-locale file conforms to the Messages type
// derived from en-US (the source of truth). Adding a new key to en-US.ts
// causes a compile error in every other locale until it's filled in.

import type { LocaleCode } from "@/lib/i18n";
import { messages as enUS, type Messages } from "./en-US";
import { messages as enGB } from "./en-GB";
import { messages as nl } from "./nl";
import { messages as it } from "./it";
import { messages as es } from "./es";

export type { Messages };

export const messagesByLocale: Record<LocaleCode, Messages> = {
  "en-US": enUS,
  "en-GB": enGB,
  nl,
  it,
  es,
};
