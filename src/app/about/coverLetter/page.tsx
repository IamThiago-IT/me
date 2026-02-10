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
        <main className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{t.coverLetter.title}</h1>
            <article className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
                <pre className="m-0">{t.coverLetter.content}</pre>
            </article>
            <div className="mt-4">
                <button onClick={handleCopy} className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                    {t.coverLetter.copyText}
                </button>
                {copied && <span className="ml-4">{t.coverLetter.copied}</span>}
            </div>
        </main>
    );
};

