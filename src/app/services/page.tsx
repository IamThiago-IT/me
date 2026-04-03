"use client";
import { MetadataSetter } from "@/components/MetadataSetter";
import React from "react";
import { useI18n } from "@/lib/i18n";

export default function Services() {
  const { t } = useI18n();

  return (
    <main className="p-3 sm:p-4 md:p-6">
      <MetadataSetter title={t.services.title} />
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">{t.services.title}</h1>
      <ul className="space-y-3 sm:space-y-4">
        {t.services.items.map((service, index) => (
          <li key={index} className="p-3 sm:p-4 border rounded shadow hover:shadow-md transition-shadow">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{service.name}</h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2">{service.description}</p>
            <p className="text-sm sm:text-base text-green-600 dark:text-green-400 font-bold">{t.services.price}: {service.price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
