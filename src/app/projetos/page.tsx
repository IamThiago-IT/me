"use client"


import { useState, useEffect } from "react"
import { getGithubProjects } from "@/lib/github"
import { ExternalLink, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

type Project = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
};

export default function Projetos() {
  const [projects, setProjects] = useState<Project[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadProjects = async () => {
    setLoading(true)
    try {
      const newProjects: Project[] = await getGithubProjects(page, 10)
      setProjects((prevProjects) => [...prevProjects, ...newProjects])
      setPage((prevPage) => prevPage + 1)
      setError(null)
    } catch (e) {
      setError("Não foi possível carregar os projetos. Por favor, tente novamente mais tarde.")
    }
    setLoading(false)
  }

  useEffect(() => {
    if (page === 1) {
      loadProjects()
    }
  }, [])
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Meus Projetos</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
                <p className="text-gray-600 mb-4">{project.description || "Sem descrição"}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {project.language && <span className="text-sm text-gray-500">{project.language}</span>}
                    <span className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-1" />
                      {project.stars}
                    </span>
                  </div>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 flex items-center"
                  >
                    Ver no GitHub
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Button onClick={loadProjects} disabled={loading}>
              {loading ? "Carregando..." : "Mostrar mais"}
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
