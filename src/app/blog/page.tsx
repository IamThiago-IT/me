"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { fetchTabNewsArticles } from "@/lib/tabnews-api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Coins, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"

function BlogContent() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

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

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

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
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold mb-2">Blog</h1>
            <p className="text-lg text-gray-600">
              Artigos do meu TabNews - compartilhando conhecimento sobre desenvolvimento web e tecnologia.
            </p>
          </div>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Buscar artigos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="grid gap-8">
          {filteredArticles.map((article) => (
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

        {filteredArticles.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum artigo encontrado.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
      <BlogContent />
  )
}
