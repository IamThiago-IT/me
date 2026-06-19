"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Award, ExternalLink, Calendar } from "lucide-react";
import { MetadataSetter } from "@/components/MetadataSetter";
import { useI18n } from "@/lib/i18n";
import { fetchCertificates } from "@/lib/db/actions";

export default function CertificatesPage() {
  const { t } = useI18n();
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates().then((data) => {
      setCertificates(data);
      setLoading(false);
    });
  }, []);

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

        {loading ? (
          <div className="flex items-center justify-center h-32 mt-5">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          </div>
        ) : certificates.length === 0 ? (
          <div className="mt-5 text-center py-8 text-muted-foreground text-sm">
            Nenhum certificado cadastrado ainda.
          </div>
        ) : (
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="rounded-xl border bg-background/70 p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <h2 className="font-semibold text-sm sm:text-base">{cert.title}</h2>
                <p className="text-xs text-muted-foreground mt-1">{cert.issuer}</p>
                {cert.issuedAt && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {new Date(cert.issuedAt).toLocaleDateString("pt-BR")}
                  </div>
                )}
                {cert.description && (
                  <p className="text-xs text-muted-foreground mt-2">{cert.description}</p>
                )}
                {cert.credentialUrl && (
                  <Link
                    href={cert.credentialUrl}
                    target="_blank"
                    className="inline-flex items-center gap-1 text-xs text-amber-600 hover:underline mt-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    Credencial
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}