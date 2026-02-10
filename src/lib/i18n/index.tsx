"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import ptBR from "./locales/pt-BR";
import en from "./locales/en";

export type Locale = "pt-BR" | "en";

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends readonly (infer U)[]
    ? U extends object
      ? DeepStringify<U>[]
      : string[]
    : T[K] extends object
      ? DeepStringify<T[K]>
      : string;
};

export type Translations = DeepStringify<typeof ptBR>;

const translations: Record<Locale, Translations> = {
  "pt-BR": ptBR as unknown as Translations,
  en: en as unknown as Translations,
};

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = "app-locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt-BR");

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (saved && (saved === "pt-BR" || saved === "en")) {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale === "pt-BR" ? "pt-BR" : "en";
  }, []);

  const toggleLocale = useCallback(() => {
    const newLocale = locale === "pt-BR" ? "en" : "pt-BR";
    setLocale(newLocale);
  }, [locale, setLocale]);

  const t = translations[locale];

  return (
    <I18nContext.Provider value={{ locale, t, setLocale, toggleLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

export { translations };
