"use client"

import { useState, useCallback } from 'react';
import { useI18n } from '@/lib/i18n';

export default function CoverLetterPage() {
    const [copied, setCopied] = useState(false);
    const { t } = useI18n();

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(t.coverLetter.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error(t.coverLetter.copyError, error);
        }
    }, [t]);

    return (
        <main className="p-3 sm:p-6 md:p-8 max-w-3xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t.coverLetter.title}</h1>
            <article className="bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded text-xs sm:text-sm overflow-auto max-h-96">
                <pre className="m-0 whitespace-pre-wrap">{t.coverLetter.content}</pre>
            </article>
            <div className="mt-4 sm:mt-6">
                <button onClick={handleCopy} className="bg-blue-500 dark:bg-blue-600 text-white rounded px-3 sm:px-4 py-2 text-sm sm:text-base hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors">
                    {t.coverLetter.copyText}
                </button>
                {copied && <span className="ml-2 sm:ml-4 text-xs sm:text-sm text-green-600 dark:text-green-400">{t.coverLetter.copied}</span>}
            </div>
        </main>
    );
};

