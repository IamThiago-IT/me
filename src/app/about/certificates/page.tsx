"use client";

import Link from "next/link";
import { ArrowLeft, Award, FolderDown, FileText } from "lucide-react";
import { MetadataSetter } from "@/components/MetadataSetter";
import { useI18n } from "@/lib/i18n";

const certificateChecklist = [
  {
    title: "Arquivos",
    description: "Coloque PDFs ou imagens em public/certificates para manter tudo organizado.",
    icon: FolderDown,
  },
  {
    title: "Dados",
    description: "Registre nome, instituição, data e link de cada certificado nesta página.",
    icon: FileText,
  },
  {
    title: "Exibição",
    description: "Use esta rota para mostrar certificados sem misturar com currículo ou serviços.",
    icon: Award,
  },
];

export default function CertificatesPage() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-4 sm:gap-6 max-w-5xl mx-auto">
      <MetadataSetter title={t.about.certificates} />

      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors shrink-0"
      >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        {t.about.backToAbout}
      </Link>

      <section className="rounded-2xl border bg-card/60 backdrop-blur p-4 sm:p-6 shadow-sm">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="flex items-center justify-center w-11 h-11 rounded-full bg-amber-500/10 shrink-0">
            <Award className="w-5 h-5 text-amber-500" />
          </div>
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{t.about.certificates}</h1>
            <p className="mt-1 text-sm sm:text-base text-muted-foreground">
              {t.about.certificatesDescription}
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {certificateChecklist.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border bg-background/70 p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-2.5">
                <item.icon className="w-4.5 h-4.5 text-amber-500" />
                <h2 className="font-semibold text-sm sm:text-base">{item.title}</h2>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-dashed p-4 sm:p-6 bg-amber-500/5">
        <h2 className="text-lg sm:text-xl font-semibold">Próximo passo</h2>
        <p className="mt-2 text-sm sm:text-base text-muted-foreground">
          Depois de adicionar seus certificados em <span className="font-medium text-foreground">public/certificates</span>, podemos trocar este guia por uma vitrine com os itens reais.
        </p>
      </section>
    </div>
  );
}