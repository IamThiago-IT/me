import { SiReact, SiNextdotjs, SiNodedotjs, SiTypescript, SiGraphql, SiMongodb, SiPostgresql } from "react-icons/si"
import { Globe2, History } from "lucide-react" // Import History icon
import Link from "next/link" // Import Link
import { ArrowRight } from "lucide-react" // Import ArrowRight icon

export default function Sobre() {
  const skills = [
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "GraphQL", icon: SiGraphql },
    { name: "MongoDB", icon: SiMongodb },
    { name: "PostgreSQL", icon: SiPostgresql },
  ]

  const languages = [
    { name: "Português", level: "Nativo" },
    { name: "Inglês", level: "Fluente" },
    { name: "Espanhol", level: "Intermediário" },
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Sobre Mim</h1>
      <p className="text-lg mb-6">
        Sou um desenvolvedor full-stack com experiência em React, Node.js e TypeScript. Minha paixão é criar aplicações
        web performáticas e escaláveis.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Habilidades</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center justify-center space-y-2 p-4 border rounded-md h-24 transition-all duration-200 hover:shadow-lg hover:border-indigo-300 hover:bg-indigo-50">
            <skill.icon className="w-8 h-8 transition-transform duration-200 hover:scale-110" />
            <span className="text-sm font-medium">{skill.name}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Globe2 className="w-6 h-6" />
        Idiomas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Exemplo de mapeamento para CEFR */}
        {[
          { name: "Português", level: "Nativo", cefr: "C2" },
          { name: "Inglês", level: "Fluente", cefr: "C1" },
          { name: "Espanhol", level: "Intermediário", cefr: "B1" },
        ].map((language) => (
          <div key={language.name} className="p-4 border rounded-md flex flex-col items-center justify-center h-24">
            <h3 className="font-semibold">{language.name}</h3>
            <div className="flex items-center gap-2 mt-2">
              <span
                className={`
                  px-2 py-0.5 rounded-full text-xs font-bold
                  ${language.cefr === "C2" ? "bg-green-200 text-green-800" : ""}
                  ${language.cefr === "C1" ? "bg-blue-200 text-blue-800" : ""}
                  ${language.cefr === "B1" ? "bg-yellow-200 text-yellow-800" : ""}
                `}
              >
                {language.cefr}
              </span>
              <span className="text-xs text-gray-600">{language.level}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <History className="w-6 h-6" />
          Minha Trajetória
        </h2>
        <p className="text-lg mb-4">Conheça mais sobre minha jornada profissional e acadêmica em detalhes.</p>
        <Link href="/about/timeline" className="inline-flex items-center text-indigo-600 hover:underline">
          Ver Linha do Tempo
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
