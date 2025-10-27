export const metadata = {
    title: "Currículo / Résumé",
    description: "Baixe o currículo em português ou inglês (PDF). Coloque os arquivos em /public).",
}

export default function Page() {
    return (
        <main className="min-h-screen flex flex-col gap-4 items-center justify-center p-6 font-sans">
            <h1 className="m-0">Currículo / Résumé</h1>
            <p className="mt-1 text-gray-600">Escolha o idioma • Choose the language</p>

            <div className="flex gap-3 mt-3">
                <a
                    href="/cv-ptbr.pdf"
                    download="Curriculo-PTBR.pdf"
                    aria-label="Baixar currículo em português"
                    className="inline-block py-2.5 px-4 bg-[#0b5cff] text-white no-underline rounded-md font-semibold"
                >
                    Baixar CV (PT-BR)
                </a>

                <a
                    href="/cv-en.pdf"
                    download="Resume-EN.pdf"
                    aria-label="Download résumé in English"
                    className="inline-block py-2.5 px-4 bg-[#111827] text-white no-underline rounded-md font-semibold"
                >
                    Download CV (EN)
                </a>
            </div>

            <p className="mt-5 text-sm text-gray-500 text-center">
                Coloque os arquivos PDF em /public como <code>cv-ptbr.pdf</code> e <code>cv-en.pdf</code>.
            </p>
        </main>
    );
}