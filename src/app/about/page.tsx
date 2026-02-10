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
    <div>
      <h1 className="text-3xl font-bold mb-4">{t.about.title}</h1>
      <p className="text-lg mb-6">
        {t.about.description}
      </p>

      <h2 className="text-2xl font-semibold mb-4">{t.about.skills}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex flex-col items-center justify-center space-y-2 p-4 border rounded-md h-24 transition-all duration-200 hover:shadow-lg hover:border-indigo-300 hover:bg-indigo-50 dark:hover:border-indigo-500 dark:hover:bg-indigo-900"
          >
            <skill.icon className="w-8 h-8 transition-transform duration-200 hover:scale-110" />
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Globe2 className="w-6 h-6" />
        {t.about.languages}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {languages.map((language) => (
          <div
            key={language.name}
            className="p-4 border rounded-md flex flex-col items-center justify-center h-24 dark:hover:border-indigo-500 dark:hover:bg-indigo-900"
          >
            <h3 className="font-semibold">{language.name}</h3>
            <div className="flex items-center gap-2 mt-2">
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

      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <History className="w-6 h-6" />
          {t.about.myJourney}
        </h2>
        <p className="text-lg mb-4">{t.about.journeyDescription}</p>
        <Link href="/about/timeline" className="inline-flex items-center text-indigo-600 hover:underline dark:text-indigo-400">
          {t.about.viewTimeline}
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
