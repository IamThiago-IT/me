export const metadata = {
    title: "Currículo / Résumé",
    description: "Baixe o currículo em português ou inglês (PDF). Coloque os arquivos em /public).",
}

import { getCvFiles } from '../../domain/cv';

export default function Page() {
    const files = getCvFiles();

    return (
        <main className="min-h-screen flex flex-col gap-3 sm:gap-4 items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
            <h1 className="m-0 text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Currículo / Résumé</h1>
            <p className="mt-1 text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">Escolha o idioma • Choose the language</p>

            <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4">
                {files.map((f) => (
                    <a
                        key={f.href}
                        href={f.href}
                        download={f.downloadName}
                        aria-label={f.ariaLabel}
                        className={f.className}
                    >
                        {f.label}
                    </a>
                ))}
            </div>

            <p className="mt-5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">
                Coloque os arquivos PDF em /public como <code>cv-ptbr.pdf</code> e <code>cv-en.pdf</code>.
            </p>
        </main>
    );
}