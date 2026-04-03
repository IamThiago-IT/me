"use client"

import TimelineSection from "@/components/TimelineSection"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export default function TimelinePage() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col h-auto md:h-[calc(100vh-7rem)] max-w-5xl mx-auto">
      <Link
        href="/about"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors mb-3 sm:mb-4 shrink-0"
      >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        {t.about.backToAbout}
      </Link>
      <div className="flex-1 overflow-y-auto min-h-0 pr-1 ">
        <TimelineSection />
      </div>
    </div>
  )
}
