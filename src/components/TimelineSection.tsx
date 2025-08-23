"use client"

import type React from "react"
import { useState } from "react" // Import useState for managing state

import { motion } from "framer-motion" // Corrected import
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Briefcase, GraduationCap } from "lucide-react"
import Link from "next/link"

// Mock data for timeline entries
const timelineEntries: TimelineEntryProps["entry"][] = [
  {
    id: 6,
    type: "education",
    title: "Técnico em Informática para Internet",
    company: "SENAI",
    companyUrl: "https://www.portaldaindustria.com.br/senai/",
    period: "2018 - 2020",
    description: "Curso técnico focado em desenvolvimento de aplicações web e manutenção de sistemas.",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    projects: [
      {
        name: "Portal de E-commerce",
        description: "Desenvolvimento de um portal de e-commerce completo como projeto final.",
        link: "https://github.com/IamThiago-IT/ecommerce-portal",
      },
    ],
  },
  {
    id: 3,
    type: "education",
    title: "Análise e Desenvolvimento de Sistemas",
    company: "Universidade Federal do Paraná (UFPR)",
    companyUrl: "https://universidadetech.edu",
    period: "2021 - 2024",
    description: "Foco em desenvolvimento de software, algoritmos e estruturas de dados.",
    skills: ["Algoritmos", "Java", "Estruturas de Dados", "Banco de Dados"],
    projects: [
      {
        name: "Sistema de Recomendação de Filmes",
        description:
          "Projeto de conclusão de curso utilizando aprendizado de máquina para recomendações personalizadas.",
        link: "https://github.com/IamThiago-IT/movie-recommender",
      },
    ],
  },
  {
    id: 2,
    type: "experience",
    title: "Desenvolvedor Front-end",
    company: "WebSolutions",
    companyUrl: "https://websolutions.com",
    period: "Mar 2020 - Dez 2021",
    description: "Criação de interfaces responsivas e acessíveis para aplicações web de alto tráfego.",
    skills: ["JavaScript", "React", "CSS", "Acessibilidade Web"],
    projects: [
      {
        name: "Redesign do Portal de Notícias",
        description: "Liderou o redesign completo do portal, melhorando o tempo de carregamento em 60%.",
        link: "https://github.com/IamThiago-IT/news-portal-redesign",
      },
    ],
  },
  {
    id: 1,
    type: "experience",
    title: "Desenvolvedor Full Stack Senior",
    company: "TechCorp",
    companyUrl: "https://techcorp.com",
    period: "Jan 2022 - Presente",
    description:
      "Liderando o desenvolvimento de aplicações web escaláveis, implementando arquiteturas modernas e mentorando desenvolvedores juniores.",
    skills: ["React", "Node.js", "AWS", "GraphQL", "Liderança Técnica"],
    projects: [
      {
        name: "Sistema de Gerenciamento de Clientes",
        description: "Desenvolveu um sistema completo para gerenciamento de clientes, aumentando a eficiência em 40%.",
        link: "https://github.com/IamThiago-IT/customer-management",
      },
    ],
  },
  {
    id: 4,
    type: "education",
    title: "Mestrado em Computação Aplicada",
    company: "Universidade Tecnológica Federal do Paraná (UTFPR)",
    companyUrl: "https://utfpr.edu.br",
    period: "2024 - 2026",
    description: "Pesquisa em inteligência artificial e aprendizado de máquina.",
    skills: ["Inteligência Artificial", "Aprendizado de Máquina", "Python", "Pesquisa"],
    projects: [
      {
        name: "Sistema de Diagnóstico Médico",
        description: "Desenvolvimento de um sistema de diagnóstico médico utilizando redes neurais.",
        link: "https://github.com/IamThiago-IT/medical-diagnosis-system",
      },
    ],
  },
  {
    id: 5,
    type: "education",
    title: "Doutorado em Ciência da Computação",
    company: "Universidade Federal do Paraná (UFPR)",
    companyUrl: "https://universidadetech.edu",
    period: "2026 - 2030",
    description: "Pesquisa avançada em inteligência artificial e aprendizado profundo.",
    skills: ["Inteligência Artificial", "Aprendizado Profundo", "Python", "Pesquisa Avançada"],
    projects: [
      {
        name: "Sistema de Previsão de Doenças",
        description: "Desenvolvimento de um sistema de previsão de doenças utilizando aprendizado profundo.",
        link: "https://github.com/IamThiago-IT/disease-prediction-system",
      },
    ],
  },
]

interface TimelineEntryProps {
  entry: {
    id: number
    type: "experience" | "education"
    title: string
    company: string
    companyUrl: string
    period: string
    description: string
    skills: string[]
    projects: {
      name: string
      description: string
      link: string
    }[]
  }
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({ entry }) => {
  const IconComponent = entry.type === "experience" ? Briefcase : GraduationCap

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8 flex flex-col md:flex-row justify-between items-start"
    >
      <div className="flex items-center mb-4 md:mb-0 md:mr-4">
        <div className="bg-indigo-600 rounded-full p-2">
          {" "}
          {/* Changed to indigo-600 */}
          <IconComponent className="w-6 h-6 text-white" /> {/* Changed to text-white */}
        </div>
        <div className="ml-4 w-px h-full bg-gray-300 hidden md:block" />
      </div>
      <Card className="flex-grow w-full">
        {" "}
        {/* Added w-full for better responsiveness */}
        <CardHeader>
          <CardTitle className="text-xl font-bold">{entry.title}</CardTitle>
          <p className="text-sm text-gray-500">
            <Link href={entry.companyUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {entry.company}
            </Link>{" "}
            | {entry.period}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{entry.description}</p>
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Habilidades Adquiridas:</h4>
            <div className="flex flex-wrap gap-2">
              {entry.skills.map((skill, index) => (
                <Badge key={index} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          {entry.projects.map((project, index) => (
            <Card key={index} className="mb-4 last:mb-0">
              <CardHeader>
                <CardTitle className="text-lg">{project.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline inline-flex items-center" // Changed to indigo-600
                >
                  Ver Projeto <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function perfeitoTimelineSection() {
  const [isReversed, setIsReversed] = useState(false) // State to track order
  const [filterType, setFilterType] = useState<"all" | "education" | "experience">("all") // State to filter by type

  // Sort entries by period in descending order (most recent first)
  const sortedEntries = [...timelineEntries].sort((a, b) => {
    const parseDate = (period: string): number => {
      const [start, end] = period.split(" - ").map((date: string) => date.trim())
      const dateStr = end || start
      const parsedDate = Date.parse(dateStr) || new Date(`${dateStr} 01`).getTime()
      return parsedDate
    }

    return parseDate(b.period) - parseDate(a.period)
  })

  // Apply filters and reverse order if needed
  const filteredEntries = filterType === "all" ? sortedEntries : sortedEntries.filter((entry) => entry.type === filterType)
  const displayedEntries = isReversed ? filteredEntries.reverse() : filteredEntries

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="max-w-3xl w-full">
          <h2 className="text-3xl font-bold mb-8 text-center">Linha do Tempo</h2>
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setIsReversed(!isReversed)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              {isReversed ? "Mais Recentes" : "Mais Antigos"}
            </button>
            <button
              onClick={() => setFilterType("all")}
              className={`px-4 py-2 rounded ${filterType === "all" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Todos
            </button>
            <button
              onClick={() => setFilterType("education")}
              className={`px-4 py-2 rounded ${filterType === "education" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Escolaridade
            </button>
            <button
              onClick={() => setFilterType("experience")}
              className={`px-4 py-2 rounded ${filterType === "experience" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"}`}
            >
              Trabalho
            </button>
          </div>
          <div className="max-w-3xl mx-auto">
            {displayedEntries.map((entry) => (
              <TimelineEntry key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
