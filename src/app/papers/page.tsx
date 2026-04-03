"use client"

import { useState } from "react"
import { ExternalLink, Search, BookOpen, Calendar, Users, Tag } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MetadataSetter } from "@/components/MetadataSetter"
import { useI18n } from "@/lib/i18n"

interface Paper {
  id: string
  title: string
  authors: string[]
  abstract: string
  date: string
  journal?: string
  conference?: string
  doi?: string
  url?: string
  tags: string[]
  language: string
}

const papers: Paper[] = [
  // Adicione seus artigos aqui seguindo o formato:
  // {
  //   id: "1",
  //   title: "Título do Artigo Científico",
  //   authors: ["Thiago dos Santos", "Co-autor"],
  //   abstract: "Resumo do artigo...",
  //   date: "2025-06-15",
  //   journal: "Nome da Revista",
  //   doi: "10.1234/example",
  //   url: "https://doi.org/10.1234/example",
  //   tags: ["machine-learning", "web"],
  //   language: "pt",
  // },
]

export default function Papers() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allTags = [...new Set(papers.flatMap((p) => p.tags))]

  const filteredPapers = papers.filter((paper) => {
    const matchesSearch =
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.authors.some((a) => a.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesTag = !selectedTag || paper.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
    })
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6">
      <MetadataSetter title={t.papers.title} />
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t.papers.title}</h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">{t.papers.description}</p>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={t.papers.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge
              variant={selectedTag === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedTag(null)}
            >
              {t.papers.all}
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Lista de Papers */}
        {filteredPapers.length === 0 ? (
          <div className="text-center py-12 sm:py-16">
            <BookOpen className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-muted-foreground mb-3 sm:mb-4" />
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
              {papers.length === 0 ? t.papers.empty : t.papers.noResults}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPapers.map((paper) => (
              <Card key={paper.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl leading-tight">
                    {paper.url ? (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-indigo-600 transition-colors"
                      >
                        {paper.title}
                      </a>
                    ) : (
                      paper.title
                    )}
                  </CardTitle>
                  <CardDescription className="flex flex-wrap items-center gap-x-3 sm:gap-x-4 gap-y-1 text-xs sm:text-sm">
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      {paper.authors.join(", ")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(paper.date)}
                    </span>
                    {(paper.journal || paper.conference) && (
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {paper.journal || paper.conference}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{paper.abstract}</p>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-1.5">
                    {paper.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    {paper.doi && (
                      <a
                        href={`https://doi.org/${paper.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:underline font-mono"
                      >
                        DOI: {paper.doi}
                      </a>
                    )}
                    {paper.url && (
                      <a
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                      >
                        {t.papers.viewPaper}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        {/* Contagem */}
        {papers.length > 0 && (
          <p className="text-sm text-muted-foreground text-center mt-8">
            {filteredPapers.length} {t.papers.of} {papers.length} {t.papers.papersCount}
          </p>
        )}
      </div>
    </div>
  )
}
