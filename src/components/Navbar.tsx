"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import {
	Menu,
	X,
	Home,
	User,
	Briefcase,
	Layout,
	Calendar,
	FileText,
	MessageSquare,
	Mail,
	CreditCard,
	Book,
	GitBranch,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

interface NavItem {
	label: string;
	href: string;
	icon?: React.ReactNode;
	category?: "main" | "portfolio" | "services" | "info";
}

export function Navbar() {
	const pathname = usePathname();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useI18n();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const menuItems: NavItem[] = [
		{ label: t.nav.home, href: "/", icon: <Home className="w-4 h-4" />, category: "main" },
		{ label: t.nav.about, href: "/about", icon: <User className="w-4 h-4" />, category: "main" },
		{ label: t.nav.projects, href: "/projetos", icon: <Briefcase className="w-4 h-4" />, category: "portfolio" },
		{ label: "Design", href: "/design", icon: <Layout className="w-4 h-4" />, category: "portfolio" },
		{ label: t.nav.feedbacks, href: "/feedbacks", icon: <MessageSquare className="w-4 h-4" />, category: "portfolio" },
		{ label: t.nav.schedule, href: "/agendar", icon: <Calendar className="w-4 h-4" />, category: "services" },
		{ label: t.nav.contracts, href: "/contratos", icon: <FileText className="w-4 h-4" />, category: "services" },
		{ label: t.nav.payments, href: "/pagamentos", icon: <CreditCard className="w-4 h-4" />, category: "services" },
		{ label: t.nav.contact, href: "/contato", icon: <Mail className="w-4 h-4" />, category: "info" },
		{ label: t.nav.changelog, href: "/changelog", icon: <GitBranch className="w-4 h-4" />, category: "info" },
	];

	const isActive = (href: string) =>
		pathname === href || (href !== "/" && pathname.startsWith(href));

	const navSections = {
		main: menuItems.filter((item) => item.category === "main"),
		portfolio: menuItems.filter((item) => item.category === "portfolio"),
		services: menuItems.filter((item) => item.category === "services"),
		info: menuItems.filter((item) => item.category === "info"),
	};

	if (!isMounted) {
		return null;
	}

	return (
		<nav className="bg-white text-black dark:bg-black dark:text-white shadow-sm fixed w-full z-10">
			<div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
				<div className="flex justify-between items-center h-14 sm:h-16">
					{/* Logo */}
					<Link
						href="/"
						className="flex-shrink-0 text-lg sm:text-xl font-bold hover:opacity-80 transition-opacity duration-200 active:scale-95"
					>
						IamThiago
					</Link>

					{/* Desktop Menu */}
					<div className="hidden sm:flex sm:gap-1 md:gap-2 lg:gap-6">
						{menuItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`inline-flex items-center gap-1.5 px-2 md:px-1 pt-1 border-b-2 text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 ${
									isActive(item.href)
										? "border-indigo-500 text-gray-900 dark:text-white"
										: "border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-200"
								}`}
							>
								{item.icon && <span className="hidden lg:inline">{item.icon}</span>}
								{item.label}
							</Link>
						))}
					</div>

					{/* Desktop Right Side */}
					<div className="hidden sm:flex items-center gap-2">
						<LanguageSwitcher />
					</div>

					{/* Mobile Menu Button */}
					<div className="flex items-center gap-1.5 sm:hidden">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 h-10 w-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
							aria-label={t.nav.openMenu}
							aria-expanded={isMenuOpen}
						>
							{isMenuOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</Button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-gray-200 dark:border-gray-800 ${
					isMenuOpen ? "max-h-[calc(100vh-3.5rem)]" : "max-h-0"
				}`}
			>
				<div className="bg-white dark:bg-gray-900 overflow-y-auto max-h-[calc(100vh-3.5rem)]">
					{/* Main Navigation */}
					<div className="px-4 py-4 space-y-1">
						{navSections.main.map((item) => (
							<MobileNavLink
								key={item.href}
								item={item}
								isActive={isActive(item.href)}
								onClick={() => setIsMenuOpen(false)}
							/>
						))}
					</div>

					{/* Divider */}
					<div className="h-px bg-gray-200 dark:bg-gray-800" />

					{/* Portfolio Section */}
					{navSections.portfolio.length > 0 && (
						<>
							<div className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
								Portfólio
							</div>
							<div className="px-4 space-y-1 pb-3">
								{navSections.portfolio.map((item) => (
									<MobileNavLink
										key={item.href}
										item={item}
										isActive={isActive(item.href)}
										onClick={() => setIsMenuOpen(false)}
									/>
								))}
							</div>
							<div className="h-px bg-gray-200 dark:bg-gray-800" />
						</>
					)}

					{/* Services Section */}
					{navSections.services.length > 0 && (
						<>
							<div className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
								Serviços
							</div>
							<div className="px-4 space-y-1 pb-3">
								{navSections.services.map((item) => (
									<MobileNavLink
										key={item.href}
										item={item}
										isActive={isActive(item.href)}
										onClick={() => setIsMenuOpen(false)}
									/>
								))}
							</div>
							<div className="h-px bg-gray-200 dark:bg-gray-800" />
						</>
					)}

					{/* Info Section */}
					{navSections.info.length > 0 && (
						<>
							<div className="px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
								Informações
							</div>
							<div className="px-4 space-y-1 pb-3">
								{navSections.info.map((item) => (
									<MobileNavLink
										key={item.href}
										item={item}
										isActive={isActive(item.href)}
										onClick={() => setIsMenuOpen(false)}
									/>
								))}
							</div>
							<div className="h-px bg-gray-200 dark:bg-gray-800" />
						</>
					)}

					{/* CTA and Language Switcher */}
					<div className="px-4 py-4 space-y-3">
						<Link
							href="/contato/proposta"
							onClick={() => setIsMenuOpen(false)}
							className="flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold transition-colors duration-200 active:scale-95"
						>
							Enviar Proposta
							<ArrowRight className="w-4 h-4" />
						</Link>
						<div className="flex justify-center">
							<LanguageSwitcher />
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}

interface MobileNavLinkProps {
	item: NavItem;
	isActive: boolean;
	onClick: () => void;
}

function MobileNavLink({ item, isActive, onClick }: MobileNavLinkProps) {
	return (
		<Link
			href={item.href}
			onClick={onClick}
			className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-200 active:scale-95 ${
				isActive
					? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-semibold"
					: "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
			}`}
		>
			{item.icon && <span className="flex-shrink-0">{item.icon}</span>}
			<span className="flex-1">{item.label}</span>
			{isActive && <span className="h-2 w-2 rounded-full bg-indigo-500" />}
		</Link>
	);
}
