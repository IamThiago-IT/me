"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import Image from "next/image"
import { getGithubProjects } from "@/lib/github"
import { fetchFeaturedProjects } from "@/lib/db/actions"
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  FolderGit2,
  Search,
  SearchX,
  Star,
  X,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MetadataSetter } from "@/components/MetadataSetter"
import { Skeleton } from "@/components/ui/skeleton"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type Project = {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
};

type SortOption = "stars" | "name" | "updated";

type FeaturedProject = {
  id: number;
  name: string;
  description: string;
  link: string;
  imageUrl: string | null;
  tags: string[];
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "bg-yellow-400",
  TypeScript: "bg-blue-500",
  Python: "bg-emerald-500",
  "C++": "bg-pink-500",
  C: "bg-gray-500",
  "C#": "bg-purple-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-500",
  Ruby: "bg-red-500",
  PHP: "bg-indigo-400",
  Java: "bg-red-400",
  Swift: "bg-orange-400",
  Kotlin: "bg-violet-500",
  HTML: "bg-orange-500",
  CSS: "bg-blue-400",
  Shell: "bg-lime-500",
  Dockerfile: "bg-sky-500",
  Vue: "bg-green-400",
  Svelte: "bg-orange-500",
  Zig: "bg-amber-500",
  Lua: "bg-indigo-500",
};

export default function Projetos() {
  const { t } = useI18n()

  const [projects, setProjects] = useState<Project[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>("stars")
  const [languageFilter, setLanguageFilter] = useState<string>("all")

  const [featuredProjects, setFeaturedProjects] = useState<FeaturedProject[]>([])
  const [featuredLoading, setFeaturedLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchFeaturedProjects().then((data) => {
      setFeaturedProjects(data)
      setFeaturedLoading(false)
    })
  }, [])

  const scrollToIndex = useCallback((index: number) => {
    const el = carouselRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-carousel-item]")
    const step = card ? card.offsetWidth + 16 : el.clientWidth
    el.scrollTo({ left: index * step, behavior: "smooth" })
  }, [])

  const scrollByCard = (direction: 1 | -1) => {
    scrollToIndex(activeIndex + direction)
  }

  const handleCarouselScroll = () => {
    const el = carouselRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>("[data-carousel-item]")
    const step = card ? card.offsetWidth + 16 : el.clientWidth
    setActiveIndex(Math.round(el.scrollLeft / step))
  }

  const loadProjects = async () => {
    setLoading(true)
    try {
      const newProjects: Project[] = await getGithubProjects(page, 30)
      setProjects((prevProjects) => {
        const existingIds = new Set(prevProjects.map((p) => p.id))
        const uniqueNewProjects = newProjects.filter((p) => !existingIds.has(p.id))
        return [...prevProjects, ...uniqueNewProjects]
      })
      setPage((prevPage) => prevPage + 1)
      setError(null)
    } catch {
      setError(t.projects.loadError)
    }
    setLoading(false)
  }

  useEffect(() => {
    if (page === 1) {
      loadProjects()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filteredProjects = useMemo(() => {
    let filtered = [...projects]

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(term) ||
          (project.description ?? "").toLowerCase().includes(term)
      )
    }

    if (languageFilter !== "all") {
      filtered = filtered.filter((project) => project.language === languageFilter)
    }

    switch (sortBy) {
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "stars":
      case "updated":
        filtered.sort((a, b) => b.stars - a.stars)
        break
    }

    return filtered
  }, [projects, searchTerm, sortBy, languageFilter])

  const uniqueLanguages = useMemo(
    () =>
      Array.from(
        new Set(projects.map((p) => p.language).filter((lang): lang is string => Boolean(lang)))
      ),
    [projects]
  )

  const totalStars = projects.reduce((sum, p) => sum + p.stars, 0)
  const hasActiveFilters = searchTerm !== "" || languageFilter !== "all"

  const clearFilters = () => {
    setSearchTerm("")
    setLanguageFilter("all")
  }

  const stats = [
    {
      label: t.projects.totalProjects,
      value: projects.length,
      icon: FolderGit2,
      className:
        "from-blue-50 to-blue-100/50 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400",
    },
    {
      label: t.projects.totalStars,
      value: totalStars,
      icon: Star,
      className:
        "from-yellow-50 to-yellow-100/50 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400",
    },
    {
      label: t.projects.totalLanguages,
      value: uniqueLanguages.length,
      icon: Code2,
      className:
        "from-green-50 to-green-100/50 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400",
    },
  ]

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6">
      <MetadataSetter title={t.projects.title} />
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">{t.projects.title}</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl">
            {t.projects.description}
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-10 sm:mb-14">
            <div className="flex items-start sm:items-center justify-between gap-4 mb-4 sm:mb-6">
              <div className="min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold">{t.projects.featuredTitle}</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {t.projects.featuredDescription}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollByCard(-1)}
                  disabled={featuredLoading || activeIndex === 0}
                  aria-label={t.projects.previous}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => scrollByCard(1)}
                  disabled={featuredLoading || activeIndex >= featuredProjects.length - 1}
                  aria-label={t.projects.next}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div
              ref={carouselRef}
              onScroll={handleCarouselScroll}
              className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {featuredLoading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Card
                    key={`featured-skeleton-${i}`}
                    data-carousel-item
                    className="snap-start shrink-0 w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] overflow-hidden"
                  >
                    <Skeleton className="aspect-video w-full rounded-t-xl rounded-b-none" />
                    <CardHeader className="pb-2">
                      <Skeleton className="h-5 w-3/4" />
                    </CardHeader>
                    <CardContent className="flex-1 pb-2">
                      <Skeleton className="h-4 w-full mb-1" />
                      <Skeleton className="h-4 w-2/3" />
                    </CardContent>
                  </Card>
                ))
              ) : (
                featuredProjects.map((project) => (
                  <Card
                    key={project.id}
                    data-carousel-item
                    className="group snap-start shrink-0 w-[85%] sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)] overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      {project.imageUrl ? (
                        <Image
                          src={project.imageUrl}
                          alt={project.name}
                          fill
                          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
                          <FolderGit2 className="w-10 h-10 text-blue-500 dark:text-blue-400" />
                        </div>
                      )}
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-primary text-primary-foreground shadow-sm">
                          <Star className="w-3 h-3 fill-current" />
                          {t.projects.featured}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base sm:text-lg truncate">{project.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 pb-2">
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {project.description}
                      </p>
                    </CardContent>
                    <CardFooter className="justify-between pt-2">
                      <div className="flex flex-wrap gap-1.5 min-w-0">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-[11px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors shrink-0"
                      >
                        {t.projects.viewProject}
                        <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </a>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>

            {/* Dots */}
            {!featuredLoading && featuredProjects.length > 1 && (
              <div className="flex justify-center gap-1.5 mt-4">
                {featuredProjects.map((project, i) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => scrollToIndex(i)}
                    aria-label={`${t.projects.featuredTitle} ${i + 1}`}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      i === activeIndex
                        ? "w-6 bg-primary"
                        : "w-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                    )}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {loading && projects.length === 0 ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-7 w-12 mb-1" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            stats.map((stat) => (
              <Card key={stat.label} className={cn("bg-gradient-to-br border", stat.className)}>
                <CardContent className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4">
                  <div className="p-2.5 sm:p-3 rounded-lg bg-white/70 dark:bg-white/10 shrink-0">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-2xl sm:text-3xl font-bold">{stat.value}</div>
                    <p className="text-xs sm:text-sm opacity-80 truncate">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Search + Sort */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center mb-4 sm:mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <Input
              type="text"
              placeholder={t.projects.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-9"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label={t.projects.clearFilters}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Label
              htmlFor="sort"
              className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap"
            >
              {t.projects.sortBy}
            </Label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="h-9 px-3 rounded-md border border-input bg-transparent text-sm focus:outline-none focus:ring-1 focus:ring-ring dark:bg-gray-800"
            >
              <option value="stars">{t.projects.mostStars}</option>
              <option value="name">{t.projects.nameAZ}</option>
              <option value="updated">{t.projects.mostRecent}</option>
            </select>
          </div>
        </div>

        {/* Language chips */}
        <div className="flex flex-wrap items-center gap-2 mb-4 sm:mb-6">
          <Badge
            variant={languageFilter === "all" ? "default" : "outline"}
            className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
            onClick={() => setLanguageFilter("all")}
          >
            {t.projects.allLanguages}
          </Badge>
          {uniqueLanguages.map((lang) => (
            <Badge
              key={lang}
              variant={languageFilter === lang ? "default" : "outline"}
              className="cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground"
              onClick={() => setLanguageFilter(languageFilter === lang ? "all" : lang)}
            >
              {lang}
            </Badge>
          ))}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            {filteredProjects.length} {t.projects.projectsFound}
            {searchTerm && ` ${t.projects.for} "${searchTerm}"`}
            {languageFilter !== "all" && ` ${t.projects.in} ${languageFilter}`}
          </p>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs sm:text-sm">
              {t.projects.clearFilters}
            </Button>
          )}
        </div>

        {/* Content */}
        {error ? (
          <Card className="text-center py-10 sm:py-14">
            <CardContent className="space-y-3 sm:space-y-4">
              <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-red-400" />
              <p className="text-sm sm:text-base text-red-500 dark:text-red-400">{error}</p>
              <Button variant="outline" size="sm" onClick={loadProjects}>
                {t.projects.tryAgain}
              </Button>
            </CardContent>
          </Card>
        ) : loading && projects.length === 0 ? (
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-5 w-10 shrink-0" />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 pb-2">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-1" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
                <CardFooter className="justify-between pt-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <>
            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between gap-3">
                      <CardTitle className="text-base sm:text-lg truncate">{project.name}</CardTitle>
                      <span className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 shrink-0">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        {project.stars}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 pb-2">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {project.description || t.projects.noDescription}
                    </p>
                  </CardContent>
                  <CardFooter className="justify-between pt-2">
                    {project.language && (
                      <span className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <span
                          className={cn(
                            "w-2.5 h-2.5 rounded-full",
                            LANGUAGE_COLORS[project.language] ?? "bg-gray-400"
                          )}
                        />
                        {project.language}
                      </span>
                    )}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                    >
                      {t.projects.viewOnGithub}
                      <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {!hasActiveFilters && (
              <div className="mt-8 sm:mt-10 text-center">
                <Button onClick={loadProjects} disabled={loading} variant="outline" className="min-w-40">
                  {loading ? t.projects.loading : t.projects.showMore}
                </Button>
              </div>
            )}
          </>
        ) : (
          <Card className="text-center py-10 sm:py-14">
            <CardContent className="space-y-3 sm:space-y-4">
              <SearchX className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-gray-300 dark:text-gray-700" />
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                {t.projects.noProjectsFound}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  {t.projects.clearFilters}
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}