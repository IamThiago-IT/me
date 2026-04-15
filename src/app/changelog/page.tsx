"use client"

import { useState, useEffect } from "react"
import { getGithubChangelog, type ChangelogCommit } from "@/lib/github"
import { MetadataSetter } from "@/components/MetadataSetter"
import { useI18n } from "@/lib/i18n"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, RefreshCw } from "lucide-react"
import { formatDate } from "@/lib/utils"

type CommitType = "feat" | "fix" | "docs" | "style" | "refactor" | "perf" | "test" | "chore" | "other"

export default function Changelog() {
  const { t } = useI18n()

  const [commits, setCommits] = useState<ChangelogCommit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedType, setSelectedType] = useState<CommitType | "all">("all")

  const typeLabels: Record<CommitType, string> = {
    feat: t.changelog.typeFeature,
    fix: t.changelog.typeFix,
    docs: t.changelog.typeDocs,
    style: t.changelog.typeStyle,
    refactor: t.changelog.typeRefactor,
    perf: t.changelog.typePerf,
    test: t.changelog.typeTest,
    chore: t.changelog.typeChore,
    other: "Other",
  }

  const typeColors: Record<CommitType, string> = {
    feat: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    fix: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    docs: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    style: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    refactor: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    perf: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    test: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200",
    chore: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    other: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
  }

  const loadCommits = async () => {
    setLoading(true)
    setError(null)
    try {
      // Configurar o repositório aqui - altere owner/repo conforme necessário
      // Padrão: IamThiago-IT/me
      const data = await getGithubChangelog("IamThiago-IT", "me", 50)
      setCommits(data)
    } catch (err) {
      setError(t.changelog.error)
      console.error("Error loading changelog:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCommits()
  }, [])

  const filteredCommits = selectedType === "all" 
    ? commits 
    : commits.filter(commit => commit.type === selectedType)

  const types = Array.from(
    new Set(commits.map(c => c.type))
  ) as CommitType[]

  return (
    <div className="max-w-4xl mx-auto">
      <MetadataSetter title={t.changelog.title} />

      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">{t.changelog.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          {t.changelog.description}
        </p>
      </div>

      {error && (
        <Card className="mb-8 border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <p className="text-red-800 dark:text-red-200">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={loadCommits}
                className="gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                {t.changelog.tryAgain}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-200" />
            <span>{t.changelog.loading}</span>
          </div>
        </div>
      ) : commits.length === 0 ? (
        <Card>
          <CardContent className="pt-6 text-center text-gray-600 dark:text-gray-400">
            {t.changelog.noCommits}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-2">
            <Badge
              variant={selectedType === "all" ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedType("all")}
            >
              {t.changelog.filterAll} ({commits.length})
            </Badge>
            {types.map((type) => {
              const count = commits.filter(c => c.type === type).length
              return (
                <Badge
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedType(type)}
                >
                  {typeLabels[type]} ({count})
                </Badge>
              )
            })}
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            {filteredCommits.map((commit, idx) => (
              <Card key={commit.hash} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={typeColors[commit.type]}>
                          {typeLabels[commit.type]}
                        </Badge>
                        <code className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {commit.hash}
                        </code>
                      </div>
                      <CardTitle className="text-lg">{commit.description}</CardTitle>
                      <CardDescription className="mt-2">
                        {commit.author} • {formatDate(commit.date)}
                      </CardDescription>
                    </div>
                    <a
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      title={t.changelog.viewOnGithub}
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {filteredCommits.length === 0 && selectedType !== "all" && (
            <div className="text-center py-8 text-gray-600 dark:text-gray-400">
              {t.changelog.noCommits} {typeLabels[selectedType as CommitType]}
            </div>
          )}
        </>
      )}
    </div>
  )
}
