"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type LocaleCode,
  type LocaleConfig,
  LOCALES,
  detectLocale,
  getLocaleConfig,
  formatPrice as formatPriceUtil,
  LOCALE_STORAGE_KEY,
} from "@/lib/i18n";
import { messagesByLocale, type Messages } from "@/lib/translations";

interface I18nContextValue {
  locale: LocaleCode;
  localeConfig: LocaleConfig;
  locales: LocaleConfig[];
  setLocale: (code: LocaleCode) => void;
  formatPrice: (amount: number) => string;
  messages: Messages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>("nl");

  // On mount: read persisted locale or auto-detect from browser
  useEffect(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as LocaleCode | null;
    if (stored && LOCALES.some((l) => l.code === stored)) {
      setLocaleState(stored);
    } else {
      const detected = detectLocale();
      setLocaleState(detected);
      localStorage.setItem(LOCALE_STORAGE_KEY, detected);
    }
  }, []);

  const setLocale = useCallback((code: LocaleCode) => {
    setLocaleState(code);
    localStorage.setItem(LOCALE_STORAGE_KEY, code);
  }, []);

  const localeConfig = getLocaleConfig(locale);
  const messages = messagesByLocale[locale];

  const formatPrice = useCallback(
    (amount: number) => formatPriceUtil(amount, locale),
    [locale]
  );

  return (
    <I18nContext.Provider
      value={{ locale, localeConfig, locales: LOCALES, setLocale, formatPrice, messages }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return ctx;
}
