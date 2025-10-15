import { useState } from 'react';

export default function CoverLetterPage() {
    const coverLetterText = `Prezado(a) recrutador(a),

Estou escrevendo para expressar meu interesse na vaga anunciada e para apresentar meu currículo. Tenho experiência em desenvolvimento de software, com forte ênfase em qualidade de código e prazos de entrega.

Estou à disposição para discutir como minhas habilidades podem contribuir para o sucesso da empresa.

Atenciosamente,
[Seu Nome]
`;

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(coverLetterText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Erro ao copiar o texto:', error);
        }
    };

    return (
        <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Carta de Apresentação</h1>
            <pre
                style={{
                    backgroundColor: '#f5f5f5',
                    padding: '1rem',
                    borderRadius: '5px',
                    whiteSpace: 'pre-wrap'
                }}
            >
                {coverLetterText}
            </pre>
            <button
                onClick={handleCopy}
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}
            >
                Copiar texto
            </button>
            {copied && <span style={{ marginLeft: '1rem' }}>Texto copiado!</span>}
        </main>
    );
}