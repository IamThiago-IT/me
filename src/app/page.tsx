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
		<div className="max-w-4xl mx-auto px-4">
			<MetadataSetter title="Home" />
			<style>{`
				@keyframes fadeInUp {
					from {
						opacity: 0;
						transform: translateY(20px);
					}
					to {
						opacity: 1;
						transform: translateY(0);
					}
				}
				@keyframes underlineGrow {
					from {
						width: 0;
					}
					to {
						width: 100%;
					}
				}
				.fade-in-1 { animation: fadeInUp 0.6s ease-out; }
				.fade-in-2 { animation: fadeInUp 0.6s ease-out 0.15s both; }
				.fade-in-3 { animation: fadeInUp 0.6s ease-out 0.3s both; }
				.underline-animate {
					position: relative;
					display: inline-block;
				}
				.underline-animate::after {
					content: '';
					position: absolute;
					bottom: -4px;
					left: 0;
					height: 2px;
					background: currentColor;
					animation: underlineGrow 0.8s ease-out 0.5s both;
				}
			`}</style>
			<div className="flex flex-col items-center justify-center space-y-12 py-32">
				<div className="space-y-6 text-center fade-in-1">
					<div className="inline-flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
						<Sparkles className="h-4 w-4" />
						<span>Developer & Creator</span>
					</div>
					<h1 className="text-7xl md:text-8xl font-bold tracking-tight">
						Oi, <span className="underline-animate">Thiago</span>
					</h1>
					<p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
						{t.home.description}
					</p>
				</div>

				<div className="flex flex-col sm:flex-row gap-3 pt-8 fade-in-3">
					<Button
						asChild
						size="lg"
						className="text-base px-8 h-12 font-medium transition-all hover:scale-105 hover:shadow-lg"
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
