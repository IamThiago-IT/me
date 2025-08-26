"use client"

import { useState, useEffect } from "react"
import { getGithubProjects } from "@/lib/github"
import { ExternalLink, Star, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Project = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
};

type SortOption = "stars" | "name" | "updated";
type LanguageFilter = string | "all";

export default function Projetos() {
  const [projects, setProjects] = useState<Project[]>([])
  const [allProjects, setAllProjects] = useState<Project[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("stars")
  const [languageFilter, setLanguageFilter] = useState<LanguageFilter>("all")
  const [showFilters, setShowFilters] = useState(false)

  const loadProjects = async () => {
    setLoading(true)
    try {
      const newProjects: Project[] = await getGithubProjects(page, 30) // Aumentei para 30 para ter mais dados para filtrar
      setAllProjects((prevProjects) => [...prevProjects, ...newProjects])
      setPage((prevPage) => prevPage + 1)
      setError(null)
    } catch {
      setError("Não foi possível carregar os projetos. Por favor, tente novamente mais tarde.")
    }
    setLoading(false)
  }

  // Aplicar filtros
  useEffect(() => {
    let filtered = [...allProjects]

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // Filtro por linguagem
    if (languageFilter !== "all") {
      filtered = filtered.filter(project => project.language === languageFilter)
    }

    // Ordenação
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stars - a.stars
        case "name":
          return a.name.localeCompare(b.name)
        case "updated":
          // Como não temos data de atualização, vamos usar stars como fallback
          return b.stars - a.stars
        default:
          return 0
      }
    })

    setProjects(filtered)
  }, [allProjects, searchTerm, sortBy, languageFilter])

  useEffect(() => {
    if (page === 1) {
      loadProjects()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Obter linguagens únicas
  const uniqueLanguages = Array.from(new Set(allProjects.map(p => p.language).filter(Boolean)))

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Meus Projetos</h1>
      
      {/* Filtros */}
      <div className="mb-6 space-y-4">
        {/* Barra de busca e botão de filtros alinhados */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar projetos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Filter className="w-4 h-4" />
            Filtros
          </Button>
        </div>

        {/* Filtros avançados */}
        {showFilters && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            {/* Ordenação */}
            <div>
              <Label htmlFor="sort">Ordenar por</Label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              >
                <option value="stars">Mais estrelas</option>
                <option value="name">Nome A-Z</option>
                <option value="updated">Mais recentes</option>
              </select>
            </div>

            {/* Filtro por linguagem */}
            <div>
              <Label htmlFor="language">Linguagem</Label>
              <select
                id="language"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value as LanguageFilter)}
                className="w-full mt-1 p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              >
                <option value="all">Todas as linguagens</option>
                {uniqueLanguages.map(lang => (
                  <option key={lang} value={lang || ""}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Estatísticas */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {projects.length} projeto{projects.length !== 1 ? 's' : ''} encontrado{projects.length !== 1 ? 's' : ''}
          {searchTerm && ` para "${searchTerm}"`}
          {languageFilter !== "all" && ` em ${languageFilter}`}
        </div>
      </div>

      {error ? (
        <p className="text-red-500 dark:text-red-400">{error}</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow dark:border-gray-700 dark:hover:shadow-lg">
                <h2 className="text-xl font-semibold mb-2 dark:text-gray-200">{project.name}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description || "Sem descrição"}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {project.language && (
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded dark:bg-gray-700 dark:text-gray-300">
                        {project.language}
                      </span>
                    )}
                    <span className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Star className="w-4 h-4 mr-1" />
                      {project.stars}
                    </span>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500 flex items-center"
                  >
                    Ver no GitHub
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mostrar botão apenas se não houver filtros ativos */}
          {!searchTerm && languageFilter === "all" && (
            <div className="mt-8 text-center">
              <Button onClick={loadProjects} disabled={loading} className="dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600">
                {loading ? "Carregando..." : "Mostrar mais"}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
