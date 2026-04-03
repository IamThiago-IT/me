"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { fetchTabNewsArticles, type TransformedArticle } from "@/lib/tabnews-api"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Coins, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { MetadataSetter } from "@/components/MetadataSetter"
import { useI18n } from "@/lib/i18n"

function BlogContent() {
  const { t } = useI18n()

  const [articles, setArticles] = useState<TransformedArticle[]>([])
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
        setError(t.blog.error)
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
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center h-48 sm:h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mx-auto mb-3 sm:mb-4"></div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t.blog.loading}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8 sm:py-12">
            <p className="text-red-600 dark:text-red-400 mb-3 sm:mb-4 text-sm sm:text-base">{error}</p>
            <button onClick={() => window.location.reload()} className="text-xs sm:text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
              {t.blog.tryAgain}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6">
      <MetadataSetter title={t.blog.title} />
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
          <div className="mb-0">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{t.blog.title}</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
              {t.blog.description}
            </p>
          </div>
        </div>

        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center">
          <Input
            type="text"
            placeholder={t.blog.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 sm:p-3 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <select
            value={dateFilter}
            onChange={handleDateFilterChange}
            className="p-2 sm:p-3 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="">{t.blog.dates}</option>
            <option value="last7days">{t.blog.last7days}</option>
            <option value="last30days">{t.blog.last30days}</option>
            <option value="thisYear">{t.blog.thisYear}</option>
          </select>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8">
          {paginatedArticles.map((article) => (
            <Card key={article.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl flex-1 break-words">
                    <Link href={`/blog/${article.id}`} className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                      {article.title}
                    </Link>
                  </CardTitle>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <Coins className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                      {article.tabcoins}
                    </div>
                    <Link
                      href={`https://www.tabnews.com.br/IamThiagoIT`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                    >
                      <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                  </div>
                </div>
                <CardDescription className="text-xs sm:text-sm">
                  {formatDate(article.date)} • {article.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base line-clamp-2">{article.excerpt}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
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
          <div className="text-center py-8 sm:py-12">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{t.blog.noArticles}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-2 mt-4 sm:mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium disabled:opacity-50 w-full sm:w-auto ${currentPage === 1 ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer'}`}
          >
            {t.blog.previous}
          </button>
          <span className="text-xs sm:text-sm text-gray-800 dark:text-gray-200">{t.blog.page} {currentPage} {t.blog.of} {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium disabled:opacity-50 w-full sm:w-auto ${currentPage === totalPages ? 'bg-gray-200 dark:bg-gray-700 cursor-not-allowed' : 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer'}`}
          >
            {t.blog.next}
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
