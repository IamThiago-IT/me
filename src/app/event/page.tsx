"use client"

import { useState, useMemo } from "react"
import { Calendar, MapPin, Users, ArrowRight, Search, X, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MetadataSetter } from "@/components/MetadataSetter"
import { useI18n } from "@/lib/i18n"

interface Event {
  id: string
  title: string
  description: string
  date: string
  time?: string
  location: string
  type: "workshop" | "palestra" | "conferência" | "webinar"
  tags?: string[]
  url?: string
  isUpcoming: boolean
}

const events: Event[] = [
  {
    id: "1",
    title: "React Performance Optimization Workshop",
    description:
      "Learn advanced techniques to optimize React applications for production. We'll cover code splitting, lazy loading, memoization, and profiling tools.",
    date: "2024-04-15",
    time: "18:00",
    location: "São Paulo, Brazil",
    type: "workshop",
    tags: ["react", "performance", "frontend"],
    url: "#",
    isUpcoming: true,
  },
  {
    id: "2",
    title: "Full-Stack Development Talk",
    description:
      "Deep dive into modern full-stack development with Next.js and TypeScript. Discover best practices for building scalable applications.",
    date: "2024-05-20",
    time: "19:30",
    location: "Online",
    type: "palestra",
    tags: ["nextjs", "typescript", "fullstack"],
    url: "#",
    isUpcoming: true,
  },
  {
    id: "3",
    title: "Web Performance & Core Web Vitals",
    description:
      "Understand Google's Core Web Vitals and learn how to measure and improve your website's performance metrics effectively.",
    date: "2024-06-10",
    time: "14:00",
    location: "Virtual Event",
    type: "webinar",
    tags: ["performance", "seo", "web"],
    url: "#",
    isUpcoming: true,
  },
  {
    id: "4",
    title: "TypeScript Advanced Patterns",
    description:
      "Master advanced TypeScript patterns including generics, utility types, and type guards. Build more robust and maintainable applications.",
    date: "2025-02-10",
    time: "20:00",
    location: "Online",
    type: "workshop",
    tags: ["typescript", "backend", "advanced"],
    url: "#",
    isUpcoming: true,
  },
  {
    id: "5",
    title: "Node.js Security Best Practices",
    description:
      "Learn how to secure your Node.js applications against common vulnerabilities. We'll cover authentication, authorization, and data protection.",
    date: "2025-03-15",
    time: "19:00",
    location: "São Paulo, Brazil",
    type: "palestra",
    tags: ["nodejs", "security", "backend"],
    url: "#",
    isUpcoming: true,
  },
  {
    id: "6",
    title: "Database Design & Optimization",
    description:
      "Learn how to design efficient databases and optimize queries. Cover relational and NoSQL databases with real-world examples.",
    date: "2025-04-20",
    time: "18:30",
    location: "Online",
    type: "conferência",
    tags: ["database", "sql", "backend"],
    url: "#",
    isUpcoming: true,
  },
  {
    id: "7",
    title: "React 19 & Server Components Deep Dive",
    description:
      "Explore the new features in React 19 and server components. Learn how to build more efficient and interactive applications.",
    date: "2026-01-25",
    time: "19:30",
    location: "São Paulo, Brazil",
    type: "workshop",
    tags: ["react", "frontend", "nextjs"],
    url: "#",
    isUpcoming: true,
  },
  {
    id: "8",
    title: "Microservices Architecture",
    description:
      "Build scalable applications using microservices architecture. Learn about service discovery, load balancing, and communication patterns.",
    date: "2026-03-10",
    time: "20:00",
    location: "Virtual Event",
    type: "conferência",
    tags: ["architecture", "backend", "devops"],
    url: "#",
    isUpcoming: true,
  },
]


interface EventCardProps {
  event: Event
}

function EventCard({ event }: EventCardProps) {
  const { t } = useI18n()
  const eventDate = new Date(event.date)
  const formattedDate = eventDate.toLocaleDateString("pt-BR", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg sm:text-xl break-words">{event.title}</CardTitle>
            <CardDescription className="mt-1 sm:mt-2 text-xs sm:text-sm line-clamp-2">{event.description}</CardDescription>
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold text-blue-800 dark:bg-blue-900 dark:text-blue-200 whitespace-nowrap flex-shrink-0">
            {event.type}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4">
        <div className="space-y-2 text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-muted-foreground break-words">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>
              {formattedDate}
              {event.time && ` • ${event.time}`}
            </span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground break-words">
            <MapPin className="h-4 w-4 flex-shrink-0" />
            <span>{event.location}</span>
          </div>

          {event.isUpcoming && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
              <Users className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm">Upcoming Event</span>
            </div>
          )}
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2 sm:pt-3">
            {event.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-gray-100 px-2 sm:px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-2 pt-3 sm:pt-4">
          {event.url && (
            <Button asChild className="flex-1 text-xs sm:text-sm">
              <a href={event.url}>
                {event.isUpcoming ? "Register" : "Learn More"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default function EventPage() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [itemsToShow, setItemsToShow] = useState(4)

  // Get all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    for (const event of events) {
      for (const tag of event.tags ?? []) {
        tags.add(tag)
      }
    }
    return Array.from(tags).sort()
  }, [])

  // Get all unique years from events
  const allYears = useMemo(() => {
    const years = new Set<string>()
    for (const event of events) {
      const year = new Date(event.date).getFullYear().toString()
      years.add(year)
    }
    return Array.from(years).sort().reverse()
  }, [])

  // Filter events based on search, tags, and year
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      // Search filter
      const matchesSearch =
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase())

      // Tags filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => event.tags?.includes(tag))

      // Year filter
      const eventYear = new Date(event.date).getFullYear().toString()
      const matchesYear = !selectedYear || eventYear === selectedYear

      return matchesSearch && matchesTags && matchesYear
    })
  }, [searchQuery, selectedTags, selectedYear])

  // Paginate filtered events
  const displayedEvents = filteredEvents.slice(0, itemsToShow)
  const hasMoreEvents = filteredEvents.length > itemsToShow

  const toggleTag = (tag: string) => {
    setSearchQuery("")
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
    setItemsToShow(4)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setSelectedYear(null)
    setItemsToShow(4)
  }

  const hasActiveFilters = searchQuery || selectedTags.length > 0 || selectedYear

  return (
    <>
      <MetadataSetter title={t.events.title} />

      <main className="min-h-screen bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <section className="mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">{t.events.title}</h1>
            <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-muted-foreground">{t.events.description}</p>
          </section>

          {/* Search and Filters */}
          <section className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events by title, description, location..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setItemsToShow(4)
                }}
                className="pl-10"
              />
            </div>

            {/* Year Filter */}
            <div className="space-y-2 sm:space-y-3">
              <div className="text-xs sm:text-sm font-medium">Filter by Year</div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={!selectedYear ? "default" : "outline"}
                  size="sm"
                  className="text-xs sm:text-sm"
                  onClick={() => {
                    setSelectedYear(null)
                    setItemsToShow(4)
                  }}
                >
                  All Years
                </Button>
                {allYears.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year ? "default" : "outline"}
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={() => {
                      setSelectedYear(year)
                      setItemsToShow(4)
                    }}
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>

            {/* Tag Filters */}
            <div className="space-y-2 sm:space-y-3">
              <div className="text-xs sm:text-sm font-medium">Filter by Tags</div>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTags.includes(tag) ? "default" : "outline"}
                    size="sm"
                    className="text-xs sm:text-sm"
                    onClick={() => toggleTag(tag)}
                  >
                    #{tag}
                  </Button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
                Clear all filters
              </button>
            )}
          </section>

          {/* Events Counter */}
          <section className="mb-4 sm:mb-6">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Showing {displayedEvents.length} of {filteredEvents.length} events
              {selectedYear && ` in ${selectedYear}`}
            </p>
          </section>

          {/* Events Grid */}
          {displayedEvents.length > 0 ? (
            <section className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
                {displayedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>

              {/* Show More Button */}
              {hasMoreEvents && (
                <div className="flex justify-center pt-3 sm:pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setItemsToShow((prev) => prev + 4)}
                    className="w-full sm:w-auto text-sm"
                  >
                    <ChevronDown className="mr-2 h-4 w-4" />
                    Show More Events
                  </Button>
                </div>
              )}
            </section>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8 sm:py-12">
                  <Calendar className="mx-auto h-10 sm:h-12 w-10 sm:w-12 text-muted-foreground/50 mb-3 sm:mb-4" />
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
                    No events found matching your filters
                  </p>
                  <Button type="button" variant="outline" onClick={clearFilters}>
                    Clear filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          <section className="mt-10 sm:mt-16 rounded-lg bg-muted p-4 sm:p-6 md:p-8 text-center">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Want to collaborate?</h2>
            <p className="text-muted-foreground mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
              I'm always interested in speaking opportunities, workshops, and collaborations. Feel free to get in touch!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="/contato">Get in Touch</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/event/convide-me">{t.events.inviteMe || "Me convide para um evento"}</a>
              </Button>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}