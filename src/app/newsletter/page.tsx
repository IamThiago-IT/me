"use client";

import React from "react";
import { subscribeNewsletter } from "../Actions/newsletterActions";
import { MetadataSetter } from "@/components/MetadataSetter";
import { useI18n } from "@/lib/i18n";

export default function Newsletter() {
  const { t } = useI18n();

  return (
    <main className="p-6 flex items-center justify-center min-h-screen">
      <MetadataSetter title={t.newsletter.title} />
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4">{t.newsletter.title}</h1>
        <p className="mb-6 text-gray-600">
          {t.newsletter.description}
        </p>
        <form action={subscribeNewsletter} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder={t.newsletter.emailPlaceholder}
            className="w-full border p-2"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            {t.newsletter.subscribe}
          </button>
        </form>
      </div>
    </main>
  );
}
