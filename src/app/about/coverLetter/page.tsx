import { useState, useCallback } from 'react';

const coverLetterText = `Prezado(a) recrutador(a),

Estou escrevendo para expressar meu interesse na vaga anunciada e para apresentar meu currículo. Tenho experiência em desenvolvimento de software, com forte ênfase em qualidade de código e prazos de entrega.

Estou à disposição para discutir como minhas habilidades podem contribuir para o sucesso da empresa.

Atenciosamente,
[Seu Nome]
`;

// Separate style objects for better readability and reusability
const containerStyle: React.CSSProperties = { padding: '2rem', maxWidth: '800px', margin: '0 auto' };
const preStyle: React.CSSProperties = { backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '5px', whiteSpace: 'pre-wrap' };
const buttonStyle: React.CSSProperties = { marginTop: '1rem', padding: '0.5rem 1rem', fontSize: '1rem', cursor: 'pointer' };

const CoverLetterPage: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(coverLetterText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Erro ao copiar o texto:', error);
        }
    }, []);

    return (
        <main style={containerStyle}>
            <h1>Carta de Apresentação</h1>
            <article style={preStyle}>
                <pre style={{ margin: 0 }}>{coverLetterText}</pre>
            </article>
            <div style={{ marginTop: '1rem' }}>
                <button onClick={handleCopy} style={buttonStyle}>
                    Copiar texto
                </button>
                {copied && <span style={{ marginLeft: '1rem' }}>Texto copiado!</span>}
            </div>
        </main>
    );
};

export default CoverLetterPage;