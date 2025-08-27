"use client"

import { 
  getTabNewsArticles, 
  convertTabNewsToBlogs, 
  getTabNewsArticleBySlug, 
  type BlogArticle 
} from "./tabnews-api"

export interface Article extends BlogArticle {}

let cachedArticles: Article[] | null = null

export async function getAllArticles(): Promise<Article[]> {
  if (cachedArticles) {
    return cachedArticles
  }

  try {
    const tabNewsArticles = await getTabNewsArticles()
    cachedArticles = convertTabNewsToBlogs(tabNewsArticles)
    return cachedArticles
  } catch (error) {
    console.error("Error loading articles:", error)
    // Return fallback articles if API fails
    return getFallbackArticles()
  }
}

export async function getArticleById(id: string): Promise<Article | undefined> {
  try {
    const tabNewsArticle = await getTabNewsArticleBySlug(id)
    if (!tabNewsArticle) return undefined

    const blogArticles = convertTabNewsToBlogs([tabNewsArticle])
    return blogArticles[0]
  } catch (error) {
    console.error("Error loading article:", error)
    return undefined
  }
}

// Fallback articles in case TabNews API is unavailable
function getFallbackArticles(): Article[] {
  return [
    {
      id: "introducao-nextjs",
      title: {
        pt: "Introdução ao Next.js: O Framework React para Produção",
        en: "Introduction to Next.js: The React Framework for Production",
      },
      excerpt: {
        pt: "Descubra como o Next.js pode melhorar sua experiência de desenvolvimento React com recursos como renderização do lado do servidor, geração de sites estáticos e muito mais.",
        en: "Discover how Next.js can improve your React development experience with features like server-side rendering, static site generation and much more.",
      },
      content: {
        pt: `# Introdução ao Next.js: O Framework React para Produção\n\nNext.js é um framework React que oferece uma experiência de desenvolvimento excepcional...`,
        en: `# Introduction to Next.js: The React Framework for Production\n\nNext.js is a React framework that provides an exceptional development experience...`,
      },
      date: "2023-05-15T00:00:00Z",
      author: {
        pt: "Thiago Desenvolvedor",
        en: "Thiago Developer",
      },
      coverImage: "/placeholder.svg?height=400&width=800",
      tags: {
        pt: ["Next.js", "React", "JavaScript", "Frontend"],
        en: ["Next.js", "React", "JavaScript", "Frontend"],
      },
      tabcoins: 0,
      slug: "introducao-nextjs",
    },
  ]
}
