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
          <div key={skill.name} className="flex items-center space-x-2 p-2 border rounded-md">
            <skill.icon className="w-6 h-6" />
            <span>{skill.name}</span>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
        <Globe2 className="w-6 h-6" />
        Idiomas
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {languages.map((language) => (
          <div key={language.name} className="p-4 border rounded-md">
            <h3 className="font-semibold">{language.name}</h3>
            <p className="text-gray-600">{language.level}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <History className="w-6 h-6" />
          Minha Trajetória
        </h2>
        <p className="text-lg mb-4">Conheça mais sobre minha jornada profissional e acadêmica em detalhes.</p>
        <Link href="/sobre/timeline" className="inline-flex items-center text-indigo-600 hover:underline">
          Ver Linha do Tempo
          <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
