"use client";
import { useState, useEffect } from "react";
import { MetadataSetter } from "@/components/MetadataSetter";
import { useI18n } from "@/lib/i18n";
import { QrCode, CreditCard, Barcode, Building2, Globe, Coins, CheckCircle2, Wallet } from "lucide-react";
import { fetchPaymentMethods } from "@/lib/db/actions";
import { Skeleton } from "@/components/ui/skeleton";

const paymentIcons = [QrCode, CreditCard, Barcode, Building2, Globe, Coins];

export default function Pagamentos() {
  const { t, locale } = useI18n();
  const [methods, setMethods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPaymentMethods().then((data) => {
      setMethods(data);
      setLoading(false);
    });
  }, []);

  const isPt = locale === "pt-BR";

  if (loading) {
    return (
      <div className="flex flex-col">
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-5 w-96 mb-6" />
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="h-6 w-40" />
              </div>
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4 mb-4" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-4/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <MetadataSetter title={t.payments.title} />
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-1">{t.payments.title}</h1>
      <p className="text-sm sm:text-base mb-6 text-muted-foreground max-w-2xl">
        {t.payments.subtitle}
      </p>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {methods.map((method, index) => {
          const Icon = paymentIcons[index] ?? Wallet;
          const name = isPt ? method.namePt : method.nameEn;
          const description = isPt ? method.descriptionPt : method.descriptionEn;
          const benefits = ((isPt ? method.benefitsPt : method.benefitsEn) ?? "").split(" | ");

          return (
            <div
              key={method.id}
              className="group flex flex-col border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-500 dark:hover:bg-indigo-900 transition-all duration-200"
            >
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold">{name}</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {description}
                </p>

                <div className="space-y-1.5 mt-auto">
                  {benefits.map((benefit: string, i: number) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
