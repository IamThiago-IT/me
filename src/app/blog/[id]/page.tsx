"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getArticleById, type Article } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { ChevronLeft, Coins, ExternalLink } from "lucide-react"
import Markdown from "react-markdown"
import { BlogLanguageProvider, useBlogLanguage } from "@/lib/blog-language-context"
import { BlogLanguageToggle } from "@/components/BlogLanguageToggle"

interface PageProps {
  params: {
    id: string
  } & { then?: never }
}

function BlogPostContent({ params }: PageProps) {
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const { language } = useBlogLanguage()

  useEffect(() => {
    async function loadArticle() {
      try {
        setLoading(true)
        const fetchedArticle = await getArticleById(params.id)
        if (!fetchedArticle) {
          notFound()
        }
        setArticle(fetchedArticle)
      } catch (error) {
        console.error("Error loading article:", error)
        notFound()
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [params.id])

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Carregando artigo...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 mb-4 sm:mb-0"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {language === "pt" ? "Voltar para o blog" : "Back to blog"}
          </Link>
          <BlogLanguageToggle />
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight">{article.title[language]}</h1>

        <div className="flex flex-wrap items-center text-gray-600 mb-6 text-sm">
          <span>{formatDate(article.date)}</span>
          <span className="mx-2">•</span>
          <span>{article.author[language]}</span>
          <span className="mx-2">•</span>
          <div className="flex items-center">
            <Coins className="w-4 h-4 mr-1" />
            {article.tabcoins} TabCoins
          </div>
          <span className="mx-2">•</span>
          <Link
            href={`https://www.tabnews.com.br/IamThiagoIT/${article.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-indigo-600 hover:text-indigo-800"
          >
            Ver no TabNews
            <ExternalLink className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {article.tags[language].map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="relative h-48 sm:h-64 md:h-96 w-full mb-8">
          <Image
            src={article.coverImage || "/placeholder.svg"}
            alt={article.title[language]}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="prose prose-sm sm:prose prose-lg max-w-none">
          <Markdown>{article.content[language]}</Markdown>
        </div>
      </div>
    </div>
  )
}

export default function BlogPostPage({ params }: PageProps) {
  return (
    <BlogLanguageProvider>
      <BlogPostContent params={params} />
    </BlogLanguageProvider>
  )
}
