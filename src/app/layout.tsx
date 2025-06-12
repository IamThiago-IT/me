import type React from "react"

export const metadata = {
  title: "IamThiago",
  description: "Portfólio minimalista de um desenvolvedor",
}

import RootLayout from "@/app/pageClient"

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RootLayout>{children}</RootLayout>
  )
}
