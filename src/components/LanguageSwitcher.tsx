"use client";

import { useState } from "react";
import { useI18n, LOCALES, type Locale } from "@/lib/i18n";
import { Check, ChevronsUpDown, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

const searchPlaceholders: Record<Locale, string> = {
  "pt-BR": "Pesquisar idioma...",
  en: "Search language...",
  es: "Buscar idioma...",
  ja: "言語を検索...",
  fr: "Rechercher une langue...",
  ru: "Поиск языка...",
};

const emptyMessages: Record<Locale, string> = {
  "pt-BR": "Nenhum idioma encontrado.",
  en: "No language found.",
  es: "No se encontró ningún idioma.",
  ja: "言語が見つかりませんでした。",
  fr: "Aucune langue trouvée.",
  ru: "Язык не найден.",
};

const searchAliases: Record<Locale, string> = {
  "pt-BR": "português pt br brasil brazil portuguese",
  en: "english en inglês ingles",
  es: "español spanish es espanhol espanol",
  ja: "japonês japones japanese nihongo japon ja 日本語",
  fr: "français french fr francês frances",
  ru: "russo russian ru русский россия russia",
};

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0]!;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Selecionar idioma"
          className="flex items-center justify-between gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors min-w-[110px] sm:min-w-[150px]"
        >
          <span className="flex items-center gap-1.5 truncate">
            <Languages className="h-4 w-4 shrink-0" />
            <span className="text-base leading-none" aria-hidden>
              {current.flag}
            </span>
            <span className="truncate">{current.nativeName}</span>
          </span>
          <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0" align="end" sideOffset={8}>
        <Command>
          <CommandInput placeholder={searchPlaceholders[locale]} />
          <CommandList>
            <CommandEmpty>{emptyMessages[locale]}</CommandEmpty>
            <CommandGroup>
              {LOCALES.map((lang) => (
                <CommandItem
                  key={lang.code}
                  value={`${lang.code} ${lang.label} ${lang.nativeName} ${searchAliases[lang.code]}`}
                  onSelect={() => {
                    setLocale(lang.code);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2"
                >
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="flex flex-col items-start leading-none">
                    <span className="text-sm font-medium">{lang.nativeName}</span>
                    <span className="text-xs text-muted-foreground">{lang.label}</span>
                  </span>
                  <span className="ml-auto text-xs text-muted-foreground hidden sm:inline">
                    {lang.code}
                  </span>
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4 shrink-0",
                      locale === lang.code ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
