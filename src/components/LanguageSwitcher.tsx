"use client";

import { useI18n, type Locale } from "@/lib/i18n";
import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  const nextLocale: Locale = locale === "pt-BR" ? "en" : "pt-BR";
  const label = locale === "pt-BR" ? "EN" : "PT";

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(nextLocale)}
      className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={locale === "pt-BR" ? "Switch to English" : "Mudar para Português"}
    >
      <Languages className="h-4 w-4" />
      <span>{label}</span>
    </Button>
  );
}
