"use client"

export const runtime = 'edge';

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import type { Article } from "@/lib/blog-data"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { ChevronLeft, Coins, ExternalLink } from "lucide-react"
import Markdown from "react-markdown"
import { BlogLanguageToggle } from "@/components/BlogLanguageToggle"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism"
import { MetadataSetter } from "@/components/MetadataSetter"
import { useBlogLanguage } from "@/lib/blog-language-context"

function BlogPostContent({ article }: { article: Article }) {
  const { language } = useBlogLanguage()

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6">
      <MetadataSetter title="Blog Post" />
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 mb-4 sm:mb-0"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            {t.blog.backToBlog}
          </Link>
          <BlogLanguageToggle />
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-gray-800">
          {article.title[language]}
        </h1>

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
            {t.blog.viewOnTabNews}
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
          <Markdown
            components={{
              code({ node, className, children, ...props }) {
                const { inline } = arguments[0] as any
                const match = /language-(\w+)/.exec(className || "")
                return !inline && match ? (
                  // @ts-ignore
                  <SyntaxHighlighter
                    language={match[1]}
                    style={dracula as unknown as any}
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              },
            }}
          >
            {article.content[language]}
          </Markdown>
        </div>
      </div>
    </div>
  )
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { getArticleById } = await import("@/lib/blog-data")
  
  const article = await getArticleById(id)
  
  if (!article) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      <BlogPostContent article={article} />
    </div>
  )
}
