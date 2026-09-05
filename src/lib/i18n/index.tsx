"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import ptBR from "./locales/pt-BR";
import en from "./locales/en";
import es from "./locales/es";
import ja from "./locales/ja";
import fr from "./locales/fr";
import ru from "./locales/ru";
import it from "./locales/it";
import ko from "./locales/ko";

export const LOCALES = [
  { code: "pt-BR" as const, label: "Português (BR)", nativeName: "Português", flag: "🇧🇷" },
  { code: "en" as const, label: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "es" as const, label: "Español", nativeName: "Español", flag: "🇪🇸" },
  { code: "ja" as const, label: "日本語", nativeName: "日本語", flag: "🇯🇵" },
  { code: "fr" as const, label: "Français", nativeName: "Français", flag: "🇫🇷" },
  { code: "ru" as const, label: "Русский", nativeName: "Русский", flag: "🇷🇺" },
  { code: "it" as const, label: "Italiano", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "ko" as const, label: "한국어", nativeName: "한국어", flag: "🇰🇷" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

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
  es: es as unknown as Translations,
  ja: ja as unknown as Translations,
  fr: fr as unknown as Translations,
  ru: ru as unknown as Translations,
  it: it as unknown as Translations,
  ko: ko as unknown as Translations,
};

interface I18nContextType {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const LOCALE_STORAGE_KEY = "app-locale";

function isValidLocale(value: string | null): value is Locale {
  return !!value && (LOCALES as readonly { code: string }[]).some((l) => l.code === value);
}

function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return "pt-BR";
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith("pt")) return "pt-BR";
  if (lang.startsWith("en")) return "en";
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("ja")) return "ja";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("ru")) return "ru";
  if (lang.startsWith("it")) return "it";
  if (lang.startsWith("ko")) return "ko";
  return "pt-BR";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("pt-BR");

  useEffect(() => {
    const saved = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isValidLocale(saved)) {
      setLocaleState(saved);
      document.documentElement.lang = saved;
    } else {
      const detected = detectBrowserLocale();
      // only auto-apply if no saved preference, keep pt-BR as default SSR
      // optionally set detected locale without persisting until user chooses
      // uncomment next line to auto-switch on first visit:
      // setLocaleState(detected);
      document.documentElement.lang = detected;
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const toggleLocale = useCallback(() => {
    const idx = LOCALES.findIndex((l) => l.code === locale);
    const next = LOCALES[(idx + 1) % LOCALES.length]!.code;
    setLocale(next);
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
