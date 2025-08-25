import type React from "react"
import { ThemeProvider } from "next-themes";

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
    <ThemeProvider attribute="class" defaultTheme="system">
      <RootLayout>{children}</RootLayout>
    </ThemeProvider>
  );
}
