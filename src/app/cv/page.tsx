export const metadata = {
    title: "Currículo / Résumé",
    description: "Baixe o currículo em português ou inglês (PDF). Coloque os arquivos em /public).",
}

export default function Page() {
    const { getCvFiles } = require('../../domain/cv');
    const files = getCvFiles();

    return (
        <main className="min-h-screen flex flex-col gap-4 items-center justify-center p-6 font-sans">
            <h1 className="m-0">Currículo / Résumé</h1>
            <p className="mt-1 text-gray-600">Escolha o idioma • Choose the language</p>

            <div className="flex gap-3 mt-3">
                {files.map((f: any) => (
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

            <p className="mt-5 text-sm text-gray-500 text-center">
                Coloque os arquivos PDF em /public como <code>cv-ptbr.pdf</code> e <code>cv-en.pdf</code>.
            </p>
        </main>
    );
}