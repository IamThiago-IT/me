import type React from "react"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import { Navbar } from "@/components/Navbar"
import { CommandDialogDemo } from "@/components/CommandDialogDemo"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "IamThiago",
  description: "Portfólio minimalista de um desenvolvedor",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Navbar />
          <main className="pt-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</div>
          </main>
        </ThemeProvider>
        <CommandDialogDemo />
      </body>
  )
}
