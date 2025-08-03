"use client"

import Link from "next/link"
import Image from "next/image"
import { getAllArticles } from "@/lib/blog-data"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { BlogLanguageProvider, useBlogLanguage } from "@/lib/blog-language-context"
import { BlogLanguageToggle } from "@/components/BlogLanguageToggle"

function BlogContent() {
  const articles = getAllArticles()
  const { language } = useBlogLanguage()

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold mb-2">Blog</h1>
            <p className="text-lg text-gray-600">
              {language === "pt"
                ? "Compartilho aqui meus pensamentos, tutoriais e dicas sobre desenvolvimento web, programação e tecnologia."
                : "I share here my thoughts, tutorials and tips about web development, programming and technology."}
            </p>
          </div>
          <div className="flex-shrink-0">
            <BlogLanguageToggle />
          </div>
        </div>

        <div className="grid gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={article.coverImage || "/placeholder.svg"}
                  alt={article.title[language]}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">
                  <Link href={`/blog/${article.id}`} className="hover:text-indigo-600 transition-colors">
                    {article.title[language]}
                  </Link>
                </CardTitle>
                <CardDescription>
                  {formatDate(article.date)} • {article.author[language]}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm sm:text-base">{article.excerpt[language]}</p>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-2">
                {article.tags[language].map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <BlogLanguageProvider>
      <BlogContent />
    </BlogLanguageProvider>
  )
}
