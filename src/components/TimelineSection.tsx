"use client"

import type React from "react"
import { useState } from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Briefcase, GraduationCap, Calendar, ArrowUpDown } from "lucide-react"
import Link from "next/link"
import { useI18n } from "@/lib/i18n"

const timelineEntries: TimelineEntryProps["entry"][] = [
  {
    id: 6,
    type: "education",
    title: "Técnico em Informática para Internet",
    company: "SENAI",
    companyUrl: "https://www.portaldaindustria.com.br/senai/",
    period: "2019 - 2020",
    description: "Curso técnico focado em desenvolvimento de aplicações web e manutenção de sistemas.",
    skills: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    projects: [
      {
        name: "Cella - Sistema de Gerenciamento de Almoxarifado",
        description: "Desenvolvimento de um sistema completo para gerenciamento de almoxarifado, incluindo cadastro de produtos, controle de estoque e geração de relatórios.",
        link: "https://github.com/IamThiago-IT/cella",
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
  index: number
}

const TimelineEntry: React.FC<TimelineEntryProps> = ({ entry, index }) => {
  const IconComponent = entry.type === "experience" ? Briefcase : GraduationCap
  const isExperience = entry.type === "experience"
  const { t } = useI18n()

  // Alternância: par à esquerda, ímpar à direita (em desktop)
  const isLeft = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="relative grid grid-cols-[1fr_40px_1fr] md:grid-cols-[1fr_48px_1fr] items-start gap-2 md:gap-4"
    >
      {/* Card esquerdo ou spacer */}
      <div className={`${isLeft ? "block" : "hidden md:block"} ${isLeft ? "" : "md:invisible"}`}>
        {isLeft && (
          <div className={`p-4 rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${
            isExperience
              ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700"
              : "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-700"
          }`}>
            <EntryContent entry={entry} t={t} />
          </div>
        )}
      </div>

      {/* Linha central com ícone */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center shadow-md ring-4 ring-background z-10 ${
          isExperience
            ? "bg-blue-600 dark:bg-blue-500"
            : "bg-emerald-600 dark:bg-emerald-500"
        }`}>
          <IconComponent className="w-5 h-5 text-white" />
        </div>
        <div className="w-0.5 flex-1 bg-border" />
      </div>

      {/* Card direito ou spacer */}
      <div className={`${!isLeft ? "block" : "hidden md:block"} ${!isLeft ? "" : "md:invisible"}`}>
        {!isLeft && (
          <div className={`p-4 rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${
            isExperience
              ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-700"
              : "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30 hover:border-emerald-300 dark:hover:border-emerald-700"
          }`}>
            <EntryContent entry={entry} t={t} />
          </div>
        )}
      </div>

      {/* Mobile: card sempre à direita da linha */}
      <div className={`${isLeft ? "hidden" : "hidden"} md:hidden col-start-3`}>
        {/* mobile handled below */}
      </div>
    </motion.div>
  )
}

// Mobile version - single column
const TimelineEntryMobile: React.FC<TimelineEntryProps> = ({ entry, index }) => {
  const IconComponent = entry.type === "experience" ? Briefcase : GraduationCap
  const isExperience = entry.type === "experience"
  const { t } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="relative flex gap-3"
    >
      {/* Linha lateral */}
      <div className="flex flex-col items-center">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md ring-4 ring-background z-10 shrink-0 ${
          isExperience
            ? "bg-blue-600 dark:bg-blue-500"
            : "bg-emerald-600 dark:bg-emerald-500"
        }`}>
          <IconComponent className="w-4 h-4 text-white" />
        </div>
        <div className="w-0.5 flex-1 bg-border" />
      </div>

      {/* Card */}
      <div className={`flex-1 pb-6 p-4 mb-1 rounded-xl border shadow-sm transition-all duration-200 hover:shadow-md ${
        isExperience
          ? "border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/30"
          : "border-emerald-200 bg-emerald-50/50 dark:border-emerald-800 dark:bg-emerald-950/30"
      }`}>
        <EntryContent entry={entry} t={t} />
      </div>
    </motion.div>
  )
}

interface EntryContentProps {
  entry: TimelineEntryProps["entry"]
  t: ReturnType<typeof useI18n>["t"]
}

const EntryContent: React.FC<EntryContentProps> = ({ entry, t }) => {
  const isExperience = entry.type === "experience"

  return (
    <>
      {/* Period badge */}
      <div className="flex items-center gap-1.5 mb-2">
        <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-medium text-muted-foreground">{entry.period}</span>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold leading-tight mb-0.5">{entry.title}</h3>

      {/* Company */}
      <Link
        href={entry.companyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`text-sm font-medium hover:underline ${
          isExperience
            ? "text-blue-600 dark:text-blue-400"
            : "text-emerald-600 dark:text-emerald-400"
        }`}
      >
        {entry.company}
      </Link>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{entry.description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {entry.skills.map((skill, i) => (
          <Badge
            key={i}
            variant="outline"
            className={`text-[11px] px-2 py-0.5 ${
              isExperience
                ? "border-blue-200 text-blue-700 dark:border-blue-700 dark:text-blue-300"
                : "border-emerald-200 text-emerald-700 dark:border-emerald-700 dark:text-emerald-300"
            }`}
          >
            {skill}
          </Badge>
        ))}
      </div>

      {/* Projects */}
      {entry.projects.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border/50">
          {entry.projects.map((project, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">{project.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{project.description}</p>
              </div>
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`shrink-0 mt-0.5 ${
                  isExperience
                    ? "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    : "text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
                }`}
                title={t.timeline.viewProject}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default function TimelineSection() {
  const [isReversed, setIsReversed] = useState(false)
  const [filterType, setFilterType] = useState<"all" | "education" | "experience">("all")
  const { t } = useI18n()

  const sortedEntries = [...timelineEntries].sort((a, b) => {
    const parseDate = (period: string): number => {
      const [start, end] = period.split(" - ").map((date: string) => date.trim())
      const dateStr = end || start
      return Date.parse(dateStr) || new Date(`${dateStr} 01`).getTime()
    }
    return parseDate(b.period) - parseDate(a.period)
  })

  const filteredEntries = filterType === "all" ? sortedEntries : sortedEntries.filter((entry) => entry.type === filterType)
  const displayedEntries = isReversed ? [...filteredEntries].reverse() : filteredEntries

  const filterButtons: { key: "all" | "education" | "experience"; label: string; color: string; activeColor: string }[] = [
    { key: "all", label: t.timeline.all, color: "bg-secondary text-secondary-foreground hover:bg-secondary/80", activeColor: "bg-indigo-600 text-white shadow-sm" },
    { key: "education", label: t.timeline.education, color: "bg-secondary text-secondary-foreground hover:bg-secondary/80", activeColor: "bg-emerald-600 text-white shadow-sm" },
    { key: "experience", label: t.timeline.work, color: "bg-secondary text-secondary-foreground hover:bg-secondary/80", activeColor: "bg-blue-600 text-white shadow-sm" },
  ]

  return (
    <section>
      <h2 className="text-3xl font-bold mb-2 text-center">{t.timeline.title}</h2>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mb-6 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-500" />
          {t.timeline.work}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-600 dark:bg-emerald-500" />
          {t.timeline.education}
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setIsReversed(!isReversed)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border bg-background hover:bg-secondary transition-colors"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          {isReversed ? t.timeline.mostRecent : t.timeline.oldest}
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => setFilterType(btn.key)}
            className={`px-3 py-1.5 text-sm rounded-lg transition-all duration-200 ${
              filterType === btn.key ? btn.activeColor : btn.color
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Desktop timeline (alternating) */}
      <div className="hidden md:block max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={`${filterType}-${isReversed}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {displayedEntries.map((entry, index) => (
              <TimelineEntry key={entry.id} entry={entry} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile timeline (single column) */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          <motion.div key={`${filterType}-${isReversed}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {displayedEntries.map((entry, index) => (
              <TimelineEntryMobile key={entry.id} entry={entry} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
