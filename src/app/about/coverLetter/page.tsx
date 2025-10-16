"use client"

import { useState, useCallback } from 'react';

const coverLetterText = `Prezado(a) recrutador(a),

Estou escrevendo para expressar meu interesse na vaga anunciada e para apresentar meu currículo. Tenho experiência em desenvolvimento de software, com forte ênfase em qualidade de código e prazos de entrega.

Estou à disposição para discutir como minhas habilidades podem contribuir para o sucesso da empresa.

Atenciosamente,
[Seu Nome]
`;

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
        <main className="p-8 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Carta de Apresentação</h1>
            <article className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
                <pre className="m-0">{coverLetterText}</pre>
            </article>
            <div className="mt-4">
                <button onClick={handleCopy} className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
                    Copiar texto
                </button>
                {copied && <span className="ml-4">Texto copiado!</span>}
            </div>
        </main>
    );
};

export default CoverLetterPage;