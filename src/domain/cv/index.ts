export type CvFile = {
    href: string;
    downloadName: string;
    label: string;
    className?: string;
    ariaLabel?: string;
};

export function getCvFiles(): CvFile[] {
    return [
        {
            href: '/cv-ptbr.pdf',
            downloadName: 'Curriculo-PTBR.pdf',
            label: 'Baixar CV (PT-BR)',
            className: 'inline-block py-2.5 px-4 bg-[#0b5cff] text-white no-underline rounded-md font-semibold',
            ariaLabel: 'Baixar currículo em português',
        },
        {
            href: '/cv-en.pdf',
            downloadName: 'Resume-EN.pdf',
            label: 'Download CV (EN)',
            className: 'inline-block py-2.5 px-4 bg-[#111827] text-white no-underline rounded-md font-semibold',
            ariaLabel: 'Download résumé in English',
        },
    ];
}
