export const metadata = {
    title: "Currículo / Résumé",
    description: "Baixe o currículo em português ou inglês (PDF). Coloque os arquivos em /public).",
}

export default function Page() {
    return (
        <main
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                alignItems: "center",
                justifyContent: "center",
                padding: 24,
                fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
            }}
        >
            <h1 style={{ margin: 0 }}>Currículo / Résumé</h1>
            <p style={{ marginTop: 4, color: "#555" }}>Escolha o idioma • Choose the language</p>

            <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <a
                    href="/cv-ptbr.pdf"
                    download="Curriculo-PTBR.pdf"
                    aria-label="Baixar currículo em português"
                    style={{
                        display: "inline-block",
                        padding: "10px 16px",
                        background: "#0b5cff",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: 6,
                        fontWeight: 600,
                    }}
                >
                    Baixar CV (PT-BR)
                </a>

                <a
                    href="/cv-en.pdf"
                    download="Resume-EN.pdf"
                    aria-label="Download résumé in English"
                    style={{
                        display: "inline-block",
                        padding: "10px 16px",
                        background: "#111827",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: 6,
                        fontWeight: 600,
                    }}
                >
                    Download CV (EN)
                </a>
            </div>

            <p style={{ marginTop: 20, fontSize: 13, color: "#666", textAlign: "center" }}>
                Coloque os arquivos PDF em /public como <code>cv-ptbr.pdf</code> e <code>cv-en.pdf</code>.
            </p>
        </main>
    );
}