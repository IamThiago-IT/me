"use client";
import { MetadataSetter } from "@/components/MetadataSetter";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { QrCode, CreditCard, Barcode, Building2, Globe, Coins, CheckCircle2 } from "lucide-react";

const paymentIcons = [QrCode, CreditCard, Barcode, Building2, Globe, Coins];

export default function Pagamentos() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">
      <MetadataSetter title={t.payments.title} />
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-1">{t.payments.title}</h1>
      <p className="text-sm sm:text-base mb-6 text-muted-foreground max-w-2xl">
        {t.payments.subtitle}
      </p>

      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        {t.payments.items.map((method, index) => {
          const Icon = paymentIcons[index];
          const benefits = method.benefits.split(" | ");

          return (
            <div
              key={index}
              className="group flex flex-col border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-500 dark:hover:bg-indigo-900 transition-all duration-200"
            >
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-indigo-500" />
                  </div>
                  <h2 className="text-base sm:text-lg font-semibold">{method.name}</h2>
                </div>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {method.description}
                </p>

                <div className="space-y-1.5 mt-auto">
                  {benefits.map((benefit, i) => (
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
