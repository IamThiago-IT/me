"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/LanguageSwitcher"
import { useI18n } from "@/lib/i18n"

export function Navbar() {
	const pathname = usePathname()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const { t } = useI18n()

	const menuItems = [
		{ label: t.nav.home, href: "/" },
		{ label: t.nav.about, href: "/about" },
		{ label: t.nav.projects, href: "/projetos" },
		{ label: t.nav.schedule, href: "/agendar" },
		{ label: t.nav.contracts, href: "/contratos" },
		{ label: t.nav.feedbacks, href: "/feedbacks" },
		{ label: t.nav.contact, href: "/contato" },
		{ label: t.nav.papers, href: "/papers" },
		{ label: t.nav.changelog, href: "/changelog" },
	]

	return (
		<nav className="bg-white text-black dark:bg-black dark:text-white shadow-sm fixed w-full z-10">
			<div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
				<div className="flex justify-between items-center h-14 sm:h-16">
					<div className="flex-shrink-0 flex items-center">
						<Link href="/" className="text-lg sm:text-xl font-bold hover:opacity-80 transition-opacity">
							IamThiago
						</Link>
					</div>
					<div className="hidden sm:flex sm:gap-1 md:gap-2 lg:gap-8">
						{menuItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`inline-flex items-center px-2 md:px-1 pt-1 border-b-2 text-xs sm:text-sm md:text-base font-medium transition-colors ${
									pathname === item.href ||
									(item.href !== "/" && pathname.startsWith(item.href))
										? "border-indigo-500 text-gray-900 dark:text-white"
										: "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
								}`}
							>
								{item.label}
							</Link>
						))}
					</div>
					<div className="flex items-center gap-1 sm:gap-2">
						<div className="hidden sm:flex">
							<LanguageSwitcher />
						</div>
						<div className="-mr-2 flex items-center sm:hidden">
							<Button
								variant="ghost"
								size="sm"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
								className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-200 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-colors"
							>
								<span className="sr-only">{t.nav.openMenu}</span>
								{isMenuOpen ? (
									<X className="block h-5 w-5 sm:h-6 sm:w-6" />
								) : (
									<Menu className="block h-5 w-5 sm:h-6 sm:w-6" />
								)}
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Menu móvel */}
			<div className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? "max-h-screen" : "max-h-0"}`}>
				<div className="px-3 py-2 space-y-1 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
					{menuItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
								pathname === item.href ||
								(item.href !== "/" && pathname.startsWith(item.href))
									? "bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300"
									: "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200"
							}`}
							onClick={() => setIsMenuOpen(false)}
						>
							{item.label}
						</Link>
					))}
					<div className="px-3 py-2">
						<LanguageSwitcher />
					</div>
				</div>
			</div>
		</nav>
	)
}
