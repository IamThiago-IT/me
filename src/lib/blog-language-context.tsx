"use client"

import React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "pt" | "en"

interface BlogLanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const BlogLanguageContext = createContext<BlogLanguageContextType | undefined>(undefined)

export function BlogLanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("pt")

  useEffect(() => {
    // Detectar idioma do navegador apenas para o blog
    const browserLang = navigator.language.toLowerCase()
    const detectedLang: Language = browserLang.startsWith("en") ? "en" : "pt"

    // Verificar se há idioma salvo no localStorage
    const savedLang = localStorage.getItem("blog-language") as Language

    if (savedLang && (savedLang === "pt" || savedLang === "en")) {
      setLanguage(savedLang)
    } else {
      setLanguage(detectedLang)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("blog-language", lang)
  }

  return (
    <BlogLanguageContext.Provider value={{ language, setLanguage: handleSetLanguage }}>
      {children}
    </BlogLanguageContext.Provider>
  )
}

export function useBlogLanguage() {
  const context = useContext(BlogLanguageContext)
  if (context === undefined) {
    throw new Error("useBlogLanguage must be used within a BlogLanguageProvider")
  }
  return context
}
