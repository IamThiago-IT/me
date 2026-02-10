"use client"

import TimelineSection from "@/components/TimelineSection"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { useI18n } from "@/lib/i18n"

export default function TimelinePage() {
  const { t } = useI18n()

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/about" className="inline-flex items-center text-sm text-gray-600 hover:text-indigo-600 mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          {t.about.backToAbout}
        </Link>
        <TimelineSection />
      </div>
    </div>
  )
}
