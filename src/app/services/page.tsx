"use client";
import { MetadataSetter } from "@/components/MetadataSetter";
import React from "react";
import { useI18n } from "@/lib/i18n";

export default function Services() {
  const { t } = useI18n();

  return (
    <main className="p-6">
      <MetadataSetter title={t.services.title} />
      <h1 className="text-3xl font-bold mb-4">{t.services.title}</h1>
      <ul className="space-y-4">
        {t.services.items.map((service, index) => (
          <li key={index} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{service.name}</h2>
            <p className="text-gray-700">{service.description}</p>
            <p className="text-green-600 font-bold mt-2">{t.services.price}: {service.price}</p>
          </li>
        ))}
      </ul>
    </main>
  );
};
