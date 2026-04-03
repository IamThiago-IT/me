"use client";
import { MetadataSetter } from "@/components/MetadataSetter";
import React from "react";
import { Copy } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { toast } from "sonner";

const sponsors = [
  { id: 1, name: "Empresa X", description: "Líder em soluções tecnológicas para empresas de todos os portes.", logo: "/public/globe.svg", tag: "Tecnologia", link: "https://empresax.com" },
  { id: 2, name: "Empresa Y", description: "Especialista em marketing digital e estratégias de crescimento.", logo: "/public/next.svg", tag: "Marketing", link: "https://empresay.com" },
  { id: 3, name: "Empresa Z", description: "Inovação em produtos sustentáveis para um futuro melhor.", logo: null, tag: "Sustentabilidade", link: "https://empresaz.com" },
];

const discountCodes = [
  { id: 1, code: "DESCONTO10", description: "10% off em compras acima de R$100" },
  { id: 2, code: "FRETEGRATIS", description: "Frete grátis no primeiro pedido" },
];

export default function Sponsors() {
  const { t } = useI18n();

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(t.sponsors.codeCopied + code);
  };

  return (
    <main className="p-3 sm:p-4 md:p-6">
      <MetadataSetter title={t.sponsors.title} />
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t.sponsors.title}</h1>
      <ul className="space-y-3 sm:space-y-4">
        {sponsors.map((sponsor) => (
          <li key={sponsor.id} className="p-3 sm:p-4 md:p-5 border rounded shadow flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 hover:shadow-md transition-shadow">
            <div className="flex-shrink-0">
              {sponsor.logo ? (
                <img src={sponsor.logo} alt={`${sponsor.name} logo`} className="w-10 h-10 sm:w-12 sm:h-12" />
              ) : (
                <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 font-bold rounded">
                  {sponsor.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-lg sm:text-xl font-semibold mb-1">{sponsor.name}</h2>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">{sponsor.description}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <span className="text-xs sm:text-sm font-medium inline-block px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 border border-blue-300 dark:border-blue-700">
                  #{sponsor.tag}
                </span>
                <a
                  href={sponsor.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  {t.sponsors.visit}
                </a>
            </div>
          </li>
        ))}
      </ul>
      <section className="mt-8 sm:mt-10 md:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t.sponsors.discountCodes}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {discountCodes.map((code) => (
            <li key={code.id} className="p-3 sm:p-4 border rounded shadow hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex-1">
                  <span className="block text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 mb-1">{code.code}</span>
                  <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{code.description}</span>
                </div>
                <button
                  onClick={() => copyCode(code.code)}
                  className="flex-shrink-0 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  title="Copiar código"
                >
                  <Copy className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};
