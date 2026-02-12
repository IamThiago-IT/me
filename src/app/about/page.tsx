"use client";

import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiGraphql, SiMongodb, SiPostgresql } from "react-icons/si";
import { Globe2, History } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Sobre() {
  const { t } = useI18n();

  const skills = [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "GraphQL", icon: SiGraphql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "PostgreSQL", icon: SiPostgresql },
  ];

  const languages = [
    { name: t.about.portuguese, level: t.about.native, cefr: "C2" },
    { name: t.about.english, level: t.about.fluent, cefr: "C1" },
    { name: t.about.spanish, level: t.about.intermediate, cefr: "B1" },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <h1 className="text-3xl font-bold mb-1">{t.about.title}</h1>
      <p className="text-base mb-4 text-muted-foreground">
        {t.about.description}
      </p>

      <div className="flex-1 grid grid-rows-[auto_1fr_auto_1fr_auto] gap-3 min-h-0">
        {/* Skills */}
        <h2 className="text-xl font-semibold">{t.about.skills}</h2>
        <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 min-h-0">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="flex flex-col items-center justify-center gap-1.5 border rounded-lg transition-all duration-200 hover:shadow-md hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-500 dark:hover:bg-indigo-900"
            >
              <skill.icon className="w-6 h-6 transition-transform duration-200 hover:scale-110" />
              <span className="text-xs font-medium">{skill.name}</span>
            </div>
          ))}
        </div>

        {/* Languages */}
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Globe2 className="w-5 h-5" />
          {t.about.languages}
        </h2>
        <div className="grid grid-cols-3 gap-2 min-h-0">
          {languages.map((language) => (
            <div
              key={language.name}
              className="flex flex-col items-center justify-center border rounded-lg dark:hover:border-indigo-500 dark:hover:bg-indigo-900 transition-all duration-200"
            >
              <h3 className="font-semibold text-sm">{language.name}</h3>
              <div className="flex items-center gap-1.5 mt-1">
                <span
                  className={`
                    px-2 py-0.5 rounded-full text-xs font-bold
                    ${language.cefr === "C2" ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200" : ""}
                    ${language.cefr === "C1" ? "bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200" : ""}
                    ${language.cefr === "B1" ? "bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200" : ""}
                  `}
                >
                  {language.cefr}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{language.level}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Journey CTA */}
        <Link
          href="/about/timeline"
          className="group flex items-center gap-3 p-3 border-2 border-dashed border-indigo-400/40 rounded-xl bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500 transition-all duration-200"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors shrink-0">
            <History className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-semibold group-hover:text-indigo-500 transition-colors">
              {t.about.myJourney}
            </h2>
            <p className="text-sm text-muted-foreground truncate">{t.about.journeyDescription}</p>
          </div>
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-indigo-500 group-hover:translate-x-1 transition-all shrink-0" />
        </Link>
      </div>
    </div>
  );
}
