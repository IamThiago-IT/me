"use client"

import { useBlogLanguage } from "@/lib/blog-language-context"
import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"

export function BlogLanguageToggle() {
  const { language, setLanguage } = useBlogLanguage()

  return (
    <div className="flex items-center gap-2 mb-6">
      <Languages className="h-4 w-4 text-gray-500" />
      <div className="flex rounded-md border border-gray-200 overflow-hidden">
        <Button
          variant={language === "pt" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("pt")}
          className="rounded-none border-0 px-3 py-1 text-xs"
        >
          PT
        </Button>
        <Button
          variant={language === "en" ? "default" : "ghost"}
          size="sm"
          onClick={() => setLanguage("en")}
          className="rounded-none border-0 px-3 py-1 text-xs"
        >
          EN
        </Button>
      </div>
    </div>
  )
}
