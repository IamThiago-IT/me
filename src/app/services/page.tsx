"use client";
import { MetadataSetter } from "@/components/MetadataSetter";
import { Button } from "@/components/ui/button";
import React from "react";
import { useI18n } from "@/lib/i18n";
import { Globe, Palette, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const serviceIcons = [Globe, Palette, Lightbulb];

export default function Services() {
  const { t } = useI18n();

  return (
    <div className="flex flex-col">
      <MetadataSetter title={t.services.title} />
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-1">{t.services.title}</h1>
      <p className="text-sm sm:text-base mb-6 text-muted-foreground max-w-2xl">
        {t.services.subtitle}
      </p>

      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {t.services.items.map((service, index) => {
          const Icon = serviceIcons[index];
          const features = service.features.split(" | ");

          return (
            <div
              key={index}
              className="group flex flex-col border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-500 dark:hover:bg-indigo-900 transition-all duration-200"
            >
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-indigo-500" />
                </div>

                <h2 className="text-lg sm:text-xl font-semibold mb-2">
                  {service.name}
                </h2>

                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-1.5 mb-6">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto border-t border-border pt-4">
                  <div className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
                    {service.price}
                  </div>
                  <Button asChild className="w-full font-medium">
                    <Link href="/contato">
                      {service.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
