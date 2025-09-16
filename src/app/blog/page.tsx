"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { fetchTabNewsArticles } from "@/lib/tabnews-api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Coins, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MetadataSetter } from "@/components/MetadataSetter"

function BlogContent() {

  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [dateFilter, setDateFilter] = useState<string>("")
  const articlesPerPage = 10

  useEffect(() => {
    async function loadArticles() {
      try {
        setLoading(true)
        const fetchedArticles = await fetchTabNewsArticles("IamThiagoIT")
        console.log("Fetched articles:", fetchedArticles);
        if (!Array.isArray(fetchedArticles)) {
          throw new Error("Invalid data format: Expected an array of articles.");
        }
        setArticles(fetchedArticles)
      } catch (err) {
        setError("Erro ao carregar artigos do TabNews")
        console.error("Error loading TabNews articles:", err)
      } finally {
        setLoading(false)
      }
    }

    loadArticles()
  }, [])

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase())
    const articleDate = new Date(article.date)
    let matchesDate = true

    if (dateFilter === "last7days") {
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      matchesDate = articleDate >= sevenDaysAgo
    } else if (dateFilter === "last30days") {
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
      matchesDate = articleDate >= thirtyDaysAgo
    } else if (dateFilter === "thisYear") {
      const startOfYear = new Date(new Date().getFullYear(), 0, 1)
      matchesDate = articleDate >= startOfYear
    }

    return matchesSearch && matchesDate
  })

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage)
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  )

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleDateFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDateFilter(e.target.value)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando artigos...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="text-indigo-600 hover:underline">
              Tentar novamente
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4">
      <MetadataSetter title="Blog" />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold mb-2">Blog</h1>
            <p className="text-lg text-gray-600">
              Artigos do meu TabNews - compartilhando conhecimento sobre desenvolvimento web e tecnologia.
            </p>
          </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
          <Input
            type="text"
            placeholder="Buscar artigos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <select
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="p-2 border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="">Datas</option>
            <option value="last7days">Últimos 7 Dias</option>
            <option value="last30days">Últimos 30 Dias</option>
            <option value="thisYear">Este Ano</option>
          </select>
        </div>

        <div className="grid gap-8">
          {paginatedArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-xl sm:text-2xl flex-1">
                    <Link href={`/blog/${article.id}`} className="hover:text-indigo-600 transition-colors">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center gap-2 ml-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Coins className="w-4 h-4 mr-1" />
                      {article.tabcoins}
                    </div>
                    <Link
                      href={`https://www.tabnews.com.br/IamThiagoIT`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
                <CardDescription>
                  {formatDate(article.date)} • {article.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm sm:text-base">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                {Array.isArray(article.tags) && article.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>

        {paginatedArticles.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum artigo encontrado.</p>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-md disabled:opacity-50 ${currentPage === 1 ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer'}`}
          >
            Anterior
          </button>
          <span className="text-gray-800 dark:text-gray-200">Página {currentPage} de {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-md disabled:opacity-50 ${currentPage === totalPages ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer'}`}
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
      <BlogContent />
  )
}
