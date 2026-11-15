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
		{ label: t.nav.schedule, href: "/agendar", icon: <Calendar className="w-4 h-4" />, category: "services" },
		{ label: t.nav.contracts, href: "/contratos", icon: <FileText className="w-4 h-4" />, category: "services" },
		{ label: t.nav.contact, href: "/contato", icon: <Mail className="w-4 h-4" />, category: "info" },
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
		<nav className="bg-background text-foreground border-b border-border shadow-sm fixed w-full z-10">
			<div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
				<div className="flex justify-between items-center h-14 sm:h-16">
					<Link
						href="/"
						className="flex-shrink-0 text-lg sm:text-xl font-bold hover:opacity-80 transition-opacity duration-200 active:scale-95"
					>
						IamThiago
					</Link>
					<div className="hidden sm:flex sm:gap-1 md:gap-2 lg:gap-6">
						{menuItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={`inline-flex items-center gap-1.5 px-2 md:px-1 pt-1 border-b-2 text-xs sm:text-sm md:text-base font-medium transition-colors duration-200 ${
									isActive(item.href)
										? "border-primary text-foreground"
										: "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
								}`}
							>
								{item.icon && <span className="hidden lg:inline">{item.icon}</span>}
								{item.label}
							</Link>
						))}
					</div>
					<div className="hidden sm:flex items-center gap-2">
						<LanguageSwitcher />
					</div>
					<div className="flex items-center gap-1.5 sm:hidden">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMenuOpen(!isMenuOpen)}
							className="p-2 h-10 w-10 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
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
			<div
				className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-border ${
					isMenuOpen ? "max-h-[calc(100vh-3.5rem)]" : "max-h-0"
				}`}
			>
				<div className="bg-background overflow-y-auto max-h-[calc(100vh-3.5rem)]">
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
					<div className="h-px bg-border" />

					{/* Portfolio Section */}
					{navSections.portfolio.length > 0 && (
						<>
							<div className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
							<div className="h-px bg-border" />
						</>
					)}

					{/* Services Section */}
					{navSections.services.length > 0 && (
						<>
							<div className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
							<div className="h-px bg-border" />
						</>
					)}

					{/* Info Section */}
					{navSections.info.length > 0 && (
						<>
							<div className="px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
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
							<div className="h-px bg-border" />
						</>
					)}

					{/* CTA and Language Switcher */}
					<div className="px-4 py-4 space-y-3">
						<Link
							href="/contato/proposta"
							onClick={() => setIsMenuOpen(false)}
							className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold transition-colors duration-200 active:scale-95"
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
					? "bg-accent text-accent-foreground font-semibold"
					: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
			}`}
		>
			{item.icon && <span className="flex-shrink-0">{item.icon}</span>}
			<span className="flex-1">{item.label}</span>
			{isActive && <span className="h-2 w-2 rounded-full bg-primary" />}
		</Link>
	);
}
