"use client"

import { useState, useCallback, useEffect } from 'react';
import { useI18n } from '@/lib/i18n';
import { fetchCoverLetter } from '@/lib/db/actions';
import { Skeleton } from '@/components/ui/skeleton';

export default function CoverLetterPage() {
    const [copied, setCopied] = useState(false);
    const { t, locale } = useI18n();
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCoverLetter().then((data) => {
            if (data) {
                setContent(locale === 'pt-BR' ? data.contentPt : data.contentEn);
            }
            setLoading(false);
        });
    }, [locale]);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error(t.coverLetter.copyError, error);
        }
    }, [content, t]);

    return (
        <main className="p-3 sm:p-6 md:p-8 max-w-3xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">{t.coverLetter.title}</h1>
            <article className="bg-gray-100 dark:bg-gray-800 p-3 sm:p-4 rounded text-xs sm:text-sm overflow-auto max-h-96">
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-5/6" />
                        <Skeleton className="h-3 w-4/5" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-3/4" />
                        <Skeleton className="h-3 w-2/3" />
                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-5/6" />
                        <Skeleton className="h-3 w-4/5" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                ) : (
                    <pre className="m-0 whitespace-pre-wrap">{content}</pre>
                )}
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

