"use client";

import { MetadataSetter } from "@/components/MetadataSetter";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

declare global {
	interface Window {
		gtag?: (...args: unknown[]) => void;
	}
}

export default function Home() {
	const { t } = useI18n();

	return (
		<div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6">
			<MetadataSetter title="Home" />
			<div className="flex flex-col items-center justify-center space-y-8 sm:space-y-12 py-16 sm:py-24 md:py-32">
				<div className="space-y-4 sm:space-y-6 text-center animate-fade-in-up-1">
					<div className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
						<Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
						<span>{t.home.badge}</span>
					</div>
					<h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
						{t.home.intro} <span className="underline-animate">Thiago</span>
					</h1>
					<p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-2">
						{t.home.description}
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto pt-6 sm:pt-8 animate-fade-in-up-3">
					<Button
						asChild
						size="lg"
						className="text-sm sm:text-base px-6 sm:px-8 h-10 sm:h-12 font-medium transition-all hover:scale-105 hover:shadow-lg"
					>
						<Link
							href="/projetos"
							onClick={() =>
								window.gtag?.("event", "cta_click", {
									event_category: "engagement",
									event_label: "view_work",
								})
							}
						>
							{t.home.viewWork} <ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</Button>
					<Button
						asChild
						variant="outline"
						size="lg"
						className="text-base px-8 h-12 font-medium transition-all hover:scale-105 hover:bg-gray-50 dark:hover:bg-gray-900"
					>
						<Link
							href="/contato"
							onClick={() =>
								window.gtag?.("event", "cta_click", {
									event_category: "engagement",
									event_label: "talk_to_me",
								})
							}
						>
							{t.home.talkToMe}
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
}
