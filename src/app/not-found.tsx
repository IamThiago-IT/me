"use client";

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n';

export default function NotFound() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white px-6 py-12">
      <main className="max-w-3xl w-full text-center">
        <div className="inline-flex items-center gap-4 mb-6">
          <h1 className="text-4xl font-extrabold text-slate-900">{t.notFound.title}</h1>
          <span className="text-lg text-slate-600">{t.notFound.subtitle}</span>
        </div>

        <div className="bg-white shadow-lg rounded-2xl p-8 sm:p-10">
          <svg className="mx-auto mb-6 h-28 w-28 text-sky-500" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M8 14s1.5-2 4-2 4 2 4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 10h.01M15 10h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <h2 className="text-2xl font-semibold text-slate-900 mb-3">{t.notFound.question}</h2>

          <p className="text-slate-600 mb-4">
            {t.notFound.devMessage}
          </p>

          <p className="text-slate-700 font-medium mb-4">
            {t.notFound.jobMessage} <span className="text-sky-600">387</span> {t.notFound.attempts}
          </p>

          <p className="text-slate-500 mb-6">{t.notFound.encouragement}</p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/" className="inline-block px-4 py-2 rounded-md bg-sky-600 text-white font-semibold hover:bg-sky-700">
              {t.notFound.backHome}
            </Link>
            <Link href="/contato" className="inline-block px-4 py-2 rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50">
              {t.notFound.getInTouch}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}