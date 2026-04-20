export const runtime = 'edge';

import { notFound } from "next/navigation"
import { getArticleById } from "@/lib/blog-data"
import { BlogLanguageProvider } from "@/lib/blog-language-context"
import { BlogPostClient } from "./client-wrapper"

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params
  
  const article = await getArticleById(id)
  
  if (!article) {
    notFound()
  }

  return (
    <BlogLanguageProvider>
      <BlogPostClient article={article} />
    </BlogLanguageProvider>
  )
}
